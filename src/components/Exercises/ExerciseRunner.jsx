import { useEffect, useMemo, useState } from "react";
import MultipleChoiceQuestion from "./questions/MultipleChoiceQuestion";
import OrderingQuestion from "./questions/OrderingQuestion";
import styles from "./ExerciseRunner.module.css";

const getInitialAnswer = question =>
    question.type === "ordering" ? question.items.map(item => item.id) : null;

const isCorrect = (question, answer) => question.type === "multiple-choice"
    ? answer === question.correctAnswer
    : question.type === "ordering" && Array.isArray(answer) &&
    answer.length === question.correctOrder.length &&
    answer.every((id, index) => id === question.correctOrder[index]);

const freshProgress = questions => ({
    index: 0,
    answers: questions.map(getInitialAnswer),
    phases: questions.map(() => "editing"),
    changed: questions.map(() => false)
});

const loadProgress = (key, questions) => {
    const fresh = freshProgress(questions);
    try {
        const saved = JSON.parse(sessionStorage.getItem(key) || "null");
        if (!saved || !Number.isInteger(saved.index) || saved.index < 0 ||
            saved.index >= questions.length || !Array.isArray(saved.answers) ||
            saved.answers.length !== questions.length) return fresh;

        const answersValid = saved.answers.every((answer, index) => {
            const question = questions[index];
            if (question.type === "ordering") {
                const validIds = question.items.map(item => item.id);
                return Array.isArray(answer) && answer.length === validIds.length &&
                    new Set(answer).size === answer.length && answer.every(id => validIds.includes(id));
            }
            return answer === null || question.options.some(option => option.id === answer);
        });
        if (!answersValid) return fresh;

        // Older versions stored checked question IDs. Do not unlock incorrect answers automatically.
        let phases = Array.isArray(saved.phases) && saved.phases.length === questions.length
            ? saved.phases : questions.map((q, i) =>
                Array.isArray(saved.checked) && saved.checked.includes(q.id) && isCorrect(q, saved.answers[i])
                    ? "complete" : "editing");
        phases = phases.map((phase, i) => {
            if (!["editing", "review", "complete"].includes(phase)) return "editing";
            if (questions[i].type === "multiple-choice") return isCorrect(questions[i], saved.answers[i]) ? "complete" : "editing";
            if (phase === "review" && isCorrect(questions[i], saved.answers[i])) return "complete";
            return phase;
        });
        const changed = Array.isArray(saved.changed) && saved.changed.length === questions.length
            ? saved.changed.map(Boolean) : questions.map((q, i) => phases[i] !== "editing");
        return { index: saved.index, answers: saved.answers, phases, changed };
    } catch {
        return fresh;
    }
};

const ExerciseRunner = ({ exerciseId, questions, onComplete }) => {
    const storageKey = `exercise-progress:${exerciseId}`;
    const [progress, setProgress] = useState(() => loadProgress(storageKey, questions));
    const [finishing, setFinishing] = useState(false);
    const { index, answers, phases, changed } = progress;
    const question = questions[index];
    const phase = phases[index];
    const answer = answers[index];
    const last = index === questions.length - 1;
    const complete = phase === "complete";
    const correct = useMemo(() => isCorrect(question, answer), [question, answer]);

    useEffect(() => {
        sessionStorage.setItem(storageKey, JSON.stringify(progress));
    }, [progress, storageKey]);

    const updateAnswer = value => {
        if (phase !== "editing" || finishing) return;
        setProgress(current => ({
            ...current,
            answers: current.answers.map((item, i) => i === current.index ? value : item),
            changed: current.changed.map((item, i) => i === current.index ? true : item)
        }));
    };

    const selectChoice = optionId => {
        if (phase !== "editing" || finishing) return;
        setProgress(current => ({
            ...current,
            answers: current.answers.map((item, i) => i === current.index ? optionId : item),
            changed: current.changed.map((item, i) => i === current.index ? true : item),
            phases: current.phases.map((item, i) =>
                i === current.index && optionId === question.correctAnswer ? "complete" : item)
        }));
    };

    const checkOrdering = () => {
        if (question.type !== "ordering" || phase !== "editing" || !changed[index] || finishing) return;
        setProgress(current => ({
            ...current,
            phases: current.phases.map((item, i) => i === current.index
                ? correct ? "complete" : "review" : item)
        }));
    };

    const revealAnswer = () => {
        if (phase !== "review" || finishing) return;
        setProgress(current => ({
            ...current,
            answers: current.answers.map((item, i) => i === current.index ? [...question.correctOrder] : item),
            phases: current.phases.map((item, i) => i === current.index ? "complete" : item)
        }));
    };

    const previousQuestion = () => {
        if (index === 0 || finishing) return;
        setProgress(current => ({ ...current, index: current.index - 1 }));
    };

    const nextQuestion = () => {
        if (!complete || finishing) return;
        if (last) {
            setFinishing(true);
            onComplete?.();
        } else {
            setProgress(current => ({ ...current, index: current.index + 1 }));
        }
    };

    return (
        <section className={styles.runner} dir="rtl" aria-label={`שאלות ${exerciseId}`}>
            <header className={styles.heading}>
                <h1>{question.title}</h1>
                {question.type === "ordering" && <p>{question.instruction}</p>}
            </header>

            <div className={`${styles.questionArea} ${question.type === "multiple-choice" ? styles.choiceArea : ""}`}>
                {question.type === "multiple-choice" ? (
                    <div className={styles.choiceBlock}>
                        <p className={styles.choiceInstruction}>{question.instruction}</p>
                        <MultipleChoiceQuestion
                            key={question.id}
                            question={question}
                            answer={answer}
                            onAnswerChange={selectChoice}
                            completed={complete}
                        />
                    </div>
                ) : question.type === "ordering" ? (
                    <OrderingQuestion
                        key={question.id}
                        question={question}
                        answer={answer}
                        onAnswerChange={updateAnswer}
                        phase={phase}
                    />
                ) : <p>סוג שאלה לא נתמך</p>}
            </div>

            <footer className={styles.footer}>
                <div className={styles.checkRow}>
                    {question.type === "ordering" && (
                        <button
                            type="button"
                            className={styles.checkButton}
                            disabled={phase === "complete" || (phase === "editing" && !changed[index])}
                            onClick={phase === "review" ? revealAnswer : checkOrdering}
                        >
                            {phase === "review" ? "לצפייה בתשובה" : "בדיקה"}
                        </button>
                    )}
                    <span className={styles.feedback} role="status" aria-live="polite">
                        {question.type === "ordering" && phase === "review" && "יש טעויות בסדר. אפשר לצפות בתשובה הנכונה."}
                        {question.type === "ordering" && phase === "complete" && (correct ? "כל הכבוד! הסדר נכון." : "התשובה הנכונה מוצגת.")}
                        {question.type === "multiple-choice" && complete && "נכון מאוד! אפשר להמשיך."}
                    </span>
                </div>
                <nav className={styles.navigation} aria-label="ניווט בין שאלות התרגול">
                    {index > 0 && (
                        <button type="button" className={styles.previousButton} onClick={previousQuestion}>
                            ‹ הקודם
                        </button>
                    )}
                    <button
                        type="button"
                        className={styles.nextButton}
                        onClick={nextQuestion}
                        disabled={!complete || finishing}
                    >
                        {last ? "סיום התרגול" : "הבא ›"}
                    </button>
                </nav>
            </footer>
        </section>
    );
};

export default ExerciseRunner;

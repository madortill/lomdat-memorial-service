import { useEffect, useState } from "react";
import MultipleChoiceQuestion from "./questions/MultipleChoiceQuestion";
import OrderingQuestion from "./questions/OrderingQuestion";
import styles from "./ExerciseRunner.module.css";

const initialAnswer = q => q.type === "ordering" ? q.items.map(item => item.id) : null;
const correctAnswer = (q, answer) => q.type === "multiple-choice"
    ? answer === q.correctAnswer
    : q.type === "ordering" && Array.isArray(answer) && answer.length === q.correctOrder.length && answer.every((id, i) => id === q.correctOrder[i]);
function load(key, questions) {
    const fresh = () => ({ index: 0, answers: questions.map(initialAnswer), checked: [] });
    try {
        const saved = JSON.parse(sessionStorage.getItem(key) || "null");
        if (!saved || !Number.isInteger(saved.index) || saved.index < 0 || saved.index >= questions.length ||
            !Array.isArray(saved.answers) || saved.answers.length !== questions.length || !Array.isArray(saved.checked)) return fresh();
        if (!saved.answers.every((a, i) => questions[i].type === "ordering" ?
            Array.isArray(a) && a.length === questions[i].items.length &&
            new Set(a).size === a.length && a.every(id => questions[i].items.some(item => item.id === id)) :
            a === null || questions[i].options.some(option => option.id === a))) return fresh();
        return saved;
    } catch { return fresh(); }
}
export default function ExerciseRunner({ exerciseId, questions, onComplete }) {
    const key = `exercise-progress:${exerciseId}`;
    const [state, setState] = useState(() => load(key, questions));
    const [finished, setFinished] = useState(false);
    const question = questions[state.index];
    const answer = state.answers[state.index];
    const checked = state.checked.includes(question.id);
    const correct = correctAnswer(question, answer);
    const last = state.index === questions.length - 1;
    useEffect(() => { sessionStorage.setItem(key, JSON.stringify(state)); }, [key, state]);
    function changeAnswer(value) {
        if (checked || finished) return;
        setState(s => ({ ...s, answers: s.answers.map((a, i) => i === s.index ? value : a) }));
    }
    function check() {
        if (checked || answer === null) return;
        setState(s => ({ ...s, checked: [...new Set([...s.checked, question.id])] }));
    }
    function next() {
        if (!checked || finished) return;
        if (last) { setFinished(true); onComplete?.(); }
        else setState(s => ({ ...s, index: s.index + 1 }));
    }
    return <section className={styles.runner} dir="rtl" aria-label={`תרגול ${exerciseId}`}>
        <header className={styles.heading}>
            <span className={styles.count}>שאלה {state.index + 1} מתוך {questions.length}</span>
            <h1>{question.title}</h1>
            <p>{question.instruction}</p>
        </header>
        <div className={styles.questionArea}>
            {question.type === "multiple-choice" ? <MultipleChoiceQuestion question={question} answer={answer} onAnswerChange={changeAnswer} checked={checked} /> :
                question.type === "ordering" ? <OrderingQuestion question={question} answer={answer} onAnswerChange={changeAnswer} checked={checked} /> :
                <p>סוג שאלה לא נתמך</p>}
        </div>
        <footer className={styles.footer}>
            {checked && <p role="status" className={correct ? styles.successText : styles.errorText}>
                {correct ? "נכון מאוד!" : "לא מדויק — התשובה הנכונה מסומנת."}
            </p>}
            <button type="button" onClick={checked ? next : check} disabled={finished || (!checked && answer === null)}>
                {checked ? last ? "סיום התרגול" : "לשאלה הבאה" : "בדיקת תשובה"}
            </button>
        </footer>
    </section>;
}

import { useState } from "react";
import styles from "../ExerciseRunner.module.css";

const MultipleChoiceQuestion = ({ question, answer, onAnswerChange, completed }) => {
    const [wrongOption, setWrongOption] = useState(null);
    const [attempt, setAttempt] = useState(0);

    const choose = optionId => {
        if (completed) return;
        const correct = optionId === question.correctAnswer;
        setWrongOption(correct ? null : optionId);
        setAttempt(value => value + 1);
        onAnswerChange(optionId);
    };

    return (
        <div className={styles.options} role="group" aria-label={question.instruction}>
            {question.options.map(option => {
                const selected = answer === option.id;
                const correctChoice = option.id === question.correctAnswer;
                const wrong = !completed && wrongOption === option.id;
                return (
                    <button
                        key={`${option.id}-${wrong ? attempt : 0}`}
                        type="button"
                        disabled={completed}
                        aria-pressed={selected}
                        className={[
                            styles.option,
                            completed && correctChoice ? styles.correct : "",
                            wrong ? styles.wrong : "",
                            wrong ? styles.shake : ""
                        ].filter(Boolean).join(" ")}
                        onClick={() => choose(option.id)}
                    >
                        {option.text}
                    </button>
                );
            })}
            <span className={styles.choiceHint} role="status" aria-live="polite">
                {completed ? "✓ תשובה נכונה" : wrongOption ? "לא בדיוק, נסו שוב" : ""}
            </span>
        </div>
    );
};

export default MultipleChoiceQuestion;

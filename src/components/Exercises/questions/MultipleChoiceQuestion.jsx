import styles from "../ExerciseRunner.module.css";
export default function MultipleChoiceQuestion({ question, answer, onAnswerChange, checked }) {
    return <div className={styles.options} role="group" aria-label={question.instruction}>
        {question.options.map(option => {
            const selected = answer === option.id;
            const correct = option.id === question.correctAnswer;
            const status = checked ? (correct ? styles.correct : selected ? styles.wrong : "") : "";
            return <button key={option.id} type="button" disabled={checked}
                aria-pressed={selected} onClick={() => onAnswerChange(option.id)}
                className={[styles.option, selected && !checked ? styles.selected : "", status].filter(Boolean).join(" ")}>{option.text}</button>;
        })}
    </div>;
}

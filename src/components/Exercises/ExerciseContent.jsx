import styles from "./ExerciseContent.module.css";

export default function ExerciseContent({ onPageComplete }) {
    return (
        <section className={styles.content}>
            <h1>תרגול לדוגמה</h1>
            <p>כאן נבנה בהמשך את השאלות והפעילויות של התרגול.</p>
            <div className={styles.actions}>
                <button type="button" onClick={onPageComplete}>סיום התרגול</button>
            </div>
        </section>
    );
}

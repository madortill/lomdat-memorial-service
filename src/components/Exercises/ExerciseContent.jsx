import { useState } from "react";
import styles from "./ExerciseContent.module.css";

export default function ExerciseContent({ topic, pageIndex, pageCount, onPageComplete }) {
    const [answer, setAnswer] = useState(null);
    const [checked, setChecked] = useState(false);
    return (
        <section className={styles.content}>
            <header><span>{topic.title}</span><h1>שאלה {pageIndex + 1}</h1></header>
            <p>שאלת הדגמה: איזו פעולה נדרשת כדי להתקדם?</p>
            <div className={styles.answers}>
                {["לבחור תשובה וללחוץ על בדיקה", "לפתוח את העמוד בלבד", "לדלג בלי לבצע פעולה", "לסגור את הפופאפ"].map((text, index) => (
                    <button key={index} type="button" disabled={checked} className={answer === index ? styles.selected : ""} onClick={() => setAnswer(index)}>{text}</button>
                ))}
            </div>
            <div className={styles.actions}>
                {!checked ? (
                    <button type="button" disabled={answer === null} onClick={() => setChecked(true)}>בדיקה</button>
                ) : (
                    <><p>{answer === 0 ? "נכון!" : "כאן תוצג המשוב לתשובה. בדוגמה הזאת אפשר להמשיך אחרי בדיקה."}</p>
                    <button type="button" onClick={onPageComplete}>{pageIndex === pageCount - 1 ? "סיום התרגול" : "המשך"}</button></>
                )}
            </div>
        </section>
    );
}

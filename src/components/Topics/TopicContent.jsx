import { useState } from "react";
import styles from "./TopicContent.module.css";

const tabs = ["רקע כללי", "אחריות וניהול", "דגשים חשובים"];

export default function TopicContent({ topic, pageIndex, pageCount, onPageComplete }) {
    const [visited, setVisited] = useState([0]);
    const allVisited = visited.length === tabs.length;
    return (
        <section className={styles.sheet}>
            <h1>{topic.title}</h1>
            <p>עמוד לדוגמה {pageIndex + 1} מתוך {pageCount}. כאן נכניס בהמשך את החומר האמיתי של הנושא.</p>
            <p className={styles.hint}>דוגמת כלל השלמה: יש לעבור בכל שלוש הכרטיסיות בעמוד.</p>
            <div className={styles.tabs}>
                {tabs.map((title, i) => (
                    <button type="button" key={title} onClick={() => setVisited(old => old.includes(i) ? old : [...old, i])}>
                        {title} {visited.includes(i) ? "✓" : ""}
                    </button>
                ))}
            </div>
            <button type="button" className={styles.finish} disabled={!allVisited} onClick={onPageComplete}>
                {pageIndex === pageCount - 1 ? "סיום הנושא" : "סיימתי את העמוד"}
            </button>
        </section>
    );
}

import styles from "./TopicContent.module.css";
import Introduction from "./Introduction";
import MemorialProcess from "./MemorialProcess/MemorialProcess";

export default function TopicContent({ topic, pageIndex = 0, onPageComplete, onPageReady }) {
    if (topic.id === "introduction") {
        return <Introduction onPageComplete={onPageComplete} />;
    }

    if (topic.id === "memorialProcess" && pageIndex === 0) {
        return <MemorialProcess onPageReady={onPageReady} />;
    }

    if (topic.id === "memorialProcess") {
        return (
            <section className={styles.sheet}>
                <h1>תהליך תיאום אזכרה</h1>
                <div className={styles.body}>
                    <p>עמוד {pageIndex + 1} מתוך 3 — כאן נכניס את התוכן של המסך הירוק הבא.</p>
                    <button type="button" className={styles.finish} onClick={onPageReady}>
                        סיימתי לעיין בעמוד (בדיקה זמנית)
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.sheet}>
            <h1>{topic.title}</h1>
            <div className={styles.body}>
                <p>כאן יופיע בהמשך התוכן הלימודי של הנושא.</p>
                <button type="button" className={styles.finish} onClick={onPageComplete}>
                    הבנתי, סיום העמוד
                </button>
            </div>
        </section>
    );
}

import Introduction from "./Introduction";
import styles from "./TopicContent.module.css";

export default function TopicContent({ topic, onPageComplete }) {
    if (topic.id === "introduction") {
        return <Introduction onPageComplete={onPageComplete} />;
    }

    return (
        <section className={styles.sheet}>
            <h1>{topic.title}</h1>
            <div className={styles.body}>
                <p>כאן יופיע בהמשך התוכן הלימודי של הנושא.</p>
                <button type="button" className={styles.finish} onClick={onPageComplete}>
                    הבנתי, סיום הנושא
                </button>
            </div>
        </section>
    );
}

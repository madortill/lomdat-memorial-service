import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./ContentPopup.module.css";
import homeBtn from "../../assets/img/homeBtn.svg";
import TopicContent from "../Topics/TopicContent";
import ExerciseContent from "../Exercises/ExerciseContent";
import { pageCounts } from "../Topics/topicRegistry";

export default function ContentPopup({ topic, startRect, onClose, progress, onCompletePage }) {
    const completedPages = progress?.completedPages || [];
    const pageCount = pageCounts[topic.id];
    const firstIncomplete = Array.from({ length: pageCount }, (_, i) => i)
        .find(i => !completedPages.includes(i));
    const [pageIndex, setPageIndex] = useState(firstIncomplete ?? pageCount - 1);
    const [closing, setClosing] = useState(false);
    const [ready, setReady] = useState(false);

    const close = () => { if (!closing) setClosing(true); };

    useEffect(() => {
        const onKey = e => { if (e.key === "Escape") setClosing(true); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const finishPage = () => {
        onCompletePage(pageIndex);
        if (pageIndex === pageCount - 1) close();
        else setPageIndex(index => index + 1);
    };

    const canGoForward = completedPages.includes(pageIndex);
    const next = () => {
        if (canGoForward && pageIndex < pageCount - 1) setPageIndex(i => i + 1);
    };

    const isExercise = topic.type === "exercise";

    return createPortal(
        <div className={styles.overlay} dir="rtl" role="dialog" aria-modal="true" aria-label={topic.title}>
            <div className={`${styles.backdrop} ${closing ? styles.fadeOut : ""}`} />
            <div
                className={`${styles.panel} ${isExercise ? styles.exercisePanel : styles.topicPanel} ${closing ? styles.closing : ""}`}
                style={{
                    "--from-top": `${startRect.top}px`,
                    "--from-left": `${startRect.left}px`,
                    "--from-width": `${startRect.width}px`,
                    "--from-height": `${startRect.height}px`
                }}
                onAnimationEnd={e => {
                    if (e.target !== e.currentTarget) return;
                    if (closing) onClose();
                    else setReady(true);
                }}
            >
                <button className={styles.homeBtn} type="button" onClick={close} aria-label="חזרה ללוח השעם">
                    <img src={homeBtn} alt="" />
                </button>
                <div className={`${styles.inner} ${ready ? styles.visible : ""}`}>
                    {isExercise ? (
                        <ExerciseContent key={`${topic.id}-${pageIndex}`} topic={topic} pageIndex={pageIndex} pageCount={pageCount}
                            onPageComplete={finishPage} />
                    ) : (
                        <TopicContent key={`${topic.id}-${pageIndex}`} topic={topic} pageIndex={pageIndex} pageCount={pageCount}
                            onPageComplete={finishPage} />
                    )}
                    <nav className={styles.navigation} aria-label="ניווט בין עמודי הנושא">
                        <button type="button" disabled={pageIndex === 0} onClick={() => setPageIndex(i => i - 1)}>הקודם</button>
                        <span>עמוד {pageIndex + 1} מתוך {pageCount}</span>
                        <button type="button" disabled={pageIndex === pageCount - 1 || !canGoForward} onClick={next}>הבא</button>
                    </nav>
                </div>
            </div>
        </div>,
        document.body
    );
}

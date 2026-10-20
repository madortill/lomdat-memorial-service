import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./ContentPopup.module.css";
import homeBtn from "../../assets/img/homeBtn.svg";
import TopicContent from "../Topics/TopicContent";
import ExerciseContent from "../Exercises/ExerciseContent";
import { pageCounts } from "../Topics/topicRegistry";

export default function ContentPopup({ topic, startRect, onClose, progress, onCompletePage }) {
    const pageCount = pageCounts[topic.id] || 1;
    const completedPages = progress?.completedPages || [];
    const firstIncomplete = Array.from({ length: pageCount }, (_, index) => index)
        .find(index => !completedPages.includes(index));
    const [pageIndex, setPageIndex] = useState(firstIncomplete ?? pageCount - 1);
    const [closing, setClosing] = useState(false);
    const [ready, setReady] = useState(false);
    const isExercise = topic.type === "exercise";

    useEffect(() => {
        const onKeyDown = (event) => {
            if (event.key === "Escape") setClosing(true);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    const close = () => {
        if (!closing) setClosing(true);
    };

    const finishPage = () => {
        if (closing) return;
        onCompletePage(pageIndex);
        if (pageIndex === pageCount - 1) close();
        else setPageIndex(index => index + 1);
    };

    const canMoveForward = completedPages.includes(pageIndex);

    const navigation = pageCount > 1 && (
        <nav className={styles.navigation} aria-label="ניווט בין עמודי הנושא">
            <button type="button" disabled={pageIndex === 0} onClick={() => setPageIndex(index => index - 1)}>
                חזור
            </button>
            <button type="button" disabled={pageIndex === pageCount - 1 || !canMoveForward}
                onClick={() => setPageIndex(index => index + 1)}>
                הבא
            </button>
        </nav>
    );

    const handleAnimationEnd = (event) => {
        if (event.target !== event.currentTarget) return;
        if (closing) onClose();
        else setReady(true);
    };

    return createPortal(
        <div className={styles.overlay} dir="rtl" role="dialog" aria-modal="true" aria-label={topic.title}>
            <div className={`${styles.backdrop} ${closing ? styles.backdropClosing : ""}`} />
            <div
                className={`${styles.panel} ${isExercise ? styles.exercisePanel : styles.topicPanel} ${closing ? styles.closing : ""}`}
                style={{
                    "--from-top": `${startRect.top}px`,
                    "--from-left": `${startRect.left}px`,
                    "--from-width": `${startRect.width}px`,
                    "--from-height": `${startRect.height}px`,
                    "--note-color": topic.popupColor || "#FFF1D5"
                }}
                onAnimationEnd={isExercise ? handleAnimationEnd : undefined}
            >
                <div className={styles.inner}>
                    <div className={styles.contentCard} onAnimationEnd={!isExercise ? handleAnimationEnd : undefined}>
                        {isExercise ? (
                            <>
                                <span className={styles.exerciseTitle}>{topic.title}</span>
                                <button className={styles.exerciseCloseBtn} type="button" onClick={close} aria-label="סגירת התרגול">
                                    ✕
                                </button>
                            </>
                        ) : (
                            <button className={styles.homeBtn} type="button" onClick={close} aria-label="חזרה ללוח השעם">
                                <img src={homeBtn} alt="" />
                            </button>
                        )}
                        <div className={`${styles.contentBody} ${ready ? styles.visible : ""}`}>
                            {isExercise ? (
                                <ExerciseContent key={`${topic.id}-${pageIndex}`} topic={topic} pageIndex={pageIndex}
                                    pageCount={pageCount} onPageComplete={finishPage} />
                            ) : (
                                <TopicContent key={`${topic.id}-${pageIndex}`} topic={topic} pageIndex={pageIndex}
                                    pageCount={pageCount} onPageComplete={finishPage} />
                            )}
                            {navigation}
                        </div>
                    </div>
                    {!isExercise && (
                        <div className={styles.pageCounter}>
                            עמוד {pageIndex + 1} מתוך {pageCount}
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}

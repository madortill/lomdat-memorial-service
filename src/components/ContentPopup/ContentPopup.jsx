import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./ContentPopup.module.css";
import homeBtn from "../../assets/img/homeBtn.svg";
import TopicContent from "../Topics/TopicContent";
import ExerciseContent from "../Exercises/ExerciseContent";
import { pageCounts } from "../Topics/topicRegistry";

export default function ContentPopup({ topic, startRect, onClose, progress, onCompletePage }) {
    const pageCount = pageCounts[topic.id] || 1;
    const completedPages = progress?.completedPages || [];
    const lastPageKey = `memorial-last-page-${topic.id}`;

    const [pageIndex, setPageIndex] = useState(() => {
        const saved = sessionStorage.getItem(lastPageKey);

        if (saved !== null) {
            const index = Number(saved);

            if (
                Number.isInteger(index) &&
                index >= 0 &&
                index < pageCount
            ) {
                return index;
            }
        }

        const firstIncomplete = Array.from(
            { length: pageCount },
            (_, index) => index
        ).find(index => !completedPages.includes(index));

        return firstIncomplete ?? pageCount - 1;
    });

    useEffect(() => {
        sessionStorage.setItem(
            lastPageKey,
            String(pageIndex)
        );
    }, [pageIndex, lastPageKey]);

    const [closing, setClosing] = useState(false);
    const [ready, setReady] = useState(false);
    const [readyPages, setReadyPages] = useState(() => [...completedPages]);
    const isExercise = topic.type === "exercise";
    const isMemorial = topic.id === "memorialProcess";

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

    const markReady = useCallback(() => {
        setReadyPages(previous => previous.includes(pageIndex)
            ? previous
            : [...previous, pageIndex]);
    }, [pageIndex]);

    const finishPage = () => {
        if (closing) return;
        onCompletePage(pageIndex);
        if (pageIndex === pageCount - 1) close();
        else setPageIndex(index => index + 1);
    };

    const canMoveForward = completedPages.includes(pageIndex) || readyPages.includes(pageIndex);

    const goForward = () => {
        if (closing || !canMoveForward) return;
        if (isMemorial && !completedPages.includes(pageIndex)) {
            onCompletePage(pageIndex);
        }
        if (pageIndex === pageCount - 1) close();
        else setPageIndex(index => index + 1);
    };

    const navigation = pageCount > 1 && (
        <nav className={styles.navigation} aria-label="ניווט בין עמודי הנושא">
            {pageIndex > 0 && (
                <button type="button" onClick={() => setPageIndex(index => index - 1)}>
                    הקודם
                </button>
            )}
            <button
                type="button"
                className={styles.navigationNext}
                disabled={!canMoveForward || closing}
                onClick={goForward}
            >
                {pageIndex === pageCount - 1 ? "הבנתי!" : "הבא"}
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
                                <button className={styles.exerciseCloseBtn} type="button" onClick={close} aria-label="סגירת התרגול">✕</button>
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
                                <TopicContent
                                    key={`${topic.id}-${pageIndex}`}
                                    topic={topic}
                                    pageIndex={pageIndex}
                                    pageCount={pageCount}
                                    onPageComplete={finishPage}
                                    onPageReady={markReady}
                                />
                            )}
                        </div>
                        {navigation}
                    </div>
                    {!isExercise && <div className={styles.pageCounter}>עמוד {pageIndex + 1} מתוך {pageCount}</div>}
                </div>
            </div>
        </div>,
        document.body
    );
}

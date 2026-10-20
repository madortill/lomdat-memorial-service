
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./HomePage.module.css";

import corkBoard from "../../assets/img/corkBoard.svg";
import homeBtn from "../../assets/img/homeBtn.svg";

import TopicContent from "../Topics/TopicContent";

const topics = [
    {
        id: "introduction",
        title: "מבוא",
        color: "cream",
        popupColor: "#FFF1D5",
        type: "topic"
    },
    {
        id: "memorialProcess",
        title: "תהליך תיאום אזכרה",
        color: "green",
        popupColor: "#E2EAD2",
        type: "topic"
    },
    {
        id: "technicalDetails",
        title: "פרטים טכניים",
        color: "purple",
        popupColor: "#DCD4ED",
        type: "topic"
    },
    {
        id: "injuredRelatives",
        title: "דגשים לקצין הנפגעים",
        color: "blue",
        popupColor: "#D7ECF8",
        type: "topic"
    },
    {
        id: "militaryMemorials",
        title: "אזכרות עפ״י וגיבורי ישראל / אזכרות מקורבים",
        color: "pink",
        popupColor: "#F9DFD7",
        type: "topic"
    },
    {
        id: "casualtyGuidelines",
        title: "חללי נצר אחרון",
        color: "yellow",
        popupColor: "#FFE59B",
        type: "topic"
    },
    {
        id: "exercise1",
        title: "תרגול 1",
        popupColor: "#F1DDC4",
        type: "exercise"
    },
    {
        id: "exercise2",
        title: "תרגול 2",
        popupColor: "#A7D6D1",
        type: "exercise"
    },
    {
        id: "exercise3",
        title: "תרגול 3",
        popupColor: "#D4C4A9",
        type: "exercise"
    }
];

const STORAGE_KEY = "memorialUnlockedIndex";

const HomePage = () => {
    const [unlockedIndex, setUnlockedIndex] = useState(() => {
        const saved = Number(sessionStorage.getItem(STORAGE_KEY) || 0);

        return Number.isInteger(saved)
            ? Math.max(0, Math.min(saved, topics.length - 1))
            : 0;
    });

    const [activeTopic, setActiveTopic] = useState(null);
    const [startRect, setStartRect] = useState(null);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        sessionStorage.setItem(
            STORAGE_KEY,
            unlockedIndex.toString()
        );
    }, [unlockedIndex]);

    useEffect(() => {
        if (!activeTopic) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsClosing(true);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [activeTopic]);

    const openTopic = (topic, index, event) => {
        if (index > unlockedIndex || activeTopic) return;

        const rect = event.currentTarget.getBoundingClientRect();

        setStartRect({
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
        });

        setIsClosing(false);
        setActiveTopic({ ...topic, index });
    };

    const closeTopic = () => {
        if (isClosing) return;
        setIsClosing(true);
    };

    const handleAnimationEnd = (event) => {
        if (event.target !== event.currentTarget) return;

        if (isClosing) {
            setActiveTopic(null);
            setStartRect(null);
            setIsClosing(false);
        }
    };

    const handleComplete = () => {
        if (!activeTopic) return;

        const nextUnlocked = Math.min(
            activeTopic.index + 1,
            topics.length - 1
        );

        setUnlockedIndex((prev) => Math.max(prev, nextUnlocked));
        closeTopic();
    };

    const renderTopic = (topic, index) => {
        const isUnlocked = index <= unlockedIndex;
        const isCompleted = index < unlockedIndex;

        return (
            <button
                key={topic.id}
                type="button"
                className={`${styles.note} ${styles[topic.color]}`}
                onClick={(event) => openTopic(topic, index, event)}
                disabled={!isUnlocked}
                aria-label={topic.title}
            >
                <span className={styles.pin} />

                <span className={styles.noteTitle}>
                    {topic.title}
                </span>

                {isCompleted && (
                    <span className={styles.checkmark}>✓</span>
                )}

                {!isUnlocked && (
                    <span className={styles.lock}>🔒</span>
                )}
            </button>
        );
    };

    return (
        <div className={styles.page} dir="rtl">

            <div className={styles.boardArea}>
                <img
                    src={corkBoard}
                    alt=""
                    className={styles.corkBoard}
                />

                <div className={styles.notesGrid}>
                    {topics.slice(0, 6).map(renderTopic)}
                </div>
            </div>

            <div className={styles.exercises}>
                {topics.slice(6).map((topic, index) => {
                    const topicIndex = index + 6;
                    const isUnlocked = topicIndex <= unlockedIndex;

                    return (
                        <button
                            key={topic.id}
                            type="button"
                            className={`${styles.exercise} ${styles[`exercise${index + 1}`]
                                }`}
                            disabled={!isUnlocked}
                            onClick={(event) =>
                                openTopic(topic, topicIndex, event)
                            }
                        >
                            <span>{topic.title}</span>
                            {!isUnlocked && <span>🔒</span>}
                        </button>
                    );
                })}
            </div>

            {activeTopic && startRect && createPortal(
                <div className={styles.overlay}>
                    <div
                        className={`${styles.backdrop} ${isClosing ? styles.backdropClosing : ""
                            }`}
                        onClick={closeTopic}
                    />

                    <div
                        className={`${styles.expandedNote} ${isClosing ? styles.expandedNoteClosing : ""
                            }`}
                        style={{
                            "--from-top": `${startRect.top}px`,
                            "--from-left": `${startRect.left}px`,
                            "--from-width": `${startRect.width}px`,
                            "--from-height": `${startRect.height}px`,
                            backgroundColor: activeTopic.popupColor || "#FFF1D5"
                        }}
                        onAnimationEnd={handleAnimationEnd}
                    >
                        <button
                            type="button"
                            className={styles.homeBtn}
                            onClick={closeTopic}
                            aria-label="חזרה ללוח השעם"
                            title="חזרה ללוח השעם"
                        >
                            <img src={homeBtn} alt="" />
                        </button>

                        <div className={styles.expandedContent}>
                            <TopicContent
                                topic={activeTopic}
                                onComplete={handleComplete}
                            />
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default HomePage;


import { useState } from "react";
import styles from "./HomePage.module.css";

import corkBoard from "../../assets/img/corkBoard.svg";

import ContentPopup from "../ContentPopup/ContentPopup";
import { useMemorialProgress } from "../../utils/useMemorialProgress";

const topics = [
    { id: "introduction", title: "מבוא", color: "cream", popupColor: "#FFF1D5", type: "topic" },
    { id: "memorialProcess", title: "תהליך תיאום אזכרה", color: "green", popupColor: "#E2EAD2", type: "topic" },
    { id: "exercise1", title: "תרגול 1", popupColor: "#F1DDC4", type: "exercise" },
    { id: "technicalDetails", title: "פרטים טכניים", color: "purple", popupColor: "#F6F2FF", type: "topic" },
    { id: "injuredRelatives", title: "דגשים לקצין הנפגעים", color: "blue", popupColor: "#D7ECF8", type: "topic" },
    { id: "exercise2", title: "תרגול 2", popupColor: "#A7D6D1", type: "exercise" },
    { id: "militaryMemorials", title: "אזכרות ספ״כ וגיבורי ישראל, אזכרות מקורבים", color: "pink", popupColor: "#F9E6DC", type: "topic" },
    { id: "casualtyGuidelines", title: "חללי נצר אחרון", color: "yellow", popupColor: "#FFE59B", type: "topic" },
    { id: "exercise3", title: "תרגול 3", popupColor: "#D4C4A9", type: "exercise" }
];

const HomePage = () => {
    const { unlockedIndex, progress, completePage } = useMemorialProgress(topics);
    const [activeTopic, setActiveTopic] = useState(null);
    const [startRect, setStartRect] = useState(null);

    const openTopic = (topic, index, event) => {
        if (index > unlockedIndex || activeTopic) return;
        const rect = event.currentTarget.getBoundingClientRect();
        setStartRect({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });
        setActiveTopic({ ...topic, index });
    };

    const closeTopic = () => {
        setActiveTopic(null);
        setStartRect(null);
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
                    {topics.map((topic, index) => ({ topic, index })).filter(({ topic }) => topic.type === "topic").map(({ topic, index }) => renderTopic(topic, index))}
                </div>
            </div>

            <div className={styles.exercises}>
                {topics.filter(topic => topic.type === "exercise").map((topic, index) => {
                    const topicIndex = topics.findIndex(item => item.id === topic.id);
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

            {activeTopic && startRect && (
                <ContentPopup
                    topic={activeTopic}
                    startRect={startRect}
                    onClose={closeTopic}
                    progress={progress[activeTopic.id]}
                    onCompletePage={(pageIndex) => completePage(activeTopic.id, pageIndex)}
                />
            )}
        </div>
    );
};

export default HomePage;

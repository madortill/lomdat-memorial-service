import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

import corkBoard from "../../assets/img/corkBoard.svg";
import petekBeige from "../../assets/img/petekBeige.png";
import petekGreen from "../../assets/img/petekGreen.png";
import petekPurple from "../../assets/img/petekPurple.png";
import petekBlue from "../../assets/img/petekBlue.png";
import petekPink from "../../assets/img/petekPink.png";
import petekYellow from "../../assets/img/petekYellow.png";
import tirgul1Cup from "../../assets/img/tirgul1Cup.png";
import tirgul2Case from "../../assets/img/tirgul2Case.png";
import tirgul3Notebook from "../../assets/img/tirgul3Notebook.png";

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
    { id: "casualtyGuidelines", title: "חללי נצר אחרון", color: "yellow", popupColor: "#FFF4CF", type: "topic" },
    { id: "exercise3", title: "תרגול 3", popupColor: "#D4C4A9", type: "exercise" }
];

// תמונת הפתקית לפי הצבע, הפרופורציות שלה (רוחב / גובה), הנטייה שכבר מובנית בתמונה (במעלות)
// ו-size - הגדלה של פתקית ספציפית (1 = גודל רגיל, 1.15 = גדולה ב-15%)
// ו-check - מיקום סימון ה-✓ באחוזים מגודל הפתקית עצמה (ולכן רספונסיבי):
//   top: כמה אחוזים מהקצה העליון (שלילי = מעל הפתקית, חיובי = בתוכה)
//   right: כמה אחוזים מהקצה הימני (שלילי = מחוץ לפתקית, חיובי = בתוכה)
//   size: גודל הסימון (1 = רגיל)
const noteImages = {
    cream: { src: petekBeige, ratio: "230 / 230", tilt: 6, size: 1, check: { top: 15, right: 2, size: 1 } },
    green: { src: petekGreen, ratio: "189 / 220", tilt: 3, size: 1, check: { top: 5, right: -4, size: 1 } },
    purple: { src: petekPurple, ratio: "242 / 191", tilt: -4.5, size: 1, check: { top: -4, right: 3, size: 1 } },
    blue: { src: petekBlue, ratio: "226 / 234", tilt: 4, size: 1, check: { top: 8, right: -4, size: 1 } },
    pink: { src: petekPink, ratio: "267 / 267", tilt: -1, size: 1.12, check: { top: 10, right: 0, size: 1 } },
    yellow: { src: petekYellow, ratio: "235 / 226", tilt: -1.5, size: 1, check: { top: 2, right: 3, size: 1 } }
};

const exerciseImages = {
    exercise1: tirgul1Cup,
    exercise2: tirgul2Case,
    exercise3: tirgul3Notebook
};

const LONG_TITLE_LENGTH = 20;

// פתקיות / תרגולים שהמשתמש כבר לחץ עליהם - מפסיקים להבהב
const SEEN_KEY = "memorial-seen-topics";
// מסך הסיום נפתח פעם אחת בלבד בכל ריצה של הלומדה
const END_SEEN_KEY = "memorial-end-page-seen";

const readSeen = () => {
    try {
        const saved = JSON.parse(sessionStorage.getItem(SEEN_KEY) || "[]");
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
};

const hasSeenEndPage = () => {
    try {
        return sessionStorage.getItem(END_SEEN_KEY) === "true";
    } catch {
        return false;
    }
};

const FINAL_EXERCISE_ID = "exercise3";
const END_PAGE_DELAY_MS = 200;

const HomePage = () => {
    const navigate = useNavigate();
    const finishedFinalExercise = useRef(false);
    const endPageTimer = useRef(null);
    const { unlockedIndex, progress, completePage } = useMemorialProgress(topics);
    const [activeTopic, setActiveTopic] = useState(null);
    const [startRect, setStartRect] = useState(null);
    const [seenIds, setSeenIds] = useState(readSeen);

    const markSeen = (id) => {
        setSeenIds(current => {
            if (current.includes(id)) return current;

            const updated = [...current, id];

            try {
                sessionStorage.setItem(SEEN_KEY, JSON.stringify(updated));
            } catch {
                // ממשיכים גם בלי אחסון זמין
            }

            return updated;
        });
    };

    // הפריט הפתוח הבא ללחיצה מקבל זוהר עד שהמשתמש לוחץ עליו
    const shouldGlow = (topic, index) =>
        index === unlockedIndex && !seenIds.includes(topic.id);

    const openTopic = (topic, index, event) => {
        if (index > unlockedIndex || activeTopic) return;
        const rect = event.currentTarget.getBoundingClientRect();
        setStartRect({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });
        setActiveTopic({ ...topic, index });
        markSeen(topic.id);
    };

    useEffect(() => {
        return () => clearTimeout(endPageTimer.current);
    }, []);

    const closeTopic = () => {
        setActiveTopic(null);
        setStartRect(null);

        // סיום תרגול 3 - שנייה קצרה ואז מעבר למסך הסיום (פעם אחת בלבד)
        if (finishedFinalExercise.current) {
            finishedFinalExercise.current = false;

            if (hasSeenEndPage()) return;

            endPageTimer.current = setTimeout(() => {
                try {
                    sessionStorage.setItem(END_SEEN_KEY, "true");
                } catch {
                    // ממשיכים גם בלי אחסון זמין
                }

                navigate("/end");
            }, END_PAGE_DELAY_MS);
        }
    };

    const handleCompletePage = (pageIndex) => {
        completePage(activeTopic.id, pageIndex);

        if (activeTopic.id === FINAL_EXERCISE_ID) {
            finishedFinalExercise.current = true;
        }
    };

    const renderTopic = (topic, index) => {
        const isUnlocked = index <= unlockedIndex;
        const isCompleted = index < unlockedIndex;
        const image = noteImages[topic.color];

        return (
            <div key={topic.id} className={styles.noteCell}>
                <button
                    type="button"
                    className={[
                        styles.note,
                        !isUnlocked ? styles.locked : "",
                        shouldGlow(topic, index) ? styles.glowing : ""
                    ].filter(Boolean).join(" ")}
                    style={{
                        "--ratio": image.ratio,
                        "--tilt": `${image.tilt}deg`,
                        "--size": image.size,
                        "--check-top": `${image.check.top}%`,
                        "--check-right": `${image.check.right}%`,
                        "--check-size": image.check.size
                    }}
                    onClick={(event) => openTopic(topic, index, event)}
                    disabled={!isUnlocked}
                    aria-label={topic.title}
                >
                    <img
                        src={image.src}
                        alt=""
                        className={styles.noteImage}
                        draggable={false}
                    />

                    <span
                        className={[
                            styles.noteTitle,
                            topic.title.length > LONG_TITLE_LENGTH ? styles.noteTitleLong : ""
                        ].filter(Boolean).join(" ")}
                    >
                        {topic.title}
                    </span>

                    {isCompleted && (
                        <span className={styles.checkmark} aria-hidden="true">✓</span>
                    )}
                </button>
            </div>
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
                            className={[
                                styles.exercise,
                                styles[`exercise${index + 1}`],
                                !isUnlocked ? styles.locked : "",
                                shouldGlow(topic, topicIndex) ? styles.glowing : ""
                            ].filter(Boolean).join(" ")}
                            disabled={!isUnlocked}
                            onClick={(event) =>
                                openTopic(topic, topicIndex, event)
                            }
                            aria-label={topic.title}
                        >
                            <img
                                src={exerciseImages[topic.id]}
                                alt=""
                                className={styles.exerciseImage}
                                draggable={false}
                            />
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
                    onCompletePage={handleCompletePage}
                />
            )}
        </div>
    );
};

export default HomePage;
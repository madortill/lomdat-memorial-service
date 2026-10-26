
import { useEffect, useState } from "react";
import TopicLayout from "../TopicLayout/TopicLayout";
import styles from "./TechnicalRepresentatives.module.css";

import iconCursor from "../../../assets/img/iconCursor.svg";
import person from "../../../assets/img/person.svg";

const STORAGE_KEY = "technical-representatives-visited";

const people = [
    {
        id: "person1",
        content: (
            <>
                הנציגות המחייבת תמנה{" "}
                <strong>לכל הפחות עשרה חיילים בשנה הראשונה</strong>
                {" "}לאחר המוות.
                <br />
                בשנים שלאחר מכן הנציגות תמנה{" "}
                <strong>2–50 נציגים</strong>
                {" "}בכפוף לאילוצי היחידות השונות.
            </>
        )
    },
    {
        id: "person2",
        content: (
            <>
                יש לוודא שהיחידה שולחת מס׳ נציגים כפי שהמשפחה ביקשה,
                ושהינם{" "}
                <strong>גברים יהודים</strong>
                {" "}(לצורך השלמת המניין).
                <br />
                הנציגים יגיעו חצי שעה לפני תחילת האזכרה,
                לאחר שתודרכו וקראו{" "}
                <strong>דף חלל</strong>
                {" "}(ניתן באתר ״יזכור״).
            </>
        )
    },
    {
        id: "person3",
        content: (
            <>
                <strong>
                    בנוסף לשליחת נציגות היחידה, מדור נפגעים ישלח
                    נציגות מטעמו לבית העלמין
                </strong>
                {" "}לצורך השתתפות באזכרה.
                <br />
                הנציג (רמ״ד, ס.רמ״ד, ע.רמ״ד) מטעם מדור נפגעים
                ממלא דו״ח אזכרה – הדו״ח יתויק בתיק החלל.
            </>
        )
    }
];

const readVisited = () => {
    try {
        const saved = JSON.parse(
            sessionStorage.getItem(STORAGE_KEY) || "[]"
        );

        return Array.isArray(saved)
            ? [...new Set(saved.filter(id =>
                people.some(item => item.id === id)
            ))]
            : [];
    } catch {
        return [];
    }
};

const TechnicalRepresentatives = ({ onPageReady }) => {
    const [visited, setVisited] = useState(readVisited);

    const [activeIndex, setActiveIndex] = useState(() => {
        const saved = readVisited();

        if (!saved.length) return null;

        return people.findLastIndex(item =>
            saved.includes(item.id)
        );
    });

    const nextUnvisitedIndex = people.findIndex(item =>
        !visited.includes(item.id)
    );

    const allVisited = people.every(item =>
        visited.includes(item.id)
    );

    useEffect(() => {
        if (allVisited) {
            onPageReady?.();
        }
    }, [allVisited, onPageReady]);

    const handlePersonClick = (index) => {
        const selected = people[index];
        const alreadyVisited = visited.includes(selected.id);

        if (!alreadyVisited && index !== nextUnvisitedIndex) {
            return;
        }

        setActiveIndex(index);

        if (!alreadyVisited) {
            const updated = [...visited, selected.id];

            setVisited(updated);
            sessionStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(updated)
            );
        }
    };

    return (
        <TopicLayout
            title="פרטים טכניים - נציגות חיילים"
            className={styles.page}
            headerContent={
                <p className={styles.instructions}>
                    <img
                        src={iconCursor}
                        alt=""
                        className={styles.cursor}
                    />
                    לחצו על האנשים למטה כדי ללמוד עוד
                </p>
            }
        >
            <div className={styles.stage}>
                <div
                    className={styles.bubbleArea}
                    style={{
                        "--active-person": activeIndex ?? 1
                    }}
                >
                    {activeIndex !== null && (
                        <div className={styles.bubbleWrapper}>
                            <div
                                key={activeIndex}
                                className={styles.speechBubble}
                                role="status"
                            >
                                <p>{people[activeIndex].content}</p>
                            </div>

                            <span
                                className={styles.bubblePointer}
                                aria-hidden="true"
                            />
                        </div>
                    )}
                </div>

                <div
                    className={styles.peopleRow}
                    aria-label="נציגות חיילים"
                >
                    {people.map((item, index) => {
                        const isVisited = visited.includes(item.id);
                        const isActive = activeIndex === index;
                        const isNext = nextUnvisitedIndex === index;
                        const isAvailable = isVisited || isNext;

                        return (
                            <button
                                key={item.id}
                                type="button"
                                className={[
                                    styles.personButton,
                                    isActive ? styles.active : "",
                                    isVisited ? styles.visited : "",
                                    isNext ? styles.glowing : ""
                                ].filter(Boolean).join(" ")}
                                disabled={!isAvailable}
                                aria-label={`נציג ${index + 1}${isVisited ? ", נצפה" : ""}`}
                                aria-pressed={isActive}
                                onClick={() => handlePersonClick(index)}
                            >
                                <span
                                    className={styles.personShape}
                                    style={{
                                        "--person-mask": `url("${person}")`
                                    }}
                                    aria-hidden="true"
                                />
                            </button>
                        );
                    })}
                </div>
            </div>
        </TopicLayout>
    );
};

export default TechnicalRepresentatives;


import { useEffect, useState } from "react";
import TopicLayout from "../TopicLayout/TopicLayout";
import styles from "./MemorialHours.module.css";

import iconCursor from "../../../assets/img/iconCursor.svg";

import clockYellowFront from "../../../assets/img/clockYellowFront.svg";
import clockYellowBack from "../../../assets/img/clockYellowBack.svg";

import clockBlueFront from "../../../assets/img/clockBlueFront.svg";
import clockBlueBack from "../../../assets/img/clockBlueBack.svg";

import clockRedFront from "../../../assets/img/clockRedFront.svg";
import clockRedBack from "../../../assets/img/clockRedBack.svg";

const STORAGE_KEY = "technical-memorial-hours-visited";
const FLIPPED_STORAGE_KEY = "technical-memorial-hours-flipped";

const clocks = [
    {
        id: "summer",
        label: "שעון קיץ",
        front: clockYellowFront,
        back: clockYellowBack,
    },
    {
        id: "winter",
        label: "שעון חורף",
        front: clockBlueFront,
        back: clockBlueBack,
    },
    {
        id: "fasting",
        label: "ימי צום",
        front: clockRedFront,
        back: clockRedBack,
    },
];

const readSavedIds = (storageKey) => {
    try {
        const stored = JSON.parse(
            sessionStorage.getItem(storageKey) || "[]"
        );

        if (!Array.isArray(stored)) return [];

        return [
            ...new Set(
                stored.filter(id =>
                    clocks.some(clock => clock.id === id)
                )
            )
        ];
    } catch {
        return [];
    }
};

const MemorialHours = ({ onPageReady }) => {
    const [visited, setVisited] = useState(() =>
        readSavedIds(STORAGE_KEY)
    );

    const [flipped, setFlipped] = useState(() =>
        readSavedIds(FLIPPED_STORAGE_KEY)
    );

    const allVisited = clocks.every(clock =>
        visited.includes(clock.id)
    );

    useEffect(() => {
        if (allVisited) {
            onPageReady?.();
        }
    }, [allVisited, onPageReady]);

    const toggleClock = (id) => {
        const isCurrentlyFlipped = flipped.includes(id);

        const updatedFlipped = isCurrentlyFlipped
            ? flipped.filter(item => item !== id)
            : [...flipped, id];

        setFlipped(updatedFlipped);

        const updatedVisited = visited.includes(id)
            ? visited
            : [...visited, id];

        if (!visited.includes(id)) {
            setVisited(updatedVisited);
        }

        try {
            sessionStorage.setItem(
                FLIPPED_STORAGE_KEY,
                JSON.stringify(updatedFlipped)
            );

            sessionStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(updatedVisited)
            );
        } catch {
            // הפעילות ממשיכה גם אם האחסון אינו זמין
        }
    };

    return (
        <TopicLayout
            title="פרטים טכניים - שעות אזכרה"
            className={styles.page}
            headerContent={
                <p className={styles.instructions}>
                    <img
                        src={iconCursor}
                        alt=""
                        className={styles.cursor}
                    />
                    לחצו על השעונים כדי ללמוד עוד
                </p>
            }
        >
            <section
                className={styles.stage}
                dir="rtl"
                aria-label="שעות האזכרה"
            >
                <div className={styles.clocksGrid}>
                    {clocks.map(clock => {
                        const isFlipped = flipped.includes(clock.id);
                        const isVisited = visited.includes(clock.id);

                        return (
                            <button
                                key={clock.id}
                                type="button"
                                className={[
                                    styles.clockButton,
                                    isFlipped ? styles.flipped : "",
                                    isVisited ? styles.visited : ""
                                ].filter(Boolean).join(" ")}
                                onClick={() => toggleClock(clock.id)}
                                aria-pressed={isFlipped}
                                aria-label={
                                    `${clock.label}, ${isFlipped
                                        ? "לחצו להצגת הצד הקדמי"
                                        : "לחצו להצגת ההסבר"
                                    }`
                                }
                                title={clock.label}
                            >
                                <span className={styles.clockInner}>
                                    <span className={styles.clockFront}>
                                        <img
                                            src={clock.front}
                                            alt=""
                                            draggable={false}
                                        />
                                    </span>

                                    <span className={styles.clockBack}>
                                        <img
                                            src={clock.back}
                                            alt=""
                                            draggable={false}
                                        />
                                    </span>
                                </span>
                            </button>
                        );
                    })}
                </div>
            </section>
        </TopicLayout>
    );
};

export default MemorialHours;

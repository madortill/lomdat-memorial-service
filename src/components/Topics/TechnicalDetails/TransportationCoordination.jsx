
import { useEffect, useState } from "react";
import TopicLayout from "../TopicLayout/TopicLayout";
import styles from "./TransportationCoordination.module.css";

import busIcon from "../../../assets/img/bus.svg";

const STORAGE_KEY = "technical-transportation-visited";

const transportationSteps = [
    {
        id: "firstYear",
        title: "תיאום ההסעה בשנה הראשונה",
        content: (
            <>
                <strong>בשנה הראשונה לאבל</strong>
                {" "}– קצין הנפגעים יתאם את ההסעה
                לאזכרה רק בשנת האבל הראשונה.
                כנ״ל לגבי ציוד לוגיסטי.
            </>
        )
    },
    {
        id: "followingYears",
        title: "תיאום ההסעה לאורך השנים",
        content: (
            <>
                <strong>
                    לאורך השנים המשפחה היא שמתאמת את ההסעה
                    מול משרד הביטחון
                </strong>
                {" "}– אגף הנצחה ומורשת.
            </>
        )
    },
    {
        id: "booking",
        title: "הזמנת ההסעה",
        content: (
            <>
                את ההסעה יש להזמין כ־10–14 ימים
                טרם מועד האזכרה.
            </>
        )
    },
    {
        id: "problems",
        title: "בעיות בהזמנת ההסעות",
        content: (
            <>
                רק במידה ועולות בעיות בהזמנת ההסעות,
                קצין הנפגעים ישמש{" "}
                <strong>״גורם מגשר״</strong>
                {" "}בין משהב״ט לבין המשפחה.
            </>
        )
    },
    {
        id: "unitHelp",
        title: "ניתן להיעזר ביחידה?",
        content: (
            <>
                יש לציין כי ניתן לנסות להיעזר ביחידה
                לצורכי הסעות במידה וישנה בעיה חריגה.
            </>
        )
    }
];

const readVisited = () => {
    try {
        const saved = JSON.parse(
            sessionStorage.getItem(STORAGE_KEY) || "[]"
        );

        if (!Array.isArray(saved)) return [];

        return [
            ...new Set(
                saved.filter(id =>
                    transportationSteps.some(step => step.id === id)
                )
            )
        ];
    } catch {
        return [];
    }
};

const TransportationCoordination = ({ onPageReady }) => {
    const [visited, setVisited] = useState(readVisited);
    const [animatingId, setAnimatingId] = useState(null);

    const allVisited = transportationSteps.every(step =>
        visited.includes(step.id)
    );

    useEffect(() => {
        if (allVisited) {
            onPageReady?.();
        }
    }, [allVisited, onPageReady]);

    const [expanded, setExpanded] = useState([]);

    const handleStepClick = (id) => {
        if (animatingId !== null) return;

        const isOpen = expanded.includes(id);

        setAnimatingId(id);

        setExpanded(current =>
            isOpen
                ? current.filter(item => item !== id)
                : [...current, id]
        );

        if (!visited.includes(id)) {
            const updated = [...visited, id];

            setVisited(updated);

            sessionStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(updated)
            );
        }
    };

    const handleAnimationEnd = (event, id) => {
        if (event.target !== event.currentTarget) return;

        setAnimatingId(current =>
            current === id ? null : current
        );
    };

    return (
        <TopicLayout
            title="פרטים טכניים - הסעות"
            className={styles.page}
        >
            <section
                className={styles.stage}
                aria-label="דגשים לתיאום הסעות"
            >
                <div className={styles.stepsList}>
                    {transportationSteps.map(step => {
                        const isVisited = visited.includes(step.id);
                        const isOpen = expanded.includes(step.id);
                        const isAnimating = animatingId === step.id;

                        return (
                            <button
                                key={step.id}
                                type="button"
                                className={[
                                    styles.step,
                                    isVisited ? styles.visited : "",
                                    isOpen ? styles.revealed : "",
                                    isAnimating
                                        ? isOpen
                                            ? styles.opening
                                            : styles.closing
                                        : ""
                                ].filter(Boolean).join(" ")}
                                disabled={animatingId !== null}
                                onClick={() => handleStepClick(step.id)}
                                aria-expanded={isOpen}
                            >
                                <span className={styles.stepTitle}>
                                    {step.title}
                                </span>

                                <span className={styles.stepContent}>
                                    {step.content}
                                </span>

                                <img
                                    src={busIcon}
                                    alt=""
                                    className={styles.busIcon}
                                    onAnimationEnd={(event) =>
                                        handleAnimationEnd(event, step.id)
                                    }
                                />

                                {isVisited && (
                                    <span
                                        className={styles.checkIcon}
                                        aria-hidden="true"
                                    >
                                        ✓
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </section>
        </TopicLayout>
    );
};

export default TransportationCoordination;

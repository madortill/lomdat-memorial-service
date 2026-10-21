
import { Fragment, useEffect, useState } from "react";
import styles from "./MemorialProcess.module.css";
import TopicLayout from "../TopicLayout/TopicLayout";

import iconCursor from "../../../assets/img/iconCursor.svg";
import timelineArrow from "../../../assets/img/greenLine.svg";

const steps = [
    {
        id: "step1",
        label: (
            <>
                <u>כ־45 יום</u>
                <span>לפני מועד</span>
                <span>האזכרה</span>
            </>
        ),
        content: (
            <>
                <h2 className={styles.contentHeading}>
                    כ־45 יום לפני מועד האזכרה על פי החודש העברי הקרוב
                    (בתחילת החודש העברי המקדים לחודש הנפילה):
                </h2>

                <p className={styles.contentParagraph}>
                    הוצאת דו״ח המרכז של כלל האזכרות לחללים.
                </p>
            </>
        )
    },
    {
        id: "step2",
        label: (
            <>
                <span>בין 45 יום</span>
                <span>לשבוע לפני</span>
                <span>האזכרה</span>
            </>
        ),
        content: (
            <>
                <h2 className={styles.contentHeading}>
                    יצירת קשר עם משפחת החלל (כל בתי האב) -
                </h2>

                <div className={styles.questionCards}>
                    <div className={styles.questionCard}>
                        האם מעוניינים באזכרה משפחתית (פרטית)
                        או אזכרה צבאית?
                    </div>

                    <div className={styles.questionCard}>
                        האם המשפחה קבעה מועד ושעה לאזכרה?
                    </div>

                    <div className={styles.questionCard}>
                        האם מעוניינים שנדאג לחזן צבאי,
                        נציגות מטעם היחידה,
                        בקשות מיוחדות וכו׳?
                    </div>
                </div>

                <p className={styles.importantText}>
                    יש לתעד את כל זאת בדו״ח תיאום אזכרה.
                </p>
            </>
        )
    },
    {
        id: "step3",
        label: (
            <>
                <u>שבוע לפני</u>
                <span>מועד</span>
                <span>האזכרה</span>
            </>
        ),
        content: (
            <>
                <h2 className={styles.contentHeading}>
                    שבוע לפני מועד האזכרה:
                </h2>

                <p className={styles.contentParagraph}>
                    לרוב, תיאום האזכרות נמצא תחת{" "}
                    <strong>אחריות מש״ק הנפגעים.</strong>
                    {" "}בנוסף לתהליך זה, הוא אחראי לוודא
                    שבוע לפני מועד האזכרה{" "}
                    <strong>למול המשפחה את פרטי האזכרה</strong>
                    {" "}ולהזכיר על כך{" "}
                    <strong>לנציגים, לחזן ולקצין הנפגעים.</strong>
                </p>
            </>
        )
    }
];

const STORAGE_KEY = "memorial-process-visited";

const getSavedSteps = () => {
    try {
        const saved = JSON.parse(
            sessionStorage.getItem(STORAGE_KEY) || "[]"
        );

        return Array.isArray(saved)
            ? saved.filter(id => steps.some(step => step.id === id))
            : [];
    } catch {
        return [];
    }
};

export default function MemorialProcess({ onPageReady }) {
    const [visited, setVisited] = useState(getSavedSteps);

    const [activeIndex, setActiveIndex] = useState(() => {
        const saved = getSavedSteps();

        if (saved.length === 0) return null;

        return steps.findLastIndex(step =>
            saved.includes(step.id)
        );
    });


    const allVisited = steps.every(step =>
        visited.includes(step.id)
    );

    const nextUnvisitedIndex = steps.findIndex(step =>
        !visited.includes(step.id)
    );

    useEffect(() => {
        if (allVisited) onPageReady?.();
    }, [allVisited, onPageReady]);

    const handleCircleClick = (index) => {

        const step = steps[index];
        const isVisited = visited.includes(step.id);

        if (!isVisited && index !== nextUnvisitedIndex) return;

        setActiveIndex(index);

        if (!isVisited) {
            const updated = [...visited, step.id];

            setVisited(updated);
            sessionStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(updated)
            );
        }
    };


    return (
        <TopicLayout
            title="תהליך תיאום אזכרה"
            className={styles.page}
            ariaLabel="תהליך תיאום אזכרה"
            headerContent={<p className={styles.instructions}>
                    <img
                        src={iconCursor}
                        alt=""
                        className={styles.instructionIcon}
                    />
                    לחצו על העיגולים למטה כדי ללמוד עוד
                </p>}
        >
            <div className={styles.main}>
                <div
                    className={styles.timeline}
                    aria-label="שלבי תיאום האזכרה"
                >
                    {steps.map((step, index) => {
                        const isVisited = visited.includes(step.id);
                        const isActive = activeIndex === index;
                        const isNext = index === nextUnvisitedIndex;
                        const isAvailable = isVisited || isNext;

                        return (
                            <Fragment key={step.id}>
                            <button
                                type="button"
                                className={[
                                    styles.circle,
                                    styles[`circle${index + 1}`],
                                    isActive ? styles.activeCircle : "",
                                    isNext ? styles.glowingCircle : ""
                                ].filter(Boolean).join(" ")}
                                onClick={() => handleCircleClick(index)}
                                disabled={!isAvailable}
                                aria-pressed={isActive}
                                aria-label={
                                    `${step.id === "step1"
                                        ? "כ־45 יום לפני"
                                        : step.id === "step2"
                                            ? "בין 45 יום לשבוע לפני"
                                            : "שבוע לפני"
                                    }${isVisited ? ", נצפה" : ""}`
                                }
                            >
                                <span className={styles.circleLabel}>
                                    {step.label}
                                </span>
                            </button>
                            {index < steps.length - 1 && (
                                <img
                                    key={`${step.id}-arrow`}
                                    src={timelineArrow}
                                    alt=""
                                    aria-hidden="true"
                                    className={styles.timelineArrowImage}
                                />
                            )}
                        </Fragment>);
                    })}
                </div>

                <div
                    className={`${styles.contentBox} ${activeIndex !== null
                            ? styles.contentVisible
                            : ""
                        }`}
                >
                    {activeIndex !== null ? (
                        <div
                            key={steps[activeIndex].id}
                            className={styles.contentInner}
                        >
                            {steps[activeIndex].content}
                        </div>
                    ) : (
                        <p className={styles.emptyText}>
                            לחצו על העיגול הזוהר כדי להציג את התוכן
                        </p>
                    )}
                </div>
            </div>

        </TopicLayout>
    );
}

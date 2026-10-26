
import { useEffect, useState } from "react";
import TopicLayout from "../TopicLayout/TopicLayout";
import styles from "./AmplificationSystem.module.css";

import mixerBase from "../../../assets/img/amplificationMixerBase.png";
import faderImage from "../../../assets/img/amplificationFader.png";
import iconCursor from "../../../assets/img/iconCursor.svg";

const STORAGE_KEY = "technical-amplification-visited";
const ACTIVE_STORAGE_KEY = "technical-amplification-active";

const controls = [
    {
        id: "firstYear",
        label: "מערכת הגברה בשנת האבל הראשונה",
        position: "first",
        content: (
            <>
                <strong>
                    בשנת האבל הראשונה, תינתן למשפחה זכאות לקבלת
                    מערכת הגברה מספק מורשה של משהב״ט
                </strong>
                , בדומה למענה אשר ניתן לטובת הלוויה ואזכרת השבעה.
            </>
        )
    },
    {
        id: "secondYear",
        label: "השאלת מערכת הגברה מהשנה השנייה",
        position: "second",
        content: (
            <>
                <strong>החל מהשנה השנייה</strong>
                {" "}יתאפשר למשפחה להשאיל מערכת הגברה ממשרד הביטחון,
                {" "}
                <strong>לפרק זמן סביר של 48 ש׳</strong>.
                {" "}בדומה לנושא ההסעות לאזכרה, השאלת המערכת
                והאחריות לה הינם של המשפחה באופן בלעדי.
            </>
        )
    },
    {
        id: "locations",
        label: "מוקדים להשאלת מערכות הגברה",
        position: "third",
        content: (
            <>
                <strong>
                    תתקיים פריסה גאוגרפית של מוקדים מהם
                    ניתן להשאיל מערכות הגברה.
                </strong>
                {" "}המוקדים אשר נקבעו הם אלה אשר יכולים לספק
                מענה הולם לצורך, בבחינת צוות הפעלה קבוע,
                עובדי משהב״ט. כמו כן הובהר כי יישמר היצע
                של מערכות בכל מוקד, כך שיתאפשר לתת מענה
                למספר אזכרות במקביל.
            </>
        )
    }
];

const getSavedVisited = () => {
    try {
        const stored = JSON.parse(
            sessionStorage.getItem(STORAGE_KEY) || "[]"
        );

        return Array.isArray(stored)
            ? [
                ...new Set(
                    stored.filter(id =>
                        controls.some(control => control.id === id)
                    )
                )
            ]
            : [];
    } catch {
        return [];
    }
};

const getSavedActiveId = () => {
    try {
        const savedId = sessionStorage.getItem(ACTIVE_STORAGE_KEY);
        const savedVisited = getSavedVisited();

        return savedVisited.includes(savedId)
            ? savedId
            : null;
    } catch {
        return null;
    }
};

const AmplificationSystem = ({ onPageReady }) => {
    const [visited, setVisited] = useState(getSavedVisited);
    const [activeId, setActiveId] = useState(getSavedActiveId);

    // false בעת שחזור, true לאחר לחיצה חדשה של המשתמש
    const [hasInteracted, setHasInteracted] = useState(false);

    const allVisited = controls.every(control =>
        visited.includes(control.id)
    );

    const nextIndex = controls.findIndex(control =>
        !visited.includes(control.id)
    );

    const activeControl = controls.find(
        control => control.id === activeId
    );

    useEffect(() => {
        if (allVisited) {
            onPageReady?.();
        }
    }, [allVisited, onPageReady]);

    const chooseControl = (control, index) => {
        const wasVisited = visited.includes(control.id);

        if (!wasVisited && index !== nextIndex) {
            return;
        }

        // לחיצה חדשה - מאפשרים את אנימציות הסליידרים
        setHasInteracted(true);
        setActiveId(control.id);

        const updatedVisited = wasVisited
            ? visited
            : [...visited, control.id];

        if (!wasVisited) {
            setVisited(updatedVisited);
        }

        try {
            sessionStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(updatedVisited)
            );

            sessionStorage.setItem(
                ACTIVE_STORAGE_KEY,
                control.id
            );
        } catch {
            // ממשיכים גם כאשר sessionStorage אינו זמין
        }
    };

    return (
        <TopicLayout
            title="פרטים טכניים - מערכת הגברה"
            className={styles.page}
            headerContent={
                <p className={styles.instructions}>
                    <img
                        src={iconCursor}
                        alt=""
                        className={styles.cursor}
                    />
                    לחצו על הכפתורים הזוהרים כדי ללמוד עוד
                </p>
            }
        >
            <section
                className={[
                    styles.stage,
                    activeControl ? styles.stageExpanded : ""
                ].filter(Boolean).join(" ")}
                aria-label="מערכת הגברה אינטראקטיבית"
            >
                <div
                    className={styles.infoColumn}
                    aria-live="polite"
                >
                    {activeControl && (
                        <div className={styles.infoBox}>
                            <p>{activeControl.content}</p>
                        </div>
                    )}
                </div>

                <div className={styles.mixerColumn}>
                    <div className={styles.mixer}>
                        <img
                            src={mixerBase}
                            className={styles.mixerImage}
                            alt="מערכת הגברה עם שלושה סליידרים נעים"
                            draggable={false}
                        />

                        {controls.map((control, index) => {
                            const isVisited = visited.includes(control.id);
                            const isAvailable =
                                isVisited || nextIndex === index;
                            const isActive = activeId === control.id;

                            return (
                                <button
                                    key={control.id}
                                    type="button"
                                    className={[
                                        styles.sliderControl,
                                        styles[control.position],
                                        isActive ? styles.sliderActivated : "",
                                        nextIndex === index && !isVisited
                                            ? styles.sliderGlowing
                                            : "",
                                        !hasInteracted
                                            ? styles.restoredControl
                                            : ""
                                    ].filter(Boolean).join(" ")}
                                    onClick={() =>
                                        chooseControl(control, index)
                                    }
                                    disabled={!isAvailable}
                                    aria-label={`${control.label}${isVisited ? ", נצפה" : ""}`}
                                    aria-pressed={isActive}
                                    title={control.label}
                                >
                                    <img
                                        src={faderImage}
                                        className={styles.sliderHandle}
                                        alt=""
                                        draggable={false}
                                    />

                                    {isVisited && (
                                        <span
                                            className={styles.visitedIndicator}
                                            aria-hidden="true"
                                        >
                                            ✓
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>
        </TopicLayout>
    );
};

export default AmplificationSystem;

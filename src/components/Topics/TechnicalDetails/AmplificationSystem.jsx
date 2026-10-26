import { useEffect, useState } from "react";
import TopicLayout from "../TopicLayout/TopicLayout";
import styles from "./AmplificationSystem.module.css";
import mixerImage from "../../../assets/img/amplificationSystem.svg";
import iconCursor from "../../../assets/img/iconCursor.svg";

const STORAGE_KEY = "technical-amplification-visited";

const controls = [
    {
        id: "firstYear",
        label: "מערכת הגברה בשנת האבל הראשונה",
        position: "first",
        content: (
            <>
                <strong>בשנת האבל הראשונה, תינתן למשפחה זכאות לקבלת מערכת הגברה מספק מורשה של משהב״ט</strong>,
                {" "}בדומה למענה אשר ניתן לטובת הלוויה ואזכרת השבעה.
            </>
        )
    },
    {
        id: "secondYear",
        label: "השאלת מערכת הגברה מהשנה השנייה",
        position: "second",
        content: (
            <>
                <strong>החל מהשנה השנייה</strong> יתאפשר למשפחה להשאיל מערכת הגברה ממשרד הביטחון,
                {" "}<strong>לפרק זמן סביר של 48 ש׳</strong>. בדומה לנושא ההסעות לאזכרה, השאלת המערכת והאחריות לה הינם של המשפחה באופן בלעדי.
            </>
        )
    },
    {
        id: "locations",
        label: "מוקדים להשאלת מערכות הגברה",
        position: "third",
        content: (
            <>
                <strong>תתקיים פריסה גאוגרפית של מוקדים מהם ניתן להשאיל מערכות הגברה.</strong>
                {" "}המוקדים אשר נקבעו הם אלה אשר יכולים לספק מענה הולם לצורך, בבחינת צוות הפעלה קבוע, עובדי משהב״ט. כמו כן הובהר כי יישמר היצע של מערכות בכל מוקד, כך שיתאפשר לתת מענה למספר אזכרות במקביל.
            </>
        )
    }
];

const getSavedVisited = () => {
    try {
        const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
        return Array.isArray(saved)
            ? [...new Set(saved.filter(id => controls.some(control => control.id === id)))]
            : [];
    } catch {
        return [];
    }
};

const AmplificationSystem = ({ onPageReady }) => {
    const [visited, setVisited] = useState(getSavedVisited);
    const [activeId, setActiveId] = useState(null);
    const allVisited = controls.every(control => visited.includes(control.id));
    const nextIndex = controls.findIndex(control => !visited.includes(control.id));
    const activeControl = controls.find(control => control.id === activeId);

    useEffect(() => {
        if (allVisited) onPageReady?.();
    }, [allVisited, onPageReady]);

    const chooseControl = (control, index) => {
        const wasVisited = visited.includes(control.id);
        if (!wasVisited && index !== nextIndex) return;

        setActiveId(control.id);
        if (!wasVisited) {
            const updated = [...visited, control.id];
            setVisited(updated);
            try {
                sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            } catch {
                // Continue the activity even if storage is unavailable.
            }
        }
    };

    return (
        <TopicLayout
            title="פרטים טכניים - מערכת הגברה"
            className={styles.page}
            headerContent={
                <p className={styles.instructions}>
                    <img src={iconCursor} alt="" className={styles.cursor} />
                    לחצו על הכפתורים הזוהרים כדי ללמוד עוד
                </p>
            }
        >
            <section className={`${styles.stage} ${activeControl ? styles.stageExpanded : ""}`} aria-label="מערכת הגברה אינטראקטיבית">
                <div className={styles.infoColumn} aria-live="polite">
                    {activeControl && (
                        <div key={activeControl.id} className={styles.infoBox}>
                            <p>{activeControl.content}</p>
                        </div>
                    )}
                </div>

                <div className={styles.mixerColumn}>
                    <div className={styles.mixer}>
                        <img src={mixerImage} alt="מיקסר מערכת הגברה עם שלושה כפתורים אינטראקטיביים" className={styles.mixerImage} draggable="false" />
                        {controls.map((control, index) => {
                            const isVisited = visited.includes(control.id);
                            const isAvailable = isVisited || nextIndex === index;
                            return (
                                <button
                                    key={control.id}
                                    type="button"
                                    className={[
                                        styles.sliderControl,
                                        styles[control.position],
                                        isVisited ? styles.sliderActivated : "",
                                        nextIndex === index && !isVisited ? styles.sliderGlowing : "",
                                        activeId === control.id ? styles.sliderSelected : ""
                                    ].filter(Boolean).join(" ")}
                                    onClick={() => chooseControl(control, index)}
                                    disabled={!isAvailable}
                                    aria-label={`${control.label}${isVisited ? ", נצפה" : ""}`}
                                    aria-pressed={activeId === control.id}
                                    title={control.label}
                                >
                                    <span className={styles.sliderHandle} aria-hidden="true" />
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

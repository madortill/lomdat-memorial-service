
import { useEffect, useState } from "react";
import TopicLayout from "../TopicLayout/TopicLayout";
import styles from "./CasualtyOfficerHighlights.module.css";
import iconCursor from "../../../assets/img/iconCursor.svg";

const STORAGE_KEY = "casualty-officer-highlights-visited";

const items = [
    {
        id: "1",
        text: "למרות שמבחינתנו האזכרה היא חלק משגרת היום-יום, חשוב לזכור כי עבור המשפחה זו לא עוד אזכרה אלא אזכרה ליקיר שלהם שנפל - יום דרמטי ורגיש ביותר."
    },
    {
        id: "2",
        text: "יש לשים לב כי קיימים ברשותכם כל מספרי הטלפון העדכניים של המשפחה."
    },
    {
        id: "3",
        text: "חשוב לשים לב לתאריך העברי והלועזי במקביל, השעה ובית העלמין בו קבור החלל."
    },
    {
        id: "4",
        text: "לא כל המשפחות ירצו חזן / נציגים, עלינו לשאול ולאפשר זאת."
    },
    {
        id: "5",
        text: "ישנן משפחות שמזמינות את הנציגים לאחר האזכרה להתכנסות וכיבוד בביתם או בבית הכנסת - יש להכין את הנציגים מראש לכך."
    }
];

const getSavedVisited = () => {
    try {
        const saved = JSON.parse(
            sessionStorage.getItem(STORAGE_KEY) || "[]"
        );

        if (!Array.isArray(saved)) return [];

        return [...new Set(
            saved.filter(id => items.some(item => item.id === id))
        )];
    } catch {
        return [];
    }
};

const CasualtyOfficerHighlights = ({ onPageReady }) => {
    const [visited, setVisited] = useState(getSavedVisited);

    const allVisited = items.every(item =>
        visited.includes(item.id)
    );

    useEffect(() => {
        if (allVisited) {
            onPageReady?.();
        }
    }, [allVisited, onPageReady]);

    const handleNumberClick = (id) => {
        if (visited.includes(id)) return;

        const updated = [...visited, id];
        setVisited(updated);

        try {
            sessionStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(updated)
            );
        } catch {
            // הפעילות ממשיכה גם ללא אחסון זמין
        }
    };

    return (
        <TopicLayout
            title="דגשים לקצין הנפגעים"
            className={styles.page}
            headerContent={
                <p className={styles.instructions}>
                    <img
                        src={iconCursor}
                        alt=""
                        className={styles.cursor}
                    />
                    לחצו על המספרים כדי ללמוד עוד
                </p>
            }
        >
            <section
                className={styles.stage}
                dir="rtl"
                aria-label="חמישה דגשים לקצין הנפגעים"
            >
                <div className={styles.itemsList}>
                    {items.map(item => {
                        const isVisited = visited.includes(item.id);

                        return (
                            <div
                                key={item.id}
                                className={[
                                    styles.itemRow,
                                    isVisited ? styles.revealed : ""
                                ].filter(Boolean).join(" ")}
                            >
                                <button
                                    type="button"
                                    className={styles.numberButton}
                                    onClick={() =>
                                        handleNumberClick(item.id)
                                    }
                                    aria-expanded={isVisited}
                                    aria-controls={`officer-tip-${item.id}`}
                                    aria-label={`הצגת דגש ${item.id}`}
                                >
                                    {item.id}
                                </button>

                                <div className={styles.textSlot}>
                                    {isVisited && (
                                        <div
                                            id={`officer-tip-${item.id}`}
                                            className={styles.textCard}
                                        >
                                            <p>{item.text}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </TopicLayout>
    );
};

export default CasualtyOfficerHighlights;

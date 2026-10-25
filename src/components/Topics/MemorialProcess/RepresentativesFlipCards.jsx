
import { useEffect, useState } from "react";
import TopicLayout from "../TopicLayout/TopicLayout";
import styles from "./RepresentativesFlipCards.module.css";

import iconCursor from "../../../assets/img/iconCursor.svg";
import iconPeople from "../../../assets/img/iconPeople.svg";
import iconMail from "../../../assets/img/iconMail.svg";
import iconIdLarge from "../../../assets/img/iconIdLarge.svg";
import iconCommander from "../../../assets/img/iconCommander.svg";

const STORAGE_KEY = "memorial-representatives-flipped";

const cards = [
    {
        id: "people",
        title: "נציגים",
        icon: iconPeople,
        content: (
            <p>
                <strong>
                    ברירת המחדל היא לשלוח נציגים לאזכרה,
                </strong>
                {" "}מלבד באזכרות שבהן המשפחה ביקשה
                ספציפית שלא לשלוח נציגים.
            </p>
        )
    },
    {
        id: "mail",
        title: "הפצת מייל",
        icon: iconMail,
        content: (
            <p>
                יש להפיץ מייל מראש ולעדכן בע״פ
                את הגורם היחידתי האחראי על הנושא
                (כגון: קצין משא״ן / רפרנט נפגעים / רס״ר)
                ולעדכנו בפרטיה המדויקים של האזכרה –
                מיקום, תאריך ושעה, שם החלל וכן
                פרטי רקע עליו ועל המשפחה.
            </p>
        )
    },
    {
        id: "responsible",
        title: "אחראי",
        icon: iconIdLarge,
        content: (
            <p>
                בדומה לתיאום החזן גם את זימון
                הנציגים יש לתעד בדף האזכרה.
                {" "}
                <strong>
                    לוודא את שם אחראי הנציגים
                    כשלושה ימים לפני מועד האזכרה
                    ולתדרך אותו!
                </strong>
            </p>
        )
    },
    {
        id: "commander",
        title: "מפקד נציגים",
        icon: iconCommander,
        content: (
            <p>
                לכל אזכרה יהיה{" "}
                <strong>מפקד נציגים</strong>
                {" "}(קצין / נגד) שדרגתו צריכה
                להיות בדרגת החלל (לפחות),
                שייקבע מראש. תפקידו הוא לדאוג
                להגעתם של כלל הנציגים בזמן,
                בדיגום ולהתנהגותם הנאותה
                בזמן האזכרה.
            </p>
        )
    }
];

function readVisited() {
    try {
        const saved = JSON.parse(
            sessionStorage.getItem(STORAGE_KEY) || "[]"
        );

        if (!Array.isArray(saved)) return [];

        return [
            ...new Set(
                saved.filter(id =>
                    cards.some(card => card.id === id)
                )
            )
        ];
    } catch {
        return [];
    }
}

export default function RepresentativesFlipCards({
    onPageReady
}) {
    const [visited, setVisited] = useState(readVisited);
    const [flipped, setFlipped] = useState([]);

    const allVisited = cards.every(card =>
        visited.includes(card.id)
    );

    useEffect(() => {
        if (allVisited) {
            onPageReady?.();
        }
    }, [allVisited, onPageReady]);

    function toggleCard(id) {
        setFlipped(current =>
            current.includes(id)
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
    }

    return (
        <TopicLayout
            title="תהליך תיאום אזכרה - נציגי יחידה"
            className={styles.page}
            headerContent={
                <p className={styles.instructions}>
                    <img
                        src={iconCursor}
                        alt=""
                        className={styles.cursor}
                    />
                    לחצו על הכרטיסיות למטה כדי ללמוד עוד
                </p>
            }
        >
            <div className={styles.stage}>
                <div
                    className={styles.cardsGrid}
                    aria-label="כרטיסיות נציגי יחידה"
                >
                    {cards.map(card => {
                        const isFlipped = flipped.includes(card.id);
                        const wasVisited = visited.includes(card.id);

                        return (
                            <button
                                key={card.id}
                                type="button"
                                className={`${styles.flipCard} ${isFlipped ? styles.flipped : ""
                                    }`}
                                onClick={() => toggleCard(card.id)}
                                aria-pressed={isFlipped}
                                aria-label={`${card.title}, ${isFlipped
                                        ? "לחצו לחזרה לצד הקדמי"
                                        : "לחצו להצגת המידע"
                                    }`}
                            >
                                <span className={styles.flipInner}>
                                    <span className={styles.cardFront}>
                                        <img
                                            src={card.icon}
                                            alt=""
                                            className={styles.cardIcon}
                                        />

                                        <span className={styles.frontTitle}>
                                            {card.title}
                                        </span>

                                        {wasVisited && (
                                            <span
                                                className={styles.visitedMark}
                                                aria-hidden="true"
                                            >
                                                ✓
                                            </span>
                                        )}
                                    </span>

                                    <span className={styles.cardBack}>
                                        <span className={styles.backTitle}>
                                            {card.title}
                                        </span>

                                        <span className={styles.backDivider} />

                                        <span className={styles.backContent}>
                                            {card.content}
                                        </span>
                                    </span>
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </TopicLayout>
    );
}

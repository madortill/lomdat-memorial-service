import { useState } from "react";
import styles from "./Introduction.module.css";

const cards = [
    {
        id: "responsibility",
        title: "אחריות וניהול:",
        text: "מדור הנפגעים היחידתי / החטיבתי אמון על ניהול מעקב יסודי, יוזם את הקשר עם המשפחה בבוא העת ומלווה את תהליך התיאום."
    },
    {
        id: "sensitivity",
        title: "רגישות וחשיבות היום:",
        text: "תאריך האזכרה הוא יום ייחודי וטעון ברגישות רבה עבור המשפחה. זהו מועד המאחד את המשפחה המורחבת, החברים והצבא לכיבוד זכרו של החלל ותמיכה בשאריו."
    },
    {
        id: "family",
        title: "התאמה לאופי המשפחה:",
        text: "אופן ציון היום משתנה בין משפחה למשפחה - מאירוע הכולל שירים, קטעי קריאה ומכתבים, ועד לקיום טקס האזכרה כפי שהוא ולא דבר יותר. לעיתים במהלך “אירוע האזכרה מעלים זכרונות ולעיתים לא מדברים כלל. על הנציגים להפגין גמישות והקשבה לצרכי המשפחה."
    }
];

export default function Introduction({ onPageComplete }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [visited, setVisited] = useState(() => [cards[0].id]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const allVisited = cards.every(card => visited.includes(card.id));

    const goToCard = (index) => {
        if (isSubmitting || index === activeIndex) return;
        setActiveIndex(index);
        setVisited(previous => previous.includes(cards[index].id)
            ? previous
            : [...previous, cards[index].id]);
    };

    const finish = () => {
        if (!allVisited || isSubmitting) return;
        setIsSubmitting(true);
        onPageComplete();
    };

    return (
        <section className={styles.introduction} dir="rtl" aria-label="מבוא לניהול תיאום אזכרה">
            <h1 className={styles.title}>מבוא</h1>
            <div className={styles.main}>
                <p className={styles.description}>
                    צבא ההגנה לישראל מתחייב לשימור הקשר עם המשפחות השכולות ולקיום אזכרה שנתית צבאית לזכר הנופלים. קיום האזכרה מתבצעת כל עוד המשפחה מעוניינת בהשתתפות נציגי צה"ל ויש קרוב משפחה מולו ניתן לתאם. מדובר בתהליך המתקיים לאורך שנים ומהווה חלק משמעותי ומרכזי בשימור הקשר עם המשפחות השכולות.
                </p>
                <h2 className={styles.subheading}>דגשים מרכזיים להובלת התהליך:</h2>
                <div className={styles.carousel} aria-label="שלושה דגשים מרכזיים">
                    {cards.map((card, index) => {
                        const relative = (index - activeIndex + cards.length) % cards.length;
                        const positionClass = relative === 0
                            ? styles.center
                            : relative === 1 ? styles.left : styles.right;
                        const isActive = index === activeIndex;
                        return (
                            <button
                                key={card.id}
                                type="button"
                                className={`${styles.card} ${positionClass}`}
                                onClick={() => goToCard(index)}
                                aria-label={isActive ? `${card.title}, כרטיס נוכחי` : `הצגת כרטיס: ${card.title}`}
                                aria-pressed={isActive}
                                tabIndex={isActive ? -1 : 0}
                            >
                                <div className={styles.cardCopy} aria-hidden={!isActive}>
                                    <strong className={styles.cardTitle}>{card.title}</strong>
                                    <p className={styles.cardText}>{card.text}</p>
                                </div>
                            </button>
                        );
                    })}
                </div>
                <div className={styles.indicators} aria-label={`כרטיס ${activeIndex + 1} מתוך ${cards.length}`}>
                    {cards.map((card, index) => (
                        <span key={card.id} className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ""}`} />
                    ))}
                </div>
            </div>
            <div className={styles.footer}>
                <button
                    type="button"
                    className={styles.understood}
                    onClick={finish}
                    disabled={!allVisited || isSubmitting}
                    title={!allVisited ? "כדי להמשיך יש לעבור על שלושת הדגשים" : undefined}
                >
                    הבנתי!
                </button>
            </div>
        </section>
    );
}

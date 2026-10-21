import { useEffect, useState } from "react";
import TopicLayout from "../TopicLayout/TopicLayout";
import styles from "./ChazzanCoordination.module.css";
import iconCursor from "../../../assets/img/iconCursor.svg";

const STORAGE_KEY = "memorial-chazzan-visited";

const notes = [
  {
    title: "דגש 1",
    body: (
      <>
        <strong>את החזן נתאם דרך הרבנות הצבאית – תא אזכרות,</strong>
        <p>על ידי מסירת פרטי האזכרה:</p>
        <ul>
          <li>פרטי החלל</li>
          <li>תאריך ושעת האזכרה</li>
          <li>בית העלמין בו קבור החלל</li>
          <li>וידוא שנת הנפילה של החלל (כפילות שמות)</li>
        </ul>
      </>
    ),
  },
  {
    title: "דגש 2",
    body: (
      <p>
        במידה והמשפחה מבקשת חזן בנוסח ספרדי / אשכנזי או חזן ספציפי,
        יש לעדכן את הרבנות – <strong>אך לא להתחייב לכך בפני המשפחה.</strong>
      </p>
    ),
  },
  {
    title: "דגש 3",
    body: (
      <p>
        וידוא שם החזן כמה ימים טרם האזכרה – למניעת תקלות טרם מועד האזכרה.
        לאחר קבלת פרטי החזן ניצור עימו קשר טלפוני ונוודא שיודע את כל פרטי האזכרה.
      </p>
    ),
  },
  {
    title: "דגש 4",
    body: (
      <p>נציין בדו״ח תיאום אזכרה את מועד השיחה עם החזן ואת תוכן השיחה.</p>
    ),
  },
];

function readVisited() {
  try {
    const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(stored) ? stored.filter(i => Number.isInteger(i) && i >= 0 && i < notes.length) : [];
  } catch {
    return [];
  }
}

export default function ChazzanCoordination({ onPageReady }) {
  const [visited, setVisited] = useState(readVisited);
  const [expanded, setExpanded] = useState([]);
  const allVisited = visited.length === notes.length;

  useEffect(() => {
    if (allVisited) onPageReady?.();
  }, [allVisited, onPageReady]);

  function toggle(index) {
    setExpanded(current => current.includes(index) ? current.filter(i => i !== index) : [...current, index]);
    if (!visited.includes(index)) {
      const next = [...visited, index];
      setVisited(next);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  }

  return (
    <TopicLayout
      title="תהליך תיאום אזכרה – חזן צבאי"
      className={styles.page}
      headerContent={
        <p className={styles.instructions}>
          <img src={iconCursor} alt="" className={styles.cursor} />
          לחצו על הכרטיסיות למטה כדי ללמוד עוד
        </p>
      }
    >
      <div className={styles.stage}>
        <div className={styles.cards} aria-label="ארבעת הדגשים לתיאום חזן">
          {notes.map((note, index) => {
            const isOpen = expanded.includes(index);
            return (
              <article key={note.title} className={`${styles.card} ${isOpen ? styles.open : ""}`}>
                <button
                  type="button"
                  className={styles.cardButton}
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`chazzan-note-${index}`}
                >
                  <span>{note.title}</span>
                  <span className={styles.chevron} aria-hidden="true">⌄</span>
                </button>
                <div id={`chazzan-note-${index}`} className={styles.cardContent} hidden={!isOpen}>
                  {note.body}
                </div>
              </article>
            );
          })}
        </div>
        <p className={styles.phone}>טלפון חמ״ל רבנות: <a href="tel:039573113" dir="ltr">03-9573113</a></p>
      </div>
    </TopicLayout>
  );
}

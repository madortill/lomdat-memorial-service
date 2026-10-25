import { useState } from "react";
import styles from "../ExerciseRunner.module.css";
export default function OrderingQuestion({ question, answer, onAnswerChange, checked }) {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const byId = Object.fromEntries(question.items.map(item => [item.id, item]));
    const order = Array.isArray(answer) ? answer : question.items.map(item => item.id);
    const move = (from, to) => {
        if (checked || from === null || from === to) return;
        const next = [...order];
        const [item] = next.splice(from, 1);
        next.splice(to, 0, item);
        onAnswerChange(next);
        setSelectedIndex(null);
    };
    return <div className={styles.orderList} aria-label={question.instruction}>
        {order.map((id, index) => {
            const rightPlace = question.correctOrder[index] === id;
            return <button key={id} type="button" disabled={checked} draggable={!checked}
                className={[styles.orderItem, selectedIndex === index ? styles.selected : "", checked ? rightPlace ? styles.correct : styles.wrong : ""].filter(Boolean).join(" ")}
                onClick={() => selectedIndex === null ? setSelectedIndex(index) : move(selectedIndex, index)}
                onDragStart={event => { setDraggedIndex(index); event.dataTransfer.effectAllowed = "move"; }}
                onDragOver={event => { if (!checked) event.preventDefault(); }}
                onDrop={event => { event.preventDefault(); move(draggedIndex, index); setDraggedIndex(null); }}
                onDragEnd={() => setDraggedIndex(null)}
                aria-label={`${index + 1}. ${byId[id]?.text || id}`}>
                <span className={styles.orderNumber}>{index + 1}</span>
                <span className={styles.orderText}>{byId[id]?.text || id}</span>
            </button>;
        })}
        {!checked && <p className={styles.orderHint}>גררו כדי לשנות סדר, או בחרו שני פריטים כדי להזיז פריט למיקום אחר</p>}
    </div>;
}

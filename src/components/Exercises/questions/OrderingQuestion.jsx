import { useRef, useState } from "react";
import styles from "../ExerciseRunner.module.css";

const OrderingQuestion = ({ question, answer, onAnswerChange, phase }) => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [draggingId, setDraggingId] = useState(null);
    const dragIndex = useRef(null);
    const byId = Object.fromEntries(question.items.map(item => [item.id, item]));
    const order = Array.isArray(answer) ? answer : question.items.map(item => item.id);
    const locked = phase !== "editing";

    const move = (from, to) => {
        if (locked || from === null || from === to || to < 0 || to >= order.length) return;
        const next = [...order];
        const [item] = next.splice(from, 1);
        next.splice(to, 0, item);
        onAnswerChange(next);
        setSelectedIndex(null);
    };

    const activate = index => {
        if (locked) return;
        if (selectedIndex === null) setSelectedIndex(index);
        else if (selectedIndex === index) setSelectedIndex(null);
        else move(selectedIndex, index);
    };

    return (
        <div className={styles.orderList} aria-label={question.instruction}>
            {order.map((id, index) => {
                const rightPlace = question.correctOrder[index] === id;
                return (
                    <div key={id} className={styles.orderRow}>
                        <span className={[
                            styles.orderNumber,
                            phase !== "editing" ? rightPlace ? styles.numberCorrect : styles.numberWrong : ""
                        ].filter(Boolean).join(" ")} aria-hidden="true">
                            {index + 1}
                        </span>
                        <button
                            type="button"
                            disabled={locked}
                            draggable={!locked}
                            onClick={() => activate(index)}
                            onDragStart={event => {
                                dragIndex.current = index;
                                setDraggingId(id);
                                event.dataTransfer.effectAllowed = "move";
                                event.dataTransfer.setData("text/plain", id);
                            }}
                            onDragOver={event => { if (!locked) event.preventDefault(); }}
                            onDrop={event => {
                                event.preventDefault();
                                move(dragIndex.current, index);
                                dragIndex.current = null;
                                setDraggingId(null);
                            }}
                            onDragEnd={() => { dragIndex.current = null; setDraggingId(null); }}
                            className={[
                                styles.orderItem,
                                selectedIndex === index ? styles.selectedOrder : "",
                                draggingId === id ? styles.dragging : "",
                                phase !== "editing" ? rightPlace ? styles.correct : styles.wrong : ""
                            ].filter(Boolean).join(" ")}
                            aria-label={`מיקום ${index + 1}: ${byId[id]?.text || id}`}
                        >
                            <span className={styles.orderText}>{byId[id]?.text || id}</span>
                            {!locked && <span className={styles.grip} aria-hidden="true">⠿</span>}
                        </button>
                    </div>
                );
            })}
            {phase === "editing" && (
                <p className={styles.orderHint}>גררו את המלבנים לשינוי הסדר, או בחרו מלבן ואז את מיקומו החדש</p>
            )}
        </div>
    );
};

export default OrderingQuestion;

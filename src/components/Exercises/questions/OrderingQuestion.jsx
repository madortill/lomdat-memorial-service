import { useEffect, useRef, useState } from "react";
import styles from "../ExerciseRunner.module.css";

const MOVED_FLASH_MS = 1100;

// phase: "editing" - עריכה, "review" - אחרי בדיקה שגויה (מוצגים סימוני טעויות, עדיין אפשר לגרור), "complete" - נעול
const OrderingQuestion = ({ question, answer, onAnswerChange, phase }) => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [draggingId, setDraggingId] = useState(null);
    const [dropIndex, setDropIndex] = useState(null);
    const [movedId, setMovedId] = useState(null);
    const dragIndex = useRef(null);
    const movedTimer = useRef(null);

    const byId = Object.fromEntries(question.items.map(item => [item.id, item]));
    const order = Array.isArray(answer) ? answer : question.items.map(item => item.id);
    const locked = phase === "complete";
    const showMarks = phase === "review" || locked;

    useEffect(() => () => clearTimeout(movedTimer.current), []);

    const move = (from, to) => {
        if (locked || from === null || from === to || to < 0 || to >= order.length) return;
        const next = [...order];
        const [item] = next.splice(from, 1);
        next.splice(to, 0, item);
        onAnswerChange(next);
        setSelectedIndex(null);

        // הבהוב קצר על המלבן שזז, כדי שיהיה ברור מה עבר לאן
        setMovedId(item);
        clearTimeout(movedTimer.current);
        movedTimer.current = setTimeout(() => setMovedId(null), MOVED_FLASH_MS);
    };

    const activate = index => {
        if (locked) return;
        if (selectedIndex === null) setSelectedIndex(index);
        else if (selectedIndex === index) setSelectedIndex(null);
        else move(selectedIndex, index);
    };

    const endDrag = () => {
        dragIndex.current = null;
        setDraggingId(null);
        setDropIndex(null);
    };

    const handleKeyDown = (event, index) => {
        if (locked) return;
        if (event.key === "ArrowUp") {
            event.preventDefault();
            move(index, index - 1);
        } else if (event.key === "ArrowDown") {
            event.preventDefault();
            move(index, index + 1);
        }
    };

    // קו מקום הנחיתה: אם גוררים כלפי מטה המלבן ינחת מתחת ליעד, אחרת מעליו
    const dropPosition = index => {
        const from = dragIndex.current;
        if (draggingId === null || dropIndex !== index || from === null || from === index) return null;
        return index > from ? "after" : "before";
    };

    return (
        <div className={styles.orderList} aria-label={question.instruction}>
            {order.map((id, index) => {
                const rightPlace = question.correctOrder[index] === id;
                const position = dropPosition(index);
                const waitingForTarget = selectedIndex !== null && selectedIndex !== index;

                return (
                    <div key={id} className={styles.orderRow}>
                        <span
                            className={[
                                styles.orderNumber,
                                showMarks ? (rightPlace ? styles.numberCorrect : styles.numberWrong) : ""
                            ].filter(Boolean).join(" ")}
                            aria-hidden="true"
                        >
                            {index + 1}
                        </span>

                        <button
                            type="button"
                            disabled={locked}
                            draggable={!locked}
                            onClick={() => activate(index)}
                            onKeyDown={event => handleKeyDown(event, index)}
                            onDragStart={event => {
                                dragIndex.current = index;
                                setDraggingId(id);
                                setSelectedIndex(null);
                                event.dataTransfer.effectAllowed = "move";
                                event.dataTransfer.setData("text/plain", id);
                            }}
                            onDragOver={event => {
                                if (locked) return;
                                event.preventDefault();
                                setDropIndex(index);
                            }}
                            onDrop={event => {
                                event.preventDefault();
                                move(dragIndex.current, index);
                                endDrag();
                            }}
                            onDragEnd={endDrag}
                            className={[
                                styles.orderItem,
                                selectedIndex === index ? styles.selectedOrder : "",
                                waitingForTarget ? styles.targetCandidate : "",
                                draggingId === id ? styles.dragging : "",
                                position ? styles.dropTarget : "",
                                position === "before" ? styles.dropBefore : "",
                                position === "after" ? styles.dropAfter : "",
                                movedId === id ? styles.justMoved : "",
                                showMarks ? (rightPlace ? styles.correct : styles.wrong) : ""
                            ].filter(Boolean).join(" ")}
                            aria-label={`מיקום ${index + 1}: ${byId[id]?.text || id}`}
                        >
                            {showMarks && (
                                <span className={styles.orderMark} aria-hidden="true">
                                    {rightPlace ? "✓" : "✗"}
                                </span>
                            )}
                            <span className={styles.orderText}>{byId[id]?.text || id}</span>
                            {!locked && <span className={styles.grip} aria-hidden="true">⠿</span>}
                        </button>
                    </div>
                );
            })}

            {!locked && (
                <p className={styles.orderHint}>
                    גררו את המלבנים לשינוי הסדר, או בחרו מלבן ואז את מיקומו החדש
                </p>
            )}
        </div>
    );
};

export default OrderingQuestion;
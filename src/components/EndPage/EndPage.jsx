import { useMemo } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import styles from "./EndPage.module.css";

import corkBoard from "../../assets/img/corkBoard.svg";

const CONFETTI_COUNT = 140;
const CONFETTI_COLORS = [
    "#B96A1E",
    "#65ACC7",
    "#FFE59B",
    "#E2EAD2",
    "#F4A58A",
    "#A98BD6",
    "#7FBF9B",
    "#E9506A"
];

const random = (min, max) => min + Math.random() * (max - min);

const createConfetti = () =>
    Array.from({ length: CONFETTI_COUNT }, (_, index) => {
        const isStrip = Math.random() < 0.45;
        const size = random(0.45, 0.9);

        return {
            id: index,
            color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
            round: !isStrip && Math.random() < 0.3,
            style: {
                "--left": `${random(0, 100)}vw`,
                "--width": `${isStrip ? size * 0.5 : size}rem`,
                "--height": `${isStrip ? size * 1.5 : size}rem`,
                "--duration": `${random(4.5, 9)}s`,
                "--delay": `${random(0, 6)}s`,
                "--drift": `${random(-12, 12)}vw`,
                "--spin": `${random(360, 1080)}deg`,
                "--sway": `${random(1.2, 2.6)}s`
            }
        };
    });

const Confetti = () => {
    const pieces = useMemo(createConfetti, []);

    return createPortal(
        <div className={styles.confetti} aria-hidden="true">
            {pieces.map(piece => (
                <span
                    key={piece.id}
                    className={styles.confettiPiece}
                    style={piece.style}
                >
                    <span
                        className={`${styles.confettiShape} ${piece.round ? styles.round : ""}`}
                        style={{ backgroundColor: piece.color }}
                    />
                </span>
            ))}
        </div>,
        document.body
    );
};

const EndPage = () => {
    const navigate = useNavigate();

    // חזרה לחומר - שומרת את ההתקדמות
    const handleBackToMaterial = () => {
        navigate("/home");
    };

    // לתחילת הלומדה - מאפסת את כל ההתקדמות
    const handleRestart = () => {
        sessionStorage.clear();
        navigate("/");
    };

    return (
        <main className={styles.page} dir="rtl">
            <div className={styles.boardArea}>
                <img
                    src={corkBoard}
                    alt=""
                    className={styles.board}
                    draggable={false}
                />

                <div className={styles.card}>
                    <p className={styles.praise}>כל הכבוד!</p>

                    <h1 className={styles.title}>
                        <span className={styles.titleSmall}>
                            סיימתם את לומדת
                        </span>
                        <span className={styles.titleBig}>
                            נוהל תיאום אזכרה
                        </span>
                    </h1>

                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={styles.button}
                            onClick={handleBackToMaterial}
                        >
                            <span aria-hidden="true">&lt;</span> חזרה לחומר
                        </button>

                        <button
                            type="button"
                            className={styles.button}
                            onClick={handleRestart}
                        >
                            לתחילת הלומדה <span aria-hidden="true">&gt;</span>
                        </button>
                    </div>
                </div>
            </div>

            <Confetti />
        </main>
    );
};

export default EndPage;
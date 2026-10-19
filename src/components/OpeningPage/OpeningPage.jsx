
import { useNavigate } from "react-router-dom";
import styles from "./OpeningPage.module.css";

import table from "../../assets/img/table.svg";
import plant from "../../assets/img/plant.svg";
import corkBoard from "../../assets/img/corkBoard.svg";
import bahad11Logo from "../../assets/img/bahad11Logo.svg";
import tillLogo from "../../assets/img/tillLogo.svg";

const OpeningPage = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate("/home");
    };

    return (
        <div className={styles.page} dir="rtl">
            <div className={styles.logos}>
                <img
                    src={bahad11Logo}
                    alt="בהד 11"
                    className={styles.bahadLogo}
                />

                <img
                    src={tillLogo}
                    alt="מדור טיל"
                    className={styles.tillLogo}
                />
            </div>

            <div className={styles.boardArea}>
                <img
                    src={corkBoard}
                    alt=""
                    className={styles.corkBoard}
                />

                <div className={styles.boardContent}>
                    <p className={styles.welcomeText}>
                        ברוכים הבאים ללומדת
                    </p>

                    <h1 className={styles.title}>
                        ניהול תיאום אזכרה
                    </h1>

                    <button
                        type="button"
                        className={styles.startBtn}
                        onClick={handleStart}
                    >
                        לתחילת הלומדה
                        <span className={styles.buttonArrow}>›</span>
                    </button>

                    <button
                        type="button"
                        className={styles.aboutNote}
                        onClick={() => { }}
                    >
                        אודות
                    </button>
                </div>
            </div>

            <img
                src={plant}
                alt=""
                className={styles.plant}
            />

            <img
                src={table}
                alt=""
                className={styles.table}
            />
        </div>
    );
};

export default OpeningPage;

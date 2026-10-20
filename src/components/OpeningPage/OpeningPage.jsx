
import { useNavigate } from "react-router-dom";
import styles from "./OpeningPage.module.css";

import corkBoard from "../../assets/img/corkBoard.svg";

const OpeningPage = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate("/home");
    };

    return (
        <div className={styles.page} dir="rtl">

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
        </div>
    );
};

export default OpeningPage;

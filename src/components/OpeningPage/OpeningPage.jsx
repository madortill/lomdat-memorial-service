
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OpeningPage.module.css";

import woodTexture from "../../assets/img/woodTexture.svg";
import aboutBtn from "../../assets/img/aboutBtn.svg";
import startBtn from "../../assets/img/startBtn.svg";
import noteBg from "../../assets/img/noteBg.svg";
import bahad11Sticker from "../../assets/img/bahad11Sticker.svg";
import tillSticker from "../../assets/img/tillSticker.svg";
import pencil from "../../assets/img/pencil.svg";
import plantAbove from "../../assets/img/plantAbove.svg";
import notebook from "../../assets/img/notebook.svg";

const OpeningPage = () => {
    const navigate = useNavigate();
    const [showAbout, setShowAbout] = useState(false);

    const handleStart = () => {
        navigate("/home");
    };

    return (
        <main className={styles.page} dir="rtl">
            <div className={styles.scene}>

                <img
                    src={woodTexture}
                    className={styles.woodTexture}
                    alt=""
                    draggable={false}
                />

                <img
                    src={notebook}
                    className={styles.notebook}
                    alt=""
                    draggable={false}
                />

                <img
                    src={plantAbove}
                    className={styles.plant}
                    alt=""
                    draggable={false}
                />

                <img
                    src={pencil}
                    className={styles.pencil}
                    alt=""
                    draggable={false}
                />

                <img
                    src={tillSticker}
                    className={styles.tillSticker}
                    alt="מדור טי״ל"
                    draggable={false}
                />

                <img
                    src={bahad11Sticker}
                    className={styles.bahadSticker}
                    alt="בה״ד 11"
                    draggable={false}
                />

                <div className={styles.note}>
                    <img
                        src={noteBg}
                        className={styles.noteImage}
                        alt=""
                        draggable={false}
                    />

                    <h1 className={styles.title}>
                        <span>נוהל</span>
                        <span>תיאום</span>
                        <span>אזכרה</span>
                    </h1>

                    <button
                        type="button"
                        className={styles.startBtn}
                        onClick={handleStart}
                        aria-label="לתחילת הלומדה"
                    >
                        <img src={startBtn} alt="" draggable={false} />
                    </button>
                </div>

                <button
                    type="button"
                    className={styles.aboutBtn}
                    onClick={() => setShowAbout(true)}
                    aria-label="אודות הלומדה"
                >
                    <img src={aboutBtn} alt="" draggable={false} />
                </button>

            </div>

            {showAbout && (
                <div
                    className={styles.aboutOverlay}
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setShowAbout(false);
                        }
                    }}
                >
                    <section
                        className={styles.aboutDialog}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="about-title"
                    >
                        <button
                            type="button"
                            className={styles.closeAbout}
                            onClick={() => setShowAbout(false)}
                            aria-label="סגירה"
                        >
                            ✕
                        </button>

                        <h2 id="about-title">אודות הלומדה</h2>

                        <p>נוהל תיאום אזכרה</p>

                        <div className={styles.aboutLogos}>
                            <img src={tillSticker} alt="מדור טי״ל" />
                            <img src={bahad11Sticker} alt="בה״ד 11" />
                        </div>
                    </section>
                </div>
            )}
        </main>
    );
};

export default OpeningPage;

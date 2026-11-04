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
import bgAbout from "../../assets/img/bgAbout.png";
import aboutMe from "../../assets/img/aboutMe.png";
import mapalRope from "../../assets/img/mapalRope.svg";

// תוכן חלונית האודות
const DEDICATION =
    "הלומדה פותחה לזכרו של רס”ר (במיל’) יובל גבאי ז”ל, שנפל ב7.10 בדרך מנקודת ההתייצבות של יחידתו למשימתם ביישוב איתמר. הגופן באדיבות פרויקט ההנצחה ״אות חיים״.";

const TILL_HEAD = { title: "רמ״ד טי״ל:", name: "סמ״ר קטיה מדבדב" };

const GRAPHICS = {
    title: "גרפיקה",
    names: ["רב״ט צאלה בלמקר", "רב״ט קשת פרי", "רב״ט דינה ליבשיץ"]
};

const LEAD_DEVELOPER = { title: "מפתחת ראשית", name: "רב״ט צאלה בלמקר" };

const VERSION = { title: "גרסה:", value: "נובמבר 2026" };

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

                <div className={styles.canvas}>
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
                        <img
                            src={bgAbout}
                            alt=""
                            className={styles.aboutPaper}
                            draggable={false}
                        />

                        <img
                            src={mapalRope}
                            alt=""
                            className={styles.aboutRope}
                            draggable={false}
                        />

                        <button
                            type="button"
                            className={styles.closeAbout}
                            onClick={() => setShowAbout(false)}
                            aria-label="סגירה"
                        >
                            X
                        </button>

                        <h2 id="about-title" className={styles.aboutTitle}>
                            אודות
                        </h2>

                        <div className={styles.aboutCredits}>
                            <div className={`${styles.aboutCard} ${styles.cardPink}`}>
                                <p>
                                    <strong><u>{TILL_HEAD.title}</u></strong>{" "}
                                    {TILL_HEAD.name}
                                </p>
                            </div>

                            <div className={`${styles.aboutCard} ${styles.cardBlue}`}>
                                <h3>{GRAPHICS.title}</h3>
                                {GRAPHICS.names.map(name => (
                                    <p key={name}>{name}</p>
                                ))}
                            </div>
                        </div>

                        <div className={styles.aboutDeveloper}>
                            <img
                                src={aboutMe}
                                alt=""
                                className={styles.developerPhoto}
                                draggable={false}
                            />

                            <h3>{LEAD_DEVELOPER.title}</h3>
                            <p>{LEAD_DEVELOPER.name}</p>
                        </div>

                        <div className={`${styles.aboutCard} ${styles.cardYellow}`}>
                            <p>{DEDICATION}</p>
                        </div>

                        <p className={styles.aboutVersion}>
                            <u>{VERSION.title}</u> {VERSION.value}
                        </p>
                    </section>
                </div>
            )}
        </main>
    );
};

export default OpeningPage;
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

// תוכן חלונית האודות
const DEDICATION =
    "הלומדה הוקדשה לזכרו של רס״ר (במיל׳) יובל גבאי ז״ל, שנפל ב-7.10 בדרך מנקודת ההתייצבות של יחידתו למשימתם בישוב איתמר. הגופן באדיבות פרויקט ההנצחה ״אות חיים״.";

const CREDITS = [
    { title: "גרפיקה", names: ["רב״ט צאלה בלמקר", "רב״ט קשת ברי", "רב״ט דינה ליבשיץ"] },
    { title: "רמ״ד טי״ל", names: ["סמ״ר קליה מדבדב"] },
    { title: "גרסה", names: ["נובמבר 2026"] }
];

const LEAD_DEVELOPER = { title: "מפתחת ראשית", name: "רב״ט צאלה בלמקר" };

// כשתהיה תמונה של המפתחת - מייבאים אותה ושמים כאן במקום null
const LEAD_DEVELOPER_PHOTO = null;

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

                        <div className={styles.aboutBody}>
                            <div className={styles.aboutCredits}>
                                {CREDITS.map(group => (
                                    <div key={group.title} className={styles.creditGroup}>
                                        <h3>{group.title}</h3>
                                        {group.names.map(name => (
                                            <p key={name}>{name}</p>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            <div className={styles.aboutDeveloper}>
                                {LEAD_DEVELOPER_PHOTO ? (
                                    <img
                                        src={LEAD_DEVELOPER_PHOTO}
                                        alt=""
                                        className={styles.developerPhoto}
                                        draggable={false}
                                    />
                                ) : (
                                    <div className={styles.developerPhoto} aria-hidden="true">
                                        <span>כאן תהיה תמונה</span>
                                    </div>
                                )}

                                <h3>{LEAD_DEVELOPER.title}</h3>
                                <p>{LEAD_DEVELOPER.name}</p>
                            </div>

                            <p className={styles.aboutDedication}>{DEDICATION}</p>
                        </div>
                    </section>
                </div>
            )}
        </main>
    );
};

export default OpeningPage;

import { useEffect } from "react";
import TopicLayout from "../TopicLayout/TopicLayout";
import styles from "./CasualtyOfficerRole.module.css";

import iconTeacher from "../../../assets/img/iconTeacher.svg";
import iconPhone from "../../../assets/img/iconPhone.svg";
import iconHands from "../../../assets/img/iconHands.svg";

const roles = [
    {
        id: "unit",
        title: "נציגות מדורית",
        text: "חיל / חטיבה בהם שירת החייל - ״גאוות היחידה״."
    },
    {
        id: "department",
        title: "נציגות מחלקתית",
        text: "קציני הנפגעים של צה״ל המלווים את המשפחה לאורך כל השנים."
    }
];

const guidelines = [
    {
        id: "example",
        icon: iconTeacher,
        content: (
            <>
                עלינו <strong>להוות דוגמה לנציגים</strong> הנמצאים
                באזכרה ולוודא שהכל מתנהל בצורה תקינה ומכובדת.
                <br />
                <strong>
                    יש לפעול ולהסביר לנציגים כיצד נוהגים באזכרה
                </strong>
                {" "}(שרוולים, כומתה וכו׳) ובנוסף לוודא שמכירים
                את סיפור חייו של החלל, ולהדריכם לקראת המפגש עם המשפחה.
            </>
        )
    },
    {
        id: "contact",
        icon: iconPhone,
        content: (
            <>
                <strong>
                    יצירת קשר עם הגורמים הרלוונטיים ביום האזכרה
                </strong>
                {" "}(החזן, מפקד האזכרה שאחראי על הנציגים)
                על־מנת למנוע תקלות מראש ולוודא שהכל יתנהל כראוי
                בטקס האזכרה.
            </>
        )
    },
    {
        id: "support",
        icon: iconHands,
        content: (
            <>
                כתף תומכת למשפחה ופתרון בעיות שעולות במהלך המפגש עמה.
            </>
        )
    }
];

const CasualtyOfficerRole = ({ onPageReady }) => {
    useEffect(() => {
        onPageReady?.();
    }, [onPageReady]);

    return (
        <TopicLayout
            title="דגשים לקצין הנפגעים - מקומו של קצין הנפגעים"
            className={styles.page}
        >
            <section
                className={styles.stage}
                dir="rtl"
                aria-label="מקומו של קצין הנפגעים באזכרה"
            >
                <div className={styles.rolesSection}>
                    <p className={styles.rolesHeading}>
                        כקציני נפגעים אנו הנציגות הצה״לית מול המשפחה
                        {" "}
                        <u>בשני כובעים:</u>
                    </p>

                    <div className={styles.rolesGrid}>
                        {roles.map(role => (
                            <div
                                key={role.id}
                                className={styles.roleCard}
                            >
                                <p>
                                    <strong>{role.title} - </strong>
                                    {role.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.guidelinesSection}>
                    {guidelines.map(item => (
                        <div
                            key={item.id}
                            className={styles.guidelineCard}
                        >
                            <img
                                src={item.icon}
                                alt=""
                                className={styles.guidelineIcon}
                            />

                            <p className={styles.guidelineText}>
                                {item.content}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </TopicLayout>
    );
};

export default CasualtyOfficerRole;

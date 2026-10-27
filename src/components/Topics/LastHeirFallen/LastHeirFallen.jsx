import { useEffect } from "react";
import TopicLayout from "../TopicLayout/TopicLayout";
import styles from "./LastHeirFallen.module.css";

import holocaust1 from "../../../assets/img/holocaust1.png";
import holocaust2 from "../../../assets/img/holocaust2.png";
import holocaust3 from "../../../assets/img/holocaust3.png";

// מימין לשמאל, לפי סדר התצוגה
const photos = [holocaust1, holocaust2, holocaust3];

const LastHeirFallen = ({ onPageReady }) => {
    useEffect(() => {
        onPageReady?.();
    }, [onPageReady]);

    return (
        <TopicLayout title="חללי נצר אחרון">
            <section
                className={styles.stage}
                dir="rtl"
                aria-label="חללי נצר אחרון"
            >
                <p className={styles.intro}>
                    חללי נצר אחרון הינם ניצולי שואה אשר נותרו שריד אחרון
                    למשפחתם הגרעינית, עלו לארץ, התגייסו לשורות הצבא
                    ונפלו במלחמות ישראל.
                </p>

                <div className={styles.factsRow}>
                    <article className={styles.factCard}>
                        144 חללי נצר אחרון מהווים עבור צה״ל והחברה
                        הישראלית אות וסמל לתקומת מדינת ישראל בעודם
                        הצהירו אמונים לערך היסוד של מדינה יהודית עצמאית
                        והקריבו את חייהם.
                    </article>

                    {photos.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt=""
                            className={styles.photo}
                        />
                    ))}
                </div>

                <div className={styles.memorialRow}>
                    <article className={styles.memorialCard}>
                        <p>
                            אזכרה לזכר חללי נצר אחרון תיערך{" "}
                            <u>בתאריך פטירתו העברי</u>{" "}
                            על ידי מדור נפגעים.
                        </p>
                    </article>

                    <article className={styles.memorialCard}>
                        <p>
                            לאזכרה יתואמו חזן צבאי ונציגי יחידה לקיום מניין
                            ותהא נציגות קצין נפגעים - ללא תלות / הקשר
                            למשפחה.
                        </p>
                    </article>
                </div>
            </section>
        </TopicLayout>
    );
};

export default LastHeirFallen;
import { Fragment, useEffect } from "react";
import TopicLayout from "../TopicLayout/TopicLayout";
import styles from "./MemorialsSecondPage.module.css";

import arrow from "../../../assets/img/arrow.svg";

const infoCards = [
    {
        id: "militaryFuneral",
        content: (
            <>
                <p>
                    בעת פטירת גיבור ישראל, אלוף או רא״ל לאחר השירות
                    (ובמידה והמשפחה רוצה), עורכים לוויה צבאית.
                </p>

                <p>
                    <strong>
                        הסיבה לכך היא הרצון לחלוק כבוד אחרון לגיבורי ישראל
                        ולמי ששירת זמן כה רב בצבא, כהוקרה על תרומתם.
                    </strong>
                </p>
            </>
        )
    },
    {
        id: "annualMemorials",
        content: (
            <>
                <p>לאורך השנים עורכים אזכרות שנתיות.</p>

                <p>
                    האזכרות לאוכלוסייה זו{" "}
                    <strong>
                        יתואמו על ידי קצינות הנפגעים בשיתוף מחלקת נפגעים
                    </strong>
                    {" "}– מדור קשר למשפחות, אשר יפנו לגורמים הרלוונטים
                    בהתאם (כמפורט בעמוד הבא).
                </p>
            </>
        )
    }
];

const processSteps = [
    {
        id: "contactFamily",
        text: "ק׳ הנפגעים תיצור קשר עם המשפחה והיא תוודא עם המשפחה תאריך ושעה"
    },
    {
        id: "chazzanCoordination",
        text: "בכלל האזכרות תיאום חזן יתבצע מול הרבנות הצבאית"
    },
    {
        id: "annualPresence",
        text: "נוכחות באזכרה השנתית"
    }
];

const MemorialsSecondPage = ({ onPageReady }) => {
    useEffect(() => {
        onPageReady?.();
    }, [onPageReady]);

    return (
        <TopicLayout
            title="אזכרות ספ״כ וגיבורי ישראל, אזכרות מקורבים"
            className={styles.page}
        >
            <section
                className={styles.stage}
                dir="rtl"
                aria-label="לוויה צבאית ואזכרות שנתיות"
            >
                <div className={styles.infoCards}>
                    {infoCards.map(card => (
                        <article key={card.id} className={styles.infoCard}>
                            {card.content}
                        </article>
                    ))}
                </div>

                <div className={styles.processBox}>
                    <h2 className={styles.processTitle}>
                        נוהל תיאום אזכרת ספ״כ –{" "}
                        <u>אחריות ק׳ הנפגעים</u>:
                    </h2>

                    <div className={styles.processSteps}>
                        {processSteps.map((step, index) => (
                            <Fragment key={step.id}>
                                <div className={styles.processStep}>
                                    {step.text}
                                </div>

                                {index < processSteps.length - 1 && (
                                    <img
                                        src={arrow}
                                        alt=""
                                        aria-hidden="true"
                                        className={styles.arrow}
                                    />
                                )}
                            </Fragment>
                        ))}
                    </div>
                </div>
            </section>
        </TopicLayout>
    );
};

export default MemorialsSecondPage;
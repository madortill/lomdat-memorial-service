import { Fragment, useEffect } from "react";
import TopicLayout from "../TopicLayout/TopicLayout";
import styles from "./MemorialsThirdPage.module.css";

import arrow from "../../../assets/img/arrow.svg";
import bouquet from "../../../assets/img/bouquet.svg";

const infoCards = [
    {
        id: "chiefOfStaffOffice",
        content: (
            <>
                באזכרות תא״ל עד רא״ל תתבצע פנייה ללשכת הרמטכ״ל
                בנושא הפצת פרטי האזכרה וקביעת נציגות.
            </>
        )
    },
    {
        id: "representativeRank",
        content: (
            <>
                באזכרות אל״ם וגיבורי ישראל הנציג יהיה בדרגת סא״ל לפחות.
            </>
        )
    },
    {
        id: "additionalMeans",
        content: (
            <>
                אמצעים נוספים - מערכת הגברה ופודיום יתואמו{" "}
                <strong>על פי בקשה</strong>{" "}
                באזכרות אלוף ורא״ל בלבד.
            </>
        )
    }
];

const processSteps = [
    { id: "fieldPreparation", text: "הפצת היערכות לשטח" },
    { id: "receiveDates", text: "קבלת מועדי האזכרות מקצינות הנפגעים" },
    { id: "distributeToOffices", text: "הפצה ללשכות בכירים" },
    {
        id: "idfRepresentative",
        text: "קבלת נציג צה״ל, וידוא הגעתו ויצירת קשר בין הלשכה לקצינת הנפגעים"
    },
    { id: "chazzanArrival", text: "וידוא הגעת חזן" },
    { id: "memorialDate", text: "מועד האזכרה" },
    { id: "participationReport", text: "דוח השתתפות באזכרה" }
];

const MemorialsThirdPage = ({ onPageReady }) => {
    useEffect(() => {
        onPageReady?.();
    }, [onPageReady]);

    return (
        <TopicLayout
            title="אזכרות ספ״כ וגיבורי ישראל, אזכרות מקורבים"
            className={styles.page}
            headerContent={
                <p className={styles.subtitle}>
                    נוהל תיאום אזכרות ספ״כ -{" "}
                    <strong>
                        <u>אחריות מדור קשר:</u>
                    </strong>
                </p>
            }
        >
            <section
                className={styles.stage}
                dir="rtl"
                aria-label="נוהל תיאום אזכרות ספ״כ - אחריות מדור קשר"
            >
                <div className={styles.cards}>
                    <article className={styles.wreathCard}>
                        <img
                            src={bouquet}
                            alt=""
                            aria-hidden="true"
                            className={styles.wreathImage}
                        />

                        <div className={styles.wreathText}>
                            <h2 className={styles.wreathTitle}>
                                זר צה״ל - יתואם באזכרות רא״ל בלבד.
                            </h2>

                            <p>
                                במקרה בו לא מתקיימת אזכרה, יונח זר צה״ל
                                ביום הפטירה הלועזי / העברי
                                (ע״פ בקשת המשפחה) על ידי נציג ק׳ נפגעים.
                            </p>
                        </div>
                    </article>

                    <div className={styles.smallCards}>
                        {infoCards.map(card => (
                            <article key={card.id} className={styles.smallCard}>
                                <p>{card.content}</p>
                            </article>
                        ))}
                    </div>
                </div>

                <div className={styles.processBox}>
                    <div
                        className={styles.processScroller}
                        tabIndex={0}
                        role="region"
                        aria-label="שלבי הנוהל, ניתן לגלול הצידה"
                    >
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
                </div>
            </section>
        </TopicLayout>
    );
};

export default MemorialsThirdPage;
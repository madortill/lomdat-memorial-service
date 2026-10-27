
import { useEffect } from "react";
import TopicLayout from "../TopicLayout/TopicLayout";
import styles from "./MemorialCategories.module.css";

import rankAlam from "../../../assets/img/rankAlam.svg";
import rankTatAloof from "../../../assets/img/rankTatAloof.svg";
import rankAloof from "../../../assets/img/rankAloof.svg";
import rankRavAloof from "../../../assets/img/rankRavAloof.svg";

const rankGroups = [
    {
        id: "duringService",
        ranks: [
            {
                id: "alam",
                name: "אל״ם",
                fullName: "אלוף משנה",
                image: rankAlam
            },
            {
                id: "tatAloof",
                name: "ותא״ל",
                fullName: "תת אלוף",
                image: rankTatAloof
            }
        ],
        description: "שנפטרו בשירות"
    },
    {
        id: "seniorRanks",
        ranks: [
            {
                id: "aloof",
                name: "אלוף",
                fullName: "",
                image: rankAloof
            },
            {
                id: "ravAloof",
                name: "ורא״ל",
                fullName: "רב אלוף",
                image: rankRavAloof
            }
        ],
        description: "שנפטרו בשירות או לאחריו (נוהל חבצלת)"
    }
];

const otherCategories = [
    {
        id: "heroes",
        title: "גיבורי ישראל",
        description: "מעוטרי עיטור הגבורה, שנפטרו בשירות או לאחריו."
    },
    {
        id: "closeAssociates",
        title: "״מקורבים״",
        description: (
            <>
                מועדי אזכרות אשר אנחנו מדווחים ללשכות בכירים
                (רמטכ״ל, ר׳ אכ״א, רמ״ח נפגעים)
                אשר דרשו להתעדכן בקיומן.
            </>
        )
    }
];

const MemorialCategories = ({ onPageReady }) => {
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
                aria-label="סוגי אזכרות מיוחדות"
            >
                <div className={styles.spacSection}>
                    <h2 className={styles.sectionTitle}>
                        אזכרות ספ״כ (סגל פיקודי כללי)
                    </h2>

                    <p className={styles.sectionSubtitle}>
                        בהגדרה זו נכללים:
                    </p>

                    <div className={styles.rankGroups}>
                        {rankGroups.map(group => (
                            <div
                                key={group.id}
                                className={styles.rankGroup}
                            >
                                <div className={styles.rankCard}>
                                    {group.ranks.map(rank => (
                                        <div
                                            key={rank.id}
                                            className={styles.rankItem}
                                        >
                                            <img
                                                src={rank.image}
                                                alt=""
                                                className={styles.rankImage}
                                            />

                                            <div className={styles.rankText}>
                                                <span className={styles.rankName}>
                                                    {rank.name}
                                                </span>

                                                {rank.fullName && (
                                                    <span className={styles.rankFullName}>
                                                        ({rank.fullName})
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <p className={styles.rankDescription}>
                                    {group.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.otherCategories}>
                    {otherCategories.map(category => (
                        <article
                            key={category.id}
                            className={styles.categoryCard}
                        >
                            <h2 className={styles.categoryTitle}>
                                {category.title}
                            </h2>

                            <p className={styles.categoryDescription}>
                                {category.description}
                            </p>
                        </article>
                    ))}
                </div>
            </section>
        </TopicLayout>
    );
};

export default MemorialCategories;

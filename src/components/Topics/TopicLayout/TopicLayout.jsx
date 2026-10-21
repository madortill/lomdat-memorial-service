import styles from "./TopicLayout.module.css";

export default function TopicLayout({ title, headerContent, children, footer, className = "", ariaLabel }) {
    return (
        <section className={`${styles.layout} ${className}`} dir="rtl" aria-label={ariaLabel || title}>
            <header className={styles.header}>
                <h1 className={styles.title}>{title}</h1>
                {headerContent && <div className={styles.headerContent}>{headerContent}</div>}
            </header>
            <div className={styles.main}>{children}</div>
            {footer && <div className={styles.footer}>{footer}</div>}
        </section>
    );
}

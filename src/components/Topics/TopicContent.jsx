import styles from "./TopicContent.module.css";
import TopicLayout from "./TopicLayout/TopicLayout";
import Introduction from "./Introduction";
import MemorialProcess from "./MemorialProcess/MemorialProcess";
import ChazzanCoordination from "./MemorialProcess/ChazzanCoordination";
import RepresentativesFlipCards from "./MemorialProcess/RepresentativesFlipCards";
import TechnicalRepresentatives from "./TechnicalDetails/TechnicalRepresentatives";
import TransportationCoordination from "./TechnicalDetails/TransportationCoordination";
import AmplificationSystem from "./TechnicalDetails/AmplificationSystem";
import MemorialHours from "./TechnicalDetails/MemorialHours";
import CasualtyOfficerHighlights from "./CasualtyOfficerGuidelines/CasualtyOfficerHighlights";
import CasualtyOfficerRole from "./CasualtyOfficerGuidelines/CasualtyOfficerRole";

export default function TopicContent({ topic, pageIndex = 0, onPageComplete, onPageReady }) {
    if (topic.id === "introduction") {
        return <Introduction onPageComplete={onPageComplete} />;
    }

    if (topic.id === "memorialProcess" && pageIndex === 0) {
        return <MemorialProcess onPageReady={onPageReady} />;
    }

    if (topic.id === "memorialProcess" && pageIndex === 1) {
        return <ChazzanCoordination onPageReady={onPageReady} />;
    }

    if (topic.id === "memorialProcess" && pageIndex === 2) {
        return (
            <RepresentativesFlipCards
                onPageReady={onPageReady}
            />
        );
    }

    if (topic.id === "technicalDetails" && pageIndex === 0) {
        return (
            <TechnicalRepresentatives
                onPageReady={onPageReady}
            />
        );
    }

    if (topic.id === "memorialProcess") {
        return (
            <TopicLayout title="תהליך תיאום אזכרה">
                <div className={styles.body}>
                    <p>עמוד {pageIndex + 1} מתוך 3 — כאן נכניס את התוכן של המסך הירוק הבא.</p>
                    <button type="button" className={styles.finish} onClick={onPageReady}>
                        סיימתי לעיין בעמוד (בדיקה זמנית)
                    </button>
                </div>
            </TopicLayout>
        );
    }

    if (topic.id === "technicalDetails" && pageIndex === 1) {
        return (
            <TransportationCoordination
                onPageReady={onPageReady}
            />
        );
    }

    if (topic.id === "technicalDetails" && pageIndex === 2) {
        return <AmplificationSystem onPageReady={onPageReady} />;
    }

    if (topic.id === "technicalDetails" && pageIndex === 3) {
        return (
            <MemorialHours
                onPageReady={onPageReady}
            />
        );
    }

    if (topic.id === "injuredRelatives" && pageIndex === 0) {
        return <CasualtyOfficerHighlights onPageReady={onPageReady} />;
    }

    if (topic.id === "injuredRelatives" && pageIndex === 1) {
        return <CasualtyOfficerRole onPageReady={onPageReady} />;
    }

    return (
        <TopicLayout title={topic.title}>
            <div className={styles.body}>
                <p>כאן יופיע בהמשך התוכן הלימודי של הנושא.</p>
                <button type="button" className={styles.finish} onClick={onPageComplete}>
                    הבנתי, סיום העמוד
                </button>
            </div>
        </TopicLayout>
    );
}

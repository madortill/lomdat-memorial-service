
import { useState } from "react";

const TopicContent = ({ topic, onComplete }) => {
    const [activeCard, setActiveCard] = useState(0);

    const exampleCards = [
        {
            title: "אחריות וניהול",
            text: "כאן יופיע התוכן של הכרטיסייה הראשונה."
        },
        {
            title: "תיאום וארגון",
            text: "כאן יופיע התוכן של הכרטיסייה השנייה."
        },
        {
            title: "דגשים חשובים",
            text: "כאן יופיע התוכן של הכרטיסייה השלישית."
        }
    ];

    return (
        <section
            dir="rtl"
            style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "clamp(1rem, 3vh, 2rem)",
                padding: "clamp(2rem, 5vw, 5rem)",
                color: "#087393",
                textAlign: "center"
            }}
        >
            <h1
                style={{
                    fontSize: "clamp(1.6rem, 3vw, 3rem)",
                    fontWeight: 700
                }}
            >
                {topic.title}
            </h1>

            <p style={{ fontSize: "clamp(0.9rem, 1.3vw, 1.4rem)" }}>
                בחרו בכרטיסייה כדי לצפות בתוכן
            </p>

            <div
                style={{
                    display: "flex",
                    gap: "clamp(0.5rem, 1.5vw, 1.5rem)"
                }}
            >
                {exampleCards.map((card, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setActiveCard(index)}
                        style={{
                            padding: "0.7rem 1.3rem",
                            border: "none",
                            borderRadius: "0.7rem",
                            backgroundColor:
                                activeCard === index ? "#087393" : "#D7E9E2",
                            color: activeCard === index ? "white" : "#087393",
                            cursor: "pointer",
                            fontSize: "clamp(0.8rem, 1vw, 1.1rem)"
                        }}
                    >
                        {card.title}
                    </button>
                ))}
            </div>

            <div
                style={{
                    backgroundColor: "#B4534D",
                    borderRadius: "0.8rem",
                    padding: "clamp(1.5rem, 3vw, 3rem)",
                    color: "white",
                    width: "min(35rem, 80%)",
                    minHeight: "clamp(8rem, 20vh, 14rem)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem"
                }}
            >
                <h2>{exampleCards[activeCard].title}</h2>
                <p>{exampleCards[activeCard].text}</p>
            </div>

            <button
                type="button"
                onClick={onComplete}
                style={{
                    padding: "0.7rem 2rem",
                    backgroundColor: "#BF711D",
                    border: "none",
                    borderRadius: "999rem",
                    color: "white",
                    fontWeight: 700,
                    cursor: "pointer"
                }}
            >
                סיום הנושא וחזרה ללוח
            </button>
        </section>
    );
};

export default TopicContent;

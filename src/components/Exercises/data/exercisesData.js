// שאלות הדגמה בלבד. יש להחליף בתוכן מאושר לפני פרסום הלומדה.
export const exercisesData = {
    exercise1: [
        {
            id: "e1-order",
            type: "ordering",
            title: "שאלה 1",
            instruction: "סדרו את שלבי התיאום לפי סדרם",
            items: [
                { id: "confirm", text: "וידוא פרטי האזכרה עם המשפחה" },
                { id: "report", text: "הוצאת דו״ח אזכרות" },
                { id: "representatives", text: "תיאום חזן ונציגי יחידה" },
                { id: "contact", text: "יצירת קשר עם משפחת החלל" }
            ],
            correctOrder: ["report", "contact", "representatives", "confirm"]
        },
        {
            id: "e1-choice-1",
            type: "multiple-choice",
            title: "שאלה 2",
            instruction: "כיצד מתאמים חזן לאזכרה?",
            options: [
                { id: "a", text: "באמצעות הרבנות הצבאית – תא אזכרות" },
                { id: "b", text: "מזמינים חזן פרטי ללא תיאום" },
                { id: "c", text: "משאירים למשפחה לתאם לבדה" },
                { id: "d", text: "פונים לנציגי היחידה בלבד" }
            ],
            correctAnswer: "a"
        },
        {
            id: "e1-choice-2",
            type: "multiple-choice",
            title: "שאלה 3",
            instruction: "מה עושים כאשר המשפחה מבקשת חזן בנוסח מסוים?",
            options: [
                { id: "a", text: "מבטיחים שהבקשה תתמלא" },
                { id: "b", text: "מעדכנים את הרבנות אך לא מתחייבים למשפחה" },
                { id: "c", text: "מתעלמים מהבקשה" },
                { id: "d", text: "מבטלים את השתתפות החזן" }
            ],
            correctAnswer: "b"
        }
    ],
    exercise2: [],
    exercise3: []
};

import ExerciseRunner from "./ExerciseRunner";
import { exercisesData } from "./data/exercisesData";
import styles from "./ExerciseContent.module.css";
export default function ExerciseContent({ topic, onPageComplete }) {
    const questions = exercisesData[topic.id] || [];
    if (!questions.length) return <section className={styles.content}>
        <h1>{topic.title}</h1><p>התרגול הזה עדיין בבנייה.</p>
    </section>;
    return <ExerciseRunner key={topic.id} exerciseId={topic.id} questions={questions} onComplete={onPageComplete} />;
}

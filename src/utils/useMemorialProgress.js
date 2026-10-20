import { useCallback, useEffect, useMemo, useState } from "react";
import { pageCounts } from "../components/Topics/topicRegistry";

const STORAGE_KEY = "memorial-progress-v2";

const loadProgress = () => {
    try {
        const value = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
        return value && typeof value === "object" && !Array.isArray(value) ? value : {};
    } catch {
        return {};
    }
};

export function useMemorialProgress(topics) {
    const [progress, setProgress] = useState(loadProgress);

    useEffect(() => {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }, [progress]);

    const completePage = useCallback((topicId, pageIndex) => {
        const count = pageCounts[topicId];
        if (!Number.isInteger(pageIndex) || pageIndex < 0 || pageIndex >= count) return;
        setProgress(previous => {
            const done = previous[topicId]?.completedPages || [];
            if (done.includes(pageIndex)) return previous;
            return {
                ...previous,
                [topicId]: { completedPages: [...done, pageIndex].sort((a, b) => a - b) }
            };
        });
    }, []);

    const unlockedIndex = useMemo(() => {
        const firstIncomplete = topics.findIndex(topic => {
            const count = pageCounts[topic.id];
            const done = progress[topic.id]?.completedPages || [];
            return !Array.from({ length: count }, (_, i) => i).every(i => done.includes(i));
        });
        return firstIncomplete === -1 ? topics.length - 1 : firstIncomplete;
    }, [progress, topics]);

    return { progress, unlockedIndex, completePage };
}

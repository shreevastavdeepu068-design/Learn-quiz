import type { Difficulty, Subject } from "@/lib/questions";

export const PROGRESS_STORAGE_KEY = "learn-and-play-progress-v2";
export const CLASS_STORAGE_KEY = "learn-and-play-class";

export type QuizHistoryEntry = {
  id: string;
  completedAt: string;
  subject: Subject;
  category: string;
  difficulty: Difficulty;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  score: number;
  starsEarned: number;
  accuracy: number;
  classLevel: number;
};

export type ProgressData = {
  totalStars: number;
  bestScore: number;
  quizzesCompleted: number;
  correctAnswers: number;
  currentStreak: number;
  longestStreak: number;
  lastQuizDate?: string;
  badges: string[];
  soundOn: boolean;
  quizHistory: QuizHistoryEntry[];
  classLevel: number;
};

export const defaultProgress: ProgressData = {
  totalStars: 0,
  bestScore: 0,
  quizzesCompleted: 0,
  correctAnswers: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastQuizDate: undefined,
  badges: [],
  soundOn: true,
  quizHistory: [],
  classLevel: 3,
};

export function loadProgress(): ProgressData {
  try {
    const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!stored) {
      // Try to migrate from v1
      const oldStored = localStorage.getItem("learn-and-play-progress-v1");
      if (oldStored) {
        const oldData = JSON.parse(oldStored) as Partial<ProgressData>;
        const migrated = { ...defaultProgress, ...oldData, classLevel: 3 };
        return migrated;
      }
      return defaultProgress;
    }
    const parsed = JSON.parse(stored) as Partial<ProgressData>;
    const quizHistory = Array.isArray(parsed.quizHistory) ? parsed.quizHistory : [];
    return { 
      ...defaultProgress, 
      ...parsed, 
      quizHistory,
      classLevel: parsed.classLevel ?? defaultProgress.classLevel,
    };
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: ProgressData) {
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Progress remains usable in memory if storage is unavailable.
  }
}

export function saveClassLevel(classLevel: number) {
  try {
    localStorage.setItem(CLASS_STORAGE_KEY, String(classLevel));
  } catch {
    // Class level remains in memory if storage unavailable.
  }
}

export function loadClassLevel(): number {
  try {
    const stored = localStorage.getItem(CLASS_STORAGE_KEY);
    if (!stored) return 3;
    const parsed = parseInt(stored, 10);
    return isNaN(parsed) || parsed < 1 || parsed > 5 ? 3 : parsed;
  } catch {
    return 3;
  }
}

export function buildQuizHistoryEntry(input: Omit<QuizHistoryEntry, "id" | "completedAt" | "wrongAnswers" | "accuracy">): QuizHistoryEntry {
  const wrongAnswers = Math.max(0, input.totalQuestions - input.correctAnswers);
  return {
    ...input,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    completedAt: new Date().toISOString(),
    wrongAnswers,
    accuracy: input.totalQuestions ? Math.round((input.correctAnswers / input.totalQuestions) * 100) : 0,
  };
}

export function updateStreak(progress: ProgressData): ProgressData {
  const today = new Date().toDateString();
  const lastDate = progress.lastQuizDate ? new Date(progress.lastQuizDate).toDateString() : null;
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  let newStreak = progress.currentStreak;
  let longestStreak = progress.longestStreak;

  if (lastDate === today) {
    // Already completed a quiz today, don't increment streak again
    newStreak = progress.currentStreak;
  } else if (lastDate === yesterday) {
    // Completed quiz yesterday, continue the streak
    newStreak = progress.currentStreak + 1;
  } else {
    // Gap in streak, reset to 1
    newStreak = 1;
  }

  longestStreak = Math.max(longestStreak, newStreak);

  return {
    ...progress,
    currentStreak: newStreak,
    longestStreak,
    lastQuizDate: new Date().toISOString(),
  };
}

export type ProgressSummary = {
  totalQuestions: number;
  wrongAnswers: number;
  accuracy: number;
  subjects: Record<Subject, { quizzes: number; questions: number; correct: number; stars: number; accuracy: number }>;
  categories: Record<string, { subject: Subject; quizzes: number; questions: number; correct: number; accuracy: number }>;
};

export function summarizeProgress(history: QuizHistoryEntry[]): ProgressSummary {
  const summary: ProgressSummary = {
    totalQuestions: 0,
    wrongAnswers: 0,
    accuracy: 0,
    subjects: {
      math: { quizzes: 0, questions: 0, correct: 0, stars: 0, accuracy: 0 },
      english: { quizzes: 0, questions: 0, correct: 0, stars: 0, accuracy: 0 },
    },
    categories: {},
  };

  for (const entry of history) {
    summary.totalQuestions += entry.totalQuestions;
    summary.wrongAnswers += entry.wrongAnswers;
    const subject = summary.subjects[entry.subject];
    subject.quizzes += 1;
    subject.questions += entry.totalQuestions;
    subject.correct += entry.correctAnswers;
    subject.stars += entry.starsEarned;

    const categoryKey = `${entry.subject}:${entry.category}`;
    const category = summary.categories[categoryKey] ?? { subject: entry.subject, quizzes: 0, questions: 0, correct: 0, accuracy: 0 };
    category.quizzes += 1;
    category.questions += entry.totalQuestions;
    category.correct += entry.correctAnswers;
    summary.categories[categoryKey] = category;
  }

  summary.accuracy = summary.totalQuestions ? Math.round(((summary.totalQuestions - summary.wrongAnswers) / summary.totalQuestions) * 100) : 0;
  for (const subject of Object.values(summary.subjects)) subject.accuracy = subject.questions ? Math.round((subject.correct / subject.questions) * 100) : 0;
  for (const category of Object.values(summary.categories)) category.accuracy = category.questions ? Math.round((category.correct / category.questions) * 100) : 0;
  return summary;
}

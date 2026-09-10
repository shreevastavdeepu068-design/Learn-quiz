import type { Difficulty, Subject } from "@/lib/questions";

export const PROGRESS_STORAGE_KEY = "learn-and-play-progress-v1";

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
};

export type ProgressData = {
  totalStars: number;
  bestScore: number;
  quizzesCompleted: number;
  correctAnswers: number;
  currentStreak: number;
  badges: string[];
  soundOn: boolean;
  quizHistory: QuizHistoryEntry[];
};

export const defaultProgress: ProgressData = {
  totalStars: 0,
  bestScore: 0,
  quizzesCompleted: 0,
  correctAnswers: 0,
  currentStreak: 0,
  badges: [],
  soundOn: true,
  quizHistory: [],
};

export function loadProgress(): ProgressData {
  try {
    const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!stored) return defaultProgress;
    const parsed = JSON.parse(stored) as Partial<ProgressData>;
    const quizHistory = Array.isArray(parsed.quizHistory) ? parsed.quizHistory : [];
    return { ...defaultProgress, ...parsed, quizHistory };
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

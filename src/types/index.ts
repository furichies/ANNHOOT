// User interface for authentication
export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  createdAt: string;
  bestScore: number;
  gamesPlayed: number;
}

// Question interface
export interface Question {
  id: number;
  text: string;
  image: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  category: string;
}

// Game result interface
export interface GameResult {
  id: string;
  userId: string;
  username: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeBonus: number;
  playedAt: string;
}

// Leaderboard entry
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar: string;
  bestScore: number;
  gamesPlayed: number;
}

// Answer selection
export interface AnswerSelection {
  questionId: number;
  selectedAnswer: 'A' | 'B' | 'C' | 'D' | null;
  isCorrect: boolean;
  timeSpent: number;
  pointsEarned: number;
}

// Game state
export interface GameState {
  currentScreen: 'landing' | 'auth' | 'dashboard' | 'lobby' | 'playing' | 'results' | 'leaderboard' | 'profile';
  currentUser: User | null;
  currentQuestionIndex: number;
  answers: AnswerSelection[];
  score: number;
  timeRemaining: number;
  isGameActive: boolean;
  soundEnabled: boolean;
}

// Avatar options
export const AVATARS = [
  '🦁', '🐼', '🦊', '🐱', '🐶', '🐸', '🦄', '🐨',
  '🐙', '🦋', '🐢', '🦜', '🌸', '⭐', '🔥', '💎'
] as const;

// Answer colors for Kahoot-like styling
export const ANSWER_COLORS = {
  A: { bg: '#E21B6E', hover: '#c4185e', text: '#ffffff' },
  B: { bg: '#1368CE', hover: '#0f5bb8', text: '#ffffff' },
  C: { bg: '#FFA800', hover: '#e09500', text: '#ffffff' },
  D: { bg: '#1FB58F', hover: '#1a9a7a', text: '#ffffff' },
} as const;

// Game constants
export const QUESTION_TIME = 15; // seconds
export const BASE_POINTS = 100;
export const MAX_TIME_BONUS = 50;
export const TOTAL_QUESTIONS = 20;
export const MAX_SCORE = TOTAL_QUESTIONS * (BASE_POINTS + MAX_TIME_BONUS); // 3000

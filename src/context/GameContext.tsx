'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { User, GameState, Question, AnswerSelection, LeaderboardEntry } from '@/types';
import { logoutUser, updateUserStats } from '@/lib/auth';
import { shuffleQuestions } from '@/lib/questions';
import { createGameResult, countCorrectAnswers } from '@/lib/game';
import { saveSoundEnabled } from '@/lib/storage';

interface GameContextType extends GameState {
  login: (user: User) => void;
  logout: () => void;
  setCurrentScreen: (screen: GameState['currentScreen']) => void;
  startGame: () => void;
  selectAnswer: (answer: 'A' | 'B' | 'C' | 'D') => void;
  nextQuestion: () => void;
  endGame: () => void;
  resetGame: () => void;
  toggleSound: () => void;
  reloadQuestions: () => Promise<void>;
  questions: Question[];
  leaderboard: LeaderboardEntry[];
  gameScore: number;
  correctCount: number;
}

// Safe localStorage helpers
function safeGetItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function safeSetItem(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

function getInitialUser(): User | null {
  return safeGetItem('annahoot_current_user', null);
}

function getInitialSound(): boolean {
  return safeGetItem('annahoot_sound_enabled', true);
}

function getInitialLeaderboard(): LeaderboardEntry[] {
  const users = safeGetItem<User[]>('annahoot_users', []);
  return users
    .sort((a, b) => b.bestScore - a.bestScore)
    .slice(0, 10)
    .map((user, index) => ({
      rank: index + 1,
      userId: user.id,
      username: user.username,
      avatar: user.avatar,
      bestScore: user.bestScore,
      gamesPlayed: user.gamesPlayed,
    }));
}

function getInitialScreen(user: User | null): GameState['currentScreen'] {
  if (typeof window === 'undefined') return 'landing';
  return user ? 'dashboard' : 'landing';
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  // Initialize with lazy initializers (client-side only access)
  const [storedUser, setStoredUser] = useState<User | null>(getInitialUser);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(getInitialSound);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(getInitialLeaderboard);
  
  const [state, setState] = useState<GameState>(() => ({
    currentScreen: getInitialScreen(getInitialUser()),
    currentUser: null,
    currentQuestionIndex: 0,
    answers: [],
    score: 0,
    timeRemaining: 15,
    isGameActive: false,
    soundEnabled: true,
  }));
  
  const [questions, setQuestions] = useState<Question[]>([]);
  
  // Computed current screen
  const currentScreen = useMemo(() => {
    if (storedUser && state.currentScreen === 'landing') return 'dashboard';
    if (storedUser && state.currentScreen === 'auth') return 'dashboard';
    return state.currentScreen;
  }, [storedUser, state.currentScreen]);
  
  const refreshLeaderboard = useCallback(() => {
    const users = safeGetItem<User[]>('annahoot_users', []);
    const sorted = users
      .sort((a, b) => b.bestScore - a.bestScore)
      .slice(0, 10)
      .map((user, index) => ({
        rank: index + 1,
        userId: user.id,
        username: user.username,
        avatar: user.avatar,
        bestScore: user.bestScore,
        gamesPlayed: user.gamesPlayed,
      }));
    setLeaderboard(sorted);
  }, []);
  
  const login = useCallback((user: User) => {
    safeSetItem('annahoot_current_user', user);
    setStoredUser(user);
    refreshLeaderboard();
  }, [refreshLeaderboard]);
  
  const logout = useCallback(() => {
    logoutUser();
    setStoredUser(null);
    setState(prev => ({ ...prev, currentScreen: 'landing' }));
  }, []);
  
  const setCurrentScreen = useCallback((screen: GameState['currentScreen']) => {
    setState(prev => ({ ...prev, currentScreen: screen }));
    if (screen === 'leaderboard') {
      refreshLeaderboard();
    }
  }, [refreshLeaderboard]);
  
  const startGame = useCallback(async () => {
    try {
      const response = await fetch('/api/questions');
      if (response.ok) {
        const dbQuestions = await response.json();
        if (dbQuestions && dbQuestions.length > 0) {
          // Shuffle API questions
          const shuffled = [...dbQuestions];
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }
          setQuestions(shuffled);
        } else {
          setQuestions(shuffleQuestions()); // Fallback
        }
      } else {
        setQuestions(shuffleQuestions()); // Fallback
      }
    } catch (e) {
      setQuestions(shuffleQuestions()); // Fallback
    }

    setState(prev => ({
      ...prev,
      currentQuestionIndex: 0,
      answers: [],
      score: 0,
      timeRemaining: 15,
      isGameActive: true,
      currentScreen: 'playing',
    }));
  }, []);
  
  const selectAnswer = useCallback((answer: 'A' | 'B' | 'C' | 'D') => {
    if (!state.isGameActive || state.currentQuestionIndex >= questions.length) return;
    
    const currentQuestion = questions[state.currentQuestionIndex];
    const answerSelection: AnswerSelection = {
      questionId: currentQuestion.id,
      selectedAnswer: answer,
      isCorrect: answer === currentQuestion.correctAnswer,
      timeSpent: 15 - state.timeRemaining,
      pointsEarned: answer === currentQuestion.correctAnswer 
        ? 100 + Math.round((state.timeRemaining / 15) * 50)
        : 0,
    };
    
    setState(prev => ({
      ...prev,
      answers: [...prev.answers, answerSelection],
      score: prev.score + answerSelection.pointsEarned,
      isGameActive: false,
    }));
  }, [state.isGameActive, state.currentQuestionIndex, state.timeRemaining, questions]);
  
  const nextQuestion = useCallback(() => {
    const nextIndex = state.currentQuestionIndex + 1;
    
    if (nextIndex >= questions.length) {
      setState(prev => ({ ...prev, currentScreen: 'results' }));
    } else {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: nextIndex,
        timeRemaining: 15,
        isGameActive: true,
      }));
    }
  }, [state.currentQuestionIndex, questions.length]);
  
  const endGame = useCallback(() => {
    if (storedUser) {
      createGameResult(
        storedUser.id,
        storedUser.username,
        state.answers
      );
      updateUserStats(storedUser.id, state.score);
      
      const updatedUser = { 
        ...storedUser,
        bestScore: Math.max(storedUser.bestScore, state.score),
        gamesPlayed: storedUser.gamesPlayed + 1,
      };
      safeSetItem('annahoot_current_user', updatedUser);
      setStoredUser(updatedUser);
    }
    refreshLeaderboard();
  }, [storedUser, state.answers, state.score, refreshLeaderboard]);
  
  const resetGame = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentQuestionIndex: 0,
      answers: [],
      score: 0,
      timeRemaining: 15,
      isGameActive: false,
      currentScreen: 'dashboard',
    }));
    setQuestions([]);
  }, []);

  const reloadQuestions = useCallback(async () => {
    try {
      const response = await fetch('/api/questions');
      if (response.ok) {
        const dbQuestions = await response.json();
        if (dbQuestions && dbQuestions.length > 0) {
          const shuffled = [...dbQuestions];
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }
          setQuestions(shuffled);
        }
      }
    } catch {
      // silently fail
    }
  }, []);
  
  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const newValue = !prev;
      saveSoundEnabled(newValue);
      return newValue;
    });
  }, []);
  
  const correctCount = useMemo(() => countCorrectAnswers(state.answers), [state.answers]);
  
  const value: GameContextType = {
    ...state,
    currentUser: storedUser,
    soundEnabled,
    currentScreen,
    login,
    logout,
    setCurrentScreen,
    startGame,
    selectAnswer,
    nextQuestion,
    endGame,
    resetGame,
    toggleSound,
    reloadQuestions,
    questions,
    leaderboard,
    gameScore: state.score,
    correctCount,
  };
  
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

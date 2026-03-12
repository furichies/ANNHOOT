import { Question, AnswerSelection, GameResult, BASE_POINTS, MAX_TIME_BONUS, QUESTION_TIME } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { addGameResult } from './storage';

// Calculate points for an answer
export function calculatePoints(
  isCorrect: boolean,
  timeRemaining: number
): number {
  if (!isCorrect) return 0;
  
  const timeBonus = Math.round((timeRemaining / QUESTION_TIME) * MAX_TIME_BONUS);
  return BASE_POINTS + timeBonus;
}

// Process answer and return result
export function processAnswer(
  question: Question,
  selectedAnswer: 'A' | 'B' | 'C' | 'D',
  timeRemaining: number
): AnswerSelection {
  const isCorrect = selectedAnswer === question.correctAnswer;
  const pointsEarned = calculatePoints(isCorrect, timeRemaining);
  
  return {
    questionId: question.id,
    selectedAnswer,
    isCorrect,
    timeSpent: QUESTION_TIME - timeRemaining,
    pointsEarned,
  };
}

// Calculate total score from answers
export function calculateTotalScore(answers: AnswerSelection[]): number {
  return answers.reduce((total, answer) => total + answer.pointsEarned, 0);
}

// Calculate total time bonus
export function calculateTotalTimeBonus(answers: AnswerSelection[]): number {
  return answers.reduce((total, answer) => {
    if (answer.isCorrect) {
      return total + (answer.pointsEarned - BASE_POINTS);
    }
    return total;
  }, 0);
}

// Count correct answers
export function countCorrectAnswers(answers: AnswerSelection[]): number {
  return answers.filter(a => a.isCorrect).length;
}

// Create game result
export function createGameResult(
  userId: string,
  username: string,
  answers: AnswerSelection[]
): GameResult {
  const result: GameResult = {
    id: uuidv4(),
    userId,
    username,
    score: calculateTotalScore(answers),
    correctAnswers: countCorrectAnswers(answers),
    totalQuestions: answers.length,
    timeBonus: calculateTotalTimeBonus(answers),
    playedAt: new Date().toISOString(),
  };
  
  addGameResult(result);
  return result;
}

// Get time bonus display text
export function getTimeBonusText(timeRemaining: number): string {
  if (timeRemaining >= 12) return '¡Increíble! ⚡';
  if (timeRemaining >= 9) return '¡Muy rápido! 🚀';
  if (timeRemaining >= 6) return '¡Bien! 👍';
  if (timeRemaining >= 3) return '¡Correcto! ✓';
  return '¡Por poco! 😅';
}

// Format score for display
export function formatScore(score: number): string {
  return score.toLocaleString('es-ES');
}

// Get performance message based on percentage
export function getPerformanceMessage(correctPercentage: number): string {
  if (correctPercentage >= 90) return '¡Excelente! Eres un experto en fisiología 🏆';
  if (correctPercentage >= 70) return '¡Muy bien! Tienes grandes conocimientos 👏';
  if (correctPercentage >= 50) return '¡Buen trabajo! Sigue aprendiendo 📚';
  if (correctPercentage >= 30) return 'No está mal, hay margen de mejora 💪';
  return '¡Sigue practicando! La práctica hace al maestro 🎯';
}

// Format time for display
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

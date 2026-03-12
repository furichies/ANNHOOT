'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useGame } from '@/context/GameContext';
import { Timer } from './Timer';
import { QuestionCard } from './QuestionCard';
import { QUESTION_TIME } from '@/types';
import { ArrowRight, Home } from 'lucide-react';

// Custom hook for timer management
function useTimer(
  isRunning: boolean,
  onTimeUp: () => void,
  onTick: (time: number) => void
) {
  const timeRef = useRef(QUESTION_TIME);
  const onTimeUpRef = useRef(onTimeUp);
  const onTickRef = useRef(onTick);
  const isRunningRef = useRef(isRunning);
  
  // Keep refs updated
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
    onTickRef.current = onTick;
    isRunningRef.current = isRunning;
  });
  
  useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(() => {
      timeRef.current -= 1;
      onTickRef.current(timeRef.current);
      
      if (timeRef.current <= 0) {
        onTimeUpRef.current();
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isRunning]);
  
  const reset = useCallback(() => {
    timeRef.current = QUESTION_TIME;
    onTickRef.current(QUESTION_TIME);
  }, []);
  
  return { reset };
}

export function QuizGame() {
  const {
    questions,
    currentQuestionIndex,
    score,
    isGameActive,
    selectAnswer,
    nextQuestion,
    endGame,
    resetGame,
    setCurrentScreen,
  } = useGame();
  
  const [timeRemaining, setTimeRemaining] = useState(QUESTION_TIME);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [showResult, setShowResult] = useState(false);
  const hasAnswered = useRef(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  
  const handleTimeUp = useCallback(() => {
    if (!currentQuestion || hasAnswered.current) return;
    
    hasAnswered.current = true;
    selectAnswer(currentQuestion.correctAnswer);
    setSelectedAnswer(null);
    setShowResult(true);
  }, [currentQuestion, selectAnswer]);
  
  const handleTick = useCallback((time: number) => {
    setTimeRemaining(time);
  }, []);
  
  const { reset: resetTimer } = useTimer(
    isGameActive && !showResult,
    handleTimeUp,
    handleTick
  );
  
  const handleAnswer = useCallback((answer: 'A' | 'B' | 'C' | 'D') => {
    if (showResult || !isGameActive) return;
    
    hasAnswered.current = true;
    setSelectedAnswer(answer);
    selectAnswer(answer);
    setShowResult(true);
  }, [showResult, isGameActive, selectAnswer]);
  
  const handleNext = useCallback(() => {
    if (currentQuestionIndex >= questions.length - 1) {
      endGame();
      setCurrentScreen('results');
    } else {
      setSelectedAnswer(null);
      setShowResult(false);
      hasAnswered.current = false;
      resetTimer();
      nextQuestion();
    }
  }, [currentQuestionIndex, questions.length, endGame, setCurrentScreen, nextQuestion, resetTimer]);
  
  // Reset when question changes
  useEffect(() => {
    hasAnswered.current = false;
    resetTimer();
  }, [currentQuestionIndex, resetTimer]);
  
  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-purple-900">
        <div className="text-white text-center">
          <p className="text-xl">Cargando pregunta...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
              <span className="text-white/70 text-sm">Puntuación</span>
              <p className="text-white font-bold text-xl">{score.toLocaleString()}</p>
            </div>
          </div>
          
          {/* Timer */}
          <div className="w-32">
            <Timer timeRemaining={timeRemaining} isRunning={isGameActive && !showResult} />
          </div>
        </div>
      </div>
      
      {/* Question Card */}
      <QuestionCard
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        onAnswer={handleAnswer}
        selectedAnswer={selectedAnswer}
        showResult={showResult}
        disabled={showResult}
      />
      
      {/* Next button (shown after answering) */}
      {showResult && (
        <div className="max-w-4xl mx-auto mt-6 flex justify-center">
          <Button
            onClick={handleNext}
            className="h-14 px-8 bg-white text-purple-700 hover:bg-purple-50 font-bold text-lg shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {currentQuestionIndex >= questions.length - 1 ? (
              <>
                Ver Resultados
                <ArrowRight className="ml-2 w-5 h-5" />
              </>
            ) : (
              <>
                Siguiente Pregunta
                <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </Button>
        </div>
      )}
      
      {/* Quit button */}
      <div className="fixed bottom-4 left-4">
        <Button
          variant="ghost"
          onClick={() => {
            resetGame();
            setCurrentScreen('dashboard');
          }}
          className="text-white/60 hover:text-white hover:bg-white/10"
        >
          <Home className="w-5 h-5 mr-2" />
          Salir
        </Button>
      </div>
    </div>
  );
}

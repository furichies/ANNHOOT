'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGame } from '@/context/GameContext';
import { TOTAL_QUESTIONS, MAX_SCORE } from '@/types';
import { getPerformanceMessage } from '@/lib/game';
import { Trophy, Target, Clock, Star, Home, RotateCcw, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ScoreDisplay() {
  const { score, correctCount, answers, currentUser, resetGame, startGame, setCurrentScreen } = useGame();
  
  const percentage = Math.round((correctCount / TOTAL_QUESTIONS) * 100);
  const timeBonus = answers.reduce((sum, a) => sum + (a.isCorrect ? a.pointsEarned - 100 : 0), 0);
  
  const getGrade = () => {
    if (percentage >= 90) return { emoji: '🏆', text: '¡Excelente!', color: 'text-yellow-500' };
    if (percentage >= 70) return { emoji: '🌟', text: '¡Muy bien!', color: 'text-green-500' };
    if (percentage >= 50) return { emoji: '👍', text: '¡Buen trabajo!', color: 'text-blue-500' };
    if (percentage >= 30) return { emoji: '💪', text: '¡Sigue practicando!', color: 'text-orange-500' };
    return { emoji: '📚', text: 'Necesitas más práctica', color: 'text-red-500' };
  };
  
  const grade = getGrade();
  
  const handlePlayAgain = () => {
    resetGame();
    startGame();
  };
  
  const handleGoHome = () => {
    resetGame();
    setCurrentScreen('dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header with trophy */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl">
              <Trophy className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 text-4xl animate-bounce">
              {grade.emoji}
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-6 mb-2">
            ¡Juego Terminado!
          </h1>
          <p className="text-xl text-purple-200">
            {currentUser?.username ? `¡Buen esfuerzo, ${currentUser.username}!` : '¡Buen esfuerzo!'}
          </p>
        </div>
        
        {/* Main score card */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 mb-6">
          <CardContent className="p-6 md:p-8">
            {/* Big score display */}
            <div className="text-center mb-6">
              <p className="text-gray-500 text-lg mb-2">Tu puntuación</p>
              <div className="relative inline-block">
                <span className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  {score.toLocaleString()}
                </span>
                <span className="text-2xl text-gray-400 ml-2">/ {MAX_SCORE}</span>
              </div>
            </div>
            
            {/* Performance message */}
            <div className="text-center mb-8">
              <p className={`text-xl font-semibold ${grade.color}`}>
                {grade.text}
              </p>
              <p className="text-gray-600 mt-2">
                {getPerformanceMessage(percentage)}
              </p>
            </div>
            
            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-3xl font-bold text-green-600">{correctCount}</p>
                <p className="text-sm text-gray-600">Correctas</p>
              </div>
              
              <div className="text-center p-4 bg-red-50 rounded-xl">
                <div className="w-8 h-8 text-red-500 mx-auto mb-2 flex items-center justify-center text-2xl">
                  ❌
                </div>
                <p className="text-3xl font-bold text-red-600">{TOTAL_QUESTIONS - correctCount}</p>
                <p className="text-sm text-gray-600">Incorrectas</p>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-3xl font-bold text-blue-600">+{timeBonus}</p>
                <p className="text-sm text-gray-600">Bonus Tiempo</p>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Precisión</span>
                <span>{percentage}%</span>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ease-out rounded-full ${
                    percentage >= 70 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                    percentage >= 50 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                    'bg-gradient-to-r from-red-400 to-red-600'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
            
            {/* Category breakdown */}
            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-700 mb-3">Resumen por categoría</h3>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {answers.map((answer, index) => {
                  const questionNumber = index + 1;
                  return (
                    <div
                      key={answer.questionId}
                      className={`flex items-center gap-3 p-2 rounded-lg ${
                        answer.isCorrect ? 'bg-green-50' : 'bg-red-50'
                      }`}
                    >
                      <span className="text-sm font-medium text-gray-500 w-8">
                        #{questionNumber}
                      </span>
                      <span className="text-lg">{answer.isCorrect ? '✅' : '❌'}</span>
                      <span className="flex-1 text-sm text-gray-600">
                        {answer.isCorrect ? `+${answer.pointsEarned} pts` : '0 pts'}
                      </span>
                      {answer.isCorrect && answer.pointsEarned > 100 && (
                        <span className="text-xs text-blue-600 font-medium">
                          ⚡ +{answer.pointsEarned - 100} bonus
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handlePlayAgain}
            className="h-14 px-8 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold text-lg shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Jugar de Nuevo
          </Button>
          
          <Button
            onClick={handleGoHome}
            variant="outline"
            className="h-14 px-8 bg-white/90 hover:bg-white text-purple-700 font-semibold text-lg shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Home className="w-5 h-5 mr-2" />
            Ir al Inicio
          </Button>
          
          <Button
            onClick={() => setCurrentScreen('leaderboard')}
            variant="outline"
            className="h-14 px-8 bg-white/90 hover:bg-white text-purple-700 font-semibold text-lg shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Crown className="w-5 h-5 mr-2" />
            Clasificación
          </Button>
        </div>
      </div>
    </div>
  );
}

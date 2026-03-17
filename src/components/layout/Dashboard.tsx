'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  Crown, 
  User, 
  Trophy, 
  Target, 
  Clock,
  Brain,
  Sparkles
} from 'lucide-react';


export function Dashboard() {
  const { currentUser, startGame, setCurrentScreen, questions } = useGame();
  
  if (!currentUser) return null;
  
  const stats = [
    {
      icon: Trophy,
      label: 'Mejor Puntuación',
      value: currentUser.bestScore.toLocaleString(),
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: Target,
      label: 'Partidas Jugadas',
      value: currentUser.gamesPlayed.toString(),
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      icon: Brain,
      label: 'Rango',
      value: currentUser.bestScore >= 2500 ? 'Experto' :
             currentUser.bestScore >= 2000 ? 'Avanzado' :
             currentUser.bestScore >= 1500 ? 'Intermedio' :
             currentUser.bestScore >= 1000 ? 'Principiante' : 'Novato',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-4">{currentUser.avatar}</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            ¡Hola, {currentUser.username}!
          </h1>
          <p className="text-purple-200 text-lg">
            ¿Listo para poner a prueba tus conocimientos de fisiología?
          </p>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 py-8 -mt-8">
        {/* Play card */}
        <Card className="bg-gradient-to-br from-purple-600 to-purple-800 text-white shadow-2xl border-0 mb-8 overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <Brain className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Quiz de Fisiología
                </h2>
                <p className="text-purple-200 mb-4">
                  {questions.length > 0 ? questions.length : 20} preguntas sobre sistemas del cuerpo humano
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                    ⏱️ 15 seg por pregunta
                  </span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                    ⭐ Hasta 3000 puntos
                  </span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                    🏆 Bonificación por velocidad
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <Button
                  onClick={startGame}
                  className="h-16 px-8 bg-white text-purple-700 hover:bg-purple-50 font-bold text-xl shadow-xl transition-all duration-300 transform hover:scale-105 rounded-2xl"
                >
                  <Play className="w-6 h-6 mr-2 fill-current" />
                  JUGAR
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-white shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card 
            className="bg-white shadow-lg border-0 cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => setCurrentScreen('leaderboard')}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-md">
                  <Crown className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800">Clasificación</h3>
                  <p className="text-sm text-gray-500">Mira los mejores jugadores</p>
                </div>
                <Sparkles className="w-5 h-5 text-gray-300" />
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className="bg-white shadow-lg border-0 cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => setCurrentScreen('profile')}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800">Mi Perfil</h3>
                  <p className="text-sm text-gray-500">Edita tu información</p>
                </div>
                <Sparkles className="w-5 h-5 text-gray-300" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Topics covered */}
        <Card className="mt-8 bg-white shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-center">Temas del Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { emoji: '❤️', name: 'Cardiovascular' },
                { emoji: '🫁', name: 'Respiratorio' },
                { emoji: '🧠', name: 'Nervioso' },
                { emoji: '🍽️', name: 'Digestivo' },
                { emoji: '💪', name: 'Muscular' },
                { emoji: '🔬', name: 'Endocrino' },
                { emoji: '🩺', name: 'Renal' },
                { emoji: '🧬', name: 'Celular' },
              ].map((topic) => (
                <div
                  key={topic.name}
                  className="flex items-center gap-2 p-3 bg-purple-50 rounded-xl"
                >
                  <span className="text-2xl">{topic.emoji}</span>
                  <span className="text-sm font-medium text-purple-700">{topic.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>


      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Users, Clock, Brain, Sparkles, ChevronRight } from 'lucide-react';

export function LandingPage() {
  const { setCurrentScreen, questions } = useGame();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-300/10 rounded-full blur-3xl" />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Logo and title */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <div className="w-28 h-28 md:w-36 md:h-36 bg-white rounded-3xl shadow-2xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <Brain className="w-16 h-16 md:w-20 md:h-20 text-purple-600" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-8 h-8 text-yellow-400 animate-bounce" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            Ana<span className="text-yellow-400">Hoot</span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 max-w-md mx-auto">
            ¡Aprende fisiología jugando!
          </p>
        </div>
        
        {/* Features cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl w-full mb-10">
          <Card className="bg-white/10 backdrop-blur-sm border-0 text-white">
            <CardContent className="p-4 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
              <h3 className="font-semibold">{questions.length > 0 ? questions.length : 20} Preguntas</h3>
              <p className="text-sm text-purple-200">Sobre sistemas del cuerpo</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-0 text-white">
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <h3 className="font-semibold">15 Segundos</h3>
              <p className="text-sm text-purple-200">Por cada pregunta</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-0 text-white">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-green-400" />
              <h3 className="font-semibold">Clasificación</h3>
              <p className="text-sm text-purple-200">Compite con otros</p>
            </CardContent>
          </Card>
        </div>
        
        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Button
            onClick={() => setCurrentScreen('auth')}
            className="flex-1 h-14 text-lg font-bold bg-white text-purple-700 hover:bg-purple-50 shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-xl"
          >
            Jugar Ahora
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
        
        {/* Info section */}
        <div className="mt-12 text-center max-w-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">
            ¿Cómo funciona?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {[
              { step: 1, text: 'Regístrate o inicia sesión' },
              { step: 2, text: `Responde ${questions.length > 0 ? questions.length : 20} preguntas de fisiología` },
              { step: 3, text: 'Gana puntos por respuestas correctas' },
              { step: 4, text: 'Obtén bonus por responder rápido' },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4"
              >
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-purple-800">
                  {item.step}
                </div>
                <p className="text-white">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <p className="mt-12 text-purple-300 text-sm">
          Creado con ❤️ para aprender fisiología
        </p>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { QUESTION_TIME } from '@/types';

interface TimerProps {
  timeRemaining: number;
  isRunning: boolean;
}

export function Timer({ timeRemaining, isRunning }: TimerProps) {
  const percentage = (timeRemaining / QUESTION_TIME) * 100;
  
  // Color based on time remaining
  const getColor = () => {
    if (percentage > 60) return 'from-green-400 to-green-600';
    if (percentage > 30) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };
  
  const getBgColor = () => {
    if (percentage > 60) return 'bg-green-100';
    if (percentage > 30) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Timer display */}
      <div className="relative flex items-center justify-center mb-3">
        <div 
          className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold shadow-lg ${getBgColor()} transition-colors duration-300`}
        >
          <span className={`${percentage <= 30 ? 'text-red-600 animate-pulse' : 'text-gray-800'}`}>
            {timeRemaining}
          </span>
        </div>
        
        {/* Pulse animation when running low */}
        {isRunning && percentage <= 30 && (
          <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-20" />
        )}
      </div>
      
      {/* Progress bar */}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <div
          className={`h-full bg-gradient-to-r ${getColor()} transition-all duration-1000 ease-linear rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {/* Time text */}
      <p className="text-center mt-2 text-sm text-gray-500">
        {timeRemaining > 0 ? 'segundos restantes' : '¡Tiempo!'}
      </p>
    </div>
  );
}

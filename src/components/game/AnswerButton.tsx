'use client';

import React from 'react';
import { ANSWER_COLORS } from '@/types';
import { cn } from '@/lib/utils';

interface AnswerButtonProps {
  option: 'A' | 'B' | 'C' | 'D';
  text: string;
  onClick: () => void;
  disabled?: boolean;
  isSelected?: boolean;
  isCorrect?: boolean;
  showResult?: boolean;
}

export function AnswerButton({
  option,
  text,
  onClick,
  disabled = false,
  isSelected = false,
  isCorrect = false,
  showResult = false,
}: AnswerButtonProps) {
  const colors = ANSWER_COLORS[option];
  
  const getButtonState = () => {
    if (!showResult) {
      return {
        bg: colors.bg,
        transform: 'scale-100',
        opacity: '1',
      };
    }
    
    if (isCorrect) {
      return {
        bg: colors.bg,
        transform: 'scale-105',
        opacity: '1',
      };
    }
    
    if (isSelected && !isCorrect) {
      return {
        bg: '#6b7280',
        transform: 'scale-95',
        opacity: '0.7',
      };
    }
    
    return {
      bg: colors.bg,
      transform: 'scale-100',
      opacity: '0.5',
    };
  };
  
  const state = getButtonState();
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative w-full p-4 md:p-6 rounded-2xl text-white font-semibold text-lg md:text-xl shadow-lg transition-all duration-300 transform',
        'hover:shadow-xl active:scale-95',
        disabled && !showResult && 'cursor-not-allowed opacity-60',
        showResult && 'cursor-default'
      )}
      style={{
        backgroundColor: state.bg,
        opacity: state.opacity,
        transform: state.transform,
      }}
    >
      {/* Option letter badge */}
      <div className="absolute top-2 left-2 md:top-3 md:left-3 w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-lg flex items-center justify-center text-base md:text-lg font-bold">
        {option}
      </div>
      
      {/* Answer text */}
      <div className="mt-6 md:mt-8 text-left pr-2 md:pr-4 leading-tight">
        {text}
      </div>
      
      {/* Result indicators */}
      {showResult && isCorrect && (
        <div className="absolute top-2 right-2 md:top-3 md:right-3 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 md:w-6 md:h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
      
      {showResult && isSelected && !isCorrect && (
        <div className="absolute top-2 right-2 md:top-3 md:right-3 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 md:w-6 md:h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      )}
    </button>
  );
}

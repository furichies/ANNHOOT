'use client';

import React from 'react';
import { Question } from '@/types';
import { AnswerButton } from './AnswerButton';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: 'A' | 'B' | 'C' | 'D') => void;
  selectedAnswer: 'A' | 'B' | 'C' | 'D' | null;
  showResult: boolean;
  disabled: boolean;
}

// Fallback icons for known categories
const CATEGORY_ICONS: Record<string, string> = {
  'Cardiovascular': '❤️',
  'Respiratorio': '🫁',
  'Neumología': '🫁',
  'Neurología': '🧠',
  'Sistema Nervioso': '🧠',
  'Digestivo': '🫃',
  'Gastrointestinal': '🫃',
  'Renal': '🫘',
  'Endocrino': '🦋',
  'Muscular': '💪',
  'Esquelético': '🦴',
  'Óseo': '🦴',
  'Inmunológico': '🛡️',
  'Celular': '🦠',
  'Fisiología Celular': '🦠',
};

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  selectedAnswer,
  showResult,
  disabled,
}: QuestionCardProps) {
  const defaultIcon = CATEGORY_ICONS[question.category] || '🧬';

  return (
    <div className="w-full max-w-4xl mx-auto">
      
      {/* Category badge */}
      <div className="text-center mb-4">
        <span className="inline-block px-4 py-1 bg-purple-100/80 text-purple-700 rounded-full text-sm font-medium shadow-sm">
          {question.category}
        </span>
      </div>
      
      {/* Question container with side image */}
      <div className="bg-white rounded-2xl shadow-lg p-5 md:p-8 mb-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
        
        {/* Left Side: Image / Icon */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-inner flex items-center justify-center overflow-hidden border border-purple-100">
            {question.image ? (
              <img
                src={question.image}
                alt={question.category}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`text-4xl md:text-5xl text-purple-400 ${question.image ? 'hidden' : ''}`}>
              {defaultIcon}
            </div>
          </div>
        </div>

        {/* Right Side: Question Text */}
        <div className="flex-1 flex flex-col justify-center min-h-[6rem] md:min-h-[8rem]">
          <div className="flex items-start gap-3 md:gap-4">
            <span className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-xl flex items-center justify-center font-bold text-base md:text-lg shadow-md mt-0.5">
              {questionNumber}
            </span>
            <h2 className="text-lg md:text-2xl font-semibold text-gray-800 leading-snug md:leading-relaxed">
              {question.text}
            </h2>
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2 px-1">
          <span>Pregunta {questionNumber} de {totalQuestions}</span>
          <span>{Math.round((questionNumber / totalQuestions) * 100)}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-purple-700 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>
      
      {/* Answer options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {(['A', 'B', 'C', 'D'] as const).map((option) => (
          <AnswerButton
            key={option}
            option={option}
            text={question.options[option]}
            onClick={() => onAnswer(option)}
            disabled={disabled}
            isSelected={selectedAnswer === option}
            isCorrect={question.correctAnswer === option}
            showResult={showResult}
          />
        ))}
      </div>
      
      {/* Explanation (shown after answering) */}
      {showResult && (
        <div className={`mt-6 p-4 md:p-5 rounded-2xl transition-all animate-in fade-in slide-in-from-bottom-4 ${
          selectedAnswer === question.correctAnswer
            ? 'bg-green-50 border-2 border-green-200 shadow-sm'
            : 'bg-red-50 border-2 border-red-200 shadow-sm'
        }`}>
          <div className="flex items-start gap-4">
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-inner ${
              selectedAnswer === question.correctAnswer ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            }`}>
              {selectedAnswer === question.correctAnswer ? '✓' : '✗'}
            </div>
            <div>
              <p className={`font-bold mb-1.5 ${
                selectedAnswer === question.correctAnswer
                  ? 'text-green-700'
                  : 'text-red-700'
              }`}>
                {selectedAnswer === question.correctAnswer
                  ? '¡Correcto!'
                  : `Incorrecto. La respuesta correcta es la ${question.correctAnswer}`}
              </p>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                {question.explanation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

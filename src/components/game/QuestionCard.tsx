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

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  selectedAnswer,
  showResult,
  disabled,
}: QuestionCardProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Question image */}
      <div className="mb-6 flex justify-center">
        <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl shadow-lg flex items-center justify-center overflow-hidden">
          {question.image ? (
            <img
              src={question.image}
              alt="Question illustration"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className="text-6xl md:text-8xl text-purple-400">
            🧬
          </div>
        </div>
      </div>
      
      {/* Category badge */}
      <div className="text-center mb-4">
        <span className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
          {question.category}
        </span>
      </div>
      
      {/* Question text */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
        <div className="flex items-start gap-4">
          <span className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-xl flex items-center justify-center font-bold text-lg md:text-xl shadow-md">
            {questionNumber}
          </span>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed">
            {question.text}
          </h2>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Pregunta {questionNumber} de {totalQuestions}</span>
          <span>{Math.round((questionNumber / totalQuestions) * 100)}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-purple-700 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>
      
      {/* Answer options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div className={`mt-6 p-4 rounded-xl ${
          selectedAnswer === question.correctAnswer
            ? 'bg-green-50 border-2 border-green-200'
            : 'bg-red-50 border-2 border-red-200'
        }`}>
          <div className="flex items-start gap-3">
            <span className="text-2xl">
              {selectedAnswer === question.correctAnswer ? '✅' : '❌'}
            </span>
            <div>
              <p className={`font-semibold mb-1 ${
                selectedAnswer === question.correctAnswer
                  ? 'text-green-700'
                  : 'text-red-700'
              }`}>
                {selectedAnswer === question.correctAnswer
                  ? '¡Correcto!'
                  : `Incorrecto. La respuesta correcta es: ${question.correctAnswer}`}
              </p>
              <p className="text-gray-600 text-sm">
                {question.explanation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

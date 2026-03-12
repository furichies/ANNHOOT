'use client';

import React, { useState } from 'react';
import { GameProvider, useGame } from '@/context/GameContext';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { QuizGame } from '@/components/game/QuizGame';
import { ScoreDisplay } from '@/components/game/ScoreDisplay';
import { Header } from '@/components/layout/Header';
import { Dashboard } from '@/components/layout/Dashboard';
import { LandingPage } from '@/components/layout/LandingPage';
import { Leaderboard } from '@/components/layout/Leaderboard';
import { Profile } from '@/components/layout/Profile';

function AppContent() {
  const { currentScreen, setCurrentScreen } = useGame();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Auth screen
  if (currentScreen === 'auth') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 flex items-center justify-center p-4">
        {authMode === 'login' ? (
          <LoginForm
            onBack={() => setCurrentScreen('landing')}
            onSwitchToRegister={() => setAuthMode('register')}
          />
        ) : (
          <RegisterForm
            onBack={() => setCurrentScreen('landing')}
            onSwitchToLogin={() => setAuthMode('login')}
          />
        )}
      </div>
    );
  }

  // Landing page
  if (currentScreen === 'landing') {
    return <LandingPage />;
  }

  // Game screens
  if (currentScreen === 'playing') {
    return <QuizGame />;
  }

  if (currentScreen === 'results') {
    return <ScoreDisplay />;
  }

  // Screens with header
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <Header />
      {currentScreen === 'dashboard' && <Dashboard />}
      {currentScreen === 'leaderboard' && <Leaderboard />}
      {currentScreen === 'profile' && <Profile />}
    </div>
  );
}

export default function Home() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

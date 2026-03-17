'use client';

import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { LogOut, User, Crown, Volume2, VolumeX, ShieldCheck } from 'lucide-react';
import { AdminPanel } from '@/components/admin/AdminPanel';

export function Header() {
  const { currentUser, logout, setCurrentScreen, soundEnabled, toggleSound, reloadQuestions } = useGame();
  const [adminOpen, setAdminOpen] = useState(false);

  if (!currentUser) return null;

  return (
    <>
      <header className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent hidden sm:block">
                AnaHoot
              </span>
            </button>

            {/* User info and actions */}
            <div className="flex items-center gap-2">
              {/* Sound toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSound}
                className="text-gray-500 hover:text-purple-600"
                title={soundEnabled ? 'Silenciar' : 'Activar sonido'}
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </Button>

              {/* Leaderboard button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentScreen('leaderboard')}
                className="text-gray-500 hover:text-purple-600"
                title="Clasificación"
              >
                <Crown className="w-5 h-5" />
              </Button>

              {/* Admin button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setAdminOpen(true)}
                className="text-gray-500 hover:text-purple-600 relative group"
                title="Panel de Administración"
              >
                <ShieldCheck className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full hidden group-hover:block" />
              </Button>

              {/* Profile button */}
              <button
                onClick={() => setCurrentScreen('profile')}
                className="flex items-center gap-2 px-3 py-2 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors"
              >
                <span className="text-2xl">{currentUser.avatar}</span>
                <span className="font-medium text-purple-700 hidden sm:block">
                  {currentUser.username}
                </span>
              </button>

              {/* Logout button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                className="text-gray-500 hover:text-red-600"
                title="Cerrar sesión"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Panel Modal */}
      <AdminPanel
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        onQuestionsReloaded={() => {
          reloadQuestions?.();
          setAdminOpen(false);
        }}
      />
    </>
  );
}

'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Medal, Trophy, ArrowLeft, Home } from 'lucide-react';

export function Leaderboard() {
  const { leaderboard, currentUser, setCurrentScreen } = useGame();
  
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-400">{rank}</span>;
    }
  };
  
  const getRankBgColor = (rank: number, isCurrentUser: boolean) => {
    if (isCurrentUser) return 'bg-purple-100 border-2 border-purple-400';
    if (rank === 1) return 'bg-gradient-to-r from-yellow-50 to-yellow-100';
    if (rank === 2) return 'bg-gradient-to-r from-gray-50 to-gray-100';
    if (rank === 3) return 'bg-gradient-to-r from-amber-50 to-amber-100';
    return 'bg-white';
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setCurrentScreen('dashboard')}
            className="text-white hover:bg-white/20 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver
          </Button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg">
              <Trophy className="w-8 h-8 text-purple-800" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Clasificación</h1>
              <p className="text-purple-200">Los mejores jugadores de AnaHoot</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Leaderboard content */}
      <div className="max-w-2xl mx-auto px-4 py-8 -mt-4">
        {/* Top 3 podium */}
        {leaderboard.length >= 3 && (
          <div className="flex justify-center items-end gap-2 mb-8">
            {/* 2nd place */}
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-2">{leaderboard[1]?.avatar || '🥈'}</div>
              <div className="w-20 h-20 bg-gradient-to-t from-gray-300 to-gray-200 rounded-t-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-700">2</span>
              </div>
              <p className="text-sm font-medium mt-2 text-center truncate w-20">
                {leaderboard[1]?.username}
              </p>
              <p className="text-xs text-gray-500">
                {leaderboard[1]?.bestScore.toLocaleString()} pts
              </p>
            </div>
            
            {/* 1st place */}
            <div className="flex flex-col items-center">
              <Crown className="w-8 h-8 text-yellow-500 mb-1" />
              <div className="text-5xl mb-2">{leaderboard[0]?.avatar || '🥇'}</div>
              <div className="w-24 h-28 bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-t-xl flex items-center justify-center">
                <span className="text-3xl font-bold text-yellow-800">1</span>
              </div>
              <p className="text-sm font-bold mt-2 text-center truncate w-24">
                {leaderboard[0]?.username}
              </p>
              <p className="text-xs text-yellow-600 font-semibold">
                {leaderboard[0]?.bestScore.toLocaleString()} pts
              </p>
            </div>
            
            {/* 3rd place */}
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-2">{leaderboard[2]?.avatar || '🥉'}</div>
              <div className="w-20 h-16 bg-gradient-to-t from-amber-600 to-amber-500 rounded-t-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-amber-100">3</span>
              </div>
              <p className="text-sm font-medium mt-2 text-center truncate w-20">
                {leaderboard[2]?.username}
              </p>
              <p className="text-xs text-gray-500">
                {leaderboard[2]?.bestScore.toLocaleString()} pts
              </p>
            </div>
          </div>
        )}
        
        {/* Full leaderboard list */}
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-t-lg">
            <CardTitle className="text-center">Ranking Completo</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              {leaderboard.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Trophy className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No hay jugadores todavía</p>
                  <p className="text-sm">¡Sé el primero en jugar!</p>
                </div>
              ) : (
                leaderboard.map((entry) => {
                  const isCurrentUser = entry.userId === currentUser?.id;
                  return (
                    <div
                      key={entry.userId}
                      className={`flex items-center gap-4 p-4 border-b last:border-b-0 transition-colors ${getRankBgColor(entry.rank, isCurrentUser)}`}
                    >
                      {/* Rank */}
                      <div className="w-10 h-10 flex items-center justify-center">
                        {getRankIcon(entry.rank)}
                      </div>
                      
                      {/* Avatar */}
                      <div className="text-3xl">{entry.avatar}</div>
                      
                      {/* User info */}
                      <div className="flex-1">
                        <p className={`font-semibold ${isCurrentUser ? 'text-purple-700' : 'text-gray-800'}`}>
                          {entry.username}
                          {isCurrentUser && (
                            <span className="ml-2 text-xs bg-purple-500 text-white px-2 py-0.5 rounded-full">
                              Tú
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-gray-500">
                          {entry.gamesPlayed} partida{entry.gamesPlayed !== 1 ? 's' : ''}
                        </p>
                      </div>
                      
                      {/* Score */}
                      <div className="text-right">
                        <p className="font-bold text-lg text-purple-600">
                          {entry.bestScore.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400">mejor pts</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Back to dashboard button */}
        <div className="mt-6 text-center">
          <Button
            onClick={() => setCurrentScreen('dashboard')}
            variant="outline"
            className="gap-2"
          >
            <Home className="w-5 h-5" />
            Volver al Inicio
          </Button>
        </div>
      </div>
    </div>
  );
}

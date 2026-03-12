'use client';

import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AVATARS } from '@/types';
import { updateUserProfile } from '@/lib/auth';
import { User, Save, ArrowLeft, Trophy, Target, Calendar } from 'lucide-react';

export function Profile() {
  const { currentUser, setCurrentScreen, login } = useGame();
  const [username, setUsername] = useState(currentUser?.username || '');
  const [selectedAvatar, setSelectedAvatar] = useState(currentUser?.avatar || AVATARS[0]);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const handleSave = async () => {
    if (!currentUser) return;
    
    setIsSaving(true);
    setMessage(null);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const result = updateUserProfile(currentUser.id, {
      username,
      avatar: selectedAvatar,
    });
    
    if (result.success && result.user) {
      login(result.user);
      setMessage({ type: 'success', text: '¡Perfil actualizado correctamente!' });
    } else {
      setMessage({ type: 'error', text: result.error || 'Error al actualizar' });
    }
    
    setIsSaving(false);
  };
  
  if (!currentUser) return null;
  
  const memberSince = new Date(currentUser.createdAt).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
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
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 text-purple-800" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Mi Perfil</h1>
              <p className="text-purple-200">Personaliza tu cuenta</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile content */}
      <div className="max-w-2xl mx-auto px-4 py-8 -mt-4">
        {/* Avatar and username card */}
        <Card className="shadow-xl border-0 mb-6">
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar selection */}
            <div className="space-y-2">
              <Label>Avatar</Label>
              <div className="grid grid-cols-8 gap-2 p-3 bg-gray-50 rounded-xl">
                {AVATARS.map((avatar) => (
                  <button
                    key={avatar}
                    type="button"
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`text-3xl p-2 rounded-xl transition-all duration-200 ${
                      selectedAvatar === avatar
                        ? 'bg-purple-200 scale-110 shadow-md'
                        : 'hover:bg-gray-200'
                    }`}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Nombre de Usuario</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 border-2 focus:border-purple-500"
              />
            </div>
            
            {/* Email (read only) */}
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                value={currentUser.email}
                disabled
                className="h-12 bg-gray-50 text-gray-500"
              />
              <p className="text-xs text-gray-400">El correo no puede ser modificado</p>
            </div>
            
            {/* Message */}
            {message && (
              <div className={`p-3 rounded-lg text-sm ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {message.text}
              </div>
            )}
            
            {/* Save button */}
            <Button
              onClick={handleSave}
              disabled={isSaving || username === currentUser.username && selectedAvatar === currentUser.avatar}
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
            >
              {isSaving ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Guardando...
                </div>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Guardar Cambios
                </>
              )}
            </Button>
          </CardContent>
        </Card>
        
        {/* Stats card */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle>Estadísticas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-xl">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mejor Puntuación</p>
                  <p className="text-xl font-bold text-yellow-600">
                    {currentUser.bestScore.toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Partidas Jugadas</p>
                  <p className="text-xl font-bold text-green-600">
                    {currentUser.gamesPlayed}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Miembro desde</p>
                  <p className="text-sm font-bold text-purple-600">
                    {memberSince}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

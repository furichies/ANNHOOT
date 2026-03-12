'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { loginUser } from '@/lib/auth';
import { useGame } from '@/context/GameContext';
import { LogIn, ArrowLeft } from 'lucide-react';

interface LoginFormProps {
  onBack: () => void;
  onSwitchToRegister: () => void;
}

export function LoginForm({ onBack, onSwitchToRegister }: LoginFormProps) {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useGame();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    const result = loginUser(usernameOrEmail, password);
    
    if (result.success && result.user) {
      login(result.user);
    } else {
      setError(result.error || 'Error al iniciar sesión');
    }
    
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm shadow-2xl border-0">
      <CardHeader className="text-center space-y-2 pb-4">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center mb-2">
          <LogIn className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
          Iniciar Sesión
        </CardTitle>
        <CardDescription>
          Ingresa tus credenciales para continuar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Usuario o Correo</Label>
            <Input
              id="username"
              type="text"
              placeholder="Tu usuario o correo electrónico"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              required
              className="h-12 border-2 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 border-2 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
              {error}
            </div>
          )}
          
          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold text-lg shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Ingresando...
              </div>
            ) : (
              'Ingresar'
            )}
          </Button>
        </form>
        
        <div className="mt-6 pt-4 border-t">
          <p className="text-center text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-purple-600 hover:text-purple-800 font-semibold transition-colors"
            >
              Regístrate aquí
            </button>
          </p>
        </div>
        
        <button
          onClick={onBack}
          className="w-full mt-4 flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </button>
      </CardContent>
    </Card>
  );
}

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Upload,
  FileJson,
  X,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ChevronRight,
  Loader2,
} from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onQuestionsReloaded?: () => void;
}

type Status = 'idle' | 'uploading' | 'reloading' | 'success' | 'error';

export function AdminPanel({ isOpen, onClose, onQuestionsReloaded }: AdminPanelProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [questionCount, setQuestionCount] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch current question count on open
  useEffect(() => {
    if (isOpen) {
      fetch('/api/questions')
        .then(r => r.json())
        .then(data => {
          if (Array.isArray(data)) setQuestionCount(data.length);
        })
        .catch(() => {});
    }
  }, [isOpen]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      setStatus('error');
      setMessage('Por favor selecciona un archivo JSON válido (.json)');
      return;
    }

    setStatus('uploading');
    setMessage('Subiendo y procesando preguntas...');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/questions/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(`¡Éxito! Se han cargado ${data.count} preguntas correctamente.`);
        setQuestionCount(data.count);
        onQuestionsReloaded?.();
      } else {
        setStatus('error');
        setMessage(`Error: ${data.error || 'Formato de archivo incorrecto'}`);
      }
    } catch {
      setStatus('error');
      setMessage('Error de conexión al subir el archivo. Inténtalo de nuevo.');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleReload = async () => {
    setStatus('reloading');
    setMessage('Recargando preguntas desde la base de datos...');
    try {
      const response = await fetch('/api/questions');
      if (response.ok) {
        const data = await response.json();
        setQuestionCount(data.length);
        setStatus('success');
        setMessage(`Preguntas recargadas: ${data.length} disponibles.`);
        onQuestionsReloaded?.();
      } else {
        setStatus('error');
        setMessage('No se pudieron recargar las preguntas.');
      }
    } catch {
      setStatus('error');
      setMessage('Error de conexión al recargar las preguntas.');
    }
  };

  const resetStatus = () => {
    setStatus('idle');
    setMessage('');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <div className="relative w-full max-w-md bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 rounded-3xl shadow-2xl border border-purple-500/30 overflow-hidden">
        
        {/* Header glow line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">Panel de Administración</h2>
              <p className="text-purple-300 text-xs">Gestión de preguntas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-5">

          {/* Question count badge */}
          {questionCount !== null && (
            <div className="flex items-center justify-between bg-white/5 rounded-2xl px-4 py-3 border border-white/10">
              <span className="text-white/70 text-sm">Preguntas en base de datos</span>
              <span className="text-2xl font-bold text-purple-300">{questionCount}</span>
            </div>
          )}

          {/* Status message */}
          {status !== 'idle' && (
            <div
              className={`flex items-start gap-3 rounded-2xl p-4 border text-sm transition-all ${
                status === 'success'
                  ? 'bg-green-500/10 border-green-500/30 text-green-300'
                  : status === 'error'
                  ? 'bg-red-500/10 border-red-500/30 text-red-300'
                  : 'bg-purple-500/10 border-purple-500/30 text-purple-300'
              }`}
            >
              {status === 'success' && <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />}
              {status === 'error' && <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />}
              {(status === 'uploading' || status === 'reloading') && (
                <Loader2 className="w-5 h-5 flex-shrink-0 mt-0.5 animate-spin" />
              )}
              <span className="flex-1">{message}</span>
              {(status === 'success' || status === 'error') && (
                <button onClick={resetStatus} className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Upload section */}
          <div
            className="group relative border-2 border-dashed border-purple-500/30 hover:border-purple-400/60 rounded-2xl p-6 bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer flex flex-col items-center text-center"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
              <FileJson className="w-7 h-7 text-white" />
            </div>
            <p className="text-white font-semibold mb-1">Subir archivo JSON</p>
            <p className="text-white/50 text-xs mb-4 max-w-xs leading-relaxed">
              Arrastra o haz clic para seleccionar. Reemplazará todas las preguntas actuales.
            </p>
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-xl text-white text-sm font-medium transition-colors">
              <Upload className="w-4 h-4" />
              {status === 'uploading' ? 'Subiendo...' : 'Seleccionar archivo'}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json,application/json"
              className="hidden"
              disabled={status === 'uploading' || status === 'reloading'}
            />
          </div>

          {/* Reload button */}
          <button
            onClick={handleReload}
            disabled={status === 'uploading' || status === 'reloading'}
            className="w-full flex items-center justify-between px-5 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/40 rounded-2xl text-white transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                <RefreshCw className={`w-5 h-5 text-white ${status === 'reloading' ? 'animate-spin' : ''}`} />
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm">Recargar preguntas</p>
                <p className="text-white/50 text-xs">Actualiza la app con las preguntas actuales de la BD</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white/70 transition-colors" />
          </button>

          {/* Format hint */}
          <details className="group">
            <summary className="cursor-pointer text-purple-400/70 hover:text-purple-300 text-xs flex items-center gap-2 select-none transition-colors">
              <FileJson className="w-4 h-4" />
              Ver formato JSON esperado
            </summary>
            <pre className="mt-3 text-xs bg-black/40 rounded-xl p-4 text-green-300 overflow-x-auto border border-white/10 leading-relaxed">
{`[
  {
    "text": "Enunciado de la pregunta",
    "options": {
      "A": "Opción A",
      "B": "Opción B",
      "C": "Opción C",
      "D": "Opción D"
    },
    "correctAnswer": "A",
    "explanation": "Explicación...",
    "category": "Cardiovascular"
  }
]`}
            </pre>
          </details>
        </div>
      </div>
    </div>
  );
}

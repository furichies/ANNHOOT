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
  Users,
  GlobeLock,
  Database,
  Trash2,
  Plus
} from 'lucide-react';
import { User, MAX_SCORE } from '@/types';
import { getAllowedDomains } from '@/lib/auth';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onQuestionsReloaded?: () => void;
}

type Status = 'idle' | 'uploading' | 'reloading' | 'success' | 'error';
type Tab = 'questions' | 'students' | 'domains';

export function AdminPanel({ isOpen, onClose, onQuestionsReloaded }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('questions');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  
  // Tab: Questions
  const [questionCount, setQuestionCount] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Tab: Students
  const [students, setStudents] = useState<User[]>([]);
  
  // Tab: Domains
  const [allowedDomains, setAllowedDomains] = useState<string[]>([]);
  const [newDomain, setNewDomain] = useState('');

  // Fetch initial data
  useEffect(() => {
    if (isOpen) {
      // Fetch questions count
      fetch('/api/questions')
        .then(r => r.json())
        .then(data => {
          if (Array.isArray(data)) setQuestionCount(data.length);
        })
        .catch(() => {});
        
      // Fetch users
      try {
        const storedUsers = localStorage.getItem('annahoot_users');
        if (storedUsers) {
          setStudents(JSON.parse(storedUsers));
        }
      } catch (e) {}

      // Fetch domains
      setAllowedDomains(getAllowedDomains());
    }
  }, [isOpen]);

  // Questions actions
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

  // Domain actions
  const handleAddDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomain) return;
    
    let domainToAdd = newDomain.trim().toLowerCase();
    if (!domainToAdd.startsWith('@')) {
      domainToAdd = '@' + domainToAdd;
    }
    
    if (!allowedDomains.includes(domainToAdd)) {
      const updatedDomains = [...allowedDomains, domainToAdd];
      setAllowedDomains(updatedDomains);
      localStorage.setItem('annahoot_allowed_domains', JSON.stringify(updatedDomains));
      setStatus('success');
      setMessage(`Dominio ${domainToAdd} añadido.`);
    }
    setNewDomain('');
  };

  const handleRemoveDomain = (domainToRemove: string) => {
    const updatedDomains = allowedDomains.filter(d => d !== domainToRemove);
    setAllowedDomains(updatedDomains);
    localStorage.setItem('annahoot_allowed_domains', JSON.stringify(updatedDomains));
    setStatus('success');
    setMessage(`Dominio ${domainToRemove} eliminado.`);
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
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 rounded-3xl shadow-2xl border border-purple-500/30 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header glow line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">Panel de Administración</h2>
              <p className="text-purple-300 text-xs">Gestión y control</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex px-6 pt-4 border-b border-white/10 shrink-0 gap-4">
          <button
            onClick={() => { setActiveTab('questions'); resetStatus(); }}
            className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'questions' ? 'border-purple-400 text-purple-300' : 'border-transparent text-white/50 hover:text-white/80'
            }`}
          >
            <Database className="w-4 h-4" />
            Preguntas
          </button>
          <button
            onClick={() => { setActiveTab('students'); resetStatus(); }}
            className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'students' ? 'border-purple-400 text-purple-300' : 'border-transparent text-white/50 hover:text-white/80'
            }`}
          >
            <Users className="w-4 h-4" />
            Alumnos y Notas
          </button>
          <button
            onClick={() => { setActiveTab('domains'); resetStatus(); }}
            className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'domains' ? 'border-purple-400 text-purple-300' : 'border-transparent text-white/50 hover:text-white/80'
            }`}
          >
            <GlobeLock className="w-4 h-4" />
            Dominios Acceso
          </button>
        </div>

        {/* Status message (Global) */}
        {status !== 'idle' && (
          <div className="px-6 pt-4 shrink-0">
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
          </div>
        )}

        {/* Body content scrollable */}
        <div className="px-6 py-6 overflow-y-auto">
          
          {/* TAB: QUESTIONS */}
          {activeTab === 'questions' && (
            <div className="space-y-5">
              {/* Question count badge */}
              {questionCount !== null && (
                <div className="flex items-center justify-between bg-white/5 rounded-2xl px-4 py-3 border border-white/10">
                  <span className="text-white/70 text-sm">Preguntas en base de datos</span>
                  <span className="text-2xl font-bold text-purple-300">{questionCount}</span>
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
          )}

          {/* TAB: STUDENTS */}
          {activeTab === 'students' && (
            <div className="space-y-4">
              <p className="text-white/70 text-sm mb-4">Notas de los alumnos (escala sobre 10)</p>
              
              {students.length === 0 ? (
                <div className="text-center py-8 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-white/50 text-sm">Aún no hay alumnos registrados.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-white/50 text-xs uppercase tracking-wider">
                        <th className="pb-3 px-2 font-medium">Alumno</th>
                        <th className="pb-3 px-2 font-medium">Email</th>
                        <th className="pb-3 px-2 font-medium text-center">Partidas</th>
                        <th className="pb-3 px-2 font-medium text-right">Nota /10</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {students.map((student) => {
                        const grade = (student.bestScore / MAX_SCORE) * 10;
                        const gradeColor = 
                          grade >= 7 ? 'text-green-400' : 
                          grade >= 5 ? 'text-yellow-400' : 'text-red-400';
                          
                        return (
                          <tr key={student.id} className="hover:bg-white/5 transition-colors">
                            <td className="py-3 px-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xl">{student.avatar}</span>
                                <span className="text-white font-medium">{student.username}</span>
                              </div>
                            </td>
                            <td className="py-3 px-2 text-white/60 text-sm">{student.email}</td>
                            <td className="py-3 px-2 text-white/80 text-center">{student.gamesPlayed}</td>
                            <td className={`py-3 px-2 text-right font-bold ${gradeColor}`}>
                              {grade.toFixed(2)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB: DOMAINS */}
          {activeTab === 'domains' && (
            <div className="space-y-5">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 text-sm text-blue-200">
                <p className="font-semibold mb-1">Restricción de registro</p>
                <p className="text-blue-200/80 leading-relaxed">
                  Si la lista está vacía, cualquiera puede registrarse. Si añades dominios (ej: <code>@nebrija.es</code>), solo los correos que terminen en esos dominios podrán acceder.
                </p>
              </div>

              <form onSubmit={handleAddDomain} className="flex gap-2">
                <input
                  type="text"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  placeholder="Ej: @nebrija.es"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition-colors"
                />
                <Button 
                  type="submit" 
                  disabled={!newDomain}
                  className="bg-purple-600 hover:bg-purple-500 text-white rounded-xl px-4"
                >
                  <Plus className="w-5 h-5 mr-1" />
                  Añadir
                </Button>
              </form>

              <div className="space-y-2">
                <h3 className="text-white/70 text-sm font-medium mb-3">Dominios permitidos:</h3>
                
                {allowedDomains.length === 0 ? (
                  <div className="text-center py-6 bg-white/5 rounded-2xl border border-white/10 border-dashed">
                    <p className="text-white/40 text-sm">Sin restricciones (acceso público)</p>
                  </div>
                ) : (
                  <div className="grid gap-2">
                    {allowedDomains.map((domain) => (
                      <div key={domain} className="flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 group hover:border-purple-500/30 transition-colors">
                        <span className="text-white font-medium">{domain}</span>
                        <button
                          onClick={() => handleRemoveDomain(domain)}
                          className="opacity-50 hover:opacity-100 hover:text-red-400 transition-all p-1"
                          title="Eliminar dominio"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}


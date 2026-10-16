import React, { useEffect, useState, useMemo } from 'react';
import {
  Compass,
  Layers,
  Zap,
  Activity,
  FolderTree,
  RotateCw,
  X,
  ChevronRight,
  ChevronLeft,
  Check,
  Sparkles,
} from 'lucide-react';
import { sound } from '../utils/audio';

export interface TourStep {
  id: string;
  targetId?: string; // HTML element ID for spotlight positioning
  title: string;
  icon: React.ReactNode;
  instruction: string;
  techTip: string;
  highlightPosition?: 'bottom-left' | 'bottom-center' | 'bottom-right' | 'center';
}

interface OnboardingTourHUDProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const OnboardingTourHUD: React.FC<OnboardingTourHUDProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const steps: TourStep[] = useMemo(
    () => [
      {
        id: 'viewport',
        targetId: 'cad-viewport-container',
        title: 'VISOR 3D & NAVEGACIÓN HOLOGRÁFICA',
        icon: <Compass className="w-5 h-5 text-cyan-400 animate-pulse" />,
        instruction:
          'Gira el ensamble 3D arrastrando con un dedo o ratón. Usa la rueda o pellizca con dos dedos para Zoom, y clic derecho para Desplazar (Pan).',
        techTip:
          'Puedes presionar [🎯 Reset Vista] en la barra inferior en cualquier instante para reorientar la cámara isométrica ideal.',
        highlightPosition: 'center',
      },
      {
        id: 'tree',
        targetId: 'btn-open-tree',
        title: 'ÁRBOL DE COMPONENTES (📁 ÁRBOL)',
        icon: <FolderTree className="w-5 h-5 text-cyan-400" />,
        instruction:
          'El botón "📁 Árbol" en la esquina inferior izquierda abre el inventario técnico de piezas, mostrando su estado de acople magnético y selección rápida.',
        techTip:
          'Toca fuera del panel o la "✕" para cerrarlo. En móviles ocupa solo 65vw para que el modelo nunca quede cubierto.',
        highlightPosition: 'bottom-left',
      },
      {
        id: 'explosion',
        targetId: 'slider-explosion',
        title: 'DESPIECE POR EXPLOSIÓN CONTINUA',
        icon: <Layers className="w-5 h-5 text-cyan-400" />,
        instruction:
          'Desliza el dial "💥 EXPLOSIÓN" de 0% a 100% para separar o contraer fluidamente todas las piezas mecánicas en sus vectores reales de montaje.',
        techTip:
          'La interpolación vectorial matemática calcula las coordenadas tridimensionales en tiempo real sin perder alineación.',
        highlightPosition: 'bottom-center',
      },
      {
        id: 'snap',
        targetId: 'btn-snap-all',
        title: 'ACOPLE MAGNÉTICO & [⚡ ACOPLAR TODO]',
        icon: <Zap className="w-5 h-5 text-amber-400" />,
        instruction:
          'Arrastra piezas libres hacia su objetivo para que encajen magnéticamente con retroalimentación háptica. Presiona [⚡ Acoplar Todo] para sincronizar el modelo completo en 500ms.',
        techTip:
          'Cada acople exitoso reproduce un chasquido metálico y actualiza la tasa global de ensamblado.',
        highlightPosition: 'bottom-center',
      },
      {
        id: 'touch',
        targetId: 'btn-touch-mode',
        title: 'CONTROL DUAL TÁCTIL & CINEMÁTICA',
        icon: <RotateCw className="w-5 h-5 text-cyan-400" />,
        instruction:
          'En pantallas móviles, el botón "🖐️ Mover / 🔄 Rotar" evita conflictos al manipular piezas versus rotar cámara. Pulsa "⚙️ Cinemática" para ver el mecanismo en marcha real.',
        techTip:
          'Cuando la cinemática está activa, los engranes, pistones o discos giran en armonía física continua.',
        highlightPosition: 'bottom-center',
      },
      {
        id: 'telemetry',
        targetId: 'btn-open-telemetry',
        title: 'PANEL DE TELEMETRÍA (📊 TELEMETRÍA)',
        icon: <Activity className="w-5 h-5 text-cyan-400" />,
        instruction:
          'El botón "📊 Telemetría" en la esquina inferior derecha despliega tolerancias micrométricas, masa, materiales PBR y radio de holgura de la pieza seleccionada.',
        techTip:
          '¡Sistema calibrado y listo! Puedes reiniciar este tutorial cuando lo desees desde el botón "? Guía" en la barra superior.',
        highlightPosition: 'bottom-right',
      },
    ],
    []
  );

  const step = steps[currentStepIndex];

  // Measure target element position
  useEffect(() => {
    if (!isOpen || !step.targetId) {
      setTargetRect(null);
      return;
    }

    const updateRect = () => {
      const el = document.getElementById(step.targetId!);
      if (el) {
        setTargetRect(el.getBoundingClientRect());
      } else {
        setTargetRect(null);
      }
    };

    updateRect();
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect);
    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };
  }, [isOpen, step.targetId]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      sound.playTourStepChime(currentStepIndex + 1);
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      sound.playAssemblyComplete();
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      sound.playTourStepChime(currentStepIndex - 1);
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    sound.playClick(600);
    onClose();
  };

  const progressPercent = Math.round(((currentStepIndex + 1) / steps.length) * 100);

  return (
    <div className="fixed inset-0 z-[100] pointer-events-auto select-none flex flex-col items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs transition-opacity duration-300">
      {/* 1. Holographic Beacon Spotlight on targeted UI button/element */}
      {targetRect && (
        <div
          className="fixed pointer-events-none z-[101] transition-all duration-300"
          style={{
            top: targetRect.top - 8,
            left: targetRect.left - 8,
            width: targetRect.width + 16,
            height: targetRect.height + 16,
          }}
        >
          {/* Pulsing neon frame */}
          <div className="w-full h-full border-2 border-cyan-400 rounded-sm shadow-[0_0_20px_#00e5ff] animate-pulse" />
          {/* Corner HUD reticles */}
          <span className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-amber-400" />
          <span className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-amber-400" />
          <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-amber-400" />
          <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-amber-400" />
        </div>
      )}

      {/* 2. Main Stark Industries HUD Tour Card */}
      <div
        className="relative z-[102] w-full max-w-lg bg-[#070b13]/95 border-2 border-cyan-400/80 rounded-sm p-4 sm:p-5 text-slate-100 shadow-[0_0_35px_rgba(0,229,255,0.4)] backdrop-blur-xl animate-fadeIn"
        style={{
          boxShadow: '0 0 35px rgba(0, 229, 255, 0.35), inset 0 0 15px rgba(0, 229, 255, 0.1)',
        }}
      >
        {/* Technical Corner Brackets */}
        <span className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-cyan-300 pointer-events-none" />
        <span className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-cyan-300 pointer-events-none" />
        <span className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-cyan-300 pointer-events-none" />
        <span className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-cyan-300 pointer-events-none" />

        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-tech text-xs tracking-widest text-cyan-300 font-bold uppercase">
              JARVIS HUD // GUÍA DE OPERACIÓN
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-amber-400">
              PASO {currentStepIndex + 1} DE {steps.length}
            </span>
            <button
              onClick={handleSkip}
              className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition cursor-pointer"
              title="Cerrar Guía"
              aria-label="Cerrar Guía"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step Content */}
        <div className="space-y-3 mb-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-sm bg-cyan-950/80 border border-cyan-400/50 shrink-0 shadow-[0_0_10px_rgba(0,229,255,0.25)]">
              {step.icon}
            </div>
            <div>
              <h2 className="font-orbitron font-bold text-sm sm:text-base text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-300 leading-snug">
                {step.title}
              </h2>
              <p className="font-mono text-xs text-slate-300 mt-1.5 leading-relaxed">
                {step.instruction}
              </p>
            </div>
          </div>

          {/* Technical Engineering Tip */}
          <div className="p-2.5 rounded-sm bg-cyan-950/40 border border-cyan-500/30 font-mono text-[11px] text-cyan-200 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-cyan-300">PROTOCOLO:</strong> {step.techTip}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 mb-4">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-amber-400 transition-all duration-300 shadow-[0_0_10px_rgba(0,229,255,0.8)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Navigation & Action Buttons */}
        <div className="flex items-center justify-between gap-2 text-xs font-mono">
          <button
            onClick={handleSkip}
            className="px-2.5 py-1.5 text-slate-400 hover:text-white transition font-medium cursor-pointer"
          >
            Saltar Guía
          </button>

          <div className="flex items-center gap-2">
            {currentStepIndex > 0 && (
              <button
                onClick={handlePrev}
                className="px-3 py-1.5 rounded-xs bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 transition flex items-center gap-1 cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Anterior</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-4 py-1.5 rounded-xs bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 border border-cyan-300 font-bold text-slate-950 shadow-[0_0_15px_rgba(0,229,255,0.4)] transition flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>{currentStepIndex === steps.length - 1 ? '¡Comenzar!' : 'Siguiente'}</span>
              {currentStepIndex === steps.length - 1 ? (
                <Check className="w-3.5 h-3.5 font-bold" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

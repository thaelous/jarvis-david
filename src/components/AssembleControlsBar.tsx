import React from 'react';
import {
  Compass,
  Zap,
  Move,
  RotateCw,
  Crosshair,
} from 'lucide-react';
import { TransformToolMode, ThemeMode } from '../types/cad';
import { sound } from '../utils/audio';

interface AssembleControlsBarProps {
  explodeProgress: number;
  onExplodeChange: (progress: number) => void;
  onResetView: () => void;
  toolMode: TransformToolMode;
  onSetToolMode: (mode: TransformToolMode) => void;
  showGizmo: boolean;
  onToggleGizmo: () => void;
  isSimulating: boolean;
  onToggleSimulating: () => void;
  onSnapAll: () => void;
  themeMode?: ThemeMode;
}

export const AssembleControlsBar: React.FC<AssembleControlsBarProps> = ({
  explodeProgress,
  onExplodeChange,
  onResetView,
  toolMode,
  onSetToolMode,
  showGizmo,
  onToggleGizmo,
  isSimulating,
  onToggleSimulating,
  onSnapAll,
  themeMode = 'light',
}) => {
  const isLight = themeMode === 'light';

  return (
    <nav
      aria-label="Controles táctiles de ensamblado e interacción 3D"
      className={`fixed bottom-2.5 left-1/2 -translate-x-1/2 z-20 w-[96%] max-w-5xl backdrop-blur-xl border rounded-sm shadow-2xl select-none transition-colors duration-200 pointer-events-auto ${
        isLight
          ? 'bg-slate-100/95 border-slate-300 text-slate-800 shadow-lg'
          : 'bg-slate-950/92 border-cyan-500/40 text-slate-100 shadow-[0_0_24px_rgba(6,182,212,0.25)]'
      }`}
      style={{
        paddingLeft: '0.4rem',
        paddingRight: '0.4rem',
        paddingTop: '0.4rem',
        paddingBottom: 'max(0.4rem, env(safe-area-inset-bottom, 12px))',
        fontSize: 'clamp(0.68rem, 2.3vw, 0.85rem)',
      }}
    >
      <div className="flex items-center justify-between gap-1 xs:gap-1.5 sm:gap-2 w-full overflow-x-auto no-scrollbar">
        {/* Desktop Optional Tool Mode Gizmo (Hidden on mobile) */}
        <div
          className={`hidden xl:flex items-center gap-0.5 border p-0.5 rounded-sm shrink-0 ${
            isLight ? 'bg-white border-slate-300' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <button
            onClick={() => {
              sound.playClick(750);
              onSetToolMode('translate');
            }}
            className={`px-2 py-0.5 text-[11px] font-mono rounded-xs transition flex items-center gap-1 ${
              toolMode === 'translate'
                ? isLight
                  ? 'bg-cyan-100 border border-cyan-500 text-cyan-800 font-semibold'
                  : 'bg-cyan-950 border border-cyan-400 text-cyan-200 shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                : 'text-slate-400 hover:text-slate-600'
            }`}
            title="Modo Mover: Desplazar piezas en los ejes X, Y, Z"
          >
            <Move className="w-3 h-3 text-cyan-500" />
            <span>Mover</span>
          </button>

          <button
            onClick={() => {
              sound.playClick(850);
              onSetToolMode('rotate');
            }}
            className={`px-2 py-0.5 text-[11px] font-mono rounded-xs transition flex items-center gap-1 ${
              toolMode === 'rotate'
                ? isLight
                  ? 'bg-cyan-100 border border-cyan-500 text-cyan-800 font-semibold'
                  : 'bg-cyan-950 border border-cyan-400 text-cyan-200 shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                : 'text-slate-400 hover:text-slate-600'
            }`}
            title="Modo Rotar: Girar componentes en los ejes X, Y, Z"
          >
            <RotateCw className="w-3 h-3 text-cyan-500" />
            <span>Rotar</span>
          </button>

          <button
            onClick={() => {
              sound.playClick(600);
              onToggleGizmo();
            }}
            className={`p-0.5 px-1 rounded-xs transition border ml-0.5 ${
              showGizmo
                ? 'bg-cyan-950 border-cyan-500/60 text-cyan-300'
                : 'bg-transparent border-slate-700 text-slate-400'
            }`}
            title={showGizmo ? 'Ocultar Ejes Gizmo 3D' : 'Mostrar Ejes Gizmo 3D'}
          >
            <Crosshair className="w-3 h-3" />
          </button>
        </div>

        {/* 1. SLIDER DE EXPLOSIÓN REDUCIDO Y RESPONSIVO (Continuous 0% to 100%) */}
        <div className="flex items-center gap-1 sm:gap-1.5 min-w-0 flex-1 sm:flex-initial">
          <span className="text-cyan-500 font-bold whitespace-nowrap text-[11px] sm:text-xs font-mono shrink-0">
            💥<span className="hidden md:inline ml-0.5 font-tech">EXPLOSIÓN:</span>
          </span>
          <input
            type="range"
            id="slider-explosion"
            min="0"
            max="100"
            value={Math.round(explodeProgress * 100)}
            className="w-14 xs:w-18 sm:w-24 md:w-32 h-2 bg-slate-300 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer shrink"
            style={{
              accentColor: isLight ? '#0284c7' : '#00e5ff',
            }}
            onInput={(e) => {
              const val = parseFloat((e.target as HTMLInputElement).value) / 100;
              onExplodeChange(val);
              const label = document.getElementById('label-explosion');
              if (label) label.textContent = Math.round(val * 100) + '%';
            }}
            onChange={(e) => {
              const val = parseFloat(e.target.value) / 100;
              onExplodeChange(val);
              const label = document.getElementById('label-explosion');
              if (label) label.textContent = Math.round(val * 100) + '%';
            }}
          />
          <span
            id="label-explosion"
            className="font-bold font-mono w-6 xs:w-7 sm:w-8 text-right text-cyan-500 text-[10px] sm:text-xs shrink-0"
          >
            {Math.round(explodeProgress * 100)}%
          </span>
        </div>

        {/* BOTÓN DUAL DE INTERACCIÓN: MOVER Y ROTAR PIEZAS (#btn-mode) */}
        <button
          id="btn-mode"
          data-testid="btn-mode"
          onClick={() => {
            sound.playClick(850);
            onSetToolMode(toolMode === 'translate' ? 'rotate' : 'translate');
          }}
          className={`px-1.5 py-1 xs:px-2 sm:px-2.5 sm:py-1.5 border rounded-xs font-mono flex items-center gap-1 transition font-semibold cursor-pointer shrink-0 active:scale-95 ${
            toolMode === 'translate'
              ? isLight
                ? 'bg-cyan-100 hover:bg-cyan-200 border-cyan-500 text-cyan-900 shadow-sm'
                : 'bg-cyan-950 hover:bg-cyan-900 border-cyan-400 text-cyan-200 shadow-[0_0_10px_rgba(6,182,212,0.35)]'
              : isLight
              ? 'bg-indigo-100 hover:bg-indigo-200 border-indigo-500 text-indigo-900 shadow-sm'
              : 'bg-indigo-950 hover:bg-indigo-900 border-indigo-400 text-indigo-200 shadow-[0_0_10px_rgba(99,102,241,0.35)]'
          }`}
          title={
            toolMode === 'translate'
              ? 'Modo 🖐️ Mover activo. Toca para alternar a 🔄 Rotar pieza.'
              : 'Modo 🔄 Rotar activo. Toca para alternar a 🖐️ Mover pieza.'
          }
        >
          <span className="shrink-0 text-xs">
            {toolMode === 'translate' ? '🖐️' : '🔄'}
          </span>
          <span className="whitespace-nowrap font-tech font-bold text-[11px] sm:text-xs">
            {toolMode === 'translate' ? 'Mover' : 'Rotar'}
          </span>
          <span
            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
              toolMode === 'translate' ? 'bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]' : 'bg-indigo-400 shadow-[0_0_6px_rgba(99,102,241,0.8)]'
            }`}
          />
        </button>

        {/* 2. BOTÓN [⚡ Acoplar Todo] */}
        <button
          id="btn-snap-all"
          onClick={() => {
            sound.playClick(800);
            onSnapAll();
          }}
          className={`px-1.5 py-1 xs:px-2 sm:px-2.5 sm:py-1.5 border rounded-xs font-mono flex items-center gap-1 transition font-semibold cursor-pointer shrink-0 active:scale-95 ${
            isLight
              ? 'bg-amber-100 hover:bg-amber-200 border-amber-400 text-amber-950 shadow-sm'
              : 'bg-amber-950/85 hover:bg-amber-900 border-amber-400/80 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.35)]'
          }`}
          title="⚡ Acoplar Todo: Animar y acoplar magnéticamente todas las piezas en 500 ms"
        >
          <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 fill-amber-500 animate-pulse shrink-0" />
          <span className="whitespace-nowrap">
            <span className="hidden sm:inline">⚡ Acoplar Todo</span>
            <span className="sm:hidden">Acoplar</span>
          </span>
        </button>

        {/* 3. BOTÓN [⚙️ Cinemática] (Compacto en móvil: "⚙️" o "⚙️ Cine") */}
        <button
          id="btn-simulation"
          onClick={onToggleSimulating}
          className={`px-1.5 py-1 xs:px-2 sm:px-2.5 sm:py-1.5 border rounded-xs font-mono flex items-center gap-1 transition font-semibold cursor-pointer shrink-0 active:scale-95 ${
            isSimulating ? 'active' : ''
          } ${
            isSimulating
              ? isLight
                ? 'bg-emerald-100 border-emerald-500 text-emerald-800 shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                : 'bg-emerald-950/90 border-emerald-400 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
              : isLight
              ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700'
              : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300 hover:border-emerald-400'
          }`}
          title="Activar / desactivar movimiento mecánico continuo en tiempo real (marcha real cuando las piezas están acopladas)"
        >
          <Zap className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ${isSimulating ? 'text-emerald-400 fill-emerald-400 animate-pulse' : 'text-slate-400'}`} />
          <span className="whitespace-nowrap">
            <span className="hidden md:inline">⚙️ Cinemática</span>
            <span className="hidden xs:inline md:hidden">⚙️ Cine</span>
            <span className="xs:hidden">⚙️</span>
          </span>
          <span
            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
              isSimulating ? 'bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]' : 'bg-slate-500'
            }`}
          />
        </button>

        {/* 4. BOTÓN [🎯 Reset Vista] */}
        <button
          onClick={onResetView}
          className={`px-1.5 py-1 xs:px-2 sm:px-2.5 sm:py-1.5 border rounded-xs font-mono flex items-center gap-1 transition font-medium shrink-0 cursor-pointer active:scale-95 ${
            isLight
              ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800'
              : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-cyan-400'
          }`}
          title="🎯 Reset Vista: Restablecer suavemente la cámara al ángulo isométrico por defecto"
        >
          <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400 shrink-0" />
          <span className="whitespace-nowrap">
            <span className="hidden sm:inline">🎯 Reset Vista</span>
            <span className="sm:hidden">Reset</span>
          </span>
        </button>
      </div>
    </nav>
  );
};

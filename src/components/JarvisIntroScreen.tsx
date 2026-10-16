import React, { useState, useEffect, useRef, useCallback } from 'react';
import { sound } from '../utils/audio';
import { LaserCreditEngraver } from './LaserCreditEngraver';
import { Lock, ShieldCheck, ChevronUp, ChevronDown, KeyRound, AlertTriangle } from 'lucide-react';

interface JarvisIntroScreenProps {
  onEnter: () => void;
}

export const JarvisIntroScreen: React.FC<JarvisIntroScreenProps> = ({ onEnter }) => {
  // Step 0: Splash Logo Screen (david.jpeg) - 2.5s duration with fade-in/fade-out
  const [showSplashLogo, setShowSplashLogo] = useState<boolean>(true);
  const [splashFadeOut, setSplashFadeOut] = useState<boolean>(false);

  useEffect(() => {
    // Exactly 3.0s total: 2.5s display + 0.5s fade-out, giving way to PIN code 171080
    const timerFade = setTimeout(() => {
      setSplashFadeOut(true);
    }, 2500);

    const timerEnd = setTimeout(() => {
      setShowSplashLogo(false);
    }, 3000);

    return () => {
      clearTimeout(timerFade);
      clearTimeout(timerEnd);
    };
  }, []);

  // Step 1: Security Passcode (6 digits, default '171080')
  // We start with digits ['1', '7', '1', '0', '8', '0'] or ['0', '0', '0', '0', '0', '0']
  const [digits, setDigits] = useState<string[]>(['0', '0', '0', '0', '0', '0']);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [errorShake, setErrorShake] = useState<boolean>(false);
  const [errorFlash, setErrorFlash] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isEntering, setIsEntering] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [hudShake, setHudShake] = useState(false);

  const handlePlaqueImpact = useCallback(() => {
    setHudShake(true);
    setTimeout(() => {
      setHudShake(false);
    }, 120);
  }, []);

  // Parallax pointer target
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Animation state refs
  const animFrameId = useRef<number | null>(null);
  const reactorSpeedRef = useRef(1.0);
  const reactorScaleRef = useRef(1.0);
  const flashAlphaRef = useRef(0.0);

  // Handle digit increment / decrement
  const handleDigitChange = (index: number, delta: number) => {
    sound.playClick(950);
    setDigits((prev) => {
      const next = [...prev];
      let val = parseInt(next[index], 10) + delta;
      if (val > 9) val = 0;
      if (val < 0) val = 9;
      next[index] = val.toString();
      return next;
    });
  };

  // Handle Verify Passcode [DESBLOQUEAR SISTEMA]
  const handleVerifyPasscode = () => {
    sound.resumeContext();
    const entered = digits.join('');
    if (entered === '171080') {
      // Correct! Vault unlock audio + retract cylinder screen
      sound.playVaultUnlock();
      setIsUnlocked(true);
      flashAlphaRef.current = 0.85;
      setTimeout(() => {
        flashAlphaRef.current = 0.0;
      }, 300);
    } else {
      // Incorrect! Red flash + error alert sound + shake
      sound.playErrorAlert();
      setErrorShake(true);
      setErrorFlash(true);
      setTimeout(() => {
        setErrorShake(false);
      }, 400);
      setTimeout(() => {
        setErrorFlash(false);
      }, 600);
    }
  };

  // Handle pointer move for 3D holographic tilt
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const { innerWidth, innerHeight } = window;
    mouseRef.current.targetX = (e.clientX / innerWidth - 0.5) * 40;
    mouseRef.current.targetY = (e.clientY / innerHeight - 0.5) * 40;
  };

  // Click handler to ignite reactor & enter simulator
  const handleStartProtocol = useCallback(() => {
    if (isEntering) return;
    setIsEntering(true);

    // 1. Unlock browser AudioContext and play power-up sequence
    sound.resumeContext();
    sound.playReactorPowerUp();

    // 2. Trigger high-speed reactor flare
    reactorSpeedRef.current = 8.5;
    flashAlphaRef.current = 1.0;

    // 3. Smooth exit transition in 650ms
    setTimeout(() => {
      onEnter();
      setTimeout(() => {
        setDismissed(true);
      }, 700);
    }, 650);
  }, [isEntering, onEnter]);

  // Canvas Arc Reactor & Holographic Gears Drawing Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle field (laser projection dust)
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      alpha: number;
      color: string;
    }

    const particles: Particle[] = Array.from({ length: 65 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: -(Math.random() * 0.7 + 0.3),
      speedX: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.3 ? '#00e5ff' : '#f59e0b',
    }));

    let angle1 = 0;
    let angle2 = 0;
    let angle3 = 0;
    let scanAngle = 0;
    let pulsePhase = 0;

    // Helper: draw gear with sharp square teeth
    const drawGear = (
      cx: number,
      cy: number,
      innerR: number,
      outerR: number,
      teeth: number,
      rot: number,
      strokeColor: string,
      fillColor: string | null = null,
      lineWidth = 2
    ) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);

      ctx.beginPath();
      const toothStep = (Math.PI * 2) / teeth;
      for (let i = 0; i < teeth; i++) {
        const a1 = i * toothStep;
        const a2 = a1 + toothStep * 0.3;
        const a3 = a1 + toothStep * 0.5;
        const a4 = a1 + toothStep * 0.8;

        const x1 = Math.cos(a1) * innerR;
        const y1 = Math.sin(a1) * innerR;
        const x2 = Math.cos(a2) * outerR;
        const y2 = Math.sin(a2) * outerR;
        const x3 = Math.cos(a3) * outerR;
        const y3 = Math.sin(a3) * outerR;
        const x4 = Math.cos(a4) * innerR;
        const y4 = Math.sin(a4) * innerR;

        if (i === 0) ctx.moveTo(x1, y1);
        else ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.lineTo(x4, y4);
      }
      ctx.closePath();

      if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
      }
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = lineWidth;
      ctx.stroke();

      ctx.restore();
    };

    // Render frame
    const render = () => {
      ctx.fillStyle = '#05070b';
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse parallax interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const cx = width / 2 + mouseRef.current.x;
      const cy = height / 2 + mouseRef.current.y;

      // Update angles
      const speedMult = reactorSpeedRef.current;
      angle1 += 0.006 * speedMult;
      angle2 -= 0.009 * speedMult;
      angle3 += 0.012 * speedMult;
      scanAngle += 0.025;
      pulsePhase += 0.04;

      // Draw particle dust
      particles.forEach((p) => {
        p.y += p.speedY * speedMult;
        p.x += p.speedX;
        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      // Draw background holographic concentric CAD radar rings
      ctx.save();
      ctx.translate(cx, cy);

      for (let r = 120; r < Math.max(width, height) * 0.7; r += 90) {
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.strokeStyle = errorFlash ? 'rgba(255, 23, 68, 0.25)' : 'rgba(0, 229, 255, 0.08)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 12]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Rotating Scanner line
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(scanAngle) * 800, Math.sin(scanAngle) * 800);
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Outer holographic technical gear 1
      drawGear(0, 0, 240, 260, 24, angle1, errorFlash ? 'rgba(255,23,68,0.4)' : 'rgba(0, 229, 255, 0.28)', null, 1.5);

      // Mid holographic technical gear 2
      drawGear(0, 0, 175, 192, 18, angle2, errorFlash ? 'rgba(255,23,68,0.45)' : 'rgba(245, 158, 11, 0.35)', null, 1.8);

      // Inner Arc Reactor Core rings
      const corePulse = 1.0 + Math.sin(pulsePhase) * 0.04 * speedMult;
      const coreR = 95;

      ctx.beginPath();
      ctx.arc(0, 0, coreR * corePulse, 0, Math.PI * 2);
      ctx.strokeStyle = errorFlash ? '#ff1744' : '#00e5ff';
      ctx.lineWidth = 3.5;
      ctx.shadowColor = errorFlash ? '#ff1744' : '#00e5ff';
      ctx.shadowBlur = 25;
      ctx.stroke();
      ctx.shadowBlur = 0;

      const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, coreR * corePulse);
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.3, errorFlash ? '#ff1744' : '#00e5ff');
      coreGrad.addColorStop(0.7, errorFlash ? 'rgba(255, 23, 68, 0.6)' : 'rgba(2, 132, 199, 0.6)');
      coreGrad.addColorStop(1, 'rgba(0, 229, 255, 0)');

      ctx.beginPath();
      ctx.arc(0, 0, coreR * corePulse, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // Central Inscribed Tech Triangle
      ctx.save();
      ctx.rotate(-angle1 * 1.5);
      ctx.beginPath();
      const triR = coreR * 0.55;
      for (let t = 0; t < 3; t++) {
        const ta = (t * Math.PI * 2) / 3 - Math.PI / 2;
        const tx = Math.cos(ta) * triR;
        const ty = Math.sin(ta) * triR;
        if (t === 0) ctx.moveTo(tx, ty);
        else ctx.lineTo(tx, ty);
      }
      ctx.closePath();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.2;
      ctx.stroke();
      ctx.restore();

      ctx.restore();

      // Flash overlay
      if (flashAlphaRef.current > 0.01) {
        ctx.fillStyle = `rgba(255, 255, 255, ${flashAlphaRef.current})`;
        ctx.fillRect(0, 0, width, height);
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [errorFlash]);

  if (dismissed) return null;

  return (
    <div
      onPointerMove={handlePointerMove}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between p-4 sm:p-8 select-none transition-opacity duration-700 ${
        isEntering ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        backgroundColor: '#05070b',
        backgroundImage:
          'radial-gradient(circle at center, rgba(6, 18, 32, 0.5) 0%, rgba(5, 7, 11, 0.95) 70%, #05070b 100%)',
      }}
    >
      {/* PANTALLA DE PRESENTACIÓN PREVIA (SPLASH LOGO: david.jpeg) */}
      {showSplashLogo && (
        <div
          onClick={() => {
            setSplashFadeOut(true);
            setTimeout(() => setShowSplashLogo(false), 200);
          }}
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center select-none transition-opacity duration-500 cursor-pointer ${
            splashFadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{
            background:
              'radial-gradient(circle at center, rgba(6, 28, 48, 0.95) 0%, rgba(5, 7, 15, 0.98) 65%, #03050a 100%)',
          }}
        >
          {/* Ambient Holographic Cyber Grid Glow */}
          <div className="relative flex flex-col items-center px-4 animate-fadeIn">
            {/* Holographic Glowing Frame around david.jpeg */}
            <div className="relative p-1.5 sm:p-2 rounded-3xl bg-gradient-to-b from-cyan-400 via-sky-500 to-blue-600 shadow-[0_0_60px_rgba(6,182,212,0.6)] animate-pulse">
              <img
                src="./david.jpeg"
                alt="David Ramírez - JARVIS Automotriz"
                className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-2xl border border-cyan-300/40 shadow-2xl"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-cyan-950/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Title & Badge */}
            <div className="mt-6 text-center space-y-2">
              <div className="font-orbitron font-extrabold text-xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-cyan-400 tracking-wider">
                JARVIS AUTOMOTRIZ
              </div>
              <div className="font-mono text-xs sm:text-sm text-cyan-400/90 tracking-widest uppercase">
                SISTEMA HOLOGRÁFICO // DAVID RAMÍREZ
              </div>
              <div className="pt-2 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-mono text-[11px] sm:text-xs text-slate-400">
                  INICIALIZANDO MOTOR GRÁFICO 3D...
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Background Interactive Three.js/Canvas Arc Reactor */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* TOP HUD TELEMETRY BAR */}
      <div className="relative z-10 w-full max-w-5xl flex items-center justify-between text-[10px] sm:text-xs font-mono text-cyan-400/80 border-b border-cyan-500/20 pb-2">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isUnlocked ? 'bg-emerald-400' : 'bg-amber-400'} animate-ping`} />
          <span className="tracking-widest font-tech uppercase text-cyan-300">
            STARK IND. // JARVIS HUD SYS v2.4
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-slate-400">
          <span>SEC LEVEL: ALPHA-1</span>
          <span>STATUS: {isUnlocked ? 'UNLOCKED' : 'AUTHORIZATION REQUIRED'}</span>
          <span className="text-amber-400 font-semibold">[STANDALONE PWA]</span>
        </div>
        <div className="text-right">
          <span className="text-slate-400">DIAGNOSTIC:</span>{' '}
          <span className={isUnlocked ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
            {isUnlocked ? 'SECURED' : 'LOCKED'}
          </span>
        </div>
      </div>

      {/* CENTER CONTENT CONTAINER */}
      <div
        className={`relative z-20 my-auto text-center flex flex-col items-center max-w-3xl px-2 w-full transition-transform duration-75 ${
          hudShake || errorShake ? 'translate-x-[3px] -translate-y-[2px]' : ''
        }`}
      >
        {/* ========================================================================= */}
        {/* PASO 1: PANTALLA DE ACCESO DE SEGURIDAD (CILINDRO NUMÉRICO DE 6 DÍGITOS) */}
        {/* ========================================================================= */}
        {!isUnlocked ? (
          <div
            className={`relative w-full max-w-md mx-auto p-5 sm:p-7 rounded-sm backdrop-blur-2xl border transition-all duration-300 shadow-2xl ${
              errorFlash
                ? 'bg-red-950/90 border-red-500 shadow-[0_0_40px_rgba(255,23,68,0.6)]'
                : 'bg-slate-950/92 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.35)]'
            }`}
          >
            {/* Header Badge */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <Lock className={`w-4 h-4 ${errorFlash ? 'text-red-400 animate-bounce' : 'text-cyan-400'}`} />
              <span className="font-tech text-xs tracking-wider uppercase font-bold text-cyan-300">
                AUTORIZACIÓN REQUERIDA // CÓDIGO DE ACCESO DE 6 DÍGITOS
              </span>
            </div>
            <p className="font-mono text-[11px] text-slate-400 mb-6">
              Ingrese el código secreto de la bóveda para iniciar el simulador CAD
            </p>

            {/* 6 Rotary Combination Cylinder Wheels */}
            <div className="grid grid-cols-6 gap-1.5 sm:gap-2.5 mb-6">
              {digits.map((digit, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center bg-slate-900 border rounded-sm py-2 shadow-inner transition-colors ${
                    errorFlash ? 'border-red-500 bg-red-950/50' : 'border-cyan-500/40'
                  }`}
                >
                  {/* Up button */}
                  <button
                    onClick={() => handleDigitChange(idx, 1)}
                    className="p-1 text-cyan-400 hover:text-white transition active:scale-95 cursor-pointer"
                    title="Aumentar dígito"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>

                  {/* Digit Display */}
                  <span className="font-orbitron font-bold text-xl sm:text-2xl text-cyan-200 my-1">
                    {digit}
                  </span>

                  {/* Down button */}
                  <button
                    onClick={() => handleDigitChange(idx, -1)}
                    className="p-1 text-cyan-400 hover:text-white transition active:scale-95 cursor-pointer"
                    title="Disminuir dígito"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Error Message if incorrect */}
            {errorFlash && (
              <div className="flex items-center justify-center gap-1.5 text-red-400 font-mono text-xs mb-4 animate-pulse">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>CÓDIGO INCORRECTO. ACCESO DENEGADO.</span>
              </div>
            )}

            {/* [DESBLOQUEAR SISTEMA] Button */}
            <button
              onClick={handleVerifyPasscode}
              onPointerEnter={() => sound.playHover(1100)}
              className="w-full py-3.5 bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-orbitron font-bold text-xs sm:text-sm tracking-[2px] rounded-sm border border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>DESBLOQUEAR SISTEMA</span>
            </button>
          </div>
        ) : (
          /* ========================================================================= */
          /* PASO 2: PANTALLA DE BIENVENIDA DE JARVIS AUTOMOTRIZ (POST-DESBLOQUEO)      */
          /* ========================================================================= */
          <div className="flex flex-col items-center animate-fadeIn w-full">
            {/* System Tag with Blinking Cursor */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-cyan-950/60 border border-cyan-400/50 text-[10px] sm:text-xs font-mono text-cyan-300 mb-2 sm:mb-3 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="tracking-wider">AUTORIZACIÓN CONCEDIDA // BÓVEDA DESBLOQUEADA</span>
              <span className="inline-block w-2 h-3.5 bg-emerald-400 animate-pulse ml-0.5" />
            </div>

            {/* Main Title: JARVIS AUTOMOTRIZ */}
            <h1 className="font-orbitron font-black text-3xl xs:text-4xl sm:text-6xl md:text-7xl tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-400 text-glow-jarvis leading-tight mb-1 sm:mb-2">
              JARVIS AUTOMOTRIZ
            </h1>

            {/* Placa Cromada Extra Delgada con Impacto Magnético (SLAM FX) y Grabado Láser */}
            <LaserCreditEngraver onImpact={handlePlaqueImpact} className="my-1.5 sm:my-3 w-full" />

            {/* Technical Sub-label */}
            <p className="font-rajdhani text-xs sm:text-sm tracking-widest text-slate-400 max-w-lg mb-5 sm:mb-8 uppercase font-medium">
              Simulador mecánico 3D interactivo con cinemática real, despiece por explosión y acople magnético
            </p>

            {/* PROMINENT ACTION BUTTON: [ INICIAR PROTOCOLO // ENTRAR ] */}
            <div className="relative group">
              {/* Animated Neon Backdrop Glow */}
              <div
                className={`absolute -inset-1 rounded-sm bg-gradient-to-r from-cyan-500 via-sky-400 to-amber-500 opacity-60 blur-md transition duration-500 group-hover:opacity-100 group-hover:blur-lg ${
                  isHovered ? 'scale-105' : ''
                }`}
              />

              <button
                onClick={handleStartProtocol}
                onPointerEnter={() => {
                  setIsHovered(true);
                  sound.playHover(900);
                }}
                onPointerLeave={() => setIsHovered(false)}
                className="relative px-6 py-3.5 sm:px-10 sm:py-4.5 bg-slate-950 hover:bg-slate-900 border-2 border-cyan-400 font-orbitron font-bold text-xs sm:text-sm tracking-[3px] text-cyan-200 hover:text-white transition-all duration-200 active:scale-95 chamfer-btn flex items-center gap-3 cursor-pointer box-glow-jarvis"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
                <span className="font-extrabold uppercase">
                  {isEntering ? 'INICIALIZANDO...' : 'INICIAR PROTOCOLO // ENTRAR'}
                </span>
                <span className="text-amber-400 text-base font-tech">⚡</span>
              </button>
            </div>

            {/* Quick Hint */}
            <span className="font-mono text-[10px] text-slate-500 tracking-wider mt-4">
              TOCA PARA DESBLOQUEAR AUDIO SINTETIZADO & INICIAR WORKSHOP
            </span>
          </div>
        )}
      </div>

      {/* BOTTOM HUD STATUS & SPECIFICATIONS */}
      <div className="relative z-10 w-full max-w-5xl flex flex-wrap items-center justify-between text-[10px] sm:text-xs font-mono text-slate-500 border-t border-cyan-500/20 pt-2 gap-2">
        <div className="flex items-center gap-2 text-cyan-500/80">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>FRENOS • DIFERENCIAL • TRANSMISIÓN • PISTÓN • SUSPENSIÓN • CUMPLEAÑOS</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <span>RENDER: PBR 3D</span>
          <span>SIN LOD // 100% DEFINICIÓN</span>
          <span className="text-cyan-400 font-bold">100% OFFLINE PWA</span>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { sound } from '../utils/audio';

interface LaserCreditEngraverProps {
  onComplete?: () => void;
  onImpact?: () => void;
  className?: string;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

interface LetterInfo {
  char: string;
  x: number;
  width: number;
  temp: number; // 1.0 = hot red-orange, 0.0 = cooled debossed graphite
  revealed: boolean;
}

export const LaserCreditEngraver: React.FC<LaserCreditEngraverProps> = ({
  onComplete,
  onImpact,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Plaque Slam & Visibility States
  // 0: hidden (first 2.0s)
  // 1: slamming in (active transition)
  // 2: settled & attached
  const [plaqueState, setPlaqueState] = useState<'hidden' | 'slamming' | 'settled'>('hidden');
  const [showFlash, setShowFlash] = useState(false);
  const [isEngraving, setIsEngraving] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const animFrameRef = useRef<number | null>(null);
  const slamTimerRef = useRef<NodeJS.Timeout[]>([]);

  // Function to execute the complete sequence: 2s delay -> SLAM FX -> Laser Engraving
  const executeSequence = useCallback((initialDelayMs = 2000) => {
    // Clear any existing timers
    slamTimerRef.current.forEach((t) => clearTimeout(t));
    slamTimerRef.current = [];

    // Reset states
    setPlaqueState('hidden');
    setShowFlash(false);
    setIsEngraving(false);
    setIsFinished(false);

    // Cancel any running canvas animation
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    // Step 1: Wait initial delay (2.0s)
    const t1 = setTimeout(() => {
      // Step 2: Trigger Slam impact
      setPlaqueState('slamming');

      // Trigger metallic audio slam and flash at impact point
      sound.playMetallicSlam();
      setShowFlash(true);
      onImpact?.();

      const tFlash = setTimeout(() => {
        setShowFlash(false);
      }, 150);
      slamTimerRef.current.push(tFlash);

      // Step 3: Settle firmly after 200ms
      const tSettle = setTimeout(() => {
        setPlaqueState('settled');

        // Step 4: Begin laser engraving on chrome plaque
        const tLaser = setTimeout(() => {
          startEngraving();
        }, 100);
        slamTimerRef.current.push(tLaser);
      }, 200);
      slamTimerRef.current.push(tSettle);

    }, initialDelayMs);

    slamTimerRef.current.push(t1);
  }, [onImpact]);

  // Laser Engraving Engine on Polished Chrome Surface
  const startEngraving = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsEngraving(true);
    setIsFinished(false);
    sound.startLaserCutting();

    // High DPI Canvas setup
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(260, rect.width || 340);
    const height = Math.max(36, rect.height || 42);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const fullText = 'by David Ramírez';

    // Safe available width inside chrome plaque (leaving padding for borders)
    const safePadding = 24;
    const availableWidth = width - safePadding;

    // Requirement 1: font-size: clamp(1.1rem, 2.8vw, 1.35rem); font-weight: 800; letter-spacing: 1.5px;
    const rem = 16;
    const vw = (typeof window !== 'undefined' ? window.innerWidth : 800) * 0.028;
    const targetFontSize = Math.min(Math.max(1.1 * rem, vw), 1.35 * rem);
    let fontSize = Math.round(targetFontSize * 10) / 10;
    let letterSpacing = 1.5;

    const measureWidth = (fSize: number, lSpacing: number) => {
      ctx.font = `800 ${fSize}px "Share Tech Mono", "Rajdhani", monospace`;
      let total = 0;
      for (let i = 0; i < fullText.length; i++) {
        total += ctx.measureText(fullText[i]).width + (i < fullText.length - 1 ? lSpacing : 0);
      }
      return total;
    };

    let calculatedWidth = measureWidth(fontSize, letterSpacing);
    while (calculatedWidth > availableWidth && fontSize > 13) {
      fontSize -= 0.5;
      calculatedWidth = measureWidth(fontSize, letterSpacing);
    }

    ctx.font = `800 ${fontSize}px "Share Tech Mono", "Rajdhani", monospace`;
    ctx.textBaseline = 'middle';

    let totalTextWidth = 0;
    const letterWidths: number[] = [];
    for (let i = 0; i < fullText.length; i++) {
      const char = fullText[i];
      const w = ctx.measureText(char).width + (i < fullText.length - 1 ? letterSpacing : 0);
      letterWidths.push(w);
      totalTextWidth += w;
    }

    const startX = Math.max(8, (width - totalTextWidth) / 2);
    const centerY = height / 2;

    let curX = startX;
    const letters: LetterInfo[] = fullText.split('').map((char, i) => {
      const info: LetterInfo = {
        char,
        x: curX,
        width: letterWidths[i],
        temp: 1.0,
        revealed: false,
      };
      curX += letterWidths[i];
      return info;
    });

    const sparks: Spark[] = [];
    let currentLetterIndex = 0;
    let letterProgress = 0.0;
    
    // Calibración temporal estricta: tiempo total de grabado = 2800ms (2.8 segundos)
    const totalLaserDurationMs = 2800;
    const msPerCharacter = totalLaserDurationMs / Math.max(fullText.length, 1); // ~175ms por carácter
    let lastFrameTime = performance.now();

    let laserHeadX = startX;
    let laserHeadY = centerY;
    let activeLaser = true;

    const spawnSparks = (x: number, y: number, count = 3) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = 0.7 + Math.random() * 2.2;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity - 0.7,
          life: 0,
          maxLife: 10 + Math.floor(Math.random() * 12),
          size: 0.8 + Math.random() * 1.4,
          color: Math.random() > 0.4 ? '#ff1744' : Math.random() > 0.5 ? '#ff9100' : '#ffffff',
        });
      }
    };

    const render = () => {
      const now = performance.now();
      const deltaMs = Math.min(now - lastFrameTime, 100);
      lastFrameTime = now;

      ctx.clearRect(0, 0, width, height);

      // Advance laser engraving state with frame-rate independent delta time
      if (activeLaser && currentLetterIndex < letters.length) {
        letters[currentLetterIndex].revealed = true;
        letters[currentLetterIndex].temp = 1.0;

        const currentLetter = letters[currentLetterIndex];
        laserHeadX = currentLetter.x + currentLetter.width * letterProgress;
        laserHeadY = centerY + (Math.sin(letterProgress * Math.PI * 4) * (fontSize * 0.28));

        spawnSparks(laserHeadX, laserHeadY, 2);
        sound.updateLaserIntensity((Math.random() - 0.5) * 80);

        // Advance progress strictly based on msPerCharacter (2.8s total duration)
        const progressIncrement = deltaMs / msPerCharacter;
        letterProgress += progressIncrement;

        if (letterProgress >= 1.0) {
          letterProgress = 0.0;
          currentLetterIndex++;
          if (currentLetterIndex >= letters.length) {
            activeLaser = false;
            sound.stopLaserCutting();
            setIsEngraving(false);
            setIsFinished(true);
            onComplete?.();
          }
        }
      }

      // Cool down revealed letters towards debossed graphite on chrome
      for (let i = 0; i < letters.length; i++) {
        const l = letters[i];
        if (l.revealed) {
          if (i !== currentLetterIndex || !activeLaser) {
            l.temp = Math.max(0.0, l.temp - 0.038);
          }
        }
      }

      // 1. Draw Revealed Letters
      ctx.font = `800 ${fontSize}px "Share Tech Mono", "Rajdhani", monospace`;
      ctx.textBaseline = 'middle';

      letters.forEach((l) => {
        if (!l.revealed) return;

        if (l.temp > 0.05) {
          // HOT LASER ETCHING (Glow state on chrome)
          const heat = l.temp;
          ctx.save();
          ctx.shadowBlur = 9 * heat;
          ctx.shadowColor = 'rgba(255, 23, 68, 0.9)';

          if (heat > 0.7) {
            ctx.fillStyle = '#ffffff';
          } else if (heat > 0.35) {
            ctx.fillStyle = '#ff9100';
          } else {
            ctx.fillStyle = '#ff1744';
          }
          ctx.fillText(l.char, l.x, centerY);
          ctx.restore();
        } else {
          // COOLED DEBOSSED GRAPHITE STATE (Laser-etched into polished mirror chrome)
          ctx.save();
          // Subtle bottom-right specular bevel reflection
          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.fillText(l.char, l.x + 0.6, centerY + 0.8);

          // Deep dark debossed graphite core
          ctx.fillStyle = '#0f172a';
          ctx.fillText(l.char, l.x, centerY);
          ctx.restore();
        }
      });

      // 2. Draw Micro Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.08; // subtle gravity
        s.life++;

        const alpha = Math.max(0, 1 - s.life / s.maxLife);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = s.color;
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#ff1744';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (s.life >= s.maxLife) {
          sparks.splice(i, 1);
        }
      }

      // 3. Draw Active Laser Head & Thermal Corona
      if (activeLaser) {
        ctx.save();
        // Outer thermal glow
        const glowRad = 10;
        const grad = ctx.createRadialGradient(
          laserHeadX,
          laserHeadY,
          0,
          laserHeadX,
          laserHeadY,
          glowRad
        );
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        grad.addColorStop(0.2, 'rgba(255, 82, 82, 0.85)');
        grad.addColorStop(0.6, 'rgba(255, 23, 68, 0.4)');
        grad.addColorStop(1, 'rgba(255, 23, 68, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(laserHeadX, laserHeadY, glowRad, 0, Math.PI * 2);
        ctx.fill();

        // Intense center pinpoint
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#ff1744';
        ctx.beginPath();
        ctx.arc(laserHeadX, laserHeadY, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Continue loop if active or sparks exist
      if (activeLaser || sparks.length > 0 || letters.some((l) => l.temp > 0.01)) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    animFrameRef.current = requestAnimationFrame(render);
  }, [onComplete]);

  // Initial mount trigger: 2-second delay before slamming in
  useEffect(() => {
    executeSequence(2000);

    return () => {
      slamTimerRef.current.forEach((t) => clearTimeout(t));
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      sound.stopLaserCutting();
    };
  }, [executeSequence]);

  // Handle window resize cleanly
  useEffect(() => {
    const handleResize = () => {
      if (!isEngraving && plaqueState === 'settled') {
        startEngraving();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isEngraving, plaqueState, startEngraving]);

  // Determine plaque CSS transformation based on slam state:
  // - hidden: completely invisible & un-rendered
  // - slamming: transition from scale(1.6) translateZ(80px) to settled
  // - settled: final perspective tilt
  const isVisible = plaqueState !== 'hidden';

  return (
    <div
      className={`relative flex flex-col items-center justify-center w-full max-w-full px-2 py-1 ${className}`}
      style={{ perspective: '500px' }}
    >
      {/* 
        CHROME MIRROR FINISH EXTRA-SLIM PLAQUE:
        - Dimensions: width: min(300px, 78vw); padding: 8px 16px; min-height: unset;
        - Borde biselado ultrafino de 1px con reflejo especular: border: 1px solid rgba(255, 255, 255, 0.85);
        - Gradiente de cromo pulido real: linear-gradient(135deg, #ffffff 0%, #cbd5e1 20%, #64748b 45%, #94a3b8 55%, #f8fafc 80%, #475569 100%);
        - Reflejo lineal continuo (shine sweep diagonal)
        - Sombra nítida realzada: box-shadow: 0 8px 20px rgba(0, 0, 0, 0.85), 0 0 15px rgba(255, 255, 255, 0.25), inset 0 1px 1px #ffffff;
        - Inclinación en perspectiva diagonal sutil: transform: perspective(500px) rotateX(10deg) rotateZ(-3deg);
      */}
      <div
        className={`chrome-badge relative transition-all duration-200 select-none overflow-hidden rounded-[2px] ${
          !isVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{
          width: 'min(380px, 88vw)',
          padding: '10px 20px',
          minHeight: 'unset',
          fontSize: 'clamp(1.1rem, 2.8vw, 1.35rem)',
          fontWeight: 800,
          letterSpacing: '1.5px',
          transform: !isVisible
            ? 'perspective(500px) scale(1.6) translateZ(80px) rotateX(15deg)'
            : 'perspective(500px) scale(1.0) rotateX(10deg) rotateZ(-3deg)',
          transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          background:
            'linear-gradient(135deg, #ffffff 0%, #cbd5e1 20%, #64748b 45%, #94a3b8 55%, #f8fafc 80%, #475569 100%)',
          border: '1px solid rgba(255, 255, 255, 0.85)',
          boxShadow: showFlash
            ? '0 0 35px rgba(255, 255, 255, 0.95), 0 0 25px rgba(0, 229, 255, 0.8), inset 0 0 15px rgba(255, 255, 255, 0.9)'
            : '0 8px 20px rgba(0, 0, 0, 0.85), 0 0 15px rgba(255, 255, 255, 0.25), inset 0 1px 1px #ffffff',
        }}
      >
        {/* Dynamic Chrome Shine Sweep (Diagonal Specular Light Pass) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.7) 48%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0.7) 52%, transparent 75%)',
            animation: 'chrome-shine-sweep 4.5s ease-in-out infinite',
            backgroundSize: '200% 100%',
          }}
        />

        {/* Impact Cyan-White Flash Ring */}
        {showFlash && (
          <div
            className="absolute inset-0 pointer-events-none rounded-[2px] border-2 border-cyan-300 animate-ping opacity-90"
            style={{ animationDuration: '150ms' }}
          />
        )}

        {/* Canvas for Laser Cutting & Debossed Signature */}
        <div className="relative w-full flex justify-center items-center z-10">
          <canvas
            ref={canvasRef}
            className="w-full h-9 sm:h-10 pointer-events-none"
            style={{
              filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.35))',
            }}
          />
        </div>
      </div>

      {/* Discrete Replay / Laser Status Below Plaque */}
      <div className="flex items-center gap-2 mt-1.5 text-[9px] font-mono text-slate-500 z-10 h-4">
        {isEngraving && (
          <span className="inline-flex items-center gap-1.5 text-red-400 font-semibold animate-pulse tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ff1744]" />
            LÁSER CNC // GRABANDO CROMO
          </span>
        )}
        {isFinished && (
          <button
            onClick={() => {
              sound.playClick(950);
              executeSequence(0); // instant re-slam + re-engrave
            }}
            className="hover:text-cyan-300 transition-colors flex items-center gap-1 text-[9px] text-slate-400 hover:text-cyan-200 cursor-pointer px-2 py-0.5 rounded-sm bg-slate-900/70 border border-slate-700/60 hover:border-cyan-400/60 shadow-sm"
            title="Repetir impacto magnético y grabado láser"
          >
            <span>[↺ RE-GRABAR]</span>
          </button>
        )}
      </div>

      {/* CSS Keyframes for the dynamic chrome shine sweep & .chrome-badge specs */}
      <style>{`
        .chrome-badge {
          padding: 10px 20px !important;
          font-size: clamp(1.1rem, 2.8vw, 1.35rem) !important;
          font-weight: 800 !important;
          letter-spacing: 1.5px !important;
        }
        @keyframes chrome-shine-sweep {
          0% { background-position: -150% 0; }
          45% { background-position: 150% 0; }
          100% { background-position: 150% 0; }
        }
      `}</style>
    </div>
  );
};

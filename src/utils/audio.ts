// Web Audio API Procedural Holographic Sound Synthesizer (Stark Lab / JARVIS style)

class HolographicAudioEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  // Grab drone oscillator state
  private droneOsc: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  private droneFilter: BiquadFilterNode | null = null;
  private lastProximityBeepTime: number = 0;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public resumeContext() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Vault Unlock Harmonic Magnetic Sound (Code 171080 Success)
  public playVaultUnlock() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Majestic vault release chords (C5, G5, C6) + mechanical latch slide
      const freqs = [523.25, 783.99, 1046.5];
      freqs.forEach((f, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = idx === 2 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(f, now + idx * 0.08);
        gain.gain.setValueAtTime(0.18, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.6);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.65);
      });

      // Metallic latch slide click
      const clickOsc = this.ctx.createOscillator();
      const clickGain = this.ctx.createGain();
      clickOsc.type = 'sawtooth';
      clickOsc.frequency.setValueAtTime(320, now + 0.25);
      clickOsc.frequency.exponentialRampToValueAtTime(80, now + 0.38);
      clickGain.gain.setValueAtTime(0.25, now + 0.25);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
      clickOsc.connect(clickGain);
      clickGain.connect(this.ctx.destination);
      clickOsc.start(now + 0.25);
      clickOsc.stop(now + 0.38);
    } catch {}
  }

  // Error Alert Sound (Incorrect Passcode)
  public playErrorAlert() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [0, 0.15].forEach((offset) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, now + offset);
        osc.frequency.setValueAtTime(130, now + offset + 0.08);
        gain.gain.setValueAtTime(0.2, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.14);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.14);
      });
    } catch {}
  }

  // 1. Hover: Subtle high-tech radar chirp
  public playHover(freq = 1100) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.4, this.ctx.currentTime + 0.045);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.045);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.045);
    } catch {}
  }

  // Backward compatibility alias for playHover
  public playSelect() {
    this.playHover(900);
  }

  // Backward compatibility alias for playLockSound
  public playSnap() {
    this.playLockSound();
  }

  // 2. Grab: Continuous harmonic drone hum that modulates with drag speed
  public startGrabDrone() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx || this.droneOsc) return;

    try {
      const now = this.ctx.currentTime;
      this.droneOsc = this.ctx.createOscillator();
      this.droneGain = this.ctx.createGain();
      this.droneFilter = this.ctx.createBiquadFilter();

      this.droneOsc.type = 'sawtooth';
      this.droneOsc.frequency.setValueAtTime(110, now);

      this.droneFilter.type = 'lowpass';
      this.droneFilter.frequency.setValueAtTime(320, now);

      this.droneGain.gain.setValueAtTime(0.001, now);
      this.droneGain.gain.linearRampToValueAtTime(0.035, now + 0.08);

      this.droneOsc.connect(this.droneFilter);
      this.droneFilter.connect(this.droneGain);
      this.droneGain.connect(this.ctx.destination);

      this.droneOsc.start(now);
    } catch {}
  }

  public updateGrabDrone(speed: number) {
    if (!this.ctx || !this.droneOsc || !this.droneFilter || !this.droneGain) return;
    try {
      const clampedSpeed = Math.min(speed, 5.0);
      const targetFreq = 110 + clampedSpeed * 35; // 110Hz to 285Hz
      const targetFilter = 320 + clampedSpeed * 120;
      const now = this.ctx.currentTime;

      this.droneOsc.frequency.setTargetAtTime(targetFreq, now, 0.04);
      this.droneFilter.frequency.setTargetAtTime(targetFilter, now, 0.04);
      this.droneGain.gain.setTargetAtTime(0.035 + clampedSpeed * 0.015, now, 0.04);
    } catch {}
  }

  public stopGrabDrone() {
    if (!this.ctx || !this.droneOsc || !this.droneGain) return;
    try {
      const now = this.ctx.currentTime;
      this.droneGain.gain.linearRampToValueAtTime(0.0001, now + 0.08);
      setTimeout(() => {
        if (this.droneOsc) {
          try {
            this.droneOsc.stop();
            this.droneOsc.disconnect();
          } catch {}
          this.droneOsc = null;
          this.droneGain = null;
          this.droneFilter = null;
        }
      }, 90);
    } catch {
      this.droneOsc = null;
      this.droneGain = null;
      this.droneFilter = null;
    }
  }

  // 3. Snap Proximity: Intermittent beep whose cadence accelerates as distance approaches 0
  public playSnapProximity(ratio: number) {
    // ratio: 0 (at tolerance edge) to 1 (right on home position)
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = performance.now();
    // Cadence: from 400ms down to 80ms interval
    const interval = 400 - ratio * 320;
    if (now - this.lastProximityBeepTime < interval) return;
    this.lastProximityBeepTime = now;

    try {
      const audioNow = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const baseFreq = 950 + ratio * 450;
      osc.frequency.setValueAtTime(baseFreq, audioNow);

      gain.gain.setValueAtTime(0.04 + ratio * 0.03, audioNow);
      gain.gain.exponentialRampToValueAtTime(0.001, audioNow + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(audioNow);
      osc.stop(audioNow + 0.04);
    } catch {}
  }

  // 4. Lock / Ensamble: Heavy composite metallic thud + high-pitch resonant ping
  public playLockSound() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // Part A: Deep solid mechanical thud
      const oscLow = this.ctx.createOscillator();
      const gainLow = this.ctx.createGain();
      oscLow.type = 'triangle';
      oscLow.frequency.setValueAtTime(140, now);
      oscLow.frequency.exponentialRampToValueAtTime(35, now + 0.16);
      gainLow.gain.setValueAtTime(0.35, now);
      gainLow.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      oscLow.connect(gainLow);
      gainLow.connect(this.ctx.destination);
      oscLow.start(now);
      oscLow.stop(now + 0.16);

      // Part B: High metallic latch ping (1480Hz & 2200Hz harmonic)
      const oscHigh1 = this.ctx.createOscillator();
      const gainHigh1 = this.ctx.createGain();
      oscHigh1.type = 'sine';
      oscHigh1.frequency.setValueAtTime(1480, now + 0.01);
      gainHigh1.gain.setValueAtTime(0.18, now + 0.01);
      gainHigh1.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      oscHigh1.connect(gainHigh1);
      gainHigh1.connect(this.ctx.destination);
      oscHigh1.start(now + 0.01);
      oscHigh1.stop(now + 0.32);

      const oscHigh2 = this.ctx.createOscillator();
      const gainHigh2 = this.ctx.createGain();
      oscHigh2.type = 'sine';
      oscHigh2.frequency.setValueAtTime(2217, now + 0.02);
      gainHigh2.gain.setValueAtTime(0.12, now + 0.02);
      gainHigh2.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      oscHigh2.connect(gainHigh2);
      gainHigh2.connect(this.ctx.destination);
      oscHigh2.start(now + 0.02);
      oscHigh2.stop(now + 0.25);
    } catch {}
  }

  // Heavy Magnetic Impact Slam ("SLAM FX" for chrome plaque)
  public playMetallicSlam() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // 1. Heavy physical sub-bass thud (pile driver / neodymium magnet impact)
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(240, now);
      subOsc.frequency.exponentialRampToValueAtTime(36, now + 0.18);
      subGain.gain.setValueAtTime(0.5, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.22);

      // 2. High-speed metallic snap transient (short noise click)
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.04);
      const snapBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const snapData = snapBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        snapData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }
      const snapSource = this.ctx.createBufferSource();
      snapSource.buffer = snapBuffer;
      const snapFilter = this.ctx.createBiquadFilter();
      snapFilter.type = 'highpass';
      snapFilter.frequency.setValueAtTime(2600, now);
      const snapGain = this.ctx.createGain();
      snapGain.gain.setValueAtTime(0.35, now);
      snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
      snapSource.connect(snapFilter);
      snapFilter.connect(snapGain);
      snapGain.connect(this.ctx.destination);
      snapSource.start(now);

      // 3. Resonant metallic body ping / chrome ring (multiple inharmonic metallic modes)
      const metallicModes = [680, 1140, 1920, 3100];
      metallicModes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const ringOsc = this.ctx.createOscillator();
        const ringGain = this.ctx.createGain();
        ringOsc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        ringOsc.frequency.setValueAtTime(freq, now);
        ringOsc.frequency.exponentialRampToValueAtTime(freq * 0.95, now + 0.45);

        const initialAmp = 0.2 / (idx + 1);
        ringGain.gain.setValueAtTime(initialAmp, now);
        ringGain.gain.exponentialRampToValueAtTime(0.0005, now + 0.35 + idx * 0.05);

        ringOsc.connect(ringGain);
        ringGain.connect(this.ctx.destination);
        ringOsc.start(now);
        ringOsc.stop(now + 0.55);
      });
    } catch {}
  }

  // Quick UI button click
  public playClick(freq = 880) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    } catch {}
  }

  // Whoosh for kinematic explosion
  public playWhoosh(upwards = true) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      osc.type = 'sawtooth';

      osc.frequency.setValueAtTime(upwards ? 120 : 450, now);
      osc.frequency.exponentialRampToValueAtTime(upwards ? 450 : 120, now + 0.25);

      filter.frequency.setValueAtTime(600, now);
      filter.frequency.exponentialRampToValueAtTime(1400, now + 0.12);
      filter.frequency.exponentialRampToValueAtTime(350, now + 0.25);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {}
  }

  // Success fanfare when 5/5 parts are fully assembled
  public playFullAssemblyFanfare() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [587.33, 739.99, 880.0, 1174.66]; // D5, F#5, A5, D6 (Stark chord)
      notes.forEach((f, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.08);
        gain.gain.setValueAtTime(0.12, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.45);
      });
    } catch {}
  }

  // Assembly completion chime / fanfare
  public playAssemblyComplete() {
    this.playFullAssemblyFanfare();
  }

  // 7. Arc Reactor Cinematic Power-up Sound (JARVIS Protocol Init)
  public playReactorPowerUp() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // A. Deep sub-bass surge (35Hz -> 110Hz)
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(35, now);
      subOsc.frequency.exponentialRampToValueAtTime(110, now + 0.6);
      subGain.gain.setValueAtTime(0.01, now);
      subGain.gain.linearRampToValueAtTime(0.4, now + 0.35);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.75);

      // B. High turbine / coil whine sweeping up (220Hz -> 2600Hz)
      const coilOsc = this.ctx.createOscillator();
      const coilGain = this.ctx.createGain();
      const coilFilter = this.ctx.createBiquadFilter();
      coilOsc.type = 'sawtooth';
      coilOsc.frequency.setValueAtTime(220, now);
      coilOsc.frequency.exponentialRampToValueAtTime(2600, now + 0.65);
      coilFilter.type = 'bandpass';
      coilFilter.frequency.setValueAtTime(400, now);
      coilFilter.frequency.exponentialRampToValueAtTime(3200, now + 0.65);
      coilFilter.Q.setValueAtTime(3.5, now);
      coilGain.gain.setValueAtTime(0.02, now);
      coilGain.gain.linearRampToValueAtTime(0.28, now + 0.45);
      coilGain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
      coilOsc.connect(coilFilter);
      coilFilter.connect(coilGain);
      coilGain.connect(this.ctx.destination);
      coilOsc.start(now);
      coilOsc.stop(now + 0.75);

      // C. Power discharge impact pulse at apex (t = +0.52s)
      const pulseOsc = this.ctx.createOscillator();
      const pulseGain = this.ctx.createGain();
      pulseOsc.type = 'triangle';
      pulseOsc.frequency.setValueAtTime(880, now + 0.52);
      pulseOsc.frequency.exponentialRampToValueAtTime(120, now + 0.78);
      pulseGain.gain.setValueAtTime(0.001, now);
      pulseGain.gain.setValueAtTime(0.38, now + 0.52);
      pulseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.82);
      pulseOsc.connect(pulseGain);
      pulseGain.connect(this.ctx.destination);
      pulseOsc.start(now + 0.52);
      pulseOsc.stop(now + 0.82);
    } catch {}
  }

  // Laser Engraving State
  private laserOsc: OscillatorNode | null = null;
  private laserGain: GainNode | null = null;
  private laserFilter: BiquadFilterNode | null = null;
  private laserNoiseSource: AudioBufferSourceNode | null = null;
  private laserNoiseGain: GainNode | null = null;

  // 8. Industrial High-Energy Laser Cutting / Engraving Sound (Zumbido térmico en tiempo real)
  public startLaserCutting() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx || this.laserOsc) return;

    try {
      const now = this.ctx.currentTime;

      // A. High frequency buzzing thermal beam (sawtooth around 1250Hz - 1600Hz)
      this.laserOsc = this.ctx.createOscillator();
      this.laserGain = this.ctx.createGain();
      this.laserFilter = this.ctx.createBiquadFilter();

      this.laserOsc.type = 'sawtooth';
      this.laserOsc.frequency.setValueAtTime(1420, now);

      this.laserFilter.type = 'bandpass';
      this.laserFilter.frequency.setValueAtTime(2400, now);
      this.laserFilter.Q.setValueAtTime(4.0, now);

      this.laserGain.gain.setValueAtTime(0.001, now);
      this.laserGain.gain.linearRampToValueAtTime(0.065, now + 0.05);

      this.laserOsc.connect(this.laserFilter);
      this.laserFilter.connect(this.laserGain);
      this.laserGain.connect(this.ctx.destination);
      this.laserOsc.start(now);

      // B. Thermal ablation noise / micro-crackles
      const bufferSize = Math.floor(this.ctx.sampleRate * 1.5);
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        // High frequency white/pink crackle
        output[i] = (Math.random() * 2 - 1) * (Math.random() > 0.85 ? 0.9 : 0.2);
      }

      this.laserNoiseSource = this.ctx.createBufferSource();
      this.laserNoiseSource.buffer = noiseBuffer;
      this.laserNoiseSource.loop = true;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.setValueAtTime(3200, now);

      this.laserNoiseGain = this.ctx.createGain();
      this.laserNoiseGain.gain.setValueAtTime(0.001, now);
      this.laserNoiseGain.gain.linearRampToValueAtTime(0.035, now + 0.05);

      this.laserNoiseSource.connect(noiseFilter);
      noiseFilter.connect(this.laserNoiseGain);
      this.laserNoiseGain.connect(this.ctx.destination);
      this.laserNoiseSource.start(now);
    } catch {}
  }

  // Modulate laser intensity while cutting
  public updateLaserIntensity(freqOffset = 0) {
    if (!this.ctx || !this.laserOsc) return;
    try {
      const now = this.ctx.currentTime;
      const targetFreq = 1420 + Math.sin(now * 35) * 160 + freqOffset;
      this.laserOsc.frequency.setTargetAtTime(targetFreq, now, 0.03);
    } catch {}
  }

  // Turn off laser with dry thermal cooling pulse (Pulso seco de enfriamiento térmico)
  public stopLaserCutting() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    try {
      if (this.laserGain) {
        this.laserGain.gain.linearRampToValueAtTime(0.0001, now + 0.04);
      }
      if (this.laserNoiseGain) {
        this.laserNoiseGain.gain.linearRampToValueAtTime(0.0001, now + 0.04);
      }

      setTimeout(() => {
        if (this.laserOsc) {
          try {
            this.laserOsc.stop();
            this.laserOsc.disconnect();
          } catch {}
          this.laserOsc = null;
        }
        if (this.laserNoiseSource) {
          try {
            this.laserNoiseSource.stop();
            this.laserNoiseSource.disconnect();
          } catch {}
          this.laserNoiseSource = null;
        }
        this.laserGain = null;
        this.laserFilter = null;
        this.laserNoiseGain = null;
      }, 50);

      // Dry thermal quench snap (descending high-tech click)
      const quenchOsc = this.ctx.createOscillator();
      const quenchGain = this.ctx.createGain();
      quenchOsc.type = 'sine';
      quenchOsc.frequency.setValueAtTime(3800, now);
      quenchOsc.frequency.exponentialRampToValueAtTime(420, now + 0.06);

      quenchGain.gain.setValueAtTime(0.12, now);
      quenchGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      quenchOsc.connect(quenchGain);
      quenchGain.connect(this.ctx.destination);
      quenchOsc.start(now);
      quenchOsc.stop(now + 0.06);
    } catch {
      this.laserOsc = null;
      this.laserNoiseSource = null;
      this.laserGain = null;
      this.laserFilter = null;
      this.laserNoiseGain = null;
    }
  }

  // 9. Tour Step Holographic HUD Chime
  public playTourStepChime(stepIndex = 0) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const baseFreq = 700 + stepIndex * 90;

      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(baseFreq, now);
      osc1.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.08);

      gain1.gain.setValueAtTime(0.09, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.09);
    } catch {}
  }



  // 10. V8 Engine Rumble & Acceleration Synthesizer (Ford 390 V8 Big-Block)
  private engineOsc1: OscillatorNode | null = null;
  private engineOsc2: OscillatorNode | null = null;
  private engineOscSub: OscillatorNode | null = null;
  private engineBurbleOsc: OscillatorNode | null = null;
  private engineBurbleGain: GainNode | null = null;
  private engineFilter: BiquadFilterNode | null = null;
  private engineGain: GainNode | null = null;

  public startEngineRumble() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx || this.engineOsc1) return;

    try {
      const now = this.ctx.currentTime;
      this.engineOsc1 = this.ctx.createOscillator();
      this.engineOsc2 = this.ctx.createOscillator();
      this.engineOscSub = this.ctx.createOscillator();
      this.engineBurbleOsc = this.ctx.createOscillator();
      this.engineBurbleGain = this.ctx.createGain();
      this.engineFilter = this.ctx.createBiquadFilter();
      this.engineGain = this.ctx.createGain();

      // Fundamental firing frequency: ~14.5 Hz idle firing pulse * 2 for V8
      this.engineOsc1.type = 'sawtooth';
      this.engineOsc1.frequency.setValueAtTime(34, now);

      // Second harmonic with triangle warmth
      this.engineOsc2.type = 'triangle';
      this.engineOsc2.frequency.setValueAtTime(68, now);

      // Sub-bass exhaust throb (deep chest rumble)
      this.engineOscSub.type = 'sine';
      this.engineOscSub.frequency.setValueAtTime(17, now);

      // Lumpy camshaft lope modulator (7.2 Hz cross-plane cam lope)
      this.engineBurbleOsc.type = 'sine';
      this.engineBurbleOsc.frequency.setValueAtTime(7.2, now);
      this.engineBurbleGain.gain.setValueAtTime(8.5, now);

      this.engineBurbleOsc.connect(this.engineOsc1.frequency);

      // Lowpass resonant exhaust muffler curve
      this.engineFilter.type = 'lowpass';
      this.engineFilter.frequency.setValueAtTime(185, now);
      this.engineFilter.Q.setValueAtTime(2.8, now);

      this.engineGain.gain.setValueAtTime(0.001, now);
      this.engineGain.gain.linearRampToValueAtTime(0.14, now + 0.15);

      this.engineOsc1.connect(this.engineFilter);
      this.engineOsc2.connect(this.engineFilter);
      this.engineOscSub.connect(this.engineFilter);
      this.engineFilter.connect(this.engineGain);
      this.engineGain.connect(this.ctx.destination);

      this.engineOsc1.start(now);
      this.engineOsc2.start(now);
      this.engineOscSub.start(now);
      this.engineBurbleOsc.start(now);
    } catch {}
  }

  public updateEngineRPM(rpmFactor: number) {
    if (!this.ctx || !this.engineOsc1 || !this.engineOsc2 || !this.engineFilter || !this.engineBurbleOsc) return;
    try {
      const now = this.ctx.currentTime;
      // Idle 34Hz up to 105Hz under full throttle
      const freq1 = 34 + rpmFactor * 72;
      const freq2 = 68 + rpmFactor * 144;
      const subFreq = 17 + rpmFactor * 36;
      const cutoff = 185 + rpmFactor * 480;
      const lopeRate = 7.2 + rpmFactor * 14.0;

      this.engineOsc1.frequency.setTargetAtTime(freq1, now, 0.04);
      this.engineOsc2.frequency.setTargetAtTime(freq2, now, 0.04);
      if (this.engineOscSub) this.engineOscSub.frequency.setTargetAtTime(subFreq, now, 0.04);
      this.engineFilter.frequency.setTargetAtTime(cutoff, now, 0.04);
      this.engineBurbleOsc.frequency.setTargetAtTime(lopeRate, now, 0.04);
    } catch {}
  }

  public stopEngineRumble() {
    if (!this.ctx || !this.engineGain) return;
    const now = this.ctx.currentTime;
    try {
      this.engineGain.gain.linearRampToValueAtTime(0.0001, now + 0.2);
      setTimeout(() => {
        if (this.engineOsc1) {
          try { this.engineOsc1.stop(); this.engineOsc1.disconnect(); } catch {}
          this.engineOsc1 = null;
        }
        if (this.engineOsc2) {
          try { this.engineOsc2.stop(); this.engineOsc2.disconnect(); } catch {}
          this.engineOsc2 = null;
        }
        if (this.engineOscSub) {
          try { this.engineOscSub.stop(); this.engineOscSub.disconnect(); } catch {}
          this.engineOscSub = null;
        }
        if (this.engineBurbleOsc) {
          try { this.engineBurbleOsc.stop(); this.engineBurbleOsc.disconnect(); } catch {}
          this.engineBurbleOsc = null;
        }
        this.engineBurbleGain = null;
        this.engineGain = null;
        this.engineFilter = null;
      }, 220);
    } catch {}
  }

  // 12. Melodía Festiva "Happy Birthday to You" (Web Audio API Procedural Music Box / Sweet Bell)
  private birthdayTimers: number[] = [];
  private birthdayIsPlaying = false;

  public playHappyBirthday() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    this.stopHappyBirthday();
    this.birthdayIsPlaying = true;

    // Frecuencias exactas en Hz (Tonalidad Fa Mayor)
    const C4 = 261.63; // Do
    const D4 = 293.66; // Re
    const E4 = 329.63; // Mi
    const F4 = 349.23; // Fa
    const G4 = 392.00; // Sol
    const A4 = 440.00; // La
    const Bb4 = 466.16; // Sib
    const C5 = 523.25; // Do agudo (Do^8)

    // Partitura canónica exacta de "Happy Birthday to You":
    // 1. Do - Do - Re - Do - Fa - Mi
    // 2. Do - Do - Re - Do - Sol - Fa
    // 3. Do - Do - Do^8 - La - Fa - Mi - Re
    // 4. Sib - Sib - La - Fa - Sol - Fa
    const score: Array<[number, number]> = [
      // Frase 1: Hap-py Birth-day to you (Do-Do-Re-Do-Fa-Mi)
      [C4, 0.32], [C4, 0.20], [D4, 0.54], [C4, 0.54], [F4, 0.54], [E4, 1.05],
      // Frase 2: Hap-py Birth-day to you (Do-Do-Re-Do-Sol-Fa)
      [C4, 0.32], [C4, 0.20], [D4, 0.54], [C4, 0.54], [G4, 0.54], [F4, 1.05],
      // Frase 3: Hap-py Birth-day dear Da-vid (Do-Do-Do^8-La-Fa-Mi-Re)
      [C4, 0.32], [C4, 0.20], [C5, 0.58], [A4, 0.54], [F4, 0.50], [E4, 0.50], [D4, 0.98],
      // Frase 4: Hap-py Birth-day to you! (Sib-Sib-La-Fa-Sol-Fa)
      [Bb4, 0.34], [Bb4, 0.20], [A4, 0.54], [F4, 0.54], [G4, 0.60], [F4, 1.35],
    ];

    let noteDelay = 0;
    const tempoMultiplier = 1.05;

    score.forEach(([freq, duration]) => {
      const durSec = duration * tempoMultiplier;
      const t = window.setTimeout(() => {
        if (!this.birthdayIsPlaying) return;
        this.playMusicBoxNote(freq, durSec);
      }, noteDelay * 1000);
      this.birthdayTimers.push(t);
      noteDelay += durSec;
    });

    // Acorde festivo en arpegio brillante de Fa Mayor al terminar la melodía
    const chordTime = noteDelay * 1000 + 380;
    const tChord = window.setTimeout(() => {
      if (!this.birthdayIsPlaying) return;
      this.playCelebrationChord();
    }, chordTime);
    this.birthdayTimers.push(tChord);

    // Bucle festivo suave para celebrar sin interrupción
    const loopTime = chordTime + 2800;
    const tLoop = window.setTimeout(() => {
      if (this.birthdayIsPlaying) {
        this.playHappyBirthday();
      }
    }, loopTime);
    this.birthdayTimers.push(tLoop);
  }

  // Backward compatibility alias for Happy Birthday
  public playLasMananitas() {
    this.playHappyBirthday();
  }

  // Nota de caja musical / campanilla dulce sintetizada con osciladores armónicos
  private playMusicBoxNote(freq: number, duration: number) {
    if (!this.ctx || !this.enabled) return;
    try {
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, now);

      // Armónico superior para brillo de campanilla
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.14, now + 0.008); // ataque suave
      gain.gain.exponentialRampToValueAtTime(0.0001, now + Math.max(0.25, duration * 1.5)); // caída suave

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration * 1.6);
      osc2.stop(now + duration * 1.6);
    } catch {}
  }

  // Acorde festivo en arpegio brillante de Fa Mayor
  private playCelebrationChord() {
    if (!this.ctx || !this.enabled) return;
    const notes = [174.61, 261.63, 349.23, 440.00, 523.25, 698.46, 880.00, 1046.50];
    notes.forEach((freq, idx) => {
      const t = window.setTimeout(() => {
        if (!this.birthdayIsPlaying) return;
        this.playMusicBoxNote(freq, 2.0);
      }, idx * 80);
      this.birthdayTimers.push(t);
    });
  }

  public stopHappyBirthday() {
    this.birthdayIsPlaying = false;
    this.birthdayTimers.forEach((t) => clearTimeout(t));
    this.birthdayTimers = [];
  }

  public stopLasMananitas() {
    this.stopHappyBirthday();
  }
}

export const sound = new HolographicAudioEngine();


// Web Audio API Synthesizer for high-energy workout cues, 3-beep interval warnings & BPM pacer

class WorkoutAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private pacerInterval: number | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.pacerInterval) {
      this.stopPacer();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Single clean interval beep
  public playBeep(frequency: number = 880, duration: number = 0.15, gainLevel: number = 0.3) {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      
      gain.gain.setValueAtTime(gainLevel, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration + 0.01);
    } catch {
      // Fallback
    }
  }

  // Plays 3 consecutive beeps in rapid succession (ideal for interval change signaling)
  public playThreeConsecutiveBeeps(baseFreq: number = 880) {
    if (this.isMuted) return;
    const delays = [0, 180, 360];
    const freqs = [baseFreq, baseFreq, baseFreq * 1.25]; // slightly higher pitch on 3rd beep
    
    delays.forEach((delay, idx) => {
      setTimeout(() => {
        this.playBeep(freqs[idx], 0.12, 0.35);
      }, delay);
    });
  }

  // Countdown tick at 3, 2, 1 seconds before interval transition
  public playCountdownTick(pitch: number = 880) {
    this.playBeep(pitch, 0.14, 0.3);
  }

  // High explosive WORK start cue
  public playWorkStartCue() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc1.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.25); // C6

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
      osc2.frequency.exponentialRampToValueAtTime(1318.5, ctx.currentTime + 0.25); // E6

      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.42);
      osc2.stop(ctx.currentTime + 0.42);
    } catch {
      // Ignore
    }
  }

  // Deep relaxed REST cue
  public playRestCue() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(293.66, ctx.currentTime + 0.35); // D4

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.52);
    } catch {
      // Ignore
    }
  }

  // Triumphant workout complete fanfare
  public playVictoryFanfare() {
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C E G C
    notes.forEach((freq, i) => {
      setTimeout(() => {
        try {
          const ctx = this.getContext();
          if (!ctx) return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0.25, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.32);
        } catch {
          // Ignore
        }
      }, i * 120);
    });
  }

  // Rep / Beat Pacer
  public startPacer(bpm: number = 150) {
    this.stopPacer();
    if (this.isMuted) return;
    const intervalMs = (60 / bpm) * 1000;
    this.pacerInterval = window.setInterval(() => {
      this.playBeep(980, 0.08, 0.2);
    }, intervalMs);
  }

  public stopPacer() {
    if (this.pacerInterval) {
      clearInterval(this.pacerInterval);
      this.pacerInterval = null;
    }
  }
}

export const workoutAudio = new WorkoutAudioEngine();

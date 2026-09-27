class VedicAudioEngine {
  private ctx: AudioContext | null = null;
  private oscillator: OscillatorNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private gain: GainNode | null = null;

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  playDrone() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      this.stopDrone();

      const t = this.ctx.currentTime;
      this.oscillator = this.ctx.createOscillator();
      this.subOsc = this.ctx.createOscillator();
      this.gain = this.ctx.createGain();

      // Fundamental Vedic Earth OM frequency: 136.1 Hz
      this.oscillator.type = "sine";
      this.oscillator.frequency.setValueAtTime(136.1, t);

      // Warm overtone: 272.2 Hz
      this.subOsc.type = "triangle";
      this.subOsc.frequency.setValueAtTime(272.2, t);

      this.gain.gain.setValueAtTime(0.0001, t);
      this.gain.gain.exponentialRampToValueAtTime(0.09, t + 1.2);

      this.oscillator.connect(this.gain);
      this.subOsc.connect(this.gain);
      this.gain.connect(this.ctx.destination);

      this.oscillator.start();
      this.subOsc.start();
    } catch {
      // Autoplay/audio policy safe handling
    }
  }

  stopDrone() {
    try {
      if (this.gain && this.ctx) {
        const t = this.ctx.currentTime;
        this.gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
        const osc = this.oscillator;
        const sub = this.subOsc;
        setTimeout(() => {
          osc?.stop();
          osc?.disconnect();
          sub?.stop();
          sub?.disconnect();
        }, 650);
        this.oscillator = null;
        this.subOsc = null;
      }
    } catch {
      this.oscillator = null;
      this.subOsc = null;
    }
  }
}

export const audioEngine = new VedicAudioEngine();

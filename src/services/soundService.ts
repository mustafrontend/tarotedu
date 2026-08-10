class SoundService {
  private audioCtx: AudioContext | null = null
  private ambientInterval: any = null
  private activeTrackId: string | null = null

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass()
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume()
    }
    return this.audioCtx
  }

  public playCardFlip(): void {
    try {
      const ctx = this.getAudioContext()
      if (!ctx) return

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(180, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.12)

      gain.gain.setValueAtTime(0.3, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.12)
    } catch (e) {
      console.warn('[SoundService] Audio error:', e)
    }
  }

  public playMysticChime(): void {
    try {
      const ctx = this.getAudioContext()
      if (!ctx) return

      const freqs = [528, 660, 792, 1056]
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08)

        gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.08)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.6)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(ctx.currentTime + idx * 0.08)
        osc.stop(ctx.currentTime + idx * 0.08 + 0.6)
      })
    } catch (e) {
      console.warn('[SoundService] Audio error:', e)
    }
  }

  public playClick(): void {
    try {
      const ctx = this.getAudioContext()
      if (!ctx) return

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(400, ctx.currentTime)

      gain.gain.setValueAtTime(0.15, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.05)
    } catch (e) {
      console.warn('[SoundService] Audio error:', e)
    }
  }

  /**
   * Soothing Periodic Meditation Bell & Chime Generator
   * Plays a relaxing 528Hz/432Hz bell strike, lets it fade into silence, waits, then repeats gently.
   */
  public triggerRelaxingBellStrike(freq: number): void {
    try {
      const ctx = this.getAudioContext()
      if (!ctx) return

      // Primary Tibetan Bowl Tone
      const osc1 = ctx.createOscillator()
      const gain1 = ctx.createGain()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(freq, ctx.currentTime)

      // Soft Bell Attack & Gentle Decay (Fade over 3.2s)
      gain1.gain.setValueAtTime(0.25, ctx.currentTime)
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.2)

      // Warm Octave Sub-Harmonic (Warmth)
      const osc2 = ctx.createOscillator()
      const gain2 = ctx.createGain()
      osc2.type = 'triangle'
      osc2.frequency.setValueAtTime(freq / 2, ctx.currentTime)
      gain2.gain.setValueAtTime(0.1, ctx.currentTime)
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.2)

      osc1.connect(gain1)
      gain1.connect(ctx.destination)

      osc2.connect(gain2)
      gain2.connect(ctx.destination)

      osc1.start(ctx.currentTime)
      osc2.start(ctx.currentTime)

      osc1.stop(ctx.currentTime + 3.2)
      osc2.stop(ctx.currentTime + 3.2)
    } catch (e) {
      console.warn('[SoundService] Bell strike error:', e)
    }
  }

  public startAmbientLoop(trackId: string, baseFreq: number): void {
    this.stopAmbientLoop()
    this.activeTrackId = trackId

    // Play first relaxing chime immediately
    this.triggerRelaxingBellStrike(baseFreq)

    // Repeat gentle chime every 4.8 seconds for a serene meditation rhythm
    this.ambientInterval = setInterval(() => {
      this.triggerRelaxingBellStrike(baseFreq)
    }, 4800)
  }

  public stopAmbientLoop(): void {
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval)
      this.ambientInterval = null
    }
    this.activeTrackId = null
  }

  public getActiveTrackId(): string | null {
    return this.activeTrackId
  }
}

export const soundService = new SoundService()

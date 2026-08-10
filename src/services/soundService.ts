class SoundService {
  private audioCtx: AudioContext | null = null
  private masterGain: GainNode | null = null
  private ambientInterval: any = null
  private activeTrackId: string | null = null
  private isUnlocked = false
  private silentAudioElem: HTMLAudioElement | null = null
  private activeNodes: Array<{ osc: OscillatorNode; gain: GainNode }> = []

  // 0.1 sec silent WAV data URI to force iOS Hardware Audio Session active (Bypasses iOS Silent Switch Mute)
  private SILENT_AUDIO_URI =
    'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA=='

  constructor() {
    if (typeof window !== 'undefined') {
      const unlock = () => {
        this.unlockAudioOnUserInteraction()
        if (this.isUnlocked) {
          window.removeEventListener('touchstart', unlock)
          window.removeEventListener('touchend', unlock)
          window.removeEventListener('click', unlock)
        }
      }
      window.addEventListener('touchstart', unlock, { passive: true })
      window.addEventListener('touchend', unlock, { passive: true })
      window.addEventListener('click', unlock, { passive: true })
    }
  }

  public unlockAudioOnUserInteraction(): void {
    try {
      // 1. Play silent HTML5 Audio element to activate iOS Hardware Audio Session
      if (typeof window !== 'undefined') {
        if (!this.silentAudioElem) {
          this.silentAudioElem = new Audio(this.SILENT_AUDIO_URI)
        }
        this.silentAudioElem.play().catch(() => {})
      }

      // 2. Unlock WebAudio AudioContext
      const ctx = this.getAudioContext()
      if (ctx) {
        if (ctx.state === 'suspended') {
          ctx.resume()
        }
        const buffer = ctx.createBuffer(1, 1, 22050)
        const source = ctx.createBufferSource()
        source.buffer = buffer
        if (this.masterGain) {
          source.connect(this.masterGain)
        } else {
          source.connect(ctx.destination)
        }
        source.start(0)
      }
      this.isUnlocked = true
    } catch (e) {
      console.warn('[SoundService] Audio unlock error:', e)
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass()
        this.masterGain = this.audioCtx.createGain()
        this.masterGain.gain.setValueAtTime(1.0, this.audioCtx.currentTime)
        this.masterGain.connect(this.audioCtx.destination)
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume()
    }
    return this.audioCtx
  }

  public playCardFlip(): void {
    try {
      this.unlockAudioOnUserInteraction()
      const ctx = this.getAudioContext()
      if (!ctx || !this.masterGain) return

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(180, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.12)

      gain.gain.setValueAtTime(0.3, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12)

      osc.connect(gain)
      gain.connect(this.masterGain)

      osc.start()
      osc.stop(ctx.currentTime + 0.12)
    } catch (e) {
      console.warn('[SoundService] Audio error:', e)
    }
  }

  public playMysticChime(): void {
    try {
      this.unlockAudioOnUserInteraction()
      const ctx = this.getAudioContext()
      if (!ctx || !this.masterGain) return

      const freqs = [528, 660, 792, 1056]
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08)

        gain.gain.setValueAtTime(0.25, ctx.currentTime + idx * 0.08)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.6)

        osc.connect(gain)
        gain.connect(this.masterGain!)

        osc.start(ctx.currentTime + idx * 0.08)
        osc.stop(ctx.currentTime + idx * 0.08 + 0.6)
      })
    } catch (e) {
      console.warn('[SoundService] Audio error:', e)
    }
  }

  public playClick(): void {
    try {
      this.unlockAudioOnUserInteraction()
      const ctx = this.getAudioContext()
      if (!ctx || !this.masterGain) return

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(400, ctx.currentTime)

      gain.gain.setValueAtTime(0.2, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05)

      osc.connect(gain)
      gain.connect(this.masterGain)

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
      this.unlockAudioOnUserInteraction()
      const ctx = this.getAudioContext()
      if (!ctx || !this.masterGain) return

      const now = ctx.currentTime

      // Primary Tibetan Bowl Tone
      const osc1 = ctx.createOscillator()
      const gain1 = ctx.createGain()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(freq, now)

      // Soft Bell Attack & Gentle Decay (Fade over 3.2s)
      gain1.gain.setValueAtTime(0.35, now)
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 3.2)

      // Warm Octave Sub-Harmonic (Warmth)
      const osc2 = ctx.createOscillator()
      const gain2 = ctx.createGain()
      osc2.type = 'triangle'
      osc2.frequency.setValueAtTime(freq / 2, now)
      gain2.gain.setValueAtTime(0.15, now)
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 3.2)

      osc1.connect(gain1)
      gain1.connect(this.masterGain)

      osc2.connect(gain2)
      gain2.connect(this.masterGain)

      osc1.start(now)
      osc2.start(now)

      osc1.stop(now + 3.2)
      osc2.stop(now + 3.2)

      // Track active nodes for instant emergency stop
      this.activeNodes.push({ osc: osc1, gain: gain1 }, { osc: osc2, gain: gain2 })

      // Clean up reference after sound stops
      setTimeout(() => {
        this.activeNodes = this.activeNodes.filter(
          (node) => node.osc !== osc1 && node.osc !== osc2
        )
      }, 3300)
    } catch (e) {
      console.warn('[SoundService] Bell strike error:', e)
    }
  }

  public startAmbientLoop(trackId: string, baseFreq: number): void {
    this.unlockAudioOnUserInteraction()
    this.stopAmbientLoop()

    const ctx = this.getAudioContext()
    if (this.masterGain && ctx) {
      try {
        this.masterGain.gain.cancelScheduledValues(ctx.currentTime)
        this.masterGain.gain.setValueAtTime(1.0, ctx.currentTime)
      } catch (e) {}
    }

    this.activeTrackId = trackId

    // Play first relaxing chime immediately
    this.triggerRelaxingBellStrike(baseFreq)

    // Repeat gentle chime every 4.8 seconds for a serene meditation rhythm
    this.ambientInterval = setInterval(() => {
      this.triggerRelaxingBellStrike(baseFreq)
    }, 4800)
  }

  public stopAmbientLoop(): void {
    // 1. Clear interval
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval)
      this.ambientInterval = null
    }

    // 2. Instantly mute master gain
    if (this.masterGain && this.audioCtx) {
      try {
        this.masterGain.gain.cancelScheduledValues(this.audioCtx.currentTime)
        this.masterGain.gain.setValueAtTime(0, this.audioCtx.currentTime)
      } catch (e) {}
    }

    // 3. Stop & disconnect all playing oscillator nodes
    this.activeNodes.forEach(({ osc, gain }) => {
      try {
        gain.gain.cancelScheduledValues(0)
        gain.gain.setValueAtTime(0, 0)
        osc.stop(0)
        osc.disconnect()
      } catch (e) {}
    })
    this.activeNodes = []

    // 4. Pause silent audio
    if (this.silentAudioElem) {
      try {
        this.silentAudioElem.pause()
        this.silentAudioElem.currentTime = 0
      } catch (e) {}
    }

    this.activeTrackId = null
  }

  public getActiveTrackId(): string | null {
    return this.activeTrackId
  }
}

export const soundService = new SoundService()

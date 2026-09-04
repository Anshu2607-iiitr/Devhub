// Web Audio API sound synthesizer for AuctionHub with iconic "FAAAAAAAAAAAAAAAAH" vocal/stadium horn

let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * The Iconic Resounding "FAAAAAAAAAAAAAAAAH!" Vocal & Stadium Brass Horn Synthesizer
 */
export function playFaahSound(intensity = 1.0, duration = 1.2) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // --- PHASE 1: The "Fffff" unvoiced fricative attack (0.0s - 0.12s) ---
    const fBufferSize = Math.floor(ctx.sampleRate * 0.12);
    const fBuffer = ctx.createBuffer(1, fBufferSize, ctx.sampleRate);
    const fData = fBuffer.getChannelData(0);
    for (let i = 0; i < fBufferSize; i++) {
      fData[i] = (Math.random() * 2 - 1) * Math.sin((i / fBufferSize) * Math.PI);
    }
    const fNoise = ctx.createBufferSource();
    fNoise.buffer = fBuffer;

    const fFilter = ctx.createBiquadFilter();
    fFilter.type = 'bandpass';
    fFilter.frequency.setValueAtTime(4500, now);
    fFilter.Q.setValueAtTime(1.5, now);

    const fGain = ctx.createGain();
    fGain.gain.setValueAtTime(0.001, now);
    fGain.gain.exponentialRampToValueAtTime(0.35 * intensity, now + 0.04);
    fGain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    fNoise.connect(fFilter);
    fFilter.connect(fGain);
    fGain.connect(ctx.destination);

    fNoise.start(now);
    fNoise.stop(now + 0.14);

    // --- PHASE 2: The Resonant "AAAAAAAAAAAAAAAH" Vowel & Stadium Brass (0.05s - 1.2s) ---
    const fundFreq = 220; // A3 root pitch with harmonic overtones
    const chordFrequencies = [fundFreq, fundFreq * 1.5, fundFreq * 2.0, fundFreq * 2.5, fundFreq * 0.5]; // Rich brass choir

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.linearRampToValueAtTime(0.55 * intensity, now + 0.08); // explosive onset
    masterGain.gain.setValueAtTime(0.55 * intensity, now + duration * 0.6); // sustained "AAAAAH"
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    // Formant 1: ~750Hz (Open 'Ah' vowel vocal tract resonance)
    const formant1 = ctx.createBiquadFilter();
    formant1.type = 'peaking';
    formant1.frequency.setValueAtTime(780, now);
    formant1.Q.setValueAtTime(3.0, now);
    formant1.gain.setValueAtTime(12, now);

    // Formant 2: ~1250Hz (Throat vowel resonance)
    const formant2 = ctx.createBiquadFilter();
    formant2.type = 'peaking';
    formant2.frequency.setValueAtTime(1280, now);
    formant2.Q.setValueAtTime(3.5, now);
    formant2.gain.setValueAtTime(10, now);

    // Lowpass warmth
    const lpFilter = ctx.createBiquadFilter();
    lpFilter.type = 'lowpass';
    lpFilter.frequency.setValueAtTime(3800, now);

    chordFrequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
      
      // Slight pitch bend downwards as human voice drops at end of "FAAAAH"
      osc.frequency.setValueAtTime(freq * 1.05, now + 0.04);
      osc.frequency.exponentialRampToValueAtTime(freq, now + 0.15);
      osc.frequency.linearRampToValueAtTime(freq * 0.94, now + duration);

      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0.3 / chordFrequencies.length, now);

      osc.connect(oscGain);
      oscGain.connect(formant1);

      osc.start(now + 0.04);
      osc.stop(now + duration + 0.05);
    });

    formant1.connect(formant2);
    formant2.connect(lpFilter);
    lpFilter.connect(masterGain);
    masterGain.connect(ctx.destination);

  } catch (e) {
    // Web audio gestures handled silently
  }
}

export function playBidSound() {
  playFaahSound(0.9, 0.9);
}

export function playGavelSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Strike 1: Heavy wooden mallet impact
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);

    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    // Noise buffer for wooden crack
    const bufferSize = Math.floor(ctx.sampleRate * 0.1);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.02));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.5, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);
    noise.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    osc.start(now);
    noise.start(now);
    osc.stop(now + 0.4);
    noise.stop(now + 0.4);
  } catch (e) {}
}

export function playTickSound(urgent = false) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(urgent ? 980 : 700, now);

    gain.gain.setValueAtTime(urgent ? 0.25 : 0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + (urgent ? 0.08 : 0.05));

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  } catch (e) {}
}

export function playSoldFanfare() {
  // Ultra Grand Extended FAAAAAAAAAAAAAAAH on SOLD
  playFaahSound(1.2, 1.8);
}

export function playUnsoldBuzzer() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(140, now + 0.4);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.45);
  } catch (e) {}
}

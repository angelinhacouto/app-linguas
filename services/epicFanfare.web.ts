/** Fanfarra épica via Web Audio — precisa de toque do usuário */
let sharedCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!sharedCtx || sharedCtx.state === 'closed') {
    sharedCtx = new AudioCtx();
  }
  return sharedCtx;
}

export async function playEpicFanfare(): Promise<boolean> {
  const ctx = getCtx();
  if (!ctx) return false;

  try {
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
  } catch {
    return false;
  }

  const now = ctx.currentTime + 0.02;

  // Intro dramática (timpani + brass)
  playTone(ctx, 55, 'sine', now, 0.9, 0.45, 0.55);
  playTone(ctx, 110, 'triangle', now + 0.05, 0.7, 0.4, 0.35);
  playNoise(ctx, now, 0.35, 0.25);

  // Fanfarra ascendente
  const melody = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99];
  melody.forEach((freq, i) => {
    const t = now + 0.35 + i * 0.18;
    playTone(ctx, freq, 'sawtooth', t, 0.55, 0.55, 0.28);
    playTone(ctx, freq * 2, 'triangle', t, 0.35, 0.45, 0.12);
    playTone(ctx, freq / 2, 'sine', t, 0.4, 0.5, 0.2);
  });

  // Acorde final heróico
  const finale = now + 1.55;
  [261.63, 329.63, 392.0, 523.25].forEach((freq) => {
    playTone(ctx, freq, 'sawtooth', finale, 0.7, 1.4, 0.22);
    playTone(ctx, freq * 2, 'triangle', finale, 0.5, 1.2, 0.1);
  });
  playNoise(ctx, finale, 0.6, 0.2);
  playTone(ctx, 65.41, 'sine', finale, 0.8, 1.6, 0.45);

  return true;
}

function playTone(
  ctx: AudioContext,
  freq: number,
  type: OscillatorType,
  start: number,
  peak: number,
  duration: number,
  volume: number
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  const level = Math.min(peak * volume, 0.85);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(Math.max(level, 0.0001), start + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.08);
}

function playNoise(ctx: AudioContext, start: number, duration: number, volume: number) {
  const bufferSize = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  const source = ctx.createBufferSource();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 2500;
  filter.Q.value = 0.7;
  source.buffer = buffer;
  gain.gain.setValueAtTime(Math.min(volume, 0.4), start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(start);
  source.stop(start + duration + 0.05);
}

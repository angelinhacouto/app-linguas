/** Trilha épica sintetizada — funciona no navegador sem arquivo externo */
export function playEpicFanfare(): boolean {
  if (typeof window === 'undefined') return false;

  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

  if (!AudioCtx) return false;

  const ctx = new AudioCtx();

  const now = ctx.currentTime;

  // Baixo épico
  playTone(ctx, 65.41, 'sine', now, 0.35, 2.8, 0.22);
  playTone(ctx, 82.41, 'sine', now + 0.15, 0.3, 2.5, 0.18);

  // Acordes heroicos (Do → Mi → Sol → Do agudo)
  const chords = [261.63, 329.63, 392.0, 523.25];
  chords.forEach((freq, i) => {
    playTone(ctx, freq, i === 3 ? 'triangle' : 'sawtooth', now + 0.1 + i * 0.12, 0.28, 2.2 - i * 0.1, 0.12);
    playTone(ctx, freq * 2, 'square', now + 0.1 + i * 0.12, 0.08, 1.5, 0.04);
  });

  // Cymbal / brilho
  playNoise(ctx, now + 0.05, 0.5, 0.08);
  playNoise(ctx, now + 0.55, 0.8, 0.06);
  playNoise(ctx, now + 1.0, 1.2, 0.05);

  // Fanfarra final
  playTone(ctx, 523.25, 'triangle', now + 1.1, 0.35, 1.8, 0.16);
  playTone(ctx, 659.25, 'triangle', now + 1.25, 0.32, 1.6, 0.14);
  playTone(ctx, 783.99, 'triangle', now + 1.4, 0.3, 2.0, 0.12);

  window.setTimeout(() => {
    ctx.close().catch(() => undefined);
  }, 3500);

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
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(Math.max(peak * volume, 0.0001), start + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.05);
}

function playNoise(ctx: AudioContext, start: number, duration: number, volume: number) {
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  const source = ctx.createBufferSource();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 4000;
  source.buffer = buffer;
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(start);
  source.stop(start + duration + 0.05);
}

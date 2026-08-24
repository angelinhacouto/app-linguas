import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const PRESETS = {
  ironman: {
    crop: { left: 0, top: 0, width: 377, height: 420 },
    out: 'ironman.png',
    svg: `<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g" cx="50%" cy="42%" r="58%">
          <stop offset="0%" stop-color="#3a1010"/>
          <stop offset="45%" stop-color="#140808"/>
          <stop offset="100%" stop-color="#05070f"/>
        </radialGradient>
        <radialGradient id="glow" cx="50%" cy="46%" r="18%">
          <stop offset="0%" stop-color="#00e5ff" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="#00e5ff" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="512" height="512" fill="url(#g)"/>
      <rect width="512" height="512" fill="url(#glow)"/>
    </svg>`,
  },
  'spider-man': {
    crop: { left: 0, top: 12, width: 273, height: 290 },
    out: 'spider-man.png',
    svg: `<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g" cx="50%" cy="40%" r="58%">
          <stop offset="0%" stop-color="#4a0a0a"/>
          <stop offset="45%" stop-color="#180505"/>
          <stop offset="100%" stop-color="#05070f"/>
        </radialGradient>
        <radialGradient id="glow" cx="50%" cy="38%" r="22%">
          <stop offset="0%" stop-color="#ff5252" stop-opacity="0.28"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="512" height="512" fill="url(#g)"/>
      <rect width="512" height="512" fill="url(#glow)"/>
    </svg>`,
  },
};

async function buildHeroAvatar(heroId, sourcePath) {
  const preset = PRESETS[heroId];
  if (!preset) throw new Error(`Unknown hero preset: ${heroId}`);

  const outs = [
    path.join(root, 'assets', 'heroes', preset.out),
    path.join(root, 'public', 'heroes', preset.out),
  ];

  mkdirSync(path.dirname(outs[0]), { recursive: true });
  mkdirSync(path.dirname(outs[1]), { recursive: true });

  const meta = await sharp(sourcePath).metadata();
  const crop = {
    left: Math.max(0, preset.crop.left),
    top: Math.max(0, preset.crop.top),
    width: Math.min(preset.crop.width, meta.width - preset.crop.left),
    height: Math.min(preset.crop.height, meta.height - preset.crop.top),
  };

  const subject = await sharp(sourcePath)
    .extract(crop)
    .resize(492, 492, { fit: 'cover', position: 'centre' })
    .png()
    .toBuffer();

  const background = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 10, g: 8, b: 18, alpha: 255 },
    },
  })
    .composite([
      { input: Buffer.from(preset.svg), top: 0, left: 0 },
      { input: subject, gravity: 'centre' },
    ])
    .png({ quality: 95 })
    .toBuffer();

  for (const out of outs) {
    writeFileSync(out, background);
    console.log(`✓ ${path.relative(root, out)}`);
  }
}

const heroId = process.argv[2];
const source = process.argv[3];

if (!heroId || !source) {
  console.error('Usage: node process-cinematic-hero.mjs <heroId> <sourceImage>');
  process.exit(1);
}

buildHeroAvatar(heroId, source).catch((err) => {
  console.error(err);
  process.exit(1);
});

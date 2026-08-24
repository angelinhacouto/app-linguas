import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const SOURCE =
  process.argv[2] ??
  path.join(
    root,
    '..',
    '..',
    '..',
    '.cursor',
    'projects',
    'c-Users-angel-OneDrive-Desktop-APPS-APP-Linguas',
    'assets',
    'c__Users_angel_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-1c101680-fba0-4762-8e7c-580716654d9b.png'
  );

const OUTS = [
  path.join(root, 'assets', 'heroes', 'ironman.png'),
  path.join(root, 'public', 'heroes', 'ironman.png'),
];

/** Close-up no capacete + reator — máximo impacto no círculo */
const CROP = { left: 0, top: 0, width: 377, height: 420 };

async function buildIronManAvatar() {
  mkdirSync(path.dirname(OUTS[0]), { recursive: true });
  mkdirSync(path.dirname(OUTS[1]), { recursive: true });

  const subject = await sharp(SOURCE)
    .extract(CROP)
    .resize(492, 492, {
      fit: 'cover',
      position: 'centre',
    })
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
      {
        input: Buffer.from(
          `<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="g" cx="50%" cy="42%" r="58%">
                <stop offset="0%" stop-color="#3a1010"/>
                <stop offset="45%" stop-color="#140808"/>
                <stop offset="100%" stop-color="#05070f"/>
              </radialGradient>
              <radialGradient id="arc" cx="50%" cy="46%" r="18%">
                <stop offset="0%" stop-color="#00e5ff" stop-opacity="0.35"/>
                <stop offset="100%" stop-color="#00e5ff" stop-opacity="0"/>
              </radialGradient>
            </defs>
            <rect width="512" height="512" fill="url(#g)"/>
            <rect width="512" height="512" fill="url(#arc)"/>
          </svg>`
        ),
        top: 0,
        left: 0,
      },
      { input: subject, gravity: 'centre' },
    ])
    .png({ quality: 95 })
    .toBuffer();

  for (const out of OUTS) {
    writeFileSync(out, background);
    console.log(`✓ ${path.relative(root, out)}`);
  }
}

buildIronManAvatar().catch((err) => {
  console.error(err);
  process.exit(1);
});

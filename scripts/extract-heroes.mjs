import sharp from 'sharp';
import { cpSync, mkdirSync, readdirSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const sourceDir = path.join(root, 'assets', 'source');
const publicDir = path.join(root, 'public', 'heroes');
const assetsDir = path.join(root, 'assets', 'heroes');

const COLORS = {
  ironman: { r: 183, g: 28, b: 28 },
  batman: { r: 26, g: 26, b: 46 },
  superman: { r: 21, g: 101, b: 192 },
  'spider-man': { r: 198, g: 40, b: 40 },
  hulk: { r: 46, g: 125, b: 50 },
  thor: { r: 191, g: 54, b: 12 },
  'captain-america': { r: 21, g: 101, b: 192 },
  'wonder-woman': { r: 183, g: 28, b: 28 },
};

/** Cortes focados — Homem de Ferro completo e centralizável no círculo */
const CROPS = [
  { source: '924629e3', box: { left: 395, top: 195, width: 200, height: 310 }, out: 'ironman.png' },
  { source: '924629e3', box: { left: 10, top: 50, width: 200, height: 450 }, out: 'thor.png' },
  { source: '924629e3', box: { left: 215, top: 290, width: 165, height: 240 }, out: 'captain-america.png' },
  { source: 'f3629c00', box: { left: 70, top: 0, width: 175, height: 200 }, out: 'hulk.png' },
  { source: 'f3629c00', box: { left: 90, top: 120, width: 135, height: 130 }, out: 'superman.png' },
  { source: 'f3629c00', box: { left: 85, top: 310, width: 140, height: 130 }, out: 'spider-man.png' },
  { source: 'f264a48f', box: { left: 100, top: 170, width: 160, height: 185 }, out: 'batman.png' },
  { source: '1dd8e5ba', box: { left: 280, top: 20, width: 130, height: 320 }, out: 'wonder-woman.png' },
];

function findSource(prefix) {
  const match = readdirSync(sourceDir).find((f) => f.includes(prefix));
  if (!match) throw new Error(`Source not found: ${prefix}`);
  return path.join(sourceDir, match);
}

function isBgCandidate(r, g, b, a) {
  if (a < 12) return true;
  // preserva brilho azul do reator / olhos
  if (b > 200 && b - Math.min(r, g) > 25) return false;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return max - min < 30 && min > 135;
}

function removeCheckerboard(data, width, height) {
  const visited = new Uint8Array(width * height);
  const stack = [];
  const idx = (x, y) => y * width + x;

  const tryPush = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const i = idx(x, y);
    if (visited[i]) return;
    const o = i * 4;
    if (!isBgCandidate(data[o], data[o + 1], data[o + 2], data[o + 3])) return;
    visited[i] = 1;
    stack.push(i);
  };

  for (let x = 0; x < width; x++) {
    tryPush(x, 0);
    tryPush(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    tryPush(0, y);
    tryPush(width - 1, y);
  }

  while (stack.length) {
    const i = stack.pop();
    data[i * 4 + 3] = 0;
    const x = i % width;
    const y = (i / width) | 0;
    tryPush(x + 1, y);
    tryPush(x - 1, y);
    tryPush(x, y + 1);
    tryPush(x, y - 1);
  }
}

async function alphaTrim(buffer) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({
    resolveWithObject: true,
  });
  let minX = info.width;
  let minY = info.height;
  let maxX = 0;
  let maxY = 0;
  let found = false;

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * 4 + 3] > 16) {
        found = true;
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (!found) return buffer;
  const pad = 10;
  const left = Math.max(0, minX - pad);
  const top = Math.max(0, minY - pad);
  const width = Math.min(info.width - left, maxX - minX + 1 + pad * 2);
  const height = Math.min(info.height - top, maxY - minY + 1 + pad * 2);
  return sharp(buffer).extract({ left, top, width, height }).png().toBuffer();
}

async function saveAvatar(crop) {
  const input = findSource(crop.source);
  const meta = await sharp(input).metadata();
  const left = Math.max(0, crop.box.left);
  const top = Math.max(0, crop.box.top);
  const width = Math.min(crop.box.width, meta.width - left);
  const height = Math.min(crop.box.height, meta.height - top);

  let { data, info } = await sharp(input)
    .extract({ left, top, width, height })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  removeCheckerboard(data, info.width, info.height);

  let subject = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();

  subject = await alphaTrim(subject);

  const sized = await sharp(subject)
    .resize(470, 470, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const id = crop.out.replace('.png', '');
  const out = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 3,
      background: COLORS[id] ?? { r: 26, g: 35, b: 71 },
    },
  })
    .composite([{ input: sized, gravity: 'centre' }])
    .png()
    .toBuffer();

  writeFileSync(path.join(publicDir, crop.out), out);
  writeFileSync(path.join(assetsDir, crop.out), out);
  console.log(`✓ ${crop.out}`);
}

async function main() {
  mkdirSync(publicDir, { recursive: true });
  mkdirSync(assetsDir, { recursive: true });
  for (const crop of CROPS) {
    await saveAvatar(crop);
  }
  console.log('\nAvatares centralizados no círculo!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

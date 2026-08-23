import sharp from 'sharp';
import { mkdir, readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const sourceDir = path.join(root, 'assets', 'source');
const outDir = path.join(root, 'public', 'heroes');

async function findSource(prefix) {
  const files = await readdir(sourceDir);
  const match = files.find((f) => f.includes(prefix));
  if (!match) throw new Error(`Source image not found: ${prefix}`);
  return path.join(sourceDir, match);
}

async function saveCrop(input, box, outputName, size = 512) {
  const meta = await sharp(input).metadata();
  const left = Math.max(0, Math.min(box.left, meta.width - 1));
  const top = Math.max(0, Math.min(box.top, meta.height - 1));
  const width = Math.min(box.width, meta.width - left);
  const height = Math.min(box.height, meta.height - top);

  await sharp(input)
    .extract({ left, top, width, height })
    .resize(size, size, { fit: 'cover', position: 'centre' })
    .png({ compressionLevel: 9 })
    .toFile(path.join(outDir, outputName));

  console.log(`✓ ${outputName}`);
}

const CROPS = [
  { source: '924629e3', box: { left: 398, top: 0, width: 203, height: 620 }, out: 'ironman.png' },
  { source: '924629e3', box: { left: 0, top: 0, width: 235, height: 520 }, out: 'thor.png' },
  { source: '924629e3', box: { left: 215, top: 250, width: 165, height: 220 }, out: 'captain-america.png' },
  { source: 'f3629c00', box: { left: 78, top: 0, width: 160, height: 195 }, out: 'hulk.png' },
  { source: 'f3629c00', box: { left: 95, top: 125, width: 125, height: 120 }, out: 'superman.png' },
  { source: 'f3629c00', box: { left: 90, top: 320, width: 130, height: 120 }, out: 'spider-man.png' },
  { source: 'f264a48f', box: { left: 108, top: 180, width: 145, height: 170 }, out: 'batman.png' },
  { source: '1dd8e5ba', box: { left: 288, top: 28, width: 118, height: 310 }, out: 'wonder-woman.png' },
];

async function main() {
  await mkdir(outDir, { recursive: true });
  for (const crop of CROPS) {
    await saveCrop(await findSource(crop.source), crop.box, crop.out);
  }
  console.log('\n8 avatares prontos!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

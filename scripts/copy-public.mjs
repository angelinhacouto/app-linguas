import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const distDir = path.join(root, 'dist');

function copyDir(src, dest) {
  if (!existsSync(src)) return;
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else cpSync(from, to);
  }
}

if (!existsSync(distDir)) {
  console.error('dist/ não encontrado. Rode expo export primeiro.');
  process.exit(1);
}

copyDir(publicDir, distDir);

const indexPath = path.join(distDir, 'index.html');
if (existsSync(indexPath)) {
  const stamp = Date.now();
  let html = readFileSync(indexPath, 'utf8');
  if (!html.includes('app-version')) {
    html = html.replace('</head>', `  <meta name="app-version" content="${stamp}" />\n  </head>`);
  } else {
    html = html.replace(/content="\d+"/, `content="${stamp}"`);
  }
  html = html.replace(
    /(src="\/_expo\/static\/js\/web\/entry-[^"?]+\.js)(?:\?[^"]*)?(")/,
    `$1?v=${stamp}$2`
  );
  writeFileSync(indexPath, html);
}

console.log('✓ public/ copiado para dist/');

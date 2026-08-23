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
  const html = readFileSync(indexPath, 'utf8');
  const stamp = `<meta name="app-version" content="${Date.now()}" />`;
  if (!html.includes('app-version')) {
    writeFileSync(indexPath, html.replace('</head>', `  ${stamp}\n  </head>`));
  }
}

console.log('✓ public/ copiado para dist/');

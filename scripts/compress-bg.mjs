import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const input = path.join(root, 'public', 'bgImg.png');
const output = path.join(root, 'public', 'bgImg.webp');

if (!fs.existsSync(input)) {
  console.error('public/bgImg.png 없음');
  process.exit(1);
}

await sharp(input).webp({ quality: 80, effort: 6 }).toFile(output);

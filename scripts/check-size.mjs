import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';

const MAX = 150;
const EXT = new Set(['.js', '.jsx', '.ts', '.tsx', '.css']);
const SKIP = new Set(['node_modules', 'dist', 'build', '.git', '.next']);

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    if (SKIP.has(name)) return [];
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

const tooLong = walk('.')
  .filter((f) => EXT.has(extname(f)))
  .map((f) => [f, readFileSync(f, 'utf8').trimEnd().split('\n').length])
  .filter(([, lines]) => lines > MAX);

tooLong.forEach(([f, n]) => console.error(`${f}: ${n} baris (maks ${MAX})`));
process.exit(tooLong.length ? 1 : 0);

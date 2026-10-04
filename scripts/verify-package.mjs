import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
import path from 'node:path';
import { createHash } from 'node:crypto';

const root = fileURLToPath(new URL('../', import.meta.url));
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const checks = path.join(root, '.checks');
await mkdir(checks, { recursive: true });
const env = { ...process.env, npm_config_cache: path.join(checks, 'npm-cache') };
const run = (args, cwd = root) => {
  // cmd is needed only to launch npm.cmd, never for filesystem operations.
  const output = process.platform === 'win32'
    ? execFileSync('cmd.exe', ['/d', '/s', '/c', `${npm} ${args.join(' ')}`], { cwd, env, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
    : execFileSync(npm, args, { cwd, env, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  return output;
};
const [dry] = JSON.parse(run(['pack', '--dry-run', '--json', '--ignore-scripts']));
const allowed = /^(assets\/(png|webp)\/[a-z0-9_]+\.(png|webp)|dist\/(index\.js|index\.d\.ts|native\.cjs|native\.d\.ts)|catalog\.json|package\.json|README\.md|NOTICE\.md|SECURITY\.md|LICENSE|LICENSE-ASSETS|LICENSE-CODE|LICENSES\/CC0-1\.0\.txt)$/;
for (const file of dry.files) assert.match(file.path, allowed, `Unexpected package file: ${file.path}`);
assert.equal(dry.files.filter(file => /^assets\//.test(file.path)).length, 220);
assert.ok(dry.files.some(file => file.path === 'LICENSES/CC0-1.0.txt'));
const consumer = path.join(checks, 'consumer');
await mkdir(consumer, { recursive: true });
const [packed] = JSON.parse(run(['pack', '--json', '--ignore-scripts', '--pack-destination', '.checks']));
await writeFile(path.join(consumer, 'package.json'), JSON.stringify({ name: 'culinary-assets-consumer-test', private: true, type: 'module' }));
run(['install', `../${packed.filename}`, '--ignore-scripts', '--no-audit', '--no-fund', '--offline'], consumer);
const require = createRequire(path.join(consumer, 'package.json'));
const entry = require.resolve('@cosmintrica/culinary-assets');
const mod = await import(pathToFileURL(entry).href);
assert.equal(mod.catalog.length, 110);
assert.equal(mod.getAsset('tomato').id, 'tomato');
assert.equal(mod.getAsset('corkscrew').id, 'corkscrew');
assert.equal(mod.getAsset('rice_cooker').id, 'rice_cooker');
assert.ok(require.resolve('@cosmintrica/culinary-assets/png/tomato.png').endsWith('tomato.png'));
assert.ok(require.resolve('@cosmintrica/culinary-assets/webp/tomato.webp').endsWith('tomato.webp'));
assert.ok(require.resolve('@cosmintrica/culinary-assets/native').endsWith('native.cjs'));
assert.equal(JSON.parse(await readFile(require.resolve('@cosmintrica/culinary-assets/catalog.json'), 'utf8')).length, 110);
for (const asset of mod.catalog) {
  for (const format of ['png', 'webp']) {
    const installed = await readFile(require.resolve(`@cosmintrica/culinary-assets/${format}/${asset.id}.${format}`));
    const original = await readFile(path.join(root, asset[format]));
    assert.equal(createHash('sha256').update(installed).digest('hex'),
      createHash('sha256').update(original).digest('hex'), `Installed image differs: ${asset.id}.${format}`);
  }
}
console.log(`Verified real packed installation: ${dry.files.length} files, ${dry.size} bytes compressed, 220 images, no secrets/logos/build scripts.`);

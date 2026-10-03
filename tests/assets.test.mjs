import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assets, catalog, getAsset } from '../dist/index.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(import.meta.url);
const sharp = require(process.env.SHARP_MODULE || 'sharp');
const pkg = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));

test('54 stable, unique, bilingual metadata entries in all six categories', () => {
  assert.equal(catalog.length, 54);
  assert.equal(new Set(catalog.map(a => a.id)).size, 54);
  assert.equal(new Set(catalog.map(a => a.category)).size, 6);
  for (const asset of catalog) {
    assert.match(asset.id, /^[a-z][a-z0-9_]*$/);
    assert.ok(asset.alt.en.length > 1 && asset.alt.ro.length > 1);
    assert.equal(asset.license, 'CC0-1.0');
    assert.equal(asset.width, 512);
    assert.equal(asset.height, 512);
    assert.ok(Object.isFrozen(asset) && Object.isFrozen(asset.alt));
    assert.equal(getAsset(asset.id).id, asset.id);
    assert.equal(assets[asset.id].src, new URL(`../${asset.webp}`, import.meta.url).href);
  }
  assert.throws(() => getAsset('missing'), RangeError);
  assert.throws(() => getAsset('__proto__'), RangeError);
  assert.ok(Object.isFrozen(assets) && Object.isFrozen(catalog));
});

for (const asset of catalog) {
  test(`${asset.id}: valid 512px alpha PNG and WebP with a visible object`, async () => {
    for (const [format, relative] of [['png', asset.png], ['webp', asset.webp]]) {
      const buffer = await readFile(path.join(root, relative));
      const meta = await sharp(buffer).metadata();
      assert.equal(meta.format, format);
      assert.equal(meta.width, 512);
      assert.equal(meta.height, 512);
      assert.equal(meta.hasAlpha, true);
      const stats = await sharp(buffer).stats();
      assert.equal(stats.channels[3].min, 0);
      assert.equal(stats.channels[3].max, 255);
      assert.ok(stats.channels[3].mean > 8 && stats.channels[3].mean < 235, `Blank or opaque image: ${relative}`);
    }
  });
}

test('native entry uses static PNG requires and has the same catalog', async () => {
  const code = await readFile(path.join(root, 'dist/native.cjs'), 'utf8');
  const loaded = [];
  const module = { exports: {} };
  vm.runInNewContext(code, { module, require: name => {
    if (name === '../catalog.json') return structuredClone(catalog);
    assert.match(name, /^\.\.\/assets\/png\/[a-z][a-z0-9_]*\.png$/);
    loaded.push(name);
    return loaded.length;
  } });
  assert.equal(loaded.length, 54);
  assert.equal(new Set(loaded).size, 54);
  assert.deepEqual(Object.keys(module.exports.nativeAssets).sort(), catalog.map(a => a.id).sort());
  assert.equal(module.exports.catalog.length, 54);
  assert.ok(Object.isFrozen(module.exports.nativeAssets));
});

test('license split is explicit; no runtime deps or installation scripts', async () => {
  assert.equal(pkg.license, '(CC0-1.0 AND MIT)');
  assert.equal(Object.keys(pkg.dependencies || {}).length, 0);
  for (const lifecycle of ['preinstall', 'install', 'postinstall', 'prepare', 'prepublish', 'prepack']) {
    assert.equal(pkg.scripts[lifecycle], undefined);
  }
  assert.match(await readFile(path.join(root, 'LICENSES/CC0-1.0.txt'), 'utf8'), /Public License Fallback/);
  assert.match(await readFile(path.join(root, 'LICENSE-CODE'), 'utf8'), /Permission is hereby granted/);
  assert.match(await readFile(path.join(root, 'NOTICE.md'), 'utf8'), /generated with the built-in OpenAI/);
  for (const format of ['png', 'webp']) {
    const files = await readdir(path.join(root, 'assets', format));
    assert.equal(files.length, 54);
    assert.ok(files.every(name => !/logo|wordmark|symbol|scrappy|fridgechef|key|secret/i.test(name)));
  }
});

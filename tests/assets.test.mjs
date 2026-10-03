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

test('100 stable, unique, bilingual metadata entries in all six categories', () => {
  assert.equal(catalog.length, 100);
  assert.equal(new Set(catalog.map(a => a.id)).size, 100);
  assert.equal(new Set(catalog.map(a => a.category)).size, 6);
  assert.deepEqual(Object.fromEntries(['ingredients', 'produce', 'staples', 'cookware', 'utensils', 'appliances']
    .map(category => [category, catalog.filter(a => a.category === category).length])),
  { ingredients: 18, produce: 26, staples: 19, cookware: 7, utensils: 18, appliances: 12 });
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
      for (const edge of [{ left: 0, top: 0, width: 512, height: 32 },
        { left: 0, top: 480, width: 512, height: 32 },
        { left: 0, top: 32, width: 32, height: 448 },
        { left: 480, top: 32, width: 32, height: 448 }]) {
        const alpha = await sharp(buffer).extract(edge).extractChannel(3).raw().toBuffer();
        assert.ok(alpha.every(value => value === 0), `Object touches outer padding: ${relative}`);
      }
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
  assert.equal(loaded.length, 100);
  assert.equal(new Set(loaded).size, 100);
  assert.deepEqual(Object.keys(module.exports.nativeAssets).sort(), catalog.map(a => a.id).sort());
  assert.equal(module.exports.catalog.length, 100);
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
    assert.equal(files.length, 100);
    assert.ok(files.every(name => !/logo|wordmark|symbol|scrappy|fridgechef|key|secret/i.test(name)));
  }
});

test('Install & license opens an HTML guide, not a Markdown download', async () => {
  const html = await readFile(path.join(root, 'index.html'), 'utf8');
  assert.match(html, /href="guide\.html">Install &amp;? license<|href="guide\.html">Install & license</);
  assert.doesNotMatch(html, /href="README\.md"/);
  const guide = await readFile(path.join(root, 'guide.html'), 'utf8');
  for (const id of ['install', 'web', 'native', 'art-license', 'code-license', 'provenance']) {
    assert.ok(guide.includes(`id="${id}"`), `Missing guide section: ${id}`);
  }
  for (const id of ['npm-command', 'pnpm-command', 'web-example', 'native-example']) {
    assert.ok(guide.includes(`id="${id}"`) && guide.includes(`data-copy="${id}"`));
  }
  assert.match(guide, /id="npm-command">npm install @cosmintrica\/culinary-assets</);
  assert.match(guide, /id="pnpm-command">pnpm add @cosmintrica\/culinary-assets</);
  assert.match(guide, /href="https:\/\/www\.npmjs\.com\/package\/@cosmintrica\/culinary-assets"/);
  assert.doesNotMatch(guide, /npm registry release is pending/);
  const readme = await readFile(path.join(root, 'README.md'), 'utf8');
  assert.match(readme, /npm install @cosmintrica\/culinary-assets/);
  assert.match(readme, /pnpm add @cosmintrica\/culinary-assets/);
});

test('both public pages include the verified creator links', async () => {
  for (const file of ['index.html', 'guide.html']) {
    const html = await readFile(path.join(root, file), 'utf8');
    for (const href of ['https://cosmintrica.ro/', 'https://github.com/cosmintrica', 'https://www.linkedin.com/in/cosmintrica/']) {
      assert.ok(html.includes(`href="${href}"`), `${file} missing ${href}`);
      assert.equal(new URL(href).protocol, 'https:');
    }
  }
  const readme = await readFile(path.join(root, 'README.md'), 'utf8');
  assert.ok(readme.indexOf('https://cosmintrica.github.io/culinary-assets/') < readme.indexOf('100 transparent culinary'));
});

test('46 individual sources supplement, not replace, the original 54 atlas subjects', async () => {
  const sprites = JSON.parse(await readFile(path.join(root, 'sources/sprites.json'), 'utf8'));
  assert.deepEqual(sprites.map(s => s.id), catalog.map(a => a.id));
  assert.ok(sprites.slice(0, 54).every(s => typeof s.atlas === 'string' && s.source === undefined));
  const additions = sprites.slice(54);
  assert.equal(additions.length, 46);
  assert.deepEqual((await readdir(path.join(root, 'sources/individual'))).sort(), additions.map(s => `${s.id}.png`).sort());
  for (const sprite of additions) {
    assert.equal(sprite.source, `sources/individual/${sprite.id}.png`);
    assert.ok(sprite.subject.length > 10);
    const meta = await sharp(path.join(root, sprite.source)).metadata();
    assert.equal(meta.format, 'png');
    assert.equal(meta.width, 1254);
    assert.equal(meta.height, 1254);
    assert.equal(meta.hasAlpha, true);
  }
});

test('guide and README describe the 100-subject release consistently', async () => {
  for (const file of ['README.md', 'index.html', 'guide.html']) {
    const content = await readFile(path.join(root, file), 'utf8');
    assert.match(content, /100 (transparent culinary |illustrations|separate PNGs)/);
    assert.doesNotMatch(content, /54 (illustrations|separate PNGs|static sources|PNGs|metadata entries)/);
  }
  for (const file of ['README.md', 'guide.html']) {
    const content = await readFile(path.join(root, file), 'utf8');
    assert.match(content, /@0\.2\.0/);
    assert.match(content, /tags\/v0\.2\.0\.zip/);
  }
});

test('Reddit launch image is an opaque 100-subject contact sheet, not an asset export', async () => {
  const meta = await sharp(path.join(root, 'docs/social/culinary-assets-100.png')).metadata();
  assert.equal(meta.format, 'png');
  assert.equal(meta.width, 1440);
  assert.equal(meta.height, 1440);
  assert.equal(meta.hasAlpha, false);
  const launch = await readFile(path.join(root, 'docs/reddit-launch.md'), 'utf8');
  assert.match(launch, /AI-generated/);
  assert.match(launch, /only after version 0\.2\.0 is published/);
});

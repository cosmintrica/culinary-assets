import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { catalog } from '../dist/index.js';
import { spriteUrl, sprite2xUrl, sprites, spriteWidth, spriteHeight, tileSize } from '../dist/sprite.js';

const require = createRequire(import.meta.url);
const sharp = require(process.env.SHARP_MODULE || 'sharp');

test('optional sprite entry has all 130 immutable logical coordinates', async () => {
  assert.equal(tileSize, 128);
  assert.equal(spriteWidth, 1664);
  assert.equal(spriteHeight, 1280);
  assert.deepEqual(Object.keys(sprites), catalog.map(asset => asset.id));
  assert.ok(Object.isFrozen(sprites));
  assert.deepEqual(sprites.tomato, { x: 0, y: 0, width: 128, height: 128 });
  const cells = new Set();
  for (const rect of Object.values(sprites)) {
    assert.ok(Object.isFrozen(rect));
    assert.equal(rect.width, tileSize);
    assert.equal(rect.height, tileSize);
    assert.ok(Number.isInteger(rect.x) && Number.isInteger(rect.y));
    assert.ok(rect.x >= 0 && rect.y >= 0);
    assert.ok(rect.x + rect.width <= spriteWidth && rect.y + rect.height <= spriteHeight);
    assert.equal(rect.x % tileSize, 0);
    assert.equal(rect.y % tileSize, 0);
    assert.ok(!cells.has(`${rect.x},${rect.y}`), 'Overlapping tiles');
    cells.add(`${rect.x},${rect.y}`);
  }
  assert.equal(Object.hasOwn(sprites, '__proto__'), false);
  const atlas = JSON.parse(await readFile(new URL('../assets/sprite/atlas.json', import.meta.url), 'utf8'));
  assert.deepEqual(atlas.sprites, sprites);
  assert.equal(atlas.width, spriteWidth);
  assert.equal(atlas.height, spriteHeight);
  assert.equal(atlas.scale2x, 2);
  const main = await readFile(new URL('../dist/index.js', import.meta.url), 'utf8');
  const native = await readFile(new URL('../dist/native.cjs', import.meta.url), 'utf8');
  assert.doesNotMatch(main + native, /assets\/sprite|sprite\.js/);
  const types = await readFile(new URL('../dist/sprite.d.ts', import.meta.url), 'utf8');
  assert.match(types, /Readonly<Record<AssetId, SpriteRect>>/);
});

for (const [url, scale] of [[spriteUrl, 1], [sprite2xUrl, 2]]) {
  test(`transparent ${scale}x atlas contains the matching artwork in every tile`, async () => {
    const bytes = await readFile(fileURLToPath(url));
    const meta = await sharp(bytes).metadata();
    assert.equal(meta.format, 'webp');
    assert.equal(meta.width, spriteWidth * scale);
    assert.equal(meta.height, spriteHeight * scale);
    assert.equal(meta.hasAlpha, true);
    for (const asset of catalog) {
      const rect = sprites[asset.id];
      const crop = await sharp(bytes).extract({ left: rect.x * scale, top: rect.y * scale,
        width: rect.width * scale, height: rect.height * scale }).ensureAlpha().raw().toBuffer();
      const expected = await sharp(fileURLToPath(new URL(`../${asset.png}`, import.meta.url)))
        .resize(tileSize * scale, tileSize * scale).ensureAlpha().raw().toBuffer();
      let alphaDelta = 0;
      let visible = 0;
      for (let index = 3; index < crop.length; index += 4) {
        alphaDelta += Math.abs(crop[index] - expected[index]);
        if (crop[index] > 200) visible++;
      }
      assert.ok(visible > 10, `Empty tile: ${asset.id}`);
      assert.ok(alphaDelta / (crop.length / 4) < 1.5, `Incorrect silhouette: ${asset.id}`);
      // Transparent outer padding also prevents neighboring icons bleeding in CSS.
      const stride = tileSize * scale;
      for (let x = 0; x < stride; x++) {
        assert.equal(crop[x * 4 + 3], 0);
        assert.equal(crop[((stride - 1) * stride + x) * 4 + 3], 0);
      }
    }
  });
}

test('v0.4 sources and public prompts include 20 additions without private paths', async () => {
  const prompts = JSON.parse(await readFile(new URL('../sources/prompts-0.4.json', import.meta.url), 'utf8'));
  assert.equal(prompts.length, 20);
  assert.deepEqual(prompts.map(asset => asset.id), catalog.slice(110).map(asset => asset.id));
  assert.doesNotMatch(JSON.stringify(prompts), /C:\\|Users\\|api[_-]?key|token/i);
  assert.ok(prompts.every(asset => asset.transparentBackground && asset.prompt.includes(asset.subject)));
  const preview = await sharp(fileURLToPath(new URL('../docs/social/culinary-assets-130.png', import.meta.url))).metadata();
  assert.equal(preview.width, 1584);
  assert.equal(preview.height, 1728);
  assert.equal(preview.hasAlpha, false);
});

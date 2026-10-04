# Culinary Assets

**[Live Catalog: cosmintrica.github.io/culinary-assets](https://cosmintrica.github.io/culinary-assets/)**
| **[Install & License](https://cosmintrica.github.io/culinary-assets/guide.html)**
| **[npm Package](https://www.npmjs.com/package/@cosmintrica/culinary-assets)**
| **[Download v0.4.0](https://github.com/cosmintrica/culinary-assets/archive/refs/tags/v0.4.0.zip)**

**130 transparent culinary illustrations. PNG + WebP + optional sprites. CC0 artwork.**

Ingredients, vegetables, fruit, pantry staples, cookware, utensils and appliances in a
consistent coral-and-mint visual direction. Designed for recipe apps, kitchen
inventories, onboarding, educational projects and prototypes.

AI-generated artwork, visually reviewed and exported with transparent backgrounds.
No runtime dependencies, no install scripts, no required attribution for artwork.
See [provenance and limitations](NOTICE.md).

![All 130 Culinary Assets: ingredients, produce, pantry staples, cookware, utensils and appliances](https://raw.githubusercontent.com/cosmintrica/culinary-assets/main/docs/previews/collection.webp)

| Ingredients | Produce & fruit | Pantry staples | Cookware | Utensils | Appliances |
| --- | --- | --- | --- | --- | --- |
| 19 | 32 | 32 | 10 | 20 | 17 |

**New in 0.4.0:** 20 individual illustrations: cooking oils, vinegar, herbs,
spices, a food processor, fryer, toaster, sandwich maker, can opener and baking tins.
An optional typed sprite API includes transparent 1x/2x WebP atlases.
Existing IDs, individual file paths and web/native exports remain compatible.

Use the [live catalog](https://cosmintrica.github.io/culinary-assets/) to search,
preview against light/dark backgrounds and download individual assets. For
offline use, download/clone the repository and open `index.html` in a browser.
No local server is needed. The public catalog is hosted on GitHub Pages.

## Install

Install from the public npm registry. No npm account, token or Git installation
is needed to use the package.

```sh
npm install @cosmintrica/culinary-assets
# or
pnpm add @cosmintrica/culinary-assets
```

For an exact version, add `@0.4.0` to the package name. Commit your lockfile for
reproducible builds. The package ships ready-to-use exports; users do not need
Sharp or a build step.

The tagged GitHub source remains an alternative (requires Git):

```sh
npm install github:cosmintrica/culinary-assets#v0.4.0
```

To use a local checkout:

```sh
npm install /absolute/path/to/culinary-assets
```

## Web / React / Vite

Import just the files you use. This is the most portable option and avoids
including the whole collection in your application bundle.

```jsx
import tomato from '@cosmintrica/culinary-assets/webp/tomato.webp';

export function Ingredient() {
  return <img src={tomato} width={80} height={80} alt="Tomato" />;
}
```

For a dynamic gallery, the web entry provides URLs and bilingual metadata:

```js
import { assets, catalog, getAsset } from '@cosmintrica/culinary-assets';

const tomato = getAsset('tomato');
// tomato.src: WebP URL; tomato.pngSrc: PNG URL
// tomato.alt.en / tomato.alt.ro: accessible labels
// catalog: 130 metadata entries; assets: lookup by stable ID
```

The web entry uses `new URL(..., import.meta.url)`, supported by modern client
bundlers. Some SSR frameworks may need static file imports or copying files to
their public directory; do not use Node `file:` URLs as browser URLs. Plain HTML
can reference copied assets directly, with no JavaScript library.

## Optional Web Sprites

Individual imports remain the default. For a dense icon grid, opt into one
atlas request through a separate entry; the main package does not load it.

```jsx
import {
  spriteUrl, sprite2xUrl, sprites, spriteWidth, spriteHeight, tileSize,
} from '@cosmintrica/culinary-assets/sprite';

const { x, y } = sprites.tomato;
// { x: 0, y: 0, width: 128, height: 128 }
const displaySize = 64;
const scale = displaySize / tileSize;

<span role="img" aria-label="Tomato" style={{
  display: 'inline-block', width: displaySize, height: displaySize,
  backgroundImage: `url("${spriteUrl}")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: `${-x * scale}px ${-y * scale}px`,
  backgroundSize: `${spriteWidth * scale}px ${spriteHeight * scale}px`,
}} />
```

Tiles are 128px on a 1664 x 1280 atlas. For sharper rendering, use
`sprite2xUrl` (3328 x 2560) with **the same CSS geometry**. The 2x image doubles
physical pixels, not the logical coordinates. Individual exports stay 512px.
The smaller default avoids a huge decoded 512px-per-subject atlas on mobile.

Binary imports also work with compatible bundlers:
`@cosmintrica/culinary-assets/sprite/culinary.webp` and
`@cosmintrica/culinary-assets/sprite/culinary@2x.webp`.
`@cosmintrica/culinary-assets/sprite/atlas.json` provides dimensions and coordinates.
SSR code should use static image imports or public URLs, not Node `file:` URLs.
For React Native, prefer the individual PNGs below rather than CSS sprites.

## Expo / React Native

PNG is the conservative cross-platform format. Static asset imports are
processed by Metro and work with native `Image` on iOS and Android:

```tsx
import { Image } from 'react-native';

const tomato = require('@cosmintrica/culinary-assets/png/tomato.png');

export function Ingredient() {
  return <Image source={tomato} style={{ width: 80, height: 80 }}
    resizeMode="contain" accessibilityLabel="Tomato" />;
}
```

Or use the native collection, which uses explicit static `require()` calls:

```tsx
import { nativeAssets } from '@cosmintrica/culinary-assets/native';

<Image source={nativeAssets.air_fryer} style={{ width: 96, height: 96 }} />
```

The native collection includes all 130 PNGs in the bundle. Prefer individual
imports for a smaller app. Native rendering still needs verification in your
own development build; an asset package does not guarantee every device's
layout or image decoder behavior.

## Files and Categories

- `assets/png/` and `assets/webp/`: individual transparent 512 x 512 canvases.
- `catalog.json`: stable IDs, EN/RO labels, category, dimensions and asset paths.
- `assets/sprite/`: optional transparent atlases and coordinate manifest.
- `dist/`: committed web/native/sprite exports and TypeScript declarations.
- `sources/`: original atlases, 76 individual source images, crop regions and generation briefs.
- `docs/previews/`: contact sheets for the six categories.
- `index.html`: searchable, offline-capable visual catalog.

Categories: `ingredients`, `produce`, `staples`, `cookware`, `utensils`,
`appliances`. Every subject has separate PNG and WebP files: 260 individual images.
The 512px exports include padding. The original 54 subjects may be upscaled from
smaller atlas cells; the 76 additions use individual high-resolution sources
(at least 1179px on the shorter edge). These are
raster illustrations, not infinitely scalable SVG icons.

## License

**Artwork and metadata: [CC0 1.0](LICENSE-ASSETS).** Copy, modify, redistribute
and use commercially under CC0, without required attribution. Attribution is
appreciated, not mandatory. [Official CC0 terms](https://creativecommons.org/publicdomain/zero/1.0/).

**Software, examples and documentation: [MIT](LICENSE-CODE).** Preserve the
copyright and permission notice when distributing software copies.

CC0 applies to rights the contributor may hold, not trademarks, patents or
third-party rights. AI-generated material may have different copyright status
depending on jurisdiction. Assets are provided as-is without warranties.
The Scrappy Chef logo and wordmarks are **not included or licensed** here.

## Contribute / Rebuild

```sh
npm install
npm run build
npm test
npm run verify:package
```

Building uses Sharp only as a development dependency. Source changes must be
accompanied by rebuilt files, visual review on light/dark backgrounds and passing
tests. See [contribution guidelines](CONTRIBUTING.md). Installation from GitHub
does not run the build automatically.

## Security

See [SECURITY.md](SECURITY.md) for the reporting process, release controls and
remaining limitations. CI tests the real packed installation and compares all
260 individual images and both optional atlases using SHA-256. External scores are not security certifications.

## Creator

Created by [Cosmin Trică](https://cosmintrica.ro/).
[Website](https://cosmintrica.ro/) · [GitHub](https://github.com/cosmintrica) ·
[LinkedIn](https://www.linkedin.com/in/cosmintrica/).

# Culinary Assets

**[Live Catalog: cosmintrica.github.io/culinary-assets](https://cosmintrica.github.io/culinary-assets/)**
| **[Install & License](https://cosmintrica.github.io/culinary-assets/guide.html)**
| **[npm Package](https://www.npmjs.com/package/@cosmintrica/culinary-assets)**
| **[Download v0.2.0](https://github.com/cosmintrica/culinary-assets/archive/refs/tags/v0.2.0.zip)**

**100 transparent culinary illustrations. PNG + WebP. CC0 artwork.**

Ingredients, vegetables, fruit, pantry staples, cookware, utensils and appliances in a
consistent coral-and-mint visual direction. Designed for recipe apps, kitchen
inventories, onboarding, educational projects and prototypes.

AI-generated artwork, visually reviewed and exported with transparent backgrounds.
No runtime dependencies, no install scripts, no required attribution for artwork.
See [provenance and limitations](NOTICE.md).

![All 100 Culinary Assets: ingredients, produce, pantry staples, cookware, utensils and appliances](https://raw.githubusercontent.com/cosmintrica/culinary-assets/main/docs/previews/collection.webp)

| Ingredients | Produce & fruit | Pantry staples | Cookware | Utensils | Appliances |
| --- | --- | --- | --- | --- | --- |
| 18 | 26 | 19 | 7 | 18 | 12 |

**New in 0.2.0:** 46 individual illustrations, including salmon, tofu, yogurt,
zucchini, mango, lentils, chickpeas, honey, tongs and a baking tray. Existing
asset IDs, file paths and exports remain compatible with 0.1.0.

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

For an exact version, add `@0.2.0` to the package name. Commit your lockfile for
reproducible builds. The package ships ready-to-use exports; users do not need
Sharp or a build step.

The tagged GitHub source remains an alternative (requires Git):

```sh
npm install github:cosmintrica/culinary-assets#v0.2.0
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
// catalog: 100 metadata entries; assets: lookup by stable ID
```

The web entry uses `new URL(..., import.meta.url)`, supported by modern client
bundlers. Some SSR frameworks may need static file imports or copying files to
their public directory; do not use Node `file:` URLs as browser URLs. Plain HTML
can reference copied assets directly, with no JavaScript library.

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

The native collection includes all 100 PNGs in the bundle. Prefer individual
imports for a smaller app. Native rendering still needs verification in your
own development build; an asset package does not guarantee every device's
layout or image decoder behavior.

## Files and Categories

- `assets/png/` and `assets/webp/`: individual transparent 512 x 512 canvases.
- `catalog.json`: stable IDs, EN/RO labels, category, dimensions and asset paths.
- `dist/`: committed web/native exports and TypeScript declarations.
- `sources/`: original atlases, 46 individual source images, crop regions and generation briefs.
- `docs/previews/`: contact sheets for the six categories.
- `index.html`: searchable, offline-capable visual catalog.

Categories: `ingredients`, `produce`, `staples`, `cookware`, `utensils`,
`appliances`. Every subject has separate PNG and WebP files: 200 images total.
The 512px exports include padding. The original 54 subjects may be upscaled from
smaller atlas cells; the 46 additions use individual 1254px sources. These are
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

## Creator

Created by [Cosmin Trică](https://cosmintrica.ro/).
[Website](https://cosmintrica.ro/) · [GitHub](https://github.com/cosmintrica) ·
[LinkedIn](https://www.linkedin.com/in/cosmintrica/).

# Changelog

## 0.5.0 - 2026-10-04

- Expanded from 130 to 200 subjects with 70 individually generated illustrations.
- Added fresh herbs, more fruit and vegetables, nuts, seeds and six kitchen tools.
- Added bowl-free ingredient mounds under new IDs; the 130 previous images and
  metadata remain unchanged, verified against a SHA-256 compatibility baseline.
- Regenerated optional 1x/2x WebP sprites for 200 subjects while preserving the
  existing logical tile coordinates and individual import paths.
- Updated bilingual metadata, gallery, previews, guide and typed web/native exports.
- Added provenance and packed-installation checks for the new subjects.

## 0.4.0 - 2026-10-04

- Expanded from 110 to 130 subjects with 20 individually generated illustrations.
- Preserved existing IDs and paths; 260 individual transparent PNG/WebP files.
- Added an optional `/sprite` entry with frozen typed coordinates, a 128px-tile
  WebP atlas, a 2x atlas and a JSON coordinate manifest.
- Kept sprite imports separate from the default and native entries.
- Updated the bilingual catalog, gallery, installation guide and previews.
- Added coordinate, transparency, packed-installation and sprite consistency tests.
- No runtime dependencies, install scripts or new publication credentials.

## 0.3.0 - 2026-10-04

- Expanded from 100 to 110 subjects with ginger, leek, celery, pineapple, quinoa,
  couscous, bread, a ceramic baking dish, a fine-mesh sieve and a rice cooker.
- 220 transparent 512px PNG/WebP files with bilingual metadata and typed exports.
- Preserved the original 100 assets, their IDs, paths and the earlier launch image.
- Added individual source PNGs, generation prompts and a new collection preview.
- Hardened CI with verified full-SHA action pins, nonpersistent checkout
  credentials, a dependency-audit gate and regression tests for these controls.
- Added reviewed-update Dependabot configuration and a security reporting policy.
- No automatic publishing permissions or new account credentials were added.

## 0.2.0 - 2026-10-04

- Expanded from 54 to 100 subjects: 46 individually generated illustrations,
  covering proteins, dairy, vegetables, fruit, pantry staples and kitchen tools.
- 200 transparent PNG/WebP exports, bilingual labels and typed web/native APIs.
- Preserved all original IDs and file paths; no breaking export changes.
- Added individual 1254px source PNGs, generation prompts and a full-collection preview.
- Updated the searchable catalog, installation guide and package verification.

## 0.1.0

- Initial collection of 54 transparent culinary illustrations in PNG and WebP.
- Individual file exports, a web URL/metadata API, a static-require native entry
  and TypeScript declarations.
- Offline searchable visual catalog with light/dark/checkerboard previews.
- English and Romanian labels, source atlases and generation provenance.
- CC0 artwork/metadata, MIT code/documentation; application logos excluded.

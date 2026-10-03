# Contributing

Open an issue for missing subjects, visual defects, inaccurate labels or rights
concerns. For an asset contribution:

1. Supply only artwork you are authorized to contribute under CC0. Do not upload
   scraped stock art, branded products, logos, people or assets with incompatible
   terms. Record whether AI was used and include the generation brief/source.
2. Match the collection's lighting, perspective, materials and generous padding.
   Preserve genuine alpha transparency; do not bake a checkerboard into images.
3. Add a stable snake_case ID and accurate English/Romanian labels to
   `sources/sprites.json`. Do not silently rename or replace existing IDs.
4. Run `npm run build`, visually inspect every changed image against light and
   dark backgrounds, and run `npm test` and `npm run verify:package`.
5. Include generated assets and exports in the pull request. Do not include keys,
   environment files, account data, dependencies, build caches or app branding.

Contributions of artwork/metadata are proposed under CC0; software/documentation
contributions are proposed under MIT. Do not submit material whose rights you
cannot grant. Review and acceptance are still required.

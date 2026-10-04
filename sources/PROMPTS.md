# Generation Briefs

Mode: built-in OpenAI image-generation tool, not the fallback API/CLI.
The following briefs document the visual direction and selected subjects for
the initial collection. Earlier atlas briefs are curated summaries; the
appliance prompt below is the exact prompt used for that extension.

## Shared Direction

Use case: product-mockup. Transparent square 3-by-3 sprite atlas. Nine distinct,
complete objects, no overlapping cells, generous transparent padding, no labels,
logos or watermark. Gentle three-quarter front view and soft upper-left studio
lighting. Tactile, realistic product illustration. Kitchen objects use coral
#D64B32, mint #68A987, graphite, brushed steel and light wood; food retains
plausible natural colors. Preserve actual alpha, not a drawn checkerboard.

## Selected Subjects

| Atlas | Row 1 | Row 2 | Row 3 |
| --- | --- | --- | --- |
| ingredients | Tomato; onion and half; garlic and cloves | Brown eggs; raw chicken breast; cheese wedge | Rice in mint bowl; penne in coral bowl; avocado and half |
| produce | Carrots; broccoli; potatoes | Red bell pepper; mushrooms; spinach | Lemon and half; cucumber and slices; olive oil bottle with mint cap |
| staples | Salt in mint bowl; black peppercorns in coral bowl; flour in mint bowl | Butter; sugar cubes; glass of milk | Soy sauce bottle with mint cap; cinnamon sticks; basil |
| cookware | Coral stockpot; nonstick pan with wood handle; stainless saucepan | Cast-iron skillet; mint deep wok with glass lid; coral Dutch oven | White/graphite air fryer with coral handle; mint blender; stainless microwave |
| utensils | Whisk with wood handle; box grater; mint mixing bowl | Wood cutting board; chef's knife; mint spatula with wood handle | Ladle; stainless colander; white/coral digital kitchen scale |
| appliances | Gas range; induction cooktop; countertop electric oven | Slow cooker; pressure cooker; contact grill | Immersion blender; stand mixer; electric kettle |

The selected cookware variant was edited to reduce object size within cells,
without changing the objects or their order. Discarded variants and private
application logos are not included.

## Exact Appliance Extension Prompt

Use case: product-mockup. Asset type: a transparent kitchen-appliance sprite atlas for an open-source culinary asset library. Input image 1 is a STYLE REFERENCE ONLY, not an edit target: match its tactile realistic product illustration, camera and soft upper-left lighting, coral #D64B32 and mint #68A987 accents, brushed stainless steel, graphite and light wood. Create NINE DIFFERENT unbranded kitchen appliances, centered separately in a perfectly regular 3-by-3 square grid. Top row left to right: a freestanding gas cooking range with oven and four visible gas burners; a slim black glass portable induction cooktop with one ring and mint controls; a stainless electric countertop oven with a glass door and coral knobs. Middle row: a mint slow cooker with a transparent lid; a brushed-steel stovetop pressure cooker with locking lid and coral handles; a compact graphite electric contact grill with its lid open and coral handle. Bottom row: a mint immersion hand blender with steel shaft; a coral stand mixer with stainless mixing bowl; a mint electric kettle. Keep each complete object including handles and cables within the central 60 percent of its own cell; generous transparent space separates all cells. Same gentle three-quarter front view and consistent scale. Legible product silhouettes with plausible real construction. Background truly transparent alpha, no floor, no heavy shadows, no grid lines, no labels, no logo, no brand names, no words, no watermark. All nine objects distinct; do not duplicate a pot or replace any subject.

## Export and Review

Sources are 1200-pixel transparent WebP atlases. Crop regions in sprites.json
are normalized atlas coordinates; overrides avoid neighboring-object fragments.
Export uses Sharp for mechanical crop, trim, resize, padding and conversion.
Every individual PNG/WebP canvas is 512 pixels with 32-pixel outer padding.
No claim is made that each source subject had native 512-pixel resolution.

Review subjects and labels, alpha, missing/cut handles, cell contamination,
and legibility on white, graphite and checkerboard backgrounds. Do not use
these images as evidence of an ingredient's preparation state or as product
specifications.

## Version 0.2.0: Individual Sources

The 46 additions use one built-in image-generation call per subject, with
`transparent_background: true`. Originals are retained as 1254 x 1254 PNGs in
`sources/individual/`; exports are resized down to padded 512px canvases.
No source atlas cropping is used for this extension. The original 54 subjects
and their source atlas crop regions remain unchanged.

### Exact Shared Prompt

For every addition except `salmon`, replace `{subject}` with the exact `subject`
field for that ID in `sources/sprites.json`. No other prompt text is changed.

```text
Use case: product-mockup. Asset type: ONE individual transparent culinary icon for the Culinary Assets library. Subject: {subject} Tactile realistic studio product illustration, not cartoon or flat vector; subtle polished realism suitable for a recipe app. Gentle three-quarter front view, soft upper-left studio lighting, restrained contact shadow. Natural food colors; kitchen accessories use mint #68A987, coral #D64B32, graphite, brushed stainless steel and light beech wood only where specified. Center the complete subject inside the central 70 percent of a square canvas, with generous empty space on all sides. Background must be genuinely transparent alpha, not white, not black, not a checkerboard drawing. No text, labels, logos, watermark, border, floor or scene. Full object visible, crisp silhouette, plausible real anatomy or construction, no cut edges. Only the subject described; no unrelated objects.
```

### Exact Salmon Prompt

```text
Use case: product-mockup. Asset type: ONE individual transparent culinary icon for the Culinary Assets library. Subject: one fresh raw salmon fillet, skin visible along the lower edge, delicate natural orange-pink flesh and pale fat lines. Tactile realistic studio product illustration, not cartoon or flat vector; subtle polished realism suitable for a recipe app. Gentle three-quarter front view, soft upper-left studio lighting, restrained contact shadow. Natural food colors; no plate, garnish or extra ingredients. Center the complete fillet inside the central 70 percent of a square canvas, with generous empty space on all sides. Background must be genuinely transparent alpha, not white, not black, not a checkerboard drawing. No text, labels, logo, watermark, border, floor or scene. Full object visible, crisp silhouette, no cut edges.
```

### Added Subjects

| ID | English | Romanian |
| --- | --- | --- |
| `salmon` | Raw salmon fillet | File de somon crud |
| `beef_steak` | Raw beef ribeye steak | Antricot de vită crud |
| `pork_tenderloin` | Raw pork tenderloin | Mușchiuleț de porc crud |
| `ground_beef` | Raw ground beef | Carne de vită tocată crudă |
| `shrimp` | Peeled raw shrimp | Creveți cruzi decorticați |
| `tofu` | Firm tofu | Tofu ferm |
| `yogurt` | Plain yogurt | Iaurt simplu |
| `cream` | Cooking cream | Smântână pentru gătit |
| `cottage_cheese` | Cottage cheese | Brânză cottage |
| `zucchini` | Zucchini | Dovlecel |
| `eggplant` | Eggplant | Vânătă |
| `lettuce` | Green leaf lettuce | Salată verde |
| `cabbage` | Green cabbage | Varză verde |
| `cauliflower` | Cauliflower | Conopidă |
| `peas` | Green peas | Mazăre verde |
| `green_beans` | Green beans | Fasole verde |
| `sweet_potato` | Sweet potato | Cartof dulce |
| `pumpkin` | Pumpkin | Dovleac |
| `apple` | Red apple | Măr roșu |
| `banana` | Bananas | Banane |
| `orange` | Orange | Portocală |
| `strawberry` | Strawberries | Căpșuni |
| `blueberry` | Blueberries | Afine |
| `pear` | Pear | Pară |
| `grapes` | Red grapes | Struguri roșii |
| `mango` | Mango | Mango |
| `peach` | Peach | Piersică |
| `oats` | Rolled oats | Fulgi de ovăz |
| `lentils` | Red lentils | Linte roșie |
| `chickpeas` | Chickpeas | Năut |
| `kidney_beans` | Red kidney beans | Fasole roșie |
| `canned_tomatoes` | Canned chopped tomatoes | Roșii tocate la conservă |
| `honey` | Honey | Miere |
| `cocoa` | Cocoa powder | Cacao pudră |
| `walnuts` | Walnuts | Nuci |
| `paprika` | Sweet paprika powder | Boia dulce |
| `tongs` | Kitchen tongs | Clește de bucătărie |
| `rolling_pin` | Wooden rolling pin | Sucitor din lemn |
| `peeler` | Y-shaped vegetable peeler | Curățător de legume |
| `kitchen_scissors` | Kitchen scissors | Foarfecă de bucătărie |
| `measuring_cup` | Glass measuring cup | Cană gradată |
| `measuring_spoons` | Measuring spoons | Linguri de măsurare |
| `mortar_pestle` | Mortar and pestle | Mojar cu pistil |
| `corkscrew` | Waiter's corkscrew | Tirbușon de ospătar |
| `potato_masher` | Potato masher | Zdrobitor pentru cartofi |
| `baking_tray` | Rimmed baking tray | Tavă pentru cuptor |

## Version 0.3.0: Ten Individual Additions

Generated with one built-in tool call per subject and
`transparent_background: true`. Exact prompts are retained in
[prompts-0.3.json](prompts-0.3.json). No existing source was replaced. Nine new
sources are 1254 x 1254; celery is 1334 x 1179. The alpha-preserving exporter
fits each complete subject into a 512px canvas with 32px outer padding.

| ID | English | Romanian |
| --- | --- | --- |
| `ginger` | Fresh ginger | Ghimbir proaspăt |
| `leek` | Leek | Praz |
| `celery` | Celery stalks | Țelină apio |
| `pineapple` | Pineapple | Ananas |
| `quinoa` | White quinoa | Quinoa albă |
| `couscous` | Fine couscous | Cușcuș fin |
| `bread` | Rustic bread | Pâine rustică |
| `baking_dish` | Ceramic baking dish | Vas ceramic pentru cuptor |
| `fine_sieve` | Fine-mesh sieve | Sită fină |
| `rice_cooker` | Electric rice cooker | Aparat de gătit orez |

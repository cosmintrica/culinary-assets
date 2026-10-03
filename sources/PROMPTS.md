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

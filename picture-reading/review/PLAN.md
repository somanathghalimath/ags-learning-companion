# Integration and extraction plan

The repository is a static collection of HTML/CSS/JS learning modules. Root `index.html` is a dark card launcher. `draw-with-me` and `numbers-with-me` establish the newer learning UI: #f3f8fc backgrounds, #17324d text, #2678e9 controls, rounded white cards, system rounded typography, and a circular home link. Picture Reading will reuse those conventions, with local styles and no runtime dependencies. Only one launcher card is needed outside the new directory.

The PDF contains 39 scanned pages. Visual inspection confirms PDF 1 and 2 duplicate textbook page 1. Use PDF 1 and skip PDF 2. Merge Domestic Animals (1,3), Wild Animals (4,5), Common Birds (6,7), Fruits (11,12), Vegetables (13,14), and How We Travel (33,34).

The declarative extraction inventory in `tools/inventory_source.py` maps every retained page, category and label to a crop. Coordinates are measured against a 490-pixel-high preview. PDF pages 16,17,18,27 have no crop coordinates and must be saved at their entire rendered dimensions. No masking, cropping or individual item generation is permitted for them.

Render at 2400 pixels on the longest edge with Poppler. Save local WebP assets using Pillow. Keep all tools outside runtime code. Generate CSV provenance, category contact sheets, and separate complete-page review images. Flag overlapping artwork and contextual details for review; do not silently replace source art or convert additional categories to full-page mode.

Use a declarative data file, hash-linked category selection, accessible captions, image-grid and full-page rendering. Full pages use width:100%, height:auto, object-fit:contain, with normal page scrolling and an original-size link for label reading. Validate image paths, duplicate handling, category merges, exception dimensions, navigation and responsive layouts.

# Extraction and validation report

## Delivered

Picture Reading is integrated into the existing launcher and uses the light blue styling of the newer learning modules. It has 32 categories, declarative data, local WebP assets, category/back/home navigation, responsive picture cards, and complete-page viewers. No runtime dependencies, OCR, PDF renderer, network image sources, quizzes or scoring were added.

251 object pictures were extracted and **all 251 are displayed**, together with the four full-page illustrations. On 2026-10-28, the user accepted all 23 previously flagged items as-is. Their status is `approved` in the data and inventory, and this approval is preserved by the extraction tool.

PDF page 2 duplicates page 1 and was skipped. Domestic Animals, Wild Animals, Common Birds, Fruits, Vegetables and How We Travel are merged across their source pages. All ten specified domestic animals are displayed.

PDF pages 16 (My Body), 17 (Family), 18 (A House), and 27 (Classroom) were rendered as entire pages at 2400 pixels on the longest edge. No cropping, masking, segmentation or separate object assets were applied to them. Their complete headings, labels, question boxes, borders and page numbers remain. The viewer uses natural aspect ratios with normal scrolling and an original-size link. The source scan itself has some clipped outer artwork; that existing scan boundary was preserved.

## Review output

Open `review/index.html` to see all 28 category contact sheets and the four complete-page images separately. `inventory.csv` gives PDF page, textbook page, category, exact item name, content type, output path and extraction status. `planned-inventory.csv` records the initial inventory before UI work. `tools/inventory_source.py` and `tools/cleanup.py` contain the reproducible crop and masking decisions.

## Accepted review items

The user accepted the following 23 items as-is on 2026-10-28. They are now included in the learning cards. The original extraction concerns are retained below for reference; acceptance does not change the image pixels. No additional full-page exceptions were introduced.

| PDF page | Category | Item | Issue |
| --- | --- | --- | --- |
| 7 | Common Birds | Eagle | Overlapping artwork or tight boundaries; candidate needs more detailed silhouette review. |
| 7 | Common Birds | Owl | Overlapping artwork or tight boundaries; candidate needs more detailed silhouette review. |
| 7 | Common Birds | Peacock | Overlapping artwork or tight boundaries; candidate needs more detailed silhouette review. |
| 8 | In the Oceans | Shark | Overlapping artwork or tight boundaries; candidate needs more detailed silhouette review. |
| 13 | Vegetables | Turnip | Overlapping artwork or tight boundaries; candidate needs more detailed silhouette review. |
| 21 | Useful Objects | Scissors | Overlapping artwork or tight boundaries; candidate needs more detailed silhouette review. |
| 22 | Our Daily Wear | Vest | Shorts overlap the vest; the complete concealed outline cannot be recovered from this scan. |
| 25 | In the Kitchen | Tea Pot | Shared overlapping arrangement; a clean complete isolated object is not established. |
| 25 | In the Kitchen | Cup | Shared overlapping arrangement; a clean complete isolated object is not established. |
| 25 | In the Kitchen | Saucer | Shared overlapping arrangement; a clean complete isolated object is not established. |
| 25 | In the Kitchen | Knife | Overlapping artwork or tight boundaries; candidate needs more detailed silhouette review. |
| 25 | In the Kitchen | Fork | Overlapping artwork or tight boundaries; candidate needs more detailed silhouette review. |
| 31 | Musical Instruments | Sitar | Overlapping artwork or tight boundaries; candidate needs more detailed silhouette review. |
| 32 | In the Workshop | Nail | Tight source boundary / nearby decoration; confirm complete tips and heads. |
| 32 | In the Workshop | Screw Nail | Tight source boundary / nearby decoration; confirm complete tips and heads. |
| 36 | Our Nationality | India | Map has no separate object caption; inventory name was provisional and is now displayed with user acceptance. |
| 36 | Our Nationality | National Bird | Overlapping artwork or tight boundaries; candidate needs more detailed silhouette review. |
| 38 | Wonders of Nature | Tree | Small detail inside a shared scene; surrounding objects or printed arrows remain. |
| 38 | Wonders of Nature | Flowers | Small detail inside a shared scene; surrounding objects or printed arrows remain. |
| 38 | Wonders of Nature | Grass | Small detail inside a shared scene; surrounding objects or printed arrows remain. |
| 38 | Wonders of Nature | Clouds | Small detail inside a shared scene; surrounding objects or printed arrows remain. |
| 38 | Wonders of Nature | Rainbow | Small detail inside a shared scene; surrounding objects or printed arrows remain. |
| 38 | Wonders of Nature | Rain | Small detail inside a shared scene; surrounding objects or printed arrows remain. |

Some displayed crops retain original lettering where it sits close to the artwork, and some retain scanned background texture or small edge fragments. HTML captions use the source wording, including “Basketball”, “Toybike”, “Jutka (Tonga)” and “Shoeflower”; apparent textbook mistakes were not silently corrected. The source image of a cockroach has antennae near its scan/crop boundary, and several thin objects are inherently less clear at card size. The contact sheets are provided for continued visual review, not a claim of pixel-perfect isolation.

## Validation performed

- Visually inspected all source-page overviews, all 28 category contact sheets, and the four full-page assets; performed multiple crop and mask correction passes.
- Python/Pillow validation: 32 unique categories, 251 decodable object assets, four decodable full-page assets, matching full-page render dimensions, valid local paths, exactly one duplicate skipped, no object crops from the four exceptions, and all ten domestic animals present.
- Headless Chrome via Playwright: every category at 360, 768 and 1280 pixels; all displayed images decoded, no horizontal overflow, full-page aspect ratios preserved and no object figures in full-page categories.
- Category selection, All categories, browser Back, home and launcher navigation passed; no JavaScript page errors.
- Existing Numbers With Me, Draw With Me, Alphabet Writing Guide and four quiz modules passed page-load smoke checks. Their internal activities were not exhaustively retested; their files were not modified.
- `node --check picture-reading/app.js` and `git diff --check` passed.

## Reproduction

From repository root:

```sh
python3 picture-reading/tools/extract.py
python3 picture-reading/tools/validate.py
python3 -m http.server 8765
```

Offline extraction requires Poppler (`pdftoppm`) and Python Pillow. Rendered pages are cached under `/tmp`; no cache is shipped with the application. Browser smoke tests require a development-only Playwright installation and Google Chrome at `/usr/bin/google-chrome`:

```sh
NODE_PATH=/tmp/picture-reading-browser/node_modules node picture-reading/tools/smoke-browser.cjs
```

The application itself can be opened directly from `picture-reading/index.html` or served statically.

## Approval update validation

After user acceptance, content validation passed with zero pending items. The browser checks were rerun to verify that all 251 picture cards are displayed and their images decode, including the 23 accepted items.

## Individual picture views

Picture cards now open a larger object view at `#category-id/item-id`. Previous and Next browse within the selected category, with unavailable steps disabled at the ends. Separate links return to the category grid and Picture Reading home. Direct links, reloads and browser Back are supported.

Headless Chrome checks passed at 360, 768 and 1280 pixels for clickable cards, object captions, Previous/Next, sequence boundaries, both home links, direct object URLs and browser Back across all 28 picture categories. All 251 grid pictures still decode; the four complete-page viewers, existing navigation and seven existing module page-load checks also passed. No horizontal overflow or JavaScript errors were found. The mobile object view was also visually inspected.

## Indian English pronunciation

Object cards and Previous/Next now speak the displayed name using browser speech synthesis. “Say it again” repeats it. The four preserved complete-page illustrations speak their category title, with a “Say the title” control. Speech requests prefer an available `en-IN` voice, request `en-IN` when none is listed, and use a reading rate of 0.85. The current voice list is queried for each request to accommodate delayed loading. New speech cancels earlier speech; returning home, hiding the page or leaving it cancels speech. Direct page loads remain quiet until interaction. Unsupported browsers retain the visual activity and hide speech controls.

The dedicated speech browser checks passed for Indian English voice preference, delayed voice availability, language fallback, pronunciation from cards and Previous/Next, replay, cancellation, browser Back, complete-page titles, quiet direct loads and unsupported browsers. Speech requests were mocked to inspect their text, voice and language; audible output and the actual accent were not verified in this environment. Accent availability depends on the user's browser/device voices.

The existing browser suite also passed across 360, 768 and 1280 pixel widths, covering all 251 cards, full pages, object navigation and existing module smoke checks. JavaScript syntax and whitespace checks passed.

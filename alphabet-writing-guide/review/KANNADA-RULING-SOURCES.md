# Kannada two-line notebook placement

Research and implementation: **2 November 2026**. Scope: two horizontal body guides in both Kannada learning sets, with individual placement for all **15 swaras/marks and 34 vyanjanas**. The parent’s notebook photograph establishes the intended paired-line appearance and the extra space available for extensions. Only one writing pair is displayed for the app’s single-letter lesson.

## Primary placement reference

[Janapriya Kannada Copy Book 1](https://drive.google.com/file/d/1M1NQwmvdIKU3u3TumRt6gF2XoWlqUClc/view), linked as **Kannada Writing Practice 1** in the [Hindu American Temple School resource collection](https://sites.google.com/site/hatshsmn/textbooks), supplies ruled models for every character in the activity. Downloaded the 42-page scan and visually examined the upper/lower model bands on PDF pages **4–28**. Individual page and model-row references are recorded below and beside each letter in the review.

This reference uses two dotted inner body guides, additional outer boundary rules and vertical practice separators. For the parent’s requested notebook pattern, the app retains the **two inner body guides**. It does not reproduce the outer rules or vertical practice grid. The book’s glyphs use a different printed/calligraphic style from the movement-reference series. The placement is a manual reconstruction of corresponding anatomical body limits, not a pixel-for-pixel registration of those different fonts.

Supporting checks:

- The parent’s supplied notebook photograph is the appearance/spacing reference, including head curls above and some finishing parts below the pair. The photograph is not bundled with the repository.
- [LearnKannada Copy Book Part 1](https://learnkannada.org/wp-content/uploads/2024/01/Kannada-Copy-Book-Part-1.pdf) was re-examined on PDF spreads 9, 15 and 23. Those pages use practice boxes and confirm letter forms, but do **not** independently establish this exact paired-line layout.
- [Sampada’s Kannada Chandana sample pages](https://sampadapublications.com/kannada-basics/kannada-chandana-akshara-sampada/) were inspected (public sample images 2, 3, 4 and 6). They contain extra guide rules and some numbered vowel models; they are not claimed as a complete consonant placement or movement standard.
- [Podar International School, Davanagere, Grades 1–2 notebook list for 2026–27](https://www.podareducation.org/uploads/davanagere/circulars/grade%201%20to%208%20prescribed%20textbooks%20and%20notebooks%20list%20ay%202026-27.pdf), PDF page 1, explicitly specifies a double-line notebook for Kannada. That supports classroom use of the ruling, not the precise placement of every glyph.

The **movement** references remain the original Gopala Krishna A animations documented in [swara research](KANNADA-SOURCES.md) and [vyanjana research](KANNADA-VYANJANA-SOURCES.md). A static ruled model establishes placement, not temporal pen order. The existing convention, directions and pen lifts are preserved. This work is source-grounded and reviewable, not independent certification of the parent’s school-specific handwriting convention.

## Placement method

The lesson draws two neutral grey lines at **y = 145 and 250**, across the 400 × 400 canvas. This shared 105-unit body band keeps the wide ಊ and ಞ fully visible with their original proportions, including pen width. The lines sit behind the grey guide, blue ink, green starting point and pencil.

`kannada-notebook.js` records the upper/lower body anchor for **each** letter in the existing vector coordinate system. It creates positioned copies with one uniform scale and translation:

```text
scale = 105 / (bodyBottom − bodyTop)
x′ = 200 + scale × (x − 200)
y′ = 145 + scale × (y − bodyTop)
```

Pen widths use that same scale. Every path’s original order, shape, proportions, joins, relative mark positions, directions, prompts and number of pen-down movements remain intact. There is no vertical stretching, moving a curl independently, font substitution or retracing to force a finished outline into a box. The source arrays in `kannada.js` and `kannada-vyanjana.js` remain unchanged, and their existing regeneration tools remain usable.

The anchors describe the **main body**, rather than each complete glyph’s outer bounding box. In particular:

- ಕ/ಗ and related head-stroke letters place the head bar at the upper guide; its crest can rise above it.
- The separate lower marks in ಘ/ಛ/ಝ/ಡ/ಢ/ಥ/ಫ/ಭ fall below the body baseline.
- ಇ’s finishing tail, ಞ’s lower tail and ಳ’s lower loop retain their extension below the lower guide.
- ಒ’s upper loop, ಓ’s loop/length mark and the head strokes of ಔ retain their space above the pair.
- Wide forms such as ಊ retain their width-to-height ratio; the shared gap accommodates them without horizontal squeezing.
- Ordinary bodies such as ಅ/ಆ and ಉ/ಊ use their body curves as the limits. Small monoline overshoots and the thickness of the ink may straddle a guide, as with a pencil drawn on a ruled line.

**Anchor choices are documented reconstruction decisions.** The ruled book, photographed workbook and existing vectors are different renderings of the same characters. These anchors match corresponding components; they do not assert one mandatory pixel-level school standard. The [review page](kannada-review.html) shows the positioned curves and two lines in both completed and numbered-stroke panels, with the original movement-reference form beside them and a placement-reference link per character.

## Character-by-character placement

Coordinates below refer to the unchanged source vectors. Page numbers are one-based **PDF pages**, not the book’s printed page numbers. “Upper/lower” identifies the model band on that PDF page. The source includes an additional long vocalic form on PDF page 7’s lower band; this work does not add that character to the activity’s existing inventory.

| Character | Source body top | Source body bottom | Ruled model | Placement decision |
| --- | ---: | ---: | --- | --- |
| ಅ | 87.7 | 313.0 | PDF 4, upper | The main body is positioned within the paired guides. |
| ಆ | 89.8 | 310.0 | PDF 4, lower | The main body is positioned within the paired guides. |
| ಇ | 92 | 232 | PDF 5, upper | The lower finishing tail extends below the body baseline. |
| ಈ | 157.6 | 303.6 | PDF 5, lower | The upper bar curl rises above the guide; the right finishing tail retains its original proportions. |
| ಉ | 129.6 | 270.2 | PDF 6, upper | The main body is positioned within the paired guides. |
| ಊ | 148.7 | 251.5 | PDF 6, lower | The main body is positioned within the paired guides. |
| ಋ | 144 | 272.3 | PDF 7, upper | The middle crest rises above the guide; the connected bowls keep their proportions. |
| ಎ | 89.3 | 312.2 | PDF 8, upper | The main body is positioned within the paired guides. |
| ಏ | 134.4 | 320.6 | PDF 8, lower | The upper finishing curl sits above the main body band. |
| ಐ | 92.3 | 308.5 | PDF 9, upper | The main body is positioned within the paired guides. |
| ಒ | 150 | 305 | PDF 9, lower | The small upper loop rises above the body guide. |
| ಓ | 180 | 319.2 | PDF 10, upper | The small upper loop and separate length mark rise above the body guide. |
| ಔ | 128.8 | 319.3 | PDF 10, lower | The upper head strokes sit above the main bowls. |
| ಅಂ | 134.6 | 265.4 | PDF 11, upper | The main body is positioned within the paired guides. |
| ಅಃ | 119.1 | 282.7 | PDF 11, lower | The main body is positioned within the paired guides. |
| ಕ | 137.398 | 321.097 | PDF 12, upper | Head stroke at the upper body guide; lower body at the baseline. |
| ಖ | 128.444 | 304.819 | PDF 12, lower | The main curves define the body band; their original proportions are preserved. |
| ಗ | 137.398 | 328.618 | PDF 13, upper | Head stroke at the upper body guide; lower body at the baseline. |
| ಘ | 118.154 | 263.172 | PDF 13, lower | Head stroke at the upper body guide; lower body at the baseline. The separate lower mark extends below the baseline. |
| ಙ | 95.0 | 296.283 | PDF 22, upper | The main curves define the body band; their original proportions are preserved. |
| ಚ | 136.774 | 319.778 | PDF 14, upper | Head stroke at the upper body guide; lower body at the baseline. |
| ಛ | 108.533 | 263.467 | PDF 14, lower | Head stroke at the upper body guide; lower body at the baseline. The separate lower mark extends below the baseline. |
| ಜ | 99.487 | 300.111 | PDF 15, upper | The main curves define the body band; their original proportions are preserved. |
| ಝ | 136.364 | 249.282 | PDF 15, lower | Head stroke at the upper body guide; lower body at the baseline. The separate lower mark extends below the baseline. |
| ಞ | 132.147 | 216.319 | PDF 22, lower | The middle loop defines the body baseline; its finishing tail continues below. |
| ಟ | 77.5 | 308.221 | PDF 16, upper | The main curves define the body band; their original proportions are preserved. |
| ಠ | 135.122 | 319.115 | PDF 16, lower | Head stroke at the upper body guide; lower body at the baseline. |
| ಡ | 110.738 | 266.32 | PDF 17, upper | Head stroke at the upper body guide; lower body at the baseline. The separate lower mark extends below the baseline. |
| ಢ | 93.759 | 262.721 | PDF 17, lower | Head stroke at the upper body guide; lower body at the baseline. The separate lower mark extends below the baseline. |
| ಣ | 105.92 | 294.442 | PDF 23, upper | The main curves define the body band; their original proportions are preserved. |
| ತ | 135.122 | 326.593 | PDF 18, upper | Head stroke at the upper body guide; lower body at the baseline. |
| ಥ | 95.493 | 263.789 | PDF 18, lower | Head stroke at the upper body guide; lower body at the baseline. The separate lower mark extends below the baseline. |
| ದ | 123.529 | 319.002 | PDF 19, upper | Head stroke at the upper body guide; lower body at the baseline. |
| ಧ | 110.351 | 321.547 | PDF 19, lower | Head stroke at the upper body guide; lower body at the baseline. |
| ನ | 122.72 | 326.56 | PDF 23, lower | Head stroke at the upper body guide; lower body at the baseline. |
| ಪ | 128.814 | 324.496 | PDF 20, upper | Head stroke at the upper body guide; lower body at the baseline. |
| ಫ | 115.238 | 272.316 | PDF 20, lower | Head stroke at the upper body guide; lower body at the baseline. The separate lower mark extends below the baseline. |
| ಬ | 87.521 | 301.53 | PDF 21, upper | The main curves define the body band; their original proportions are preserved. |
| ಭ | 108.533 | 267.422 | PDF 21, lower | Head stroke at the upper body guide; lower body at the baseline. The separate lower mark extends below the baseline. |
| ಮ | 152.791 | 289.789 | PDF 24, upper | Head stroke at the upper body guide; lower body at the baseline. |
| ಯ | 155.258 | 275.658 | PDF 24, lower | Head stroke at the upper body guide; lower body at the baseline. |
| ರ | 137.398 | 321.391 | PDF 25, upper | Head stroke at the upper body guide; lower body at the baseline. |
| ಲ | 87.748 | 307.245 | PDF 25, lower | The main curves define the body band; their original proportions are preserved. |
| ವ | 132.846 | 321.373 | PDF 26, upper | Head stroke at the upper body guide; lower body at the baseline. |
| ಶ | 128.293 | 320.694 | PDF 26, lower | Head stroke at the upper body guide; lower body at the baseline. |
| ಷ | 132.756 | 315.813 | PDF 27, upper | Head stroke at the upper body guide; lower body at the baseline. |
| ಸ | 122.72 | 326.56 | PDF 27, lower | Head stroke at the upper body guide; lower body at the baseline. |
| ಹ | 135.122 | 318.111 | PDF 28, upper | Head stroke at the upper body guide; lower body at the baseline. |
| ಳ | 132.258 | 256.452 | PDF 28, lower | The main sweep defines the body baseline; the lower loop extends below. |

## Validation

`tools/check-kannada-notebook.cjs` verifies all 49 placements, the two grey rules and their background layering, and sample anatomical relationships (ಗ’s head/stems, ಛ’s crest/lower mark, ಇ/ಞ/ಳ extensions, ಓ’s upper mark and ಊ’s body band). It checks preserved curves through path-length samples, proportional pen widths, identical source movement metadata, unchanged native arrays, guide/ink geometry, no clipping, phone/tablet/desktop layouts, review/lesson parity, and switching among English’s four lines, Kannada’s two and Numbers’ unruled canvas.

`tools/check-kannada.cjs` continues to exercise all 49 Kannada letters at all three speeds, the 800 ms start hold, constant-distance movement, pen-lift transitions, final ink, pause/resume/replay, joins, reference images and review playback. Speech requests remain covered by `tools/check-letter-speech.cjs`; tests use mocked voices and do not certify device audio. `tools/check-notebook.cjs` retains the 52-letter English placement checks.

The changed artboard-fit check allows the complete 400-unit review frame with explicit safe margins, rather than the previous cropped review bounds. Wide and descending forms are checked against those margins, including stroke thickness.

## Attribution

The positioned Kannada vectors are uniformly transformed copies of the existing adaptations of **Gopala Krishna A’s Wikimedia Commons handwriting animations**, licensed [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). The adapted path contributions and derivative review diagrams retain that license and their existing per-character source links. Changes in this revision are only placement, uniform scaling, proportional pen width and added guide lines/reference annotations.

Janapriya’s copybook and other educational PDFs were consulted for placement comparison. Their page images, printed glyph outlines and instructional text are not included in the application. No publisher, author, school or institution endorses this implementation.

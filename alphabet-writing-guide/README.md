# Write With Me

A static handwriting demonstration for English capitals, small letters, numbers and Kannada. Open `index.html` directly or serve the repository with `python3 -m http.server 8765`.

Kannada uses the source-grounded centreline vectors in `kannada.js` (15 swaras/marks) and `kannada-vyanjana.js` (34 basic consonants). The green starting point is held before each pen-down stroke, the pencil moves at a constant path-distance pace, and separate strokes have a lift cue. The guide and final ink use identical geometry.

- [Research and per-character construction](review/KANNADA-SOURCES.md)
- [Consonant research and construction](review/KANNADA-VYANJANA-SOURCES.md)
- [Consonant shape comparison and stroke playback](review/kannada-review.html?set=vyanjana)
- [Visual stroke-order review and playback](review/kannada-review.html)
- [Before / after comparison](review/before-after.png)

The documented construction follows one handwriting convention. The research notes distinguish movement references from printed shape references and identify reconstruction decisions and access limitations. It has not been independently certified by a Kannada teacher.

Development checks require Playwright and Google Chrome at `/usr/bin/google-chrome`. With the local server running:

```sh
NODE_PATH=/path/to/development/node_modules node alphabet-writing-guide/tools/check-kannada.cjs
```

These are development tools only; the browser activity needs no framework or installed package. Adapted Kannada path data and derivative review illustrations are CC BY-SA 4.0, attributed to Gopala Krishna A; see the research notes.

## Letter announcements

All five sections use the shared browser voice helper from `../picture-reading/speech.js`. English capitals, small letters and numbers use Picture Reading's female Indian English (`en-IN`) preference, with the same reading rate and pitch. Kannada letters request a Kannada (`kn-IN`) voice, preferring an identifiable female voice (including Microsoft Sapna); the app does not force an English-only voice onto Kannada text.

Changing letters or practice sets announces the new character. Replay and Play also announce it. The “Hear” button repeats the current name without resetting its strokes. Pause stops speech, and each new announcement cancels the previous one. Initial playback of handwriting remains automatic; initial speech waits for a user gesture because browsers may block autoplay audio. A tap on the lesson can introduce the first character. Unsupported browsers hide the Hear button and keep the visual guide.

Voice availability, audible accent and Kannada pronunciation depend on the browser/device. If no matching voice is listed, the engine receives the requested language with no explicit voice. Speech tests inspect mocked requests; they do not certify actual audio.

```sh
NODE_PATH=/path/to/development/node_modules node alphabet-writing-guide/tools/check-letter-speech.cjs
```


## English four-line notebook

Uppercase and lowercase lessons show four equally spaced horizontal rules: **red, blue, blue, red**. In the 400 × 400 canvas they sit at y = 70, 160, 250 and 340. This is the notebook convention requested by the parent; the same red/blue arrangement and roles are described in [Walbottle Village Primary’s handwriting policy, Books section](https://www.walbottlevillage.newcastle.sch.uk/attachments/download.asp?file=42&type=pdf).

The English centreline paths are sized and placed against those rules. Capitals reach the upper red line and sit on the lower blue baseline; Q retains its short tail below the baseline. Ordinary small letter bodies fit between the two blue lines. The b/d/f/h/k/l stems reach the upper red line; t keeps the shorter stem of the existing manuscript style. The g/j/p/q/y descenders reach the bottom red line, and i/j dots sit above the upper blue line. Rounded bodies use their actual curve extrema, rather than SVG control-point bounds, to meet the rules. Widths are adjusted consistently with the smaller writing height.

The animation, grey guide, green starting point and pencil all use the same newly aligned geometry. Stroke ordering and pen lifts are retained. G’s formerly detached inward bar now starts at the end of its first curve and rises into the bar, preserving its two movements. The g/j/y tail curves were refitted so the child sees the correct baseline crossing and bottom-red-line finish. Numbers and both Kannada sets have no notebook ruling and retain their existing path data.

```sh
NODE_PATH=/path/to/development/node_modules node alphabet-writing-guide/tools/check-notebook.cjs
```

The notebook check exercises all 52 English letters, actual cap/body/descender bounds, rule colours and layering, guide/ink correspondence, animated pencil placement, completion, phone/tablet/desktop layouts and switching to the other sets. Existing speech and Kannada checks remain available above.

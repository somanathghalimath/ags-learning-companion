# Write With Me

A static handwriting demonstration for English capitals, small letters, numbers and Kannada. Open `index.html` directly or serve the repository with `python3 -m http.server 8765`.

Kannada uses the source-grounded centreline vectors in `kannada.js`. The green starting point is held before each pen-down stroke, the pencil moves at a constant path-distance pace, and separate strokes have a lift cue. The guide and final ink use identical geometry.

- [Research and per-character construction](review/KANNADA-SOURCES.md)
- [Visual stroke-order review and playback](review/kannada-review.html)
- [Before / after comparison](review/before-after.png)

The documented construction follows one handwriting convention. The research notes distinguish movement references from printed shape references and identify reconstruction decisions and access limitations. It has not been independently certified by a Kannada teacher.

Development checks require Playwright and Google Chrome at `/usr/bin/google-chrome`. With the local server running:

```sh
NODE_PATH=/path/to/development/node_modules node alphabet-writing-guide/tools/check-kannada.cjs
```

These are development tools only; the browser activity needs no framework or installed package. Adapted Kannada path data and derivative review illustrations are CC BY-SA 4.0, attributed to Gopala Krishna A; see the research notes.

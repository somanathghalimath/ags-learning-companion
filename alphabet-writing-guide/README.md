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

## Letter announcements

All four sections use the shared browser voice helper from `../picture-reading/speech.js`. English capitals, small letters and numbers use Picture Reading's female Indian English (`en-IN`) preference, with the same reading rate and pitch. Kannada letters request a Kannada (`kn-IN`) voice, preferring an identifiable female voice (including Microsoft Sapna); the app does not force an English-only voice onto Kannada text.

Changing letters or practice sets announces the new character. Replay and Play also announce it. The “Hear” button repeats the current name without resetting its strokes. Pause stops speech, and each new announcement cancels the previous one. Initial playback of handwriting remains automatic; initial speech waits for a user gesture because browsers may block autoplay audio. A tap on the lesson can introduce the first character. Unsupported browsers hide the Hear button and keep the visual guide.

Voice availability, audible accent and Kannada pronunciation depend on the browser/device. If no matching voice is listed, the engine receives the requested language with no explicit voice. Speech tests inspect mocked requests; they do not certify actual audio.

```sh
NODE_PATH=/path/to/development/node_modules node alphabet-writing-guide/tools/check-letter-speech.cjs
```

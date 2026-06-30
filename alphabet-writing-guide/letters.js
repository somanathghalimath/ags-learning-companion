"use strict";

/*
 * ADDING CHARACTERS
 * -----------------
 * 1. Choose a set: `uppercase`, `lowercase`, or `numbers`.
 * 2. Add a character object to that set's `characters` array.
 * 3. Add each pen stroke in writing order. Every stroke needs an SVG path `d`
 *    value and a short child-friendly `prompt`.
 *
 * Paths use the app's 400 × 400 SVG viewBox. The animation measures each path
 * automatically, so character data is the only code needed for a new glyph.
 *
 * Example uppercase D:
 * {
 *   name: "D",
 *   strokes: [
 *     { d: "M 135 80 L 135 320", prompt: "Draw a line down." },
 *     { d: "M 135 80 C 315 80 315 320 135 320", prompt: "Go around to the bottom." }
 *   ]
 * }
 */
window.LETTER_LIBRARY = {
  uppercase: {
    label: "Uppercase",
    itemLabel: "Letter",
    characters: [
      {
        name: "A",
        strokes: [
          { d: "M 200 70 L 105 320", prompt: "Start at the top and slide down left." },
          { d: "M 200 70 L 295 320", prompt: "Start at the top and slide down right." },
          { d: "M 145 220 L 255 220", prompt: "Draw a line across the middle." }
        ]
      },
      {
        name: "B",
        strokes: [
          { d: "M 125 70 L 125 330", prompt: "Start at the top and draw straight down." },
          { d: "M 125 70 L 210 70 C 285 70 285 195 210 195 L 125 195", prompt: "Go right and around to the middle." },
          { d: "M 125 195 L 215 195 C 300 195 300 330 215 330 L 125 330", prompt: "Go right and around to the bottom." }
        ]
      },
      {
        name: "C",
        // C is correctly written with one continuous pen stroke.
        strokes: [
          { d: "M 290 105 C 255 65 185 62 135 100 C 65 154 72 270 143 314 C 194 346 258 334 292 296", prompt: "Start at the top right and curve all the way around." }
        ]
      },
      {
        name: "D",
        strokes: [
          { d: "M 125 70 L 125 330", prompt: "Draw a straight line down." },
          { d: "M 125 70 L 190 70 C 305 70 305 330 190 330 L 125 330", prompt: "Go right and curve around to the bottom." }
        ]
      },
      {
        name: "E",
        strokes: [
          { d: "M 125 70 L 125 330", prompt: "Draw a straight line down." },
          { d: "M 125 70 L 295 70", prompt: "Draw the top line across." },
          { d: "M 125 200 L 260 200", prompt: "Draw the middle line across." },
          { d: "M 125 330 L 295 330", prompt: "Draw the bottom line across." }
        ]
      },
      {
        name: "F",
        strokes: [
          { d: "M 125 70 L 125 330", prompt: "Draw a straight line down." },
          { d: "M 125 70 L 295 70", prompt: "Draw the top line across." },
          { d: "M 125 200 L 260 200", prompt: "Draw the middle line across." }
        ]
      },
      {
        name: "G",
        strokes: [
          { d: "M 295 108 C 255 65 180 60 130 105 C 68 160 78 275 145 315 C 205 350 290 320 295 250", prompt: "Curve from the top right around to the lower right." },
          { d: "M 295 220 L 225 220", prompt: "Draw a short line inward." }
        ]
      },
      {
        name: "H",
        strokes: [
          { d: "M 115 70 L 115 330", prompt: "Draw the left line down." },
          { d: "M 285 70 L 285 330", prompt: "Draw the right line down." },
          { d: "M 115 200 L 285 200", prompt: "Join the lines across the middle." }
        ]
      },
      {
        name: "I",
        strokes: [
          { d: "M 115 70 L 285 70", prompt: "Draw the top line across." },
          { d: "M 200 70 L 200 330", prompt: "Draw a straight line down the middle." },
          { d: "M 115 330 L 285 330", prompt: "Draw the bottom line across." }
        ]
      },
      {
        name: "J",
        strokes: [
          { d: "M 105 70 L 295 70", prompt: "Draw the top line across." },
          { d: "M 255 70 L 255 255 C 255 330 150 355 105 290", prompt: "Draw down and curve to the left." }
        ]
      },
      {
        name: "K",
        strokes: [
          { d: "M 120 70 L 120 330", prompt: "Draw a straight line down." },
          { d: "M 290 70 L 120 215", prompt: "Slant down to the middle." },
          { d: "M 180 165 L 300 330", prompt: "Slant down to the bottom right." }
        ]
      },
      {
        name: "L",
        strokes: [
          { d: "M 125 70 L 125 330 L 295 330", prompt: "Draw down, then across the bottom." }
        ]
      },
      {
        name: "M",
        strokes: [
          { d: "M 90 330 L 90 70", prompt: "Draw the left line up." },
          { d: "M 90 70 L 200 225", prompt: "Slant down to the middle." },
          { d: "M 200 225 L 310 70", prompt: "Slant up to the right." },
          { d: "M 310 70 L 310 330", prompt: "Draw the right line down." }
        ]
      },
      {
        name: "N",
        strokes: [
          { d: "M 105 330 L 105 70", prompt: "Draw the left line up." },
          { d: "M 105 70 L 295 330", prompt: "Slant down to the bottom right." },
          { d: "M 295 330 L 295 70", prompt: "Draw the right line up." }
        ]
      },
      {
        name: "O",
        strokes: [
          { d: "M 200 70 C 120 70 80 120 80 200 C 80 285 125 330 200 330 C 275 330 320 285 320 200 C 320 115 275 70 200 70 Z", prompt: "Start at the top and go all the way around." }
        ]
      },
      {
        name: "P",
        strokes: [
          { d: "M 120 70 L 120 330", prompt: "Draw a straight line down." },
          { d: "M 120 70 L 210 70 C 300 70 300 205 210 205 L 120 205", prompt: "Go right and curve back to the middle." }
        ]
      },
      {
        name: "Q",
        strokes: [
          { d: "M 195 70 C 115 70 78 120 78 200 C 78 285 120 330 195 330 C 270 330 315 285 315 200 C 315 115 270 70 195 70 Z", prompt: "Start at the top and go all the way around." },
          { d: "M 225 265 L 315 345", prompt: "Add a short slanting tail." }
        ]
      },
      {
        name: "R",
        strokes: [
          { d: "M 120 70 L 120 330", prompt: "Draw a straight line down." },
          { d: "M 120 70 L 210 70 C 300 70 300 205 210 205 L 120 205", prompt: "Go right and curve back to the middle." },
          { d: "M 205 205 L 305 330", prompt: "Slant down to the bottom right." }
        ]
      },
      {
        name: "S",
        strokes: [
          { d: "M 290 105 C 250 60 145 65 110 120 C 75 175 125 200 200 205 C 280 210 315 250 280 300 C 245 350 135 340 100 295", prompt: "Curve left, then right, then left again." }
        ]
      },
      {
        name: "T",
        strokes: [
          { d: "M 90 70 L 310 70", prompt: "Draw the top line across." },
          { d: "M 200 70 L 200 330", prompt: "Draw a straight line down the middle." }
        ]
      },
      {
        name: "U",
        strokes: [
          { d: "M 95 70 L 95 235 C 95 365 305 365 305 235 L 305 70", prompt: "Draw down, curve around, and go back up." }
        ]
      },
      {
        name: "V",
        strokes: [
          { d: "M 90 70 L 200 330 L 310 70", prompt: "Slant down, then slant back up." }
        ]
      },
      {
        name: "W",
        strokes: [
          { d: "M 65 70 L 125 330 L 200 160 L 275 330 L 335 70", prompt: "Go down, up, down, and up again." }
        ]
      },
      {
        name: "X",
        strokes: [
          { d: "M 95 70 L 305 330", prompt: "Slant down to the bottom right." },
          { d: "M 305 70 L 95 330", prompt: "Slant down to the bottom left." }
        ]
      },
      {
        name: "Y",
        strokes: [
          { d: "M 90 70 L 200 205", prompt: "Slant down to the middle." },
          { d: "M 310 70 L 200 205", prompt: "Slant down to the middle from the right." },
          { d: "M 200 205 L 200 330", prompt: "Draw straight down." }
        ]
      },
      {
        name: "Z",
        strokes: [
          { d: "M 90 70 L 310 70 L 90 330 L 310 330", prompt: "Go across, slant down, and go across again." }
        ]
      }
    ]
  },

  // These sets are ready for path data. A future set selector can switch
  // ACTIVE_SET_KEY in app.js without changing the animation system.
  lowercase: {
    label: "Lowercase",
    itemLabel: "Letter",
    characters: []
  },
  numbers: {
    label: "Number",
    itemLabel: "Number",
    characters: []
  }
};

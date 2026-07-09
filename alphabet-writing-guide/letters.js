"use strict";

/*
 * ADDING CHARACTERS
 * -----------------
 * 1. Choose a set: `uppercase`, `lowercase`, or `numbers`.
 * 2. Add a character object to that set's `characters` array.
 * 3. Add each pen stroke in writing order. Every stroke needs an SVG path `d`
 *    value and a short child-friendly `prompt`.
 *
 * Paths use the app's 400 × 400 SVG viewBox.
 *
 * Important drawing model:
 * - These are monoline beginner-manuscript strokes, not font outlines.
 * - The faint guide and animated blue trace are created from the exact same
 *   SVG path data, so the pencil traces directly over the shown character.
 * - To add more characters later, add only path data here; app.js does not need
 *   to change.
 *
 * Example:
 * character("D", [
 *   stroke("M 125 70 L 125 330", "Draw a straight line down."),
 *   stroke("M 125 70 L 190 70 C 305 70 305 330 190 330 L 125 330", "Go around to the bottom.")
 * ])
 */

function stroke(d, prompt) {
  return { d, prompt };
}

function character(name, strokes) {
  return { name, strokes };
}

const UPPERCASE = [
  character("A", [
    stroke("M 200 70 L 105 320", "Start at the top and slide down left."),
    stroke("M 200 70 L 295 320", "Start at the top and slide down right."),
    stroke("M 145 220 L 255 220", "Draw a line across the middle.")
  ]),
  character("B", [
    stroke("M 125 70 L 125 330", "Start at the top and draw straight down."),
    stroke("M 125 70 L 210 70 C 285 70 285 195 210 195 L 125 195", "Go right and around to the middle."),
    stroke("M 125 195 L 215 195 C 300 195 300 330 215 330 L 125 330", "Go right and around to the bottom.")
  ]),
  character("C", [
    stroke("M 290 105 C 255 65 185 62 135 100 C 65 154 72 270 143 314 C 194 346 258 334 292 296", "Start at the top right and curve all the way around.")
  ]),
  character("D", [
    stroke("M 125 70 L 125 330", "Draw a straight line down."),
    stroke("M 125 70 L 190 70 C 305 70 305 330 190 330 L 125 330", "Go right and curve around to the bottom.")
  ]),
  character("E", [
    stroke("M 125 70 L 125 330", "Draw a straight line down."),
    stroke("M 125 70 L 295 70", "Draw the top line across."),
    stroke("M 125 200 L 260 200", "Draw the middle line across."),
    stroke("M 125 330 L 295 330", "Draw the bottom line across.")
  ]),
  character("F", [
    stroke("M 125 70 L 125 330", "Draw a straight line down."),
    stroke("M 125 70 L 295 70", "Draw the top line across."),
    stroke("M 125 200 L 260 200", "Draw the middle line across.")
  ]),
  character("G", [
    stroke("M 295 108 C 255 65 180 60 130 105 C 68 160 78 275 145 315 C 205 350 290 320 295 250", "Curve from the top right around to the lower right."),
    stroke("M 295 220 L 225 220", "Draw a short line inward.")
  ]),
  character("H", [
    stroke("M 115 70 L 115 330", "Draw the left line down."),
    stroke("M 285 70 L 285 330", "Draw the right line down."),
    stroke("M 115 200 L 285 200", "Join the lines across the middle.")
  ]),
  character("I", [
    stroke("M 115 70 L 285 70", "Draw the top line across."),
    stroke("M 200 70 L 200 330", "Draw a straight line down the middle."),
    stroke("M 115 330 L 285 330", "Draw the bottom line across.")
  ]),
  character("J", [
    stroke("M 105 70 L 295 70", "Draw the top line across."),
    stroke("M 255 70 L 255 255 C 255 330 150 355 105 290", "Draw down and curve to the left.")
  ]),
  character("K", [
    stroke("M 120 70 L 120 330", "Draw a straight line down."),
    stroke("M 290 70 L 120 215", "Slant down to the middle."),
    stroke("M 180 165 L 300 330", "Slant down to the bottom right.")
  ]),
  character("L", [
    stroke("M 125 70 L 125 330 L 295 330", "Draw down, then across the bottom.")
  ]),
  character("M", [
    stroke("M 90 330 L 90 70", "Draw the left line up."),
    stroke("M 90 70 L 200 225", "Slant down to the middle."),
    stroke("M 200 225 L 310 70", "Slant up to the right."),
    stroke("M 310 70 L 310 330", "Draw the right line down.")
  ]),
  character("N", [
    stroke("M 105 330 L 105 70", "Draw the left line up."),
    stroke("M 105 70 L 295 330", "Slant down to the bottom right."),
    stroke("M 295 330 L 295 70", "Draw the right line up.")
  ]),
  character("O", [
    stroke("M 200 70 C 120 70 80 120 80 200 C 80 285 125 330 200 330 C 275 330 320 285 320 200 C 320 115 275 70 200 70", "Start at the top and go all the way around.")
  ]),
  character("P", [
    stroke("M 120 70 L 120 330", "Draw a straight line down."),
    stroke("M 120 70 L 210 70 C 300 70 300 205 210 205 L 120 205", "Go right and curve back to the middle.")
  ]),
  character("Q", [
    stroke("M 195 70 C 115 70 78 120 78 200 C 78 285 120 330 195 330 C 270 330 315 285 315 200 C 315 115 270 70 195 70", "Start at the top and go all the way around."),
    stroke("M 225 265 L 315 345", "Add a short slanting tail.")
  ]),
  character("R", [
    stroke("M 120 70 L 120 330", "Draw a straight line down."),
    stroke("M 120 70 L 210 70 C 300 70 300 205 210 205 L 120 205", "Go right and curve back to the middle."),
    stroke("M 205 205 L 305 330", "Slant down to the bottom right.")
  ]),
  character("S", [
    stroke("M 290 105 C 250 60 145 65 110 120 C 75 175 125 200 200 205 C 280 210 315 250 280 300 C 245 350 135 340 100 295", "Curve left, then right, then left again.")
  ]),
  character("T", [
    stroke("M 90 70 L 310 70", "Draw the top line across."),
    stroke("M 200 70 L 200 330", "Draw a straight line down the middle.")
  ]),
  character("U", [
    stroke("M 95 70 L 95 235 C 95 365 305 365 305 235 L 305 70", "Draw down, curve around, and go back up.")
  ]),
  character("V", [
    stroke("M 90 70 L 200 330 L 310 70", "Slant down, then slant back up.")
  ]),
  character("W", [
    stroke("M 65 70 L 125 330 L 200 160 L 275 330 L 335 70", "Go down, up, down, and up again.")
  ]),
  character("X", [
    stroke("M 95 70 L 305 330", "Slant down to the bottom right."),
    stroke("M 305 70 L 95 330", "Slant down to the bottom left.")
  ]),
  character("Y", [
    stroke("M 90 70 L 200 205", "Slant down to the middle."),
    stroke("M 310 70 L 200 205", "Slant down to the middle from the right."),
    stroke("M 200 205 L 200 330", "Draw straight down.")
  ]),
  character("Z", [
    stroke("M 90 70 L 310 70 L 90 330 L 310 330", "Go across, slant down, and go across again.")
  ])
];

const LOWERCASE = [
  character("a", [
    stroke("M 200 170 C 150 170 120 198 120 235 C 120 275 152 300 198 300 C 238 300 260 272 260 235 C 260 198 235 170 200 170", "Make a small round body."),
    stroke("M 260 175 L 260 300", "Draw the short line down.")
  ]),
  character("b", [
    stroke("M 145 80 L 145 300", "Draw a tall line down."),
    stroke("M 145 190 C 165 165 225 160 255 200 C 290 247 255 300 200 300 C 170 300 148 278 145 248", "Curve around to make the belly.")
  ]),
  character("c", [
    stroke("M 270 195 C 240 160 175 158 140 198 C 102 244 132 300 195 300 C 230 300 255 285 272 263", "Start at the top and curve around.")
  ]),
  character("d", [
    stroke("M 235 80 L 235 300", "Draw a tall line down."),
    stroke("M 235 190 C 212 165 158 160 130 200 C 98 247 132 300 185 300 C 215 300 235 278 235 248", "Curve around to make the body.")
  ]),
  character("e", [
    stroke("M 145 225 L 265 225 C 265 185 232 160 195 160 C 150 160 120 193 120 235 C 120 278 154 303 202 300 C 230 298 252 286 270 268", "Go across, then curve around.")
  ]),
  character("f", [
    stroke("M 245 95 C 215 75 175 88 175 132 L 175 300", "Curve at the top and draw down."),
    stroke("M 130 185 L 235 185", "Cross the middle.")
  ]),
  character("g", [
    stroke("M 200 170 C 150 170 120 198 120 235 C 120 275 152 300 198 300 C 238 300 260 272 260 235 C 260 198 235 170 200 170", "Make a small round body."),
    stroke("M 260 175 L 260 318 C 260 350 220 365 175 355 C 158 350 145 342 135 330", "Draw the tail down and curve left.")
  ]),
  character("h", [
    stroke("M 140 80 L 140 300", "Draw a tall line down."),
    stroke("M 140 205 C 160 175 215 158 245 192 C 260 210 260 235 260 300", "Go up and around for the hump.")
  ]),
  character("i", [
    stroke("M 200 170 L 200 300", "Draw a short line down."),
    stroke("M 200 110 L 200 112", "Add the dot.")
  ]),
  character("j", [
    stroke("M 220 170 L 220 310 C 220 350 175 365 145 335", "Draw down and hook left."),
    stroke("M 220 110 L 220 112", "Add the dot.")
  ]),
  character("k", [
    stroke("M 145 80 L 145 300", "Draw a tall line down."),
    stroke("M 255 170 L 145 245", "Slant down to the middle."),
    stroke("M 180 220 L 265 300", "Slant down to the bottom.")
  ]),
  character("l", [
    stroke("M 200 80 L 200 300", "Draw a tall line down.")
  ]),
  character("m", [
    stroke("M 95 170 L 95 300", "Draw a short line down."),
    stroke("M 95 210 C 115 175 165 160 185 198 C 195 215 195 240 195 300", "Make the first hump."),
    stroke("M 195 210 C 215 175 265 160 285 198 C 295 215 295 240 295 300", "Make the second hump.")
  ]),
  character("n", [
    stroke("M 130 170 L 130 300", "Draw a short line down."),
    stroke("M 130 210 C 155 175 215 160 245 198 C 260 218 260 242 260 300", "Make one hump.")
  ]),
  character("o", [
    stroke("M 200 160 C 150 160 120 190 120 230 C 120 275 152 300 200 300 C 248 300 280 275 280 230 C 280 188 250 160 200 160", "Go all the way around.")
  ]),
  character("p", [
    stroke("M 145 170 L 145 360", "Draw down below the line."),
    stroke("M 145 190 C 165 165 225 160 255 200 C 290 247 255 300 200 300 C 170 300 148 278 145 248", "Curve around to make the belly.")
  ]),
  character("q", [
    stroke("M 200 170 C 150 170 120 198 120 235 C 120 275 152 300 198 300 C 238 300 260 272 260 235 C 260 198 235 170 200 170", "Make a small round body."),
    stroke("M 260 175 L 260 360", "Draw the tail down.")
  ]),
  character("r", [
    stroke("M 150 170 L 150 300", "Draw a short line down."),
    stroke("M 150 210 C 172 175 215 162 248 180", "Make a small shoulder.")
  ]),
  character("s", [
    stroke("M 260 190 C 232 160 165 160 145 198 C 125 236 260 224 255 270 C 250 312 165 310 135 278", "Curve one way, then the other.")
  ]),
  character("t", [
    stroke("M 200 115 L 200 270 C 200 300 230 310 255 292", "Draw down."),
    stroke("M 150 180 L 250 180", "Cross the middle.")
  ]),
  character("u", [
    stroke("M 135 170 L 135 250 C 135 285 160 300 195 300 C 230 300 255 275 255 240 L 255 170", "Go down, curve, and go up."),
    stroke("M 255 170 L 255 300", "Finish the short line.")
  ]),
  character("v", [
    stroke("M 125 170 L 200 300 L 275 170", "Slant down, then slant up.")
  ]),
  character("w", [
    stroke("M 90 170 L 140 300 L 200 205 L 260 300 L 310 170", "Go down, up, down, and up.")
  ]),
  character("x", [
    stroke("M 130 170 L 270 300", "Slant down to the right."),
    stroke("M 270 170 L 130 300", "Slant down to the left.")
  ]),
  character("y", [
    stroke("M 125 170 L 200 300", "Slant down to the middle."),
    stroke("M 275 170 L 195 320 C 180 350 155 360 130 345", "Slant down and curve left.")
  ]),
  character("z", [
    stroke("M 130 170 L 270 170 L 130 300 L 270 300", "Go across, slant down, and go across.")
  ])
];

const NUMBERS = [
  character("1", [
    stroke("M 175 120 L 220 80 L 220 320", "Start with a small slant, then draw down."),
    stroke("M 170 320 L 270 320", "Add the bottom line.")
  ]),
  character("2", [
    stroke("M 125 135 C 150 85 260 85 280 145 C 300 205 215 235 125 320 L 290 320", "Curve around, slant down, then go across.")
  ]),
  character("3", [
    stroke("M 130 105 C 185 65 275 90 275 160 C 275 195 248 215 205 215", "Make the top curve."),
    stroke("M 205 215 C 285 215 300 320 210 330 C 175 334 145 322 125 298", "Make the bottom curve.")
  ]),
  character("4", [
    stroke("M 250 80 L 125 245 L 290 245", "Slant down and go across."),
    stroke("M 250 80 L 250 330", "Draw the tall line down.")
  ]),
  character("5", [
    stroke("M 280 90 L 150 90 L 140 205", "Go across, then down."),
    stroke("M 140 205 C 225 175 295 225 275 285 C 258 335 175 345 125 300", "Curve around at the bottom.")
  ]),
  character("6", [
    stroke("M 270 115 C 200 60 120 130 120 235 C 120 295 160 330 210 330 C 255 330 285 300 285 255 C 285 210 255 180 210 180 C 165 180 130 210 122 250", "Curve down and around.")
  ]),
  character("7", [
    stroke("M 120 90 L 290 90 L 180 330", "Go across, then slant down.")
  ]),
  character("8", [
    stroke("M 200 80 C 150 80 125 112 125 155 C 125 205 275 205 275 155 C 275 112 250 80 200 80", "Make the top loop."),
    stroke("M 200 205 C 140 205 110 235 110 275 C 110 318 145 340 200 340 C 255 340 290 318 290 275 C 290 235 260 205 200 205", "Make the bottom loop.")
  ]),
  character("9", [
    stroke("M 205 80 C 155 80 120 115 120 165 C 120 215 155 250 205 250 C 255 250 290 215 290 165 C 290 115 255 80 205 80", "Make the round top."),
    stroke("M 290 165 C 290 245 245 310 160 330", "Draw the line down and left.")
  ]),
  character("10", [
    stroke("M 115 120 L 155 85 L 155 320", "Write the one."),
    stroke("M 260 85 C 210 85 185 130 185 205 C 185 280 210 325 260 325 C 310 325 335 280 335 205 C 335 130 310 85 260 85", "Write the zero.")
  ])
];

window.LETTER_LIBRARY = {
  uppercase: {
    label: "Uppercase",
    headingLabel: "Uppercase",
    itemLabel: "Letter",
    characters: UPPERCASE
  },
  lowercase: {
    label: "Lowercase",
    headingLabel: "Lowercase",
    itemLabel: "Letter",
    characters: LOWERCASE
  },
  numbers: {
    label: "Numbers",
    headingLabel: "Number",
    itemLabel: "Number",
    characters: NUMBERS
  }
};

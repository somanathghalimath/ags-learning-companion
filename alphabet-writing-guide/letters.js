"use strict";

/*
 * ADDING CHARACTERS
 * -----------------
 * 1. Choose a set: `uppercase`, `lowercase`, `numbers`, or
 *    `kannadaSwaras`.
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

const KANNADA_A_BASE = [
  stroke("M 155 125 C 115 140 100 190 120 230 C 145 280 215 300 270 260 C 288 247 300 230 304 210", "Start with the big left curve."),
  stroke("M 160 125 C 210 95 265 120 260 165 C 255 205 190 220 132 205", "Make the top loop."),
  stroke("M 138 218 L 258 218", "Draw the middle line.")
];

const KANNADA_SWARAS = [
  character("ಅ", [
    ...KANNADA_A_BASE
  ]),
  character("ಆ", [
    ...KANNADA_A_BASE,
    stroke("M 286 128 C 330 132 332 198 290 202 C 268 204 258 188 270 172", "Add the right sound mark.")
  ]),
  character("ಇ", [
    stroke("M 128 150 C 124 108 174 105 198 142 C 220 108 276 116 274 166 C 272 214 210 218 158 204", "Make the two top humps."),
    stroke("M 160 205 C 116 228 132 284 190 290 C 238 295 268 265 250 232", "Curve around the bottom."),
    stroke("M 250 232 L 272 305", "Add the small tail.")
  ]),
  character("ಈ", [
    stroke("M 105 150 L 250 150", "Draw the top line."),
    stroke("M 128 150 C 125 112 174 105 198 142 C 220 108 276 116 274 166 C 272 214 210 218 158 204", "Make the two top humps."),
    stroke("M 160 205 C 116 228 132 284 190 290 C 238 295 268 265 250 232", "Curve around the bottom."),
    stroke("M 250 98 C 292 116 288 172 252 178", "Add the upper curl."),
    stroke("M 258 188 C 312 184 330 242 292 262", "Add the right curl.")
  ]),
  character("ಉ", [
    stroke("M 135 135 C 95 150 95 225 145 235 C 185 242 202 206 172 184 C 145 165 120 188 132 215", "Make the left loop."),
    stroke("M 190 145 C 250 108 310 148 300 220 C 292 275 250 310 195 295", "Make the main right curve."),
    stroke("M 300 220 C 340 250 320 310 270 318", "Finish the lower curl.")
  ]),
  character("ಊ", [
    stroke("M 95 140 C 58 165 66 228 116 236 C 154 242 170 204 145 184 C 120 166 96 190 108 216", "Make the first loop."),
    stroke("M 162 145 C 215 110 262 148 250 218 C 242 268 205 300 160 288", "Make the middle curve."),
    stroke("M 270 150 C 335 122 372 190 338 258 C 312 310 255 320 208 294", "Make the long right curve.")
  ]),
  character("ಋ", [
    stroke("M 115 160 C 112 118 165 110 190 145 C 215 110 270 122 270 170 C 270 210 228 222 180 210", "Make the top body."),
    stroke("M 95 198 L 285 198", "Draw the middle line."),
    stroke("M 188 198 C 145 220 152 285 208 290 C 255 294 280 260 258 225", "Curve around the bottom."),
    stroke("M 260 225 C 302 222 318 260 295 285", "Add the right hook.")
  ]),
  character("ಎ", [
    stroke("M 145 188 C 185 155 252 165 270 220 C 288 278 230 315 172 288", "Make the main curve."),
    stroke("M 145 188 C 105 215 112 265 152 280 C 182 292 215 275 205 240 C 198 212 165 210 145 228", "Make the lower loop.")
  ]),
  character("ಏ", [
    stroke("M 150 120 C 178 145 210 142 222 112", "Make the small top curve."),
    stroke("M 145 188 C 185 155 252 165 270 220 C 288 278 230 315 172 288", "Make the main curve."),
    stroke("M 145 188 C 105 215 112 265 152 280 C 182 292 215 275 205 240 C 198 212 165 210 145 228", "Make the lower loop.")
  ]),
  character("ಐ", [
    stroke("M 125 142 C 148 110 192 108 208 145 C 226 110 282 118 282 165 C 282 210 228 215 180 205", "Make the top humps."),
    stroke("M 138 205 C 105 232 118 282 160 288 C 198 294 220 265 204 238", "Make the lower loop."),
    stroke("M 232 205 C 270 205 292 228 288 260 C 284 296 238 308 208 282", "Make the right loop.")
  ]),
  character("ಒ", [
    stroke("M 150 145 C 115 162 105 218 138 250 C 178 288 245 282 278 238", "Make the left round body."),
    stroke("M 150 145 C 196 110 250 130 252 172 C 254 214 198 225 138 210", "Make the top loop."),
    stroke("M 275 128 C 312 132 330 168 314 205", "Add the right curve.")
  ]),
  character("ಓ", [
    stroke("M 175 96 C 205 118 240 110 250 82", "Make the top mark."),
    stroke("M 150 145 C 115 162 105 218 138 250 C 178 288 245 282 278 238", "Make the left round body."),
    stroke("M 150 145 C 196 110 250 130 252 172 C 254 214 198 225 138 210", "Make the top loop."),
    stroke("M 275 128 C 312 132 330 168 314 205", "Add the right curve.")
  ]),
  character("ಔ", [
    stroke("M 120 125 C 160 92 220 100 230 145 C 238 185 190 205 135 192", "Make the upper body."),
    stroke("M 130 198 C 92 225 105 282 152 292 C 200 302 238 270 220 232", "Make the lower loop."),
    stroke("M 238 154 L 300 154", "Draw the top line."),
    stroke("M 252 154 C 305 180 300 250 248 268", "Add the right curve."),
    stroke("M 250 268 C 300 270 320 315 285 338", "Finish the lower curl.")
  ]),
  character("ಅಂ", [
    ...KANNADA_A_BASE,
    stroke("M 323 145 C 305 145 294 156 294 172 C 294 190 306 202 323 202 C 340 202 352 190 352 172 C 352 156 340 145 323 145", "Add the dot.")
  ]),
  character("ಅಃ", [
    ...KANNADA_A_BASE,
    stroke("M 323 130 C 307 130 298 140 298 155 C 298 170 308 180 323 180 C 338 180 348 170 348 155 C 348 140 338 130 323 130", "Add the top dot."),
    stroke("M 323 220 C 307 220 298 230 298 245 C 298 260 308 270 323 270 C 338 270 348 260 348 245 C 348 230 338 220 323 220", "Add the bottom dot.")
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
  },
  kannadaSwaras: {
    label: "ಕನ್ನಡ ಸ್ವರಗಳು",
    headingLabel: "Kannada swara",
    itemLabel: "Swara",
    characters: KANNADA_SWARAS
  }
};

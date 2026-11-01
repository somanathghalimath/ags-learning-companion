"use strict";

/*
 * ADDING CHARACTERS
 * -----------------
 * 1. Choose a set: `uppercase`, `lowercase`, `numbers`, or
 *    `kannadaSwaras` or `kannadaVyanjanas`.
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
    stroke("M 200.00 70.00 L 133.50 250.00", "Start at the top and slide down left."),
    stroke("M 200.00 70.00 L 266.50 250.00", "Start at the top and slide down right."),
    stroke("M 161.50 178.00 L 238.50 178.00", "Draw a line across the middle.")
  ]),
  character("B", [
    stroke("M 147.50 70.00 L 147.50 250.00", "Start at the top and draw straight down."),
    stroke("M 147.50 70.00 L 207.00 70.00 C 259.50 70.00 259.50 156.54 207.00 156.54 L 147.50 156.54", "Go right and around to the middle."),
    stroke("M 147.50 156.54 L 210.50 156.54 C 270.00 156.54 270.00 250.00 210.50 250.00 L 147.50 250.00", "Go right and around to the bottom.")
  ]),
  character("C", [
    stroke("M 263.00 92.10 C 238.50 64.33 189.50 62.24 154.50 88.63 C 105.50 126.12 110.40 206.65 160.10 237.20 C 195.80 259.42 240.60 251.09 264.40 224.70", "Start at the top right and curve all the way around.")
  ]),
  character("D", [
    stroke("M 147.50 70.00 L 147.50 250.00", "Draw a straight line down."),
    stroke("M 147.50 70.00 L 193.00 70.00 C 273.50 70.00 273.50 250.00 193.00 250.00 L 147.50 250.00", "Go right and curve around to the bottom.")
  ]),
  character("E", [
    stroke("M 147.50 70.00 L 147.50 250.00", "Draw a straight line down."),
    stroke("M 147.50 70.00 L 266.50 70.00", "Draw the top line across."),
    stroke("M 147.50 160.00 L 242.00 160.00", "Draw the middle line across."),
    stroke("M 147.50 250.00 L 266.50 250.00", "Draw the bottom line across.")
  ]),
  character("F", [
    stroke("M 147.50 70.00 L 147.50 250.00", "Draw a straight line down."),
    stroke("M 147.50 70.00 L 266.50 70.00", "Draw the top line across."),
    stroke("M 147.50 160.00 L 242.00 160.00", "Draw the middle line across.")
  ]),
  character("G", [
    stroke("M 266.50 94.28 C 238.50 64.08 186.00 60.56 151.00 92.18 C 107.60 130.81 114.60 211.60 161.50 239.70 C 203.50 264.29 263.00 243.21 266.50 194.04", "Curve from the top right around to the lower right."),
    stroke("M 266.50 194.04 L 266.50 160.00 L 217.50 160.00", "Go up a little, then draw a short line inward.")
  ]),
  character("H", [
    stroke("M 140.50 70.00 L 140.50 250.00", "Draw the left line down."),
    stroke("M 259.50 70.00 L 259.50 250.00", "Draw the right line down."),
    stroke("M 140.50 160.00 L 259.50 160.00", "Join the lines across the middle.")
  ]),
  character("I", [
    stroke("M 140.50 70.00 L 259.50 70.00", "Draw the top line across."),
    stroke("M 200.00 70.00 L 200.00 250.00", "Draw a straight line down the middle."),
    stroke("M 140.50 250.00 L 259.50 250.00", "Draw the bottom line across.")
  ]),
  character("J", [
    stroke("M 133.50 70.00 L 266.50 70.00", "Draw the top line across."),
    stroke("M 238.50 70.00 L 238.50 199.39 C 238.50 251.84 165.00 269.33 133.50 223.87", "Draw down and curve to the left.")
  ]),
  character("K", [
    stroke("M 144.00 70.00 L 144.00 250.00", "Draw a straight line down."),
    stroke("M 263.00 70.00 L 144.00 170.38", "Slant down to the middle."),
    stroke("M 186.00 135.77 L 270.00 250.00", "Slant down to the bottom right.")
  ]),
  character("L", [
    stroke("M 147.50 70.00 L 147.50 250.00 L 266.50 250.00", "Draw down, then across the bottom.")
  ]),
  character("M", [
    stroke("M 123.00 250.00 L 123.00 70.00", "Draw the left line up."),
    stroke("M 123.00 70.00 L 200.00 177.31", "Slant down to the middle."),
    stroke("M 200.00 177.31 L 277.00 70.00", "Slant up to the right."),
    stroke("M 277.00 70.00 L 277.00 250.00", "Draw the right line down.")
  ]),
  character("N", [
    stroke("M 133.50 250.00 L 133.50 70.00", "Draw the left line up."),
    stroke("M 133.50 70.00 L 266.50 250.00", "Slant down to the bottom right."),
    stroke("M 266.50 250.00 L 266.50 70.00", "Draw the right line up.")
  ]),
  character("O", [
    stroke("M 200.00 70.00 C 144.00 70.00 116.00 104.62 116.00 160.00 C 116.00 218.85 147.50 250.00 200.00 250.00 C 252.50 250.00 284.00 218.85 284.00 160.00 C 284.00 101.15 252.50 70.00 200.00 70.00", "Start at the top and go all the way around.")
  ]),
  character("P", [
    stroke("M 144.00 70.00 L 144.00 250.00", "Draw a straight line down."),
    stroke("M 144.00 70.00 L 207.00 70.00 C 270.00 70.00 270.00 163.46 207.00 163.46 L 144.00 163.46", "Go right and curve back to the middle.")
  ]),
  character("Q", [
    stroke("M 196.50 70.00 C 140.50 70.00 114.60 104.62 114.60 160.00 C 114.60 218.85 144.00 250.00 196.50 250.00 C 249.00 250.00 280.50 218.85 280.50 160.00 C 280.50 101.15 249.00 70.00 196.50 70.00", "Start at the top and go all the way around."),
    stroke("M 217.50 205.00 L 280.50 260.38", "Add a short slanting tail.")
  ]),
  character("R", [
    stroke("M 144.00 70.00 L 144.00 250.00", "Draw a straight line down."),
    stroke("M 144.00 70.00 L 207.00 70.00 C 270.00 70.00 270.00 163.46 207.00 163.46 L 144.00 163.46", "Go right and curve back to the middle."),
    stroke("M 203.50 163.46 L 273.50 250.00", "Slant down to the bottom right.")
  ]),
  character("S", [
    stroke("M 263.00 91.13 C 235.00 59.82 161.50 63.30 137.00 101.57 C 112.50 139.83 147.50 157.23 200.00 160.71 C 256.00 164.18 280.50 192.01 256.00 226.80 C 231.50 261.59 154.50 254.63 130.00 223.32", "Curve left, then right, then left again.")
  ]),
  character("T", [
    stroke("M 123.00 70.00 L 277.00 70.00", "Draw the top line across."),
    stroke("M 200.00 70.00 L 200.00 250.00", "Draw a straight line down the middle.")
  ]),
  character("U", [
    stroke("M 126.50 70.00 L 126.50 183.14 C 126.50 272.29 273.50 272.29 273.50 183.14 L 273.50 70.00", "Draw down, curve around, and go back up.")
  ]),
  character("V", [
    stroke("M 123.00 70.00 L 200.00 250.00 L 277.00 70.00", "Slant down, then slant back up.")
  ]),
  character("W", [
    stroke("M 105.50 70.00 L 147.50 250.00 L 200.00 132.31 L 252.50 250.00 L 294.50 70.00", "Go down, up, down, and up again.")
  ]),
  character("X", [
    stroke("M 126.50 70.00 L 273.50 250.00", "Slant down to the bottom right."),
    stroke("M 273.50 70.00 L 126.50 250.00", "Slant down to the bottom left.")
  ]),
  character("Y", [
    stroke("M 123.00 70.00 L 200.00 163.46", "Slant down to the middle."),
    stroke("M 277.00 70.00 L 200.00 163.46", "Slant down to the middle from the right."),
    stroke("M 200.00 163.46 L 200.00 250.00", "Draw straight down.")
  ]),
  character("Z", [
    stroke("M 123.00 70.00 L 277.00 70.00 L 123.00 250.00 L 277.00 250.00", "Go across, slant down, and go across again.")
  ])
];

const LOWERCASE = [
  character("a", [
    stroke("M 200.00 160.00 C 165.00 160.00 144.00 179.38 144.00 205.00 C 144.00 232.69 166.40 250.00 198.60 250.00 C 226.60 250.00 242.00 230.62 242.00 205.00 C 242.00 179.38 224.50 160.00 200.00 160.00", "Make a small round body."),
    stroke("M 242.00 160.00 L 242.00 250.00", "Draw the short line down.")
  ]),
  character("b", [
    stroke("M 161.50 70.00 L 161.50 250.00", "Draw a tall line down."),
    stroke("M 161.50 173.50 C 175.50 156.11 217.50 152.64 238.50 180.45 C 263.00 213.14 238.50 250.00 200.00 250.00 C 179.00 250.00 163.60 234.70 161.50 213.84", "Curve around to make the belly.")
  ]),
  character("c", [
    stroke("M 249.00 178.21 C 228.00 154.27 182.50 152.91 158.00 180.26 C 131.40 211.71 152.40 250.00 196.50 250.00 C 221.00 250.00 238.50 239.74 250.40 224.70", "Start at the top and curve around.")
  ]),
  character("d", [
    stroke("M 224.50 70.00 L 224.50 250.00", "Draw a tall line down."),
    stroke("M 224.50 173.50 C 208.40 156.11 170.60 152.64 151.00 180.45 C 128.60 213.14 152.40 250.00 189.50 250.00 C 210.50 250.00 224.50 234.70 224.50 213.84", "Curve around to make the body.")
  ]),
  character("e", [
    stroke("M 161.50 201.71 L 245.50 201.71 C 245.50 176.04 222.40 160.00 196.50 160.00 C 165.00 160.00 144.00 181.18 144.00 208.13 C 144.00 235.73 167.80 251.77 201.40 249.84 C 221.00 248.56 236.40 240.86 249.00 229.31", "Go across, then curve around.")
  ]),
  character("f", [
    stroke("M 231.50 77.69 C 210.50 60.88 182.50 71.80 182.50 108.79 L 182.50 250.00", "Curve at the top and draw down."),
    stroke("M 151.00 160.00 L 224.50 160.00", "Cross the middle.")
  ]),
  character("g", [
    stroke("M 200.00 160.00 C 165.00 160.00 144.00 179.38 144.00 205.00 C 144.00 232.69 166.40 250.00 198.60 250.00 C 226.60 250.00 242.00 230.62 242.00 205.00 C 242.00 179.38 224.50 160.00 200.00 160.00", "Make a small round body."),
    stroke("M 242.00 160.00 L 242.00 295.00 C 242.00 325.00 228.00 340.00 210.50 340.00 C 189.50 340.00 168.50 325.00 161.50 310.00", "Draw the tail down and curve left.")
  ]),
  character("h", [
    stroke("M 158.00 70.00 L 158.00 250.00", "Draw a tall line down."),
    stroke("M 158.00 182.55 C 172.00 161.25 210.50 149.18 231.50 173.32 C 242.00 186.10 242.00 203.85 242.00 250.00", "Go up and around for the hump.")
  ]),
  character("i", [
    stroke("M 200.00 160.00 L 200.00 250.00", "Draw a short line down."),
    stroke("M 200.00 115.00 L 200.00 117.00", "Add the dot.")
  ]),
  character("j", [
    stroke("M 214.00 160.00 L 214.00 295.00 C 214.00 325.00 203.50 340.00 186.00 340.00 C 175.50 340.00 165.00 330.00 161.50 320.00", "Draw down and hook left."),
    stroke("M 214.00 115.00 L 214.00 117.00", "Add the dot.")
  ]),
  character("k", [
    stroke("M 161.50 70.00 L 161.50 250.00", "Draw a tall line down."),
    stroke("M 238.50 160.00 L 161.50 211.92", "Slant down to the middle."),
    stroke("M 186.00 194.62 L 245.50 250.00", "Slant down to the bottom.")
  ]),
  character("l", [
    stroke("M 200.00 70.00 L 200.00 250.00", "Draw a tall line down.")
  ]),
  character("m", [
    stroke("M 126.50 160.00 L 126.50 250.00", "Draw a short line down."),
    stroke("M 126.50 184.83 C 140.50 159.48 175.50 148.62 189.50 176.14 C 196.50 188.45 196.50 206.55 196.50 250.00", "Make the first hump."),
    stroke("M 196.50 184.83 C 210.50 159.48 245.50 148.62 259.50 176.14 C 266.50 188.45 266.50 206.55 266.50 250.00", "Make the second hump.")
  ]),
  character("n", [
    stroke("M 151.00 160.00 L 151.00 250.00", "Draw a short line down."),
    stroke("M 151.00 184.83 C 168.50 159.48 210.50 148.62 231.50 176.14 C 242.00 190.62 242.00 208.00 242.00 250.00", "Make one hump.")
  ]),
  character("o", [
    stroke("M 200.00 160.00 C 165.00 160.00 144.00 179.29 144.00 205.00 C 144.00 233.93 166.40 250.00 200.00 250.00 C 233.60 250.00 256.00 233.93 256.00 205.00 C 256.00 178.00 235.00 160.00 200.00 160.00", "Go all the way around.")
  ]),
  character("p", [
    stroke("M 161.50 160.00 L 161.50 340.00", "Draw down below the line."),
    stroke("M 161.50 173.50 C 175.50 156.11 217.50 152.64 238.50 180.45 C 263.00 213.14 238.50 250.00 200.00 250.00 C 179.00 250.00 163.60 234.70 161.50 213.84", "Curve around to make the belly.")
  ]),
  character("q", [
    stroke("M 200.00 160.00 C 165.00 160.00 144.00 179.38 144.00 205.00 C 144.00 232.69 166.40 250.00 198.60 250.00 C 226.60 250.00 242.00 230.62 242.00 205.00 C 242.00 179.38 224.50 160.00 200.00 160.00", "Make a small round body."),
    stroke("M 242.00 160.00 L 242.00 340.00", "Draw the tail down.")
  ]),
  character("r", [
    stroke("M 165.00 160.00 L 165.00 250.00", "Draw a short line down."),
    stroke("M 165.00 250.00 C 180.40 167.27 210.50 136.54 233.60 179.09", "Make a small shoulder.")
  ]),
  character("s", [
    stroke("M 242.00 174.57 C 222.40 154.32 175.50 154.32 161.50 179.96 C 147.50 205.60 242.00 197.51 238.50 228.55 C 235.00 256.89 175.50 255.54 154.50 233.94", "Curve one way, then the other.")
  ]),
  character("t", [
    stroke("M 200.00 110.00 L 200.00 226.69 C 200.00 249.27 221.00 256.80 238.50 243.25", "Draw down."),
    stroke("M 165.00 160.00 L 235.00 160.00", "Cross the middle.")
  ]),
  character("u", [
    stroke("M 154.50 160.00 L 154.50 215.38 C 154.50 239.62 172.00 250.00 196.50 250.00 C 221.00 250.00 238.50 232.69 238.50 208.46 L 238.50 160.00", "Go down, curve, and go up."),
    stroke("M 238.50 160.00 L 238.50 250.00", "Finish the short line.")
  ]),
  character("v", [
    stroke("M 147.50 160.00 L 200.00 250.00 L 252.50 160.00", "Slant down, then slant up.")
  ]),
  character("w", [
    stroke("M 123.00 160.00 L 158.00 250.00 L 200.00 184.23 L 242.00 250.00 L 277.00 160.00", "Go down, up, down, and up.")
  ]),
  character("x", [
    stroke("M 151.00 160.00 L 249.00 250.00", "Slant down to the right."),
    stroke("M 249.00 160.00 L 151.00 250.00", "Slant down to the left.")
  ]),
  character("y", [
    stroke("M 147.50 160.00 L 200.00 250.00", "Slant down to the middle."),
    stroke("M 252.50 160.00 L 200.00 250.00 L 182.50 310.00 C 175.50 330.00 165.00 340.00 151.00 340.00", "Slant down and curve left.")
  ]),
  character("z", [
    stroke("M 151.00 160.00 L 249.00 160.00 L 151.00 250.00 L 249.00 250.00", "Go across, slant down, and go across.")
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

// Kannada handwriting vectors and provenance are in kannada.js.

window.LETTER_LIBRARY = {
  uppercase: {
    label: "Uppercase",
    headingLabel: "Uppercase",
    itemLabel: "Letter",
    notebookGuides: true,
    characters: UPPERCASE
  },
  lowercase: {
    label: "Lowercase",
    headingLabel: "Lowercase",
    itemLabel: "Letter",
    notebookGuides: true,
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
    speechLang: "kn-IN",
    strokeWidth: 12,
    startHold: 800,
    linearMotion: true,
    durationByLength: true,
    characters: window.KANNADA_SWARAS
  },
  kannadaVyanjanas: {
    label: "ಕನ್ನಡ ವ್ಯಂಜನಗಳು",
    headingLabel: "Kannada vyanjana",
    itemLabel: "Vyanjana",
    speechLang: "kn-IN",
    strokeWidth: 12,
    startHold: 800,
    linearMotion: true,
    durationByLength: true,
    characters: window.KANNADA_VYANJANAS
  }
};

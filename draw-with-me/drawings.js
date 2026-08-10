"use strict";

/*
 * ADDING A DRAWING
 * ----------------
 * Add one `drawing()` entry to DRAWINGS. Each `stroke()` is one continuous
 * pencil movement in the order a child should copy it into a notebook.
 *
 * Paths use the app's 480 × 400 SVG viewBox. Keep pictures large, prefer
 * straight segments for early pencil control, and aim for 6–11 meaningful
 * strokes. The faint guide and animated blue line are generated from the
 * exact same path, so they always align.
 *
 * Example:
 * drawing("Flag", [
 *   stroke("M 170 55 L 170 340"),
 *   stroke("M 170 65 L 320 110 L 170 165 Z")
 * ])
 */

function stroke(d) {
  return { d };
}

function circle(cx, cy, radius) {
  return stroke(
    `M ${cx + radius} ${cy} ` +
    `A ${radius} ${radius} 0 1 1 ${cx - radius} ${cy} ` +
    `A ${radius} ${radius} 0 1 1 ${cx + radius} ${cy}`
  );
}

function drawing(name, strokes) {
  return { name, strokes };
}

const DRAWINGS = [
  drawing("House", [
    stroke("M 70 185 L 240 55 L 410 185"),
    stroke("M 105 160 L 105 330 L 375 330 L 375 160"),
    stroke("M 306 112 L 306 75 L 345 75 L 345 141"),
    stroke("M 205 330 L 205 228 L 275 228 L 275 330"),
    stroke("M 132 198 L 196 198 L 196 272 L 132 272 Z"),
    stroke("M 164 198 L 164 272"),
    stroke("M 133 235 L 195 235"),
    stroke("M 250 276 L 260 276 L 260 286 L 250 286 Z"),
    stroke("M 55 340 L 425 340")
  ]),

  drawing("Indian Flag", [
    stroke("M 75 350 L 258 350 L 258 375 L 75 375 Z"),
    stroke("M 104 325 L 228 325 L 228 350 L 104 350 Z"),
    stroke("M 128 300 L 202 300 L 202 325 L 128 325 Z"),
    stroke("M 154 300 L 154 96 L 173 96 L 173 300"),
    circle(164, 80, 14),
    stroke("M 173 98 L 382 98 L 382 220 L 173 220"),
    stroke("M 173 139 L 382 139"),
    stroke("M 173 179 L 382 179"),
    circle(278, 159, 16),
    stroke("M 278 143 L 278 175 L 278 159 L 294 159 L 262 159"),
    stroke("M 267 148 L 289 170 L 278 159 L 289 148 L 267 170")
  ]),

  drawing("Robot", [
    stroke("M 155 58 L 325 58 L 325 165 L 155 165 Z"),
    stroke("M 240 58 L 240 28 L 258 28"),
    stroke("M 182 88 L 220 88 L 220 126 L 182 126 Z"),
    stroke("M 260 88 L 298 88 L 298 126 L 260 126 Z"),
    stroke("M 195 145 L 285 145"),
    stroke("M 175 180 L 305 180 L 305 298 L 175 298 Z"),
    stroke("M 210 210 L 270 210 L 270 260 L 210 260 Z"),
    stroke("M 175 205 L 125 205 L 105 260"),
    stroke("M 305 205 L 355 205 L 375 260"),
    stroke("M 210 298 L 210 350 L 178 350"),
    stroke("M 270 298 L 270 350 L 302 350")
  ]),

  drawing("Truck", [
    stroke("M 50 275 L 50 140 L 255 140 L 255 185 L 325 185 L 390 245 L 390 275 L 355 275 L 355 252 L 285 252 L 285 275 L 170 275 L 170 252 L 100 252 L 100 275 Z"),
    stroke("M 282 200 L 319 200 L 360 238 L 282 238 Z"),
    stroke("M 270 253 L 292 253"),
    circle(135, 289, 34),
    circle(320, 289, 34),
    stroke("M 118 289 L 152 289"),
    stroke("M 303 289 L 337 289"),
    stroke("M 40 330 L 435 330")
  ]),

  drawing("Sailboat", [
    stroke("M 240 70 L 240 258"),
    stroke("M 230 92 L 118 238 L 230 238 Z"),
    stroke("M 250 91 L 360 238 L 250 238 Z"),
    stroke("M 240 72 L 240 48 L 300 66 L 240 84"),
    stroke("M 105 252 L 375 252 L 348 307 L 132 307 Z"),
    stroke("M 48 325 L 82 307 L 116 325 L 150 307 L 184 325 L 218 307 L 252 325 L 286 307 L 320 325 L 354 307 L 388 325 L 422 307 L 442 325"),
    stroke("M 72 360 L 104 342 L 136 360 L 168 342 L 200 360 L 232 342 L 264 360 L 296 342 L 328 360 L 360 342 L 392 360 L 424 342"),
    stroke("M 360 105 L 378 91 L 396 105"),
    stroke("M 398 145 L 412 134 L 426 145")
  ]),

  drawing("Rocket", [
    stroke("M 240 42 L 286 115 L 286 275 L 194 275 L 194 115 Z"),
    stroke("M 214 135 L 266 135 L 266 187 L 214 187 Z"),
    stroke("M 194 220 L 150 275 L 150 325 L 194 292"),
    stroke("M 286 220 L 330 275 L 330 325 L 286 292"),
    stroke("M 215 275 L 215 320 L 240 360 L 265 320 L 265 275"),
    stroke("M 228 275 L 228 316 L 240 340"),
    stroke("M 252 275 L 252 316 L 240 340"),
    stroke("M 85 118 L 85 148 L 85 133 L 70 133 L 100 133"),
    stroke("M 392 92 L 392 118 L 392 105 L 379 105 L 405 105")
  ])
];

window.DRAWINGS = DRAWINGS;

"use strict";

/*
 * ADDING A DRAWING
 * ----------------
 * Add one `drawing()` entry to DRAWINGS. Each `stroke()` is one continuous
 * pencil movement in the order a child should copy it into a notebook.
 *
 * Paths use the app's 480 × 400 SVG viewBox. Keep pictures large, use round
 * shapes, and aim for 6–11 meaningful strokes. The faint guide and animated
 * blue line are generated from the exact same path, so they always align.
 *
 * Example:
 * drawing("Balloon", [
 *   stroke("M 240 70 C 180 70 165 150 195 195 C 210 218 230 225 240 230 C 250 225 270 218 285 195 C 315 150 300 70 240 70 Z"),
 *   stroke("M 240 230 C 220 260 265 285 240 330")
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
    stroke("M 70 190 L 240 62 L 410 190"),
    stroke("M 105 164 L 105 330 L 375 330 L 375 164"),
    stroke("M 306 112 L 306 75 L 345 75 L 345 141"),
    stroke("M 205 330 L 205 244 Q 205 228 221 228 L 259 228 Q 275 228 275 244 L 275 330"),
    stroke("M 132 207 Q 132 198 141 198 L 187 198 Q 196 198 196 207 L 196 263 Q 196 272 187 272 L 141 272 Q 132 272 132 263 Z"),
    stroke("M 164 199 L 164 271"),
    stroke("M 133 235 L 195 235"),
    circle(255, 277, 5),
    stroke("M 55 337 C 150 328 330 328 425 337")
  ]),

  drawing("Fish", [
    stroke("M 92 205 C 145 120 295 120 365 205 C 295 290 145 290 92 205 Z"),
    stroke("M 362 204 C 400 164 430 158 421 204 C 430 250 400 244 362 204 Z"),
    circle(160, 174, 12),
    stroke("M 198 157 C 177 181 177 226 200 250"),
    stroke("M 112 214 Q 130 230 148 214"),
    stroke("M 235 134 Q 270 91 306 143"),
    stroke("M 235 276 Q 270 315 306 267"),
    circle(395, 123, 14),
    circle(428, 82, 9)
  ]),

  drawing("Flower", [
    stroke("M 240 120 C 218 94 218 57 240 45 C 262 57 262 94 240 120 Z"),
    stroke("M 269 137 C 279 104 316 93 333 115 C 332 142 302 158 274 158 Z"),
    stroke("M 273 174 C 305 171 331 198 318 225 C 291 237 267 208 263 187 Z"),
    stroke("M 247 188 C 274 211 272 251 245 264 C 217 251 216 213 234 188 Z"),
    stroke("M 213 174 C 182 171 154 197 165 224 C 190 239 216 209 220 187 Z"),
    stroke("M 211 137 C 202 104 164 93 148 116 C 150 143 180 158 207 158 Z"),
    circle(240, 155, 35),
    stroke("M 240 190 C 235 242 245 290 240 344"),
    stroke("M 239 278 C 209 247 171 253 180 285 C 195 305 221 299 239 278 Z"),
    stroke("M 241 306 C 270 274 308 279 300 311 C 285 330 259 324 241 306 Z"),
    stroke("M 150 348 Q 240 334 330 348")
  ]),

  drawing("Tree", [
    stroke("M 238 220 C 190 245 145 220 150 178 C 105 165 105 112 150 100 C 155 58 214 48 240 80 C 267 45 327 58 330 101 C 375 112 375 165 330 180 C 330 220 280 240 238 220 Z"),
    stroke("M 203 334 C 212 292 206 248 216 214 C 230 226 251 226 265 214 C 275 250 269 293 280 334 Z"),
    stroke("M 224 260 C 208 232 190 211 170 194"),
    stroke("M 257 258 C 276 232 294 211 313 194"),
    circle(182, 127, 13),
    circle(247, 105, 13),
    circle(302, 143, 13),
    stroke("M 125 340 Q 240 324 355 340")
  ]),

  drawing("Car", [
    stroke("M 68 220 Q 59 220 59 241 L 59 272 Q 59 288 76 288 L 404 288 Q 421 288 421 272 L 421 244 Q 421 220 397 220 Z"),
    stroke("M 116 220 L 158 162 Q 167 149 185 149 L 294 149 Q 311 149 321 162 L 365 220"),
    stroke("M 240 150 L 240 220"),
    circle(128, 289, 35),
    circle(328, 289, 35),
    circle(128, 289, 12),
    circle(328, 289, 12),
    circle(388, 240, 11),
    stroke("M 75 255 L 105 255")
  ]),

  drawing("Sailboat", [
    stroke("M 240 70 L 240 258"),
    stroke("M 230 92 L 118 238 L 230 238 Z"),
    stroke("M 250 91 L 360 238 L 250 238 Z"),
    stroke("M 240 72 L 240 48 L 300 66 L 240 84"),
    stroke("M 105 252 Q 240 286 375 252 L 348 307 Q 240 342 132 307 Z"),
    stroke("M 48 323 C 82 302 116 344 150 323 C 184 302 218 344 252 323 C 286 302 320 344 354 323 C 388 302 420 340 440 324"),
    stroke("M 72 358 C 104 338 136 378 168 358 C 200 338 232 378 264 358 C 296 338 328 378 360 358 C 392 338 416 370 435 359"),
    circle(395, 82, 30)
  ]),

  drawing("Butterfly", [
    stroke("M 240 128 C 220 147 220 229 240 260 C 260 229 260 147 240 128 Z"),
    stroke("M 224 153 C 183 78 92 87 104 172 C 111 221 173 209 225 186"),
    stroke("M 256 153 C 297 78 388 87 376 172 C 369 221 307 209 255 186"),
    stroke("M 224 190 C 179 200 128 227 145 279 C 166 312 211 270 232 232"),
    stroke("M 256 190 C 301 200 352 227 335 279 C 314 312 269 270 248 232"),
    stroke("M 234 133 C 222 104 205 91 187 88"),
    stroke("M 246 133 C 258 104 275 91 293 88"),
    stroke("M 150 145 C 172 126 198 134 210 158"),
    stroke("M 330 145 C 308 126 282 134 270 158")
  ]),

  drawing("Rocket", [
    stroke("M 240 48 C 183 95 177 220 205 286 L 275 286 C 303 220 297 95 240 48 Z"),
    circle(240, 154, 27),
    stroke("M 205 242 C 168 256 145 291 151 328 L 207 292"),
    stroke("M 275 242 C 312 256 335 291 329 328 L 273 292"),
    stroke("M 220 288 C 208 316 218 342 240 361 C 262 342 272 316 260 288"),
    stroke("M 230 288 C 226 312 231 329 240 342"),
    stroke("M 250 288 C 254 312 249 329 240 342"),
    stroke("M 85 118 L 85 148 L 85 133 L 70 133 L 100 133"),
    stroke("M 392 92 L 392 118 L 392 105 L 379 105 L 405 105")
  ])
];

window.DRAWINGS = DRAWINGS;

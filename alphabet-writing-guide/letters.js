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

/*
 * Kannada swaras
 * ---------------
 * These are centerline handwriting paths: the faint guide and animated stroke
 * use exactly the same geometry. Most Kannada swaras are a continuous motion,
 * so do not split a path merely because the printed glyph has several shapes.
 *
 * Stroke order and letter construction are based on the CC BY-SA 4.0 Kannada
 * handwriting animations by Gopala Krishna A on Wikimedia Commons:
 * https://commons.wikimedia.org/wiki/Category:Animations_of_Kannada_letters
 *
 * To add another Kannada character, add one `character()` entry and one
 * `stroke()` per genuine pen-down motion, in the demonstrated writing order.
 */

const KANNADA_SWARAS = [
  character("ಅ", [
    stroke("M 115 160 C 140 168 165 158 165 135 C 165 112 145 100 123 104 C 96 110 80 136 76 174 C 70 225 90 270 130 292 C 175 317 250 315 295 280 C 330 252 337 205 321 160 C 310 130 285 115 269 126 C 252 138 257 166 265 178 C 270 188 260 190 244 188 C 225 186 202 188 180 185", "Write the full letter in one continuous motion.")
  ]),
  character("ಆ", [
    stroke("M 105 165 C 130 175 155 158 155 135 C 155 110 132 100 110 108 C 82 119 70 150 72 185 C 75 250 120 295 190 305 C 260 315 320 292 325 245 C 328 210 310 185 287 165 C 270 150 270 127 287 112 C 305 98 328 108 330 130 C 332 155 315 173 292 175 C 265 177 235 185 204 184", "Write the full letter in one continuous motion.")
  ]),
  character("ಇ", [
    stroke("M 77 189 C 76 184 60 172 70 157 C 80 142 119 102 136 96 C 153 90 163 110 173 120 C 183 130 188 155 195 155 C 202 155 206 127 217 120 C 228 113 250 111 264 113 C 278 115 294 124 303 133 C 312 142 315 151 315 165 C 315 179 308 205 301 218 C 294 231 287 239 274 243 C 261 247 233 247 225 241 C 217 235 223 214 227 206 C 231 198 238 197 247 196 C 256 195 275 198 283 201 C 291 204 292 201 293 211 C 294 221 289 246 288 260 C 287 274 285 288 288 297 C 291 306 298 316 305 314 C 312 312 326 287 330 282", "Write the full letter in one continuous motion.")
  ]),
  character("ಈ", [
    stroke("M 92 184 C 90 188 84 196 81 205 C 78 214 73 228 76 237 C 79 246 92 250 100 257 C 108 264 112 276 126 280 C 140 284 170 285 182 282 C 194 279 195 270 201 261 C 207 252 218 238 220 229 C 222 220 221 217 216 205 C 211 193 200 167 188 158 C 176 149 155 152 145 151 C 135 150 133 154 126 151 C 119 148 99 135 102 132 C 105 129 130 130 145 132 C 160 134 180 146 190 143 C 200 140 205 116 208 111", "Make the round body and upper turn."),
    stroke("M 70 212 C 80 212 111 210 132 211 C 153 212 177 219 195 218 C 213 217 227 206 242 205 C 257 204 274 210 285 211 C 296 212 302 216 309 211 C 316 206 332 195 330 183 C 328 171 303 141 294 141 C 285 141 275 169 274 181 C 273 193 282 204 289 214 C 296 224 310 233 315 242 C 320 251 319 260 317 270 C 315 280 304 294 302 299", "Add the middle sweep and right loop.")
  ]),
  character("ಉ", [
    stroke("M 88 184 C 91 184 99 189 105 186 C 111 183 128 176 126 168 C 124 160 102 144 94 141 C 86 138 85 144 81 150 C 77 156 72 168 70 178 C 68 188 69 201 70 211 C 71 221 66 230 75 240 C 84 250 106 271 121 272 C 136 273 157 258 165 247 C 173 236 170 223 171 208 C 172 193 165 166 170 155 C 175 144 193 144 202 144 C 211 144 220 150 226 157 C 232 164 230 174 235 189 C 240 204 243 235 253 247 C 263 259 283 263 296 260 C 309 257 325 244 330 231 C 335 218 329 196 324 183 C 319 170 306 156 298 150 C 290 144 284 148 279 146 C 274 144 268 139 266 138", "Write the full letter in one continuous motion.")
  ]),
  character("ಊ", [
    stroke("M 100 191 C 101 188 109 178 107 173 C 105 168 92 162 86 163 C 80 164 72 170 70 177 C 68 184 74 198 77 207 C 80 216 84 223 89 229 C 94 235 101 244 110 245 C 119 246 137 244 142 234 C 147 224 137 198 140 186 C 143 174 152 165 160 161 C 168 157 184 158 189 163 C 194 168 190 183 192 194 C 194 205 197 220 202 229 C 207 238 213 247 222 249 C 231 251 252 249 257 239 C 262 229 250 199 252 187 C 254 175 262 170 271 167 C 280 164 297 161 307 167 C 317 173 327 192 330 201 C 333 210 326 214 323 222 C 320 230 316 250 310 249 C 304 248 288 220 285 216 C 282 212 292 225 294 227", "Write the full letter in one continuous motion.")
  ]),
  character("ಋ", [
    stroke("M 96 161 C 97 163 105 166 103 171 C 101 176 92 192 86 194 C 80 196 72 190 70 184 C 68 178 75 167 76 161 C 77 155 71 151 76 148 C 81 145 99 142 108 144 C 117 146 126 155 131 161 C 136 167 136 174 139 181 C 142 188 150 189 151 200 C 152 211 149 234 145 246 C 141 258 132 264 125 269 C 118 274 109 278 102 276 C 95 274 87 265 83 259 C 79 253 80 242 79 239 C 78 236 74 241 77 239 C 80 237 92 228 97 229 C 102 230 110 239 110 243 C 110 247 106 254 100 253 C 94 252 81 242 77 240", "Make the left loop and lower curl."),
    stroke("M 175 235 C 178 239 184 254 191 258 C 198 262 208 262 216 261 C 224 260 231 261 236 255 C 241 249 244 234 245 224 C 246 214 247 205 243 197 C 239 189 230 181 223 175 C 216 169 210 164 204 161 C 198 158 184 156 186 154 C 188 152 210 152 217 152 C 224 152 226 154 227 151 C 228 148 223 137 222 134", "Make the middle curve from bottom to top."),
    stroke("M 268 256 C 272 256 285 254 294 253 C 303 252 314 254 320 248 C 326 242 331 226 330 214 C 329 202 323 183 316 175 C 309 167 296 170 288 167 C 280 164 269 161 265 160", "Finish the right curve from bottom to top.")
  ]),
  character("ಎ", [
    stroke("M 148 233 C 143 229 129 211 116 211 C 103 211 80 224 72 233 C 64 242 66 256 70 267 C 74 278 88 292 97 299 C 106 306 110 313 123 311 C 136 309 162 295 174 289 C 186 283 186 278 194 277 C 202 276 214 280 221 282 C 228 284 226 290 233 291 C 240 292 248 292 262 289 C 276 286 307 280 318 274 C 329 268 326 264 328 250 C 330 236 336 209 330 192 C 324 175 306 160 291 148 C 276 136 256 129 238 121 C 220 113 199 103 184 99 C 169 95 158 98 150 99 C 142 100 140 102 138 102", "Write the full letter in one continuous motion.")
  ]),
  character("ಏ", [
    stroke("M 141 227 C 136 224 120 208 109 210 C 98 212 80 228 75 237 C 70 246 76 257 80 266 C 84 275 87 287 99 293 C 111 299 136 302 153 301 C 170 300 190 294 200 286 C 210 278 206 252 210 254 C 214 256 214 288 222 298 C 230 308 245 316 261 313 C 277 310 308 296 320 283 C 332 270 329 249 330 232 C 331 215 331 199 325 183 C 319 167 308 146 293 136 C 278 126 254 127 234 122 C 214 117 182 105 173 107 C 164 109 190 128 183 134 C 176 140 146 141 134 141 C 122 141 119 139 112 136 C 105 133 97 128 90 122 C 83 116 73 101 70 97", "Write the full letter in one continuous motion.")
  ]),
  character("ಐ", [
    stroke("M 103 207 C 98 214 66 236 70 252 C 74 268 106 297 124 303 C 142 309 165 299 178 289 C 191 279 195 248 201 245 C 207 242 207 265 215 273 C 223 281 236 290 248 292 C 260 294 276 302 290 287 C 304 272 330 230 330 205 C 330 180 304 151 288 135 C 272 119 250 109 234 107 C 218 105 202 120 192 125 C 182 130 181 137 175 137 C 169 137 163 129 154 125 C 145 121 131 115 119 114 C 107 113 89 120 82 121 C 75 122 78 111 77 118 C 76 125 79 157 79 165", "Write the full letter in one continuous motion.")
  ]),
  character("ಒ", [
    stroke("M 70 130 C 73 127 76 117 89 114 C 102 111 138 106 145 114 C 152 122 141 150 133 164 C 125 178 106 187 99 198 C 92 209 92 218 89 229 C 86 240 77 255 82 265 C 87 275 107 286 121 289 C 135 292 155 291 166 284 C 177 277 179 253 186 246 C 193 239 202 237 210 241 C 218 245 224 263 236 272 C 248 281 268 298 282 296 C 296 294 315 272 323 260 C 331 248 336 236 330 224 C 324 212 296 194 289 188", "Write the full letter in one continuous motion.")
  ]),
  character("ಓ", [
    stroke("M 100 179 C 104 175 114 157 124 155 C 134 153 158 158 163 167 C 168 176 160 197 153 209 C 146 221 130 228 124 237 C 118 246 118 254 116 264 C 114 274 106 286 110 294 C 114 302 130 311 142 314 C 154 317 172 316 181 310 C 190 304 191 284 197 278 C 203 272 210 270 217 274 C 224 278 229 292 239 300 C 249 308 266 322 278 320 C 290 318 305 300 312 290 C 319 280 323 269 318 259 C 313 249 290 234 284 229", "Make the main body in one continuous motion."),
    stroke("M 120 122 C 114 121 90 119 84 114 C 78 109 77 96 82 92 C 87 88 107 90 112 90", "Add the top mark.")
  ]),
  character("ಔ", [
    stroke("M 93 185 C 96 180 97 160 108 156 C 119 152 154 154 160 163 C 166 172 151 198 145 210 C 139 222 127 228 122 237 C 117 246 117 254 116 264 C 115 274 111 288 114 297 C 117 306 125 320 135 320 C 145 320 164 302 174 295 C 184 288 187 281 193 279 C 199 277 202 275 209 281 C 216 287 223 309 232 314 C 241 319 254 313 265 310 C 276 307 293 305 300 297 C 307 289 311 274 307 264 C 303 254 280 243 274 239", "Make the main body in one continuous motion."),
    stroke("M 110 131 C 116 130 138 130 143 127 C 148 124 145 117 143 115 C 141 113 135 115 133 115", "Add the small top turn."),
    stroke("M 158 94 C 164 93 184 91 197 90 C 210 89 226 86 238 90 C 250 94 261 105 271 113 C 281 121 291 130 296 140 C 301 150 302 166 303 171", "Draw the upper sweep."),
    stroke("M 303 171 C 297 174 278 190 265 191 C 252 192 231 187 224 179 C 217 171 220 150 222 142 C 224 134 230 128 234 129 C 238 130 246 146 249 150 C 252 154 254 155 255 156", "Finish the upper loop.")
  ]),
  character("ಅಂ", [
    stroke("M 89 181 C 90 182 89 190 92 190 C 95 190 104 186 107 180 C 110 174 112 159 110 154 C 108 149 100 150 95 151 C 90 152 84 150 80 157 C 76 164 71 180 70 190 C 69 200 69 208 73 218 C 77 228 84 241 92 248 C 100 255 111 260 123 262 C 135 264 150 260 163 259 C 176 258 190 259 199 253 C 208 247 212 233 217 223 C 222 213 226 202 226 193 C 226 184 220 174 214 167 C 208 160 199 152 192 151 C 185 150 172 159 170 164 C 168 169 175 175 177 179 C 179 183 185 184 183 187 C 181 190 171 193 164 195 C 157 197 149 200 142 201 C 135 202 126 199 123 199", "Write ಅ in one continuous motion."),
    stroke("M 243 236 C 248 240 258 260 270 261 C 282 262 302 248 312 245 C 322 242 328 247 330 242 C 332 237 328 225 326 214 C 324 203 324 187 317 176 C 310 165 294 151 282 148 C 270 145 253 152 246 158 C 239 164 241 174 239 181 C 237 188 236 195 236 198", "Add the circle mark from bottom to top.")
  ]),
  character("ಅಃ", [
    stroke("M 91 177 C 92 178 91 186 94 186 C 97 186 108 182 111 175 C 114 168 116 152 114 146 C 112 140 104 142 98 142 C 92 142 86 142 81 149 C 76 156 71 175 70 186 C 69 197 69 206 73 217 C 77 228 85 242 94 250 C 103 258 115 264 128 266 C 141 268 158 265 172 263 C 186 261 203 263 213 256 C 223 249 227 233 232 222 C 237 211 242 200 242 190 C 242 180 235 168 229 160 C 223 152 213 142 205 142 C 197 142 183 152 180 157 C 177 162 186 169 189 173 C 192 177 198 180 195 183 C 192 186 182 188 174 191 C 166 194 158 197 150 198 C 142 199 132 196 128 196", "Write ಅ in one continuous motion."),
    stroke("M 286 157 C 288 154 295 143 301 141 C 307 139 317 142 322 146 C 327 150 330 158 330 165 C 330 172 327 182 322 186 C 317 190 307 192 301 190 C 295 188 286 180 284 175 C 282 170 286 160 286 157", "Add the top circle."),
    stroke("M 286 237 C 288 234 295 222 301 220 C 307 218 317 221 322 225 C 327 229 330 238 330 245 C 330 252 327 262 322 266 C 317 270 307 271 301 269 C 295 267 286 260 284 255 C 282 250 286 240 286 237", "Add the bottom circle.")
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
    strokeWidth: 18,
    durationByLength: true,
    characters: KANNADA_SWARAS
  }
};

# Coordinates refer to page previews rendered to height 490, with aspect ratio preserved.
# Each row: label | left top right bottom. Full pages never enter crop processing.
PAGES = {
1: ('Domestic Animals', '''Cow|15 49 177 153
Goat|182 45 313 143
Sheep|22 165 137 263
Horse|180 146 291 307
Donkey|37 270 122 399'''),
3: ('Domestic Animals', '''Cat|45 75 124 173
Buffalo|143 89 299 198
Ox|12 176 140 284
Dog|168 215 300 329
Camel|21 280 115 420'''),
4: ('Wild Animals', '''Bear|30 79 109 204
Tiger|130 82 298 182
Lion|17 203 127 329
Fox|156 187 301 264
Elephant|174 269 302 419'''),
5: ('Wild Animals', '''Rhinoceros|13 103 134 193
Zebra|150 80 315 203
Hippopotamus|10 208 140 293
Leopard|160 208 315 316
Yak|17 297 120 419'''),
6: ('Common Birds', '''Cock|97 76 207 164
Parrot|214 78 304 226
Crane|3 123 111 309
Hen|91 173 185 276
Vulture|195 203 293 329
Duck|9 290 132 416'''),
7: ('Common Birds', '''Penguin|0 86 128 225
Eagle|121 80 227 214
Woodpecker|226 58 302 189
Swan|192 189 311 264
Owl|0 242 117 314
Peacock|31 214 186 405
Crow|184 274 310 326'''),
8: ('In the Oceans', '''Octopus|10 96 154 215
Fish|182 89 294 155
Shark|69 169 227 290
Dolphin|209 184 298 340
Whale|5 235 183 343
Turtle|12 344 115 433'''),
9: ('Some More Animals', '''Squirrel|3 84 143 181
Bat|135 71 304 182
Frog|119 167 226 246
Mongoose|1 236 124 304
Lizard|189 214 288 298
Snake|12 316 111 418'''),
10: ('Insects', '''Cockroach|0 86 111 184
Honey-bee|116 101 205 162
Butterfly|201 72 309 156
Mosquito|9 188 102 269
Ant|112 206 180 310
Grasshopper|169 181 285 243
Housefly|185 249 280 321
Spider|14 295 103 407'''),
11: ('Fruits', '''Watermelon|18 58 126 139
Cherries|205 56 342 119
Coconut|110 103 213 179
Pomegranate|225 124 341 202
Orange|10 148 108 221
Strawberries|127 188 248 257
Custard-Apple|6 224 126 321'''),
12: ('Fruits', '''Apple|4 79 109 184
Mango|115 80 190 182
Banana|194 73 303 182
Pear|7 199 96 296
Papaya|107 202 183 299
Pineapple|185 185 313 323
Grapes|7 322 117 401'''),
13: ('Vegetables', '''Ladies Finger|11 87 161 181
Cabbage|185 77 282 173
Turnip|9 199 103 329
Tomato|110 209 207 308
Brinjal|193 184 313 307
Cauliflower|1 310 101 407'''),
14: ('Vegetables', '''Cucumber|11 95 152 170
Pumpkin|179 73 277 181
Onion|10 179 92 274
Carrot|130 167 296 232
Lemon|92 243 176 320
Potato|181 242 291 320
Radish|3 318 126 414'''),
15: ('Flowers', '''Rose|2 83 99 210
Sunflower|110 89 201 203
Tulip|210 85 286 205
Jasmine|12 216 106 308
Marigold|110 213 203 307
Lotus|204 226 289 309
Shoeflower|6 318 106 417'''),
16: ('My Body', None),17: ('Family', None),18: ('A House', None),
19: ('Articles in a House', '''Raincoat|23 82 88 207
Sewing-Machine|112 82 192 159
Wardrobe|208 74 281 223
Hanger|112 174 192 221
Clock|28 221 75 309
Table|95 233 202 343
Umbrella|220 246 297 346
Chair|17 324 89 417'''),
20: ('Articles of Daily Use', '''Torchlight|3 86 177 146
Mirror|200 73 291 213
Thermos flask|0 151 83 294
Glass|131 154 186 266
Comb|79 236 193 325
Jug|192 220 283 322
Transistor|17 321 105 408'''),
21: ('Useful Objects', '''Lock|22 85 120 204
Scissors|121 107 215 224
Camera|200 82 291 162
Key|91 181 138 265
Basket|207 172 279 261
Candle|133 210 203 325
Weights|232 278 278 331
Lantern|14 236 83 418
Needle|77 262 123 396'''),
22: ('Our Daily Wear', '''Shirt|0 76 116 198
Vest|111 63 197 180
Shorts|149 144 216 210
Trouser|227 71 295 218
Tie|0 194 98 303
Coat|105 217 188 326
Sweater|189 222 307 334
Belt|0 296 108 333
Socks|33 337 119 419'''),
23: ('Electrical Appliances', '''Television|10 50 138 202
Table-fan|142 68 210 174
Refrigerator|211 68 304 229
Tube-light|90 188 201 266
Table-light|5 215 112 337
CD Player|141 263 310 322
Iron|9 351 118 410'''),
24: ('We Eat and Drink', '''Egg|23 97 126 164
Bread|160 84 305 138
Biscuits|0 165 104 249
Cheese|119 155 218 227
Butter|225 154 305 214
Sweets|14 265 102 331
Jam|122 245 180 324
Cake|201 252 298 324
Milk|0 345 81 423'''),
25: ('In the Kitchen', '''Tea Pot|18 98 151 216
Cup|103 184 169 232
Saucer|89 218 179 243
Kettle|183 81 277 186
Sugar Pot|209 191 281 272
Knife|1 225 132 311
Frying-Pan|156 280 293 324
Fork|0 277 128 356
Spoon|4 343 125 413'''),
26: ('Articles in the Bathroom', '''Washbasin|28 100 130 170
Bucket|131 103 223 203
Soap|233 105 291 138
Mug|219 153 289 220
Toothpaste|10 187 127 284
Toothbrush|56 230 175 309
Tongue-Cleaner|103 263 201 325
Towel|202 239 298 337
Tap|7 326 97 406'''),
27: ('Classroom', None),
28: ('On the Study Table', '''Exercise Book|24 64 119 206
Pencil|120 64 188 255
Pen|164 63 236 259
Ink-Pot|228 115 286 213
Book|0 226 75 321
Eraser|95 268 185 321
Papers|197 239 300 317
Sharpener|24 339 99 404'''),
29: ('My Toys', '''Teddy bear|24 74 104 169
Tricycle|122 77 213 150
Football|233 81 291 145
Toy Horse|10 179 114 270
Helicopter|122 166 226 243
Doll|229 162 296 270
Cooker|16 287 78 333
Toybike|121 256 213 314
Motor Cars|208 275 296 334
Ball|31 364 52 388
Bat|52 310 110 428'''),
30: ('Games and Sports Goods', '''Racket|15 103 135 178
Basketball|129 89 193 151
Chess|210 89 295 184
Ball|29 201 58 230
Shuttlecock|84 198 143 263
Carrom-Board|181 203 305 279
Hockey Stick|155 291 308 324
Bat|8 231 67 395
Wicket|74 286 130 412'''),
31: ('Musical Instruments', '''Tabla|36 86 144 160
Xylophone|145 83 238 169
Violin|230 81 302 234
Mouth Organ|35 169 114 209
Sitar|49 166 233 303
Veena|109 240 298 342
Flute|10 151 30 393
Drum|36 333 109 411'''),
32: ('In the Workshop', '''Pipe-Wrench|10 105 152 159
Screw-driver|158 84 290 137
Pliers|158 146 290 216
File|7 177 158 256
Hammer|167 196 294 287
Hand Saw|7 232 150 316
Spanner|177 281 293 338
Nail|4 306 90 359
Screw Nail|26 361 110 442'''),
33: ('How We Travel', '''Aeroplane|12 87 142 146
Bus|158 74 279 165
Van|26 160 132 228
Ship|161 164 303 267
Car|13 238 153 286
Boat|166 268 292 330
Train|12 312 134 423'''),
34: ('How We Travel', '''Scooter|8 86 150 197
Truck (Lorry)|187 77 300 157
Auto Rickshaw|208 161 299 234
Jeep|6 205 175 287
Jutka (Tonga)|176 234 312 333
Bicycle|8 318 133 412'''),
35: ('Festivals', '''Diwali|13 83 149 202
Holi|169 85 309 183
Id|13 215 159 308
Pongal|184 181 311 313
Christmas|11 313 153 428
Ganesh Chaturthi|172 322 313 430'''),
36: ('Our Nationality', '''India|8 81 127 240
National Animal|168 80 282 175
National Flag|187 177 287 247
National Bird|28 199 178 425
National Emblem|11 254 79 351
National Flower|207 264 284 333'''),
37: ('Places of Worship', '''Temple|0 78 148 251
Jain Temple (Derasar)|148 77 308 191
Sikh Temple (Gurudwara)|147 213 291 317
Church|4 277 127 411
Mosque|141 331 294 424'''),
38: ('Wonders of Nature', '''Sun|10 89 135 206
Moon|10 220 138 333
Tree|154 91 249 177
Flowers|270 160 302 199
Grass|154 176 228 202
Clouds|159 222 205 242
Rainbow|185 218 306 254
Rain|160 254 313 329'''),
39: ('Colours & Shapes', '''Red|5 78 64 125
Blue|62 78 123 125
Yellow|127 78 182 122
Orange|187 78 242 122
Deep Green|245 78 301 122
Pink|25 145 83 190
Black|89 146 147 186
Green|150 145 208 190
White|210 146 267 186
Circle|40 207 93 264
Triangle|124 208 181 264
Square|231 210 278 262
Cylinder|61 279 143 333
Rectangle|194 276 277 328''')
}

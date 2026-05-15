#!/usr/bin/env python3
"""Build brand-pop-quiz: embed logo images from assets/ into a single index.html."""
import sys
import pathlib

HERE = pathlib.Path(__file__).parent
sys.path.insert(0, str(HERE.parent))

from _builder import emit  # noqa: E402

ITEMS = [
    ("Samsung",    "samsung.png"),
    ("LG",         "lg-logo.png"),
    ("Panasonic",  "Panasonic-logo.jpg"),
    ("Mitsubishi", "mitsubishi-logo.jpg"),
    ("Haier",      "haier.jpeg"),
    ("Daikin",     "daikin.jpg"),
    ("Godrej",     "godrej.jpeg"),
    ("Lloyd",      "llyod.jpeg"),
    ("Blue Star",  "bluestar.png"),
]

entries = [(name, HERE / "assets" / fname) for name, fname in ITEMS]
emit("Brand Pop Quiz", HERE, entries)

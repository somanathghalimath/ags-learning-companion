#!/usr/bin/env python3
"""Build name-the-leader: fetch portraits from Wikipedia (cached) and embed."""
import sys
import pathlib

HERE = pathlib.Path(__file__).parent
sys.path.insert(0, str(HERE.parent))

from _builder import emit, find_existing, fetch_wikipedia_portrait  # noqa: E402

ASSETS = HERE / "assets"
ASSETS.mkdir(exist_ok=True)

# (display name, Wikipedia article title, filename stem in assets/)
LEADERS = [
    ("Mahatma Gandhi",         "Mahatma Gandhi",            "gandhi"),
    ("Jawaharlal Nehru",       "Jawaharlal Nehru",          "nehru"),
    ("Sardar Vallabhbhai Patel","Vallabhbhai Patel",        "patel"),
    ("Subhas Chandra Bose",    "Subhas Chandra Bose",       "bose"),
    ("B. R. Ambedkar",         "B. R. Ambedkar",            "ambedkar"),
    ("Lal Bahadur Shastri",    "Lal Bahadur Shastri",       "shastri"),
    ("Bhagat Singh",           "Bhagat Singh",              "bhagat_singh"),
    ("Bal Gangadhar Tilak",    "Bal Gangadhar Tilak",       "tilak"),
    ("A. P. J. Abdul Kalam",   "A. P. J. Abdul Kalam",      "kalam"),
    ("Narendra Modi",          "Narendra Modi",             "modi"),
]

entries = []
for name, title, stem in LEADERS:
    path = find_existing(ASSETS, stem)
    if path is None:
        print("fetching " + name + " from Wikipedia...")
        path = fetch_wikipedia_portrait(title, ASSETS, stem)
    else:
        print("using cached " + path.name)
    entries.append((name, path))

emit("Name the Leader", HERE, entries)

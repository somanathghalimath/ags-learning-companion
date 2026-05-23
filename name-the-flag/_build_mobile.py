#!/usr/bin/env python3
"""Build name-the-flag: fetch flag SVGs from flagcdn.com (cached) and embed."""
import sys
import pathlib
import urllib.request

HERE = pathlib.Path(__file__).parent
sys.path.insert(0, str(HERE.parent))

from _builder import emit, find_existing, UA  # noqa: E402

ASSETS = HERE / "assets"
ASSETS.mkdir(exist_ok=True)

# (display name, ISO 3166-1 alpha-2 code, filename stem)
FLAGS = [
    ("India",          "in", "india"),
    ("Japan",          "jp", "japan"),
    ("United States",  "us", "usa"),
    ("Canada",         "ca", "canada"),
    ("United Kingdom", "gb", "uk"),
    ("France",         "fr", "france"),
    ("China",          "cn", "china"),
    ("Brazil",         "br", "brazil"),
    ("Switzerland",    "ch", "switzerland"),
    ("South Africa",   "za", "south_africa"),
]


def fetch_flag(code, stem):
    out = ASSETS / (stem + ".svg")
    url = "https://flagcdn.com/" + code + ".svg"
    print("fetching " + code + " from flagcdn...")
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as resp:
        out.write_bytes(resp.read())
    return out


entries = []
for name, code, stem in FLAGS:
    path = find_existing(ASSETS, stem)
    if path is None:
        path = fetch_flag(code, stem)
    else:
        print("using cached " + path.name)
    entries.append((name, path))

emit("Name the Flag", HERE, entries, features={"showName": True})

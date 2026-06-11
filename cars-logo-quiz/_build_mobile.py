#!/usr/bin/env python3
"""Build cars-logo-quiz: fetch/cache logo files and embed them."""
import pathlib
import sys
import urllib.parse
import urllib.request

HERE = pathlib.Path(__file__).parent
sys.path.insert(0, str(HERE.parent))

from _builder import emit, find_existing, UA  # noqa: E402

ASSETS = HERE / "assets"
ASSETS.mkdir(exist_ok=True)

# Most logos are fetched from Wikimedia Commons via Special:Redirect/file.
# Tata and Thar reuse the preferred assets from brand-pop-quiz.
# Brand names and logos remain trademarks of their owners.
CARS = [
    ("Toyota",        "commons", "Toyota EU.svg", "toyota"),
    ("BMW",           "commons", "BMW.svg", "bmw"),
    ("Mercedes-Benz", "commons", "Mercedes-Benz Star 2022.svg", "mercedes_benz"),
    ("Audi",          "commons", "Audi-Logo 2016.svg", "audi"),
    ("Volkswagen",    "commons", "Volkswagen logo 2019.svg", "volkswagen"),
    ("Honda",         "commons", "Honda.svg", "honda"),
    ("Hyundai",       "commons", "Hyundai Motor Company logo.svg", "hyundai"),
    ("Ford",          "commons", "Ford logo flat.svg", "ford"),
    ("Chevrolet",     "commons", "Chevrolet-logo.png", "chevrolet"),
    ("Tesla",         "commons", "Tesla Motors.svg", "tesla"),
    ("Tata Motors",   "local", "tata.png", "brand-pop-quiz/assets/tata.png"),
    ("Suzuki",        "commons", "Suzuki logo 2025 (vertical).svg", "suzuki"),
    ("Mahindra Thar", "local", "thar.jpeg", "brand-pop-quiz/assets/thar.jpeg"),
]


def extension_for(filename):
    suffix = pathlib.PurePosixPath(filename).suffix.lower()
    if suffix in (".svg", ".png", ".jpg", ".jpeg", ".webp", ".gif"):
        return suffix
    return ".svg"


def commons_file_page(filename):
    return "https://commons.wikimedia.org/wiki/File:" + urllib.parse.quote(filename.replace(" ", "_"))


def fetch_commons_file(filename, stem):
    ext = extension_for(filename)
    out = ASSETS / (stem + ext)
    url = "https://commons.wikimedia.org/wiki/Special:Redirect/file/" + urllib.parse.quote(filename)
    print("fetching " + filename + " from Wikimedia Commons...")
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as resp:
        out.write_bytes(resp.read())
    return out


entries = []
sources = []
for name, source_type, filename, key in CARS:
    if source_type == "local":
        path = ASSETS / filename
        if not path.exists():
            raise RuntimeError("Missing reused local asset " + str(path))
        print("using reused " + path.name)
        source = key
    else:
        path = find_existing(ASSETS, key)
        if path is None:
            path = fetch_commons_file(filename, key)
        else:
            print("using cached " + path.name)
        source = commons_file_page(filename)
    entries.append((name, path))
    sources.append("- " + name + ": " + source)

(ASSETS / "SOURCES.md").write_text(
    "# Car Logo Sources\n\n"
    "Images were fetched from Wikimedia Commons or reused from the local brand-pop-quiz assets. "
    "Brand names and logos are trademarks of their owners.\n\n"
    + "\n".join(sources)
    + "\n",
    encoding="utf-8",
)

emit("Cars Logo Quiz", HERE, entries, features={"scratch": True})

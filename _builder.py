"""Shared helpers: embed images and render the index.html template."""

import base64
import json
import pathlib
import urllib.parse
import urllib.request

ROOT = pathlib.Path(__file__).parent
TEMPLATE = ROOT / "_template.html"

UA = "html-css-js-projects/1.0 (https://github.com/somanathghalimath/html-css-js-projects; hobby)"

MIME_BY_EXT = {
    ".jpg":  "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png":  "image/png",
    ".webp": "image/webp",
    ".gif":  "image/gif",
}


def data_uri(path):
    mime = MIME_BY_EXT[path.suffix.lower()]
    b64 = base64.b64encode(path.read_bytes()).decode("ascii")
    return "data:" + mime + ";base64," + b64


def find_existing(assets_dir, stem):
    for ext in MIME_BY_EXT:
        p = assets_dir / (stem + ext)
        if p.exists():
            return p
    return None


def fetch_wikipedia_portrait(title, assets_dir, stem):
    qs = urllib.parse.urlencode({
        "action": "query",
        "format": "json",
        "prop": "pageimages",
        "piprop": "thumbnail",
        "pithumbsize": "600",
        "titles": title,
    })
    url = "https://en.wikipedia.org/w/api.php?" + qs
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = json.load(resp)
    page = next(iter(data["query"]["pages"].values()))
    if "thumbnail" not in page:
        raise RuntimeError("No thumbnail on Wikipedia for " + repr(title))
    img_url = page["thumbnail"]["source"]

    bare = urllib.parse.urlsplit(img_url).path.lower()
    if   bare.endswith(".png"):  ext = ".png"
    elif bare.endswith(".webp"): ext = ".webp"
    elif bare.endswith(".jpeg"): ext = ".jpeg"
    else:                        ext = ".jpg"

    out_path = assets_dir / (stem + ext)
    print("  -> downloading " + img_url)
    req = urllib.request.Request(img_url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as resp:
        out_path.write_bytes(resp.read())
    return out_path


def emit(title, project_dir, entries):
    """Render the template and write <project_dir>/index.html.

    entries: list of (display_name, image_path).
    """
    items = [{"name": name, "src": data_uri(path)} for name, path in entries]
    items_json = json.dumps(items, ensure_ascii=False)
    html = TEMPLATE.read_text(encoding="utf-8")
    html = (html
        .replace("{{TITLE}}", title)
        .replace("{{TOTAL}}", str(len(items)))
        .replace("{{ITEMS_JSON}}", items_json))
    out = project_dir / "index.html"
    out.write_text(html, encoding="utf-8")
    print("Wrote " + str(out) + " (" + str(round(out.stat().st_size / 1024, 1)) + " KB)")

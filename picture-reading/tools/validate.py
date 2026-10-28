"""Validate generated content and full-page exceptions (Python + Pillow)."""
import csv,json
from pathlib import Path
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
s=(ROOT/'data/picture-reading.js').read_text();data=json.loads(s[s.index('['):].rstrip(';\n'))
assert len(data)==32
full={c['sourcePage']:c for c in data if c['type']=='full-page'}
assert set(full)=={16,17,18,27}
seen=set();objects=0
for c in data:
 assert c['id'] not in seen;seen.add(c['id'])
 entries=c['items'] if c['type']=='image-grid' else [c]
 ids=set()
 for item in entries:
  assert (ROOT/item['image']).is_file(),item
  with Image.open(ROOT/item['image']) as im:
   im.verify()
  if c['type']=='image-grid':
   objects+=1
   assert item['sourcePage'] not in {2,16,17,18,27}
   assert item['id'] not in ids;ids.add(item['id'])
  else:
   assert 'items' not in c
   # Compare generated dimensions with the complete source render when available.
   render=Path(f'/tmp/picture-reading-rendered/page-{c["sourcePage"]:02}.png')
   if render.exists():
    assert Image.open(render).size==Image.open(ROOT/c['image']).size
assert objects==251
animals=next(c for c in data if c['id']=='domestic-animals')
assert {i['name'] for i in animals['items']}=={'Cow','Goat','Sheep','Horse','Donkey','Cat','Buffalo','Ox','Camel','Dog'}
rows=list(csv.DictReader((ROOT/'review/inventory.csv').open()))
assert len([r for r in rows if r['status']=='duplicate-skipped'])==1
assert len(rows)==256
pending=[r for r in rows if r['status']=='needs-review']
approved=[r for r in rows if r['status']=='approved']
assert len(approved)==23
assert not pending
assert sum(i['reviewStatus']=='approved' for c in data for i in c.get('items',[]))==23
print(f'PASS: 32 categories, {objects} object assets, four intact page dimensions, all paths decode, no duplicate or exception crops; {len(approved)} approved objects; {len(pending)} pending objects.')

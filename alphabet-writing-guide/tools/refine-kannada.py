"""Offline curve refinement. Requires numpy and svgpathtools (not used at runtime).
Uses the previous committed vectors, preserving ordered movement and pen lifts.
Run from the repository root with Python containing those two packages.
"""
from pathlib import Path
import json, subprocess
import numpy as np
from svgpathtools import parse_path
ROOT=Path(__file__).resolve().parents[1]
BASE_REF='a52a8e1'
source=subprocess.check_output(['git','show',f'{BASE_REF}:alphabet-writing-guide/letters.js'],text=True)
node="const vm=require('vm'),fs=require('fs');const w={};vm.runInNewContext(fs.readFileSync(0,'utf8'),{window:w});process.stdout.write(JSON.stringify(w.LETTER_LIBRARY.kannadaSwaras.characters));"
old=json.loads(subprocess.check_output(['node','-e',node],input=source,text=True))
# Least-squares cubic fitting, recursively subdivided. Each source sample must
# remain within two SVG units at its chord parameter; preserve all endpoints.
def unit(v):
 n=np.linalg.norm(v);return v/n if n else np.array([1.,0.])
def fit(p,t0,t1,error=2.):
 if len(p)==2:
  length=np.linalg.norm(p[1]-p[0])/3
  return [np.array([p[0],p[0]+t0*length,p[-1]+t1*length,p[-1]])]
 dist=np.r_[0,np.cumsum(np.linalg.norm(np.diff(p,axis=0),axis=1))]
 u=dist/dist[-1];v=1-u
 b=np.array([v**3,3*u*v*v,3*u*u*v,u**3]).T
 a=np.stack([b[:,1,None]*t0,b[:,2,None]*t1],axis=2).reshape(-1,2)
 base=(b[:,0]+b[:,1])[:,None]*p[0]+(b[:,2]+b[:,3])[:,None]*p[-1]
 alpha=np.linalg.lstsq(a,(p-base).reshape(-1),rcond=None)[0]
 if min(alpha)<1e-5:alpha[:]=dist[-1]/3
 c=np.array([p[0],p[0]+t0*alpha[0],p[-1]+t1*alpha[1],p[-1]])
 deviations=np.linalg.norm(b@c-p,axis=1);i=int(np.argmax(deviations))
 if deviations[i]<=error:return[c]
 i=max(1,min(i,len(p)-2));t=unit(p[i+1]-p[i-1])
 return fit(p[:i+1],t0,-t,error)+fit(p[i:],t,t1,error)
def refine(d):
 path=parse_path(d);length=path.length();count=max(4,int(length/2.5))
 points=np.array([[z.real,z.imag] for z in (path.point(path.ilength(length*i/count)) for i in range(count+1))])
 tangent0=unit(points[min(3,count)]-points[0]);tangent1=unit(points[max(0,count-3)]-points[-1])
 curves=fit(points,tangent0,tangent1)
 def xy(p):return f'{p[0]:.2f} {p[1]:.2f}'
 return 'M '+xy(curves[0][0])+' '+ ' '.join('C '+' '.join(xy(p) for p in c[1:]) for c in curves)
for c in old:
 for stroke in c['strokes']:stroke['d']=refine(stroke['d'])
# The original traced circle stops before reaching its starting point, although
# the animation shows a closed anusvara. Continue the missing left arc.
am=next(c for c in old if c['name']=='ಅಂ')
am['strokes'][1]['d']+=' C 225 204 228 220 242.50 233.30'
# The final spiral of ಔ is one continuous pen movement in the animation:
# the two legacy paths share the exact same endpoint/startpoint.
au=next(c for c in old if c['name']=='ಔ')
au['strokes'][1]['d']='M 111.20 128.80 L 145.70 128.80'
au['strokes'][2]['d']+=' '+au['strokes'][3]['d'].split(' ',3)[3]
au['strokes'].pop()
# Restore junctions hidden by the moving pencil in the old raster trace.
# In the finished source, the ಓ length mark touches the top of the body;
# the three movements of ಋ touch one another, and ಈ's body meets its bar.
def prepend(stroke, prefix):
 stroke['d']=prefix+' '+stroke['d'].split(' ',3)[3]
oo=next(c for c in old if c['name']=='ಓ')
prepend(oo['strokes'][1], 'M 114 152 L 110.50 128.80')
ru=next(c for c in old if c['name']=='ಋ')
prepend(ru['strokes'][1], 'M 144 212 C 147 221 153 228 162.10 232.50')
ru['strokes'][1]['d']+=' C 245 120 247 110 239 100'
prepend(ru['strokes'][2], 'M 243 237 C 250 245 260 250 270.40 251')
ii=next(c for c in old if c['name']=='ಈ')
prepend(ii['strokes'][0], 'M 130 157 C 118 164 111 178 107.90 190.80')
ii['strokes'][0]['d']+=' C 212 153 208 156 205 157'
PROMPTS={
'ಅ':['Curl around the small loop, sweep down and around, then finish left across the middle.'],
'ಆ':['Curl around the small loop, sweep around the bowl, loop over on the right, then finish left.'],
'ಇ':['Curve up and over both humps, come down, make the small lower loop, then finish the tail.'],
'ಈ':['Start near the top left and go around the round body.','Lift. Draw the top bar to the right and curl up.','Lift. Go across the middle, around the small right loop, then down.'],
'ಉ':['Make the little left curl, sweep down and up, then around the right bowl.'],
'ಊ':['Make the left curl, sweep through both bowls, then curl inward on the right.'],
'ಋ':['Make the upper curl, curve down, then finish the lower curl.','Lift. Make the middle bowl and finish with its top curl.','Lift. Add the right bowl, curving up to finish.'],
'ಎ':['Start with the inner curl, sweep around both bottom curves, then around the outside to the top.'],
'ಏ':['Start with the inner curl, sweep around the body, then finish the little upper hook.'],
'ಐ':['Make the inner curl and bottom curves, then come up and over the two top humps.'],
'ಒ':['Make the small top curve, sweep down left, then around both bottom curves.'],
'ಓ':['Make the small top curve, sweep down left, then around both bottom curves.','Lift. Add the small curved mark above the left side.'],
'ಔ':['Make the small top curve, sweep down left, then around both bottom curves.','Lift. Add the short bar above the left side.','Lift. Go right across the top, round the outside, then curl inward without lifting.'],
'ಅಂ':['Write the ಅ body in one continuous movement.','Lift. Go around the circle on the right and close it.'],
'ಅಃ':['Write the ಅ body in one continuous movement.','Lift. Make the upper small circle on the right.','Lift. Make the lower small circle on the right.']}
SLUGS=['a','aa','i','ii','u','uu','ru','e','ee','ai','o','oo','au','am','ah']
FILES=['a','aa','e','ee','u','uu','ru','ae','aee','ai','o','oo','ou','am',None]
for c,slug,filename in zip(old,SLUGS,FILES):
 c['id']=slug
 c['source']='https://commons.wikimedia.org/wiki/File:Kannada-alphabet-'+filename+'.gif' if filename else 'https://commons.wikimedia.org/wiki/File:Kannada-Alphabet-Aha.gif'
 c['movementNote']='One continuous pen-down movement.' if len(c['strokes'])==1 else 'Lift the pencil only between the numbered strokes.'
 for s,prompt in zip(c['strokes'],PROMPTS[c['name']]):s['prompt']=prompt
(ROOT/'kannada.js').write_text('''"use strict";
/* Refined centreline handwriting paths, adapted from Gopala Krishna A's
 * Kannada handwriting animations (CC BY-SA 4.0). Curves smoothed; source junctions and missing
 * anusvara arc restored; artificial spiral pen lift removed. See
 * review/KANNADA-SOURCES.md for per-letter provenance and limitations.
 * These adapted path contributions are CC BY-SA 4.0:
 * https://creativecommons.org/licenses/by-sa/4.0/
 */
window.KANNADA_SWARAS = '''+json.dumps(old,ensure_ascii=False,indent=2)+';\n')
print('Generated',len(old),'characters;',sum(len(c['strokes']) for c in old),'pen-down strokes.')

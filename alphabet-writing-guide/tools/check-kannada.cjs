const{chromium}=require('playwright');const fs=require('fs');const assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});try{const p=await b.newPage({viewport:{width:390,height:844}});let errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto('http://localhost:8765/alphabet-writing-guide/');await p.locator('#setSelect').selectOption('kannadaSwaras');
const results=await p.evaluate(()=>{
 const results=[];
 for(const setKey of ['kannadaSwaras','kannadaVyanjanas']){changeSet(setKey);
 for(const speed of ['slow','normal','fast'])for(let i=0;i<getCharacters().length;i++){
  elements.speedSelect.value=speed;state.letterIndex=i;renderLetter();beginLetter();stopAnimation();const c=getCharacters()[i];
  if(state.phase!=='preparing'||!elements.startDot.classList.contains('visible'))throw Error('Missing starting hold '+c.name);
  for(let j=0;j<c.strokes.length;j++){
   if(state.strokeIndex!==j)throw Error('Wrong stroke order');
   updatePreparing(state.phaseStartedAt+799);if(state.phase!=='preparing')throw Error('Short hold');
   updatePreparing(state.phaseStartedAt+800);stopAnimation();if(state.phase!=='drawing')throw Error('Did not draw');
   const duration=SPEEDS[speed].drawDuration*Math.max(.35,state.strokeLengths[j]/220);
   updateDrawing(state.phaseStartedAt+duration/2);
   if(Math.abs(Number(state.strokeElements[j].style.strokeDashoffset)/state.strokeLengths[j]-.5)>.001)throw Error('Not linear');
   updateDrawing(state.phaseStartedAt+duration+1);stopAnimation();
   if(j<c.strokes.length-1 && (state.phase!=='preparing'||!elements.strokeInstruction.textContent.includes('Lift your pencil')))throw Error('Missing pen lift');
   if((c.strokes[j].d.match(/M /g)||[]).length!==1)throw Error('Hidden pen lift');
  }
  if(state.phase!=='complete')throw Error('Incomplete '+c.name+' '+speed+' '+state.phase);
  if([...document.querySelectorAll('#strokeLayer path')].some(p=>p.style.strokeDasharray!=='none'))throw Error('Missing completed ink');
  results.push({name:c.name,speed,strokes:c.strokes.length});
 }
 }
 return results;
});
assert.equal(results.length,147);
await p.evaluate(()=>{elements.speedSelect.value='normal';changeSet('kannadaSwaras');});await p.locator('#pauseButton').click();assert.equal(await p.evaluate(()=>state.phase),'paused');assert.equal(await p.locator('#startDot').evaluate(e=>e.classList.contains('visible')),true);await p.locator('#playButton').click();await p.waitForTimeout(1100);await p.locator('#pauseButton').click();assert.equal(await p.locator('#pencilTip').evaluate(e=>e.classList.contains('visible')),true);
await p.locator('#replayButton').click();assert.equal(await p.evaluate(()=>state.strokeIndex),0);
for(const size of [{width:360,height:800},{width:768,height:1024},{width:1280,height:900}]){await p.setViewportSize(size);await p.evaluate(()=>{state.letterIndex=3;renderLetter();beginLetter();});assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await p.screenshot({path:`/tmp/kannada-${size.width}.png`,fullPage:true});}
// Consonant geometry, thin-ink joins and layouts are checked separately from swaras.
await p.locator('#setSelect').selectOption('kannadaVyanjanas');
await p.evaluate(()=>{
 for(let i=0;i<KANNADA_VYANJANAS.length;i++){
  state.letterIndex=i;renderLetter();
  const ink=[...elements.strokeLayer.querySelectorAll('path')],guide=[...elements.guideLayer.querySelectorAll('path')];
  for(let j=0;j<ink.length;j++){
   if(ink[j].getAttribute('d')!==guide[j].getAttribute('d')||ink[j].style.strokeWidth!==guide[j].style.strokeWidth)throw Error('Guide/ink mismatch');
   const b=ink[j].getBBox(),margin=Number(ink[j].style.strokeWidth)/2;
   if(b.x-margin<16||b.y-margin<24||b.x+b.width+margin>384||b.y+b.height+margin>376)throw Error('Clipped consonant '+KANNADA_VYANJANAS[i].name);
  }
  // These bodies must meet their head strokes even with thin pencil ink.
  const headPairs={ka:[[0,1],[1,2],[2,3]],ga:[[0,1]],cha:[[0,1],[1,2],[2,3]],chha:[[0,1]],jha:[[0,1]],ttha:[[0,1]],dda:[[0,1]],ddha:[[0,1]],ta:[[0,1]],tha:[[0,1]],da:[[0,1]],dha:[[0,1]],na:[[0,1]],bha:[[0,1]],ma:[[0,1]],ya:[[0,1],[1,2]],ra:[[0,1]],va:[[0,1]],sha:[[0,1]],sa:[[0,1]],ha:[[0,1]],lla:[[0,1]]};
  for(const [a,b] of headPairs[KANNADA_VYANJANAS[i].id]||[]){
   let nearest=Infinity;
   const samples=path=>{const length=path.getTotalLength();return Array.from({length:151},(_,i)=>path.getPointAtLength(length*i/150));};
   const left=samples(ink[a]),right=samples(ink[b]);
   for(const x of left)for(const y of right)nearest=Math.min(nearest,Math.hypot(x.x-y.x,x.y-y.y));
   if(nearest>6)throw Error('Detached head/body '+KANNADA_VYANJANAS[i].name+' '+nearest);
  }
 }
});
for(const size of [{width:360,height:800},{width:768,height:1024},{width:1280,height:900}]){
 await p.setViewportSize(size);
 for(const name of ['ಕ','ಘ','ಞ','ಯ','ಳ']){
  await p.evaluate(name=>{state.letterIndex=getCharacters().findIndex(c=>c.name===name);renderLetter();beginLetter();stopAnimation();},name);
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const canvas=await p.locator('#letterCanvas').boundingBox(),hear=await p.locator('#hearButton').boundingBox();
  if(hear)assert.ok(hear.y>=canvas.y+canvas.height,'Hear must not cover the letter');
 }
 await p.screenshot({path:`/tmp/vyanjana-${size.width}.png`,fullPage:true});
}
await p.setViewportSize({width:1280,height:900});await p.goto('http://localhost:8765/alphabet-writing-guide/review/kannada-review.html');await p.locator('#review section').last().waitFor();assert.equal(await p.locator('#review section').count(),15);await p.screenshot({path:'/tmp/kannada-review.png',fullPage:true});
await p.locator('#reviewSet').selectOption('vyanjana');
assert.equal(await p.locator('#review section').count(),34);
assert.equal(await p.locator('#review .reference').count(),34);
await p.evaluate(()=>Promise.all([...document.querySelectorAll('.reference')].map(i=>{i.loading='eager';return i.decode();})));
assert.equal(await p.locator('#overview a').count(),34);
await p.locator('#review section button').first().click();
assert.ok(await p.evaluate(()=>document.getAnimations().length>0));
await p.locator('#reviewSet').selectOption('swaras');
assert.equal(await p.locator('#review section').count(),15);
await p.goto('http://localhost:8765/alphabet-writing-guide/review/kannada-review.html?set=vyanjana');
assert.equal(await p.locator('#review section').count(),34);
await p.screenshot({path:'/tmp/kannada-vyanjana/review.png',fullPage:true});
const consonants=await p.evaluate(()=>KANNADA_VYANJANAS);
assert.equal(consonants.map(c=>c.name).join(''),'ಕಖಗಘಙಚಛಜಝಞಟಠಡಢಣತಥದಧನಪಫಬಭಮಯರಲವಶಷಸಹಳ');
assert.equal(new Set(consonants.map(c=>c.id)).size,34);
assert.equal(consonants.reduce((n,c)=>n+c.strokes.length,0),90);
const data=await p.evaluate(()=>KANNADA_SWARAS);fs.writeFileSync('/tmp/kannada-after.json',JSON.stringify(data));
assert.equal(data.find(c=>c.name==='ಔ').strokes.length,3);
assert.deepEqual(data.map(c=>c.strokes.length),[1,1,1,3,1,1,3,1,1,1,1,2,3,2,3]);
const closed = await p.evaluate(() => {
 const c=KANNADA_SWARAS.find(c=>c.name==='ಅಂ');const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d',c.strokes[1].d);const a=path.getPointAtLength(0),b=path.getPointAtLength(path.getTotalLength());return Math.hypot(a.x-b.x,a.y-b.y);
});assert.ok(closed<.01,'Anusvara must close');
assert.deepEqual(errors,[]);console.log('PASS: all 49 Kannada characters at all three speeds; source stroke sequence; 800ms start holds; linear motion; explicit pen lifts; solid completed strokes; pause/resume/replay; 360/768/1280 layouts; swaras/vyanjanas review galleries and 34 source images; no JS errors.');
}finally{await b.close();}})().catch(e=>{console.error(e);process.exit(1)});

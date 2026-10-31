const{chromium}=require('playwright');const fs=require('fs');const assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});try{const p=await b.newPage({viewport:{width:390,height:844}});let errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto('http://localhost:8765/alphabet-writing-guide/');await p.locator('#setSelect').selectOption('kannadaSwaras');
const results=await p.evaluate(()=>{
 const results=[];changeSet('kannadaSwaras');
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
 return results;
});
assert.equal(results.length,45);
await p.evaluate(()=>{elements.speedSelect.value='normal';changeSet('kannadaSwaras');});await p.locator('#pauseButton').click();assert.equal(await p.evaluate(()=>state.phase),'paused');assert.equal(await p.locator('#startDot').evaluate(e=>e.classList.contains('visible')),true);await p.locator('#playButton').click();await p.waitForTimeout(1100);await p.locator('#pauseButton').click();assert.equal(await p.locator('#pencilTip').evaluate(e=>e.classList.contains('visible')),true);
await p.locator('#replayButton').click();assert.equal(await p.evaluate(()=>state.strokeIndex),0);
for(const size of [{width:360,height:800},{width:768,height:1024},{width:1280,height:900}]){await p.setViewportSize(size);await p.evaluate(()=>{state.letterIndex=3;renderLetter();beginLetter();});assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await p.screenshot({path:`/tmp/kannada-${size.width}.png`,fullPage:true});}
await p.setViewportSize({width:1280,height:900});await p.goto('http://localhost:8765/alphabet-writing-guide/review/kannada-review.html');await p.locator('#review section').last().waitFor();assert.equal(await p.locator('#review section').count(),15);await p.screenshot({path:'/tmp/kannada-review.png',fullPage:true});
const data=await p.evaluate(()=>KANNADA_SWARAS);fs.writeFileSync('/tmp/kannada-after.json',JSON.stringify(data));
assert.equal(data.find(c=>c.name==='ಔ').strokes.length,3);
assert.deepEqual(data.map(c=>c.strokes.length),[1,1,1,3,1,1,3,1,1,1,1,2,3,2,3]);
const closed = await p.evaluate(() => {
 const c=KANNADA_SWARAS.find(c=>c.name==='ಅಂ');const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d',c.strokes[1].d);const a=path.getPointAtLength(0),b=path.getPointAtLength(path.getTotalLength());return Math.hypot(a.x-b.x,a.y-b.y);
});assert.ok(closed<.01,'Anusvara must close');
assert.deepEqual(errors,[]);console.log('PASS: all 15 Kannada characters at all three speeds; source stroke sequence; 800ms start holds; linear motion; explicit pen lifts; solid completed strokes; pause/resume/replay; 360/768/1280 layouts; 15-character stroke review gallery; no JS errors.');
}finally{await b.close();}})().catch(e=>{console.error(e);process.exit(1)});

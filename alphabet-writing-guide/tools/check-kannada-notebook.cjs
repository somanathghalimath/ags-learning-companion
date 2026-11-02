/* Verify ruling, anatomical placement and preservation of the researched paths. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const base=(process.env.SITE_URL||'http://localhost:8765').replace(/\/$/,'');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:360,height:800}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/alphabet-writing-guide/');
  const count=await page.evaluate(()=>{
   const near=(a,b,label)=>{if(Math.abs(a-b)>.08)throw Error(label+': '+a+' vs '+b);};
   const bounds=path=>path.getBBox();
   const sourceSnapshot=JSON.stringify([KANNADA_SWARAS,KANNADA_VYANJANAS]);
   let count=0;
   for(const [set,originals] of [['kannadaSwaras',KANNADA_SWARAS],['kannadaVyanjanas',KANNADA_VYANJANAS]]){
    changeSet(set);
    for(let i=0;i<getCharacters().length;i++){
     state.letterIndex=i;renderLetter();stopAnimation();
     const c=getCharacters()[i],original=originals[i],placement=c.notebookPlacement;
     const rules=[...elements.notebookLayer.querySelectorAll('line')];
     if(rules.length!==2)throw Error('Expected two Kannada lines');
     rules.forEach((r,j)=>{near(Number(r.getAttribute('y1')),[145,250][j],'rule');if(getComputedStyle(r).stroke!=='rgb(138, 145, 153)')throw Error('Wrong rule colour');});
     if(!(elements.notebookLayer.compareDocumentPosition(elements.guideLayer)&Node.DOCUMENT_POSITION_FOLLOWING))throw Error('Ruling covers glyph');
     if(c.strokes.length!==original.strokes.length)throw Error('Changed pen lifts');
     if(placement.page<4||placement.page>28||!['upper','lower'].includes(placement.row))throw Error('Missing ruled reference');
     const guides=[...elements.guideLayer.querySelectorAll('path')];
     for(let j=0;j<c.strokes.length;j++){
      const stroke=c.strokes[j],before=original.strokes[j],after=state.strokeElements[j];
      if(stroke.prompt!==before.prompt)throw Error('Changed movement instruction');
      if(JSON.stringify(stroke.sourceFrames)!==JSON.stringify(before.sourceFrames))throw Error('Changed source sequence');
      if(after.getAttribute('d')!==guides[j].getAttribute('d')||after.style.strokeWidth!==guides[j].style.strokeWidth)throw Error('Guide/ink mismatch');
      const source=document.createElementNS(SVG_NS,'path');source.setAttribute('d',before.d);
      const sourceLength=source.getTotalLength(),afterLength=after.getTotalLength();
      near(afterLength,sourceLength*placement.scale,'uniform path length');
      for(const fraction of [0,.1,.25,.5,.75,.9,1]){
       const a=source.getPointAtLength(sourceLength*fraction),b=after.getPointAtLength(afterLength*fraction);
       near(b.x,200+(a.x-200)*placement.scale,'preserved curve x');
       near(b.y,a.y*placement.scale+placement.shiftY,'preserved curve y');
      }
      near(Number(after.style.strokeWidth),(before.strokeWidth||12)*placement.scale,'preserved pen width');
      const b=bounds(after),margin=Number(after.style.strokeWidth)/2;
      if(b.x-margin<16||b.x+b.width+margin>384||b.y-margin<24||b.y+b.height+margin>376)throw Error('Clipped letter '+c.name);
     }
     // Anatomical checks against actual components, rather than overall glyph bounds.
     const paths=state.strokeElements;
     if(c.name==='ಗ'){
      near(paths[1].getPointAtLength(0).y,145,'ga head bar');near(bounds(paths[0]).y+bounds(paths[0]).height,250,'ga stem base');
      if(bounds(paths[1]).y>=145)throw Error('Ga crest should rise above the guide');
     }
     if(c.name==='ಛ'){
      near(bounds(paths[0]).y+bounds(paths[0]).height,250,'chha body base');
      if(bounds(paths[1]).y>=145||bounds(paths[2]).y<=250)throw Error('Chha extensions must cross outside the body band');
     }
     if(c.name==='ಇ'||c.name==='ಞ'||c.name==='ಳ'){
      if(!paths.some(p=>bounds(p).y+bounds(p).height>260))throw Error('Missing lower extension '+c.name);
     }
     if(c.name==='ಓ'&&bounds(paths[1]).y>=145)throw Error('Length mark must rise above the body guide');
     if(c.name==='ಊ'){near(bounds(paths[0]).y,145,'uu body top');near(bounds(paths[0]).y+bounds(paths[0]).height,250,'uu body base');}
     count++;
    }
   }
   if(JSON.stringify([KANNADA_SWARAS,KANNADA_VYANJANAS])!==sourceSnapshot)throw Error('Mutated source geometry');
   return count;
  });
  assert.equal(count,49);
  for(const width of [360,768,1280]){
   await page.setViewportSize({width,height:900});
   for(const [set,name] of [['kannadaSwaras','ಊ'],['kannadaSwaras','ಓ'],['kannadaVyanjanas','ಞ'],['kannadaVyanjanas','ಳ']]){
    await page.locator('#setSelect').selectOption(set);
    await page.evaluate(name=>{state.letterIndex=getCharacters().findIndex(c=>c.name===name);renderLetter();beginLetter();stopAnimation();},name);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    const canvas=await page.locator('#letterCanvas').boundingBox(),hear=await page.locator('#hearButton').boundingBox();
    if(hear)assert.ok(hear.y>=canvas.y+canvas.height);
   }
   await page.screenshot({path:`/tmp/kannada-lines-${width}.png`,fullPage:true});
  }
  for(const [set,n] of [['uppercase',4],['numbers',0],['kannadaSwaras',2],['lowercase',4],['kannadaVyanjanas',2]]){
   await page.locator('#setSelect').selectOption(set);assert.equal(await page.locator('#notebookLayer line').count(),n);
  }
  await page.goto(base+'/alphabet-writing-guide/review/kannada-review.html');
  for(const [set,n] of [['swaras',15],['vyanjana',34]]){
   await page.locator('#reviewSet').selectOption(set);
   assert.equal(await page.locator('#review section').count(),n);
   assert.equal(await page.locator('#overview a').first().locator('svg line').count(),2);
   assert.equal(await page.locator('#review section').first().locator('a').filter({hasText:'Ruled placement reference'}).count(),1);
   const match=await page.evaluate(()=>{
    const source=(document.querySelector('#reviewSet').value==='swaras'?KANNADA_SWARAS:KANNADA_VYANJANAS)[0];
    const expected=KANNADA_NOTEBOOK.place(source);return document.querySelector('#overview a path').getAttribute('d')===expected.strokes[0].d;
   });assert.ok(match,'Review uses the same positioned geometry as the lesson');
  }
  assert.deepEqual(errors,[]);
  console.log('PASS: all 49 Kannada placements; paired guides; body/extension anatomy; uniform curves, widths and pen lifts preserved; no clipping; three layouts; review parity; 4/2/0-line set switching.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});

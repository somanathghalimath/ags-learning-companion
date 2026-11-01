/* Notebook positioning and actual animated SVG geometry, rather than font metrics. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const base=(process.env.SITE_URL||'http://localhost:8765').replace(/\/$/,'');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:360,height:800}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/alphabet-writing-guide/');
  const checked=await page.evaluate(()=>{
   const near=(actual,expected,label)=>{if(Math.abs(actual-expected)>.08)throw Error(label+': '+actual+' expected '+expected);};
   const bounds=paths=>{
    const boxes=paths.map(p=>p.getBBox());return{top:Math.min(...boxes.map(b=>b.y)),bottom:Math.max(...boxes.map(b=>b.y+b.height))};
   };
   let count=0;
   for(const set of ['uppercase','lowercase']){
    changeSet(set);
    for(let i=0;i<getCharacters().length;i++){
     state.letterIndex=i;renderLetter();beginLetter();stopAnimation();
     const c=getCharacters()[i],paths=state.strokeElements;
     const rules=[...document.querySelectorAll('#notebookLayer line')];
     if(rules.length!==4)throw Error('Missing rules');
     rules.forEach((r,j)=>near(Number(r.getAttribute('y1')),[70,160,250,340][j],'rule position'));
     const colours=rules.map(r=>getComputedStyle(r).stroke);
     if(colours.join('|')!==['rgb(217, 121, 135)','rgb(130, 174, 216)','rgb(130, 174, 216)','rgb(217, 121, 135)'].join('|'))throw Error('Rule colours');
     if(!(elements.notebookLayer.compareDocumentPosition(elements.guideLayer)&Node.DOCUMENT_POSITION_FOLLOWING))throw Error('Rules must be behind the ink');
     const body=set==='uppercase'&&c.name==='Q'?paths.slice(0,1):paths;
     const b=bounds(body);
     if(set==='uppercase'){near(b.top,70,c.name+' cap top');near(b.bottom,250,c.name+' baseline');}
     else if('bdfhkl'.includes(c.name)){near(b.top,70,c.name+' tall top');near(b.bottom,250,c.name+' baseline');}
     else if('gjpqy'.includes(c.name)){
      const descender=c.name==='j'?paths.slice(0,1):paths;
      near(bounds(descender).top,160,c.name+' body top');near(bounds(descender).bottom,340,c.name+' tail bottom');
      if('gpq'.includes(c.name)){const roundBody=c.name==='p'?paths.slice(1):paths.slice(0,1);near(bounds(roundBody).top,160,c.name+' round body top');near(bounds(roundBody).bottom,250,c.name+' round body baseline');}
     }else if(c.name==='i'){near(bounds(paths.slice(0,1)).top,160,'i body top');near(b.bottom,250,'i baseline');near(paths[1].getBBox().y,115,'i dot');}
     else if(c.name==='t'){near(b.top,110,'shorter t stem');near(b.bottom,250,'t baseline');near(paths[1].getBBox().y,160,'t crossbar');}
     else{near(b.top,160,c.name+' small top');near(b.bottom,250,c.name+' baseline');}
     const guides=[...elements.guideLayer.querySelectorAll('path')];
     paths.forEach((p,j)=>{if(p.getAttribute('d')!==guides[j].getAttribute('d'))throw Error('Guide / ink mismatch');});
     // Exercise every pen-down movement and check the pencil remains on that path.
     for(let j=0;j<paths.length;j++){
      if(state.strokeIndex!==j||state.phase!=='drawing')throw Error('Wrong stroke order');
      const length=state.strokeLengths[j],duration=SPEEDS.normal.drawDuration;
      updateDrawing(state.phaseStartedAt+duration/2);
      const distance=length-Number(paths[j].style.strokeDashoffset),point=paths[j].getPointAtLength(distance);
      const position=elements.pencilTip.transform.baseVal.getItem(0).matrix;
      near(position.e,point.x,'pencil x');near(position.f,point.y,'pencil y');
      updateDrawing(state.phaseStartedAt+duration+1);stopAnimation();
      if(j<paths.length-1){updatePreparing(state.phaseStartedAt+501);stopAnimation();}
     }
     if(state.phase!=='complete'||paths.some(p=>p.style.strokeDasharray!=='none'))throw Error('Incomplete letter');
     count++;
    }
   }
   return count;
  });
  assert.equal(checked,52);
  for(const width of [360,768,1280]){
   await page.setViewportSize({width,height:900});
   for(const [set,name] of [['uppercase','A'],['uppercase','Q'],['lowercase','a'],['lowercase','b'],['lowercase','g'],['lowercase','j'],['lowercase','y']]){
    await page.evaluate(({set,name})=>{changeSet(set);state.letterIndex=getCharacters().findIndex(c=>c.name===name);renderLetter();stopAnimation();},{set,name});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
   }
   await page.screenshot({path:`/tmp/english-notebook-${width}.png`,fullPage:true});
  }
  for(const set of ['numbers','kannadaSwaras','kannadaVyanjanas']){
   await page.locator('#setSelect').selectOption(set);
   assert.equal(await page.locator('#notebookLayer line').count(),0);
  }
  await page.locator('#setSelect').selectOption('uppercase');
  assert.equal(await page.locator('#notebookLayer line').count(),4);
  assert.deepEqual(errors,[]);
  console.log('PASS: all 52 English letters, red/blue/blue/red ruling, body and tail positioning, animated pencil alignment, completed ink, three layouts and set switching.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});

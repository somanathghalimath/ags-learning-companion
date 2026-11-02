const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const base=(process.env.SITE_URL||'http://localhost:8765').replace(/\/$/,'')+'/numbers-with-me/';
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'#train');
  let answer=await page.evaluate(()=>currentMission().answer);
  await page.locator(`[data-action="select"][data-value="${answer}"]`).tap();
  await page.locator('[data-action="place"]').tap();
  assert.equal(await page.evaluate(()=>gameState.phase),'success');
  await page.locator('[data-action="next"]').tap();
  answer=await page.evaluate(()=>currentMission().answer);
  const source=await page.locator(`[data-action="select"][data-value="${answer}"]`).boundingBox(),target=await page.locator('[data-action="place"]').boundingBox();
  const cdp=await context.newCDPSession(page);
  const touch=(type,x,y)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:type==='touchEnd'||type==='touchCancel'?[]:[{x,y,id:0}]});
  const x=source.x+source.width/2,y=source.y+source.height/2;
  await touch('touchStart',x,y);
  await touch('touchMove',x+15,y-15);
  assert.equal(await page.locator('.drag-ghost').count(),1);
  await touch('touchMove',target.x+target.width/2,target.y+target.height/2);
  await touch('touchEnd');
  assert.equal(await page.evaluate(()=>gameState.phase),'success');assert.equal(await page.locator('.drag-ghost').count(),0);
  await page.waitForTimeout(600);
  const next=await page.locator('[data-action="next"]').boundingBox();
  await touch('touchStart',next.x+next.width/2,next.y+next.height/2);await page.waitForTimeout(80);await touch('touchEnd');
  await page.waitForFunction(()=>gameState.phase==='choose'&&gameState.index===2);
  const piece=await page.locator('[data-draggable]').first().boundingBox();
  await touch('touchStart',piece.x+20,piece.y+20);await touch('touchMove',piece.x+35,piece.y);
  assert.equal(await page.locator('.drag-ghost').count(),1);await touch('touchCancel');
  assert.equal(await page.locator('.drag-ghost').count(),0);assert.equal(await page.evaluate(()=>gameDrag===null),true);
  // Leaving while a piece is held releases both its DOM ghost and pointer reference.
  await touch('touchStart',piece.x+20,piece.y+20);await touch('touchMove',piece.x+35,piece.y);
  await page.evaluate(()=>numberGamesHome(false));await touch('touchEnd');
  assert.equal(await page.locator('.drag-ghost').count(),0);assert.equal(await page.evaluate(()=>gameDrag===null),true);
  let stories=0;
  for(const range of [5,10])for(const operation of ['add','subtract']){
   await page.goto(base+`stories.html?operation=${operation}&range=${range}`);
   assert.equal(await page.locator('#operation').inputValue(),operation);assert.equal(await page.locator('#range').inputValue(),String(range));
   for(let i=0;i<6;i++){
    const lesson=await page.evaluate(()=>list()[state.index]),[,start,change]=lesson;
    const result=operation==='add'?start+change:start-change;
    assert.equal(await page.locator('#answerPanel').isVisible(),false);
    await page.locator('#advance').tap();await page.waitForFunction(()=>state.stage===2);
    assert.equal(await page.locator('#answerPanel').isVisible(),false);
    await page.locator('#advance').tap();
    assert.equal(await page.locator('#answerNumber').textContent(),String(result));
    assert.equal(await page.locator('#equation').textContent(),`${start} ${operation==='add'?'+':'−'} ${change} = ${result}`);
    await page.locator('#advance').tap();assert.equal(await page.evaluate(()=>state.index),(i+1)%6);stories++;
   }
   await page.locator('.home-button').tap();await page.locator('.game-card').first().waitFor();
  }
  await page.goto(base+'stories.html?operation=invalid&range=900');
  assert.equal(await page.locator('#operation').inputValue(),'add');assert.equal(await page.locator('#range').inputValue(),'5');
  await page.emulateMedia({reducedMotion:'no-preference'});await page.locator('#advance').tap();
  assert.equal(await page.evaluate(()=>state.busy),true);
  await page.evaluate(()=>window.dispatchEvent(new Event('pagehide')));
  assert.equal(await page.evaluate(()=>state.timer),null);
  await page.evaluate(()=>window.dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true})));
  assert.equal(await page.evaluate(()=>state.busy),false);assert.equal(await page.evaluate(()=>state.stage),0);
  assert.deepEqual(errors,[]);
  console.log(`PASS: mobile touch tap/drag/cancel/leave cleanup; all ${stories} original stories, card return links, valid/invalid URL settings and pending-story cleanup.`);
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});

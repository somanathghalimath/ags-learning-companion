const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const base=(process.env.SITE_URL||'http://localhost:8765').replace(/\/$/,'')+'/numbers-with-me/';
const window={};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../games-lessons.js'),'utf8'),{window});
const lessons=window.NUMBER_GAMES;
// Many fresh sets, including the start/end of each supported number range.
for(let i=0;i<100;i++){
 for(const trainMax of [10,20,50,100]){
  const missions=lessons.missions('train',{trainMax,snackMax:5});assert.equal(missions.length,10);
  assert.deepEqual(Array.from(missions,m=>m.missing),[1,0,2,1,0,2,1,0,2,1]);
  assert.equal(new Set(missions.map(m=>`${m.numbers[0]}:${m.missing}`)).size,10);
  for(const m of missions){assert.equal(m.numbers[m.missing],m.answer);assert.equal(m.options.length,3);assert.equal(new Set(m.options).size,3);assert.ok(m.options.includes(m.answer));assert.ok(m.options.every(n=>Number.isInteger(n)&&n>=1&&n<=trainMax));assert.ok(m.numbers[0]>=1&&m.numbers[2]<=trainMax);assert.equal(m.numbers[1],m.numbers[0]+1);assert.equal(m.numbers[2],m.numbers[1]+1);}
 }
 for(const snackMax of [5,10]){
  const missions=lessons.missions('snacks',{trainMax:10,snackMax});assert.equal(missions.length,10);
  assert.equal(new Set(missions.map(m=>`${m.goal}:${Math.min(m.left,m.right)}:${Math.max(m.left,m.right)}`)).size,10);
  for(const m of missions){assert.ok(m.left>0&&m.right>0&&m.left<=snackMax&&m.right<=snackMax);assert.equal(m.answer,m.left===m.right?'same':m.goal==='fewer'?(m.left<m.right?'left':'right'):(m.left>m.right?'left':'right'));}
 }
}
assert.deepEqual(Array.from(lessons.missions('picnic',{}),m=>m.relation),['inside','outside','below','above','inside','outside','above','below','inside','outside']);
assert.equal(new Set(lessons.missions('picnic',{}).map(m=>`${m.relation}:${m.item}`)).size,10);
const shapeTasks=lessons.missions('shapes',{});assert.equal(shapeTasks.length,10);
assert.equal(new Set(shapeTasks.map(m=>m.object)).size,10);
for(const shape of Object.keys(lessons.shapeNames))assert.equal(shapeTasks.filter(m=>m.answer===shape).length,2);
assert.equal(new Set(lessons.missions('shapes',{}).map(m=>m.answer)).size,5);

(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[],badRequests=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400&&/\.(js|css|html)(\?|$)/.test(r.url()))badRequests.push(r.url());});
  await page.goto(base);
  assert.equal(await page.locator('.game-card').count(),4);
  assert.equal(await page.locator('#gameHome select').count(),0);
  assert.equal(await page.locator('#grownupDialog').isVisible(),false);
  const round=()=>page.evaluate(()=>JSON.parse(JSON.stringify(currentMission())));
  const phase=()=>page.evaluate(()=>gameState.phase);
  const open=game=>page.locator(`[data-action="open"][data-game="${game}"]`).click();
  const home=()=>page.locator('#gameView [data-action="home"]').first().click();
  const pick=value=>page.locator(`[data-action="select"][data-value="${value}"]`).click();
  const place=target=>page.locator(`[data-action="place"][data-target="${target}"]`).click();
  let completed=0;
  await page.screenshot({path:'/tmp/number-games-home.png',fullPage:true});
  for(const game of ['train','snacks','picnic','shapes']){
   await open(game);
   const total=await page.evaluate(()=>gameState.missions.length);
   assert.equal(total,10);
   for(let i=0;i<total;i++){
    const m=await round();
    assert.equal(await page.evaluate(()=>gameState.index),i);
    if(game==='train'){
     if(i===0){
      await place('blank');assert.equal(await phase(),'choose');
      await pick(m.options.find(n=>n!==m.answer));await place('blank');
      assert.equal(await phase(),'choose');assert.equal(await page.locator('.counting-hint').count(),1);
      await page.locator(`[data-action="select"][data-value="${m.answer}"]`).focus();await page.keyboard.press('Enter');
      assert.equal(await page.locator(`[data-value="${m.answer}"]`).getAttribute('aria-pressed'),'true');
      await place('blank');
     }else if(i===1){
      const source=await page.locator(`[data-action="select"][data-value="${m.answer}"]`).boundingBox(),target=await page.locator('[data-action="place"]').boundingBox();
      await page.mouse.move(source.x+source.width/2,source.y+source.height/2);await page.mouse.down();
      await page.mouse.move(source.x+source.width/2+15,source.y+source.height/2-15);
      assert.equal(await page.locator('.drag-ghost').count(),1);
      await page.mouse.move(target.x+target.width/2,target.y+target.height/2,{steps:6});await page.mouse.up();
      assert.equal(await page.locator('.drag-ghost').count(),0);assert.equal(await page.evaluate(()=>gameDrag),null);
      await page.waitForTimeout(360);
     }else{await pick(m.answer);await place('blank');}
     assert.equal(await page.locator('.carriage-number').count(),3);
    }else if(game==='snacks'){
     const choice=i===1?m.answer:(m.answer==='left'?'right':'left');
     await page.locator(`[data-action="plate"][data-value="${choice}"]`).click();
     if(choice!==m.answer){
      assert.equal(await phase(),'choose');
      assert.equal(await page.locator('[data-action="next"]').count(),0);
      await page.locator('[data-action="hint"]').click();
      assert.equal(await phase(),'choose','Help does not add a matching step');
      await page.locator(`[data-action="plate"][data-value="${m.answer}"]`).click();
     }
     assert.equal(await phase(),'success','Correct plate is accepted immediately');
     assert.equal(await page.locator('[data-action="pair"]').count(),0);
     assert.equal(await page.locator('.snack').count(),m.left+m.right,'All snacks stay visible');
     if(m.goal==='same')assert.match(await page.locator('#feedback').textContent(),/same number/);
    }else if(game==='picnic'){
     if(i===0){await pick(m.item);await place('outside');assert.equal(await phase(),'choose');await page.locator('[data-action="hint"]').click();assert.equal(await page.locator('.hint-target').count(),1);}
     else await pick(m.item);
     await place(m.relation);
     if(m.relation==='inside')assert.ok(await page.evaluate(()=>{const item=document.querySelector('[data-inside-item]'),front=document.querySelector('[data-basket-front]');return !!item&&!!front&&!!(item.compareDocumentPosition(front)&Node.DOCUMENT_POSITION_FOLLOWING);}),'Inside object must sit behind the basket front');
    }else{
     if(i===0){await pick(m.options.find(s=>s!==m.answer));await place('slot');assert.equal(await phase(),'choose');}
     await pick(m.answer);await place('slot');
     if(m.answer==='square'){assert.equal(m.rotation,0);assert.match(await page.locator('#feedback').textContent(),/square/);}
    }
    assert.equal(await phase(),'success',game+' mission '+i);
    assert.equal(await page.locator('.scene-target.hint-target').count(),0,'Placement hints clear after success');
    assert.ok(await page.locator('[data-action="next"]').isVisible());
    if(i===0||game==='shapes'){
     await page.waitForTimeout(600);
     await page.screenshot({path:`/tmp/number-games-${game}-${game==='shapes'?m.object:'success'}.png`,fullPage:true});
    }
    await page.locator('[data-action="next"]').click();completed++;
   }
   assert.equal(await phase(),'complete');
   assert.equal(await page.locator('.notebook-card').count(),1);
   await page.locator('[data-action="again"]').click();assert.equal(await phase(),'choose');assert.equal(await page.evaluate(()=>gameState.index),0);
   await home();assert.equal(await page.locator('#gameHome').isVisible(),true);assert.equal(await page.locator('#playArea').evaluate(e=>e.childElementCount),0);
  }
  assert.equal(completed,40);
  // Settings are grown-up only; applying them safely restarts an active game.
  await open('train');await page.locator('[data-action="settings"]').click();
  await page.locator('#trainRange').selectOption('100');await page.locator('#snackRange').selectOption('10');
  await page.locator('#settingsForm [type="submit"]').click();assert.equal(await phase(),'choose');
  assert.deepEqual(await page.evaluate(()=>gameState.settings),{trainMax:100,snackMax:10});
  await home();assert.match(await page.locator('#addingLink').getAttribute('href'),/range=10/);
  await open('picnic');await page.goBack();await page.locator('#gameHome').waitFor({state:'visible'});
  // Cancelling or leaving during a drag must release its ghost and pointer source.
  await open('shapes');let source=await page.locator('[data-draggable]').first().boundingBox();
  await page.mouse.move(source.x+20,source.y+20);await page.mouse.down();await page.mouse.move(source.x+40,source.y);
  assert.equal(await page.locator('.drag-ghost').count(),1);
  await page.evaluate(()=>window.dispatchEvent(new Event('blur')));assert.equal(await page.locator('.drag-ghost').count(),0);await page.mouse.up();
  await home();
  for(const viewport of [{width:320,height:568},{width:360,height:800},{width:768,height:1024},{width:1280,height:900},{width:844,height:390}]){
   await page.setViewportSize(viewport);
   for(const game of ['train','snacks','picnic','shapes']){
    await open(game);
    assert.equal(await page.evaluate(()=>scrollY),0,'New game opens at its instructions');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,game+' horizontal overflow');
    for(const button of await page.locator('#playArea button').all()){
     const box=await button.boundingBox();assert.ok(box.width>=44&&box.height>=44,game+' target too small '+JSON.stringify(box));
    }
    if(viewport.width===320)await page.screenshot({path:`/tmp/number-games-${game}-320.png`,fullPage:true});
    await home();
   }
   if(viewport.width===1280)await page.screenshot({path:'/tmp/number-games-desktop.png',fullPage:true});
  }
  const reduced=await browser.newPage({reducedMotion:'reduce'});await reduced.goto(base+'#train');
  await reduced.evaluate(()=>{gameState.selected=String(currentMission().answer);placePiece('blank');});
  assert.equal(await reduced.evaluate(()=>document.getAnimations().length),0);assert.equal(await reduced.evaluate(()=>gameState.phase),'success');await reduced.close();
  // Same home state before/after repeated activity entry, interaction and teardown.
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>{for(const game of Object.keys(gameLessons.games)){openNumberGame(game,false);helpNumberMission();numberGamesHome(false);}});
  const cdp=await page.context().newCDPSession(page);await cdp.send('HeapProfiler.enable');
  const measure=async()=>{await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));await cdp.send('HeapProfiler.collectGarbage');return{dom:await cdp.send('Memory.getDOMCounters'),heap:(await cdp.send('Runtime.getHeapUsage')).usedSize};};
  const before=await measure();
  await page.evaluate(()=>{
   for(let i=0;i<200;i++){
    const game=['train','snacks','picnic','shapes'][i%4];openNumberGame(game,false);helpNumberMission();
    if(game==='snacks')choosePlate(currentMission().answer);
    else{gameState.selected=String(game==='train'?currentMission().answer:game==='picnic'?currentMission().item:currentMission().answer);placePiece(game==='train'?'blank':game==='picnic'?currentMission().relation:'slot');}
    numberGamesHome(false);
   }
  });
  const after=await measure();
  assert.equal(after.dom.documents,before.dom.documents);
  assert.ok(after.dom.nodes<=before.dom.nodes+10,`Retained scene nodes: ${JSON.stringify({before,after})}`);
  assert.ok(after.dom.jsEventListeners<=before.dom.jsEventListeners+2,`Listeners grew: ${JSON.stringify({before,after})}`);
  assert.ok(after.heap<before.heap+1024*1024,`Post-GC heap grew by >1 MB: ${JSON.stringify({before,after})}`);
  assert.equal(await page.evaluate(()=>gameState.missions.length),0);assert.equal(await page.evaluate(()=>gameDrag),null);assert.equal(await page.locator('.drag-ghost').count(),0);
  fs.writeFileSync('/tmp/number-games-memory.json',JSON.stringify({cycles:200,before,after},null,2));
  assert.deepEqual(errors,[]);assert.deepEqual(badRequests,[]);
  console.log('PASS: four games / 40 missions; useful retries, immediate plate answers, mouse drag, keyboard, settings, replay, navigation, 320/360/768/1280/landscape layouts and reduced motion.');
  console.log('Memory teardown after 200 cycles:',JSON.stringify({before,after}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});

const { chromium } = require('playwright');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [360,768,1280]) {
  await page.setViewportSize({width,height:900});
  await page.goto('http://localhost:8765/picture-reading/');
  if(await page.locator('.category-card').count()!==32)throw Error('category count');
  const ids=await page.locator('.category-card').evaluateAll(els=>els.map(e=>e.hash));
  let cardCount = 0;
  for(const id of ids){
   await page.goto('http://localhost:8765/picture-reading/'+id);
   await page.locator('#reading').waitFor({state:'visible'});
   cardCount += await page.locator('.picture-card').count();
   if (await page.locator('.review-note').count()) throw Error('Unexpected pending review note');
   await page.locator('#pictures img').evaluateAll(imgs=>Promise.all(imgs.map(img=>{img.loading='eager';return img.decode()})));
   const bad=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,broken:[...document.querySelectorAll('#pictures img')].some(i=>!i.naturalWidth)}));
   if(bad.overflow||bad.broken)throw Error(JSON.stringify({width,id,...bad}));
   if(['#my-body','#family','#a-house','#classroom'].includes(id)) {
    if(await page.locator('#pictures figure').count())throw Error('full-page cards');
    const ratio=await page.locator('.full-page img').evaluate(i=>Math.abs(i.width/i.height-i.naturalWidth/i.naturalHeight));
    if(ratio>.005)throw Error('page ratio');
   } else {
    const links = await page.locator('.picture-link').evaluateAll(els => els.map(e => ({hash:e.hash, name:e.textContent.trim()})));
    if (!links.length) throw Error('Missing clickable pictures');
    await page.locator('.picture-link').first().click();
    await page.locator('#object-view').waitFor({state:'visible'});
    if (await page.locator('#object-heading').textContent() !== links[0].name) throw Error('Wrong object');
    if (await page.locator('#previous-object').getAttribute('href') !== null) throw Error('Previous enabled at start');
    await page.locator('#object-image').evaluate(i => i.decode());
    if (links.length > 1) {
     await page.locator('#next-object').click();
     await page.waitForFunction(name => document.querySelector('#object-heading').textContent === name, links[1].name);
     await page.locator('#previous-object').click();
     await page.waitForFunction(name => document.querySelector('#object-heading').textContent === name, links[0].name);
    }
    if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw Error('Object view overflow');
    await page.locator('#section-home').click();
    await page.locator('#reading').waitFor({state:'visible'});
    await page.locator('.picture-link').last().click();
    await page.waitForFunction(name => document.querySelector('#object-heading').textContent === name, links.at(-1).name);
    if (await page.locator('#next-object').getAttribute('href') !== null) throw Error('Next enabled at end');
    await page.reload();
    if (await page.locator('#object-heading').textContent() !== links.at(-1).name) throw Error('Direct object route');
    await page.locator('#object-view a[href="#"]').click();
    await page.locator('#categories').waitFor({state:'visible'});
    await page.goBack();
    await page.locator('#object-view').waitFor({state:'visible'});
   }
  }
  if (cardCount !== 251) throw Error(`Expected 251 displayed cards, got ${cardCount}`);
  await page.goto('http://localhost:8765/picture-reading/#domestic-animals');
  await page.screenshot({path:`/tmp/picture-reading-${width}.png`,fullPage:true});
  await page.locator('#reading > .back-button').click();await page.locator('#categories').waitFor({state:'visible'});
  await page.goBack();await page.locator('#reading').waitFor({state:'visible'});
  await page.locator('.home-button').click();
  await page.locator('a[href="./picture-reading/"]').click();
  await page.locator('#categories').waitFor({state:'visible'});
 }
 for(const module of ['numbers-with-me','draw-with-me','alphabet-writing-guide','brand-pop-quiz','name-the-flag','name-the-leader','cars-logo-quiz']){
  const response=await page.goto('http://localhost:8765/'+module+'/');if(!response.ok())throw Error(module);
 }
 await browser.close();if(errors.length)throw Error(errors.join('\n'));
 console.log('PASS: all 251 cards across 32 categories at 360/768/1280px; all displayed images decode; object views, Previous/Next boundaries, both home links, direct routes and browser Back; no horizontal overflow; full-page aspect ratios; category/back/home navigation; seven existing module smoke checks; no JS errors.');
})().catch(e=>{console.error(e);process.exit(1)});

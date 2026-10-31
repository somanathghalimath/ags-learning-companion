/* Speech requests are mocked; audible voice quality depends on the device. */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const base = (process.env.SITE_URL || 'http://localhost:8765').replace(/\/$/, '');
const modules = ['brand-pop-quiz', 'cars-logo-quiz', 'name-the-leader', 'name-the-flag'];
(async () => {
  const browser = await chromium.launch({executablePath:'/usr/bin/google-chrome', args:['--no-sandbox']});
  try {
    const page = await browser.newPage({viewport:{width:360,height:800}});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(() => {
      window.speechCalls = [];
      Object.defineProperty(window, 'speechSynthesis', {value:{
        getVoices: () => [{name:'Microsoft Ravi',lang:'en-IN'}, {name:'Microsoft Heera',lang:'en-IN'}],
        cancel: () => speechCalls.push({cancel:true}),
        speak: u => speechCalls.push({text:u.text,lang:u.lang,voice:u.voice?.name})
      }});
      window.SpeechSynthesisUtterance = class {constructor(text) {this.text=text;}};
    });
    const ready = () => page.waitForFunction(() => !document.querySelector('#hearBtn').disabled);
    const last = () => page.evaluate(() => speechCalls.at(-1));
    const expected = () => page.evaluate(() => ({text:order[index].name,lang:'en-IN',voice:'Microsoft Heera'}));
    for (const module of modules) {
      await page.goto(`${base}/${module}/`);
      await ready();
      assert.equal(await page.evaluate(() => speechCalls.some(c => c.text)), false, 'No answer spoken on load');
      await page.locator('#hearBtn').click();
      assert.deepEqual(await last(), await expected());
      assert.equal(await page.evaluate(() => features.showName || stage.classList.contains('show-answer')), true);
      await page.locator('#hearBtn').press('Space');
      assert.equal(await page.evaluate(() => index), 0, 'Space activates focused Hear button');
      assert.deepEqual(await last(), await expected());
      await page.locator('#nextBtn').click();
      assert.deepEqual(await last(), {cancel:true});
      assert.equal(await page.locator('#hearBtn').isDisabled(), true);
      await ready();
      assert.equal(await page.evaluate(() => stage.classList.contains('show-answer')), false);
      await page.locator('#hearBtn').click();
      assert.deepEqual(await last(), await expected());
      await page.locator('#prevBtn').click();
      await ready();
      await page.keyboard.press('a');
      assert.deepEqual(await last(), await expected());
      await page.keyboard.press('a');
      assert.deepEqual(await last(), {cancel:true});
      await page.locator('#shuffleBtn').click();
      await ready();
      assert.deepEqual(await last(), {cancel:true});
      if (await page.locator('#scratchBtn').count()) {
        await page.locator('#scratchBtn').click();
        await ready();
        await page.locator('canvas.scratch-cover').waitFor({state:'attached'});
        await page.locator('#hearBtn').click();
        assert.deepEqual(await last(), await expected());
        await page.locator('#scratchBtn').click();
        await ready();
      }
      // Rapid navigation must not leave speech referring to an older card.
      await page.evaluate(() => {nextItem(); nextItem(); prevItem();});
      await ready();
      await page.locator('#hearBtn').click();
      assert.deepEqual(await last(), await expected());
      assert.equal(await page.locator('#answer').textContent(), (await expected()).text);
      for (const width of [360,768,1280]) {
        await page.setViewportSize({width,height:800});
        const bounds = await page.locator('#hearBtn').boundingBox();
        assert.ok(bounds.width >= 44 && bounds.height >= 44 && bounds.x >= 0 && bounds.x + bounds.width <= width);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      }
      await page.evaluate(() => {index=order.length-1; render();});
      await ready();
      await page.locator('#nextBtn').click();
      await page.locator('.done').waitFor();
      assert.equal(await page.locator('#hearBtn').isDisabled(), true);
      assert.deepEqual(await last(), {cancel:true});
      await page.locator('#prevBtn').click();
      await ready();
      await page.locator('#hearBtn').click();
      assert.deepEqual(await last(), await expected());
      await page.evaluate(() => window.dispatchEvent(new Event('pagehide')));
      assert.deepEqual(await last(), {cancel:true});
      console.log(`${module}: voice, reveal, navigation, scratch (if enabled), keyboard, completion and layouts passed`);
    }
    const unsupported = await browser.newPage();
    unsupported.on('pageerror', error => errors.push(error.message));
    await unsupported.addInitScript(() => {delete window.speechSynthesis; delete window.SpeechSynthesisUtterance;});
    for (const module of modules) {
      await unsupported.goto(`${base}/${module}/`);
      assert.equal(await unsupported.locator('#hearBtn').count(), 0);
      await unsupported.waitForFunction(() => document.querySelector('.brand-image'));
      await unsupported.locator('#nextBtn').click();
      await unsupported.waitForFunction(() => document.querySelector('#counter').textContent === '2');
    }
    assert.deepEqual(errors, []);
    console.log('All four quizzes passed, including browsers without speech support.');
  } finally { await browser.close(); }
})().catch(error => {console.error(error);process.exitCode=1;});

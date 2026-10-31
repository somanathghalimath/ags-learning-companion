/* Speech API mocks validate requests and lifecycle; audible accent needs a device voice. */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch({executablePath:'/usr/bin/google-chrome', headless:true, args:['--no-sandbox']});
 try {
  const page = await browser.newPage({viewport:{width:360,height:900}});
  await page.addInitScript(() => {
   window.speechCalls = [];
   window.testVoices = [{name:'British English',lang:'en-GB',default:true},{name:'Indian English',lang:'en-IN'}];
   Object.defineProperty(window, 'speechSynthesis', {value:{
    getVoices: () => window.testVoices,
    cancel: () => window.speechCalls.push({cancel:true}),
    speak: u => window.speechCalls.push({text:u.text,lang:u.lang,voice:u.voice?.name,rate:u.rate})
   }});
   window.SpeechSynthesisUtterance = class {constructor(text) {this.text=text;}};
  });
  const base = 'http://localhost:8765/picture-reading/';
  await page.goto(base+'#domestic-animals');
  assert.deepEqual(await page.evaluate(() => window.speechCalls), []);
  await page.locator('.picture-link').first().click();
  await page.locator('#object-view').waitFor({state:'visible'});
  assert.deepEqual(await page.evaluate(() => window.speechCalls), [{cancel:true},{text:'Cow',lang:'en-IN',voice:'Indian English',rate:0.85}]);
  await page.locator('#speak-object').click();
  assert.equal(await page.evaluate(() => window.speechCalls.at(-1).text), 'Cow');
  await page.locator('#next-object').click();
  await page.waitForFunction(() => document.querySelector('#object-heading').textContent === 'Goat');
  assert.equal(await page.evaluate(() => window.speechCalls.at(-1).text), 'Goat');
  assert.equal(await page.evaluate(() => window.speechCalls.at(-2).cancel), true);
  await page.locator('#previous-object').click();
  await page.waitForFunction(() => document.querySelector('#object-heading').textContent === 'Cow');
  assert.equal(await page.evaluate(() => window.speechCalls.at(-1).text), 'Cow');
  await page.locator('#section-home').click();
  await page.locator('#reading').waitFor({state:'visible'});
  assert.equal(await page.evaluate(() => window.speechCalls.at(-1).cancel), true);
  await page.goBack();
  await page.locator('#object-view').waitFor({state:'visible'});
  assert.equal(await page.evaluate(() => window.speechCalls.at(-1).text), 'Cow');
  // Late-loaded voice lists are read on every pronunciation.
  await page.evaluate(() => {window.testVoices = [];});
  await page.locator('#speak-object').click();
  assert.deepEqual(await page.evaluate(() => window.speechCalls.at(-1)), {text:'Cow',lang:'en-IN',voice:undefined,rate:0.85});
  await page.evaluate(() => {window.testVoices = [{name:'English India',lang:'en_IN'}];});
  await page.locator('#speak-object').click();
  assert.equal(await page.evaluate(() => window.speechCalls.at(-1).voice), 'English India');
  await page.locator('#object-view a[href="#"]').click();
  await page.locator('#categories').waitFor({state:'visible'});
  await page.locator('.category-card[href="#my-body"]').click();
  await page.locator('.full-page').waitFor({state:'visible'});
  assert.equal(await page.evaluate(() => window.speechCalls.at(-1).text), 'My Body');
  await page.locator('#pictures .speak-button').click();
  assert.equal(await page.evaluate(() => window.speechCalls.at(-1).text), 'My Body');
  await page.goto(base+'#domestic-animals/cow');
  await page.reload();
  assert.deepEqual(await page.evaluate(() => window.speechCalls), []);
  await page.locator('#speak-object').click();
  assert.equal(await page.evaluate(() => window.speechCalls.at(-1).text), 'Cow');
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  const unsupported = await browser.newPage();
  await unsupported.addInitScript(() => {delete window.speechSynthesis; delete window.SpeechSynthesisUtterance;});
  await unsupported.goto(base+'#domestic-animals/cow');
  assert.equal(await unsupported.locator('#speak-object').isVisible(), false);
  assert.equal(await unsupported.locator('#object-heading').textContent(), 'Cow');
  console.log('PASS: en-IN voice preference, late voice loading, fallback language, card/Previous/Next speech, replay, cancellation, browser Back, full-page title, silent direct load, unsupported browser and mobile layout. Speech requests mocked; audible accent not verified.');
 } finally {await browser.close();}
})().catch(e => {console.error(e);process.exit(1);});

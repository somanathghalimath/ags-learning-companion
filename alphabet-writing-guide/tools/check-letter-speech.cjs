/* Speech requests are mocked; audible pronunciation requires device validation. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:360,height:800}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{
   window.speechCalls=[];
   window.testVoices=[{name:'Microsoft Ravi',lang:'en-IN'},{name:'Microsoft Heera',lang:'en-IN'},{name:'Microsoft Gagan',lang:'kn-IN'},{name:'Microsoft Sapna',lang:'kn-IN'}];
   Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>window.testVoices,cancel:()=>window.speechCalls.push({cancel:true}),speak:u=>window.speechCalls.push({text:u.text,lang:u.lang,voice:u.voice?.name})}});
   window.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
  });
  await page.goto('http://localhost:8765/alphabet-writing-guide/');
  assert.deepEqual(await page.evaluate(()=>speechCalls),[]);
  await page.locator('#letterCanvas').click({position:{x:100,y:100}});
  assert.deepEqual(await page.evaluate(()=>speechCalls.at(-1)),{text:'Capital A',lang:'en-IN',voice:'Microsoft Heera'});
  let count=0;
  for(const set of ['uppercase','lowercase','numbers','kannadaSwaras']){
   await page.locator('#setSelect').selectOption(set);
   const names=await page.evaluate(()=>getCharacters().map(c=>c.name));
   for(let i=0;i<names.length;i++){
    if(i)await page.locator('#nextButton').click();
    const expectedText=set==='uppercase'?'Capital '+names[i]:set==='lowercase'?'Small '+names[i].toUpperCase():set==='numbers'?['One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten'][i]:names[i];
    const last=await page.evaluate(()=>speechCalls.at(-1));
    assert.equal(last.text,expectedText);
    assert.equal(last.lang,set==='kannadaSwaras'?'kn-IN':'en-IN');
    assert.equal(last.voice,set==='kannadaSwaras'?'Microsoft Sapna':'Microsoft Heera');
    assert.equal(await page.evaluate(()=>speechCalls.at(-2).cancel),true);
    await page.locator('#hearButton').click();
    assert.deepEqual(await page.evaluate(()=>speechCalls.at(-1)),last);
    assert.equal(await page.evaluate(()=>state.letterIndex),i);
    count++;
   }
   await page.locator('#previousButton').click();
   assert.equal(await page.evaluate(()=>state.letterIndex),names.length-2);
   await page.locator('#replayButton').click();
   assert.equal(await page.evaluate(()=>state.strokeIndex),0);
   await page.locator('#pauseButton').click();
   assert.equal(await page.evaluate(()=>speechCalls.at(-1).cancel),true);
   await page.locator('#playButton').click();
   assert.equal(await page.evaluate(()=>speechCalls.at(-1).lang),set==='kannadaSwaras'?'kn-IN':'en-IN');
  }
  assert.equal(count,77);
  // Without a listed Kannada voice, do not force the English voice onto Kannada.
  await page.evaluate(()=>{window.testVoices=[{name:'Microsoft Heera',lang:'en-IN'}];});
  await page.locator('#hearButton').click();
  assert.equal(await page.evaluate(()=>speechCalls.at(-1).lang),'kn-IN');
  assert.equal(await page.evaluate(()=>speechCalls.at(-1).voice),undefined);
  await page.evaluate(()=>{window.testVoices=[{name:'Kannada male',lang:'kn-IN'}];});
  await page.locator('#hearButton').click();
  assert.equal(await page.evaluate(()=>speechCalls.at(-1).voice),'Kannada male');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.screenshot({path:'/tmp/write-with-me-voice.png',fullPage:true});
  const unsupported=await browser.newPage();
  await unsupported.addInitScript(()=>{delete window.speechSynthesis;delete window.SpeechSynthesisUtterance;});
  await unsupported.goto('http://localhost:8765/alphabet-writing-guide/');
  assert.equal(await unsupported.locator('#hearButton').isVisible(),false);
  await unsupported.locator('#setSelect').selectOption('kannadaSwaras');
  assert.match(await unsupported.locator('#letter-heading').textContent(),/ಅ/);
  assert.deepEqual(errors,[]);
  console.log('PASS: all 77 characters in four sections; shared female en-IN preference; female kn-IN preference; Kannada fallback; Hear, first gesture, Next/Previous, replay, pause/resume, cancellation, mobile layout and unsupported browsers. Speech mocked; audible pronunciation not verified.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});

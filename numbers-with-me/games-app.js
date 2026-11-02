"use strict";

const gameLessons=window.NUMBER_GAMES,gameArt=window.NUMBER_GAME_ART;
const gameElements=Object.fromEntries(["gameHome","gameView","gameCards","gameName","missionTitle","missionEyebrow","missionProgress","tapInstruction","playArea","feedback","missionActions","helpMission","grownupDialog","settingsForm"].map(id=>[id,document.getElementById(id)]));
const gameState={game:null,missions:[],index:0,phase:"home",selected:null,choice:null,hint:false,message:"",session:0,settings:{trainMax:10,snackMax:5}};
let gameDrag=null,ignoreGameClickUntil=0;
const currentMission=()=>gameState.missions[gameState.index];
const gameWon=()=>gameState.phase==="success";
const itemName=type=>({apple:"apple",ball:"ball",book:"book"})[type];
const safeText=value=>String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);

function stopGameDrag(){
  if(!gameDrag)return;
  const drag=gameDrag;gameDrag=null;
  drag.ghost?.remove();
  if(drag.source.hasPointerCapture?.(drag.pointerId))drag.source.releasePointerCapture(drag.pointerId);
}
function stopGameAnimations(){
  if(gameElements.gameView.getAnimations)gameElements.gameView.getAnimations({subtree:true}).forEach(animation=>animation.cancel());
}
function cleanGameScene(){stopGameDrag();stopGameAnimations();}
function updateStoryLinks(){
  document.getElementById("addingLink").href=`stories.html?operation=add&range=${gameState.settings.snackMax}`;
  document.getElementById("subtractingLink").href=`stories.html?operation=subtract&range=${gameState.settings.snackMax}`;
}
function renderGameCards(){
  gameElements.gameCards.innerHTML=Object.entries(gameLessons.games).map(([key,game])=>`<button type="button" class="game-card ${key}-card" data-action="open" data-game="${key}" aria-label="Play ${safeText(game.name)}"><span class="card-picture">${gameArt.preview(key)}</span><span class="card-caption"><strong>${game.name}</strong><small>${game.subtitle}</small></span><span class="card-arrow" aria-hidden="true">↗</span></button>`).join("");
}
function resetMission(){
  gameState.phase="choose";gameState.selected=null;gameState.choice=null;gameState.hint=false;gameState.message="";
}
function openNumberGame(key,navigate=true){
  if(!gameLessons.games[key])return;
  cleanGameScene();
  gameState.game=key;gameState.missions=gameLessons.missions(key,gameState.settings);gameState.index=0;gameState.session++;
  resetMission();
  if(navigate)history.pushState(null,"",`#${key}`);
  gameElements.gameHome.hidden=true;gameElements.gameView.hidden=false;
  document.body.dataset.game=key;
  renderNumberGame("heading");
}
function numberGamesHome(navigate=true){
  cleanGameScene();
  Object.assign(gameState,{game:null,missions:[],index:0,phase:"home",selected:null,choice:null,hint:false,message:""});
  gameElements.playArea.replaceChildren();gameElements.missionActions.replaceChildren();gameElements.feedback.textContent="";
  gameElements.gameView.hidden=true;gameElements.gameHome.hidden=false;
  document.body.dataset.game="home";
  if(navigate)history.pushState(null,"",location.pathname+location.search);
  document.getElementById("homeTitle").setAttribute("tabindex","-1");
  document.getElementById("homeTitle").focus({preventScroll:true});
  window.scrollTo(0,0);
}
function pieceButton(value,content,label){
  const selected=gameState.selected===String(value),hint=gameState.hint&&gameState.game==="shapes"&&value===currentMission().answer;
  return `<button type="button" class="pick-piece${selected?' selected':''}${hint?' hint-piece':''}" data-action="select" data-value="${value}" data-draggable data-focus-key="piece-${value}" aria-label="${safeText(label)}" aria-pressed="${selected}">${content}</button>`;
}
function trainView(m){
  const won=gameWon();
  const carriages=m.numbers.map((number,i)=>{
    const blank=i===m.missing,content=blank&&!won?"?":number;
    return `<div class="carriage carriage-${i}${blank?' missing-carriage':''}">${blank&&!won?`<button type="button" class="carriage-slot${gameState.hint?' hint-target':''}" data-action="place" data-target="blank" data-focus-key="train-slot" aria-label="Put your number in the empty carriage"><span aria-hidden="true">?</span></button>`:`<span class="carriage-number">${content}</span>`}<span class="wheel wheel-left"></span><span class="wheel wheel-right"></span></div>`;
  }).join("");
  const hint=gameState.hint&&!won?`<div class="counting-hint" aria-label="Count in order">${m.numbers.map((n,i)=>`<span class="${i===m.missing?'count-missing':''}">${n}</span>`).join('<span aria-hidden="true">→</span>')}</div>`:"";
  return `<div class="train-station"><div class="station-cloud" aria-hidden="true"></div><div class="train-set${won?' train-go':''}"><div class="engine">${gameArt.engine()}</div>${carriages}</div><div class="rail-track" aria-hidden="true"></div></div>${hint}${won?"":`<div class="piece-tray number-tray" aria-label="Choose a numbered carriage">${m.options.map(n=>pieceButton(n,`<span class="number-piece">${n}</span>`,`Pick up carriage ${n}`)).join("")}</div>`}`;
}
function snackView(m){
  const choosing=gameState.phase==="choose";
  const plate=(side,count)=>`<button type="button" class="snack-plate${gameState.choice===side?' chosen-plate':''}${gameWon()&&m.answer===side?' winning-plate':''}" data-action="plate" data-value="${side}" data-focus-key="plate-${side}" aria-label="Choose the ${side} plate, with ${count} snacks" ${choosing?"":"disabled"}><span class="snack-grid">${Array.from({length:count},()=>`<span class="snack" aria-hidden="true">${gameArt.item('apple')}</span>`).join("")}</span></button>`;
  return `<div class="snack-table"><div class="plates">${plate('left',m.left)}<span class="plates-divider" aria-hidden="true">↔</span>${plate('right',m.right)}</div>${gameWon()?"":`<button type="button" class="same-button${gameState.choice==='same'?' selected':''}" data-action="plate" data-value="same" data-focus-key="plate-same"><span aria-hidden="true">=</span> The same</button>`}</div>`;
}
function sceneTarget(target,content,correct){
  const hinted=gameState.hint&&correct&&!gameWon();
  return `<button type="button" class="scene-target${hinted?' hint-target':''}${gameWon()?' placed-target':''}" style="left:${target.x/6}%;top:${target.y/3.6}%;${target.size?`width:${target.size/6}%;`:""}" data-action="place" data-target="${target.id}" data-focus-key="target-${target.id}" aria-label="${safeText(target.label)}" ${gameWon()?"disabled":""}>${content}</button>`;
}
function picnicView(m){
  const bench=m.relation==="above"||m.relation==="below";
  const targets=m.targets.map(t=>{
    if(gameWon()&&t.id!==m.relation)return "";
    return sceneTarget(t,gameWon()?(m.relation==="inside"?"":gameArt.item(m.item)):'<span aria-hidden="true">＋</span>',t.id===m.relation);
  }).join("");
  return `<div class="illustrated-scene picnic-scene">${gameArt.picnicScene(bench,gameWon(),gameWon()&&m.relation==="inside"?m.item:null)}${targets}</div>${gameWon()?"":`<div class="piece-tray">${pieceButton(m.item,`${gameArt.item(m.item)}<span>${itemName(m.item)}</span>`,`Pick up the ${itemName(m.item)}`)}</div>`}`;
}
function shapeView(m){
  const target={id:"slot",x:m.x,y:m.y,size:m.size||112,label:`Place your piece in the empty ${m.object}`};
  return `<div class="illustrated-scene shape-scene">${gameArt.shapeScene(m,gameWon())}${gameWon()?"":sceneTarget(target,'<span aria-hidden="true">＋</span>',true)}</div>${gameWon()?"":`<div class="piece-tray shape-tray" aria-label="Choose a shape">${m.options.map(shape=>pieceButton(shape,`${gameArt.shape(shape)}<span>${gameLessons.shapeNames[shape]}</span>`,`Pick up the ${shape}`)).join("")}</div>`}`;
}
function missionInstruction(){
  if(gameWon())return "You did it. Take a look, then carry on when you’re ready.";
  if(gameState.game==="snacks")return "Choose a plate, or choose “The same”.";
  if(gameState.selected!==null)return gameState.game==="picnic"?"Now tap a spot to put it down.":"Now tap the empty space to fit it in.";
  return gameState.game==="picnic"?`Tap the ${itemName(currentMission().item)} below to pick it up.`:"Tap a piece below, then its place. You can also drag it.";
}
function renderNumberGame(focus){
  const activeKey=document.activeElement?.dataset.focusKey;
  cleanGameScene();
  const game=gameLessons.games[gameState.game];if(!game)return;
  gameElements.gameName.textContent=game.name;
  gameElements.gameView.dataset.game=gameState.game;
  if(gameState.phase==="complete"){
    gameElements.missionEyebrow.textContent="A LITTLE ADVENTURE, ALL DONE";
    gameElements.missionProgress.textContent="All done";
    gameElements.missionTitle.textContent=game.finish;
    gameElements.tapInstruction.textContent="One more go, or choose another place to play.";
    gameElements.helpMission.hidden=true;
    gameElements.playArea.innerHTML=`<div class="finish-picture">${gameArt.preview(gameState.game)}</div><div class="notebook-card"><span aria-hidden="true">✎</span><div><h3>A little notebook time?</h3><p>${safeText(game.notebook)}</p></div></div>`;
    gameElements.feedback.textContent="Thank you for helping!";
    gameElements.feedback.className="feedback positive";
    gameElements.missionActions.innerHTML='<button type="button" class="primary-button" data-action="again">Play again ↻</button><button type="button" class="secondary-button" data-action="home">Choose another game</button>';
  }else{
    const m=currentMission();
    gameElements.missionEyebrow.textContent=game.invitation;
    gameElements.missionProgress.innerHTML=`<span class="progress-dots" aria-hidden="true">${gameState.missions.map((_,i)=>`<i class="${i<gameState.index?'done':i===gameState.index?'current':''}"></i>`).join('')}</span><span>${gameState.index+1} / ${gameState.missions.length}</span>`;
    gameElements.missionTitle.textContent=m.prompt;
    gameElements.tapInstruction.textContent=missionInstruction();
    gameElements.helpMission.hidden=gameWon();
    const views={train:trainView,snacks:snackView,picnic:picnicView,shapes:shapeView};
    gameElements.playArea.innerHTML=views[gameState.game](m);
    gameElements.feedback.textContent=gameState.message;
    gameElements.feedback.className=`feedback${gameWon()?' positive':''}`;
    if(gameWon())gameElements.missionActions.innerHTML=`<button type="button" class="primary-button" data-action="next">${gameState.index===gameState.missions.length-1?'Finish our adventure':'Next little mission'} →</button>`;
    else gameElements.missionActions.replaceChildren();
  }
  if(focus==="heading"){gameElements.missionTitle.focus({preventScroll:true});window.scrollTo(0,0);}
  else if(focus==="feedback")gameElements.feedback.focus({preventScroll:true});
  else if(activeKey){const restore=gameElements.gameView.querySelector(`[data-focus-key="${activeKey}"]`);if(restore&&!restore.disabled)restore.focus({preventScroll:true});}
}
function succeed(message){gameState.phase="success";gameState.selected=null;gameState.message=message;renderNumberGame("feedback");}
function selectPiece(value){
  if(gameWon()||gameState.phase==="complete")return;
  gameState.selected=value;
  gameState.message=gameState.game==="train"?`${value} is ready. Tap the empty carriage.`:gameState.game==="picnic"?`You’ve picked up the ${value}. Now choose its place.`:`${gameLessons.shapeNames[value]} is ready. Tap the empty ${currentMission().object}.`;
  renderNumberGame();
}
function placePiece(target){
  if(gameWon()||gameState.phase==="complete")return;
  if(gameState.selected===null){gameState.message="Pick up a piece below first, then tap its place.";renderNumberGame();return;}
  const m=currentMission();
  if(gameState.game==="train"){
    if(Number(gameState.selected)===m.answer)return succeed(`${m.numbers.join(', ')} — all aboard!`);
    gameState.selected=null;gameState.hint=true;gameState.message=`Let’s count together: ${m.numbers.join(', ')}. Choose a carriage and try again.`;
  }else if(gameState.game==="picnic"){
    if(target===m.relation)return succeed(`The ${m.item} is ${m.relation} the ${m.relation==='inside'||m.relation==='outside'?'basket':'bench'}. Thank you!`);
    gameState.selected=null;gameState.message=`That spot is ${target}. Find a spot ${m.relation} the ${m.relation==='inside'||m.relation==='outside'?'basket':'bench'}.`;
  }else if(gameState.game==="shapes"){
    if(gameState.selected===m.answer)return succeed(m.explain);
    gameState.selected=null;gameState.message=m.hint;
  }
  renderNumberGame();
}
function comparisonMessage(m){
  if(m.left===m.right)return `Both plates have ${m.left}, so they have the same number.`;
  const small=Math.min(m.left,m.right),big=Math.max(m.left,m.right);
  return m.goal==='fewer'?`${small} is fewer than ${big}. You found the plate with fewer snacks!`:`${big} is more than ${small}. You found the plate with more snacks!`;
}
function choosePlate(value){
  if(gameState.phase!=="choose")return;
  const m=currentMission();gameState.choice=value;
  if(value===m.answer)return succeed(comparisonMessage(m));
  gameState.message="Count the snacks on each plate. Then try again.";
  renderNumberGame();
}
function helpNumberMission(){
  const m=currentMission();if(!m||gameWon())return;
  gameState.hint=true;
  if(gameState.game==="train")gameState.message=`Count together: ${m.numbers.join(', ')}. Which one belongs in the empty carriage?`;
  else if(gameState.game==="picnic"){gameState.selected=m.item;gameState.message=`The glowing spot is ${m.relation} the ${m.relation==='inside'||m.relation==='outside'?'basket':'bench'}. Put the ${m.item} there.`;}
  else if(gameState.game==="shapes")gameState.message=m.hint;
  else gameState.message=`The left plate has ${m.left} snacks. The right plate has ${m.right}. ${m.prompt} If both have the same number, choose “The same”.`;
  renderNumberGame();
}
function nextNumberMission(){
  if(!gameWon())return;
  gameState.index++;
  if(gameState.index===gameState.missions.length)gameState.phase="complete";
  else resetMission();
  renderNumberGame("heading");
}
function numberGameClick(event){
  const button=event.target.closest("[data-action]");if(!button||button.disabled)return;
  if(performance.now()<ignoreGameClickUntil&&gameElements.gameView.contains(button)){event.preventDefault();return;}
  const action=button.dataset.action;
  if(action==="open")openNumberGame(button.dataset.game);
  else if(action==="home")numberGamesHome();
  else if(action==="select")selectPiece(button.dataset.value);
  else if(action==="place")placePiece(button.dataset.target);
  else if(action==="plate")choosePlate(button.dataset.value);
  else if(action==="hint")helpNumberMission();
  else if(action==="next")nextNumberMission();
  else if(action==="again")openNumberGame(gameState.game,false);
  else if(action==="settings"){
    cleanGameScene();document.getElementById("trainRange").value=gameState.settings.trainMax;document.getElementById("snackRange").value=gameState.settings.snackMax;gameElements.grownupDialog.showModal();
  }else if(action==="close-settings")gameElements.grownupDialog.close();
}

// One shared set of pointer handlers; there are no per-piece listeners or timers.
function numberPointerDown(event){
  const source=event.target.closest("[data-draggable]");
  if(!source||source.disabled||!gameElements.playArea.contains(source)||event.button!==0||gameDrag)return;
  gameDrag={source,pointerId:event.pointerId,x:event.clientX,y:event.clientY,value:source.dataset.value,moved:false,ghost:null,session:gameState.session};
  source.setPointerCapture?.(event.pointerId);
}
function numberPointerMove(event){
  const drag=gameDrag;if(!drag||drag.pointerId!==event.pointerId)return;
  if(!drag.moved&&Math.hypot(event.clientX-drag.x,event.clientY-drag.y)<9)return;
  if(!drag.moved){
    drag.moved=true;drag.ghost=document.createElement('div');drag.ghost.className='drag-ghost';drag.ghost.setAttribute('aria-hidden','true');drag.ghost.inert=true;drag.ghost.innerHTML=drag.source.innerHTML;document.body.append(drag.ghost);
  }
  event.preventDefault();drag.ghost.style.transform=`translate(${event.clientX-38}px,${event.clientY-38}px)`;
}
function numberPointerUp(event){
  const drag=gameDrag;if(!drag||drag.pointerId!==event.pointerId)return;
  const target=drag.moved?document.elementFromPoint(event.clientX,event.clientY)?.closest('[data-action="place"]'):null;
  drag.dropTarget=target&&gameElements.playArea.contains(target)?target.dataset.target:null;
  // Keep the touch source mounted until touchend. Removing it in pointerup can
  // swallow the next tap's click in mobile Chrome.
  if(drag.moved&&event.pointerType==='touch'&&'ontouchend' in window){drag.ending=true;return;}
  finishNumberDrop(drag);
}
function finishNumberDrop(drag){
  const {moved,value,session,dropTarget}=drag;
  stopGameDrag();
  if(!moved||session!==gameState.session)return;
  ignoreGameClickUntil=performance.now()+350;
  gameState.selected=value;
  if(dropTarget)placePiece(dropTarget);
  else{gameState.message="Your piece is ready. Tap a place to put it down.";renderNumberGame();}
}
function numberTouchEnd(event){
  if(!gameDrag?.ending)return;
  event.preventDefault();finishNumberDrop(gameDrag);
}
document.addEventListener('click',numberGameClick);
document.addEventListener('pointerdown',numberPointerDown);
document.addEventListener('pointermove',numberPointerMove,{passive:false});
document.addEventListener('pointerup',numberPointerUp);
document.addEventListener('touchend',numberTouchEnd,{passive:false});
document.addEventListener('touchcancel',stopGameDrag);
document.addEventListener('pointercancel',stopGameDrag);
window.addEventListener('blur',stopGameDrag);
window.addEventListener('pagehide',cleanGameScene);
document.addEventListener('visibilitychange',()=>{if(document.hidden)cleanGameScene();});
gameElements.settingsForm.addEventListener('submit',event=>{
  event.preventDefault();
  const trainMax=Number(document.getElementById('trainRange').value),snackMax=Number(document.getElementById('snackRange').value);
  gameState.settings={trainMax:[10,20,50,100].includes(trainMax)?trainMax:10,snackMax:[5,10].includes(snackMax)?snackMax:5};
  gameElements.grownupDialog.close();updateStoryLinks();
  if(gameState.game)openNumberGame(gameState.game,false);
});
window.addEventListener('popstate',()=>{
  const key=location.hash.slice(1);if(gameLessons.games[key])openNumberGame(key,false);else numberGamesHome(false);
});
renderGameCards();updateStoryLinks();
if(gameLessons.games[location.hash.slice(1)])openNumberGame(location.hash.slice(1),false);

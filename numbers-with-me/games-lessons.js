"use strict";

window.NUMBER_GAMES = (() => {
  const games = {
    train: {name:"Number Train", subtitle:"Before · After · Between", invitation:"Help the train get going", finish:"Your train is ready to go!", notebook:"Draw three carriages. Write the two end numbers and leave the middle one for your child."},
    snacks: {name:"Snack Plates", subtitle:"More · Less · The same", invitation:"Is there enough to share?", finish:"You checked every plate!", notebook:"Draw two plates with dots for snacks. Ask which has more, fewer, or the same."},
    picnic: {name:"Teddy’s Picnic", subtitle:"Inside · Outside · Above · Below", invitation:"Find a place for Teddy’s things", finish:"Teddy’s picnic is ready!", notebook:"Draw a basket. Put one apple inside and one ball outside. Or try it with a real bowl and toys."},
    shapes: {name:"Shape Workshop", subtitle:"Five shapes to build with", invitation:"Make a little picture", finish:"Look at everything you made!", notebook:"Choose one picture you made. Draw its shapes together and name them."}
  };
  const shapeNames={circle:"Circle",triangle:"Triangle",rectangle:"Rectangle",square:"Square",oval:"Oval"};
  const shuffled = values => {
    const copy=values.slice();
    for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}
    return copy;
  };
  function numberOptions(answer,limit){
    const nearby=[answer-1,answer+1,answer-2,answer+2].filter(n=>n>=1&&n<=limit);
    return shuffled([answer,...new Set(nearby)].slice(0,3));
  }
  function trainMissions(limit){
    // Each question type draws from its own shuffled starts, so no exact task repeats.
    const starts=Array.from({length:limit-2},(_,i)=>i+1);
    const pools=[shuffled(starts),shuffled(starts),shuffled(starts)];
    return Array.from({length:10},(_,i)=>{
      const missing=[1,0,2][i%3],start=pools[missing].pop();
      const numbers=[start,start+1,start+2],answer=numbers[missing];
      const prompt=missing===1?`What goes between ${numbers[0]} and ${numbers[2]}?`:missing===0?`What comes before ${numbers[1]}?`:`What comes after ${numbers[1]}?`;
      return {numbers,missing,answer,prompt,options:numberOptions(answer,limit)};
    });
  }
  function snackMissions(limit){
    const pairs=[];
    for(let small=1;small<limit;small++)for(let big=small+1;big<=limit;big++)pairs.push([small,big]);
    const different=shuffled(pairs),equal=shuffled(Array.from({length:limit},(_,i)=>i+1));
    return Array.from({length:10},(_,i)=>{
      const goal=["more","fewer","same"][i%3];
      const count=goal==="same"?equal.pop():null;
      let [left,right]=goal==="same"?[count,count]:different.pop();
      if(Math.random()<.5)[left,right]=[right,left];
      const answer=left===right?"same":goal==="fewer"?(left<right?"left":"right"):(left>right?"left":"right");
      return {goal,left,right,answer,prompt:goal==="fewer"?"Which plate has fewer snacks?":"Which plate has more snacks?"};
    });
  }
  function picnicMissions(){
    const tasks=[
      ["inside","apple"],["outside","ball"],["below","ball"],["above","book"],
      ["inside","book"],["outside","apple"],["above","ball"],["below","book"],
      ["inside","ball"],["outside","book"]
    ];
    return tasks.map(([relation,item])=>{
      const basket=relation==="inside"||relation==="outside";
      const targets=basket?
        [{id:"inside",x:425,y:250,label:"Inside the basket"},{id:"outside",x:230,y:265,label:"Outside the basket"}]:
        [{id:"above",x:425,y:120,label:"Above the bench"},{id:"below",x:425,y:280,label:"Below the bench"}];
      return {relation,item,prompt:`Put the ${item} ${relation} the ${basket?'basket':'bench'}.`,targets};
    });
  }
  function shapeMissions(){
    const tasks=[
      {answer:"circle",object:"wheel",prompt:"Find a wheel for the little car.",hint:"Find the round circle for this wheel.",explain:"A circle is round. Your car has two wheels!",x:390,y:255,rotation:0},
      {answer:"triangle",object:"roof",prompt:"Give this house a roof.",hint:"Look for three straight sides.",explain:"Three sides make a triangle. The roof is ready!",x:300,y:115,size:260,rotation:0},
      {answer:"rectangle",object:"door",prompt:"Find the long piece for the door.",hint:"This door is taller than it is wide. Find the long rectangle.",explain:"This rectangle makes a tall door!",x:300,y:250,size:130,rotation:90},
      {answer:"square",object:"window",prompt:"Fit a piece into this window.",hint:"Look for four equal sides and four square corners.",explain:"Four equal sides, four square corners. Your square window is ready!",x:300,y:185,rotation:0},
      {answer:"oval",object:"balloon",prompt:"Find a piece for this long balloon.",hint:"Look for a curved shape that is longer in one direction.",explain:"An oval makes this lovely long balloon!",x:300,y:155,rotation:-20},
      {answer:"circle",object:"button",prompt:"Find a round button for Teddy’s shirt.",hint:"A circle is round, with no corners.",explain:"A circle makes a round button!",x:300,y:220,size:100,rotation:0},
      {answer:"triangle",object:"flag",prompt:"Finish the row of party flags.",hint:"Find the piece with three straight sides.",explain:"Three sides, three corners. Your triangle flag is ready!",x:300,y:150,size:150,rotation:0},
      {answer:"rectangle",object:"mat",prompt:"Put a long mat by the door.",hint:"Find the rectangle with two long sides and two short sides.",explain:"A rectangle makes a long welcome mat!",x:300,y:275,size:160,rotation:0},
      {answer:"square",object:"tile",prompt:"Find the missing square tile.",hint:"Find four equal sides and four square corners.",explain:"Your square tile fits! Four equal sides and four square corners.",x:360,y:210,size:160,rotation:0},
      {answer:"oval",object:"mirror",prompt:"Find the long round piece for the mirror.",hint:"Find the oval. It is curved and longer in one direction.",explain:"An oval makes a lovely mirror!",x:300,y:165,size:180,rotation:90}
    ];
    return tasks.map(task=>({...task,options:shuffled([task.answer,...shuffled(Object.keys(shapeNames).filter(s=>s!==task.answer)).slice(0,2)])}));
  }
  function missions(game,settings){
    if(game==="train")return trainMissions(settings.trainMax);
    if(game==="snacks")return snackMissions(settings.snackMax);
    if(game==="picnic")return picnicMissions();
    return shapeMissions();
  }
  return {games,shapeNames,shuffled,missions};
})();

"use strict";

// Small, local SVG illustrations. No image downloads, fonts, sprites or canvas loop.
window.NUMBER_GAME_ART = (() => {
  const svg=(content,viewBox="0 0 100 100",extra="")=>`<svg viewBox="${viewBox}" fill="none" aria-hidden="true" focusable="false" ${extra}>${content}</svg>`;
  const apple=`<path d="M51 30c-5-14 5-23 14-22-1 11-6 18-14 22" fill="#5f9e62"/><path d="M50 30c-23-15-42 8-32 32 9 26 20 27 32 20 12 7 23 6 32-20 10-24-9-47-32-32" fill="#e66c56"/><path d="M31 42c-7 6-8 15-5 22" stroke="#ffb4a5" stroke-width="5" stroke-linecap="round"/><path d="M50 30V18" stroke="#735348" stroke-width="5" stroke-linecap="round"/>`;
  const ball=`<circle cx="50" cy="52" r="36" fill="#e8ad48"/><path d="M22 30c27 4 41 23 40 54M20 77c12-27 34-41 62-40" stroke="#fff1c7" stroke-width="7"/><circle cx="50" cy="52" r="36" stroke="#bc873a" stroke-width="3"/>`;
  const book=`<path d="M17 22c13-7 24-6 33 0 9-6 20-7 33 0v59c-13-7-24-6-33 0-9-6-20-7-33 0z" fill="#56a6b7" stroke="#307889" stroke-width="4"/><path d="M23 28c11-4 17-3 27 2 10-5 16-6 27-2v42c-11-4-17-3-27 2-10-5-16-6-27-2z" fill="#fff7de"/><path d="M50 30v42" stroke="#d5c7a1" stroke-width="3"/>`;
  function item(type){return svg(type==="ball"?ball:type==="book"?book:apple);}
  function shapeBody(type,fill,stroke,dash=""){
    const style=`fill="${fill}" stroke="${stroke}" stroke-width="3" stroke-linejoin="round" ${dash}`;
    if(type==="circle")return `<circle cx="50" cy="50" r="30" ${style}/>`;
    if(type==="oval")return `<ellipse cx="50" cy="50" rx="37" ry="22" ${style}/>`;
    if(type==="triangle")return `<path d="m50 14 38 66H12z" ${style}/>`;
    if(type==="square")return `<rect x="25" y="25" width="50" height="50" rx="1" ${style}/>`;
    return `<rect x="12" y="29" width="76" height="42" rx="1" ${style}/>`;
  }
  const shape=(type)=>svg(shapeBody(type,"#f5c365","#b88b43"));
  function bear(x=0,y=0,scale=1,wave=false){return `<g transform="translate(${x} ${y}) scale(${scale})"><circle cx="40" cy="30" r="21" fill="#aa7854"/><circle cx="119" cy="30" r="21" fill="#aa7854"/><ellipse cx="80" cy="133" rx="51" ry="54" fill="#b7865e"/><ellipse cx="80" cy="142" rx="32" ry="36" fill="#e6c69d"/><ellipse cx="43" cy="175" rx="27" ry="18" fill="#a57352"/><ellipse cx="117" cy="175" rx="27" ry="18" fill="#a57352"/><ellipse cx="32" cy="120" rx="17" ry="34" fill="#aa7854" transform="rotate(25 32 120)"/><g class="${wave?'bear-wave':''}"><ellipse cx="133" cy="105" rx="17" ry="34" fill="#aa7854" transform="rotate(-40 133 105)"/></g><circle cx="80" cy="63" r="51" fill="#c7976d"/><ellipse cx="80" cy="81" rx="27" ry="23" fill="#efd3aa"/><circle cx="59" cy="57" r="4.5" fill="#433d3c"/><circle cx="101" cy="57" r="4.5" fill="#433d3c"/><ellipse cx="80" cy="74" rx="8" ry="6" fill="#433d3c"/><path d="M80 79v8m-12-1q12 12 24 0" stroke="#725248" stroke-width="3" stroke-linecap="round"/><path d="m49 113 31 15 31-15-5 25-26-8-26 8z" fill="#d96957"/></g>`;}
  const engine=()=>svg(`<path d="M15 80h130v25H15z" fill="#337c91"/><path d="M48 38h87v48H48z" fill="#52a9b4"/><path d="M87 15h48v70H87z" fill="#e6ad4e"/><path d="M82 12h58v10H82z" fill="#d28e35"/><rect x="98" y="30" width="26" height="27" rx="5" fill="#fff5d5"/><path d="M50 34h20v-9H50z" fill="#337c91"/><path d="M17 80 3 108h28z" fill="#e1785e"/><circle cx="52" cy="108" r="17" fill="#35576a"/><circle cx="116" cy="108" r="17" fill="#35576a"/><circle cx="52" cy="108" r="7" fill="#e3edf0"/><circle cx="116" cy="108" r="7" fill="#e3edf0"/><circle cx="57" cy="15" r="9" fill="#cddfe3"/><circle cx="40" cy="7" r="6" fill="#e1e9e7"/>`,`0 0 150 130`);
  function picnicScene(bench,success,insideItem=null){
    const background=`<rect width="600" height="360" rx="28" fill="#edf7f1"/><circle cx="535" cy="47" r="23" fill="#f4d781"/><path d="M0 265Q150 215 300 255t300 0v105H0z" fill="#dcebd0"/><path d="M0 305q180-46 330 0t270-9v64H0" fill="#c6dfb7"/><ellipse cx="250" cy="290" rx="80" ry="22" fill="#91b9bf" opacity=".35"/>`;
    const basket=`<path d="M350 230q0-99 75-99t75 99" stroke="#ae784c" stroke-width="13"/><path d="m343 230 20 78h124l20-78z" fill="#c9945b" stroke="#a67547" stroke-width="4"/><path d="M352 252h146m-137 22h129M375 235l8 68m42-68v68m50-68-8 68" stroke="#e6b781" stroke-width="6"/><rect x="338" y="221" width="175" height="18" rx="8" fill="#a77549"/>`;
    const seat=`<path d="M344 215v102m162-102v102" stroke="#a47758" stroke-width="17" stroke-linecap="round"/><rect x="325" y="190" width="200" height="29" rx="10" fill="#d4a06d"/><path d="M341 200h167" stroke="#edc493" stroke-width="4" stroke-linecap="round"/>`;
    // Inside objects are painted behind the front weave, so they read as inside.
    const inside=insideItem?`<g data-inside-item transform="translate(385 185) scale(.8)">${insideItem==="book"?book:insideItem==="ball"?ball:apple}</g>`:"";
    const basketWithItem=basket.replace('<path d="m343 230',inside+'<path data-basket-front d="m343 230');
    return svg(background+bear(35,132,.82,success)+(bench?seat:basketWithItem),"0 0 600 360");
  }
  function shapeScene(task,filled){
    let drawing=`<rect width="600" height="360" rx="28" fill="#fff4dd"/><rect x="55" y="17" width="490" height="315" rx="18" fill="#fffdf6" stroke="#ecddbb" stroke-width="2"/><path d="M83 303h433" stroke="#d8d4b2" stroke-width="3"/>`;
    if(task.object==="wheel")drawing+=`<path d="m158 185 41-58h144l48 58" fill="#9cc7d4" stroke="#4f899d" stroke-width="5"/><path d="M126 184h307q25 0 25 25v39H105v-42q0-22 21-22" fill="#e48b68"/><path d="M212 140h47v40h-75zM275 140h57l30 40h-87z" fill="#e7f4f0"/><circle cx="176" cy="255" r="33" fill="#557286"/><circle cx="176" cy="255" r="13" fill="#d4e0dc"/>`;
    else if(task.object==="balloon")drawing+=`<path d="M300 180q-32 37 0 68t-7 56" stroke="#a59489" stroke-width="4"/><path d="m293 175 14 1-4 14z" fill="#da9169"/><circle cx="120" cy="250" r="18" fill="#f6de9a"/><path d="m459 69 8 15 16 3-12 11 1 16-14-8-15 6 3-16-11-12 17-1z" fill="#c4d8c1"/>`;
    else if(task.object==="button")drawing+=`<path d="m224 100-62 49 40 65 30-18v105h136V196l30 18 40-65-62-49-33 25h-46z" fill="#8ebfc5" stroke="#508b97" stroke-width="4"/><path d="m267 101 33 24 33-24" stroke="#508b97" stroke-width="4"/>`;
    else if(task.object==="flag")drawing+=`<path d="M115 100h370" stroke="#9a8c70" stroke-width="5"/><path d="m125 170 40-70 40 70z" fill="#83b6b9"/><path d="m395 170 40-70 40 70z" fill="#df9177"/>`;
    else if(task.object==="mat")drawing+=`<rect x="230" y="60" width="140" height="165" rx="4" fill="#81afb8" stroke="#598b97" stroke-width="4"/><circle cx="345" cy="145" r="6" fill="#f3cb72"/><path d="M195 226h210" stroke="#b8a286" stroke-width="8"/>`;
    else if(task.object==="tile")drawing+=`<rect x="195" y="75" width="210" height="180" rx="8" fill="#e9dfbf"/><rect x="200" y="90" width="80" height="80" fill="#85b5b7"/><rect x="320" y="90" width="80" height="80" fill="#df9c7f"/><rect x="200" y="170" width="80" height="80" fill="#df9c7f"/>`;
    else if(task.object==="mirror")drawing+=`<path d="M300 240v45m-55 12h110" stroke="#b39265" stroke-width="12" stroke-linecap="round"/><ellipse cx="300" cy="165" rx="55" ry="82" fill="#e0c397" stroke="#b39265" stroke-width="5"/>`;
    else {
      const roofMission=task.object==="roof";
      drawing+=`<rect x="${roofMission?205:180}" y="${roofMission?193:150}" width="${roofMission?190:240}" height="${roofMission?107:150}" rx="3" fill="#ecd5a1"/>`;
      if(!roofMission)drawing+=`<path d="m151 155 149-99 149 99z" fill="#d67b66"/>`;
      if(task.object!=="door")drawing+=`<rect x="${roofMission?280:222}" y="243" width="38" height="57" rx="3" fill="#80adb7"/><circle cx="${roofMission?309:251}" cy="272" r="3" fill="#fff3c9"/>`;
      if(task.object==="door")drawing+=`<rect x="211" y="182" width="39" height="39" rx="2" fill="#8eb8be"/><rect x="350" y="182" width="39" height="39" rx="2" fill="#8eb8be"/>`;
    }
    const size=task.size||112,scale=size/100;
    drawing+=`<g transform="translate(${task.x-size/2} ${task.y-size/2}) scale(${scale})"><g transform="rotate(${task.rotation} 50 50)"><g class="${filled?'piece-arrive':''}">${shapeBody(task.answer,filled?"#edb24e":"#f1f0e9",filled?"#bb873e":"#a8b8b9",filled?"":'stroke-dasharray="5 4"')}</g></g></g>`;
    return svg(drawing,"0 0 600 360");
  }
  function preview(game){
    if(game==="train")return svg(`<path d="M5 135h270" stroke="#bbd5d6" stroke-width="5"/><g transform="translate(8 17) scale(.85)">${engine().replace(/<svg[^>]*>|<\/svg>/g,"")}</g><rect x="145" y="64" width="56" height="53" rx="9" fill="#e6ad4e"/><rect x="215" y="64" width="56" height="53" rx="9" fill="#dc8d75"/><path d="M132 112h14m56 0h13" stroke="#537e89" stroke-width="5"/><circle cx="157" cy="122" r="10" fill="#507184"/><circle cx="187" cy="122" r="10" fill="#507184"/><circle cx="227" cy="122" r="10" fill="#507184"/><circle cx="257" cy="122" r="10" fill="#507184"/><text x="173" y="101" text-anchor="middle" fill="#fff" font-size="33" font-family="system-ui" font-weight="800">7</text><text x="243" y="101" text-anchor="middle" fill="#fff" font-size="33" font-family="system-ui" font-weight="800">8</text>`,"0 0 285 160");
    if(game==="snacks")return svg(`<ellipse cx="91" cy="92" rx="67" ry="47" fill="#fff8e8" stroke="#cfb995" stroke-width="4"/><ellipse cx="207" cy="92" rx="62" ry="47" fill="#fff8e8" stroke="#cfb995" stroke-width="4"/><g transform="translate(56 50) scale(.52)">${apple}</g><g transform="translate(167 38) scale(.4)">${apple}</g><g transform="translate(200 62) scale(.4)">${apple}</g><g transform="translate(164 79) scale(.4)">${apple}</g>`,"0 0 285 160");
    if(game==="picnic")return svg(bear(45,8,.77)+`<path d="M171 98q0-54 37-54t37 54" stroke="#a77549" stroke-width="8"/><path d="m164 89 10 48h67l10-48z" fill="#c9945b"/><path d="M169 105h78m-72 17h66" stroke="#e8bf8b" stroke-width="4"/><g transform="translate(184 67) scale(.46)">${apple}</g>`,"0 0 285 160");
    return svg(`<g transform="translate(16 22) scale(1.1)">${shapeBody('triangle','#da8774','#b56557')}</g><g transform="translate(150 21) scale(.85)">${shapeBody('square','#6da9b0','#51848e')}</g><g transform="translate(98 74) scale(.85)">${shapeBody('circle','#e4b251','#b58d43')}</g>`,"0 0 285 160");
  }
  return {svg,item,shape,engine,picnicScene,shapeScene,preview};
})();

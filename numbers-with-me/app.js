"use strict";

const $ = (id) => document.getElementById(id);
const state = { index: 0, stage: 0, timer: null, busy: false };
const list = () => window.NUMBER_LESSONS[$("range").value][$("operation").value];
const adding = () => $("operation").value === "add";
const svgNS = "http://www.w3.org/2000/svg";

// Emoji pictures sit in SVG slots. One picture represents one countable item.
function svg(tag, attributes, parent) {
  const node = document.createElementNS(svgNS, tag);
  for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, value);
  parent.append(node);
  return node;
}

function object(parent, theme, x, y) {
  const face = svg("text", { x, y: y + 19, "text-anchor": "middle", "font-size": 54,
    "font-family": '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif' }, parent);
  face.textContent = window.NUMBER_THEMES[theme].icon;
}

function renderScene(theme, start, change) {
  const art = $("sceneArt");
  art.replaceChildren();
  const changed = state.stage > 0;
  const total = adding() && changed ? start + change : start;
  const end = adding() ? start + change : start - change;
  $("sceneTitle").textContent = window.NUMBER_THEMES[theme].title;
  $("sceneDescription").textContent = !changed ? `${start} ${window.NUMBER_THEMES[theme].noun}.` : `${start} to start. ${change} ${adding() ? "join" : "leave"}. ${state.stage === 3 ? `${end} remain.` : "Count the group now."}`;
  // A plain counting space: two rows of five, with no scene to interpret.
  for (let i = 0; i < total; i++) {
    const x = 120 + (i % 5) * 90;
    const y = 105 + Math.floor(i / 5) * 80;
    const isLeaving = !adding() && changed && i >= end;
    const isJoining = adding() && changed && i >= start;
    if (isLeaving) {
      // A crossed-out notebook mark remains where each departing object was.
      svg("circle", { cx: x, cy: y, r: 22, fill: "none", stroke: "#dbe7f0", "stroke-width": 2 }, art);
      svg("path", { d: `M${x - 18} ${y + 19}l36 -38`, stroke: "#a16c49", "stroke-width": 3 }, art);
    }
    const wrapper = svg("g", { class: isLeaving ? "leaving" : isJoining && state.stage === 1 ? "joining" : "" }, art);
    if (isLeaving && state.stage > 1) wrapper.setAttribute("visibility", "hidden");
    object(wrapper, theme, x, y);
  }
}

function render() {
  const [key, start, change] = list()[state.index];
  const theme = window.NUMBER_THEMES[key];
  const end = adding() ? start + change : start - change;
  const sign = adding() ? "+" : "−";
  $("position").textContent = `Story ${state.index + 1} of ${list().length}`;
  $("concept").textContent = adding() ? "+ means add more" : "− means take away";
  $("storyTitle").textContent = theme.title;
  const noun = (count) => count === 1 ? theme.noun.slice(0, -1) : theme.noun;
  const action = adding() ? `Here ${change === 1 ? "comes" : "come"} ${change} more ${noun(change)}!` : `${change} ${noun(change)} ${change === 1 ? theme.leaveOne : theme.leaveMany}.`;
  const stories = [
    `${start} ${noun(start)} ${start === 1 ? "is" : "are"} ${theme.place}. Count them together.`,
    action,
    `${action} How many ${theme.noun} are ${theme.place} now?`,
    end === 0 ? "None left! We write 0 for none." : `${end} ${noun(end)} ${end === 1 ? "is" : "are"} ${theme.place} now.`
  ];
  $("storyText").textContent = stories[state.stage];
  const revealed = state.stage === 3;
  $("answerPanel").hidden = !revealed;
  $("answerPanel").classList.toggle("revealed", revealed);
  $("answerResult").hidden = !revealed;
  $("answerNumber").textContent = revealed ? end : "";
  $("answerLabel").textContent = revealed ? `${noun(end)} ${adding() ? "altogether" : "left"}${end === 0 ? " — none!" : ""}` : "";
  $("equation").textContent = revealed ? `${start} ${sign} ${change} = ${end}` : "";
  const notebook = [
    `Draw ${start} ${start === 1 ? "dot" : theme.mark}. One dot = one ${noun(1)}.`,
    adding() ? `Add ${change} more ${theme.mark} beside your first group.` : `Cross out ${change} of your ${theme.mark}.`,
    `Count ${adding() ? "all your dots" : "the dots without a cross"}. Write ${start} ${sign} ${change} = __.`,
    `${start} ${adding() ? "plus" : "minus"} ${change} equals ${end}. ${end === 0 ? "All dots are crossed out." : "Count your dots together."}`
  ];
  $("notebookText").textContent = notebook[state.stage];
  $("advance").textContent = ["Watch what happens →", "Watching…", "Show me the answer", state.index === list().length - 1 ? "Start these stories again ↻" : "Next story →"][state.stage];
  $("advance").disabled = state.busy;
  $("previous").disabled = state.index === 0;
  $("next").disabled = state.index === list().length - 1;
  renderScene(key, start, change);
}

function reset(index = state.index) {
  clearTimeout(state.timer);
  state.timer = null;
  state.busy = false;
  state.stage = 0;
  state.index = index;
  render();
}

function advanceLesson() {
  if (state.busy) return;
  if (state.stage === 3) return reset((state.index + 1) % list().length);
  state.stage++;
  if (state.stage === 1) {
    state.busy = true;
    state.timer = setTimeout(() => { state.busy = false; state.stage = 2; render(); }, matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1800);
  }
  render();
  if (state.stage === 3) {
    $("answerResult").focus({ preventScroll: true });
  }
}
$("advance").addEventListener("click", advanceLesson);
$("replay").addEventListener("click", () => reset());
$("previous").addEventListener("click", () => { if (state.index > 0) reset(state.index - 1); });
$("next").addEventListener("click", () => { if (state.index < list().length - 1) reset(state.index + 1); });
for (const id of ["operation", "range"]) $(id).addEventListener("change", () => reset(0));
$("helpButton").addEventListener("click", () => $("helpDialog").showModal());
reset(0);

"use strict";

const $ = (id) => document.getElementById(id);
const state = { index: 0, stage: 0, timer: null, busy: false };
const list = () => window.NUMBER_LESSONS[$("range").value][$("operation").value];
const adding = () => $("operation").value === "add";
const svgNS = "http://www.w3.org/2000/svg";

// All artwork is SVG. One illustrated object always represents one countable item.
function svg(tag, attributes, parent) {
  const node = document.createElementNS(svgNS, tag);
  for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, value);
  parent.append(node);
  return node;
}

function object(parent, theme, x, y, color) {
  const group = svg("g", { transform: `translate(${x} ${y})`, fill: "white", stroke: color, "stroke-width": 3, "stroke-linejoin": "round" }, parent);
  if (theme === "moon") {
    svg("circle", { r: 22, fill: "#eaf3ff" }, group);
    svg("rect", { x: -15, y: -9, width: 30, height: 17, rx: 7 }, group);
    svg("path", { d: "M-7 -1h1 M6 -1h1", "stroke-linecap": "round" }, group);
  } else if (theme === "robot") {
    svg("rect", { x: -22, y: -19, width: 44, height: 38, rx: 5, fill: "#eaf3ff" }, group);
    svg("path", { d: "M0 -19v-9 M-11 1v-4 M11 1v-4 M-9 10h18", fill: "none", "stroke-linecap": "round" }, group);
  } else {
    svg("rect", { x: -22, y: -19, width: 44, height: 38, rx: 2, fill: "#eaf3ff" }, group);
    svg("path", { d: "M-12 -9h24", fill: "none" }, group);
  }
}

function renderScene(theme, start, change) {
  const art = $("sceneArt");
  art.replaceChildren();
  const changed = state.stage > 0;
  const total = adding() && changed ? start + change : start;
  const end = adding() ? start + change : start - change;
  $("sceneTitle").textContent = window.NUMBER_THEMES[theme].title;
  $("sceneDescription").textContent = !changed ? `${start} ${window.NUMBER_THEMES[theme].noun}.` : `${start} to start. ${change} ${adding() ? "join" : "leave"}. ${state.stage === 3 ? `${end} remain.` : "Count the group now."}`;
  // Quiet scene frame; objects use two rows of five to make counting manageable.
  svg("rect", { x: 60, y: 45, width: 480, height: 190, rx: theme === "moon" ? 38 : 10, fill: "#f8fbff", stroke: "#dbe7f0", "stroke-width": 3 }, art);
  if (theme === "moon") {
    svg("path", { d: "M110 237v12h45v-12 M445 237v12h45v-12 M540 88h22v60h-22", fill: "none", stroke: "#a0b6ca", "stroke-width": 5 }, art);
  } else if (theme === "robot") {
    svg("path", { d: "M280 27h40 M300 17v20 M80 250h440", fill: "none", stroke: "#a0b6ca", "stroke-width": 4 }, art);
  } else {
    svg("path", { d: "M80 250h440 M80 260h440", fill: "none", stroke: "#a0b6ca", "stroke-width": 4 }, art);
  }
  for (let i = 0; i < total; i++) {
    const x = 120 + (i % 5) * 90;
    const y = 105 + Math.floor(i / 5) * 80;
    const isLeaving = !adding() && changed && i >= end;
    const isJoining = adding() && changed && i >= start;
    if (isLeaving) {
      // A crossed-out notebook mark remains where each departing object was.
      const outline = theme === "moon" ? { cx: x, cy: y, r: 22 } : { x: x - 21, y: y - 20, width: 42, height: 40, rx: 5 };
      svg(theme === "moon" ? "circle" : "rect", { ...outline, fill: "none", stroke: "#dbe7f0", "stroke-width": 2 }, art);
      svg("path", { d: `M${x - 18} ${y + 19}l36 -38`, stroke: "#a16c49", "stroke-width": 3 }, art);
    }
    const wrapper = svg("g", { class: isLeaving ? "leaving" : isJoining && state.stage === 1 ? "joining" : "" }, art);
    if (isLeaving && state.stage > 1) wrapper.setAttribute("visibility", "hidden");
    object(wrapper, theme, x, y, isJoining ? "#155dbb" : "#2678e9");
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
  const action = adding() ? `Here ${change === 1 ? "comes" : "come"} ${change} more ${noun(change)}!` : `${change} ${noun(change)} ${change === 1 ? "leaves" : "leave"} ${key === "bridge" ? "to build a bridge" : key === "robot" ? "to explore" : "at the moon stop"}.`;
  const stories = [
    `${start} ${noun(start)} ${start === 1 ? "is" : "are"} ${theme.place}. Count them together.`,
    action,
    `${action} How many ${theme.noun} are ${theme.place} now?`,
    end === 0 ? "None left! We write 0 for none." : `${end} ${noun(end)} ${end === 1 ? "is" : "are"} ${theme.place} now.`
  ];
  $("storyText").textContent = stories[state.stage];
  $("equation").textContent = state.stage === 0 ? `${start}` : `${start} ${sign} ${change} = ${state.stage === 3 ? end : "?"}`;
  const notebook = [
    `Draw ${start} ${theme.mark}. Each one stands for one ${theme.noun === "travellers" ? "traveller" : theme.noun.slice(0, -1)}.`,
    adding() ? `Add ${change} more ${theme.mark} beside your first group.` : `Cross out ${change} of your ${theme.mark}.`,
    `Count ${adding() ? "all your marks" : "only the marks without a cross"}. Write ${start} ${sign} ${change} = __ and fill in your answer.`,
    `Look at your marks together: ${start} ${adding() ? "plus" : "minus"} ${change} equals ${end}. ${end === 0 ? "All the marks are crossed out." : "Point to each one as you count."}`
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

$("advance").addEventListener("click", () => {
  if (state.busy) return;
  if (state.stage === 3) return reset((state.index + 1) % list().length);
  state.stage++;
  if (state.stage === 1) {
    state.busy = true;
    state.timer = setTimeout(() => { state.busy = false; state.stage = 2; render(); }, matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1800);
  }
  render();
});
$("replay").addEventListener("click", () => reset());
$("previous").addEventListener("click", () => { if (state.index > 0) reset(state.index - 1); });
$("next").addEventListener("click", () => { if (state.index < list().length - 1) reset(state.index + 1); });
for (const id of ["operation", "range"]) $(id).addEventListener("change", () => reset(0));
reset(0);

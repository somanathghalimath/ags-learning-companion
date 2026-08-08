"use strict";

const SVG_NS = "http://www.w3.org/2000/svg";

const SPEEDS = {
  verySlow: { pixelsPerSecond: 68, minimumDuration: 1800, maximumDuration: 7600, copyPause: 4200 },
  slow: { pixelsPerSecond: 88, minimumDuration: 1500, maximumDuration: 6200, copyPause: 3200 },
  steady: { pixelsPerSecond: 115, minimumDuration: 1200, maximumDuration: 5000, copyPause: 2400 }
};

const elements = {
  guideLayer: document.querySelector("#guideLayer"),
  strokeLayer: document.querySelector("#strokeLayer"),
  startDot: document.querySelector("#startDot"),
  pencilTip: document.querySelector("#pencilTip"),
  drawingHeading: document.querySelector("#drawing-heading"),
  drawingCount: document.querySelector("#drawingCount"),
  svgTitle: document.querySelector("#svgTitle"),
  statusBadge: document.querySelector("#statusBadge"),
  stepCount: document.querySelector("#stepCount"),
  stepDots: document.querySelector("#stepDots"),
  playButton: document.querySelector("#playButton"),
  pauseButton: document.querySelector("#pauseButton"),
  replayButton: document.querySelector("#replayButton"),
  previousButton: document.querySelector("#previousButton"),
  nextButton: document.querySelector("#nextButton"),
  speedSelect: document.querySelector("#speedSelect")
};

const state = {
  drawingIndex: 0,
  strokeIndex: 0,
  phase: "ready", // ready | drawing | copying | paused | complete
  phaseBeforePause: null,
  phaseStartedAt: 0,
  phaseElapsed: 0,
  animationFrame: null,
  strokeElements: [],
  strokeLengths: []
};

function getDrawing() {
  return window.DRAWINGS[state.drawingIndex];
}

function createPath(pathData) {
  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute("d", pathData);
  return path;
}

function renderDrawing() {
  stopAnimation();
  elements.guideLayer.replaceChildren();
  elements.strokeLayer.replaceChildren();
  state.strokeElements = [];
  state.strokeLengths = [];

  getDrawing().strokes.forEach((strokeData) => {
    const guidePath = createPath(strokeData.d);
    const animatedPath = createPath(strokeData.d);
    elements.guideLayer.append(guidePath);
    elements.strokeLayer.append(animatedPath);

    const length = animatedPath.getTotalLength();
    animatedPath.style.strokeDasharray = `${length} ${length}`;
    animatedPath.style.strokeDashoffset = `${length}`;
    animatedPath.style.opacity = "0";
    state.strokeElements.push(animatedPath);
    state.strokeLengths.push(length);
  });

  state.strokeIndex = 0;
  state.phase = "ready";
  state.phaseBeforePause = null;
  state.phaseElapsed = 0;
  hideStartDot();
  hidePencil();
  updateDrawingLabels();
  renderStepDots();
  setStatus("Get ready", "ready");
  updateControls();
}

function updateDrawingLabels() {
  const drawing = getDrawing();
  elements.drawingHeading.textContent = drawing.name;
  elements.drawingCount.textContent = `Drawing ${state.drawingIndex + 1} of ${window.DRAWINGS.length}`;
  elements.svgTitle.textContent = `How to draw a ${drawing.name.toLowerCase()}`;
  updateStepCount();
}

function updateStepCount() {
  const total = getDrawing().strokes.length;
  const visibleStep = state.phase === "complete" ? total : state.strokeIndex + 1;
  elements.stepCount.textContent = `Line ${visibleStep} of ${total}`;
}

function renderStepDots() {
  elements.stepDots.replaceChildren();
  getDrawing().strokes.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = "step-dot";
    dot.dataset.index = index;
    elements.stepDots.append(dot);
  });
  updateStepDots();
}

function updateStepDots() {
  [...elements.stepDots.children].forEach((dot, index) => {
    dot.classList.toggle("complete", index < state.strokeIndex || state.phase === "complete");
    dot.classList.toggle("current", index === state.strokeIndex && state.phase !== "complete");
  });
}

function setStatus(label, modifier) {
  elements.statusBadge.textContent = label;
  elements.statusBadge.className = `status-badge ${modifier}`;
}

function updateControls() {
  const isActive = state.phase === "drawing" || state.phase === "copying";
  elements.playButton.disabled = isActive || state.phase === "complete";
  elements.pauseButton.disabled = !isActive;
  elements.previousButton.disabled = state.drawingIndex === 0;
  elements.nextButton.disabled = state.drawingIndex === window.DRAWINGS.length - 1;
}

function getStrokeDuration() {
  const speed = SPEEDS[elements.speedSelect.value];
  const naturalDuration = state.strokeLengths[state.strokeIndex] / speed.pixelsPerSecond * 1000;
  return Math.max(speed.minimumDuration, Math.min(naturalDuration, speed.maximumDuration));
}

function showStartDot(path) {
  const start = path.getPointAtLength(0);
  elements.startDot.setAttribute("cx", start.x);
  elements.startDot.setAttribute("cy", start.y);
  elements.startDot.classList.add("visible");
}

function hideStartDot() {
  elements.startDot.classList.remove("visible");
}

function positionPencil(path, distance) {
  const pathLength = path.getTotalLength();
  const clampedDistance = Math.max(0, Math.min(distance, pathLength));
  const point = path.getPointAtLength(clampedDistance);
  const before = path.getPointAtLength(Math.max(0, clampedDistance - 2));
  const after = path.getPointAtLength(Math.min(pathLength, clampedDistance + 2));
  const angle = Math.atan2(after.y - before.y, after.x - before.x) * 180 / Math.PI;
  elements.pencilTip.setAttribute("transform", `translate(${point.x} ${point.y}) rotate(${angle})`);
  elements.pencilTip.classList.add("visible");
}

function hidePencil() {
  elements.pencilTip.classList.remove("visible");
}

function startCurrentStroke() {
  const path = state.strokeElements[state.strokeIndex];
  const length = state.strokeLengths[state.strokeIndex];
  path.style.strokeDasharray = `${length} ${length}`;
  path.style.strokeDashoffset = `${length}`;
  path.style.opacity = "1";
  state.phase = "drawing";
  state.phaseElapsed = 0;
  state.phaseStartedAt = performance.now();
  showStartDot(path);
  positionPencil(path, 0);
  setStatus("Watch", "watch");
  updateStepCount();
  updateStepDots();
  updateControls();
  requestTick();
}

function requestTick() {
  if (state.animationFrame === null) {
    state.animationFrame = requestAnimationFrame(tick);
  }
}

function tick(now) {
  state.animationFrame = null;
  if (state.phase === "drawing") updateDrawing(now);
  if (state.phase === "copying") updateCopyPause(now);
  if (state.phase === "drawing" || state.phase === "copying") requestTick();
}

function updateDrawing(now) {
  const elapsed = state.phaseElapsed + now - state.phaseStartedAt;
  const duration = getStrokeDuration();
  const progress = Math.min(elapsed / duration, 1);
  const path = state.strokeElements[state.strokeIndex];
  const length = state.strokeLengths[state.strokeIndex];
  path.style.strokeDashoffset = `${length * (1 - progress)}`;
  positionPencil(path, length * progress);
  if (progress > 0.04) hideStartDot();

  if (progress >= 1) {
    path.style.strokeDashoffset = "0";
    path.style.strokeDasharray = "none";
    hideStartDot();
    hidePencil();

    const isLastStroke = state.strokeIndex === getDrawing().strokes.length - 1;
    if (isLastStroke) {
      state.phase = "complete";
      setStatus("All done!", "done");
      updateStepDots();
      updateControls();
    } else {
      state.phase = "copying";
      state.phaseStartedAt = performance.now();
      state.phaseElapsed = 0;
      setStatus("Draw it", "copy");
      updateControls();
    }
  }
}

function updateCopyPause(now) {
  const elapsed = state.phaseElapsed + now - state.phaseStartedAt;
  if (elapsed >= SPEEDS[elements.speedSelect.value].copyPause) {
    state.strokeIndex += 1;
    startCurrentStroke();
  }
}

function stopAnimation() {
  if (state.animationFrame !== null) {
    cancelAnimationFrame(state.animationFrame);
    state.animationFrame = null;
  }
}

function pause() {
  if (state.phase !== "drawing" && state.phase !== "copying") return;
  state.phaseElapsed += performance.now() - state.phaseStartedAt;
  state.phaseBeforePause = state.phase;
  state.phase = "paused";
  stopAnimation();
  hideStartDot();
  hidePencil();
  setStatus("Paused", "paused");
  updateControls();
}

function play() {
  if (state.phase === "paused") {
    state.phase = state.phaseBeforePause;
    state.phaseStartedAt = performance.now();
    if (state.phase === "drawing") {
      const path = state.strokeElements[state.strokeIndex];
      const length = state.strokeLengths[state.strokeIndex];
      const offset = Number.parseFloat(path.style.strokeDashoffset);
      showStartDot(path);
      positionPencil(path, length - offset);
      setStatus("Watch", "watch");
    } else {
      setStatus("Draw it", "copy");
    }
    updateControls();
    requestTick();
    return;
  }

  if (state.phase === "complete") resetStrokes();
  startCurrentStroke();
}

function resetStrokes() {
  stopAnimation();
  state.strokeIndex = 0;
  state.phaseElapsed = 0;
  state.phaseBeforePause = null;
  state.strokeElements.forEach((path, index) => {
    path.style.strokeDasharray = `${state.strokeLengths[index]} ${state.strokeLengths[index]}`;
    path.style.strokeDashoffset = `${state.strokeLengths[index]}`;
    path.style.opacity = "0";
  });
  hideStartDot();
  hidePencil();
  updateStepCount();
  updateStepDots();
}

function replay() {
  resetStrokes();
  state.phase = "ready";
  setStatus("Get ready", "ready");
  updateControls();
  startCurrentStroke();
}

function changeDrawing(direction) {
  const nextIndex = state.drawingIndex + direction;
  if (nextIndex < 0 || nextIndex >= window.DRAWINGS.length) return;
  state.drawingIndex = nextIndex;
  renderDrawing();
  startCurrentStroke();
}

elements.playButton.addEventListener("click", play);
elements.pauseButton.addEventListener("click", pause);
elements.replayButton.addEventListener("click", replay);
elements.previousButton.addEventListener("click", () => changeDrawing(-1));
elements.nextButton.addEventListener("click", () => changeDrawing(1));

elements.speedSelect.addEventListener("change", () => {
  if (state.phase === "drawing" || state.phase === "copying") {
    state.phaseElapsed += performance.now() - state.phaseStartedAt;
    state.phaseStartedAt = performance.now();
  }
});

renderDrawing();
startCurrentStroke();

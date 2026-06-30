"use strict";

const SVG_NS = "http://www.w3.org/2000/svg";
const ACTIVE_SET_KEY = "uppercase";
const ACTIVE_SET = window.LETTER_LIBRARY[ACTIVE_SET_KEY];
const LETTERS = ACTIVE_SET.characters;
const NEXT_STROKE_DELAY = 500;

const SPEEDS = {
  slow: { drawDuration: 1900 },
  normal: { drawDuration: 1250 },
  fast: { drawDuration: 800 }
};

const elements = {
  guideLayer: document.querySelector("#guideLayer"),
  strokeLayer: document.querySelector("#strokeLayer"),
  startDot: document.querySelector("#startDot"),
  pencilTip: document.querySelector("#pencilTip"),
  letterHeading: document.querySelector("#letter-heading"),
  letterCount: document.querySelector("#letterCount"),
  svgTitle: document.querySelector("#svgTitle"),
  playButton: document.querySelector("#playButton"),
  pauseButton: document.querySelector("#pauseButton"),
  replayButton: document.querySelector("#replayButton"),
  previousButton: document.querySelector("#previousButton"),
  nextButton: document.querySelector("#nextButton"),
  speedSelect: document.querySelector("#speedSelect")
};

const state = {
  letterIndex: 0,
  strokeIndex: 0,
  phase: "ready", // ready | drawing | preparing | paused | complete
  phaseBeforePause: null,
  phaseStartedAt: 0,
  phaseElapsed: 0,
  animationFrame: null,
  strokeElements: [],
  strokeLengths: []
};

function createPath(pathData, className) {
  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute("d", pathData);
  if (className) path.setAttribute("class", className);
  return path;
}

function renderLetter() {
  stopAnimation();

  const letter = LETTERS[state.letterIndex];
  elements.guideLayer.replaceChildren();
  elements.strokeLayer.replaceChildren();
  state.strokeElements = [];
  state.strokeLengths = [];

  letter.strokes.forEach((stroke) => {
    elements.guideLayer.append(createPath(stroke.d));

    const animatedPath = createPath(stroke.d);
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
  state.phaseElapsed = 0;
  hideStartDot();
  hidePencil();
  updateLetterLabels();
  updateControls();
}

function updateLetterLabels() {
  const letter = LETTERS[state.letterIndex];
  elements.letterHeading.textContent = `${ACTIVE_SET.label} ${letter.name}`;
  elements.letterCount.textContent = `${ACTIVE_SET.itemLabel} ${state.letterIndex + 1} of ${LETTERS.length}`;
  elements.svgTitle.textContent = `How to write ${ACTIVE_SET.label.toLowerCase()} ${letter.name}`;
}

function updateControls() {
  const isPlaying = state.phase === "drawing" || state.phase === "preparing";
  elements.playButton.disabled = isPlaying || state.phase === "complete";
  elements.pauseButton.disabled = !isPlaying;
  elements.previousButton.disabled = state.letterIndex === 0;
  elements.nextButton.disabled = state.letterIndex === LETTERS.length - 1;
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
  const pointBefore = path.getPointAtLength(Math.max(0, clampedDistance - 2));
  const pointAfter = path.getPointAtLength(Math.min(pathLength, clampedDistance + 2));
  const angle = Math.atan2(pointAfter.y - pointBefore.y, pointAfter.x - pointBefore.x) * 180 / Math.PI;

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
  path.style.opacity = "1";
  state.phase = "drawing";
  state.phaseElapsed = 0;
  state.phaseStartedAt = performance.now();
  showStartDot(path);
  positionPencil(path, 0);
  updateControls();
  requestTick();
}

function tick(now) {
  state.animationFrame = null;

  if (state.phase === "drawing") {
    updateDrawing(now);
  } else if (state.phase === "preparing") {
    updatePreparing(now);
  }

  if (state.phase === "drawing" || state.phase === "preparing") {
    requestTick();
  }
}

function updateDrawing(now) {
  const settings = SPEEDS[elements.speedSelect.value];
  const elapsed = state.phaseElapsed + (now - state.phaseStartedAt);
  const progress = Math.min(elapsed / settings.drawDuration, 1);
  const easedProgress = 1 - Math.pow(1 - progress, 2);
  const length = state.strokeLengths[state.strokeIndex];
  const path = state.strokeElements[state.strokeIndex];
  state.strokeElements[state.strokeIndex].style.strokeDashoffset = `${length * (1 - easedProgress)}`;
  positionPencil(path, length * easedProgress);
  if (progress > 0.04) hideStartDot();

  if (progress >= 1) {
    const completedPath = state.strokeElements[state.strokeIndex];
    completedPath.style.strokeDashoffset = "0";
    // Remove the animation mask so the completed stroke is always fully solid.
    completedPath.style.strokeDasharray = "none";
    hideStartDot();
    hidePencil();
    const isLastStroke = state.strokeIndex === LETTERS[state.letterIndex].strokes.length - 1;
    if (isLastStroke) {
      state.phase = "complete";
      updateControls();
    } else {
      state.strokeIndex += 1;
      prepareNextStroke();
    }
  }
}

function prepareNextStroke() {
  state.phase = "preparing";
  state.phaseStartedAt = performance.now();
  state.phaseElapsed = 0;
  updateControls();
  requestTick();
}

function updatePreparing(now) {
  const elapsed = state.phaseElapsed + (now - state.phaseStartedAt);
  if (elapsed >= NEXT_STROKE_DELAY) startCurrentStroke();
}

function requestTick() {
  if (state.animationFrame === null) {
    state.animationFrame = requestAnimationFrame(tick);
  }
}

function stopAnimation() {
  if (state.animationFrame !== null) {
    cancelAnimationFrame(state.animationFrame);
    state.animationFrame = null;
  }
}

function pause() {
  if (state.phase !== "drawing" && state.phase !== "preparing") return;

  state.phaseElapsed += performance.now() - state.phaseStartedAt;
  state.phaseBeforePause = state.phase;
  state.phase = "paused";
  stopAnimation();
  hideStartDot();
  hidePencil();
  updateControls();
}

function play() {
  if (state.phase === "paused") {
    state.phase = state.phaseBeforePause;
    state.phaseStartedAt = performance.now();
    if (state.phase === "drawing") {
      showStartDot(state.strokeElements[state.strokeIndex]);
      const length = state.strokeLengths[state.strokeIndex];
      const offset = Number.parseFloat(state.strokeElements[state.strokeIndex].style.strokeDashoffset);
      positionPencil(state.strokeElements[state.strokeIndex], length - offset);
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
}

function replay() {
  resetStrokes();
  state.phase = "ready";
  updateControls();
  startCurrentStroke();
}

function changeLetter(direction) {
  const nextIndex = state.letterIndex + direction;
  if (nextIndex < 0 || nextIndex >= LETTERS.length) return;
  state.letterIndex = nextIndex;
  renderLetter();
  startCurrentStroke();
}

elements.playButton.addEventListener("click", play);
elements.pauseButton.addEventListener("click", pause);
elements.replayButton.addEventListener("click", replay);
elements.previousButton.addEventListener("click", () => changeLetter(-1));
elements.nextButton.addEventListener("click", () => changeLetter(1));

elements.speedSelect.addEventListener("change", () => {
  // Restart the current phase's clock so a speed change is applied predictably.
  if (state.phase === "drawing") {
    state.phaseElapsed += performance.now() - state.phaseStartedAt;
    state.phaseStartedAt = performance.now();
  }
});

renderLetter();
startCurrentStroke();

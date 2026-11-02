# Numbers With Me

A standalone HTML/CSS/JavaScript numeracy playground for a five-year-old.
Serve the repository with a static server and open `numbers-with-me/` (or open
`index.html` directly). The homepage has four illustrated game cards:

| Game | Goal | Child's interaction |
| --- | --- | --- |
| Number Train | Missing numbers; between, before and after | Choose a numbered carriage, then tap its empty place, or drag it there. Ten rounds per visit. |
| Snack Plates | More, fewer and equal quantities | Tap a plate or “The same”. A correct choice succeeds immediately; other choices can be retried. Ten rounds. |
| Teddy's Picnic | Inside, outside, below and above | Pick up an apple, ball or book and place it in the scene. Ten rounds. The inside apple sits behind the basket's front. |
| Shape Workshop | Circle, triangle, rectangle, square and oval | Fit pieces into a car, house and balloon. Ten rounds across ten pictures, including an upright square window and a rotated rectangle. |

Each game has ten rounds. Train questions do not repeat the same sequence and
blank position within a session. Snack Plates varies quantities and includes
three equal-quantity rounds. Picnic uses ten different object/position tasks.
Shape Workshop uses each of the five shapes twice across ten pictures; both
square tasks stay upright.

There are no timers, scores or automatic next rounds in the new games. Help
provides a count sequence, shape clue or highlighted destination. A retry gives
something to look at or count. Each short session ends with replay, game choice
and an optional real-world/notebook activity. Read the mission together: these
games do not add speech synthesis.

“Grown-ups” holds the number ranges: Train 1–10, 1–20, 1–50 or 1–100;
Snack Plates and picture stories use quantities up to 5 or 10. Applying settings
restarts the active game. Settings and answers stay in memory and reset on reload.
All four cards are available from the start. Browser Back returns between the
homepage and games; entering a game again creates a fresh short session.

## Existing picture stories

“Adding & taking away” opens the original notebook lessons in `stories.html`.
All 24 stories remain: six themes for each operation and quantity range.
`?operation=add&range=5` and `?operation=subtract&range=10` choose a story set.

Each story begins with a countable group and a notebook prompt. The child chooses
when to watch objects join or leave. The app then waits for the child to draw
marks and write an answer on paper. “Show me the answer” reveals the number
sentence. Nothing advances automatically to another story.

`lessons.js` holds these stories. Add a `[themeKey, start, change]` entry to the
relevant list to add a story. Addition totals must fit the range; subtraction
must never go below zero. `app.js` holds the four story stages and SVG layout.
One picture equals one notebook dot. Emoji appearance follows the device.
Reduced motion skips object travel. Resetting or switching a set cancels the
pending movement callback; leaving the page clears it too.

## Files and lifecycle

- `games-lessons.js`: game metadata and small mission sets.
- `games-art.js`: local inline SVG illustrations and shape geometry.
- `games-app.js`: game state, navigation, answer checks and shared pointer handlers.
- `games.css`: responsive cards, scenes and finite feedback animations.
- `stories.html`, `app.js`, `lessons.js`, `styles.css`: original picture stories.

Only the current game scene is mounted. Listeners are installed once, not per
piece or per round. Dragging holds one temporary pointer source and at most one
ghost; release, cancellation, blur, scene changes and leaving the page clean it
up. Rerendering cancels old scene animations. Hiding or leaving the page also
cancels animations. The new games use no application timers or animation loops;
CSS animations are finite and respect reduced motion. No accounts, saved answers,
third-party fonts, runtime dependencies or network services.

## Verification

Serve the repository root on port 8765, then run with Playwright installed:

```sh
NODE_PATH=/path/to/node_modules node numbers-with-me/tools/check-games.cjs
NODE_PATH=/path/to/node_modules node numbers-with-me/tools/check-touch-stories.cjs
```

`SITE_URL` overrides the default `http://localhost:8765`. The scripts launch
`/usr/bin/google-chrome`; adjust that path for another environment. Checks cover
all 40 new missions, generated number sets, retries, immediate plate answers, keyboard,
mouse and emulated touch, settings, navigation, all 24 original stories,
320px through desktop/landscape layouts, reduced motion and scene cleanup.
The main check also compares post-GC DOM/listener/heap measurements before and
after 200 game entry/play/exit cycles. See `review/REPORT.md` for observed results
and the limits of browser emulation.

# Numbers With Me — four-game review

Implemented 2 November 2026. Local review; not published in this change.

## What to try with your child

Open `numbers-with-me/` and let him choose from four picture cards. Each game
has a short session and waits for him to choose the next round.

| Game | Watch for |
| --- | --- |
| Number Train — 10 rounds | Does he use the neighbouring numbers? Is tapping a piece and then its place easier than dragging? |
| Snack Plates — 10 rounds | Can he choose more or fewer with one tap? Can he recognise when both plates have the same number? |
| Teddy's Picnic — 10 rounds | Does he understand the two destination spots, especially inside versus outside? |
| Shape Workshop — 10 rounds | Does completing a picture interest him? Does the upright square window make the shape easy to recognise? |

The “A little help” button offers a specific clue. These games have no voice;
read the short missions together. All four are available immediately. There is
no speed requirement, score, failure screen, saved progress or activity tracking.

The grown-up panel changes number ranges. Original addition and subtraction
picture stories are under “Adding & taking away”.

## Browser verification

Automated Chrome checks exercise all 40 missions, incorrect choices and help,
immediate correct plate answers, retries without a matching step, replay, range changes, browser Back,
keyboard selection, mouse dragging, reduced motion, 44px minimum scene targets
and no horizontal overflow at widths 320, 360, 768, 844 and 1280 pixels.
Mobile Chrome emulation also checks touch selection, dragging, cancellation,
leaving during a drag and advancing after a drop. All 24 original stories pass
answer checks, including card return links and pending movement cleanup.
Illustrations and success states were also inspected visually, including all
ten shape pictures and the apple behind the basket front.

The memory check warms each game, then runs 200 entry/play/exit cycles and forces
GC at the same empty home state before and after. Observed in local Chrome:

| Measurement | Before | After |
| --- | ---: | ---: |
| Documents | 1 | 1 |
| DOM nodes | 379 | 379 |
| Event listeners | 38 | 38 |
| Used JavaScript heap | 2,579,516 bytes | 2,610,692 bytes |

The approximately 31 KB heap difference, stable scene node count and stable
listener count showed no accumulating scene resources in this run. This is a
bounded regression check, not a guarantee against every leak or a performance
benchmark on the child's device. Test artifacts are written under `/tmp`.

Real-device use and the child's response are still to be assessed, especially
whether he enjoys Shape Workshop and whether the short written prompts need
more adult help than expected.

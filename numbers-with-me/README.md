# Numbers With Me

A standalone HTML/CSS/JavaScript guide for notebook-based addition and subtraction.
Open `index.html` directly or serve the repository with any static server.

Each story begins with a countable group and a notebook prompt. The child chooses
when to watch objects join or leave. After the movement, the app waits for the
child to draw marks and write an answer on paper. “Show me the answer” reveals
the number sentence. Nothing advances automatically to another story.

`lessons.js` holds the two ranges (5 and 10), operations, themes and quantities.
Add a `[themeKey, start, change]` entry to the relevant list to add a story.
Addition totals must fit the range; subtraction must never go below zero.
All screen counts and answers are derived from these quantities.

`app.js` holds the SVG layout and four lesson stages: start, movement,
notebook time and reveal. Six familiar themes (cats, dogs, toy cars, balls,
balloons and ducks) use emoji pictures in a plain counting space. Add a theme's
emoji in its `icon` field; the layout is shared. The `place`, `leaveOne` and
`leaveMany` fields supply the short story wording.
Keep one picture equal to one notebook dot. Emoji appearance follows the device.
Reduced-motion preferences skip object travel. Resetting, switching operation,
or navigating cancels pending movement callbacks.

No accounts, saved answers, scoring, network services, or dependencies.

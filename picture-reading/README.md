# Picture Reading

Open `index.html` or select Picture Reading from the Learning Companion home page. Select a picture card to open its larger object view. Previous and Next browse within the category; the two home links return to the category grid or Picture Reading home. Object URLs support direct links and browser Back.

- `data/picture-reading.js`: category and item data, including source pages and review status.
- `assets/`: local extracted object pictures and four intact full-page illustrations.
- [Review gallery](review/index.html): named contact sheets and separate complete pages.
- [Inventory](review/inventory.csv): PDF-to-content mapping.
- [Extraction and validation report](review/REPORT.md): checks, limitations and the approval record.
- `tools/`: offline extraction, cleanup and validation only; never required in the browser.

32 categories are available. All 251 individual pictures and four complete-page illustrations are displayed. The 23 previously flagged items were accepted as-is by the user on 2026-10-28; their approval is recorded in the data and inventory.

Picture names are pronounced when opening a card or using Previous/Next. “Say it again” repeats the current name. Full-page illustrations pronounce their category title and have a “Say the title” button. Speech prefers a browser-provided Indian English (`en-IN`) voice, uses a slower reading pace, and cancels the previous utterance before starting another. Direct links start quietly until a speech or navigation control is used. Devices without speech synthesis keep the visual activity and hide speech buttons.

The accent depends on installed/device voices. When no Indian English voice is listed, the browser receives an `en-IN` language request and chooses its available voice. Browser voices may require a device voice download or network access; the application adds no speech service or audio dependency.

Among Indian English voices, pronunciation now prefers a female voice when identifiable. Browser speech voices have no standard gender field, so the preference recognizes explicit “female” labels and documented Microsoft female Indian English names (Heera, Neerja and Meera). It otherwise uses an available Indian English voice. Opaque voice names cannot reliably identify a female voice; the preference does not switch to a different accent to obtain one.

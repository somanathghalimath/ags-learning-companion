/* Learning content lives in data/picture-reading.js. */
(() => {
  'use strict';
  const categories = document.querySelector('#categories');
  const reading = document.querySelector('#reading');
  const grid = document.querySelector('#category-grid');
  const pictures = document.querySelector('#pictures');
  const heading = document.querySelector('#reading-heading');
  const ready = item => item.reviewStatus !== 'needs-review';
  function image(src, alt) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.loading = 'lazy';
    img.decoding = 'async';
    return img;
  }
  for (const category of pictureReading) {
    const link = document.createElement('a');
    link.className = 'category-card';
    link.href = `#${category.id}`;
    const preview = category.type === 'full-page' ? category.image : category.items.find(ready)?.image;
    if (preview) link.append(image(preview, ''));
    const title = document.createElement('span');
    title.textContent = category.title;
    link.append(title);
    grid.append(link);
  }
  function render(focus = false) {
    const category = pictureReading.find(c => c.id === location.hash.slice(1));
    categories.hidden = Boolean(category);
    reading.hidden = !category;
    pictures.replaceChildren();
    document.title = `${category ? category.title + ' · ' : ''}Picture Reading · AG's Learning Companion`;
    if (!category) {
      if (focus) document.querySelector('#category-heading').focus();
      return;
    }
    heading.textContent = category.title;
    if (category.type === 'full-page') {
      const viewer = document.createElement('div');
      viewer.className = 'full-page';
      viewer.append(image(category.image, `${category.title} — complete textbook page with original labels`));
      const original = document.createElement('a');
      original.className = 'original-link';
      original.href = category.image;
      original.target = '_blank';
      original.rel = 'noopener';
      original.textContent = 'Open larger picture ↗';
      original.setAttribute('aria-label', 'Open larger picture in a new tab');
      pictures.append(viewer, original);
    } else {
      const cards = document.createElement('div');
      cards.className = 'picture-grid';
      for (const item of category.items.filter(ready)) {
        const card = document.createElement('figure');
        card.className = 'picture-card';
        const caption = document.createElement('figcaption');
        caption.textContent = item.name;
        card.append(image(item.image, ''), caption);
        cards.append(card);
      }
      pictures.append(cards);
      if (category.items.some(item => !ready(item))) {
        const note = document.createElement('p');
        note.className = 'review-note';
        note.textContent = 'More pictures from this category are being prepared.';
        pictures.append(note);
      }
    }
    if (focus) { heading.focus(); window.scrollTo(0, 0); }
  }
  window.addEventListener('hashchange', () => render(true));
  render();
})();

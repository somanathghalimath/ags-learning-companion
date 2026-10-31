/* Learning content lives in data/picture-reading.js. */
(() => {
  'use strict';
  const categories = document.querySelector('#categories');
  const reading = document.querySelector('#reading');
  const grid = document.querySelector('#category-grid');
  const pictures = document.querySelector('#pictures');
  const heading = document.querySelector('#reading-heading');
  const objectView = document.querySelector('#object-view');
  const objectHeading = document.querySelector('#object-heading');
  const speakObject = document.querySelector('#speak-object');
  let speechActivated = false;
  let spokenHash = null;
  function speechText(hash) {
    const [categoryId, itemId, extra] = hash.replace(/^#/, '').split('/');
    const category = pictureReading.find(c => c.id === categoryId);
    if (!category || extra !== undefined) return '';
    if (category.type === 'full-page' && !itemId) return category.title;
    return category.items?.find(item => item.id === itemId && ready(item))?.name || '';
  }
  function speechButton(text, label) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'speak-button';
    button.textContent = label;
    button.hidden = !pictureSpeech.supported;
    button.addEventListener('click', () => {
      speechActivated = true;
      pictureSpeech.speak(text);
    });
    return button;
  }
  speakObject.hidden = !pictureSpeech.supported;
  speakObject.addEventListener('click', () => {
    speechActivated = true;
    pictureSpeech.speak(objectHeading.textContent);
  });
  function itemLink(category, item) {
    return `#${category.id}/${item.id}`;
  }
  function setStep(id, category, item) {
    const link = document.querySelector(id);
    if (item) {
      link.href = itemLink(category, item);
      link.removeAttribute('aria-disabled');
      link.removeAttribute('tabindex');
    } else {
      link.removeAttribute('href');
      link.setAttribute('aria-disabled', 'true');
      link.setAttribute('tabindex', '-1');
    }
  }
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
    const [categoryId, itemId, extra] = location.hash.slice(1).split('/');
    const category = pictureReading.find(c => c.id === categoryId);
    const items = category?.type === 'image-grid' ? category.items.filter(ready) : [];
    const itemIndex = extra === undefined ? items.findIndex(item => item.id === itemId) : -1;
    const selectedItem = items[itemIndex];
    categories.hidden = Boolean(category);
    reading.hidden = !category || Boolean(selectedItem);
    objectView.hidden = !selectedItem;
    pictures.replaceChildren();
    document.title = `${category ? category.title + ' · ' : ''}Picture Reading · AG's Learning Companion`;
    if (!category) {
      if (focus) document.querySelector('#category-heading').focus();
      return;
    }
    if (selectedItem) {
      document.title = `${selectedItem.name} · ${category.title} · Picture Reading`;
      const sectionHome = document.querySelector('#section-home');
      sectionHome.href = `#${category.id}`;
      sectionHome.textContent = `⌂ ${category.title} home`;
      objectHeading.textContent = selectedItem.name;
      const objectImage = document.querySelector('#object-image');
      objectImage.src = selectedItem.image;
      document.querySelector('#object-position').textContent = `${itemIndex + 1} of ${items.length} · ${category.title}`;
      setStep('#previous-object', category, items[itemIndex - 1]);
      setStep('#next-object', category, items[itemIndex + 1]);
      if (focus) { objectHeading.focus(); window.scrollTo(0, 0); }
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
      pictures.append(viewer, speechButton(category.title, 'Say the title'), original);
    } else {
      const cards = document.createElement('div');
      cards.className = 'picture-grid';
      for (const item of category.items.filter(ready)) {
        const card = document.createElement('figure');
        card.className = 'picture-card';
        const caption = document.createElement('figcaption');
        caption.textContent = item.name;
        card.append(image(item.image, ''), caption);
        const link = document.createElement('a');
        link.className = 'picture-link';
        link.href = itemLink(category, item);
        link.append(card);
        cards.append(link);
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
  // Speak within the click gesture for browsers that require user activation.
  document.addEventListener('click', event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href]');
    if (!link || link.target === '_blank' || link.origin !== location.origin || link.pathname !== location.pathname) return;
    speechActivated = true;
    spokenHash = link.hash;
    const text = speechText(link.hash);
    if (text) pictureSpeech.speak(text);
    else pictureSpeech.cancel();
  });
  window.addEventListener('hashchange', () => {
    render(true);
    if (location.hash !== spokenHash) {
      const text = speechText(location.hash);
      if (text && speechActivated) pictureSpeech.speak(text);
      else pictureSpeech.cancel();
    }
    spokenHash = null;
  });
  render();
})();

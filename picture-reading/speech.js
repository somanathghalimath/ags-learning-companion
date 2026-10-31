/* Browser-provided speech only; no audio files or external service required. */
const pictureSpeech = (() => {
  'use strict';
  const supported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  let currentUtterance;
  function cancel() {
    if (supported) window.speechSynthesis.cancel();
    currentUtterance = null;
  }
  function speak(text, { lang = 'en-IN' } = {}) {
    if (!supported || !text) return;
    cancel();
    // Read the current list each time: some browsers load voices asynchronously.
    const voices = window.speechSynthesis.getVoices();
    const language = voice => voice.lang.replace(/_/g, '-').toLowerCase();
    const target = lang.replace(/_/g, '-').toLowerCase();
    const candidates = voices.filter(v => language(v) === target
      || (target === 'en-in' && language(v).startsWith('en-') && /india/i.test(v.name))
      || (target === 'kn-in' && language(v) === 'kn'));
    // The browser API has no standard gender field. Use explicit female labels
    // and documented Microsoft female Indian English voice names only:
    // https://support.microsoft.com/en-us/accessibility/windows/narrator/appendix-a-supported-languages-and-voices
    // https://learn.microsoft.com/en-us/azure/cognitive-services/speech-service/language-support
    // Sapna is the documented female Kannada voice in Microsoft's voice list.
    const female = v => /\bfemale\b|\b(?:heera|neerja|meera|sapna)(?:neural)?\b/i.test(v.name);
    const voice = candidates.find(v => language(v) === target && female(v))
      || candidates.find(female)
      || candidates.find(v => language(v) === target)
      || candidates[0];
    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.lang = lang;
    currentUtterance.rate = 0.85;
    currentUtterance.pitch = 1;
    if (voice) currentUtterance.voice = voice;
    window.speechSynthesis.speak(currentUtterance);
  }
  window.addEventListener('pagehide', cancel);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancel();
  });
  return { supported, speak, cancel };
})();

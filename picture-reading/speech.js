/* Browser-provided speech only; no audio files or external service required. */
const pictureSpeech = (() => {
  'use strict';
  const supported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  let currentUtterance;
  function cancel() {
    if (supported) window.speechSynthesis.cancel();
    currentUtterance = null;
  }
  function speak(text) {
    if (!supported || !text) return;
    cancel();
    // Read the current list each time: some browsers load voices asynchronously.
    const voices = window.speechSynthesis.getVoices();
    const language = voice => voice.lang.replace(/_/g, '-').toLowerCase();
    const indianEnglish = voices.filter(v => language(v) === 'en-in'
      || (language(v).startsWith('en-') && /india/i.test(v.name)));
    // The browser API has no standard gender field. Use explicit female labels
    // and documented Microsoft female Indian English voice names only:
    // https://support.microsoft.com/en-us/accessibility/windows/narrator/appendix-a-supported-languages-and-voices
    // https://learn.microsoft.com/en-us/azure/cognitive-services/speech-service/language-support
    const female = v => /\bfemale\b|\b(?:heera|neerja|meera)(?:neural)?\b/i.test(v.name);
    const voice = indianEnglish.find(v => language(v) === 'en-in' && female(v))
      || indianEnglish.find(female)
      || indianEnglish.find(v => language(v) === 'en-in')
      || indianEnglish[0];
    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.lang = 'en-IN';
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

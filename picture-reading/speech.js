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
    const voice = voices.find(v => language(v) === 'en-in')
      || voices.find(v => language(v).startsWith('en-') && /india/i.test(v.name));
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

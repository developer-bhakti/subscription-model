import { useEffect, useRef, useState } from "react";

// The Sound Book's voice, shared by every book so they all sound exactly the same.
// This is the voice code the Alphabet book has always used, moved here unchanged: the
// same voice choice, speed, pitch, pause and tap handling. Only the words it is given to
// read now come from the caller.

// Read at call time rather than cached at module load: browsers fill the voice list
// asynchronously, so a list grabbed too early is empty and the first tap would fall
// back to whatever language the browser defaults to.
const pickEnglishVoice = () => {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  // Prefer a local voice — a network voice can arrive late and sound clipped.
  const byLang = (lang) =>
    voices.find((v) => v.lang === lang && v.localService) ||
    voices.find((v) => v.lang === lang);

  return (
    byLang("en-IN") ||
    byLang("en-GB") ||
    byLang("en-US") ||
    voices.find((v) => v.lang && v.lang.startsWith("en")) ||
    null
  );
};

export default function useSoundSpeaker() {
  const [speaking, setSpeaking] = useState(false);
  const timerRef = useRef(null);

  const supported = typeof window !== "undefined" && "speechSynthesis" in window;

  useEffect(() => {
    if (!supported) return;

    const synth = window.speechSynthesis;

    // Touching getVoices() nudges Chrome into loading the list, and the event keeps it
    // current if the voices land a moment later.
    const refresh = () => synth.getVoices();
    refresh();
    synth.addEventListener("voiceschanged", refresh);

    return () => {
      synth.removeEventListener("voiceschanged", refresh);
      if (timerRef.current) clearTimeout(timerRef.current);
      // Stop talking if the child leaves the page mid-word.
      synth.cancel();
    };
  }, [supported]);

  // `parts` is what to say, one entry per utterance.
  const speak = (parts) => {
    if (!supported) return;

    const synth = window.speechSynthesis;

    // A second tap while the first is still playing would otherwise queue behind it and
    // run the two together — the main reason a page like this ends up sounding muddy.
    if (timerRef.current) clearTimeout(timerRef.current);
    synth.cancel();
    setSpeaking(true);

    // Chrome drops an utterance queued in the same tick as cancel(), so start just after.
    timerRef.current = setTimeout(() => {
      const voice = pickEnglishVoice();

      // Separate utterances, not one string: the break between them gives a real pause,
      // so the first part lands on its own before the next one follows.
      parts.forEach((text, index) => {
        const utterance = new SpeechSynthesisUtterance(text);

        utterance.rate = 0.7; // slow enough for a two year old to follow
        utterance.pitch = 1.1; // slightly bright, friendlier for children
        utterance.volume = 1;

        if (voice) {
          utterance.voice = voice;
          utterance.lang = voice.lang;
        } else {
          utterance.lang = "en-IN";
        }

        if (index === parts.length - 1) {
          utterance.onend = () => setSpeaking(false);
          utterance.onerror = () => setSpeaking(false);
        }

        synth.speak(utterance);
      });
    }, 80);
  };

  const stop = () => {
    if (supported) window.speechSynthesis.cancel();
    if (timerRef.current) clearTimeout(timerRef.current);
    setSpeaking(false);
  };

  return { speak, stop, speaking, supported };
}

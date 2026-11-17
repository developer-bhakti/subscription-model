import { useCallback, useState } from "react";
import { speakAsGirl } from "../../../services/speech";
import { LETTERS, SAME_SOUND_GROUPS, SOUND_SAY } from "../../../data/phonicsData";
import { getLetterPage } from "../../../data/phonicsFiles";
import { L1_PAGES, emojiOf } from "../../../data/phonicsLessons";

/* ------------------------- pictures cut from the worksheets ------------------------- */

// Width / height of a Phonics page. All the pages share this shape and layout, which is what
// makes it possible to cut a picture out of one by position.
export const PAGE_RATIO = 1055 / 1491;

// Where the five pictures of a Level 1 page ("Colour the pictures that start with ...") sit, as
// fractions of the page: five equal columns, each with the picture above and its name below.
const STRIP = { left: 0.05, cell: 0.181, top: 0.845, pictureBottom: 0.943, bottom: 0.967 };

// The part of a page holding the `column`-th picture, as [x0, y0, x1, y1] fractions of the page.
// With `labelled` the word printed under the picture is included.
export const stripBox = (column, labelled) => [
  STRIP.left + column * STRIP.cell,
  STRIP.top,
  STRIP.left + (column + 1) * STRIP.cell,
  labelled ? STRIP.bottom : STRIP.pictureBottom,
];

// The Level 1 worksheet picture of a word: { src, column }, or null if no Level 1 page shows it.
export const stripCellFor = (word) => {
  const wanted = word.toLowerCase();

  for (const [letter, page] of Object.entries(L1_PAGES)) {
    const column = page.pictures.findIndex((p) => p.toLowerCase() === wanted);
    const file = column >= 0 ? getLetterPage(1, letter) : undefined;

    if (file) return { src: file.image, column };
  }

  return null;
};

// True when a word can be shown as a picture: it has an emoji, or it is on a Level 1 worksheet.
export const hasPicture = (word) => Boolean(emojiOf(word) || stripCellFor(word));

// 1 to 3 stars for a score out of a total.
export const starsFor = (score, total) => {
  const share = total ? score / total : 0;

  return share >= 0.9 ? 3 : share >= 0.6 ? 2 : 1;
};

/* ------------------------------- random helpers ------------------------------- */

export const shuffle = (list) => {
  const copy = [...list];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
};

export const pickRandom = (list, count) => shuffle(list).slice(0, count);

// Picks `count` letters other than `letter`, never one that makes the same sound as `letter` or
// as a letter already picked (c, k and q all say /k/, so only one of them may appear in a question).
export const pickOtherLetters = (letter, count, pool = LETTERS) => {
  const group = (l) => SAME_SOUND_GROUPS.find((g) => g.includes(l));
  const picked = [];
  const blocked = new Set([letter, ...(group(letter) || [])]);

  for (const item of shuffle(pool)) {
    if (picked.length === count) break;
    if (blocked.has(item.letter)) continue;

    picked.push(item);
    blocked.add(item.letter);
    (group(item.letter) || []).forEach((l) => blocked.add(l));
  }

  return picked;
};

/* ---------------------------------- speaking ---------------------------------- */

export const speechSupported = () =>
  typeof window !== "undefined" && "speechSynthesis" in window;

// Each call to say() or saySequence() starts a new "run". A run that has been replaced stops
// itself, so tapping quickly never leaves two voices talking over each other.
let runId = 0;
let timers = [];

export const stopSpeaking = () => {
  runId += 1;
  timers.forEach(clearTimeout);
  timers = [];

  if (speechSupported()) window.speechSynthesis.cancel();
};

// Say something in the app's girl voice, cutting off whatever was being said.
export const say = (text, options = {}) => {
  stopSpeaking();

  if (!speechSupported() || !text) return;

  speakAsGirl(text, { rate: 0.8, ...options });
};

// Say a list of things one after the other (the sounds of a word, then the word). `onStep` is told
// which one is being said, and -1 when the list is finished. Without speech support it still steps
// along on a timer so the highlighting plays.
export const saySequence = (parts, onStep = () => {}) => {
  stopSpeaking();

  const id = runId;

  const step = (i) => {
    if (id !== runId) return;

    if (i >= parts.length) {
      onStep(-1);
      return;
    }

    onStep(i);

    if (!speechSupported()) {
      timers.push(setTimeout(() => step(i + 1), 700));
      return;
    }

    let advanced = false;
    const next = () => {
      if (advanced) return;
      advanced = true;
      step(i + 1);
    };

    speakAsGirl(parts[i], { rate: 0.7, onend: next, onerror: next });
  };

  step(0);
};

// The letters of a word and how each one sounds, followed by the whole word.
export const soundOutParts = (word) => {
  const letters = word.toLowerCase().replace(/[^a-z]/g, "").split("");

  return [...letters.map((l) => SOUND_SAY[l] || l), word];
};

// For sounding a word out: `active` is the position being spoken (a letter, then the whole word
// at the end), or -1 when nothing is being said.
export function useSoundOut() {
  const [active, setActive] = useState(-1);

  const play = useCallback((word) => {
    saySequence(soundOutParts(word), setActive);
  }, []);

  const reset = useCallback(() => {
    stopSpeaking();
    setActive(-1);
  }, []);

  return { active, play, reset };
}

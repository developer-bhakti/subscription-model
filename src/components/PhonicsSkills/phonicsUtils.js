import { useCallback, useEffect, useRef, useState } from "react";
import { speakAsGirl } from "../../services/speech";
import {
  CONSONANT_PAIRS,
  LETTERS,
  PHONICS_LEVELS,
  SAME_SOUND_GROUPS,
  SOUND_SAY,
  VOWEL_PAIRS,
  soundKey,
  soundsOverlap,
} from "../../data/phonicsData";
import { getLetterPage } from "../../data/phonicsFiles";
import { L1_PAGES, emojiOf } from "../../data/phonicsLessons";
import { SHEET_CELL, SHEET_ROWS } from "../../data/phonicsSheetRows";

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

// Width / height of a Level's pages (Levels 5 and 6 are a little wider than the first four).
export const pageRatio = (level) => {
  const [width, height] = PHONICS_LEVELS[level - 1].pageSize;

  return width / height;
};

// The part of a Level 5 or Level 6 page holding one row's picture and its name, as [x0, y0, x1, y1] fractions of
// the page, or null if that page's rows have not been measured (see data/phonicsSheetRows.js). `row` is 0 to 3,
// top to bottom.
export const sheetRowBox = (level, letter, row) => {
  const rows = SHEET_ROWS[level]?.[letter];
  const cell = SHEET_CELL[level];

  if (!rows || !cell || rows[row * 2] === undefined) return null;

  const [width, height] = PHONICS_LEVELS[level - 1].pageSize;

  return [
    cell.x[0] / width,
    (rows[row * 2] + cell.inset) / height,
    cell.x[1] / width,
    (rows[row * 2 + 1] - cell.inset + 1) / height,
  ];
};

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

// Wrong answers for a question about sounds: `count` sounds that do not sound like (or overlap with) any in `avoid`,
// one of each of the `kinds` in turn (so for a word of consonant, vowel, consonant the wrong answers are a consonant,
// a vowel and a consonant). When a kind has nothing left, any single letter will do.
const FOIL_POOLS = {
  vowel: ["a", "e", "i", "o", "u"],
  consonant: [..."bcdfghjklmnprstvwxyz"],
  vowelPair: VOWEL_PAIRS,
  consonantPair: CONSONANT_PAIRS,
};

export const pickFoils = (avoid, kinds, count) => {
  const blocked = new Set(avoid.map(soundKey));
  const foils = [];

  while (foils.length < count) {
    const kind = kinds[foils.length % kinds.length];
    const open = (pool) =>
      pool.filter((unit) => ![...blocked].some((key) => soundsOverlap(key, soundKey(unit))));
    const choices = open(FOIL_POOLS[kind]).length
      ? open(FOIL_POOLS[kind])
      : open([...FOIL_POOLS.consonant, ...FOIL_POOLS.vowel]);
    const [unit] = pickRandom(choices, 1);

    blocked.add(soundKey(unit));
    foils.push(unit);
  }

  return foils;
};

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

/* ---------------------------------- clapping ---------------------------------- */

// A short clap, made on the spot (a burst of noise that dies away fast). Where the browser has no Web Audio it
// stays silent, and the hands still light up.
let audio = null;

export const playClap = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;

    if (!AudioContext) return;

    audio ??= new AudioContext();

    if (audio.state === "suspended") audio.resume();

    const length = Math.floor(audio.sampleRate * 0.12);
    const buffer = audio.createBuffer(1, length, audio.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < length; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 3;

    const source = audio.createBufferSource();
    const filter = audio.createBiquadFilter();
    const gain = audio.createGain();

    source.buffer = buffer;
    filter.type = "bandpass";
    filter.frequency.value = 1800;
    filter.Q.value = 0.8;
    gain.gain.value = 0.9;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(audio.destination);
    source.start();
  } catch {
    // no sound, but nothing breaks
  }
};

// How long between one clap and the next.
export const CLAP_GAP_MS = 700;

// Clapping a word out: the word is said, then a hand lights up (with a clap) for each syllable, then the count
// is said. `state.key` is the word being clapped (whatever the page calls it) and `state.hands` how many hands
// have clapped so far.
export function useClapOut() {
  const [state, setState] = useState({ key: null, hands: 0 });
  const pending = useRef([]);

  const clear = useCallback(() => {
    pending.current.forEach(clearTimeout);
    pending.current = [];
  }, []);

  const stop = useCallback(() => {
    clear();
    stopSpeaking();
    setState({ key: null, hands: 0 });
  }, [clear]);

  const play = useCallback(
    (key, word, count) => {
      clear();
      setState({ key, hands: 0 });

      let started = false;

      const clapAlong = () => {
        if (started) return;

        started = true;

        for (let i = 0; i < count; i += 1) {
          pending.current.push(
            setTimeout(() => {
              playClap();
              setState({ key, hands: i + 1 });
            }, i * CLAP_GAP_MS),
          );
        }

        pending.current.push(
          setTimeout(() => {
            setState({ key: null, hands: 0 });
            say(`${word} has ${count} ${count === 1 ? "syllable" : "syllables"}.`);
          }, count * CLAP_GAP_MS + 300),
        );
      };

      // The claps begin when the word has been said. If the browser never says it has finished, they begin anyway.
      saySequence([word], (step) => {
        if (step === -1) clapAlong();
      });
      pending.current.push(setTimeout(clapAlong, 2500));
    },
    [clear],
  );

  // Leaving the page stops the claps (the page frame stops the voice).
  useEffect(() => clear, [clear]);

  return { state, play, stop };
}

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

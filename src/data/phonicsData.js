// Shared details of the Phonics Skills section of Worksheets & Activities: the four levels, in the
// order a child learns them, and how the browser's voice says each letter's sound.
// What is actually taught (the words, sounds, stories and rhymes) comes from the school's own
// pages and lives in phonicsLessons.js.

export const PHONICS_HUB_PATH = "/user/worksheet/phonics-skills";

export const PHONICS_LEVELS = [
  {
    level: 1,
    path: `${PHONICS_HUB_PATH}/level-1`,
    icon: "🔠",
    title: "Identification of Letters",
    shortTitle: "Letters",
    preview: "A  B  C",
    description:
      "Activities to help children identify and recognize English alphabets (A–Z).",
  },
  {
    level: 2,
    path: `${PHONICS_HUB_PATH}/level-2`,
    icon: "🔊",
    title: "Sounds of Letters",
    shortTitle: "Sounds",
    preview: "/b/  /k/  /s/",
    description:
      "Activities to help children understand and learn the phonetic sounds of each letter.",
  },
  {
    level: 3,
    path: `${PHONICS_HUB_PATH}/level-3`,
    icon: "📖",
    title: "Phonics with Stories",
    shortTitle: "Stories",
    preview: "🐻 ⚽ 🚌",
    description:
      "Interactive phonics-based stories that help children connect letter sounds with words through storytelling.",
  },
  {
    level: 4,
    path: `${PHONICS_HUB_PATH}/level-4`,
    icon: "🎵",
    title: "Phonics Rhyming Words",
    shortTitle: "Rhymes",
    preview: "cat · hat · bat",
    description:
      "Activities to help children identify, understand, and match rhyming words.",
  },
];

// `say` is how the sound of each letter is written out so the browser's voice can speak it
// ("buh" for /b/). Vowels use their short sounds, as on the Level 2 sheets (apple, egg, igloo,
// orange, umbrella). X says /ks/.
const SAYS = {
  A: "ah", B: "buh", C: "kuh", D: "duh", E: "eh", F: "fuh", G: "guh", H: "huh", I: "ih",
  J: "juh", K: "kuh", L: "luh", M: "muh", N: "nuh", O: "aw", P: "puh", Q: "kwuh", R: "ruh",
  S: "suh", T: "tuh", U: "uh", V: "vuh", W: "wuh", X: "ks", Y: "yuh", Z: "zuh",
};

export const LETTERS = Object.entries(SAYS).map(([letter, say]) => ({
  letter,
  say,
  vowel: "AEIOU".includes(letter),
}));

// How to speak each lower-case letter's sound, for blending words ("c-a-t").
export const SOUND_SAY = Object.fromEntries(
  LETTERS.map(({ letter, say }) => [letter.toLowerCase(), say]),
);

// Letters that make the same sound. A question never offers two of them together, because the
// child could not tell which one the question means.
export const SAME_SOUND_GROUPS = [["C", "K", "Q"]];

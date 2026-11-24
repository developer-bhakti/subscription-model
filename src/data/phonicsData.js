// Shared details of the Phonics Skills section of Worksheets & Activities: the eight levels, in the
// order a child learns them, and how the browser's voice says each letter's sound.
// What is actually taught (the words, sounds, stories and rhymes) comes from the school's own
// pages and lives in phonicsLessons.js.
//
// To add a level: list it below (`pageSize` is the width and height in pixels of its printed
// pages), put its pages in src/assets/img/Level_N_<name>/ (see phonicsFiles.js), add a
// PhonicsLevelN.jsx page in components/PhonicsSkills, and add its route in pages/User.jsx. The
// Phonics Skills page, the Phonics Worksheets page and the level-to-level buttons pick it up
// from this list.

export const PHONICS_HUB_PATH = "/user/phonics-skills";

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
    pageSize: [1055, 1491],
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
    pageSize: [1055, 1491],
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
    pageSize: [1055, 1491],
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
    pageSize: [1055, 1491],
  },
  {
    level: 5,
    path: `${PHONICS_HUB_PATH}/level-5`,
    icon: "👏",
    title: "Syllable Recognition",
    shortTitle: "Syllables",
    preview: "ap · ple",
    description:
      "Activities to help children clap the beats in a word and count its syllables.",
    pageSize: [1089, 1445],
  },
  {
    level: 6,
    path: `${PHONICS_HUB_PATH}/level-6`,
    icon: "🧩",
    title: "Sound Segmentation",
    shortTitle: "Segmenting",
    preview: "c · a · t",
    description:
      "Activities to help children break a word into its beginning, middle and ending sounds.",
    pageSize: [1089, 1445],
  },
  {
    level: 7,
    path: `${PHONICS_HUB_PATH}/level-7`,
    icon: "🔗",
    title: "Sound Blending",
    shortTitle: "Blending",
    preview: "c + a + t",
    description:
      "Activities to help children say the sounds of a word one after another and blend them into the word.",
    pageSize: [1052, 1494],
  },
  {
    level: 8,
    path: `${PHONICS_HUB_PATH}/level-8`,
    icon: "🐱",
    title: "CVC Words",
    shortTitle: "CVC Words",
    preview: "cat · dog · sun",
    description:
      "Activities to help children read, build and change simple consonant–vowel–consonant words.",
    pageSize: [1052, 1494],
  },
];

/* ------------------------------------------ what a page is called ------------------------------------------ */
// Levels 1 to 6 have a page for each letter. Level 7 has a page for each vowel and number of sounds (the page
// key "A3" is vowel A with three sounds), and Level 8 has sixteen numbered pages that each do a different job.

const SOUND_COUNT_WORDS = { 2: "two", 3: "three", 4: "four" };

// What each of Level 8's sixteen pages is, from its heading.
export const L8_PAGE_TITLES = {
  1: "The CVC Pattern",
  2: "Identify the Sounds (1)",
  3: "Identify the Sounds (2)",
  4: "Blend the Sounds and Read the Word",
  5: "Match the Pictures with CVC Words (1)",
  6: "Match the Pictures with CVC Words (2)",
  7: "Complete the Letters (1)",
  8: "Complete the Letters (2)",
  9: "Arrange the Letters (1)",
  10: "Arrange the Letters (2)",
  11: "Change One Letter (1)",
  12: "Change One Letter (2)",
  13: "Read and Choose the Picture (1)",
  14: "Read and Choose the Picture (2)",
  15: "Assessment Worksheet (1)",
  16: "Assessment Worksheet (2)",
};

// The name of a page of a level: "Letter A", "Vowel A: three sounds" or "Page 7: Complete the Letters (1)".
// `key` is the page's key (its letter, "A3" or "7").
export const pageTitle = (level, key) => {
  if (level === 7) return `Vowel ${key[0]}: ${SOUND_COUNT_WORDS[key[1]]} sounds`;
  if (level === 8) return `Page ${key}: ${L8_PAGE_TITLES[key]}`;

  return `Letter ${key}`;
};

// The label of the button that opens a page's preview (the first six levels keep their old wording).
export const pagePreviewLabel = (level, key) =>
  level <= 6 ? `Preview letter ${key}` : `Preview ${pageTitle(level, key)}`;


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

/* ----------------------------- sounds written with more than one letter ----------------------------- */
// Level 6 splits a word into the sounds a child writes in boxes, and a sound can take two letters: duck is
// d, u, ck and goat is g, oa, t.

// Two letters that stand for one sound: vowel pairs, and consonant pairs.
export const VOWEL_PAIRS = ["oa", "ai", "ea", "ee", "oo", "ou", "ow"];
export const CONSONANT_PAIRS = ["ck", "ng", "ch", "sh", "th", "qu"];

// How to speak a pair's sound ("ck" says "kuh"). One letter's sound is in SOUND_SAY above.
const PAIR_SAY = {
  ck: "kuh", ng: "ing", ch: "chuh", sh: "shh", th: "thuh", qu: "kwuh",
  oa: "oh", ai: "ay", ea: "ee", ee: "ee", oo: "oo", ou: "ow", ow: "ow",
};

// What to say for a sound, whether it takes one letter or two.
export const soundSay = (unit) => SOUND_SAY[unit] ?? PAIR_SAY[unit] ?? unit;

// Written differently, said the same: c and ck say /k/ like k does, ea says /ee/ like ee, and ow says /ou/.
const SAME_AS = { c: "k", ck: "k", ea: "ee", ow: "ou" };

// A sound's name for comparing: two sounds with the same key are the same sound, so a question never offers
// both of them (they would both be right).
export const soundKey = (unit) => SAME_AS[unit] ?? unit;

// Sounds that share a part with each other, by key: qu says /kw/ (it starts with /k/ and has a /w/), x says /ks/, and
// ng sits between n and g. They are different sounds, but a child could fairly take one for the other, so a question
// never offers one of them as a wrong answer to the other.
const OVERLAPS = [["k", "qu"], ["w", "qu"], ["k", "x"], ["s", "x"], ["n", "ng"], ["g", "ng"], ["t", "ch"]];

// True when two sounds (by key) are the same or overlap.
export const soundsOverlap = (a, b) =>
  a === b || OVERLAPS.some(([x, y]) => (x === a && y === b) || (x === b && y === a));

// What kind of sound it is: a wrong answer is drawn from sounds of the same kind, so a child cannot tell the
// right one by its looks.
export const unitKind = (unit) => {
  if (unit.length === 1) return "aeiou".includes(unit) ? "vowel" : "consonant";

  return VOWEL_PAIRS.includes(unit) ? "vowelPair" : "consonantPair";
};

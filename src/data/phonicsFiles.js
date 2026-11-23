// The printable Phonics pages the school has added under src/assets/img, found automatically so
// nothing here needs editing when pages are added: drop a file into the right folder and it shows up.
//
//   Level_1_Identification of Letters/A_Recognition_Phonics_L1.jpg   one page per letter
//   Level_2_Sound of Letters/B_Sound_Phonics_L2.jpg
//   Level_3_Phonics with Story/C_Phonics_Story_L3.jpg
//   Level_4_Phonics_Rhyme Words/D_Phonics_Rhyming Words_L4.jpg
//   Level_5_Syllable Recognition/E_Syllable Recognition.jpg
//   Level_6_Sound Segmentation/F_Sound Segmentation Worksheet.jpg
//   Level_1_.../Preschool_..._Workbook.pdf                           a whole-level PDF (not a letter page)
//
// A file whose name starts with a single letter and an underscore ("A_...") is that letter's page.
// A PDF with such a name is that letter's PDF; any other PDF is the level's full workbook.
// Only these file types are picked up (zips and other files are ignored, so they never reach the site).
// A file that does not start that way (such as "J1_...") is not a letter's page and is left out.
// The level's folder may itself hold a folder of the same name, as an unzipped download does.
// Which levels exist comes from PHONICS_LEVELS in phonicsData.js.

import { PHONICS_LEVELS } from "./phonicsData";

const images = import.meta.glob("../assets/img/**/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

const pdfs = import.meta.glob("../assets/img/**/*.pdf", {
  eager: true,
  query: "?url",
  import: "default",
});

const LEVEL_FILE = /\/Level_(\d)_[^/]*\/([^/]+)$/;
const LETTER_FILE = /^([A-Z])_/;

const isJpeg = (name) => /\.jpe?g$/i.test(name);

const emptyLevel = () => ({ pages: new Map(), workbook: null });
const levels = Object.fromEntries(PHONICS_LEVELS.map(({ level }) => [level, emptyLevel()]));

const addFiles = (files, add) => {
  for (const [path, url] of Object.entries(files)) {
    const match = LEVEL_FILE.exec(path);

    if (!match || !levels[match[1]]) continue;

    add(levels[match[1]], match[2], url);
  }
};

addFiles(images, (level, name, url) => {
  const letter = LETTER_FILE.exec(name)?.[1];

  if (!letter) return;

  const existing = level.pages.get(letter);

  // If a letter has both a .jpg and another format, the .jpg is the one shown.
  if (existing && !isJpeg(name)) return;

  level.pages.set(letter, { ...existing, letter, name, image: url });
});

addFiles(pdfs, (level, name, url) => {
  const letter = LETTER_FILE.exec(name)?.[1];

  if (!letter) {
    level.workbook = { name, url };
    return;
  }

  level.pages.set(letter, { ...level.pages.get(letter), letter, pdf: { name, url } });
});

// One letter's page for a level ({ letter, name, image, pdf? }), or undefined if it has none yet.
export const getLetterPage = (level, letter) => {
  const page = levels[level]?.pages.get(letter);

  return page?.image ? page : undefined;
};

// For one level: `pages` is every letter's page in A–Z order ({ letter, name, image, pdf? }), and
// `workbook` is the level's full PDF ({ name, url }) or null if there isn't one.
export const getPhonicsFiles = (level) => {
  const found = levels[level] || emptyLevel();

  return {
    pages: [...found.pages.values()]
      .filter((page) => page.image)
      .sort((a, b) => a.letter.localeCompare(b.letter)),
    workbook: found.workbook,
  };
};

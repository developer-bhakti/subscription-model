import { useState } from "react";
import { L9_FAMILIES, SAME_SOUND_GROUPS, soundSay } from "../../data/phonicsData";
import { L9_PAGES } from "../../data/phonicsLessons";
import { L9_PICTURES } from "../../data/phonicsSheetRows";
import { CutPicture, ListenButton, MatchGame, PhonicsLevelLayout, PickAllGame, QuizGame } from "./PhonicsShared";
import PhonicsWorksheets, { WorksheetButton } from "./PhonicsWorksheets";
import { pickRandom, say, saySequence, shuffle, stopSpeaking } from "./phonicsUtils";

// LEVEL 9: Word Families
// Follows the "Word Family" worksheets. Words that end the same way make a family: cat, bat and hat are the "at"
// family. Each page has one family, its words built from a first letter and the family ("c" + "at" = "cat"), and four
// sections: Read and Trace, Read and Match, Choose the Correct Word, and Complete the Words. The words come from
// L9_PAGES (phonicsLessons.js), which also says which rows of the sheets are left out and why.

const PAGES = Object.keys(L9_PAGES);
const VOWELS = ["A", "E", "I", "O", "U"];

// Every word, with its family, the letters before the family ("c" in cat, "tw" in twin) and its page.
const WORDS = PAGES.flatMap((page) => {
  const family = L9_FAMILIES[page];

  return L9_PAGES[page].map((word) => ({ word, family, page, onset: word.slice(0, word.length - family.length) }));
});

const hasPicture = (word) => Boolean(L9_PICTURES[word]);
const PICTURED = WORDS.filter(({ word }) => hasPicture(word));
const wordsOf = (page) => WORDS.filter((w) => w.page === page);

// How the voice says a family on its own, where the letters alone could be read out as letter names.
const FAMILY_SAY = { ad: "add", ag: "agg", eg: "egg", ig: "igg", od: "odd", og: "ogg", ud: "udd", ug: "ugg" };
const familySay = (family) => FAMILY_SAY[family] ?? family;

// How the voice says the first letter(s) of a word: the letter's sound ("kuh" for c), or "twuh" for tw.
const onsetSay = (onset) => (onset.length === 1 ? soundSay(onset) : `${onset}uh`);

// The word blended from its parts: "kuh, at, cat".
const blendParts = ({ onset, family, word }) => [onsetSay(onset), familySay(family), word];

function WordPicture({ word, size = "lg" }) {
  const { page, box } = L9_PICTURES[word];

  return <CutPicture level={9} page={page} box={box} label={word} size={size} />;
}

// A word with its family part in colour: c + at.
function FamilyWord({ onset, family, lit = -1, className = "" }) {
  return (
    <span className={`font-bold ${className}`}>
      <span className={`rounded-md ${lit === 0 ? "bg-kid-sun" : "text-kid-ink"}`}>{onset}</span>
      <span className={`rounded-md ${lit === 1 ? "bg-kid-sun text-kid-ink" : "text-red-600"}`}>{family}</span>
    </span>
  );
}

/* ------------------------------ 1. Meet the word families ------------------------------ */
// The top of every page: the family, a plus sign and its words, each built from a first letter and the family.

function MeetTheFamilies() {
  const [pageIndex, setPageIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [lit, setLit] = useState(-1);
  const page = PAGES[pageIndex];
  const family = L9_FAMILIES[page];
  const words = wordsOf(page);
  const current = words[Math.min(wordIndex, words.length - 1)];

  const chooseFamily = (i) => {
    stopSpeaking();
    setLit(-1);
    setPageIndex(i);
    setWordIndex(0);
    say(`The ${familySay(L9_FAMILIES[PAGES[i]])} family`);
  };

  const chooseWord = (i) => {
    stopSpeaking();
    setLit(-1);
    setWordIndex(i);
    say(words[i].word);
  };

  // The first letter, then the family, then the whole word, lighting each part as it is said (the word is step 2).
  const blendOut = () => saySequence(blendParts(current), setLit);

  return (
    <div>
      <p className="mb-4 text-center text-sm font-bold text-kid-soft sm:text-base">
        Words that end the same way make a word family. Pick a family, then tap a word to blend it!
      </p>

      <div className="mb-5 flex flex-col gap-2">
        {VOWELS.map((vowel) => (
          <div key={vowel} className="flex flex-wrap items-center justify-center gap-2">
            {PAGES.map((key, i) =>
              key[0] === vowel ? (
                <button
                  key={key}
                  type="button"
                  onClick={() => chooseFamily(i)}
                  aria-pressed={i === pageIndex}
                  aria-label={`The ${L9_FAMILIES[key]} family`}
                  className={`kid-btn min-w-16 px-3 py-2 text-lg ${i === pageIndex ? "" : "kid-btn-soft"}`}
                >
                  -{L9_FAMILIES[key]}
                </button>
              ) : null,
            )}
          </div>
        ))}
      </div>

      <div className="kid-card tone-white mx-auto max-w-4xl p-5 text-center sm:p-8">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <span className="rounded-2xl bg-tone-rose px-4 py-1 text-5xl font-bold text-red-600 sm:text-6xl">{family}</span>

          <span aria-hidden="true" className="text-4xl font-bold text-kid-soft">
            +
          </span>

          {words.map((w, i) => (
            <button
              key={w.word}
              type="button"
              onClick={() => chooseWord(i)}
              aria-pressed={w.word === current.word}
              aria-label={`${w.onset} and ${family} make ${w.word}`}
              className={`flex min-w-16 flex-col items-center rounded-2xl bg-tone-butter px-3 py-1.5 transition hover:scale-105 active:scale-95 ${
                w.word === current.word ? "ring-4 ring-kid-green" : ""
              }`}
            >
              <span className="text-2xl font-bold text-kid-ink sm:text-3xl">{w.onset}</span>
              <FamilyWord {...w} className="text-xl sm:text-2xl" />
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center gap-3">
          {hasPicture(current.word) && (
            <button
              type="button"
              onClick={() => say(current.word)}
              aria-label={`Hear the word ${current.word}`}
              className="rounded-2xl transition hover:scale-105 active:scale-95"
            >
              <WordPicture word={current.word} size="xl" />
            </button>
          )}

          <p
            className={`rounded-2xl px-6 py-1 text-5xl transition sm:text-6xl ${lit === 2 ? "bg-kid-sun" : "bg-tone-aqua"}`}
          >
            <FamilyWord {...current} lit={lit} />
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <ListenButton onClick={blendOut}>Blend it</ListenButton>

            <WorksheetButton level={9} letter={page}>
              The "{family}" family page
            </WorksheetButton>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------ 2. Read and match ------------------------------------ */
// "Read the words and match them to the correct pictures." A round is one family, as on the sheets.

const MATCH_PAGES = PAGES.filter((page) => wordsOf(page).filter(({ word }) => hasPicture(word)).length >= 3);

const makeMatchRound = () => {
  const [page] = pickRandom(MATCH_PAGES, 1);

  return {
    title: `Match the "${L9_FAMILIES[page]}" words`,
    items: wordsOf(page)
      .filter(({ word }) => hasPicture(word))
      .map(({ word }) => ({ key: word, word, picture: <WordPicture word={word} size="md" /> })),
  };
};

/* --------------------------------- 3. Choose the correct word --------------------------------- */
// "Look at each picture and tick the correct word." The other words offered are from the same family, so the child
// has to read the first letter.

// `count` other words for a question about `word`: from its family first, then from families with the same vowel.
const otherWords = ({ word, family, page }, count) => {
  const same = shuffle(WORDS.filter((w) => w.family === family && w.word !== word));
  const nearby = shuffle(WORDS.filter((w) => w.page[0] === page[0] && w.family !== family));

  return [...same, ...nearby].slice(0, count).map((w) => w.word);
};

const makeChooseTheWord = () =>
  pickRandom(PICTURED, 10).map((item) => ({
    prompt: "Look at the picture. Which word is it?",
    display: (
      <span className="flex justify-center">
        <WordPicture word={item.word} size="xl" />
      </span>
    ),
    speak: "Look at the picture. Which word is it?",
    explain: `${blendParts(item).join(", ")}.`,
    options: shuffle([item.word, ...otherWords(item, 2)]).map((w) => ({ value: w, label: w })),
    answer: item.word,
  }));

/* --------------------------------- 4. Complete the words --------------------------------- */
// "Write the missing letter to make an 'at' word." The letters offered make other words of the family where they can,
// so the picture is what tells the child which one.

const CONSONANTS = [..."bcdfghjlmnprstvwy"];
const sameSound = (a, b) => a === b || SAME_SOUND_GROUPS.some((g) => g.includes(a.toUpperCase()) && g.includes(b.toUpperCase()));

const otherOnsets = ({ onset, family }) => {
  const fromFamily = shuffle(WORDS.filter((w) => w.family === family && w.onset !== onset).map((w) => w.onset));
  const spare = shuffle(onset.length > 1 ? ["sp", "sk", "tr", "st"] : CONSONANTS);
  const picked = [];

  for (const candidate of [...fromFamily, ...spare]) {
    if (picked.length === 2) break;
    if (sameSound(candidate, onset) || picked.some((p) => sameSound(p, candidate))) continue;

    picked.push(candidate);
  }

  return picked;
};

const makeCompleteTheWords = () =>
  pickRandom(PICTURED, 10).map((item) => ({
    prompt: item.onset.length > 1 ? "Which letters are missing?" : "Which letter is missing?",
    display: (
      <>
        <span className="flex justify-center">
          <WordPicture word={item.word} size="xl" />
        </span>

        <span className="mt-3 flex items-center justify-center gap-2 text-5xl text-kid-ink sm:text-6xl">
          <span className="grid h-16 w-16 place-items-center rounded-2xl border-4 border-dashed border-orange-400 bg-white text-orange-500">
            ?
          </span>
          <span className="text-red-600">{item.family}</span>
        </span>
      </>
    ),
    speak: item.word,
    explain: `${blendParts(item).join(", ")}.`,
    options: shuffle([item.onset, ...otherOnsets(item)]).map((o) => ({ value: o, label: o })),
    answer: item.onset,
  }));

/* ------------------------------------- 5. Family sort ------------------------------------- */
// Tap every word of one family among words of other families with the same vowel, so the ending is what counts.

const SORT_PAGES = PAGES.filter((page) => wordsOf(page).length >= 3);

const makeFamilySort = () =>
  pickRandom(SORT_PAGES, 5).map((page, round) => {
    const family = L9_FAMILIES[page];
    const targets = pickRandom(wordsOf(page), 3);
    const others = pickRandom(
      WORDS.filter((w) => w.page[0] === page[0] && w.family !== family),
      3,
    );

    return {
      key: `${round}-${page}`,
      prompt: `Tap every word in the "${family}" family`,
      display: `-${family}`,
      speak: `Tap every word in the ${familySay(family)} family.`,
      items: shuffle([
        ...targets.map(({ word }) => ({ id: word, word, correct: true, plain: true })),
        ...others.map(({ word }) => ({ id: word, word, correct: false, plain: true })),
      ]),
    };
  });

/* ------------------------------------- the page ------------------------------------- */

const ACTIVITIES = [
  { id: "meet", label: "Meet the Families", emoji: "🏠", render: () => <MeetTheFamilies /> },
  { id: "match", label: "Read and Match", emoji: "🔗", render: () => <MatchGame makeRound={makeMatchRound} /> },
  {
    id: "choose",
    label: "Choose the Correct Word",
    emoji: "✅",
    render: () => <QuizGame makeQuestions={makeChooseTheWord} optionTextClass="text-3xl sm:text-4xl" />,
  },
  {
    id: "complete",
    label: "Complete the Words",
    emoji: "✏️",
    render: () => <QuizGame makeQuestions={makeCompleteTheWords} />,
  },
  { id: "sort", label: "Family Sort", emoji: "🧺", render: () => <PickAllGame makeRounds={makeFamilySort} /> },
  { id: "pages", label: "Download Worksheets", emoji: "📥", render: () => <PhonicsWorksheets level={9} /> },
];

export default function PhonicsLevel9() {
  return <PhonicsLevelLayout level={9} activities={ACTIVITIES} />;
}

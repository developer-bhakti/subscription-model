import { useState } from "react";
import { L10_SOUNDS, isDigraphPage, soundSay } from "../../data/phonicsData";
import { L10_PAGES } from "../../data/phonicsLessons";
import { L10_PICTURES } from "../../data/phonicsSheetRows";
import { CutPicture, ListenButton, MatchGame, PhonicsLevelLayout, PickAllGame, QuizGame } from "./PhonicsShared";
import PhonicsWorksheets, { WorksheetButton } from "./PhonicsWorksheets";
import { pickRandom, say, saySequence, shuffle, stopSpeaking } from "./phonicsUtils";

// LEVEL 10: Digraphs and Blends
// Follows the "Digraph" and "Blend" worksheets. A digraph is two letters that make one sound (s + h = sh). A blend is
// two consonants said together, each still heard (b + l = bl). Each page has one of them, four words, and four
// sections: Read and Trace, Read and Match, Circle the Sound, and Complete the Words. The words come from L10_PAGES
// (phonicsLessons.js), which also says what on the sheets is left out or put right.

const PAGES = Object.keys(L10_PAGES).map(Number);

// Every word, with its page and the two letters it teaches.
const WORDS = PAGES.flatMap((page) => L10_PAGES[page].map((word) => ({ word, page, sound: L10_SOUNDS[page] })));

const hasPicture = (word) => Boolean(L10_PICTURES[word]);
const PICTURED = WORDS.filter(({ word }) => hasPicture(word));
const wordsOf = (page) => WORDS.filter((w) => w.page === page);

// How the voice says each digraph and blend.
const SAY = {
  sh: "shh", ch: "chuh", th: "thuh", wh: "wuh", ph: "fuh", gh: "fuh",
  bl: "bluh", cl: "kluh", fl: "fluh", pl: "pluh", br: "bruh", cr: "kruh", dr: "druh", fr: "fruh", gr: "gruh",
  tr: "truh", sc: "skuh", sk: "skuh", sm: "smuh", sn: "snuh", sp: "spuh", st: "stuh", sw: "swuh",
};

// The sound a digraph makes, as the sheets write it.
const DIGRAPH_SOUND = { sh: "/sh/", ch: "/ch/", th: "/th/", wh: "/w/", ph: "/f/", gh: "/f/" };

// The word each page's top row uses as its example ("sh" says /sh/ as in ship).
const EXAMPLE = { 11: "brush" };
const exampleOf = (page) => EXAMPLE[page] ?? L10_PAGES[page][0];

// What a page teaches, in a sentence.
const ruleOf = (page) => {
  const sound = L10_SOUNDS[page];
  const example = exampleOf(page);

  if (isDigraphPage(page)) {
    const silent = sound === "gh" ? ' In night, light and might, "gh" makes no sound.' : "";

    return `Two letters together make one sound: "${sound}" says ${DIGRAPH_SOUND[sound]} as in ${example}.${silent}`;
  }

  const [a, b] = [...sound].map((l) => (l === "c" ? "k" : l));

  return `Two consonants together make a blend: "${sound}" says /${a}/ + /${b}/ as in ${example}.`;
};

// Letters and blends that sound the same, so a question never offers both: sc and sk, and ph and gh (as in laugh).
const SAME = [["sc", "sk"], ["ph", "gh"]];
const sameSound = (a, b) => a === b || SAME.some((g) => g.includes(a) && g.includes(b));

function WordPicture({ word, size = "lg" }) {
  const { page, box } = L10_PICTURES[word];

  return <CutPicture level={10} page={page} box={box} label={word} size={size} />;
}

// A word with its digraph or blend in colour: <b>sh</b>ip, ba<b>th</b>.
function MarkedWord({ word, sound, className = "" }) {
  const at = word.indexOf(sound);

  return (
    <span className={`font-bold text-kid-ink ${className}`}>
      {word.slice(0, at)}
      <span className="text-red-600">{sound}</span>
      {word.slice(at + sound.length)}
    </span>
  );
}

/* ------------------------------------ 1. Meet the sounds ------------------------------------ */
// The top of every page: the two letters, what they make, and the page's four words.

function SoundChips({ pages, current, onChoose }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onChoose(page)}
          aria-pressed={page === current}
          className={`kid-btn min-w-16 px-3 py-2 text-lg ${page === current ? "" : "kid-btn-soft"}`}
        >
          {L10_SOUNDS[page]}
        </button>
      ))}
    </div>
  );
}

function MeetTheSounds() {
  const [page, setPage] = useState(1);
  const [lit, setLit] = useState(-1);
  const sound = L10_SOUNDS[page];
  const digraph = isDigraphPage(page);
  const [first, second] = [...sound];

  const choose = (next) => {
    stopSpeaking();
    setLit(-1);
    setPage(next);
    say(ruleOf(next));
  };

  // A digraph: its one sound, then the example. A blend: each letter's sound, the blend, then the example.
  const hear = () =>
    saySequence(
      digraph ? [SAY[sound], exampleOf(page)] : [soundSay(first), soundSay(second), SAY[sound], exampleOf(page)],
      (step) => setLit(digraph ? (step === 0 ? 2 : step === 1 ? 3 : -1) : step),
    );

  return (
    <div>
      <p className="mb-4 text-center text-sm font-bold text-kid-soft sm:text-base">
        Pick two letters, then listen to how they sound together!
      </p>

      <div className="mb-5 flex flex-col gap-3">
        <div>
          <h3 className="mb-2 text-center text-base font-bold text-kid-ink sm:text-lg">Digraphs: two letters, one sound</h3>
          <SoundChips pages={PAGES.filter(isDigraphPage)} current={page} onChoose={choose} />
        </div>

        <div>
          <h3 className="mb-2 text-center text-base font-bold text-kid-ink sm:text-lg">Blends: two sounds said together</h3>
          <SoundChips pages={PAGES.filter((p) => !isDigraphPage(p))} current={page} onChoose={choose} />
        </div>
      </div>

      <div className="kid-card tone-white mx-auto max-w-4xl p-5 text-center sm:p-8">
        <div
          role="img"
          aria-label={`${first} and ${second} make ${sound}`}
          className="flex items-center justify-center gap-2 text-4xl font-bold sm:gap-3 sm:text-6xl"
        >
          {[first, "+", second, "=", sound].map((part, i) => {
            const tile = i === 0 || i === 2 || i === 4;
            const step = i === 0 ? 0 : i === 2 ? 1 : i === 4 ? 2 : null;

            return (
              <span
                key={i}
                aria-hidden="true"
                className={
                  tile
                    ? `rounded-2xl px-4 py-1 transition ${i === 4 ? "text-red-600" : "text-kid-ink"} ${
                        lit === step ? "scale-110 bg-kid-sun" : i === 4 ? "bg-tone-rose" : "bg-tone-butter"
                      }`
                    : "text-kid-soft"
                }
              >
                {part}
              </span>
            );
          })}
        </div>

        <p className="mx-auto mt-4 max-w-2xl text-lg font-bold text-kid-ink sm:text-xl">{ruleOf(page)}</p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <ListenButton onClick={hear}>Hear it</ListenButton>

          <WorksheetButton level={10} letter={String(page)}>
            The "{sound}" page
          </WorksheetButton>
        </div>

        <div className="tone-cycle mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {wordsOf(page).map(({ word }) => (
            <button
              key={word}
              type="button"
              onClick={() => say(word)}
              aria-label={`The word ${word}`}
              className={`kid-card kid-card-hover flex flex-col items-center gap-2 rounded-2xl p-3 ${lit === 3 && word === exampleOf(page) ? "ring-4 ring-kid-green" : ""}`}
            >
              {hasPicture(word) ? <WordPicture word={word} size="md" /> : <span className="grid h-20 place-items-center text-4xl" aria-hidden="true">🔤</span>}
              <MarkedWord word={word} sound={sound} className="text-2xl sm:text-3xl" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------ 2. Read and match ------------------------------------ */
// "Read the words and match them to the correct pictures." A round is one page's words, as on the sheets.

const makeMatchRound = () => {
  const [page] = pickRandom(PAGES, 1);

  return {
    title: `Match the "${L10_SOUNDS[page]}" words`,
    items: wordsOf(page)
      .filter(({ word }) => hasPicture(word))
      .map(({ word }) => ({ key: word, word, picture: <WordPicture word={word} size="md" /> })),
  };
};

/* ---------------------------------- 3. Circle the word ---------------------------------- */
// "Look at each picture and circle the correct word." The other words offered are from the same page, so they share
// the two letters and the child has to read the rest.

const makeCircleTheWord = () =>
  pickRandom(PICTURED, 10).map(({ word, page, sound }) => ({
    prompt: "Look at the picture. Which word is it?",
    display: (
      <span className="flex justify-center">
        <WordPicture word={word} size="xl" />
      </span>
    ),
    speak: "Look at the picture. Which word is it?",
    explain: `${word}. It has ${[...sound].join(" ")}.`,
    options: shuffle([word, ...pickRandom(L10_PAGES[page].filter((w) => w !== word), 2)]).map((w) => ({ value: w, label: w })),
    answer: word,
  }));

/* --------------------------------- 4. Complete the words --------------------------------- */
// "Write 'sh' to complete the words." The blank is wherever the two letters are in the word (ship, bath, elephant).
// The other letters offered are of the same kind: digraphs for a digraph, blends for a blend.

const otherSounds = (sound, page) => {
  const pool = PAGES.filter((p) => isDigraphPage(p) === isDigraphPage(page)).map((p) => L10_SOUNDS[p]);
  const picked = [];

  for (const candidate of shuffle(pool)) {
    if (picked.length === 2) break;
    if (sameSound(candidate, sound) || picked.some((p) => sameSound(p, candidate))) continue;

    picked.push(candidate);
  }

  return picked;
};

const makeCompleteTheWords = () =>
  pickRandom(PICTURED, 10).map(({ word, page, sound }) => {
    const at = word.indexOf(sound);

    return {
      prompt: "Which two letters are missing?",
      display: (
        <>
          <span className="flex justify-center">
            <WordPicture word={word} size="xl" />
          </span>

          <span className="mt-3 flex items-center justify-center gap-1 text-4xl text-kid-ink sm:text-5xl">
            {word.slice(0, at)}
            <span className="grid h-14 min-w-20 place-items-center rounded-2xl border-4 border-dashed border-orange-400 bg-white text-orange-500 sm:h-16">
              ?
            </span>
            {word.slice(at + sound.length)}
          </span>
        </>
      ),
      speak: word,
      explain: `${word}. ${[...sound].join(" ")} makes ${word}.`,
      options: shuffle([sound, ...otherSounds(sound, page)]).map((s) => ({ value: s, label: s })),
      answer: sound,
    };
  });

/* ------------------------------------ 5. Find the sound ------------------------------------ */
// Tap every picture whose word has the two letters, among pictures whose words do not.

const makeFindTheSound = () =>
  pickRandom(PAGES, 5).map((page, round) => {
    const sound = L10_SOUNDS[page];
    const targets = pickRandom(
      PICTURED.filter((w) => w.page === page),
      3,
    );
    const others = pickRandom(
      PICTURED.filter((w) => w.page !== page && !w.word.includes(sound) && !SAME.some((g) => g.includes(sound) && g.some((s) => w.word.includes(s)))),
      6 - targets.length,
    );
    const letters = [...sound].join(" ");

    return {
      key: `${round}-${page}`,
      prompt: `Tap every picture whose word has "${sound}"`,
      display: sound,
      speak: `Tap every picture whose word has the letters ${letters}.`,
      items: shuffle([
        ...targets.map(({ word }) => ({ id: word, word, correct: true, picture: <WordPicture word={word} size="md" /> })),
        ...others.map(({ word }) => ({ id: word, word, correct: false, picture: <WordPicture word={word} size="md" /> })),
      ]),
    };
  });

/* ------------------------------------- the page ------------------------------------- */

const ACTIVITIES = [
  { id: "meet", label: "Meet the Sounds", emoji: "🔤", render: () => <MeetTheSounds /> },
  { id: "match", label: "Read and Match", emoji: "🔗", render: () => <MatchGame makeRound={makeMatchRound} /> },
  {
    id: "circle",
    label: "Circle the Word",
    emoji: "⭕",
    render: () => <QuizGame makeQuestions={makeCircleTheWord} optionTextClass="text-3xl sm:text-4xl" />,
  },
  {
    id: "complete",
    label: "Complete the Words",
    emoji: "✏️",
    render: () => <QuizGame makeQuestions={makeCompleteTheWords} />,
  },
  { id: "find", label: "Find the Sound", emoji: "🔍", render: () => <PickAllGame makeRounds={makeFindTheSound} /> },
  { id: "pages", label: "Download Worksheets", emoji: "📥", render: () => <PhonicsWorksheets level={10} /> },
];

export default function PhonicsLevel10() {
  return <PhonicsLevelLayout level={10} activities={ACTIVITIES} />;
}

import { useEffect, useRef, useState } from "react";
import { L4_LETTERS, L4_ROWS } from "../../../data/phonicsLessons";
import { ListenButton, PhonicsLevelLayout, Picture, QuizGame, ResultCard } from "./PhonicsShared";
import PhonicsWorksheets, { WorksheetButton } from "./PhonicsWorksheets";
import { pickRandom, say, shuffle } from "./phonicsUtils";

// LEVEL 4: Phonics Rhyming Words
// Follows the "Rhyming Words" worksheets: a picture at the left of each row, and the picture that
// rhymes with it to be found among the others. Every row on the pages is used here.

// Safe words to fill a row that has fewer than two non-rhyming pictures on its sheet. None of them
// rhymes with any word on the sheets.
const FILLERS = ["sun", "ball", "cup", "car"];

// The non-rhyming pictures for a row: its own from the sheet, topped up from FILLERS to `count`.
const distractorsFor = (row, count) => {
  const own = pickRandom(row.others, count);
  const spare = FILLERS.filter((w) => !own.includes(w) && !row.rhymes.includes(w) && w !== row.word);

  return [...own, ...pickRandom(spare, count - own.length)];
};

const lastTwo = (word) => word.slice(-2);

// A word and its picture, as a tile.
function WordTile({ word, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Hear the word ${word}`}
      className={`flex flex-col items-center gap-1 rounded-2xl bg-white p-3 ring-2 ring-green-200 transition hover:scale-105 hover:ring-green-400 active:scale-95 ${className}`}
    >
      <Picture word={word} size="lg" />

      <span className="text-xl font-bold text-kid-ink sm:text-2xl">{word}</span>
    </button>
  );
}

/* ------------------------------ 1. Rhyme pairs ------------------------------ */

function RhymePairs() {
  const [letter, setLetter] = useState(L4_LETTERS[0]);
  const rows = L4_ROWS.filter((row) => row.letter === letter);

  const sing = (row) => {
    say(`${row.word}, ${row.rhymes.join(", ")}. They all rhyme!`);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <p className="mb-3 text-center text-sm font-bold text-kid-soft sm:text-base">
        Words that end with the same sound rhyme. Pick a letter to see its rhyming pairs!
      </p>

      <div className="mb-5 flex flex-wrap justify-center gap-2" role="group" aria-label="Letters">
        {L4_LETTERS.map((l) => (
          <button
            key={l}
            type="button"
            aria-pressed={l === letter}
            onClick={() => setLetter(l)}
            className={`kid-btn h-12 w-12 p-0 text-lg ${l === letter ? "" : "kid-btn-soft"}`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.word} className="kid-card tone-white flex flex-wrap items-center justify-center gap-3 p-3 sm:gap-4 sm:p-4">
            <WordTile word={row.word} onClick={() => say(row.word)} />

            <span className="text-3xl font-bold text-kid-green" aria-label="rhymes with">
              ↔
            </span>

            {row.rhymes.map((rhyme) => (
              <WordTile key={rhyme} word={rhyme} onClick={() => say(rhyme)} />
            ))}

            <ListenButton onClick={() => sing(row)}>Say them</ListenButton>
          </div>
        ))}
      </div>

      <div className="mt-5 flex justify-center">
        <WorksheetButton level={4} letter={letter} />
      </div>
    </div>
  );
}

/* ----------------------------- 2. Circle the rhyme ----------------------------- */
// The worksheet's own question: "Circle the picture that rhymes with the given word."

const makeCircleTheRhyme = () =>
  pickRandom(L4_ROWS, 10).map((row) => {
    const answer = pickRandom(row.rhymes, 1)[0];
    const options = shuffle([answer, ...distractorsFor(row, 2)]);

    return {
      prompt: `Which picture rhymes with ${row.word}?`,
      display: (
        <>
          <span className="flex justify-center">
            <Picture word={row.word} size="xl" />
          </span>
          <span className="mt-1 block text-4xl text-kid-ink sm:text-5xl">{row.word}</span>
        </>
      ),
      speak: `${row.word}. Which one rhymes with ${row.word}? ${options.join(", ")}.`,
      explain: `${row.word} and ${answer} rhyme.`,
      options: options.map((o) => ({ value: o, label: o, icon: <Picture word={o} size="md" /> })),
      answer,
    };
  });

/* ------------------------------ 3. Match the rhymes ------------------------------ */

const MATCH_PAIRS = 5;

// Five pairs from the sheets. Two rows whose words end alike (bat/cat/hat) are never in the same
// round, so every word has exactly one partner.
const makeMatchRound = () => {
  const chosen = [];
  const endings = new Set();

  for (const row of shuffle(L4_ROWS)) {
    if (chosen.length === MATCH_PAIRS) break;

    const words = [row.word, ...row.rhymes];

    if (words.some((w) => endings.has(lastTwo(w)))) continue;

    words.forEach((w) => endings.add(lastTwo(w)));
    chosen.push(row);
  }

  const pairs = chosen.map((row, key) => ({
    key,
    first: row.word,
    second: pickRandom(row.rhymes, 1)[0],
  }));

  return {
    left: shuffle(pairs.map(({ key, first }) => ({ key, word: first }))),
    right: shuffle(pairs.map(({ key, second }) => ({ key, word: second }))),
  };
};

const MATCH_HELP = "Tap a word on the left, then tap the word that rhymes with it.";

function MatchTheRhymes() {
  const [round, setRound] = useState(() => makeMatchRound());
  const [leftPick, setLeftPick] = useState(null);
  const [matched, setMatched] = useState([]);
  const [wrongKey, setWrongKey] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [message, setMessage] = useState(MATCH_HELP);
  const wrongTimer = useRef(null);

  useEffect(() => () => clearTimeout(wrongTimer.current), []);

  const finished = matched.length === MATCH_PAIRS;

  const pickLeft = (item) => {
    if (matched.includes(item.key)) return;

    // Tapping the picked word again just says it again; tapping a different word changes the pick.
    say(item.word);
    setLeftPick(item);
    setMessage("Now tap the word on the right that rhymes.");
  };

  const pickRight = (item) => {
    if (matched.includes(item.key)) return;

    say(item.word);

    if (!leftPick) {
      setMessage("Pick a word on the left first.");
      return;
    }

    if (leftPick.key === item.key) {
      setMatched((m) => [...m, item.key]);
      setMessage(`🎉 ${leftPick.word} and ${item.word} rhyme!`);
      setLeftPick(null);
    } else {
      setMistakes((m) => m + 1);
      setWrongKey(item.key);
      setMessage(`😊 ${leftPick.word} and ${item.word} do not rhyme. Try again!`);
      clearTimeout(wrongTimer.current);
      wrongTimer.current = setTimeout(() => setWrongKey(null), 700);
    }
  };

  const replay = () => {
    setRound(makeMatchRound());
    setLeftPick(null);
    setMatched([]);
    setWrongKey(null);
    setMistakes(0);
    setMessage(MATCH_HELP);
  };

  if (finished) {
    return (
      <ResultCard
        stars={mistakes <= 1 ? 3 : mistakes <= 4 ? 2 : 1}
        message={mistakes === 0 ? "Every match first time!" : `You matched all ${MATCH_PAIRS} pairs!`}
        onReplay={replay}
      />
    );
  }

  const wordButton = (item, side) => {
    const isMatched = matched.includes(item.key);
    const isPicked = side === "left" && leftPick?.key === item.key;
    const isWrong = side === "right" && wrongKey === item.key;

    return (
      <button
        key={item.word}
        type="button"
        disabled={isMatched}
        onClick={() => (side === "left" ? pickLeft(item) : pickRight(item))}
        aria-pressed={isPicked}
        className={`flex min-h-20 items-center justify-center gap-2 rounded-2xl px-2 py-3 text-xl font-bold transition active:scale-95 sm:gap-3 sm:text-3xl ${
          isMatched
            ? "bg-green-500 text-white ring-4 ring-green-600"
            : isPicked
              ? "bg-kid-sun text-kid-ink ring-4 ring-yellow-500"
              : isWrong
                ? "bg-red-500 text-white ring-4 ring-red-600"
                : "bg-white text-green-800 ring-4 ring-green-300 hover:scale-105 hover:ring-green-400"
        }`}
      >
        <Picture word={item.word} size="sm" />
        {item.word}
        {isMatched && <span aria-label="matched">✔</span>}
      </button>
    );
  };

  return (
    <div className="kid-card tone-white mx-auto w-full max-w-3xl p-4 text-center sm:p-6">
      <div className="flex items-center justify-between gap-3 text-sm font-bold text-kid-soft sm:text-base">
        <span>Match the rhymes</span>

        <span className="rounded-full bg-tone-butter px-3 py-1 text-kid-ink">
          ⭐ {matched.length} / {MATCH_PAIRS}
        </span>
      </div>

      <div className="mt-4 rounded-3xl border-4 border-dashed border-yellow-400 bg-yellow-50 p-3 sm:p-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-bold text-kid-ink sm:text-xl">Pick a word</h3>
            {round.left.map((item) => wordButton(item, "left"))}
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-base font-bold text-kid-ink sm:text-xl">Find its rhyme</h3>
            {round.right.map((item) => wordButton(item, "right"))}
          </div>
        </div>

        <p aria-live="polite" className="mt-5 min-h-8 text-base font-bold text-kid-ink sm:text-xl">
          {message}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------ 4. Odd one out ------------------------------ */

const makeOddOneOut = () =>
  pickRandom(L4_ROWS, 10).map((row) => {
    const rhyming = [row.word, pickRandom(row.rhymes, 1)[0]];
    const [odd] = distractorsFor(row, 1);
    const options = shuffle([...rhyming, odd]);

    return {
      prompt: "Two of these words rhyme. Which one does NOT rhyme?",
      speak: `${options.join(", ")}. Which word does not rhyme?`,
      explain: `${rhyming[0]} and ${rhyming[1]} rhyme. ${odd} does not.`,
      options: options.map((o) => ({ value: o, label: o, icon: <Picture word={o} size="md" /> })),
      answer: odd,
    };
  });

/* ------------------------------------- the page ------------------------------------- */

const ACTIVITIES = [
  { id: "pairs", label: "Rhyme Pairs", emoji: "👯", render: () => <RhymePairs /> },
  {
    id: "circle",
    label: "Circle the Rhyme",
    emoji: "⭕",
    render: () => <QuizGame makeQuestions={makeCircleTheRhyme} optionTextClass="text-2xl sm:text-3xl" />,
  },
  { id: "match", label: "Match the Rhymes", emoji: "🔗", render: () => <MatchTheRhymes /> },
  {
    id: "odd",
    label: "Odd One Out",
    emoji: "🕵️",
    render: () => <QuizGame makeQuestions={makeOddOneOut} optionTextClass="text-2xl sm:text-3xl" />,
  },
  { id: "pages", label: "Download Pages", emoji: "📥", render: () => <PhonicsWorksheets level={4} /> },
];

export default function PhonicsLevel4() {
  return <PhonicsLevelLayout level={4} activities={ACTIVITIES} />;
}

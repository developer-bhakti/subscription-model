import { useEffect, useRef, useState } from "react";
import { LETTERS } from "../../../data/phonicsData";
import { getLetterPage } from "../../../data/phonicsFiles";
import { L1_PAGES } from "../../../data/phonicsLessons";
import { ListenButton, PhonicsLevelLayout, Picture, PickAllGame, QuizGame, ResultCard } from "./PhonicsShared";
import PhonicsWorksheets, { WorksheetButton } from "./PhonicsWorksheets";
import { pickRandom, say, shuffle, starsFor, stripBox } from "./phonicsUtils";

// LEVEL 1: Identification of Letters (A–Z)
// Follows the "Letter Recognition" worksheets: 1 look and say, 2 find and circle the letter,
// 3 trace it, 4 colour the pictures that start with it.

/* ------------------------------ 1. Meet the letters ------------------------------ */

function LetterExplorer() {
  const [index, setIndex] = useState(0);
  const { letter } = LETTERS[index];
  const word = L1_PAGES[letter].look;

  const show = (i) => {
    const next = (i + LETTERS.length) % LETTERS.length;
    const target = LETTERS[next].letter;

    setIndex(next);
    say(`${target}. ${target} for ${L1_PAGES[target].look}`);
  };

  return (
    <div>
      <div className="kid-card tone-white mx-auto grid max-w-4xl items-center gap-5 p-5 text-center sm:p-8 md:grid-cols-2">
        <div className="flex flex-col items-center">
          <div
            className="kid-chip h-44 w-44 text-8xl font-bold text-kid-deep sm:h-52 sm:w-52 sm:text-9xl"
            aria-label={`Letter ${letter}`}
          >
            <span>
              {letter}
              <span className="text-kid-green">{letter.toLowerCase()}</span>
            </span>
          </div>
        </div>

        <div>
          <div className="flex justify-center">
            <Picture word={word} size="xl" />
          </div>

          <h3 className="mt-3 text-3xl font-bold text-kid-ink sm:text-4xl">
            {letter} is for <span className="text-orange-500">{word}</span>
          </h3>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button type="button" className="kid-btn kid-btn-soft" onClick={() => show(index - 1)}>
              ← Back
            </button>

            <ListenButton onClick={() => show(index)} />

            <button type="button" className="kid-btn" onClick={() => show(index + 1)}>
              Next →
            </button>
          </div>

          <div className="mt-3 flex justify-center">
            <WorksheetButton level={1} letter={letter} />
          </div>
        </div>
      </div>

      <p className="mt-6 mb-3 text-center text-sm font-bold text-kid-soft sm:text-base">
        Tap any letter to meet it!
      </p>

      <div className="tone-cycle grid grid-cols-5 gap-2 sm:grid-cols-7 sm:gap-3 md:grid-cols-9 lg:grid-cols-13">
        {LETTERS.map((l, i) => (
          <button
            key={l.letter}
            type="button"
            onClick={() => show(i)}
            aria-label={`Letter ${l.letter}, ${L1_PAGES[l.letter].look}`}
            aria-pressed={i === index}
            className={`kid-card kid-card-hover grid aspect-square place-items-center rounded-2xl text-2xl font-bold text-kid-ink sm:text-3xl ${
              i === index ? "ring-4 ring-kid-green" : ""
            }`}
          >
            {l.letter}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- 2. Big and small letters ----------------------------- */

// Letters that look the same in a plain font (capital I and small l) are never offered together.
const LOOKALIKE = { I: "L", L: "I" };

const makeBigAndSmall = () =>
  pickRandom(LETTERS, 10).map(({ letter }) => {
    const toSmall = Math.random() < 0.5;
    const form = (l) => (toSmall ? l.toLowerCase() : l);
    const pool = LETTERS.filter((l) => l.letter !== LOOKALIKE[letter] && l.letter !== letter);
    const others = pickRandom(pool, 3);

    return {
      prompt: toSmall ? "Find the small letter for this big letter" : "Find the big letter for this small letter",
      display: toSmall ? letter : letter.toLowerCase(),
      speak: null,
      explain: `${letter}, ${letter.toLowerCase()}.`,
      options: shuffle([letter, ...others.map((o) => o.letter)]).map((l) => ({
        value: form(l),
        label: form(l),
      })),
      answer: form(letter),
    };
  });

/* --------------------------------- 3. Letter hunt --------------------------------- */
// Worksheet step 2: "Find and circle all the A and a."

const HUNT_ROUNDS = 5;
const HUNT_TARGETS = 4;
const HUNT_TILES = 12;

const makeHuntBoard = (target) => {
  const form = () => (Math.random() < 0.5 ? "up" : "low");
  const casing = (letter, c) => (c === "up" ? letter : letter.toLowerCase());

  const targets = Array.from({ length: HUNT_TARGETS }, () => casing(target, form()));
  const others = pickRandom(
    LETTERS.filter((l) => l.letter !== target && l.letter !== LOOKALIKE[target]),
    HUNT_TILES - HUNT_TARGETS,
  ).map((l) => casing(l.letter, form()));

  return shuffle([...targets, ...others]).map((char, i) => ({ id: i, char }));
};

function LetterHunt() {
  const [targets, setTargets] = useState(() => pickRandom(LETTERS, HUNT_ROUNDS).map((l) => l.letter));
  const [round, setRound] = useState(0);
  const [board, setBoard] = useState(() => makeHuntBoard(targets[0]));
  const [found, setFound] = useState([]);
  const [wrongId, setWrongId] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [finished, setFinished] = useState(false);
  const wrongTimer = useRef(null);

  useEffect(() => () => clearTimeout(wrongTimer.current), []);

  const target = targets[round];
  const roundDone = found.length === HUNT_TARGETS;

  const tap = (tile) => {
    if (roundDone || found.includes(tile.id)) return;

    if (tile.char.toUpperCase() === target) {
      setFound((f) => [...f, tile.id]);
      say(`${target}.`);
    } else {
      setMistakes((m) => m + 1);
      setWrongId(tile.id);
      clearTimeout(wrongTimer.current);
      wrongTimer.current = setTimeout(() => setWrongId(null), 600);
    }
  };

  const nextRound = () => {
    if (round + 1 < HUNT_ROUNDS) {
      setRound(round + 1);
      setBoard(makeHuntBoard(targets[round + 1]));
      setFound([]);
    } else {
      setFinished(true);
    }
  };

  const replay = () => {
    const fresh = pickRandom(LETTERS, HUNT_ROUNDS).map((l) => l.letter);

    setTargets(fresh);
    setRound(0);
    setBoard(makeHuntBoard(fresh[0]));
    setFound([]);
    setMistakes(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <ResultCard
        stars={starsFor(Math.max(0, HUNT_ROUNDS * 2 - mistakes), HUNT_ROUNDS * 2)}
        message={mistakes === 0 ? "You found every letter without a slip!" : `You hunted down ${HUNT_ROUNDS} letters!`}
        onReplay={replay}
      />
    );
  }

  return (
    <div className="kid-card tone-white mx-auto w-full max-w-3xl p-4 text-center sm:p-6">
      <div className="flex items-center justify-between gap-3 text-sm font-bold text-kid-soft sm:text-base">
        <span>
          Letter {round + 1} of {HUNT_ROUNDS}
        </span>

        <span className="rounded-full bg-tone-butter px-3 py-1 text-kid-ink">
          Found {found.length} / {HUNT_TARGETS}
        </span>
      </div>

      <div className="mt-4 rounded-3xl border-4 border-dashed border-yellow-400 bg-yellow-50 p-4 sm:p-6">
        <h3 className="text-xl font-bold text-kid-ink sm:text-2xl">
          Find all the big and small{" "}
          <span className="text-4xl text-orange-500 sm:text-5xl">
            {target}
            {target.toLowerCase()}
          </span>
        </h3>

        <div className="mt-5 grid grid-cols-4 gap-2 sm:grid-cols-6 sm:gap-3">
          {board.map((tile) => {
            const isFound = found.includes(tile.id);
            const isWrong = wrongId === tile.id;

            return (
              <button
                key={tile.id}
                type="button"
                onClick={() => tap(tile)}
                aria-label={`Letter ${tile.char}`}
                className={`aspect-square rounded-2xl text-4xl font-bold transition active:scale-95 sm:text-5xl ${
                  isFound
                    ? "bg-green-500 text-white ring-4 ring-green-600"
                    : isWrong
                      ? "bg-red-500 text-white ring-4 ring-red-600"
                      : "bg-white text-green-800 ring-4 ring-green-300 hover:scale-105 hover:ring-green-400"
                }`}
              >
                {tile.char}
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="mt-5 min-h-8 text-xl font-bold text-kid-ink sm:text-2xl">
          {roundDone ? `🎉 You found all the ${target}s!` : wrongId !== null ? "😊 Not that one, try again!" : ""}
        </p>

        {roundDone && (
          <button type="button" onClick={nextRound} className="kid-btn kid-btn-sun mt-4 px-8 py-3 text-lg">
            {round + 1 < HUNT_ROUNDS ? "Next Letter ➜" : "See my stars ⭐"}
          </button>
        )}
      </div>
    </div>
  );
}

/* -------------------------------- 4. Picture hunt -------------------------------- */
// Worksheet step 4: "Colour the pictures that start with A." The five pictures are the ones
// printed on that letter's page.

const makePictureRounds = () =>
  pickRandom(LETTERS, 5).map(({ letter }) => {
    const page = getLetterPage(1, letter);

    return {
      key: letter,
      prompt: `Tap all the pictures that start with ${letter}`,
      display: `${letter}${letter.toLowerCase()}`,
      speak: `Tap all the pictures that start with ${letter}.`,
      items: L1_PAGES[letter].pictures.map((word, i) => ({
        id: `${letter}-${i}`,
        word,
        correct: word.toLowerCase().startsWith(letter.toLowerCase()),
        // the picture exactly as printed on the worksheet, when that page is there
        crop: page ? { src: page.image, box: stripBox(i, true) } : null,
      })),
    };
  });

/* ------------------------------------- the page ------------------------------------- */

const ACTIVITIES = [
  { id: "explore", label: "Meet the Letters", emoji: "🔤", render: () => <LetterExplorer /> },
  {
    id: "big-small",
    label: "Big & Small Letters",
    emoji: "🔡",
    render: () => <QuizGame makeQuestions={makeBigAndSmall} />,
  },
  { id: "hunt", label: "Letter Hunt", emoji: "🔍", render: () => <LetterHunt /> },
  { id: "pictures", label: "Picture Hunt", emoji: "🖼️", render: () => <PickAllGame makeRounds={makePictureRounds} /> },
  { id: "pages", label: "Download Pages", emoji: "📥", render: () => <PhonicsWorksheets level={1} /> },
];

export default function PhonicsLevel1() {
  return <PhonicsLevelLayout level={1} activities={ACTIVITIES} />;
}

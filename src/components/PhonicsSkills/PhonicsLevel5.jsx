import { Fragment, useEffect, useRef, useState } from "react";
import { LETTERS } from "../../data/phonicsData";
import { getLetterPage } from "../../data/phonicsFiles";
import { L5_PAGES, L5_WORDS } from "../../data/phonicsLessons";
import { ListenButton, PhonicsLevelLayout, PickAllGame, QuizGame, ResultCard, SheetPicture } from "./PhonicsShared";
import PhonicsWorksheets, { WorksheetButton } from "./PhonicsWorksheets";
import {
  pageRatio,
  pickRandom,
  playClap,
  say,
  sheetRowBox,
  shuffle,
  stopSpeaking,
  useClapOut,
} from "./phonicsUtils";

// LEVEL 5: Syllable Recognition
// Follows the "Syllable Recognition" worksheets: each row has a picture, a hand to clap for every syllable, the
// word split into its syllables ("Ap - ple") and the question "How many syllables?". Every word on the pages is
// used here, except the few that L5_PAGES explains.

const syllables = (count) => `${count} ${count === 1 ? "syllable" : "syllables"}`;

// The words with 1, 2, 3 and 4 syllables.
const BY_COUNT = [1, 2, 3, 4].map((count) => L5_WORDS.filter((word) => word.count === count));

const wordsWith = (count) => BY_COUNT[count - 1];

// A word's picture, as the worksheet prints it, for the "tap them all" game.
const cropOf = (word) => {
  const page = getLetterPage(5, word.letter);
  const box = sheetRowBox(5, word.letter, word.row);

  return page && box ? { src: page.image, box, ratio: pageRatio(5) } : null;
};

/* ----------------------------- 1. Clap the syllables ----------------------------- */

function SyllableExplorer() {
  const [letter, setLetter] = useState(LETTERS[0].letter);
  const clap = useClapOut();

  const rows = L5_PAGES[letter].map((row, index) => ({ ...row, index })).filter((row) => !row.skip);

  const pick = (next) => {
    clap.stop();
    setLetter(next);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <p className="mb-3 text-center text-sm font-bold text-kid-soft sm:text-base">
        A syllable is a beat in a word. Pick a letter, then tap a word to clap it out!
      </p>

      <div className="mb-5 flex flex-wrap justify-center gap-2" role="group" aria-label="Letters">
        {LETTERS.map(({ letter: l }) => (
          <button
            key={l}
            type="button"
            aria-pressed={l === letter}
            onClick={() => pick(l)}
            className={`kid-btn h-12 w-12 p-0 text-lg ${l === letter ? "" : "kid-btn-soft"}`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {rows.map((row) => {
          const key = `${letter}-${row.index}`;
          const hands = clap.state.key === key ? clap.state.hands : 0;
          const clapOut = () => clap.play(key, row.word, row.count);

          return (
            <div
              key={key}
              className="kid-card tone-white flex flex-wrap items-center justify-center gap-3 p-3 sm:gap-5 sm:p-4"
            >
              <button
                type="button"
                onClick={clapOut}
                aria-label={`Clap out ${row.word}`}
                className="rounded-2xl transition hover:scale-105 active:scale-95"
              >
                <SheetPicture level={5} letter={letter} row={row.index} word={row.word} size="lg" />
              </button>

              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-1.5" role="img" aria-label={`${row.count} claps`}>
                  {row.parts.map((_, i) => (
                    <span
                      key={i}
                      aria-hidden="true"
                      className={`grid h-12 w-12 place-items-center rounded-2xl text-3xl transition ${
                        i < hands ? "scale-110 bg-kid-sun shadow-lg" : "bg-tone-butter"
                      }`}
                    >
                      👏
                    </span>
                  ))}
                </div>

                <p className="flex flex-wrap items-center justify-center gap-x-1 text-2xl font-bold text-kid-ink sm:text-3xl">
                  {row.parts.map((part, i) => (
                    <Fragment key={i}>
                      {i > 0 && (
                        <span aria-hidden="true" className="text-kid-soft">
                          -
                        </span>
                      )}

                      <span className={`rounded-lg px-1.5 transition ${hands === i + 1 ? "bg-kid-sun" : ""}`}>{part}</span>
                    </Fragment>
                  ))}
                </p>

                <span className="kid-pill">{syllables(row.count)}</span>
              </div>

              <button type="button" onClick={clapOut} className="kid-btn kid-btn-teal">
                <span aria-hidden="true">👏</span> Clap it
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex justify-center">
        <WorksheetButton level={5} letter={letter} />
      </div>
    </div>
  );
}

/* ----------------------------- 2. How many syllables? ----------------------------- */
// The worksheet's own question: "How many syllables?" Every game has three words of 1, 2 and 3 syllables and one
// of 4, so a child meets the long words too.

const makeHowMany = () =>
  shuffle([3, 3, 3, 1].flatMap((many, i) => pickRandom(wordsWith(i + 1), many))).map((word) => ({
    prompt: "How many syllables? Clap the word to find out!",
    display: (
      <span className="flex justify-center">
        <SheetPicture level={5} letter={word.letter} row={word.row} word={word.word} size="xl" />
      </span>
    ),
    speak: `${word.word}. How many syllables?`,
    explain: `${word.word} has ${syllables(word.count)}.`,
    options: [1, 2, 3, 4].map((count) => ({
      value: String(count),
      label: String(count),
      icon: (
        <span aria-hidden="true" className="text-2xl">
          {"👏".repeat(count)}
        </span>
      ),
    })),
    answer: String(word.count),
  }));

/* ------------------------------ 3. Syllable hunt ------------------------------ */
// "Tap all the pictures with 2 syllables." Every game asks for 1, 2, 3 and 4 syllables once each, and one more.

const HUNT_RIGHT = 3;
const HUNT_WRONG = 3;

const makeSyllableRounds = () =>
  shuffle([1, 2, 3, 4, pickRandom([1, 2, 3], 1)[0]]).map((count) => {
    const right = pickRandom(wordsWith(count), HUNT_RIGHT);
    const wrong = pickRandom(
      L5_WORDS.filter((word) => word.count !== count),
      HUNT_WRONG,
    );

    return {
      key: `${count}-${right[0].word}`,
      prompt: `Tap all the pictures with ${syllables(count)}`,
      display: "👏".repeat(count),
      speak: `Tap all the words with ${syllables(count)}. Clap each one to check!`,
      items: shuffle([...right, ...wrong]).map((word) => ({
        id: `${word.letter}${word.row}`,
        word: word.word,
        correct: word.count === count,
        crop: cropOf(word),
      })),
    };
  });

/* ------------------------------ 4. Build the word ------------------------------ */

// [syllables, how many words]: three words of 2 syllables, two of 3 and one of 4, so six words in a game.
const BUILD_MIX = [
  [2, 3],
  [3, 2],
  [4, 1],
];

// The syllables of a word as tiles, in an order that is not the word's own (unless every tile is the same).
const mixedTiles = (parts) => {
  const tiles = parts.map((text, id) => ({ id, text }));
  let mixed = shuffle(tiles);

  for (let tries = 0; tries < 10 && mixed.every((tile, i) => tile.text === parts[i]) && new Set(parts).size > 1; tries += 1) {
    mixed = shuffle(tiles);
  }

  return mixed;
};

const makeBuildRounds = () =>
  shuffle(BUILD_MIX.flatMap(([count, many]) => pickRandom(wordsWith(count), many))).map((word) => ({
    ...word,
    tiles: mixedTiles(word.parts),
  }));

function BuildTheWord() {
  const [rounds, setRounds] = useState(() => makeBuildRounds());
  const [index, setIndex] = useState(0);
  const [placed, setPlaced] = useState([]);
  const [wrongId, setWrongId] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [finished, setFinished] = useState(false);
  const wrongTimer = useRef(null);

  const round = rounds[index];
  const done = placed.length === round.parts.length;

  useEffect(() => () => clearTimeout(wrongTimer.current), []);

  // Say which word to build when each round begins.
  useEffect(() => {
    if (!finished) say(`Build the word ${round.word}.`);
  }, [round, finished]);

  const tap = (tile) => {
    if (done || placed.includes(tile.id)) return;

    // The next syllable is the one the word has in that place: tiles with the same text are the same syllable.
    if (tile.text === round.parts[placed.length]) {
      const next = [...placed, tile.id];

      setPlaced(next);
      playClap();

      if (next.length === round.parts.length) say(round.word);
    } else {
      setMistakes((m) => m + 1);
      setWrongId(tile.id);
      clearTimeout(wrongTimer.current);
      wrongTimer.current = setTimeout(() => setWrongId(null), 700);
    }
  };

  const goNext = () => {
    if (index + 1 < rounds.length) {
      setIndex(index + 1);
      setPlaced([]);
      setWrongId(null);
    } else {
      stopSpeaking();
      setFinished(true);
    }
  };

  const replay = () => {
    setRounds(makeBuildRounds());
    setIndex(0);
    setPlaced([]);
    setWrongId(null);
    setMistakes(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <ResultCard
        stars={mistakes <= 1 ? 3 : mistakes <= 4 ? 2 : 1}
        message={mistakes === 0 ? "Every word built first time!" : `You built all ${rounds.length} words!`}
        onReplay={replay}
      />
    );
  }

  return (
    <div className="kid-card tone-white mx-auto w-full max-w-3xl p-4 text-center sm:p-6">
      <div className="flex items-center justify-between gap-3 text-sm font-bold text-kid-soft sm:text-base">
        <span>
          Word {index + 1} of {rounds.length}
        </span>

        <span className="rounded-full bg-tone-butter px-3 py-1 text-kid-ink">
          Built {placed.length} / {round.parts.length}
        </span>
      </div>

      <div className="mt-4 rounded-3xl border-4 border-dashed border-yellow-400 bg-yellow-50 p-4 sm:p-6">
        <h3 className="text-xl font-bold text-kid-ink sm:text-2xl">Tap the syllables in order to build the word</h3>

        <div className="mt-4 flex justify-center">
          <SheetPicture level={5} letter={round.letter} row={round.row} word={round.word} size="xl" />
        </div>

        <ListenButton onClick={() => say(round.word)} className="mt-3">
          Hear it
        </ListenButton>

        {/* the word as it is built: a box for every syllable */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {round.parts.map((part, i) => {
            const filled = i < placed.length;

            return (
              <span
                key={i}
                role="img"
                aria-label={filled ? `Syllable ${i + 1}: ${part}` : `Syllable ${i + 1}: empty`}
                className={`grid min-h-16 min-w-16 place-items-center rounded-2xl px-3 text-3xl font-bold sm:text-4xl ${
                  filled
                    ? "bg-green-500 text-white ring-4 ring-green-600"
                    : "border-4 border-dashed border-orange-400 bg-white text-orange-500"
                }`}
              >
                {filled ? part : "?"}
              </span>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {round.tiles.map((tile) => {
            const used = placed.includes(tile.id);
            const isWrong = wrongId === tile.id;

            return (
              <button
                key={tile.id}
                type="button"
                disabled={used}
                onClick={() => tap(tile)}
                className={`min-h-16 min-w-20 rounded-2xl px-4 py-3 text-3xl font-bold transition active:scale-95 disabled:cursor-default sm:text-4xl ${
                  used
                    ? "bg-white text-green-800 opacity-30 ring-4 ring-green-100"
                    : isWrong
                      ? "bg-red-500 text-white ring-4 ring-red-600"
                      : "bg-white text-green-800 ring-4 ring-green-300 hover:scale-105 hover:ring-green-400"
                }`}
              >
                {tile.text}
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="mt-5 min-h-8 text-xl font-bold text-kid-ink sm:text-2xl">
          {done ? `🎉 You built ${round.word}!` : wrongId !== null ? "😊 Not that one, try again!" : ""}
        </p>

        {done && (
          <button type="button" onClick={goNext} className="kid-btn kid-btn-sun mt-4 px-8 py-3 text-lg">
            {index + 1 < rounds.length ? "Next ➜" : "See my stars ⭐"}
          </button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------- the page ------------------------------------- */

const ACTIVITIES = [
  { id: "clap", label: "Clap the Syllables", emoji: "👏", render: () => <SyllableExplorer /> },
  { id: "count", label: "How Many Syllables?", emoji: "🔢", render: () => <QuizGame makeQuestions={makeHowMany} /> },
  { id: "hunt", label: "Syllable Hunt", emoji: "🔍", render: () => <PickAllGame makeRounds={makeSyllableRounds} /> },
  { id: "build", label: "Build the Word", emoji: "🧩", render: () => <BuildTheWord /> },
  { id: "pages", label: "Download Worksheets", emoji: "📥", render: () => <PhonicsWorksheets level={5} /> },
];

export default function PhonicsLevel5() {
  return <PhonicsLevelLayout level={5} activities={ACTIVITIES} />;
}

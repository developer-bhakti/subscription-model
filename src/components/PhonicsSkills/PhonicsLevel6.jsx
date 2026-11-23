import { useEffect, useRef, useState } from "react";
import { LETTERS, soundKey, soundSay, soundsOverlap, unitKind } from "../../data/phonicsData";
import { getLetterPage } from "../../data/phonicsFiles";
import { L6_PAGES, L6_WORDS } from "../../data/phonicsLessons";
import { ListenButton, PhonicsLevelLayout, PickAllGame, QuizGame, ResultCard, SheetPicture } from "./PhonicsShared";
import PhonicsWorksheets, { WorksheetButton } from "./PhonicsWorksheets";
import {
  pageRatio,
  pickFoils,
  pickRandom,
  say,
  saySequence,
  sheetRowBox,
  shuffle,
  stopSpeaking,
} from "./phonicsUtils";

// LEVEL 6: Sound Segmentation
// Follows the "Sound Segmentation" worksheets: say the name of each picture, listen to its sounds, then write the
// letters for the beginning, middle and ending sounds in the boxes. Every word on the pages is used here, except
// the ones L6_PAGES explains.

// The places a sound can be in a word.
const POSITION_NAMES = ["beginning", "middle", "ending"];
const POSITION_LABELS = ["Beginning Sound", "Middle Sound", "Ending Sound"];

// The colours of the three labels on the sheets: blue, yellow and pink.
const BOX_TONES = ["bg-tone-aqua", "bg-tone-butter", "bg-tone-rose"];

// The sound at a place in a word: 0 is the beginning, 1 the middle (only a word of three sounds has one) and 2 the
// ending.
const soundAt = (word, position) => {
  if (position === 0) return word.sounds[0];
  if (position === 2) return word.sounds[word.sounds.length - 1];

  return word.sounds.length === 3 ? word.sounds[1] : null;
};

// The boxes of a word: one for each sound. A word of two sounds has a Beginning and an Ending box, like the owl row
// on the sheet.
const boxesOf = (word) =>
  word.sounds.map((unit, i) => {
    const position = word.sounds.length === 2 && i === 1 ? 2 : i;

    return { unit, position, label: POSITION_LABELS[position], tone: BOX_TONES[position] };
  });

// A word's picture, as the worksheet prints it, for the "tap them all" game.
const cropOf = (word) => {
  const page = getLetterPage(6, word.letter);
  const box = sheetRowBox(6, word.letter, word.row);

  return page && box ? { src: page.image, box, ratio: pageRatio(6) } : null;
};

/* ------------------------------- 1. Sound boxes ------------------------------- */

function SoundBoxes() {
  const [letter, setLetter] = useState(LETTERS[0].letter);
  const [lit, setLit] = useState({ key: null, step: -1 });

  const rows = L6_PAGES[letter].map((row, index) => ({ ...row, index })).filter((row) => row.sounds);

  const pick = (next) => {
    stopSpeaking();
    setLit({ key: null, step: -1 });
    setLetter(next);
  };

  // The sounds one at a time, then the word, lighting up each box as it is said.
  const sayAll = (key, row) => {
    saySequence([...row.sounds.map(soundSay), row.word], (step) =>
      setLit(step < 0 ? { key: null, step: -1 } : { key, step }),
    );
  };

  return (
    <div className="mx-auto max-w-4xl">
      <p className="mb-3 text-center text-sm font-bold text-kid-soft sm:text-base">
        Every word is made of sounds. Pick a letter, then tap a box to hear its sound!
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
          const step = lit.key === key ? lit.step : -1;

          return (
            <div
              key={key}
              className="kid-card tone-white flex flex-wrap items-center justify-center gap-3 p-3 sm:gap-5 sm:p-4"
            >
              <button
                type="button"
                onClick={() => say(row.word)}
                aria-label={`Hear the word ${row.word}`}
                className="rounded-2xl transition hover:scale-105 active:scale-95"
              >
                <SheetPicture level={6} letter={letter} row={row.index} word={row.word} size="lg" />
              </button>

              <div className="flex items-start gap-2 sm:gap-3">
                {boxesOf(row).map((box, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => say(soundSay(box.unit))}
                    aria-label={`${box.label}: ${box.unit}`}
                    className="flex w-20 flex-col items-center gap-1.5 sm:w-24"
                  >
                    <span
                      className={`rounded-full px-2.5 py-1 text-center text-[11px] font-bold leading-tight text-kid-ink sm:text-xs ${box.tone}`}
                    >
                      {box.label}
                    </span>

                    <span
                      className={`grid h-16 w-16 place-items-center rounded-2xl text-4xl font-bold text-kid-ink ring-4 transition sm:h-20 sm:w-20 sm:text-5xl ${
                        step === i ? "scale-110 bg-kid-sun ring-yellow-500" : "bg-white ring-green-300"
                      }`}
                    >
                      {box.unit}
                    </span>
                  </button>
                ))}
              </div>

              <ListenButton onClick={() => sayAll(key, row)}>Say the sounds</ListenButton>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex justify-center">
        <WorksheetButton level={6} letter={letter} />
      </div>
    </div>
  );
}

/* ------------------------------ 2. Find the sound ------------------------------ */
// "Listen to the sounds": which sound is at the beginning, the middle or the end? The answers are the word's own
// sounds, so a child has to tell where each one goes.

const makeFindSound = () =>
  pickRandom(L6_WORDS, 10).map((word) => {
    const position = pickRandom(word.sounds.length === 3 ? [0, 1, 2] : [0, 2], 1)[0];
    const answer = soundAt(word, position);
    const place = POSITION_NAMES[position];

    // The word's different sounds, the right one first (gig has g twice, so it has two). A word with fewer than
    // three gets a sound that is not in it.
    const seen = new Set();
    const own = [answer, ...word.sounds].filter((unit) => {
      if (seen.has(soundKey(unit))) return false;

      seen.add(soundKey(unit));

      return true;
    });
    const options = shuffle([...own, ...pickFoils(word.sounds, word.sounds.map(unitKind), 3 - own.length)]);

    return {
      prompt: `What is the ${place} sound of this word?`,
      display: (
        <span className="flex justify-center">
          <SheetPicture level={6} letter={word.letter} row={word.row} word={word.word} size="xl" />
        </span>
      ),
      speak: `${word.word}. What is the ${place} sound of ${word.word}?`,
      explain: `The ${place} sound of ${word.word} is ${soundSay(answer)}.`,
      options: options.map((unit) => ({ value: unit, label: unit })),
      answer,
    };
  });

/* ---------------------------- 3. Fill the sound boxes ---------------------------- */
// The worksheet's own job: "Write the letters for the beginning, middle and ending sounds in the boxes." Tap the
// letter for each box in turn; a letter that does not belong in the box turns red and goes back.

const FILL_ROUNDS = 6;

// The word's letters and three that do not belong, one of the same kind (consonant, vowel, pair) for each box in
// turn, so that a letter cannot be picked out by its looks.
const makeFillRounds = () =>
  pickRandom(L6_WORDS, FILL_ROUNDS).map((word) => ({
    ...word,
    tiles: shuffle(
      [...word.sounds, ...pickFoils(word.sounds, word.sounds.map(unitKind), 3)].map((unit, id) => ({ id, unit })),
    ),
  }));

function FillTheSoundBoxes() {
  const [rounds, setRounds] = useState(() => makeFillRounds());
  const [index, setIndex] = useState(0);
  const [placed, setPlaced] = useState([]);
  const [wrongId, setWrongId] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [finished, setFinished] = useState(false);
  const wrongTimer = useRef(null);

  const round = rounds[index];
  const boxes = boxesOf(round);
  const active = placed.length;
  const done = active === boxes.length;

  useEffect(() => () => clearTimeout(wrongTimer.current), []);

  // Say the word when each round begins.
  useEffect(() => {
    if (!finished) say(round.word);
  }, [round, finished]);

  const tap = (tile) => {
    if (done || placed.includes(tile.id)) return;

    if (tile.unit === round.sounds[active]) {
      const next = [...placed, tile.id];

      setPlaced(next);

      // Every box is filled: the sounds one after the other, then the word.
      if (next.length === round.sounds.length) saySequence([...round.sounds.map(soundSay), round.word]);
    } else {
      setMistakes((m) => m + 1);
      setWrongId(tile.id);
      clearTimeout(wrongTimer.current);
      wrongTimer.current = setTimeout(() => setWrongId(null), 700);
      say(soundSay(round.sounds[active]));
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
    setRounds(makeFillRounds());
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
        message={mistakes === 0 ? "Every sound right first time!" : `You filled the boxes for all ${rounds.length} words!`}
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
          Filled {active} / {boxes.length}
        </span>
      </div>

      <div className="mt-4 rounded-3xl border-4 border-dashed border-yellow-400 bg-yellow-50 p-4 sm:p-6">
        <h3 className="text-xl font-bold text-kid-ink sm:text-2xl">
          {done ? "Every box is filled!" : `Tap the letter for the ${POSITION_NAMES[boxes[active].position]} sound`}
        </h3>

        <div className="mt-4 flex justify-center">
          <SheetPicture level={6} letter={round.letter} row={round.row} word={round.word} size="xl" />
        </div>

        <div className="mt-3 flex flex-wrap justify-center gap-3">
          <ListenButton onClick={() => say(round.word)}>Hear the word</ListenButton>

          {!done && <ListenButton onClick={() => say(soundSay(round.sounds[active]))}>Hear the sound</ListenButton>}
        </div>

        {/* the boxes, like the sheet's: one for each sound */}
        <div className="mt-5 flex items-start justify-center gap-2 sm:gap-4">
          {boxes.map((box, i) => {
            const filled = i < active;

            return (
              <div key={i} className="flex w-20 flex-col items-center gap-1.5 sm:w-24">
                <span
                  className={`rounded-full px-2.5 py-1 text-center text-[11px] font-bold leading-tight text-kid-ink sm:text-xs ${box.tone}`}
                >
                  {box.label}
                </span>

                <span
                  role="img"
                  aria-label={filled ? `${box.label}: ${box.unit}` : `${box.label}: empty`}
                  className={`grid h-16 w-16 place-items-center rounded-2xl text-4xl font-bold sm:h-20 sm:w-20 sm:text-5xl ${
                    filled
                      ? "bg-green-500 text-white ring-4 ring-green-600"
                      : i === active
                        ? "border-4 border-dashed border-orange-400 bg-white motion-safe:animate-pulse"
                        : "border-4 border-dashed border-gray-300 bg-white"
                  }`}
                >
                  {filled ? box.unit : ""}
                </span>
              </div>
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
                className={`h-16 min-w-16 rounded-2xl px-4 text-4xl font-bold transition active:scale-95 disabled:cursor-default ${
                  used
                    ? "bg-white text-green-800 opacity-30 ring-4 ring-green-100"
                    : isWrong
                      ? "bg-red-500 text-white ring-4 ring-red-600"
                      : "bg-white text-green-800 ring-4 ring-green-300 hover:scale-105 hover:ring-green-400"
                }`}
              >
                {tile.unit}
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="mt-5 min-h-8 text-xl font-bold text-kid-ink sm:text-2xl">
          {done
            ? `🎉 ${round.sounds.join(" - ")} makes ${round.word}!`
            : wrongId !== null
              ? "😊 Not that one. Listen and try again!"
              : ""}
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

/* ------------------------------ 4. Sound spotter ------------------------------ */
// "Tap all the pictures that begin with /m/", or end with a sound, or have it in the middle. Every game asks about
// the beginning, the middle and the ending at least once.

const SPOT_RIGHT = 3;
const SPOT_WRONG = 3;
const SPOT_PLACES = [0, 1, 2];

// What a word has at a place for this game: its sound there. For the middle that is only a single vowel (the middle
// of ink is n, and of goat is oa, so those words are left out), because a vowel is what the middle of a short word is.
const spotSound = (word, position) => {
  const unit = soundAt(word, position);

  return unit && (position !== 1 || unitKind(unit) === "vowel") ? unit : null;
};

// For each place, the sounds that at least three words have there, with those words.
const SPOT_TARGETS = SPOT_PLACES.map((position) => {
  const groups = new Map();

  for (const word of L6_WORDS) {
    const unit = spotSound(word, position);

    if (unit) groups.set(soundKey(unit), [...(groups.get(soundKey(unit)) ?? []), word]);
  }

  return [...groups].filter(([, words]) => words.length >= SPOT_RIGHT).map(([key, words]) => ({ key, words }));
});

const SPOT_PROMPTS = [
  (symbol) => `Tap all the pictures that begin with the /${symbol}/ sound`,
  (symbol) => `Tap all the pictures with the /${symbol}/ sound in the middle`,
  (symbol) => `Tap all the pictures that end with the /${symbol}/ sound`,
];

const SPOT_SPEECH = [
  (said) => `Tap all the pictures that begin with the sound ${said}.`,
  (said) => `Tap all the pictures with the sound ${said} in the middle.`,
  (said) => `Tap all the pictures that end with the sound ${said}.`,
];

const makeSpotRounds = () => {
  const used = new Set();

  return shuffle([...SPOT_PLACES, ...pickRandom(SPOT_PLACES, 2)]).map((position) => {
    // a sound that has not been asked for at this place yet in this game
    const [target] = pickRandom(
      SPOT_TARGETS[position].filter(({ key }) => !used.has(`${position}-${key}`)),
      1,
    );

    used.add(`${position}-${target.key}`);

    const right = pickRandom(target.words, SPOT_RIGHT);
    // A wrong picture has a different sound there, and not one that overlaps it (queen starts with /k/ and /w/).
    const wrong = pickRandom(
      L6_WORDS.filter((word) => {
        const unit = spotSound(word, position);

        return unit && !soundsOverlap(soundKey(unit), target.key);
      }),
      SPOT_WRONG,
    );

    return {
      key: `${position}-${target.key}`,
      prompt: SPOT_PROMPTS[position](target.key),
      display: `/${target.key}/`,
      speak: SPOT_SPEECH[position](soundSay(target.key)),
      items: shuffle([...right, ...wrong]).map((word) => ({
        id: `${word.letter}${word.row}`,
        word: word.word,
        correct: right.includes(word),
        crop: cropOf(word),
      })),
    };
  });
};

/* ------------------------------------- the page ------------------------------------- */

const ACTIVITIES = [
  { id: "boxes", label: "Sound Boxes", emoji: "📦", render: () => <SoundBoxes /> },
  { id: "find", label: "Find the Sound", emoji: "🎯", render: () => <QuizGame makeQuestions={makeFindSound} /> },
  { id: "fill", label: "Fill the Sound Boxes", emoji: "✏️", render: () => <FillTheSoundBoxes /> },
  { id: "spot", label: "Sound Spotter", emoji: "🔍", render: () => <PickAllGame makeRounds={makeSpotRounds} /> },
  { id: "pages", label: "Download Worksheets", emoji: "📥", render: () => <PhonicsWorksheets level={6} /> },
];

export default function PhonicsLevel6() {
  return <PhonicsLevelLayout level={6} activities={ACTIVITIES} />;
}

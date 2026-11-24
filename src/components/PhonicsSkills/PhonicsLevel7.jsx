import { useState } from "react";
import { soundSay } from "../../data/phonicsData";
import { L7_VOWELS, L7_WORDS } from "../../data/phonicsLessons";
import { ListenButton, PhonicsLevelLayout, QuizGame, SheetPicture, TileBuildGame } from "./PhonicsShared";
import PhonicsWorksheets, { WorksheetButton } from "./PhonicsWorksheets";
import { pickRandom, say, saySequence, shuffle, stopSpeaking } from "./phonicsUtils";

// LEVEL 7: Sound Blending
// Follows the "Sound Blending" worksheets: a row of tiles with one sound on each ("c" /k/, "a" /ă/, "t" /t/), an arrow,
// boxes to write the word in and a picture. Say the sounds, blend them together and you have the word. There is a page
// for each vowel with two, three and four sounds. Every word on the pages is used here, except the few that
// L7_PAGES in data/phonicsLessons.js explains.

// How a sound is written between slashes on the sheets: short vowels have a mark, and c and x say more than their name.
const MARKS = { a: "ă", e: "ĕ", i: "ĭ", o: "ŏ", u: "ŭ", c: "k", x: "ks" };

const mark = (unit) => MARKS[unit] ?? unit;

// The colours of the tiles, first to last, as on the sheets.
const TILE_TONES = ["bg-tone-rose", "bg-tone-butter", "bg-tone-lime", "bg-tone-aqua"];

const COUNT_NAMES = { 2: "Two sounds", 3: "Three sounds", 4: "Four sounds" };

// Words with a picture that shows them (not "at" beside a bat), for the games that show pictures. The two-sound ones
// are only used on the first page, where they are shown without a picture.
const PICTURE_WORDS = L7_WORDS.filter((word) => word.picture && word.count >= 3);

const spoken = (sounds) => sounds.map(soundSay).join(", ");

// The tiles of a word: its sounds, one on each tile, with the sound's mark underneath. `lit` is the tile being said.
function SoundTiles({ sounds, lit = -1, size = "md" }) {
  const big = size === "lg";

  return (
    <div className="flex flex-wrap items-start justify-center gap-2 sm:gap-3" role="img" aria-label={sounds.join(" ")}>
      {sounds.map((unit, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`flex flex-col items-center rounded-2xl px-2 pb-1.5 pt-1 text-kid-ink transition ${TILE_TONES[i]} ${
            lit === i ? "scale-110 ring-4 ring-yellow-500" : ""
          } ${big ? "min-w-16 sm:min-w-20" : "min-w-14 sm:min-w-16"}`}
        >
          <span className={`font-bold leading-tight ${big ? "text-5xl sm:text-6xl" : "text-4xl sm:text-5xl"}`}>{unit}</span>

          <span className="mt-0.5 rounded-full bg-white px-2 text-xs font-bold text-kid-deep sm:text-sm">/{mark(unit)}/</span>
        </span>
      ))}
    </div>
  );
}

/* ------------------------------- 1. Blend the sounds ------------------------------- */

function BlendTheSounds() {
  const [vowel, setVowel] = useState(L7_VOWELS[0]);
  const [count, setCount] = useState(3);
  const [lit, setLit] = useState({ key: null, step: -1 });

  const counts = [2, 3, 4].filter((n) => L7_WORDS.some((word) => word.vowel === vowel && word.count === n));
  const words = L7_WORDS.filter((word) => word.vowel === vowel && word.count === count);

  const stop = () => {
    stopSpeaking();
    setLit({ key: null, step: -1 });
  };

  const pickVowel = (next) => {
    stop();
    setVowel(next);

    // a vowel with no page of this many sounds (E and U have no useful two-sound words) opens at the first it has
    if (!L7_WORDS.some((word) => word.vowel === next && word.count === count)) {
      setCount([3, 4, 2].find((n) => L7_WORDS.some((word) => word.vowel === next && word.count === n)));
    }
  };

  const pickCount = (next) => {
    stop();
    setCount(next);
  };

  // The sounds one after another, then the word, lighting each tile as it is said.
  const blendOut = (key, word) => {
    saySequence([...word.sounds.map(soundSay), word.word], (step) =>
      setLit(step < 0 ? { key: null, step: -1 } : { key, step }),
    );
  };

  const page = `${vowel}${count}`;

  return (
    <div className="mx-auto max-w-4xl">
      <p className="mb-3 text-center text-sm font-bold text-kid-soft sm:text-base">
        Say each sound, then blend them together to make the word. Pick a vowel, then tap Blend it!
      </p>

      <div className="mb-3 flex flex-wrap justify-center gap-2" role="group" aria-label="Vowels">
        {L7_VOWELS.map((v) => (
          <button
            key={v}
            type="button"
            aria-pressed={v === vowel}
            onClick={() => pickVowel(v)}
            className={`kid-btn h-12 w-12 p-0 text-lg ${v === vowel ? "" : "kid-btn-soft"}`}
          >
            {v}
          </button>
        ))}
      </div>

      <div className="mb-5 flex flex-wrap justify-center gap-2" role="group" aria-label="Number of sounds">
        {counts.map((n) => (
          <button
            key={n}
            type="button"
            aria-pressed={n === count}
            onClick={() => pickCount(n)}
            className={`kid-btn px-4 py-2 text-sm ${n === count ? "kid-btn-teal" : "kid-btn-soft"}`}
          >
            {COUNT_NAMES[n]}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {words.map((word) => {
          const key = `${word.page}-${word.row}`;
          const step = lit.key === key ? lit.step : -1;

          return (
            <div
              key={key}
              className="kid-card tone-white flex flex-wrap items-center justify-center gap-3 p-3 sm:gap-5 sm:p-4"
            >
              {word.picture && (
                <button
                  type="button"
                  onClick={() => say(word.word)}
                  aria-label={`Hear the word ${word.word}`}
                  className="rounded-2xl transition hover:scale-105 active:scale-95"
                >
                  <SheetPicture level={7} letter={word.page} row={word.row} word={word.word} size="md" />
                </button>
              )}

              <div className="flex flex-col items-center gap-2">
                <SoundTiles sounds={word.sounds} lit={step} />

                <p className="flex items-center gap-2 text-2xl font-bold sm:text-3xl" aria-label={`The word is ${word.word}`}>
                  <span aria-hidden="true" className="text-kid-soft">
                    →
                  </span>

                  <span
                    className={`rounded-xl px-3 py-0.5 transition ${
                      step === word.sounds.length ? "bg-kid-sun text-kid-ink" : "bg-tone-aqua text-kid-ink"
                    }`}
                  >
                    {word.word}
                  </span>
                </p>
              </div>

              <ListenButton onClick={() => blendOut(key, word)}>Blend it</ListenButton>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex justify-center">
        <WorksheetButton level={7} letter={page} />
      </div>
    </div>
  );
}

/* ------------------------------ 2. Blend and choose ------------------------------ */
// The worksheet's own job: "Say the sounds. Blend them together and write the word." Here the child picks the word.

// Two wrong words for a word: words with the same number of sounds, from the same vowel where there are enough (so the
// child has to blend the consonants, not just spot the vowel).
const foilsFor = (word) => {
  const others = PICTURE_WORDS.filter((w) => w.word !== word.word && w.count === word.count);
  const sameVowel = shuffle(others.filter((w) => w.vowel === word.vowel));
  const rest = shuffle(others.filter((w) => w.vowel !== word.vowel));

  return [...sameVowel, ...rest].slice(0, 2);
};

const wordOptions = (word, withPictures) =>
  shuffle([word, ...foilsFor(word)]).map((w) => ({
    value: w.word,
    label: w.word,
    icon: withPictures ? <SheetPicture level={7} letter={w.page} row={w.row} word={w.word} size="md" /> : null,
  }));

const makeBlendAndChoose = () =>
  pickRandom(PICTURE_WORDS, 10).map((word) => ({
    prompt: "Say the sounds and blend them. What is the word?",
    display: <SoundTiles sounds={word.sounds} size="lg" />,
    speak: `${spoken(word.sounds)}. What is the word?`,
    explain: `${spoken(word.sounds)} makes ${word.word}.`,
    options: wordOptions(word, true),
    answer: word.word,
  }));

/* ------------------------------ 3. Listen and pick ------------------------------ */
// The sounds are only heard, never seen: which picture is the word they make? The names under the pictures stay hidden
// until the child has answered.

const makeListenAndPick = () =>
  pickRandom(PICTURE_WORDS, 10).map((word) => ({
    prompt: "Listen to the sounds and blend them. Which picture is it?",
    display: "👂",
    speak: `Listen. ${spoken(word.sounds)}. Which picture is it?`,
    explain: `${spoken(word.sounds)} makes ${word.word}.`,
    options: wordOptions(word, true),
    answer: word.word,
  }));

/* ------------------------------ 4. Build the word ------------------------------ */

// Three words of three sounds and three of four sounds, each with its sound tiles in a mixed-up order.
const makeBuildRounds = () =>
  shuffle([...pickRandom(PICTURE_WORDS.filter((w) => w.count === 3), 3), ...pickRandom(PICTURE_WORDS.filter((w) => w.count === 4), 3)]).map(
    (word) => {
      const tiles = word.sounds.map((text, id) => ({ id, text }));
      let mixed = shuffle(tiles);

      // not already in order, unless every tile is the same
      for (let tries = 0; tries < 10 && mixed.every((t, i) => t.text === word.sounds[i]); tries += 1) mixed = shuffle(tiles);

      return {
        key: `${word.page}-${word.row}`,
        word: word.word,
        parts: word.sounds,
        tiles: mixed,
        picture: <SheetPicture level={7} letter={word.page} row={word.row} word={word.word} size="xl" />,
      };
    },
  );

/* ------------------------------------- the page ------------------------------------- */

const ACTIVITIES = [
  { id: "blend", label: "Blend the Sounds", emoji: "🔗", render: () => <BlendTheSounds /> },
  { id: "choose", label: "Blend and Choose", emoji: "🎯", render: () => <QuizGame makeQuestions={makeBlendAndChoose} optionTextClass="text-2xl sm:text-3xl" /> },
  {
    id: "listen",
    label: "Listen and Pick",
    emoji: "👂",
    render: () => <QuizGame makeQuestions={makeListenAndPick} optionTextClass="text-2xl sm:text-3xl" hideLabels />,
  },
  {
    id: "build",
    label: "Build the Word",
    emoji: "🧩",
    render: () => (
      <TileBuildGame makeRounds={makeBuildRounds} heading="Tap the sounds in order to build the word" sayTile={soundSay} unit="sound" />
    ),
  },
  { id: "pages", label: "Download Worksheets", emoji: "📥", render: () => <PhonicsWorksheets level={7} /> },
];

export default function PhonicsLevel7() {
  return <PhonicsLevelLayout level={7} activities={ACTIVITIES} />;
}

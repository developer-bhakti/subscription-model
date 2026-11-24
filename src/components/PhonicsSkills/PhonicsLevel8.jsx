import { useEffect, useRef, useState } from "react";
import { soundSay } from "../../data/phonicsData";
import { L8_CHANGES, L8_SPELLING, L8_WORDS } from "../../data/phonicsLessons";
import { CvcPicture, ListenButton, PhonicsLevelLayout, QuizGame, ResultCard, TileBuildGame } from "./PhonicsShared";
import PhonicsWorksheets, { WorksheetButton } from "./PhonicsWorksheets";
import { pickRandom, say, saySequence, shuffle, stopSpeaking } from "./phonicsUtils";

// LEVEL 8: CVC Words
// Follows the "CVC Words" worksheets. A CVC word has three letters and three sounds: a consonant, a vowel and a
// consonant (cat). The pages: 1 the pattern, 2 to 4 identify the sounds and blend them, 5 and 6 match pictures with
// words, 7 and 8 complete the letters, 9 and 10 arrange the letters, 11 and 12 change one letter, 13 and 14 read and
// choose the picture, 15 and 16 an assessment.

const VOWELS = ["a", "e", "i", "o", "u"];

const upper = (word) => word.toUpperCase();

// The words of the "Complete the Letters" and "Arrange the Letters" pages, with their sounds.
const SPELLING_WORDS = L8_WORDS.filter(({ word }) => L8_SPELLING.includes(word));

const spoken = (word) => [...word].map(soundSay).join(", ");

// The three tiles of a CVC word, coloured as on page 1 (consonant, vowel, consonant) with the sound under each letter.
const TILE_TONES = ["bg-tone-rose", "bg-tone-butter", "bg-tone-lime"];
const TILE_ROLES = ["Consonant", "Vowel", "Consonant"];
const MARKS = { a: "ă", e: "ĕ", i: "ĭ", o: "ŏ", u: "ŭ", c: "k", x: "ks" };

function CvcTiles({ word, lit = -1 }) {
  return (
    <div className="flex items-start justify-center gap-2 sm:gap-3" role="img" aria-label={[...word].join(" ")}>
      {[...word].map((letter, i) => (
        <span key={i} aria-hidden="true" className="flex flex-col items-center gap-1">
          <span
            className={`flex min-w-20 flex-col items-center rounded-2xl px-3 pb-1.5 pt-1 text-kid-ink transition sm:min-w-24 ${TILE_TONES[i]} ${
              lit === i ? "scale-110 ring-4 ring-yellow-500" : ""
            }`}
          >
            <span className="text-6xl font-bold leading-tight sm:text-7xl">{letter}</span>

            <span className="rounded-full bg-white px-2.5 text-sm font-bold text-kid-deep sm:text-base">
              /{MARKS[letter] ?? letter}/
            </span>
          </span>

          <span className="text-xs font-bold text-kid-soft sm:text-sm">{TILE_ROLES[i]}</span>
        </span>
      ))}
    </div>
  );
}

/* ------------------------------ 1. Meet the CVC words ------------------------------ */
// Pages 1 to 4: look at the picture, say the sounds of the letters, blend them and read the word.

function MeetTheCvcWords() {
  const [index, setIndex] = useState(0);
  const [lit, setLit] = useState(-1);
  const { word } = L8_WORDS[index];

  const choose = (i) => {
    stopSpeaking();
    setLit(-1);
    setIndex(i);
    say(L8_WORDS[i].word);
  };

  // The three sounds one after another, then the word, lighting each tile as it is said (the word itself is step 3).
  const blendOut = () => {
    saySequence([...[...word].map(soundSay), word], setLit);
  };

  return (
    <div>
      <p className="mb-4 text-center text-sm font-bold text-kid-soft sm:text-base">
        A CVC word has three letters and three sounds: a consonant, a vowel and a consonant. Pick a word, then blend its sounds!
      </p>

      <div className="kid-card tone-white mx-auto grid max-w-4xl items-center gap-5 p-5 text-center sm:p-8 md:grid-cols-2">
        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => say(word)}
            aria-label={`Hear the word ${word}`}
            className="rounded-2xl transition hover:scale-105 active:scale-95"
          >
            <CvcPicture word={word} size="xl" />
          </button>

          <p
            className={`rounded-2xl px-6 py-1 text-5xl font-bold transition sm:text-6xl ${
              lit === 3 ? "bg-kid-sun text-kid-ink" : "bg-tone-aqua text-kid-ink"
            }`}
          >
            {upper(word)}
          </p>
        </div>

        <div>
          <CvcTiles word={word} lit={lit} />

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button type="button" className="kid-btn kid-btn-soft" onClick={() => choose((index + L8_WORDS.length - 1) % L8_WORDS.length)}>
              ← Back
            </button>

            <ListenButton onClick={blendOut}>Blend it</ListenButton>

            <button type="button" className="kid-btn" onClick={() => choose((index + 1) % L8_WORDS.length)}>
              Next →
            </button>
          </div>

          <div className="mt-3 flex justify-center">
            <WorksheetButton level={8} letter="1">
              The CVC pattern page
            </WorksheetButton>
          </div>
        </div>
      </div>

      <p className="mb-3 mt-6 text-center text-sm font-bold text-kid-soft sm:text-base">Tap any word!</p>

      <div className="tone-cycle grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4 md:grid-cols-6">
        {L8_WORDS.map((item, i) => (
          <button
            key={item.word}
            type="button"
            onClick={() => choose(i)}
            aria-pressed={i === index}
            aria-label={`The word ${item.word}`}
            className={`kid-card kid-card-hover flex flex-col items-center gap-1 rounded-2xl p-2 text-center ${
              i === index ? "ring-4 ring-kid-green" : ""
            }`}
          >
            <CvcPicture word={item.word} size="sm" />

            <span className="text-lg font-bold text-kid-ink sm:text-xl">{item.word}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------- 2. Match the pictures ---------------------------- */
// Pages 5 and 6: "Look at each picture. Read the CVC words. Match each picture with the correct word."

const MATCH_PAIRS = 5;

const makeMatchRound = () => {
  const words = pickRandom(L8_WORDS, MATCH_PAIRS).map(({ word }, key) => ({ key, word }));

  return { left: words, right: shuffle(words) };
};

const MATCH_HELP = "Tap a picture on the left, then tap its word.";

function MatchThePictures() {
  const [round, setRound] = useState(() => makeMatchRound());
  const [leftPick, setLeftPick] = useState(null);
  const [matched, setMatched] = useState([]);
  const [wrongKey, setWrongKey] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [message, setMessage] = useState(MATCH_HELP);
  const wrongTimer = useRef(null);

  useEffect(() => () => clearTimeout(wrongTimer.current), []);

  const pickLeft = (item) => {
    if (matched.includes(item.key)) return;

    say(item.word);
    setLeftPick(item);
    setMessage("Now tap the word that goes with the picture.");
  };

  const pickRight = (item) => {
    if (matched.includes(item.key)) return;

    say(item.word);

    if (!leftPick) {
      setMessage("Pick a picture on the left first.");
      return;
    }

    if (leftPick.key === item.key) {
      setMatched((m) => [...m, item.key]);
      setMessage(`🎉 That is ${item.word}!`);
      setLeftPick(null);
    } else {
      setMistakes((m) => m + 1);
      setWrongKey(item.key);
      setMessage(`😊 That picture is not ${item.word}. Try again!`);
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

  if (matched.length === MATCH_PAIRS) {
    return (
      <ResultCard
        stars={mistakes <= 1 ? 3 : mistakes <= 4 ? 2 : 1}
        message={mistakes === 0 ? "Every match first time!" : `You matched all ${MATCH_PAIRS} pictures!`}
        onReplay={replay}
      />
    );
  }

  return (
    <div className="kid-card tone-white mx-auto w-full max-w-3xl p-4 text-center sm:p-6">
      <div className="flex items-center justify-between gap-3 text-sm font-bold text-kid-soft sm:text-base">
        <span>Match the pictures</span>

        <span className="rounded-full bg-tone-butter px-3 py-1 text-kid-ink">
          ⭐ {matched.length} / {MATCH_PAIRS}
        </span>
      </div>

      <div className="mt-4 rounded-3xl border-4 border-dashed border-yellow-400 bg-yellow-50 p-3 sm:p-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-bold text-kid-ink sm:text-xl">Pick a picture</h3>

            {round.left.map((item) => {
              const isMatched = matched.includes(item.key);
              const isPicked = leftPick?.key === item.key;

              return (
                <button
                  key={item.key}
                  type="button"
                  disabled={isMatched}
                  onClick={() => pickLeft(item)}
                  aria-pressed={isPicked}
                  aria-label={`Picture of a ${item.word}`}
                  className={`flex min-h-24 items-center justify-center rounded-2xl px-2 py-2 transition active:scale-95 ${
                    isMatched
                      ? "bg-green-500 ring-4 ring-green-600"
                      : isPicked
                        ? "bg-kid-sun ring-4 ring-yellow-500"
                        : "bg-white ring-4 ring-green-300 hover:scale-105 hover:ring-green-400"
                  }`}
                >
                  <CvcPicture word={item.word} size="sm" />
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-base font-bold text-kid-ink sm:text-xl">Find its word</h3>

            {round.right.map((item) => {
              const isMatched = matched.includes(item.key);
              const isWrong = wrongKey === item.key;

              return (
                <button
                  key={item.word}
                  type="button"
                  disabled={isMatched}
                  onClick={() => pickRight(item)}
                  className={`flex min-h-24 items-center justify-center gap-2 rounded-2xl px-2 py-3 text-2xl font-bold transition active:scale-95 sm:text-4xl ${
                    isMatched
                      ? "bg-green-500 text-white ring-4 ring-green-600"
                      : isWrong
                        ? "bg-red-500 text-white ring-4 ring-red-600"
                        : "bg-white text-green-800 ring-4 ring-green-300 hover:scale-105 hover:ring-green-400"
                  }`}
                >
                  {upper(item.word)}
                  {isMatched && <span aria-label="matched">✔</span>}
                </button>
              );
            })}
          </div>
        </div>

        <p aria-live="polite" className="mt-5 min-h-8 text-base font-bold text-kid-ink sm:text-xl">
          {message}
        </p>
      </div>
    </div>
  );
}

/* --------------------------- 3. Complete the letters --------------------------- */
// Pages 7 and 8: "Look at each picture. Say the word. Write the missing letter to complete the word." The missing letter
// is always the vowel in the middle.

const makeCompleteTheLetters = () =>
  pickRandom(SPELLING_WORDS, 10).map(({ word }) => {
    const answer = word[1];
    const options = shuffle([answer, ...pickRandom(VOWELS.filter((v) => v !== answer), 2)]);

    return {
      prompt: "Which letter is missing?",
      display: (
        <>
          <span className="flex justify-center">
            <CvcPicture word={word} size="xl" />
          </span>

          <span className="mt-2 block text-4xl tracking-widest text-kid-ink sm:text-5xl">
            {upper(word[0])} _ {upper(word[2])}
          </span>
        </>
      ),
      speak: word,
      explain: `${spoken(word)}. ${word}.`,
      options: options.map((v) => ({ value: v, label: upper(v) })),
      answer,
    };
  });

/* --------------------------- 4. Arrange the letters --------------------------- */
// Pages 9 and 10: "Use the given letters to arrange and make the word."

const makeArrangeRounds = () =>
  pickRandom(SPELLING_WORDS, 6).map(({ word }) => {
    const letters = [...upper(word)];
    const tiles = letters.map((text, id) => ({ id, text }));
    let mixed = shuffle(tiles);

    // not already in order (the letters of these words are all different)
    for (let tries = 0; tries < 10 && mixed.every((t, i) => t.text === letters[i]); tries += 1) mixed = shuffle(tiles);

    return {
      key: word,
      word,
      parts: letters,
      tiles: mixed,
      picture: <CvcPicture word={word} size="xl" />,
    };
  });

/* --------------------------- 5. Change one letter --------------------------- */
// Pages 11 and 12: "Change one letter in the given word to make a new word."

// Words a wrong answer can be: every word on the pages and every new word the pages make.
const ALL_WORDS = [...new Set([...L8_WORDS.map(({ word }) => word), ...L8_CHANGES.map(({ result }) => result)])];

const makeChangeOneLetter = () =>
  pickRandom(L8_CHANGES, 10).map(({ word, from, to, result }) => {
    // a wrong answer is the word left as it was, or a different word altogether
    const [other] = pickRandom(
      ALL_WORDS.filter((w) => w !== word && w !== result),
      1,
    );
    const options = shuffle([result, word, other]);

    return {
      prompt: `Change ${upper(from)} to ${upper(to)}. What is the new word?`,
      display: (
        <>
          <span className="flex justify-center">
            <CvcPicture word={word} size="lg" />
          </span>

          <span className="mt-2 flex items-center justify-center gap-2 text-4xl font-bold text-kid-ink sm:text-5xl">
            {[...word].map((letter, i) => (
              <span
                key={i}
                className={`grid h-14 w-14 place-items-center rounded-2xl sm:h-16 sm:w-16 ${
                  letter === from && word.indexOf(from) === i ? "bg-tone-rose text-red-600" : "bg-tone-butter"
                }`}
              >
                {upper(letter)}
              </span>
            ))}
          </span>
        </>
      ),
      speak: `${word}. Change ${from} to ${to}. What is the new word?`,
      explain: `${upper(word)} with ${upper(to)} instead of ${upper(from)} is ${result}.`,
      options: options.map((w) => ({ value: w, label: upper(w) })),
      answer: result,
    };
  });

/* ------------------------------------- the page ------------------------------------- */

const ACTIVITIES = [
  { id: "meet", label: "Meet the CVC Words", emoji: "🐱", render: () => <MeetTheCvcWords /> },
  { id: "match", label: "Match the Pictures", emoji: "🔗", render: () => <MatchThePictures /> },
  {
    id: "complete",
    label: "Complete the Letters",
    emoji: "✏️",
    render: () => <QuizGame makeQuestions={makeCompleteTheLetters} />,
  },
  {
    id: "arrange",
    label: "Arrange the Letters",
    emoji: "🔀",
    render: () => (
      <TileBuildGame
        makeRounds={makeArrangeRounds}
        heading="Tap the letters in order to make the word"
        sayTile={(letter) => soundSay(letter.toLowerCase())}
        unit="letter"
      />
    ),
  },
  {
    id: "change",
    label: "Change One Letter",
    emoji: "🔄",
    render: () => <QuizGame makeQuestions={makeChangeOneLetter} optionTextClass="text-3xl sm:text-4xl" />,
  },
  { id: "pages", label: "Download Worksheets", emoji: "📥", render: () => <PhonicsWorksheets level={8} /> },
];

export default function PhonicsLevel8() {
  return <PhonicsLevelLayout level={8} activities={ACTIVITIES} />;
}

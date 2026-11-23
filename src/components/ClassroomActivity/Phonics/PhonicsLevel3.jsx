import { Fragment, useState } from "react";
import { getLetterPage } from "../../../data/phonicsFiles";
import { LETTERS, SAME_SOUND_GROUPS } from "../../../data/phonicsData";
import { L2_PAGES, L3_STORIES, SOUND_OUT_WORDS } from "../../../data/phonicsLessons";
import { ListenButton, PhonicsLevelLayout, Picture, QuizGame, SoundOutPanel } from "./PhonicsShared";
import PhonicsWorksheets, { WorksheetButton } from "./PhonicsWorksheets";
import { hasPicture, pickRandom, say, shuffle, stopSpeaking, useSoundOut } from "./phonicsUtils";

// LEVEL 3: Phonics with Stories
// One story poster for every letter: a three-line story about three words that start with it.

const sayFor = (letter) => LETTERS.find((l) => l.letter === letter)?.say ?? letter.toLowerCase();

// The words a story is about (the ones in [square brackets]), each once, in lower case.
const keyWordsOf = (letter) => [
  ...new Set((L3_STORIES[letter].join(" ").match(/\[([^\]]+)\]/g) || []).map((w) => w.slice(1, -1).toLowerCase())),
];

const sameSoundGroup = (a, b) => SAME_SOUND_GROUPS.some((g) => g.includes(a) && g.includes(b));

// "A [cat] sat." -> [{ type: "word", text: "A" }, { type: "focus", text: "cat" }, ...]
// Every real word can be tapped to be read; the [bracketed] ones are the phonics words.
const parseLine = (line) =>
  line
    .split(/(\[[^\]]+\])/)
    .flatMap((part) => {
      if (part.startsWith("[")) return [{ type: "focus", text: part.slice(1, -1) }];

      return part
        .split(/(\s+)/)
        .filter(Boolean)
        .map((piece) => ({
          type: /[A-Za-z]/.test(piece) ? "word" : "plain",
          text: piece,
        }));
    });

const plainText = (lines) => lines.map((line) => line.replace(/[[\]]/g, "")).join(" ");

// A word whose letters can be sounded out one by one (not "ice cream" or "x-ray").
const canSoundOut = (word) => /^[a-z]+$/.test(word);

/* ------------------------------- the story reader ------------------------------- */

function StoryReader({ letter, onSelect, onClose }) {
  const [quiz, setQuiz] = useState(false);
  const [word, setWord] = useState(null);
  const sound = useSoundOut();

  const lines = L3_STORIES[letter];
  const poster = getLetterPage(3, letter);
  const index = LETTERS.findIndex((l) => l.letter === letter);
  const previous = LETTERS[(index + LETTERS.length - 1) % LETTERS.length].letter;
  const following = LETTERS[(index + 1) % LETTERS.length].letter;

  const tapFocusWord = (text) => {
    const clean = text.toLowerCase();

    if (canSoundOut(clean)) {
      setWord(clean);
      sound.play(clean);
    } else {
      setWord(null);
      sound.reset();
      say(clean);
    }
  };

  const tapWord = (text) => {
    const clean = text.replace(/[^A-Za-z']/g, "");

    if (clean) say(clean);
  };

  // Three questions, each asking which of three words starts with the story's sound. The other two
  // words come from other letters' stories, never from a letter that sounds the same.
  const makeQuiz = () => {
    const { sound: soundText } = L2_PAGES[letter];
    const targets = keyWordsOf(letter).filter((w) => w.startsWith(letter.toLowerCase()));
    const pool = LETTERS.filter((l) => l.letter !== letter && !sameSoundGroup(l.letter, letter)).flatMap((l) =>
      keyWordsOf(l.letter).filter((w) => w.startsWith(l.letter.toLowerCase())),
    );

    return pickRandom(targets, 3).map((answer) => ({
      prompt: `Which word from the story starts with the sound /${soundText}/?`,
      display: `${letter}${letter.toLowerCase()}`,
      speak: `Which word starts with the sound ${sayFor(letter)}?`,
      explain: `${answer} starts with ${sayFor(letter)}.`,
      options: shuffle([answer, ...pickRandom(pool, 2)]).map((o) => ({
        value: o,
        label: o,
        // a word with no picture (gate, park, under...) is just shown as a word
        icon: hasPicture(o) ? <Picture word={o} size="md" /> : null,
      })),
      answer,
    }));
  };

  if (quiz) {
    return (
      <div>
        <h3 className="mb-4 text-center text-2xl font-bold text-kid-ink">🎯 Story Quiz: {letter}</h3>

        <QuizGame makeQuestions={makeQuiz} optionTextClass="text-2xl sm:text-3xl" />

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <button type="button" className="kid-btn kid-btn-soft" onClick={() => setQuiz(false)}>
            ← Read the story again
          </button>

          <button type="button" className="kid-btn" onClick={onClose}>
            More stories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-3 flex items-center justify-between gap-3">
        <button type="button" className="kid-btn kid-btn-soft" onClick={onClose}>
          ← All stories
        </button>

        <span className="kid-pill">
          STORY {letter}
          {letter.toLowerCase()}
        </span>
      </div>

      <div className="grid items-start gap-5 md:grid-cols-2">
        <div className="kid-card tone-white p-3 text-center">
          {poster ? (
            <img
              src={poster.image}
              alt={`Story poster for the letter ${letter}`}
              className="mx-auto block h-auto max-h-[75vh] w-auto max-w-full rounded-2xl"
            />
          ) : (
            <div className="grid h-64 place-items-center">
              <Picture word={keyWordsOf(letter)[0]} size="xl" />
            </div>
          )}

          <div className="mt-3 flex justify-center">
            <WorksheetButton level={3} letter={letter}>
              See the poster bigger
            </WorksheetButton>
          </div>
        </div>

        <div className="kid-card tone-white p-4 text-center sm:p-6">
          <h3 className="text-xl font-bold text-kid-ink sm:text-2xl">
            {letter}
            {letter.toLowerCase()} says /{L2_PAGES[letter].sound}/
          </h3>

          <div className="mt-4 space-y-2 text-2xl font-semibold leading-relaxed text-kid-ink sm:text-3xl sm:leading-relaxed">
            {lines.map((line, lineIndex) => (
              <p key={lineIndex}>
                {parseLine(line).map((token, i) => {
                  if (token.type === "plain") return <Fragment key={i}>{token.text}</Fragment>;

                  if (token.type === "focus") {
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => tapFocusWord(token.text)}
                        className={`mx-0.5 rounded-xl px-2 font-bold transition hover:scale-105 active:scale-95 ${
                          word === token.text.toLowerCase()
                            ? "bg-kid-sun text-kid-ink"
                            : "bg-tone-butter text-orange-600 underline decoration-wavy decoration-orange-400"
                        }`}
                      >
                        {token.text}
                      </button>
                    );
                  }

                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => tapWord(token.text)}
                      className="rounded-lg px-0.5 transition hover:bg-tone-mint"
                    >
                      {token.text}
                    </button>
                  );
                })}
              </p>
            ))}
          </div>

          <p className="mt-3 text-xs font-semibold text-kid-soft sm:text-sm">
            Tap a <span className="font-bold text-orange-600">coloured word</span> to sound it out, or tap any word to
            hear it.
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <ListenButton onClick={() => say(plainText(lines), { rate: 0.7 })}>Read to me</ListenButton>

            <button
              type="button"
              className="kid-btn kid-btn-sun"
              onClick={() => {
                stopSpeaking();
                setQuiz(true);
              }}
            >
              Take the Quiz 🎯
            </button>
          </div>

          {word && (
            <div className="mt-5">
              <SoundOutPanel word={word} active={sound.active} onPlay={sound.play} />
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <button type="button" className="kid-btn kid-btn-soft" onClick={() => onSelect(previous)}>
          ← Story {previous}
        </button>

        <button type="button" className="kid-btn" onClick={() => onSelect(following)}>
          Story {following} →
        </button>
      </div>
    </div>
  );
}

/* ------------------------------- 1. Story time ------------------------------- */

function StoryTime() {
  const [letter, setLetter] = useState(null);

  if (letter) {
    return <StoryReader key={letter} letter={letter} onSelect={setLetter} onClose={() => setLetter(null)} />;
  }

  return (
    <div>
      <p className="mb-4 text-center text-base font-semibold text-kid-soft sm:text-lg">
        Pick a letter to read its story. Sound out the coloured words, then take the quiz!
      </p>

      <div className="tone-cycle grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4 md:grid-cols-7 xl:grid-cols-9">
        {LETTERS.map(({ letter: l }) => (
          <button
            key={l}
            type="button"
            onClick={() => setLetter(l)}
            aria-label={`Story for the letter ${l}: ${keyWordsOf(l).slice(0, 3).join(", ")}`}
            className="kid-card kid-card-hover flex flex-col items-center gap-1 p-3 text-center"
          >
            <span className="text-3xl font-bold text-kid-ink sm:text-4xl">
              {l}
              <span className="text-kid-green">{l.toLowerCase()}</span>
            </span>

            <Picture word={keyWordsOf(l)[0]} size="md" />

            <span className="text-xs font-bold text-kid-soft sm:text-sm">{keyWordsOf(l)[0]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- 2. Sound it out ----------------------------- */

function SoundItOut() {
  const [word, setWord] = useState(SOUND_OUT_WORDS[0]);
  const sound = useSoundOut();

  const choose = (w) => {
    setWord(w);
    sound.play(w);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <p className="mb-4 text-center text-base font-semibold text-kid-soft sm:text-lg">
        Every sound is a letter. Put the sounds together to read the word!
      </p>

      <div className="flex justify-center">
        <Picture word={word} size="xl" />
      </div>

      <div className="mt-4">
        <SoundOutPanel word={word} active={sound.active} onPlay={sound.play} />
      </div>

      <p className="mt-6 mb-3 text-center text-sm font-bold text-kid-soft sm:text-base">Pick another word</p>

      <div className="tone-cycle grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-3 md:grid-cols-6">
        {SOUND_OUT_WORDS.map((w) => (
          <button
            key={w}
            type="button"
            onClick={() => choose(w)}
            aria-pressed={w === word}
            className={`kid-card kid-card-hover flex flex-col items-center gap-1 rounded-2xl p-3 text-xl font-bold text-kid-ink sm:text-2xl ${
              w === word ? "ring-4 ring-kid-green" : ""
            }`}
          >
            <Picture word={w} size="sm" />
            {w}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------- the page ------------------------------------- */

const ACTIVITIES = [
  { id: "stories", label: "Story Time", emoji: "📚", render: () => <StoryTime /> },
  { id: "sound-out", label: "Sound It Out", emoji: "🧩", render: () => <SoundItOut /> },
  { id: "pages", label: "Download Worksheets", emoji: "📥", render: () => <PhonicsWorksheets level={3} /> },
];

export default function PhonicsLevel3() {
  return <PhonicsLevelLayout level={3} activities={ACTIVITIES} />;
}

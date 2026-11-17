import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton, PageHero } from "../../KidsUI";
import { PHONICS_HUB_PATH, PHONICS_LEVELS } from "../../../data/phonicsData";
import { FRAME, emojiOf } from "../../../data/phonicsLessons";
import { PAGE_RATIO, say, speechSupported, starsFor, stopSpeaking, stripBox, stripCellFor } from "./phonicsUtils";

// Building blocks shared by the four Phonics level pages: the page frame with its activity tabs,
// pictures, a multiple-choice game, a "tap them all" game, the end-of-game card and the
// letter-by-letter "sound it out" panel. Colours and shapes come from the kids design layer in
// index.css.

/* ----------------------------------- pictures ----------------------------------- */

// Shows one part of a worksheet image (`box` is [x0, y0, x1, y1] as fractions of the page) by
// sliding the image behind a window of the right shape. Set the width with a class; the height
// follows from the shape of the part.
export function PageCrop({ src, box, label = "", className = "" }) {
  const [x0, y0, x1, y1] = box;
  const w = x1 - x0;
  const h = y1 - y0;

  return (
    <div
      role="img"
      aria-label={label}
      className={className}
      style={{
        aspectRatio: (w * PAGE_RATIO) / h,
        backgroundImage: `url("${src}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${100 / w}% auto`,
        backgroundPosition: `${(x0 / (1 - w)) * 100}% ${(y0 / (1 - h)) * 100}%`,
      }}
    />
  );
}

const PICTURE_SIZES = {
  sm: { emoji: "text-3xl", crop: "w-12" },
  md: { emoji: "text-5xl", crop: "w-16 sm:w-20" },
  lg: { emoji: "text-6xl", crop: "w-24" },
  xl: { emoji: "text-8xl", crop: "w-32 sm:w-44" },
};

// The picture for a word: its emoji if it has a good one, otherwise the real picture from the
// Level 1 worksheet, otherwise a plain picture frame. Always decorative: the word is written
// wherever a picture is shown, or is the answer being asked for.
export function Picture({ word, size = "md", className = "" }) {
  const { emoji: emojiSize, crop: cropSize } = PICTURE_SIZES[size];
  const emoji = emojiOf(word);
  const cell = emoji ? null : stripCellFor(word);

  if (cell) {
    return (
      <PageCrop
        src={cell.src}
        box={stripBox(cell.column, false)}
        className={`${cropSize} shrink-0 rounded-xl bg-white ${className}`}
      />
    );
  }

  return (
    <span aria-hidden="true" className={`${emojiSize} leading-none ${className}`}>
      {emoji ?? FRAME}
    </span>
  );
}

/* ------------------------------- level page frame ------------------------------- */

// `activities` is a list of { id, label, emoji, render }. The first one opens by default.
export function PhonicsLevelLayout({ level, activities }) {
  const navigate = useNavigate();
  const meta = PHONICS_LEVELS[level - 1];
  const previous = PHONICS_LEVELS[level - 2];
  const next = PHONICS_LEVELS[level];
  const [activeId, setActiveId] = useState(activities[0].id);
  const active = activities.find((a) => a.id === activeId) || activities[0];

  // Stop talking when the child leaves the page.
  useEffect(() => () => stopSpeaking(), []);

  const open = (id) => {
    stopSpeaking();
    setActiveId(id);
  };

  const go = (path) => {
    stopSpeaking();
    navigate(path);
  };

  return (
    <section className="mx-auto max-w-6xl">
      <div className="mb-4">
        <BackButton onClick={() => go(PHONICS_HUB_PATH)}>← All Levels</BackButton>
      </div>

      <PageHero
        emoji={meta.icon}
        title={`Level ${meta.level} – ${meta.title}`}
        subtitle={meta.description}
      >
        <div className="relative mt-4 flex flex-wrap items-center gap-3">
          <span className="kid-pill">LEVEL {meta.level} OF {PHONICS_LEVELS.length}</span>

          <span
            className="flex items-center gap-1.5"
            role="img"
            aria-label={`Step ${meta.level} of ${PHONICS_LEVELS.length}`}
          >
            {PHONICS_LEVELS.map((l) => (
              <span
                key={l.level}
                className={`h-2.5 w-8 rounded-full ${
                  l.level <= meta.level ? "bg-kid-green" : "bg-white/80"
                }`}
              />
            ))}
          </span>
        </div>
      </PageHero>

      <div role="tablist" aria-label="Activities" className="mb-6 flex flex-wrap gap-3">
        {activities.map((a) => (
          <button
            key={a.id}
            type="button"
            role="tab"
            aria-selected={a.id === active.id}
            onClick={() => open(a.id)}
            className={`kid-btn ${a.id === active.id ? "" : "kid-btn-soft"}`}
          >
            <span aria-hidden="true">{a.emoji}</span> {a.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" key={active.id}>
        {active.render()}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
        {previous ? (
          <button type="button" className="kid-btn kid-btn-soft" onClick={() => go(previous.path)}>
            ← Level {previous.level}: {previous.shortTitle}
          </button>
        ) : (
          <span />
        )}

        {next && (
          <button type="button" className="kid-btn" onClick={() => go(next.path)}>
            Ready for Level {next.level}: {next.shortTitle} →
          </button>
        )}
      </div>
    </section>
  );
}

/* ---------------------------------- small pieces ---------------------------------- */

export function ListenButton({ onClick, children = "Listen", className = "" }) {
  return (
    <button type="button" onClick={onClick} className={`kid-btn kid-btn-teal ${className}`}>
      <span aria-hidden="true">🔊</span> {children}
    </button>
  );
}

// The card shown when a game is finished. `stars` is 1 to 3.
export function ResultCard({ stars, title = "Wonderful!", message, onReplay, replayLabel = "🔄 Play Again" }) {
  return (
    <div className="kid-card tone-white mx-auto w-full max-w-md p-8 text-center">
      <div className="text-7xl motion-safe:animate-bounce" aria-hidden="true">🏆</div>

      <h3 className="mt-4 text-3xl font-bold text-green-600">{title}</h3>

      <p className="mt-3 text-4xl" role="img" aria-label={`${stars} out of 3 stars`}>
        {[1, 2, 3].map((n) => (
          <span key={n} className={n <= stars ? "" : "opacity-25 grayscale"}>
            ⭐
          </span>
        ))}
      </p>

      {message && <p className="mt-3 text-lg font-semibold text-kid-soft">{message}</p>}

      <button type="button" onClick={onReplay} className="kid-btn kid-btn-sun mt-6 px-8 py-3 text-lg">
        {replayLabel}
      </button>
    </div>
  );
}

// A word broken into its letters. `active` is the letter being spoken (or the position after the
// last letter while the whole word is spoken); tapping a letter plays just that sound.
export function SoundOutPanel({ word, active, onPlay }) {
  const letters = word.toLowerCase().replace(/[^a-z]/g, "").split("");

  return (
    <div className="kid-card tone-white p-5 text-center">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {letters.map((l, i) => (
          <span
            key={`${l}-${i}`}
            className={`grid h-16 w-16 place-items-center rounded-2xl text-4xl font-bold transition sm:h-20 sm:w-20 sm:text-5xl ${
              active === i
                ? "scale-110 bg-kid-sun text-kid-ink shadow-lg"
                : "bg-tone-aqua text-kid-ink"
            }`}
          >
            {l}
          </span>
        ))}

        <span aria-hidden="true" className="px-1 text-3xl text-kid-soft">
          →
        </span>

        <span
          className={`rounded-2xl px-4 py-3 text-4xl font-bold transition sm:text-5xl ${
            active === letters.length ? "scale-110 bg-kid-sun text-kid-ink shadow-lg" : "bg-tone-butter text-kid-ink"
          }`}
        >
          {word}
        </span>
      </div>

      <button type="button" onClick={() => onPlay(word)} className="kid-btn kid-btn-teal mt-5">
        <span aria-hidden="true">🔊</span> Sound it out
      </button>
    </div>
  );
}

/* ------------------------------- "tap them all" game ------------------------------- */

// A round shows a set of pictures and asks the child to tap every one that fits, like the
// "colour the pictures that ..." lines on the worksheets. `makeRounds()` returns a fresh list:
//   { key, prompt, display?, speak?, items: [{ id, word, correct }] }
// Tapping a right picture turns it green; a wrong one turns red for a moment. A round ends when
// every right picture has been found.
export function PickAllGame({ makeRounds }) {
  const [rounds, setRounds] = useState(() => makeRounds());
  const [index, setIndex] = useState(0);
  const [found, setFound] = useState([]);
  const [wrongId, setWrongId] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [finished, setFinished] = useState(false);
  const wrongTimer = useRef(null);

  const round = rounds[index];

  useEffect(() => () => clearTimeout(wrongTimer.current), []);

  // Read each round's instruction aloud when it appears.
  useEffect(() => {
    if (!finished && round?.speak) say(round.speak);
  }, [round, finished]);

  const targets = round.items.filter((item) => item.correct);
  const roundDone = found.length === targets.length;

  const tap = (item) => {
    if (roundDone || found.includes(item.id)) return;

    say(item.word);

    if (item.correct) {
      setFound((f) => [...f, item.id]);
    } else {
      setMistakes((m) => m + 1);
      setWrongId(item.id);
      clearTimeout(wrongTimer.current);
      wrongTimer.current = setTimeout(() => setWrongId(null), 700);
    }
  };

  const next = () => {
    if (index + 1 < rounds.length) {
      setIndex(index + 1);
      setFound([]);
      setWrongId(null);
    } else {
      stopSpeaking();
      setFinished(true);
    }
  };

  const replay = () => {
    setRounds(makeRounds());
    setIndex(0);
    setFound([]);
    setWrongId(null);
    setMistakes(0);
    setFinished(false);
  };

  if (finished) {
    const best = rounds.length * 2;

    return (
      <ResultCard
        stars={starsFor(Math.max(0, best - mistakes), best)}
        message={mistakes === 0 ? "Every picture right first time!" : `You finished all ${rounds.length} rounds!`}
        onReplay={replay}
      />
    );
  }

  return (
    <div className="kid-card tone-white mx-auto w-full max-w-3xl p-4 text-center sm:p-6">
      <div className="flex items-center justify-between gap-3 text-sm font-bold text-kid-soft sm:text-base">
        <span>
          Round {index + 1} of {rounds.length}
        </span>

        <span className="rounded-full bg-tone-butter px-3 py-1 text-kid-ink">
          Found {found.length} / {targets.length}
        </span>
      </div>

      <div className="mt-4 rounded-3xl border-4 border-dashed border-yellow-400 bg-yellow-50 p-4 sm:p-6">
        <h3 className="text-xl font-bold text-kid-ink sm:text-2xl">{round.prompt}</h3>

        {round.display && <div className="mt-3 text-5xl font-bold text-orange-500 sm:text-6xl">{round.display}</div>}

        {round.speak && speechSupported() && (
          <ListenButton onClick={() => say(round.speak)} className="mt-3" />
        )}

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {round.items.map((item) => {
            const isFound = found.includes(item.id);
            const isWrong = wrongId === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => tap(item)}
                aria-label={item.word}
                className={`flex min-h-32 flex-col items-center justify-center gap-1 rounded-2xl p-3 transition active:scale-95 ${
                  isFound
                    ? "bg-green-500 text-white ring-4 ring-green-600"
                    : isWrong
                      ? "bg-red-500 text-white ring-4 ring-red-600"
                      : "bg-white text-green-800 ring-4 ring-green-300 hover:scale-105 hover:ring-green-400"
                }`}
              >
                {item.crop ? (
                  // the real worksheet picture, with its name printed underneath
                  <PageCrop
                    src={item.crop.src}
                    box={item.crop.box}
                    className="w-full max-w-36 rounded-xl bg-white"
                  />
                ) : (
                  <>
                    <Picture word={item.word} size="lg" />

                    <span className="text-lg font-bold sm:text-xl">{item.word}</span>
                  </>
                )}

                {isFound && (
                  <span className="text-xl font-bold" aria-label="correct">
                    ✔
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="mt-5 min-h-8 text-xl font-bold text-kid-ink sm:text-2xl">
          {roundDone
            ? `🎉 You found all ${targets.length}!`
            : wrongId !== null
              ? "😊 Not that one, try again!"
              : ""}
        </p>

        {roundDone && (
          <button type="button" onClick={next} className="kid-btn kid-btn-sun mt-4 px-8 py-3 text-lg">
            {index + 1 < rounds.length ? "Next ➜" : "See my stars ⭐"}
          </button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------- multiple-choice game ------------------------------- */

// `makeQuestions()` returns a fresh list of questions each time it is called:
//   { prompt, display?, speak?, explain?, options: [{ value, label, icon?, emoji? }], answer }
// `display` is the big thing shown under the prompt (a letter or a picture), `speak` is read aloud
// when the question appears, and `explain` is read after the child answers. An option can carry
// a picture: `icon` (any element, such as <Picture/>) or just an `emoji`.
export function QuizGame({ makeQuestions, optionTextClass = "text-4xl sm:text-5xl" }) {
  const [questions, setQuestions] = useState(() => makeQuestions());
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[index];

  // Read each question aloud when it appears.
  useEffect(() => {
    if (!finished && question?.speak) say(question.speak);
  }, [question, finished]);

  const choose = (value) => {
    if (selected !== null) return;

    const right = value === question.answer;

    setSelected(value);
    if (right) setScore((s) => s + 1);

    say(`${right ? "Well done!" : "Good try!"} ${question.explain || ""}`);
  };

  const goNext = () => {
    if (index + 1 < questions.length) {
      setIndex((i) => i + 1);
      setSelected(null);
    } else {
      stopSpeaking();
      setFinished(true);
    }
  };

  const replay = () => {
    setQuestions(makeQuestions());
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <ResultCard
        stars={starsFor(score, questions.length)}
        message={`You got ${score} out of ${questions.length} right!`}
        onReplay={replay}
      />
    );
  }

  const answered = selected !== null;
  const correct = answered && selected === question.answer;
  const answerLabel = question.options.find((o) => o.value === question.answer)?.label;
  const progress = (index / questions.length) * 100;
  const columns =
    question.options.length >= 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1 sm:grid-cols-3";

  return (
    <div className="kid-card tone-white mx-auto w-full max-w-3xl p-4 text-center sm:p-6">
      <div className="flex items-center justify-between gap-3 text-sm font-bold text-kid-soft sm:text-base">
        <span>
          Question {index + 1} of {questions.length}
        </span>

        <span className="rounded-full bg-tone-butter px-3 py-1 text-kid-ink">⭐ {score}</span>
      </div>

      <div
        className="mt-3 h-3 w-full overflow-hidden rounded-full bg-gray-200"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={questions.length}
        aria-valuenow={index}
      >
        <div className="h-full rounded-full bg-green-500 transition-all" style={{ width: `${progress}%` }} />
      </div>

      <div className="mt-5 rounded-3xl border-4 border-dashed border-yellow-400 bg-yellow-50 p-4 sm:p-6">
        <h3 className="text-xl font-bold text-kid-ink sm:text-2xl">{question.prompt}</h3>

        {question.display && (
          <div className="mt-4 text-7xl font-bold text-orange-500 sm:text-8xl">{question.display}</div>
        )}

        {question.speak && speechSupported() && (
          <ListenButton onClick={() => say(question.speak)} className="mt-4" />
        )}

        <div className={`mt-6 grid gap-3 sm:gap-4 ${columns}`}>
          {question.options.map((option) => {
            const isAnswer = option.value === question.answer;
            const isPicked = option.value === selected;

            let style = "bg-white text-green-800 ring-4 ring-green-300 hover:scale-105 hover:ring-green-400";

            if (answered) {
              style = isAnswer
                ? "bg-green-500 text-white ring-4 ring-green-600"
                : isPicked
                  ? "bg-red-500 text-white ring-4 ring-red-600"
                  : "bg-white text-green-800 opacity-60 ring-4 ring-green-100";
            }

            return (
              <button
                key={option.value}
                type="button"
                disabled={answered}
                onClick={() => choose(option.value)}
                className={`flex min-h-24 flex-col items-center justify-center gap-1 rounded-2xl p-3 font-bold transition active:scale-95 disabled:cursor-default ${optionTextClass} ${style}`}
              >
                {option.icon ?? (option.emoji && <span aria-hidden="true">{option.emoji}</span>)}
                <span>
                  {option.label}
                  {answered && isAnswer && <span aria-label="correct"> ✔</span>}
                  {answered && isPicked && !isAnswer && <span aria-label="not correct"> ✖</span>}
                </span>
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="mt-5 min-h-8 text-xl font-bold text-kid-ink sm:text-2xl">
          {answered && (correct ? "🎉 Excellent!" : `😊 Good try! It is "${answerLabel}".`)}
        </p>

        {answered && (
          <button type="button" onClick={goNext} className="kid-btn kid-btn-sun mt-4 px-8 py-3 text-lg">
            {index + 1 < questions.length ? "Next ➜" : "See my stars ⭐"}
          </button>
        )}
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton, PageHero } from "../KidsUI";
import { PHONICS_HUB_PATH, PHONICS_LEVELS } from "../../data/phonicsData";
import { getLetterPage } from "../../data/phonicsFiles";
import { FRAME, emojiOf } from "../../data/phonicsLessons";
import {
  PAGE_RATIO,
  cvcCellFor,
  pageCell,
  pageRatio,
  rhymeCellFor,
  say,
  sheetRowBox,
  shuffle,
  speechSupported,
  starsFor,
  stopSpeaking,
  stripBox,
  stripCellFor,
} from "./phonicsUtils";

// Building blocks shared by the Phonics level pages: the page frame with its activity tabs,
// pictures, a multiple-choice game, a "tap them all" game, the end-of-game card and the
// letter-by-letter "sound it out" panel. Colours and shapes come from the kids design layer in
// index.css.

/* ----------------------------------- pictures ----------------------------------- */

// Shows one part of a worksheet image (`box` is [x0, y0, x1, y1] as fractions of the page) by
// sliding the image behind a window of the right shape. Set the width with a class; the height
// follows from the shape of the part. `ratio` is the page's width over its height (Levels 5 and 6
// have wider pages than Levels 1 to 4).
export function PageCrop({ src, box, label = "", className = "", ratio = PAGE_RATIO }) {
  const [x0, y0, x1, y1] = box;
  const w = x1 - x0;
  const h = y1 - y0;

  return (
    <div
      role="img"
      aria-label={label}
      className={className}
      style={{
        aspectRatio: (w * ratio) / h,
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
// Level 1 worksheet, otherwise the one from the Level 4 sheet, otherwise a plain picture frame.
// Always decorative: the word is written wherever a picture is shown, or is the answer being
// asked for.
export function Picture({ word, size = "md", className = "" }) {
  const { emoji: emojiSize, crop: cropSize } = PICTURE_SIZES[size];
  const emoji = emojiOf(word);
  const cell = emoji ? null : stripCellFor(word);
  const sheet = emoji || cell ? null : rhymeCellFor(word);

  if (cell) {
    return (
      <PageCrop
        src={cell.src}
        box={stripBox(cell.column, false)}
        className={`${cropSize} shrink-0 rounded-xl bg-white ${className}`}
      />
    );
  }

  if (sheet) {
    return (
      <PageCrop
        src={sheet.src}
        box={sheet.box}
        ratio={sheet.ratio}
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

const SHEET_PICTURE_SIZES = {
  sm: "w-20",
  md: "w-28",
  lg: "w-32 sm:w-36",
  xl: "w-44 sm:w-56",
};

// The picture a Level 5 or Level 6 worksheet shows for a word, cut out of the page exactly as printed (the picture
// with its name under it). `row` is the word's row on the page of `letter`, 0 to 3, top to bottom. If that page
// is missing, or its rows were never measured, the word's emoji (or a plain frame) is shown instead.
export function SheetPicture({ level, letter, row, word, size = "lg", className = "" }) {
  const page = getLetterPage(level, letter);
  const box = sheetRowBox(level, letter, row);

  if (!page || !box) {
    return <Picture word={word} size={size === "xl" ? "xl" : "lg"} className={className} />;
  }

  return (
    <PageCrop
      src={page.image}
      box={box}
      ratio={pageRatio(level)}
      label={word}
      className={`${SHEET_PICTURE_SIZES[size]} shrink-0 rounded-xl bg-white ${className}`}
    />
  );
}

// The picture a Level 8 worksheet shows for a CVC word (cat, dog, sun...), cut out of the page as printed. If the word
// has none, its emoji (or a plain frame) is shown instead.
export function CvcPicture({ word, size = "lg", className = "" }) {
  const cell = cvcCellFor(word);

  if (!cell) return <Picture word={word} size={size === "xl" ? "xl" : "lg"} className={className} />;

  return (
    <PageCrop
      src={cell.src}
      box={cell.box}
      ratio={cell.ratio}
      label={word}
      className={`${SHEET_PICTURE_SIZES[size]} shrink-0 rounded-xl bg-white ${className}`}
    />
  );
}

const CUT_SIZES = {
  sm: "w-20",
  md: "w-28",
  lg: "w-32 sm:w-40",
  xl: "w-44 sm:w-56",
  full: "w-full",
};

// A picture cut out of a page of Levels 9 to 11 as printed: `box` is [left, top, right, bottom] in pixels of page
// `page` of `level` (see data/phonicsSheetRows.js). If that page is missing, the word's emoji (or a plain frame) is
// shown instead. `label` is what the picture shows, for screen readers; leave it out where the word is written next
// to the picture.
export function CutPicture({ level, page, box, label = "", size = "lg", className = "" }) {
  const cell = pageCell(level, page, box);

  if (!cell) return <Picture word={label} size={size === "xl" ? "xl" : "lg"} className={className} />;

  return (
    <PageCrop
      src={cell.src}
      box={cell.box}
      ratio={cell.ratio}
      label={label}
      className={`${CUT_SIZES[size]} shrink-0 rounded-xl bg-white ${className}`}
    />
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
                className={`h-2.5 w-5 rounded-full sm:w-8 ${
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
// every right picture has been found. An item can carry `crop: { src, box, ratio }` to show a part of a
// worksheet instead of its emoji, `picture` (any element) to show that instead, or `plain: true` to show just
// its word, written large.
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
                    ratio={item.crop.ratio}
                    className="w-full max-w-36 rounded-xl bg-white"
                  />
                ) : item.plain ? (
                  <span className="text-3xl font-bold sm:text-4xl">{item.word}</span>
                ) : item.picture ? (
                  item.picture
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
// With `hideLabels` an option shows only its picture until the child has answered (a screen reader still reads it).
// `display` is the big thing shown under the prompt (a letter or a picture), `speak` is read aloud
// when the question appears, and `explain` is read after the child answers. An option can carry
// a picture: `icon` (any element, such as <Picture/>) or just an `emoji`. `columns` sets the grid of the options
// (by default it follows how many there are); it can be a function of the question, for games that mix three and
// four options. `displayClass` sets the size of the `display`.
//
// With `endless` the game never runs out: past the last question a fresh list is added (the questions just asked are
// moved to its end, so none comes straight back), a star is earned for every ten questions tried, and the game only
// ends when the child taps "Finish & See Score" (or leaves).
const STAR_EVERY = 10;
const questionKey = (q) => `${typeof q.prompt === "string" ? q.prompt : ""}|${q.speak ?? ""}|${q.answer}`;

export function QuizGame({
  makeQuestions,
  optionTextClass = "text-4xl sm:text-5xl",
  hideLabels = false,
  columns: fixedColumns,
  displayClass = "text-7xl sm:text-8xl",
  endless = false,
}) {
  const [questions, setQuestions] = useState(() => makeQuestions());
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [triedAtFinish, setTriedAtFinish] = useState(0);

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
    } else if (endless) {
      // Top up with a fresh list; the last few questions asked go to its end, so none comes straight back.
      const recent = new Set(questions.slice(-5).map(questionKey));
      const fresh = makeQuestions();

      setQuestions((list) => [
        ...list,
        ...fresh.filter((q) => !recent.has(questionKey(q))),
        ...fresh.filter((q) => recent.has(questionKey(q))),
      ]);
      setIndex((i) => i + 1);
      setSelected(null);
    } else {
      stopSpeaking();
      setTriedAtFinish(questions.length);
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
        stars={starsFor(score, triedAtFinish)}
        message={`You got ${score} out of ${triedAtFinish} right!`}
        onReplay={replay}
      />
    );
  }

  const answered = selected !== null;
  const correct = answered && selected === question.answer;
  const answerLabel = question.options.find((o) => o.value === question.answer)?.label;
  // A question counts as tried once it has been answered.
  const tried = index + (answered ? 1 : 0);
  const starsEarned = Math.floor(tried / STAR_EVERY);
  const progress = endless ? ((tried % STAR_EVERY) / STAR_EVERY) * 100 : (index / questions.length) * 100;

  const finishNow = () => {
    stopSpeaking();
    setTriedAtFinish(tried);
    setFinished(true);
  };
  const columns =
    (typeof fixedColumns === "function" ? fixedColumns(question) : fixedColumns) ??
    (question.options.length >= 4
      ? "grid-cols-2 md:grid-cols-4"
      : question.options.length === 2
        ? "grid-cols-2"
        : "grid-cols-1 sm:grid-cols-3");

  return (
    <div className="kid-card tone-white mx-auto w-full max-w-3xl p-4 text-center sm:p-6">
      <div className="flex items-center justify-between gap-3 text-sm font-bold text-kid-soft sm:text-base">
        <span>{endless ? `Question ${index + 1}` : `Question ${index + 1} of ${questions.length}`}</span>

        <span className="rounded-full bg-tone-butter px-3 py-1 text-kid-ink">
          {endless ? `✔ ${score} right` : `⭐ ${score}`}
        </span>
      </div>

      <div
        className="mt-3 h-3 w-full overflow-hidden rounded-full bg-gray-200"
        role="progressbar"
        aria-label={endless ? "On the way to the next star" : "Questions done"}
        aria-valuemin={0}
        aria-valuemax={endless ? STAR_EVERY : questions.length}
        aria-valuenow={endless ? tried % STAR_EVERY : index}
      >
        <div className="h-full rounded-full bg-green-500 transition-all" style={{ width: `${progress}%` }} />
      </div>

      {endless && (
        <p className="mt-2 text-sm font-semibold text-kid-soft">
          {starsEarned > 0 && `${"⭐".repeat(Math.min(starsEarned, 5))}${starsEarned > 5 ? ` × ${starsEarned}` : ""} • `}
          {STAR_EVERY - (tried % STAR_EVERY)} more for the next star
        </p>
      )}

      <div className="mt-5 rounded-3xl border-4 border-dashed border-yellow-400 bg-yellow-50 p-4 sm:p-6">
        <h3 className="text-xl font-bold text-kid-ink sm:text-2xl">{question.prompt}</h3>

        {question.display && (
          <div className={`mt-4 font-bold text-orange-500 ${displayClass}`}>{question.display}</div>
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
                <span className={hideLabels && !answered ? "sr-only" : undefined}>
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
            {endless || index + 1 < questions.length ? "Next ➜" : "See my stars ⭐"}
          </button>
        )}
      </div>

      {endless && tried > 0 && (
        <button type="button" onClick={finishNow} className="kid-btn kid-btn-soft mt-5">
          🏁 Finish & See Score
        </button>
      )}
    </div>
  );
}

/* --------------------------------- build-the-word game --------------------------------- */

// A round shows a picture and a row of empty boxes, and the child taps the tiles in order to fill them: the sounds of a
// word, or its letters. `makeRounds()` returns a fresh list:
//   { key, word, parts: ["c", "a", "t"], tiles: [{ id, text }] (in the order to show them), picture? }
// A tile whose text is the next part goes into the next box and is said aloud (`sayTile(text)`, if given); any other tile
// turns red for a moment. When every box is full the word is said. Tiles with the same text are the same tile.
// For sentences, `noun` is "sentence" (each round's `word` is the whole sentence and its tiles are words) and
// `textClass` makes the tiles smaller.
export function TileBuildGame({
  makeRounds,
  heading = "Tap the tiles in order to build the word",
  sayTile,
  unit = "tile",
  noun = "word",
  textClass = "text-3xl sm:text-4xl",
}) {
  const [rounds, setRounds] = useState(() => makeRounds());
  const [index, setIndex] = useState(0);
  const [placed, setPlaced] = useState([]);
  const [wrongId, setWrongId] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [finished, setFinished] = useState(false);
  const wrongTimer = useRef(null);

  const round = rounds[index];
  const done = placed.length === round.parts.length;

  useEffect(() => () => clearTimeout(wrongTimer.current), []);

  // Say the word when each round begins.
  useEffect(() => {
    if (!finished) say(round.word);
  }, [round, finished]);

  const tap = (tile) => {
    if (done || placed.includes(tile.id)) return;

    if (tile.text === round.parts[placed.length]) {
      const next = [...placed, tile.id];

      setPlaced(next);

      if (next.length === round.parts.length) say(round.word);
      else if (sayTile) say(sayTile(tile.text));
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
    setRounds(makeRounds());
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
        message={mistakes === 0 ? `Every ${noun} built first time!` : `You built all ${rounds.length} ${noun}s!`}
        onReplay={replay}
      />
    );
  }

  return (
    <div className="kid-card tone-white mx-auto w-full max-w-3xl p-4 text-center sm:p-6">
      <div className="flex items-center justify-between gap-3 text-sm font-bold text-kid-soft sm:text-base">
        <span>
          <span className="capitalize">{noun}</span> {index + 1} of {rounds.length}
        </span>

        <span className="rounded-full bg-tone-butter px-3 py-1 text-kid-ink">
          Built {placed.length} / {round.parts.length}
        </span>
      </div>

      <div className="mt-4 rounded-3xl border-4 border-dashed border-yellow-400 bg-yellow-50 p-4 sm:p-6">
        <h3 className="text-xl font-bold text-kid-ink sm:text-2xl">{heading}</h3>

        {round.picture && <div className="mt-4 flex justify-center">{round.picture}</div>}

        <ListenButton onClick={() => say(round.word)} className="mt-3">
          Hear it
        </ListenButton>

        {/* the word as it is built: a box for every tile */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {round.parts.map((part, i) => {
            const filled = i < placed.length;

            return (
              <span
                key={i}
                role="img"
                aria-label={filled ? `Box ${i + 1}: ${part}` : `Box ${i + 1}: empty`}
                className={`grid min-h-16 min-w-16 place-items-center rounded-2xl px-3 font-bold ${textClass} ${
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
                aria-label={`The ${unit} ${tile.text}`}
                className={`min-h-16 min-w-16 rounded-2xl px-4 py-3 font-bold transition active:scale-95 disabled:cursor-default ${textClass} ${
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
          {done ? (noun === "word" ? `🎉 You built ${round.word}!` : `🎉 ${round.word}`) : wrongId !== null ? "😊 Not that one, try again!" : ""}
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

/* ---------------------------------------- matching game ---------------------------------------- */

const MATCH_HELP = "Tap a picture on the left, then tap its word.";

// Pictures on the left and their words on the right, as on the "Read and Match" pages: the child taps a picture,
// then the word that goes with it. `makeRound()` returns a fresh list of { key, word, picture } (`picture` is any
// element, `pictureLabel` what it shows for screen readers), or { title, items } to name the round; the words are
// shown in a different order. `showWord`
// is how a word is written (in capitals, say), `wordClass` its size, and `noun` what the right-hand side holds.
export function MatchGame({
  makeRound,
  title = "Match the pictures",
  noun = "word",
  showWord = (word) => word,
  wordClass = "text-2xl sm:text-4xl",
  help = MATCH_HELP,
}) {
  // Both sides in a new order, and never in the same order as each other (so the words never just line up with
  // their pictures).
  const fresh = () => {
    const made = makeRound();
    const items = Array.isArray(made) ? made : made.items;
    const left = shuffle(items);
    let right = shuffle(items);

    for (let tries = 0; tries < 10 && items.length > 1 && right.every((item, i) => item.key === left[i].key); tries += 1) {
      right = shuffle(items);
    }

    return { left, right, title: Array.isArray(made) ? title : made.title };
  };

  const [round, setRound] = useState(fresh);
  const [leftPick, setLeftPick] = useState(null);
  const [matched, setMatched] = useState([]);
  const [wrongKey, setWrongKey] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [message, setMessage] = useState(help);
  const wrongTimer = useRef(null);
  const total = round.left.length;

  useEffect(() => () => clearTimeout(wrongTimer.current), []);

  const pickLeft = (item) => {
    if (matched.includes(item.key)) return;

    say(item.word);
    setLeftPick(item);
    setMessage(`Now tap the ${noun} that goes with the picture.`);
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
      setMessage(`🎉 That is "${showWord(item.word)}"!`);
      setLeftPick(null);
    } else {
      setMistakes((m) => m + 1);
      setWrongKey(item.key);
      setMessage(`😊 That picture is not "${showWord(item.word)}". Try again!`);
      clearTimeout(wrongTimer.current);
      wrongTimer.current = setTimeout(() => setWrongKey(null), 700);
    }
  };

  const replay = () => {
    setRound(fresh());
    setLeftPick(null);
    setMatched([]);
    setWrongKey(null);
    setMistakes(0);
    setMessage(help);
  };

  if (matched.length === total) {
    return (
      <ResultCard
        stars={mistakes <= 1 ? 3 : mistakes <= 4 ? 2 : 1}
        message={mistakes === 0 ? "Every match first time!" : `You matched all ${total} pictures!`}
        onReplay={replay}
      />
    );
  }

  return (
    <div className="kid-card tone-white mx-auto w-full max-w-3xl p-4 text-center sm:p-6">
      <div className="flex items-center justify-between gap-3 text-sm font-bold text-kid-soft sm:text-base">
        <span>{round.title}</span>

        <span className="rounded-full bg-tone-butter px-3 py-1 text-kid-ink">
          ⭐ {matched.length} / {total}
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
                  aria-label={`Picture of ${item.pictureLabel ?? item.word}`}
                  className={`flex min-h-24 items-center justify-center rounded-2xl px-2 py-2 transition active:scale-95 ${
                    isMatched
                      ? "bg-green-500 ring-4 ring-green-600"
                      : isPicked
                        ? "bg-kid-sun ring-4 ring-yellow-500"
                        : "bg-white ring-4 ring-green-300 hover:scale-105 hover:ring-green-400"
                  }`}
                >
                  {item.picture}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-base font-bold text-kid-ink sm:text-xl">Find its {noun}</h3>

            {round.right.map((item) => {
              const isMatched = matched.includes(item.key);
              const isWrong = wrongKey === item.key;

              return (
                <button
                  key={item.key}
                  type="button"
                  disabled={isMatched}
                  onClick={() => pickRight(item)}
                  className={`flex min-h-24 items-center justify-center gap-2 rounded-2xl px-2 py-3 font-bold leading-tight transition active:scale-95 ${wordClass} ${
                    isMatched
                      ? "bg-green-500 text-white ring-4 ring-green-600"
                      : isWrong
                        ? "bg-red-500 text-white ring-4 ring-red-600"
                        : "bg-white text-green-800 ring-4 ring-green-300 hover:scale-105 hover:ring-green-400"
                  }`}
                >
                  {showWord(item.word)}
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

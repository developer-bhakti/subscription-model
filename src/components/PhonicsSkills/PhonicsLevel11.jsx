import { useEffect, useRef, useState } from "react";
import {
  L11_ALSO_FITS,
  L11_ARRANGE,
  L11_BUILD,
  L11_CHOOSE,
  L11_FILL,
  L11_MATCH,
  L11_PHRASES,
  L11_PICTURE_SENTENCES,
  L11_STORIES,
  L11_UNDERSTAND,
} from "../../data/phonicsLessons";
import { L11_OPTION_PICTURES, L11_PICTURES, L11_STORY_PICTURES } from "../../data/phonicsSheetRows";
import { CutPicture, MatchGame, PhonicsLevelLayout, QuizGame, ResultCard, TileBuildGame } from "./PhonicsShared";
import PhonicsWorksheets from "./PhonicsWorksheets";
import { pickRandom, say, shuffle, stopSpeaking } from "./phonicsUtils";

// LEVEL 11: Reading and Sentence Formation
// Follows the thirty "Reading Practice" worksheets: reading two-word phrases (pages 1 to 9), reading and completing
// sentences (10 to 18 and 23 to 27), building sentences from word cards (19 to 22) and putting a picture story in
// order (28 to 30). What each page says is in phonicsLessons.js, which also lists the rows left out and why; the
// pictures are cut from the pages (phonicsSheetRows.js).

// The picture of row `row` on page `page`.
function RowPicture({ page, row, label = "", size = "lg" }) {
  return <CutPicture level={11} page={page} box={L11_PICTURES[page][row]} label={label} size={size} />;
}

// Every row of a set of pages as { page, row, value }, leaving out the rows marked null.
const rowsOf = (pages) =>
  Object.entries(pages).flatMap(([page, rows]) =>
    rows.flatMap((value, row) => (value === null ? [] : [{ page: Number(page), row, value }])),
  );

const words = (sentence) => sentence.split(" ");
const bare = (word) => word.replace(/[.,!?]/g, "");

/* -------------------------------- 1. Read and match the phrases -------------------------------- */
// Pages 1 to 3: "Read the two-word phrases and match them with the correct pictures." A round is one page.

const makeMatchRound = () => {
  const [page] = pickRandom(Object.keys(L11_MATCH), 1);

  return {
    title: "Match the phrases",
    items: L11_MATCH[page].map(([phrase, row]) => ({
      key: phrase,
      word: phrase,
      pictureLabel: phrase.split(" ").slice(1).join(" "),
      picture: <RowPicture page={Number(page)} row={row} size="md" />,
    })),
  };
};

/* ---------------------------------- 2. Complete the phrase ---------------------------------- */
// Pages 4 to 6: "Read each phrase and choose the correct word to complete it."

const PHRASES = rowsOf(L11_PHRASES);

const makeCompleteThePhrase = () =>
  pickRandom(PHRASES, 10).map(({ page, row, value: [start, answer, other] }) => ({
    prompt: "Which word completes the phrase?",
    display: (
      <>
        <span className="flex justify-center">
          <RowPicture page={page} row={row} label={`${start} ${answer}`} size="xl" />
        </span>

        <span className="mt-3 block text-3xl text-kid-ink sm:text-5xl">{start} ____.</span>
      </>
    ),
    speak: `Look at the picture. ${start}, what?`,
    explain: `${start} ${answer}.`,
    options: shuffle([answer, other]).map((w) => ({ value: w, label: w })),
    answer,
  }));

/* ----------------------------------- 3. Arrange the words ----------------------------------- */
// Pages 7 to 9, "Arrange the given words to make a meaningful phrase", then pages 19 to 22, "Arrange the given word
// cards to form a meaningful sentence". A game is two phrases, then four sentences.

const ARRANGE = rowsOf(L11_ARRANGE);
const BUILD = rowsOf(L11_BUILD);

const arrangeRound = ({ page, row, value }) => {
  const parts = words(value);
  const tiles = parts.map((text, id) => ({ id, text }));
  let mixed = shuffle(tiles);

  // never already in order
  for (let tries = 0; tries < 10 && mixed.every((t, i) => t.text === parts[i]); tries += 1) mixed = shuffle(tiles);

  return {
    key: `${page}-${row}`,
    word: value,
    parts,
    tiles: mixed,
    picture: <RowPicture page={page} row={row} label={bare(value)} size="xl" />,
  };
};

const makeArrangeRounds = () => [...pickRandom(ARRANGE, 2), ...pickRandom(BUILD, 4)].map(arrangeRound);

/* ------------------------------ 4. Read and understand the sentence ------------------------------ */
// Pages 10 to 12: "Read each sentence and tick the picture that shows the correct meaning." Pages 23, 26 and 27 print a
// sentence beside each picture; the game asks for the picture of a sentence among two others from the same page.

const UNDERSTAND = rowsOf(L11_UNDERSTAND).map(({ page, row, value: [sentence, answer, shows] }) => ({
  sentence,
  answer,
  options: shows.map((label, i) => ({ label, page, box: L11_OPTION_PICTURES[page][row][i] })),
}));

// A card's sentence, with its picture and two other pictures from the same page (new ones each game).
const cardQuestion = ({ page, row, value }) => {
  const others = pickRandom(
    L11_PICTURE_SENTENCES[page].map((_, i) => i).filter((i) => i !== row),
    2,
  );
  const order = [row, ...others];

  return {
    sentence: value,
    answer: 0,
    options: order.map((i) => ({ label: L11_PICTURE_SENTENCES[page][i], page, box: L11_PICTURES[page][i] })),
  };
};

const CARDS = rowsOf(L11_PICTURE_SENTENCES);

const makeReadAndUnderstand = () =>
  pickRandom([...UNDERSTAND, ...CARDS.map(cardQuestion)], 10).map(({ sentence, answer, options }) => {
    // the three pictures in a new order each time
    const order = shuffle([0, 1, 2]);

    return {
      prompt: "Read the sentence. Which picture shows it?",
      display: sentence,
      speak: sentence,
      explain: sentence,
      options: order.map((i) => ({
        value: i,
        label: options[i].label,
        icon: <CutPicture level={11} page={options[i].page} box={options[i].box} size="full" className="max-w-40" />,
      })),
      answer,
    };
  });

/* ---------------------------------- 5. Fill in the missing word ---------------------------------- */
// Pages 13 to 15: "Complete each sentence by filling in the missing word from the word bank", and pages 24 and 25,
// "Observe each picture and write a simple sentence with the given guidance".

const FILL = Object.entries(L11_FILL).flatMap(([page, { bank, rows }]) =>
  rows.map(([before, after, answer], row) => {
    const pool = bank ?? rows.map(([, , w]) => w);
    const alsoFits = L11_ALSO_FITS[`${page}:${row}`] ?? [];

    return { page: Number(page), row, before, after, answer, others: pool.filter((w) => w !== answer && !alsoFits.includes(w)) };
  }),
);

const makeFillTheWord = () =>
  pickRandom(FILL, 10).map(({ page, row, before, after, answer, others }) => {
    const sentence = `${before} ${answer}${after === "." ? "." : ` ${after}`}`;

    return {
      prompt: "Which word is missing?",
      display: (
        <>
          <span className="flex justify-center">
            <RowPicture page={page} row={row} label={sentence} size="xl" />
          </span>

          <span className="mt-3 block text-3xl text-kid-ink sm:text-4xl">
            {before} ____{after === "." ? "." : ` ${after}`}
          </span>
        </>
      ),
      speak: `Which word is missing? ${before}, blank, ${after === "." ? "" : after}`,
      explain: sentence,
      options: shuffle([answer, ...pickRandom(others, 2)]).map((w) => ({ value: w, label: w })),
      answer,
    };
  });

/* ---------------------------------- 6. Choose the correct sentence ---------------------------------- */
// Pages 16 to 18: "Look at the picture and tick the sentence that describes it correctly."

const CHOOSE = rowsOf(L11_CHOOSE);

const makeChooseTheSentence = () =>
  pickRandom(CHOOSE, 10).map(({ page, row, value: [right, wrong] }) => ({
    prompt: "Which sentence tells about the picture?",
    display: (
      <span className="flex justify-center">
        <RowPicture page={page} row={row} label={right} size="xl" />
      </span>
    ),
    speak: "Look at the picture. Which sentence tells about it?",
    explain: right,
    options: shuffle([right, wrong]).map((s) => ({ value: s, label: s })),
    answer: right,
  }));

/* ------------------------------------- 7. Picture story ------------------------------------- */
// Pages 28 to 30: "Observe the three pictures and arrange them in sequence." The child taps the pictures in the order
// the story happens.

const STORIES = Object.entries(L11_STORIES).flatMap(([page, stories]) =>
  stories.map((story, i) => ({ ...story, page: Number(page), boxes: L11_STORY_PICTURES[page][i] })),
);

const STEP_WORDS = ["First", "Next", "Last"];

const makeStoryRounds = () =>
  pickRandom(STORIES, 5).map((story) => {
    let shown = shuffle([0, 1, 2]);

    // never already in the story's order
    for (let tries = 0; tries < 10 && shown.every((p, i) => p === story.order[i]); tries += 1) shown = shuffle([0, 1, 2]);

    return { ...story, shown };
  });

function PictureStory() {
  const [rounds, setRounds] = useState(makeStoryRounds);
  const [index, setIndex] = useState(0);
  const [placed, setPlaced] = useState([]);
  const [wrong, setWrong] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [finished, setFinished] = useState(false);
  const wrongTimer = useRef(null);

  const story = rounds[index];
  const done = placed.length === 3;

  useEffect(() => () => clearTimeout(wrongTimer.current), []);

  // Read the story's name when it appears.
  useEffect(() => {
    if (!finished) say(`${story.title}. Tap the pictures in order.`);
  }, [story, finished]);

  const tap = (picture) => {
    if (done || placed.includes(picture)) return;

    if (picture === story.order[placed.length]) {
      const next = [...placed, picture];

      setPlaced(next);

      if (next.length === 3) {
        say(`${story.title}. ${story.order.map((p, i) => `${STEP_WORDS[i]}, ${story.shows[p]}.`).join(" ")}`);
      } else {
        say(story.shows[picture]);
      }
    } else {
      setMistakes((m) => m + 1);
      setWrong(picture);
      say("Not yet. What happens before that?");
      clearTimeout(wrongTimer.current);
      wrongTimer.current = setTimeout(() => setWrong(null), 700);
    }
  };

  const goNext = () => {
    if (index + 1 < rounds.length) {
      setIndex(index + 1);
      setPlaced([]);
      setWrong(null);
    } else {
      stopSpeaking();
      setFinished(true);
    }
  };

  const replay = () => {
    setRounds(makeStoryRounds());
    setIndex(0);
    setPlaced([]);
    setWrong(null);
    setMistakes(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <ResultCard
        stars={mistakes <= 1 ? 3 : mistakes <= 4 ? 2 : 1}
        message={mistakes === 0 ? "Every story in order first time!" : `You put all ${rounds.length} stories in order!`}
        onReplay={replay}
      />
    );
  }

  const picture = (p, className = "") => (
    <CutPicture level={11} page={story.page} box={story.boxes[p]} size="full" className={className} />
  );

  return (
    <div className="kid-card tone-white mx-auto w-full max-w-3xl p-4 text-center sm:p-6">
      <div className="flex items-center justify-between gap-3 text-sm font-bold text-kid-soft sm:text-base">
        <span>
          Story {index + 1} of {rounds.length}
        </span>

        <span className="rounded-full bg-tone-butter px-3 py-1 text-kid-ink">In order {placed.length} / 3</span>
      </div>

      <div className="mt-4 rounded-3xl border-4 border-dashed border-yellow-400 bg-yellow-50 p-4 sm:p-6">
        <h3 className="text-2xl font-bold text-kid-ink sm:text-3xl">{story.title}</h3>

        <p className="mt-1 text-base font-bold text-kid-soft sm:text-lg">
          What happens first? Tap the pictures in order: 1, 2, 3.
        </p>

        {/* the story as it is put together: a box for each step */}
        <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-4">
          {[0, 1, 2].map((step) => (
            <div
              key={step}
              role="img"
              aria-label={placed[step] !== undefined ? `${step + 1}: ${story.shows[placed[step]]}` : `${step + 1}: empty`}
              className={`flex flex-col items-center gap-1 rounded-2xl p-2 ${
                placed[step] !== undefined ? "bg-green-500 ring-4 ring-green-600" : "border-4 border-dashed border-orange-400 bg-white"
              }`}
            >
              <span className={`text-xl font-bold sm:text-2xl ${placed[step] !== undefined ? "text-white" : "text-orange-500"}`}>
                {step + 1}
              </span>

              {placed[step] !== undefined ? (
                <div aria-hidden="true" className="w-full">
                  {picture(placed[step], "mx-auto max-w-40")}
                </div>
              ) : (
                <span aria-hidden="true" className="grid aspect-square w-full max-w-40 place-items-center text-4xl text-orange-300">
                  ?
                </span>
              )}
            </div>
          ))}
        </div>

        {/* the pictures to choose from, in a mixed-up order */}
        <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-4">
          {story.shown.map((p) => {
            const used = placed.includes(p);

            return (
              <button
                key={p}
                type="button"
                disabled={used || done}
                onClick={() => tap(p)}
                aria-label={story.shows[p]}
                className={`rounded-2xl p-2 transition active:scale-95 disabled:cursor-default ${
                  used
                    ? "bg-white opacity-30 ring-4 ring-green-100"
                    : wrong === p
                      ? "bg-red-500 ring-4 ring-red-600"
                      : "bg-white ring-4 ring-green-300 hover:scale-105 hover:ring-green-400"
                }`}
              >
                {picture(p, "mx-auto max-w-40")}
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="mt-5 min-h-8 text-xl font-bold text-kid-ink sm:text-2xl">
          {done ? "🎉 The story is in order!" : wrong !== null ? "😊 Not yet, what happens before that?" : ""}
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
  {
    id: "match",
    label: "Read and Match",
    emoji: "🔗",
    render: () => <MatchGame makeRound={makeMatchRound} noun="phrase" wordClass="text-xl sm:text-3xl" />,
  },
  {
    id: "phrase",
    label: "Complete the Phrase",
    emoji: "✏️",
    render: () => <QuizGame makeQuestions={makeCompleteThePhrase} optionTextClass="text-3xl sm:text-4xl" />,
  },
  {
    id: "arrange",
    label: "Arrange the Words",
    emoji: "🔀",
    render: () => (
      <TileBuildGame
        makeRounds={makeArrangeRounds}
        heading="Tap the words in order"
        sayTile={bare}
        unit="word"
        noun="sentence"
        textClass="text-2xl sm:text-3xl"
      />
    ),
  },
  {
    id: "understand",
    label: "Read and Understand",
    emoji: "📖",
    render: () => (
      <QuizGame
        makeQuestions={makeReadAndUnderstand}
        hideLabels
        columns="grid-cols-3"
        optionTextClass="text-sm sm:text-base"
        displayClass="text-3xl sm:text-5xl"
      />
    ),
  },
  {
    id: "fill",
    label: "Fill in the Missing Word",
    emoji: "🧩",
    render: () => <QuizGame makeQuestions={makeFillTheWord} optionTextClass="text-2xl sm:text-3xl" />,
  },
  {
    id: "choose",
    label: "Choose the Sentence",
    emoji: "✅",
    render: () => (
      <QuizGame makeQuestions={makeChooseTheSentence} columns="grid-cols-1 sm:grid-cols-2" optionTextClass="text-xl sm:text-2xl" />
    ),
  },
  { id: "story", label: "Picture Story", emoji: "🖼️", render: () => <PictureStory /> },
  { id: "pages", label: "Download Worksheets", emoji: "📥", render: () => <PhonicsWorksheets level={11} /> },
];

export default function PhonicsLevel11() {
  return <PhonicsLevelLayout level={11} activities={ACTIVITIES} />;
}

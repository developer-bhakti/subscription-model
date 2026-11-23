import { useState } from "react";
import { LETTERS } from "../../../data/phonicsData";
import { getLetterPage } from "../../../data/phonicsFiles";
import { L2_PAGES } from "../../../data/phonicsLessons";
import { ListenButton, PageCrop, PhonicsLevelLayout, Picture, PickAllGame, QuizGame } from "./PhonicsShared";
import PhonicsWorksheets, { WorksheetButton } from "./PhonicsWorksheets";
import { hasPicture, pickOtherLetters, pickRandom, saySequence, shuffle } from "./phonicsUtils";

// LEVEL 2: Sounds of Letters
// Follows the "Letter and Sound" worksheets: 1 listen and say, 2 say the name and circle the
// pictures that begin with the sound, 3 colour them, 4 write the missing letter.

// The "1 Listen and say" box on a Level 2 page: the three pictures with their names, as a
// [x0, y0, x1, y1] part of the page. The names end by about 0.40 on every page and the next
// section's heading starts at 0.43 or later, so the bottom edge sits between the two.
const LISTEN_BOX = [0.015, 0.205, 0.505, 0.424];

/* ------------------------------ 1. Explore the sounds ------------------------------ */

function SoundExplorer() {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(-1);
  const { letter, vowel } = LETTERS[index];
  const { sound, words } = L2_PAGES[letter];
  const page = getLetterPage(2, letter);

  // "buh, buh, ball, bat, bus": the sound twice, then the three words on the sheet.
  const play = (i) => {
    const target = LETTERS[i];

    saySequence([target.say, target.say, ...L2_PAGES[target.letter].words], setActive);
  };

  const show = (i) => {
    const next = (i + LETTERS.length) % LETTERS.length;

    setIndex(next);
    play(next);
  };

  return (
    <div>
      <div className="kid-card tone-white mx-auto grid max-w-4xl items-center gap-5 p-5 text-center sm:p-8 md:grid-cols-2">
        <div>
          <div className="kid-chip mx-auto h-40 w-40 text-8xl font-bold text-kid-deep sm:h-48 sm:w-48 sm:text-9xl">
            {letter}
          </div>

          <p className="mt-4 text-4xl font-bold text-kid-green sm:text-5xl" aria-label={`The sound ${sound}`}>
            /{sound}/
          </p>

          {vowel && <span className="kid-pill mt-3">VOWEL</span>}
        </div>

        <div>
          <h3 className="text-2xl font-bold text-kid-ink sm:text-3xl">
            {letter} says <span className="text-kid-green">/{sound}/</span>
          </h3>

          <p className="mt-1 text-lg font-semibold text-kid-soft sm:text-xl">as in</p>

          {page ? (
            // the three pictures exactly as printed on the worksheet
            <PageCrop
              src={page.image}
              box={LISTEN_BOX}
              label={words.join(", ")}
              className="mx-auto mt-3 w-full max-w-sm rounded-2xl bg-white ring-2 ring-green-100"
            />
          ) : (
            <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
              {words.map((word, i) => (
                <div
                  key={word}
                  className={`flex flex-col items-center rounded-2xl bg-white p-2 transition sm:p-3 ${
                    active === i + 2 ? "scale-110 ring-4 ring-kid-sun" : "ring-2 ring-green-100"
                  }`}
                >
                  <Picture word={word} size="lg" />

                  <p className="mt-1 text-base font-bold text-kid-ink sm:text-lg">
                    <span className="text-red-600">{word[0]}</span>
                    {word.slice(1)}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button type="button" className="kid-btn kid-btn-soft" onClick={() => show(index - 1)}>
              ← Back
            </button>

            <ListenButton onClick={() => play(index)}>Hear it</ListenButton>

            <button type="button" className="kid-btn" onClick={() => show(index + 1)}>
              Next →
            </button>
          </div>

          <div className="mt-3 flex justify-center">
            <WorksheetButton level={2} letter={letter} />
          </div>
        </div>
      </div>

      <p className="mt-6 mb-3 text-center text-sm font-bold text-kid-soft sm:text-base">
        Tap a letter to hear its sound!
      </p>

      <div className="tone-cycle grid grid-cols-5 gap-2 sm:grid-cols-7 sm:gap-3 md:grid-cols-9 lg:grid-cols-13">
        {LETTERS.map((l, i) => (
          <button
            key={l.letter}
            type="button"
            onClick={() => show(i)}
            aria-label={`Letter ${l.letter} says ${L2_PAGES[l.letter].sound}`}
            aria-pressed={i === index}
            className={`kid-card kid-card-hover grid aspect-square place-items-center rounded-2xl text-2xl font-bold text-kid-ink sm:text-3xl ${
              i === index ? "ring-4 ring-kid-green" : ""
            } ${l.vowel ? "border-orange-300" : ""}`}
          >
            {l.letter}
          </button>
        ))}
      </div>

      <p className="mt-3 text-center text-xs font-semibold text-kid-soft sm:text-sm">
        Orange-edged letters are vowels: a, e, i, o, u.
      </p>
    </div>
  );
}

/* ------------------------------- 2. Sound hunt ------------------------------- */
// Worksheet steps 2 and 3: "Circle / colour the pictures that begin with the /b/ sound."
// The six pictures are the ones printed on that letter's page.

const makeSoundRounds = () =>
  pickRandom(LETTERS, 5).map(({ letter, say: sayText }) => {
    const { sound, hunt } = L2_PAGES[letter];

    return {
      key: letter,
      prompt: `Tap all the pictures that begin with the /${sound}/ sound`,
      display: `/${sound}/`,
      speak: `Tap all the pictures that begin with the sound ${sayText}.`,
      items: hunt.map((word, i) => ({
        id: `${letter}-${i}`,
        word,
        correct: word.toLowerCase().startsWith(letter.toLowerCase()),
      })),
    };
  });

/* ----------------------------- 3. Write the missing letter ----------------------------- */
// Worksheet step 4: "Write the missing letter and tell the name of the object."

const makeMissingLetter = () => {
  // The picture is the clue, so only words that can be shown as a picture are used.
  const all = LETTERS.flatMap(({ letter }) =>
    L2_PAGES[letter].words.filter(hasPicture).map((word) => ({ letter, word })),
  );

  return pickRandom(all, 10).map(({ letter, word }) => {
    const others = pickOtherLetters(letter, 2);
    const lower = letter.toLowerCase();
    const { say: sayText } = LETTERS.find((l) => l.letter === letter);

    return {
      prompt: "Which letter is missing?",
      display: (
        <>
          <span className="flex justify-center">
            <Picture word={word} size="xl" />
          </span>
          <span className="mt-2 block text-4xl text-kid-ink sm:text-5xl">_{word.slice(1)}</span>
        </>
      ),
      speak: word,
      explain: `${word} starts with ${sayText}. ${letter} for ${word}.`,
      options: shuffle([lower, ...others.map((o) => o.letter.toLowerCase())]).map((l) => ({ value: l, label: l })),
      answer: lower,
    };
  });
};

/* ------------------------------------- the page ------------------------------------- */

const ACTIVITIES = [
  { id: "explore", label: "Sound Explorer", emoji: "🔈", render: () => <SoundExplorer /> },
  { id: "hunt", label: "Sound Hunt", emoji: "🔍", render: () => <PickAllGame makeRounds={makeSoundRounds} /> },
  {
    id: "missing",
    label: "Missing Letter",
    emoji: "✏️",
    render: () => <QuizGame makeQuestions={makeMissingLetter} />,
  },
  { id: "pages", label: "Download Worksheets", emoji: "📥", render: () => <PhonicsWorksheets level={2} /> },
];

export default function PhonicsLevel2() {
  return <PhonicsLevelLayout level={2} activities={ACTIVITIES} />;
}

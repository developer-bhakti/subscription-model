import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton, PageHero } from "../KidsUI";
import { speakAsGirl } from "../../services/speech";
import { LETTER_NAMES } from "../../data/traceGlyphs";
import TraceGame from "./TraceGame";

// The "Cognitive Skill" card on the Online Tools page opens here: pick a class, then a game. So far the
// game is "Trace It" (follow the dotted shape of a letter or number with a finger); more cognitive games
// can be added to the list of games below. What a class traces:
//   PG: the letters A to Z (capital and small) and the numbers 1 to 10
//   Nursery: 1 to 20      LKG: 1 to 50      UKG: 1 to 100
const classes = [
  { id: "pg", name: "PG", emoji: "🍼", desc: "Play Group", numbers: 10, letters: true },
  { id: "nursery", name: "Nursery", emoji: "🧸", desc: "Nursery class", numbers: 20, letters: false },
  { id: "lkg", name: "LKG", emoji: "📚", desc: "Lower KG", numbers: 50, letters: false },
  { id: "ukg", name: "UKG", emoji: "🎓", desc: "Upper KG", numbers: 100, letters: false },
];

// Say something in the app's girl voice, cutting off whatever was being said.
const say = (text) => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  speakAsGirl(text, { rate: 0.8 });
};

const traceTitle = (cls) => (cls.letters ? "Trace Letters & Numbers" : `Trace Numbers 1 to ${cls.numbers}`);
const traceText = (cls) =>
  cls.letters
    ? `Trace the letters A to Z, capital and small, and the numbers 1 to ${cls.numbers}.`
    : `Trace the numbers 1 to ${cls.numbers} with your finger.`;

/* ------------------------------------ the tracing screen ------------------------------------ */

function TraceScreen({ cls, onBack }) {
  const [tab, setTab] = useState(cls.letters ? "letters" : "numbers");
  const [letter, setLetter] = useState("A");
  const [lower, setLower] = useState(false);
  const [number, setNumber] = useState(1);
  const [attempt, setAttempt] = useState(0);
  const [done, setDone] = useState(false);
  const [stars, setStars] = useState(0);

  const numbers = Array.from({ length: cls.numbers }, (_, i) => i + 1);
  const isLetters = tab === "letters";
  const name = isLetters ? letter : String(number);

  // Any change to what is being traced starts a fresh board.
  const restart = () => {
    setDone(false);
    setAttempt((a) => a + 1);
  };

  const pickLetter = (l) => {
    setLetter(l);
    restart();
    say(l);
  };

  const pickNumber = (n) => {
    setNumber(n);
    restart();
    say(String(n));
  };

  const next = () => {
    if (isLetters) {
      pickLetter(LETTER_NAMES[(LETTER_NAMES.indexOf(letter) + 1) % LETTER_NAMES.length]);
    } else {
      pickNumber(number % cls.numbers + 1);
    }
  };

  const completed = () => {
    setDone(true);
    setStars((s) => s + 1);
    say("Well done!");
  };

  const chooseTab = (id) => {
    setTab(id);
    restart();
  };

  const tabClass = (id) => `kid-btn ${tab === id ? "" : "kid-btn-soft"}`;

  return (
    <div>
      <div className="mb-4">
        <BackButton onClick={onBack}>← Games</BackButton>
      </div>

      <PageHero emoji="✏️" title={`Trace It – ${cls.name}`} subtitle="Press the big dot and follow the shape with your finger." />

      {cls.letters && (
        <div role="tablist" aria-label="What to trace" className="mb-5 flex flex-wrap justify-center gap-3">
          <button type="button" role="tab" aria-selected={isLetters} className={tabClass("letters")} onClick={() => chooseTab("letters")}>
            <span aria-hidden="true">✏️</span> Letters
          </button>

          <button type="button" role="tab" aria-selected={!isLetters} className={tabClass("numbers")} onClick={() => chooseTab("numbers")}>
            <span aria-hidden="true">🔢</span> Numbers
          </button>
        </div>
      )}

      {/* what to trace */}
      <div className="mx-auto mb-5 flex max-w-4xl flex-wrap justify-center gap-2" role="group" aria-label={isLetters ? "Letters" : "Numbers"}>
        {isLetters
          ? LETTER_NAMES.map((l) => (
              <button
                key={l}
                type="button"
                aria-pressed={l === letter}
                onClick={() => pickLetter(l)}
                className={`kid-btn h-11 w-11 p-0 text-lg ${l === letter ? "" : "kid-btn-soft"}`}
              >
                {lower ? l.toLowerCase() : l}
              </button>
            ))
          : numbers.map((n) => (
              <button
                key={n}
                type="button"
                aria-pressed={n === number}
                onClick={() => pickNumber(n)}
                className={`kid-btn h-11 min-w-11 px-2 text-lg ${n === number ? "" : "kid-btn-soft"}`}
              >
                {n}
              </button>
            ))}
      </div>

      {isLetters && (
        <div className="mb-4 flex justify-center gap-3">
          <button
            type="button"
            aria-pressed={!lower}
            className={`kid-btn ${lower ? "kid-btn-soft" : ""}`}
            onClick={() => {
              setLower(false);
              restart();
            }}
          >
            A Capital
          </button>

          <button
            type="button"
            aria-pressed={lower}
            className={`kid-btn ${lower ? "" : "kid-btn-soft"}`}
            onClick={() => {
              setLower(true);
              restart();
            }}
          >
            a Small
          </button>
        </div>
      )}

      <p className="mb-3 text-center text-lg font-bold text-kid-ink">⭐ {stars} traced</p>

      <div className="mx-auto w-full max-w-sm">
        <div className="kid-card tone-white p-3">
          <TraceGame
            key={`${tab}-${name}-${lower}-${attempt}`}
            letter={isLetters ? letter : undefined}
            lower={isLetters && lower}
            number={isLetters ? undefined : number}
            onComplete={completed}
          />
        </div>

        <p aria-live="polite" className="mt-4 min-h-8 text-center text-lg font-bold text-kid-ink">
          {done ? `🎉 Well done! You traced ${isLetters && lower ? name.toLowerCase() : name}.` : "Start at the big dot and follow it!"}
        </p>

        <div className="mt-3 flex flex-wrap justify-center gap-3">
          <button type="button" className="kid-btn kid-btn-soft" onClick={restart}>
            Try again
          </button>

          <button type="button" className="kid-btn kid-btn-teal" onClick={() => say(name)}>
            <span aria-hidden="true">🔊</span> Listen
          </button>

          <button type="button" className={`kid-btn ${done ? "kid-btn-sun" : ""}`} onClick={next}>
            Next ➜
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------- the page ------------------------------------- */

const CognitiveSkills = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState(null);
  const [playing, setPlaying] = useState(false);
  const chosen = classes.find((cls) => cls.id === selectedClass);

  // THE GAME
  if (chosen && playing) {
    return <TraceScreen cls={chosen} onBack={() => setPlaying(false)} />;
  }

  // THE CLASS'S GAMES
  if (chosen) {
    return (
      <div>
        <PageHero emoji="🧠" title={`Cognitive Skill – ${chosen.name}`} subtitle="Which game do you want to play?" />

        <div className="tone-cycle mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          <div className="kid-card kid-card-hover flex flex-col p-6 text-center">
            <div className="kid-chip mx-auto h-24 w-24 text-5xl">✏️</div>

            <h2 className="mt-4 text-xl font-bold text-kid-ink">{traceTitle(chosen)}</h2>

            <p className="mt-2 text-sm font-medium text-kid-soft">{traceText(chosen)}</p>

            <div className="mt-auto pt-5">
              <button type="button" onClick={() => setPlaying(true)} className="kid-btn px-8 py-3 text-lg">
                ▶ Play Now
              </button>
            </div>
          </div>

          <div className="kid-card flex flex-col items-center justify-center border-dashed p-6 text-center">
            <div className="text-5xl" aria-hidden="true">
              🚧
            </div>

            <h2 className="mt-4 text-xl font-bold text-kid-ink">More games coming soon!</h2>

            <p className="mt-2 text-sm font-medium text-kid-soft">
              More cognitive skill games for {chosen.name} will be added here.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button type="button" onClick={() => setSelectedClass(null)} className="kid-btn kid-btn-soft">
            ⬅ Back To Classes
          </button>
        </div>
      </div>
    );
  }

  // CLASS SELECTION
  return (
    <div>
      <div className="mb-4">
        <BackButton onClick={() => navigate("/user/online-games")}>← Online Tools</BackButton>
      </div>

      <PageHero emoji="🧠" title="Cognitive Skill" subtitle="Choose your class to begin." />

      <div className="tone-cycle grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {classes.map((cls) => (
          <div key={cls.id} className="kid-card kid-card-hover p-8 text-center">
            <div className="kid-chip mx-auto h-28 w-28 text-6xl">{cls.emoji}</div>

            <h2 className="mt-4 text-3xl font-bold text-kid-ink">{cls.name}</h2>

            <p className="mt-3 font-medium text-kid-soft">{cls.desc}</p>

            <button type="button" onClick={() => setSelectedClass(cls.id)} className="kid-btn mt-6 px-8 py-3 text-lg">
              ▶ Choose
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CognitiveSkills;

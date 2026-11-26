import React, { useState } from "react";
import { speakAsGirl } from "../../services/speech";
import { LETTER_NAMES } from "../../data/traceGlyphs";
import TraceGame from "./TraceGame";

// The screen of a tracing game in Online Tools: "Trace Numbers" in Numeracy Skills and "Trace Letters" in
// Literacy Skills. The child picks a number or a letter, presses the big dot on the board and follows the shape with
// a finger (or the mouse); a star is counted for every shape traced. It sits in the same frame as the other games of
// those pages, with the game's name and the class at the top and "Back To Games" at the bottom.
//
//   <TraceScreen kind="numbers" max={20} ... />                    the numbers 1 to 20
//   <TraceScreen kind="letters" styles={["capital", "small"]} ... /> A to Z, with a button for each way of writing them

// How each way of writing a letter is offered, and how a letter looks on its button.
const LETTER_STYLES = {
  capital: { label: "Capital", sample: "A", show: (l) => l.toUpperCase() },
  small: { label: "Small", sample: "a", show: (l) => l.toLowerCase() },
  cursive: { label: "Cursive", sample: "✍️", show: (l) => l.toLowerCase() },
};

// Say something in the app's girl voice, cutting off whatever was being said.
const say = (text) => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  speakAsGirl(text, { rate: 0.8 });
};

export default function TraceScreen({ kind, max = 10, styles = ["capital"], game, classInfo, onBack }) {
  const isLetters = kind === "letters";
  const [style, setStyle] = useState(styles[0]);
  const [letter, setLetter] = useState("A");
  const [number, setNumber] = useState(1);
  const [attempt, setAttempt] = useState(0);
  const [done, setDone] = useState(false);
  const [stars, setStars] = useState(0);

  const numbers = Array.from({ length: max }, (_, i) => i + 1);
  const show = LETTER_STYLES[style].show;
  // What is on the board, as the child sees it ("7", "A", "a" or "cursive a").
  const shown = isLetters ? `${style === "cursive" ? "cursive " : ""}${show(letter)}` : String(number);

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

  const pickStyle = (s) => {
    setStyle(s);
    restart();
  };

  const next = () => {
    if (isLetters) {
      pickLetter(LETTER_NAMES[(LETTER_NAMES.indexOf(letter) + 1) % LETTER_NAMES.length]);
    } else {
      pickNumber((number % max) + 1);
    }
  };

  const completed = () => {
    setDone(true);
    setStars((s) => s + 1);
    say("Well done!");
  };

  return (
    <div className="min-h-[calc(100vh-9rem)] rounded-[28px] bg-gradient-to-br from-[#d9f3df] via-[#e4f5e6] to-[#eef9d2] flex justify-center items-center p-4">
      <div className="kid-card tone-white w-full max-w-4xl p-4 text-center sm:p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-kid-ink">
          {game.emoji} {game.name}
        </h1>

        <p className="text-gray-500 mt-1">
          {classInfo.emoji} {classInfo.name}
        </p>

        <p className="mt-2 text-sm font-medium text-kid-soft sm:text-base">
          Press the big dot and follow the shape with your finger.
        </p>

        {/* what to trace */}
        <div
          className="mx-auto mt-5 mb-5 flex max-w-4xl flex-wrap justify-center gap-2"
          role="group"
          aria-label={isLetters ? "Letters" : "Numbers"}
        >
          {isLetters
            ? LETTER_NAMES.map((l) => (
                <button
                  key={l}
                  type="button"
                  aria-pressed={l === letter}
                  aria-label={`${style === "cursive" ? "cursive " : ""}${show(l)}`}
                  onClick={() => pickLetter(l)}
                  className={`kid-btn h-11 w-11 p-0 text-lg ${l === letter ? "" : "kid-btn-soft"}`}
                >
                  {show(l)}
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

        {/* the ways of writing the letters this class learns (capital and small, or capital and cursive) */}
        {isLetters && styles.length > 1 && (
          <div className="mb-4 flex flex-wrap justify-center gap-3" role="group" aria-label="How to write the letters">
            {styles.map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={style === id}
                className={`kid-btn ${style === id ? "" : "kid-btn-soft"}`}
                onClick={() => pickStyle(id)}
              >
                <span aria-hidden="true">{LETTER_STYLES[id].sample}</span> {LETTER_STYLES[id].label}
              </button>
            ))}
          </div>
        )}

        <p className="mb-3 text-center text-lg font-bold text-kid-ink">⭐ {stars} traced</p>

        <div className="mx-auto w-full max-w-sm">
          <div className="kid-card tone-white p-3">
            <TraceGame
              key={`${kind}-${shown}-${attempt}`}
              letter={isLetters ? letter : undefined}
              style={style}
              number={isLetters ? undefined : number}
              onComplete={completed}
            />
          </div>

          <p aria-live="polite" className="mt-4 min-h-8 text-center text-lg font-bold text-kid-ink">
            {done ? `🎉 Well done! You traced ${shown}.` : "Start at the big dot and follow it!"}
          </p>

          <div className="mt-3 flex flex-wrap justify-center gap-3">
            <button type="button" className="kid-btn kid-btn-soft" onClick={restart}>
              Try again
            </button>

            <button
              type="button"
              className="kid-btn kid-btn-teal"
              onClick={() => say(isLetters ? letter : String(number))}
            >
              <span aria-hidden="true">🔊</span> Listen
            </button>

            <button type="button" className={`kid-btn ${done ? "kid-btn-sun" : ""}`} onClick={next}>
              Next ➜
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button type="button" onClick={onBack} className="kid-btn kid-btn-soft">
            ⬅ Back To Games
          </button>
        </div>
      </div>
    </div>
  );
}

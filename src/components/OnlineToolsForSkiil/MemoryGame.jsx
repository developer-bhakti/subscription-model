import React, { useEffect, useRef, useState } from "react";
import { makeMemoryDeck } from "../../data/cognitiveGames";
import { ListenButton, ResultCard } from "../PhonicsSkills/PhonicsShared";
import { say, stopSpeaking } from "../PhonicsSkills/phonicsUtils";

// The Cognitive Skill "Remember Game": flip cards to find the matching pairs. Every card is shown face up for a few
// seconds first ("Look and remember!"), then they all turn over. The child turns two at a time: a pair stays face up,
// two different pictures turn back over. When every pair is found the board earns stars for how few turns it took, and
// "Next cards" deals a new board with new pictures, as many times as the child likes. The boards and stars add up
// until the child taps "Finish & See Score" (or leaves the game).
//
// `pairs` is how many pairs there are and `preview` how many seconds the cards are shown first (see MEMORY_LEVELS).

const FLIP_BACK_MS = 1000;

// Columns of cards: six cards in three columns, more in four, and the more cards the narrower each one, so the whole
// board fits on the screen.
const gridFor = (cards) =>
  cards <= 6 ? "grid-cols-3 max-w-md" : cards <= 8 ? "grid-cols-4 max-w-lg" : "grid-cols-4 max-w-xl";

// Stars: three for finding the pairs in up to one and a half times the fewest turns possible, two for up to two and a
// half times, then one.
const starsFor = (turns, pairs) => (turns <= pairs * 1.5 ? 3 : turns <= pairs * 2.5 ? 2 : 1);

function Card({ card, faceUp, matched, onFlip, disabled, index }) {
  return (
    <button
      type="button"
      onClick={onFlip}
      disabled={disabled}
      aria-label={faceUp || matched ? `Card ${index + 1}: ${card.name}${matched ? ", matched" : ""}` : `Card ${index + 1}, face down`}
      className="relative aspect-square w-full rounded-2xl perspective-midrange disabled:cursor-default"
    >
      <span
        className={`absolute inset-0 rounded-2xl transition-transform duration-500 transform-3d motion-reduce:transition-none ${
          faceUp || matched ? "transform-[rotateY(180deg)]" : ""
        }`}
      >
        {/* the back of the card */}
        <span
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center rounded-2xl bg-kid-green text-3xl font-bold text-white shadow-md ring-4 ring-green-300 backface-hidden sm:text-5xl"
          style={{
            backgroundImage: "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.25) 0 12%, transparent 13%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 0 10%, transparent 11%)",
          }}
        >
          ?
        </span>

        {/* the picture */}
        <span
          aria-hidden="true"
          className={`absolute inset-0 flex flex-col items-center justify-center gap-0.5 rounded-2xl bg-white p-1 shadow-md backface-hidden transform-[rotateY(180deg)] ${
            matched ? "ring-4 ring-green-500" : "ring-4 ring-yellow-400"
          }`}
        >
          <span className="text-3xl leading-none sm:text-5xl">{card.emoji}</span>
          <span className="max-w-full truncate text-[11px] font-bold text-kid-ink sm:text-sm">{card.name}</span>
          {matched && <span className="absolute right-1 top-0.5 text-sm text-green-600 sm:text-base">✔</span>}
        </span>
      </span>
    </button>
  );
}

export default function MemoryGame({ pairs, preview }) {
  const [deck, setDeck] = useState(() => makeMemoryDeck(pairs));
  const [phase, setPhase] = useState("preview"); // preview, play, won (this board), finished (the whole game)
  const [secondsLeft, setSecondsLeft] = useState(preview);
  const [open, setOpen] = useState([]); // ids of the cards turned up this turn (one or two)
  const [matched, setMatched] = useState([]); // keys of the pairs found
  const [turns, setTurns] = useState(0);
  const [message, setMessage] = useState("Look and remember where the pictures are!");
  const [boards, setBoards] = useState(0); // boards finished so far
  const [starsTotal, setStarsTotal] = useState(0);
  const [boardStars, setBoardStars] = useState(0); // stars for the board just finished
  const flipTimer = useRef(null);

  useEffect(() => () => clearTimeout(flipTimer.current), []);

  // Say what to do when a game starts.
  useEffect(() => {
    if (phase === "preview") say("Look and remember where the pictures are!");
  }, [deck, phase]);

  // Every card turns over and the turns begin.
  const startPlay = () => {
    setPhase("play");
    setSecondsLeft(0);
    setMessage("Turn two cards over to find a pair.");
    say("Now find the pairs!");
  };

  // The look-and-remember countdown: a second at a time, then the cards turn over.
  useEffect(() => {
    if (phase !== "preview") return undefined;

    const timer = setTimeout(() => {
      if (secondsLeft <= 1) startPlay();
      else setSecondsLeft((s) => s - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [phase, secondsLeft]);

  const flip = (card) => {
    if (phase !== "play" || open.length === 2 || open.includes(card.id) || matched.includes(card.key)) return;

    if (open.length === 0) {
      setOpen([card.id]);
      say(card.name);
      return;
    }

    const first = deck.cards.find((c) => c.id === open[0]);
    const turnsNow = turns + 1;

    setOpen([first.id, card.id]);
    setTurns(turnsNow);

    if (first.key === card.key) {
      const found = [...matched, card.key];

      setMatched(found);
      setOpen([]);

      if (found.length === pairs) {
        const stars = starsFor(turnsNow, pairs);

        setPhase("won");
        setBoards((b) => b + 1);
        setStarsTotal((t) => t + stars);
        setBoardStars(stars);
        setMessage(`🎉 You found all ${pairs} pairs in ${turnsNow} turns!`);
        say(`${card.name}! You found all the pairs. Well done! Tap Next cards to play again.`);
      } else {
        setMessage(`🎉 A pair of ${card.name} cards!`);
        say(`${card.name}! It's a match!`);
      }
    } else {
      setMessage("😊 Not a pair. Remember them and try again!");
      say(card.name);
      flipTimer.current = setTimeout(() => setOpen([]), FLIP_BACK_MS);
    }
  };

  // A new board with new pictures; the boards and stars so far are kept.
  const nextBoard = () => {
    clearTimeout(flipTimer.current);
    stopSpeaking();
    setDeck(makeMemoryDeck(pairs));
    setPhase("preview");
    setSecondsLeft(preview);
    setOpen([]);
    setMatched([]);
    setTurns(0);
    setMessage("Look and remember where the pictures are!");
  };

  // Starts the whole game again from nothing.
  const replay = () => {
    nextBoard();
    setBoards(0);
    setStarsTotal(0);
  };

  const finish = () => {
    clearTimeout(flipTimer.current);
    stopSpeaking();
    setPhase("finished");
  };

  if (phase === "finished") {
    return (
      <ResultCard
        stars={Math.max(1, Math.round(starsTotal / Math.max(1, boards)))}
        message={`You finished ${boards} ${boards === 1 ? "board" : "boards"} and earned ${starsTotal} ${
          starsTotal === 1 ? "star" : "stars"
        }!`}
        onReplay={replay}
      />
    );
  }

  const previewing = phase === "preview";
  const won = phase === "won";

  return (
    <div className="kid-card tone-white mx-auto w-full max-w-3xl p-4 text-center sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-bold text-kid-soft sm:text-base">
        <span>
          {deck.icon} {deck.theme}
        </span>

        <span className="flex flex-wrap justify-end gap-2">
          <span className="rounded-full bg-tone-butter px-3 py-1 text-kid-ink">
            Pairs {matched.length} / {pairs}
          </span>

          <span className="rounded-full bg-tone-aqua px-3 py-1 text-kid-ink">Turns {turns}</span>

          <span className="rounded-full bg-tone-lime px-3 py-1 text-kid-ink">
            🏆 {boards} {boards === 1 ? "board" : "boards"} • ⭐ {starsTotal}
          </span>
        </span>
      </div>

      <div className="mt-4 rounded-3xl border-4 border-dashed border-yellow-400 bg-yellow-50 p-3 sm:p-6">
        <h3 className="text-xl font-bold text-kid-ink sm:text-2xl">
          {previewing
            ? `Look and remember! ${secondsLeft}`
            : won
              ? `Well done! ${"⭐".repeat(boardStars)}`
              : "Find the matching pairs"}
        </h3>

        <div className={`mx-auto mt-4 grid gap-2 sm:gap-4 ${gridFor(deck.cards.length)}`}>
          {deck.cards.map((card, index) => (
            <Card
              key={card.id}
              card={card}
              index={index}
              faceUp={previewing || open.includes(card.id)}
              matched={matched.includes(card.key)}
              disabled={previewing || matched.includes(card.key)}
              onFlip={() => flip(card)}
            />
          ))}
        </div>

        <p aria-live="polite" className="mt-5 min-h-8 text-lg font-bold text-kid-ink sm:text-2xl">
          {message}
        </p>

        <div className="mt-3 flex flex-wrap justify-center gap-3">
          {previewing && (
            <button type="button" onClick={startPlay} className="kid-btn kid-btn-sun px-8 py-3 text-lg">
              I remember! Start ➜
            </button>
          )}

          {won && (
            <button type="button" onClick={nextBoard} className="kid-btn kid-btn-sun px-8 py-3 text-lg">
              Next cards ➜
            </button>
          )}

          {phase === "play" && (
            <>
              <ListenButton onClick={() => say("Turn two cards over. Find the pictures that are the same.")}>
                How to play
              </ListenButton>

              <button type="button" onClick={nextBoard} className="kid-btn kid-btn-soft">
                🔄 New cards
              </button>
            </>
          )}
        </div>
      </div>

      {boards > 0 && (
        <button type="button" onClick={finish} className="kid-btn kid-btn-soft mt-5">
          🏁 Finish & See Score
        </button>
      )}
    </div>
  );
}

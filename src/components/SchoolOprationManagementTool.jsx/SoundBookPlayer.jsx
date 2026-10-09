import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "../KidsArt";
import useSoundSpeaker from "./useSoundSpeaker";

// One player for every Sound Book. A page has two cards: what the picture is (the letter,
// the number or the name) on the left, and the picture itself on the right. Tapping either
// card, pressing Listen or turning the page reads the item aloud with the shared voice in
// useSoundSpeaker.

// Tailwind only keeps class names it can see in full, so each colour is written out here
// rather than built up from pieces. Both cards move on one step with every page, so
// neighbouring pages never look the same.
const pictureTones = ["tone-mint", "tone-lime", "tone-aqua", "tone-butter", "tone-rose"];

const labelColours = [
  "from-[#34c26b] to-[#1c9a52]",
  "from-[#2cc4a0] to-[#12987f]",
  "from-[#6dbb1f] to-[#4d9210]",
  "from-[#ffab4a] to-[#f08a1c]",
  "from-[#ff8fb0] to-[#ee6590]",
  "from-[#4fc3ec] to-[#1d9bc9]",
];

// The jump strip's current button takes the colour of the label card, in the same order.
const chipColours = [
  "bg-[#16a34a]",
  "bg-[#0d9488]",
  "bg-[#65a30d]",
  "bg-[#f08a1c]",
  "bg-[#ee6590]",
  "bg-[#1d9bc9]",
];

// A single letter or number can be huge; a long name has to stay inside its card.
const bigSize = (text) => {
  if (text.length <= 2) return "text-[8rem] sm:text-[10rem]";
  if (text.length <= 5) return "text-[3.5rem] sm:text-[4.75rem]";
  if (text.length <= 8) return "text-[2.75rem] sm:text-[3.5rem]";
  return "text-[2rem] sm:text-[2.75rem]";
};

// The more things there are to count, the smaller each one is drawn, so ten still fit.
const countSize = (count) => {
  if (count === 1) return "text-[7rem]";
  if (count === 2) return "text-[5.5rem]";
  if (count === 3) return "text-[4.5rem]";
  if (count <= 6) return "text-[3.75rem]";
  if (count <= 8) return "text-[3.25rem]";
  return "text-[2.75rem]";
};

export default function SoundBookPlayer({ book }) {
  const { speak, speaking, supported } = useSoundSpeaker();
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [heard, setHeard] = useState([]);

  const items = book.items;
  const total = items.length;
  const current = items[page];
  const isHeard = heard.includes(current.id);
  const allHeard = heard.length === total;

  // Confetti positions are fixed once so they do not jump on every re-render.
  const confetti = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        emoji: ["🎉", "⭐", "🎈", "✨"][i % 4],
        left: `${(i * 6 + 3) % 96}%`,
        delay: (i % 8) * 0.16,
      })),
    [],
  );

  // Hearing an item counts however it was triggered: a tap on either card, the Listen
  // button, or turning to its page.
  const play = (item) => {
    setHeard((prev) => (prev.includes(item.id) ? prev : [...prev, item.id]));
    speak(item.speech);
  };

  // Turning a page is itself the child's tap, so reading the new item straight away keeps
  // the book moving without them hunting for the speaker button.
  const goToPage = (next, dir) => {
    const target = (next + total) % total;

    setDirection(dir);
    setPage(target);
    play(items[target]);
  };

  return (
    <div className="relative overflow-hidden rounded-[28px] bg-linear-to-br from-tone-mint via-[#e4f5e6] to-[#eef9d2] p-4 sm:p-6">

      {/* Celebration rain once everything has been heard */}
      {allHeard &&
        confetti.map((bit, i) => (
          <motion.div
            key={i}
            aria-hidden="true"
            className="pointer-events-none absolute top-0 text-2xl"
            style={{ left: bit.left }}
            initial={{ y: -60, opacity: 0, rotate: 0 }}
            animate={{ y: 700, opacity: [0, 1, 1, 0], rotate: 360 }}
            transition={{ duration: 4.5, delay: bit.delay, repeat: Infinity }}
          >
            {bit.emoji}
          </motion.div>
        ))}

      <div className="relative">

        {/* Title and progress */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <h1 className="flex items-center gap-3 text-2xl font-semibold text-kid-ink sm:text-3xl">
            <span className="kid-chip h-12 w-12 text-2xl">{book.emoji}</span>
            {book.title}
          </h1>

          <span className="text-base font-semibold text-kid-soft">
            ⭐ {heard.length} of {total} heard
          </span>
        </div>

        <div className="mb-6 h-3 w-full overflow-hidden rounded-full bg-white/80 shadow-inner">
          <motion.div
            className="h-full rounded-full bg-linear-to-r from-lime-400 via-amber-400 to-orange-500"
            animate={{ width: `${total ? (heard.length / total) * 100 : 0}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        </div>

        {/* The two cards */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: direction > 0 ? 90 : -90 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -90 : 90 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6"
          >

            {/* Left card: the letter, number or name */}
            <motion.button
              type="button"
              onClick={() => play(current)}
              whileTap={{ scale: 0.97 }}
              aria-label={`Hear ${current.big}`}
              className={`relative flex min-h-70 flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-white/50 bg-linear-to-br ${
                labelColours[page % labelColours.length]
              } p-5 text-center text-white shadow-[0_6px_16px_rgba(20,83,45,0.12)] sm:min-h-90`}
            >
              <Star className="absolute left-4 top-4 h-7 w-7" />

              {/* Heard tick */}
              {isHeard && (
                <motion.span
                  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-base font-bold text-green-600 shadow-md"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 14 }}
                >
                  ✓
                </motion.span>
              )}

              <span className="flex max-w-full items-baseline justify-center gap-3 leading-none drop-shadow-lg">
                <span className={`wrap-break-word font-bold ${bigSize(current.big)}`}>
                  {current.big}
                </span>

                {current.small && (
                  <span className="text-[3.5rem] font-bold opacity-80 sm:text-[5rem]">
                    {current.small}
                  </span>
                )}
              </span>

              <span className="mt-6 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold">
                🔊 Tap to hear
              </span>
            </motion.button>

            {/* Right card: the picture */}
            <motion.button
              type="button"
              onClick={() => play(current)}
              whileTap={{ scale: 0.97 }}
              aria-label={`Hear ${current.caption ?? current.big}`}
              className={`kid-card ${pictureTones[page % pictureTones.length]} flex min-h-70 flex-col items-center justify-center gap-4 p-5 text-center sm:min-h-90 ${
                speaking ? "ring-4 ring-white" : ""
              }`}
            >
              <Star className="absolute right-4 top-4 h-7 w-7" />

              <motion.div
                className={`grid place-items-center bg-white shadow-lg ${
                  current.count
                    ? "w-full max-w-76 rounded-4xl p-5"
                    : "h-44 w-44 rounded-full sm:h-60 sm:w-60"
                }`}
                animate={speaking ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                transition={
                  speaking
                    ? { duration: 0.9, repeat: Infinity, ease: "easeInOut" }
                    : { type: "spring", stiffness: 300, damping: 18 }
                }
              >
                {current.count ? (
                  <span
                    aria-hidden="true"
                    className={`flex flex-wrap items-center justify-center gap-1 leading-none ${countSize(current.count)}`}
                  >
                    {Array.from({ length: current.count }, (_, i) => (
                      <span key={i}>{current.image}</span>
                    ))}
                  </span>
                ) : (
                  <span aria-hidden="true" className="text-[6rem] leading-none sm:text-[8.5rem]">
                    {current.image}
                  </span>
                )}
              </motion.div>

              {current.caption && (
                <span className="rounded-full bg-white px-6 py-2 text-xl font-semibold text-kid-ink shadow-sm sm:text-2xl">
                  {current.caption}
                </span>
              )}
            </motion.button>
          </motion.div>
        </AnimatePresence>

        {/* Previous, listen and next */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <motion.button
            type="button"
            onClick={() => goToPage(page - 1, -1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous"
            className="grid h-14 w-14 place-items-center rounded-full bg-white text-3xl text-kid-deep shadow-lg"
          >
            ‹
          </motion.button>

          <button
            type="button"
            onClick={() => play(current)}
            className="kid-btn kid-btn-sun px-8 py-3.5 text-lg"
          >
            <motion.span
              aria-hidden="true"
              animate={speaking ? { scale: [1, 1.25, 1] } : { scale: 1 }}
              transition={{ duration: 0.7, repeat: speaking ? Infinity : 0 }}
            >
              🔊
            </motion.span>
            {speaking ? "Listening..." : "Listen"}
          </button>

          <motion.button
            type="button"
            onClick={() => goToPage(page + 1, 1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next"
            className="grid h-14 w-14 place-items-center rounded-full bg-white text-3xl text-kid-deep shadow-lg"
          >
            ›
          </motion.button>
        </div>

        {!supported && (
          <p className="mt-4 text-center text-sm font-semibold text-amber-700">
            This browser cannot play the sounds. Please try Chrome.
          </p>
        )}

        {allHeard && (
          <motion.p
            className="mt-5 text-center text-xl font-semibold text-green-700"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 14 }}
          >
            🎉 {book.doneText ?? "You heard them all!"} 🎉
          </motion.p>
        )}

        {/* Jump straight to any page. The width cap makes 26 letters wrap 13 and 13, not 25 and a lone Z */}
        <div className="mx-auto mt-6 flex max-w-140 flex-wrap justify-center gap-1.5">
          {items.map((item, i) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => goToPage(i, i > page ? 1 : -1)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to ${item.big}`}
              aria-current={i === page ? "true" : undefined}
              className={`grid h-9 min-w-9 place-items-center rounded-xl px-1 text-base font-bold shadow-sm transition-colors ${
                i === page
                  ? `${chipColours[page % chipColours.length]} text-white`
                  : heard.includes(item.id)
                    ? "bg-white text-kid-deep"
                    : "bg-white/75 text-kid-soft"
              }`}
            >
              {item.strip}
            </motion.button>
          ))}
        </div>

      </div>
    </div>
  );
}

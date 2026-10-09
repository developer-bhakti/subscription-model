import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const pgLetters = [
  { letter: "A", word: "Apple", emoji: "🍎" },
  { letter: "B", word: "Ball", emoji: "⚽" },
  { letter: "C", word: "Cat", emoji: "🐱" },
  { letter: "D", word: "Dog", emoji: "🐶" },
  { letter: "E", word: "Elephant", emoji: "🐘" },
  { letter: "F", word: "Fish", emoji: "🐟" },
  { letter: "G", word: "Goat", emoji: "🐐" },
  { letter: "H", word: "Hat", emoji: "🎩" },
  { letter: "I", word: "Ice Cream", emoji: "🍦" },
  { letter: "J", word: "Jam", emoji: "🍓" },
  { letter: "K", word: "Kite", emoji: "🪁" },
  { letter: "L", word: "Lion", emoji: "🦁" },
  { letter: "M", word: "Monkey", emoji: "🐵" },
  { letter: "N", word: "Nose", emoji: "👃" },
  { letter: "O", word: "Orange", emoji: "🍊" },
  { letter: "P", word: "Pen", emoji: "🖊️" },
  { letter: "Q", word: "Queen", emoji: "👑" },
  { letter: "R", word: "Rabbit", emoji: "🐰" },
  { letter: "S", word: "Sun", emoji: "☀️" },
  { letter: "T", word: "Tiger", emoji: "🐯" },
  { letter: "U", word: "Umbrella", emoji: "☂️" },
  { letter: "V", word: "Van", emoji: "🚐" },
  { letter: "W", word: "Watch", emoji: "⌚" },
  { letter: "X", word: "Xylophone", emoji: "🎹" },
  { letter: "Y", word: "Yo-yo", emoji: "🪀" },
  { letter: "Z", word: "Zebra", emoji: "🦓" },
];

// Tailwind only keeps class names it can see in full, so every colour is written out
// here rather than built up from pieces. Pages cycle through these.
const pagePalette = [
  { page: "from-rose-400 via-pink-500 to-fuchsia-500", chip: "bg-rose-500" },
  { page: "from-orange-400 via-amber-500 to-yellow-400", chip: "bg-orange-500" },
  { page: "from-lime-400 via-green-500 to-emerald-500", chip: "bg-green-500" },
  { page: "from-teal-400 via-cyan-500 to-sky-500", chip: "bg-cyan-500" },
  { page: "from-blue-400 via-indigo-500 to-teal-500", chip: "bg-indigo-500" },
  { page: "from-purple-400 via-fuchsia-500 to-pink-500", chip: "bg-purple-500" },
];

// A class with `letters` opens the interactive book. For the rest, paste the sheet's
// link into its `pdf` — an empty `pdf` shows "Coming Soon" rather than a dead button.
const soundBooks = [
  {
    id: "pg",
    title: "PG Sound Book",
    age: "Age 2 to 3 Years",
    emoji: "🍼",
    tint: "bg-sky-50",
    description: "First letter sounds — turn the page and listen.",
    letters: pgLetters,
  },
  {
    id: "nursery",
    title: "Nursery Sound Book",
    age: "Age 3 to 4 Years",
    emoji: "👶",
    tint: "bg-rose-50",
    description: "Beginning phonics sounds and picture based practice.",
    pdf: "",
  },
  {
    id: "lkg",
    title: "LKG Sound Book",
    age: "Age 4 to 5 Years",
    emoji: "🧩",
    tint: "bg-amber-50",
    description: "Letter sounds, blending practice and sound recognition.",
    pdf: "",
  },
  {
    id: "ukg",
    title: "UKG Sound Book",
    age: "Age 5 to 6 Years",
    emoji: "🎓",
    tint: "bg-indigo-50",
    description: "Advanced phonics sounds, blends and reading readiness.",
    pdf: "",
  },
];

// Read at call time rather than cached at module load: browsers fill the voice list
// asynchronously, so a list grabbed too early is empty and the first tap would fall
// back to whatever language the browser defaults to.
const pickEnglishVoice = () => {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  // Prefer a local voice — a network voice can arrive late and sound clipped.
  const byLang = (lang) =>
    voices.find((v) => v.lang === lang && v.localService) ||
    voices.find((v) => v.lang === lang);

  return (
    byLang("en-IN") ||
    byLang("en-GB") ||
    byLang("en-US") ||
    voices.find((v) => v.lang && v.lang.startsWith("en")) ||
    null
  );
};

const SoundBooks = () => {
  const [openBook, setOpenBook] = useState(null);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [speaking, setSpeaking] = useState(false);
  const [heard, setHeard] = useState([]);
  const timerRef = useRef(null);

  const supported = typeof window !== "undefined" && "speechSynthesis" in window;

  const letters = openBook ? openBook.letters : [];
  const total = letters.length;
  const current = letters[page];
  const palette = pagePalette[page % pagePalette.length];
  const allHeard = total > 0 && heard.length === total;

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

  useEffect(() => {
    if (!supported) return;

    const synth = window.speechSynthesis;

    // Touching getVoices() nudges Chrome into loading the list, and the event keeps it
    // current if the voices land a moment later.
    const refresh = () => synth.getVoices();
    refresh();
    synth.addEventListener("voiceschanged", refresh);

    return () => {
      synth.removeEventListener("voiceschanged", refresh);
      if (timerRef.current) clearTimeout(timerRef.current);
      // Stop talking if the child leaves the page mid-word.
      synth.cancel();
    };
  }, [supported]);

  const speak = (letter, word) => {
    setHeard((prev) => (prev.includes(letter) ? prev : [...prev, letter]));

    if (!supported) return;

    const synth = window.speechSynthesis;

    // A second tap while the first is still playing would otherwise queue behind it and
    // run the two together — the main reason a page like this ends up sounding muddy.
    if (timerRef.current) clearTimeout(timerRef.current);
    synth.cancel();
    setSpeaking(true);

    // Chrome drops an utterance queued in the same tick as cancel(), so start just after.
    timerRef.current = setTimeout(() => {
      const voice = pickEnglishVoice();

      // Two utterances, not one string: the break between them gives a real pause, so
      // the letter lands on its own before the word follows.
      const parts = [`${letter}.`, `${letter} for ${word}.`];

      parts.forEach((text, index) => {
        const utterance = new SpeechSynthesisUtterance(text);

        utterance.rate = 0.7; // slow enough for a two year old to follow
        utterance.pitch = 1.1; // slightly bright, friendlier for children
        utterance.volume = 1;

        if (voice) {
          utterance.voice = voice;
          utterance.lang = voice.lang;
        } else {
          utterance.lang = "en-IN";
        }

        if (index === parts.length - 1) {
          utterance.onend = () => setSpeaking(false);
          utterance.onerror = () => setSpeaking(false);
        }

        synth.speak(utterance);
      });
    }, 80);
  };

  // Turning a page is itself the child's tap, so reading the new letter straight away
  // keeps the book moving without them hunting for the speaker button.
  const goToPage = (next, dir) => {
    const target = (next + total) % total;

    setDirection(dir);
    setPage(target);
    speak(letters[target].letter, letters[target].word);
  };

  const stopSpeaking = () => {
    if (supported) window.speechSynthesis.cancel();
    if (timerRef.current) clearTimeout(timerRef.current);
    setSpeaking(false);
  };

  const openSoundBook = (book) => {
    setOpenBook(book);
    setPage(0);
    setDirection(1);
    setHeard([]);
  };

  const closeBook = () => {
    stopSpeaking();
    setOpenBook(null);
    setHeard([]);
  };

  // INTERACTIVE BOOK
  if (openBook) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-sky-50 to-amber-50 py-8 px-4 font-playful">

        {/* Soft floating blobs, purely decorative */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-20 h-80 w-80 rounded-full bg-pink-300/50 blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/4 -right-24 h-96 w-96 rounded-full bg-sky-300/50 blur-3xl"
          animate={{ y: [0, -34, 0], x: [0, -18, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 left-1/3 h-80 w-80 rounded-full bg-lime-300/50 blur-3xl"
          animate={{ y: [0, -24, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Celebration rain once every letter has been heard */}
        {allHeard &&
          confetti.map((bit, i) => (
            <motion.div
              key={i}
              aria-hidden="true"
              className="pointer-events-none absolute top-0 text-2xl"
              style={{ left: bit.left }}
              initial={{ y: -60, opacity: 0, rotate: 0 }}
              animate={{ y: "100vh", opacity: [0, 1, 1, 0], rotate: 360 }}
              transition={{ duration: 4.5, delay: bit.delay, repeat: Infinity }}
            >
              {bit.emoji}
            </motion.div>
          ))}

        <div className="relative max-w-xl mx-auto">

          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-end justify-between mb-2">
              <span className="text-base font-semibold text-slate-700">
                ⭐ {heard.length} of {total} heard
              </span>

              <button
                onClick={closeBook}
                className="text-slate-500 hover:text-indigo-600 font-semibold text-sm bg-white/80 px-4 py-2 rounded-full shadow-sm"
              >
                ⬅ Back
              </button>
            </div>

            <div className="h-3 w-full rounded-full bg-white/80 overflow-hidden shadow-inner">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-lime-400 via-amber-400 to-orange-500"
                animate={{ width: `${total ? (heard.length / total) * 100 : 0}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>
          </div>

          {/* The page, with an arrow either side */}
          <div className="flex items-center gap-2 sm:gap-5">
            <motion.button
              onClick={() => goToPage(page - 1, -1)}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous letter"
              className="shrink-0 h-11 w-11 sm:h-14 sm:w-14 rounded-full bg-white text-2xl sm:text-3xl text-slate-500 shadow-lg flex items-center justify-center"
            >
              ‹
            </motion.button>

            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.letter}
                  initial={{ opacity: 0, x: direction > 0 ? 110 : -110, rotate: direction > 0 ? 5 : -5 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -110 : 110, rotate: direction > 0 ? -5 : 5 }}
                  transition={{ duration: 0.26, ease: "easeOut" }}
                  className={`relative rounded-[32px] bg-gradient-to-br ${palette.page} p-5 sm:p-7 text-center shadow-xl`}
                >
                  {/* Heard tick */}
                  {heard.includes(current.letter) && (
                    <motion.div
                      className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/95 text-green-600 text-base font-bold flex items-center justify-center shadow-md"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 14 }}
                    >
                      ✓
                    </motion.div>
                  )}

                  {/* Big and small letter together */}
                  <div className="flex items-baseline justify-center gap-3 text-white drop-shadow-lg leading-none">
                    <span className="text-[4rem] sm:text-[5.5rem] font-bold">
                      {current.letter}
                    </span>

                    <span className="text-[2.25rem] sm:text-[3rem] font-bold opacity-80">
                      {current.letter.toLowerCase()}
                    </span>
                  </div>

                  {/* Picture */}
                  <motion.div
                    className="mx-auto mt-3 h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-white/95 shadow-lg flex items-center justify-center text-[3rem] sm:text-[4rem]"
                    animate={speaking ? { scale: [1, 1.07, 1] } : { scale: 1 }}
                    transition={
                      speaking
                        ? { duration: 0.9, repeat: Infinity, ease: "easeInOut" }
                        : { type: "spring", stiffness: 300, damping: 18 }
                    }
                  >
                    {current.emoji}
                  </motion.div>

                  <p className="mt-4 text-xl sm:text-3xl font-bold text-white drop-shadow-md">
                    {current.letter} for {current.word}
                  </p>

                  {/* Listen */}
                  <motion.button
                    onClick={() => speak(current.letter, current.word)}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    className="mt-5 inline-flex items-center gap-2 bg-white text-slate-800 px-6 py-2.5 rounded-full text-base sm:text-lg font-bold shadow-lg"
                  >
                    <motion.span
                      animate={speaking ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                      transition={{ duration: 0.7, repeat: speaking ? Infinity : 0 }}
                    >
                      🔊
                    </motion.span>
                    {speaking ? "Listening..." : "Listen"}
                  </motion.button>

                  {!supported && (
                    <p className="text-white/90 mt-4 text-sm font-semibold">
                      This browser cannot play the sounds. Please try Chrome.
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.button
              onClick={() => goToPage(page + 1, 1)}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next letter"
              className="shrink-0 h-11 w-11 sm:h-14 sm:w-14 rounded-full bg-white text-2xl sm:text-3xl text-slate-500 shadow-lg flex items-center justify-center"
            >
              ›
            </motion.button>
          </div>

          {allHeard && (
            <motion.p
              className="text-center text-xl font-bold text-green-600 mt-6"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 14 }}
            >
              🎉 You heard every letter! 🎉
            </motion.p>
          )}

          {/* Jump straight to any letter */}
          <div className="mt-7 flex flex-wrap justify-center gap-1.5">
            {letters.map((item, i) => (
              <motion.button
                key={item.letter}
                onClick={() => goToPage(i, i > page ? 1 : -1)}
                whileHover={{ scale: 1.18 }}
                whileTap={{ scale: 0.9 }}
                className={`h-8 w-8 rounded-lg text-sm font-bold shadow-sm transition-colors ${
                  i === page
                    ? `${palette.chip} text-white`
                    : heard.includes(item.letter)
                      ? "bg-white text-green-600"
                      : "bg-white/75 text-slate-500"
                }`}
              >
                {item.letter}
              </motion.button>
            ))}
          </div>

        </div>
      </section>
    );
  }

  // CLASS CARDS
  return (
    <section className="bg-slate-100 py-16 px-5">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-5xl font-semibold text-slate-800 leading-tight font-playful">
            Sound Books
          </h1>

          <p className="text-slate-500 mt-3 text-base md:text-lg">
            Phonics sound books for every preschool class.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          {soundBooks.map((book) => (
            <div
              key={book.id}
              className={`bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ${
                book.letters ? "ring-2 ring-orange-300" : ""
              }`}
            >
              <div className="p-6 text-center">

                {/* Emoji */}
                <div
                  className={`w-20 h-20 mx-auto rounded-full ${book.tint} flex items-center justify-center text-4xl mb-5`}
                >
                  {book.emoji}
                </div>

                <h2 className="text-2xl font-semibold text-slate-800 mb-2 font-playful">
                  {book.title}
                </h2>

                <p className="text-slate-400 text-sm mb-4">{book.age}</p>

                <p className="text-slate-500 text-[15px] leading-7 mb-6">
                  {book.description}
                </p>

                {book.letters ? (
                  <button
                    onClick={() => openSoundBook(book)}
                    className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-white font-semibold text-sm shadow-md hover:from-orange-600 hover:to-amber-500 transition-all duration-300"
                  >
                    ▶ Play Sound Book
                  </button>
                ) : book.pdf ? (
                  <a
                    href={book.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-white font-semibold text-sm shadow-md hover:from-orange-600 hover:to-amber-500 transition-all duration-300"
                  >
                    View & Download
                  </a>
                ) : (
                  <span className="inline-block px-6 py-3 rounded-full bg-slate-100 text-slate-400 font-semibold text-sm cursor-not-allowed">
                    Coming Soon
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SoundBooks;

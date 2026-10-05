import React, { useState } from "react";

const classes = [
  { id: "pg", name: "PG", emoji: "🍼", desc: "Starter Letters", color: "orange" },
  { id: "nursery", name: "Nursery", emoji: "🧸", desc: "Easy Letters", color: "pink" },
  { id: "lkg", name: "LKG", emoji: "📚", desc: "Medium Letters", color: "green" },
  { id: "ukg", name: "UKG", emoji: "🎓", desc: "Advanced Letters", color: "blue" },
];

const classStyles = {
  orange: { text: "text-orange-500", bg: "bg-orange-500" },
  pink: { text: "text-pink-500", bg: "bg-pink-500" },
  green: { text: "text-green-500", bg: "bg-green-500" },
  blue: { text: "text-blue-500", bg: "bg-blue-500" },
};

const modes = [
  {
    id: "letterAfter",
    name: "What Comes After a Letter",
    emoji: "🔠",
    desc: "Find the letter that comes next in the alphabet.",
  },
  {
    id: "wordBlank",
    name: "Fill the Blanks for a Given Word",
    emoji: "🧩",
    desc: "Pick the missing letter to complete the word.",
  },
];

// Questions are generated in batches, and a fresh batch is added whenever the child
// reaches the end of the last one, so a round only finishes when they decide it has.
// Each batch draws without repeats, so every letter or word comes up once before any
// of them comes round again.
const QUESTIONS_PER_BATCH = 10;

// Earn a star every time this many questions have been tried.
const starEvery = 10;

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const VOWELS = ["A", "E", "I", "O", "U"];
const CONSONANTS = ALPHABET.filter((ch) => !VOWELS.includes(ch));

const shuffle = (list) => {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const pickRandom = (list, count) => shuffle(list).slice(0, count);

// WHAT COMES AFTER A LETTER
// Letters that can be asked (each has a next letter), by class.
const letterAfterConfig = {
  pg: { max: 10, wrongCount: 2, casing: "upper" },
  nursery: { max: 25, wrongCount: 2, casing: "upper" },
  lkg: { max: 25, wrongCount: 3, casing: "lower" },
  ukg: { max: 25, wrongCount: 3, casing: "mixed" },
};

const generateLetterAfter = (classId) => {
  const { max, wrongCount, casing } = letterAfterConfig[classId];
  const indexes = pickRandom(
    Array.from({ length: max }, (_, i) => i),
    QUESTIONS_PER_BATCH
  );

  return indexes.map((idx) => {
    const lower = casing === "lower" || (casing === "mixed" && Math.random() < 0.5);
    const fmt = (ch) => (lower ? ch.toLowerCase() : ch);

    const nearby = ALPHABET.filter(
      (_, i) => i !== idx + 1 && i !== idx && Math.abs(i - (idx + 1)) <= 3
    );
    const wrong = pickRandom(nearby, wrongCount).map(fmt);

    const hintLetters = ALPHABET.slice(Math.max(0, idx - 1), idx + 3).map(fmt);
    const hint =
      idx === 24
        ? "X, Y, Z is the end."
        : `${hintLetters.join(", ")}...`;

    return {
      letter: fmt(ALPHABET[idx]),
      answer: fmt(ALPHABET[idx + 1]),
      wrong,
      hint,
    };
  });
};

// FILL THE BLANKS FOR A GIVEN WORD
const threeLetterWords = [
  ["CAT", "🐱"], ["SUN", "☀️"], ["BUS", "🚌"], ["DOG", "🐶"], ["PEN", "🖊️"],
  ["HAT", "🎩"], ["BAT", "🦇"], ["PIG", "🐷"], ["CUP", "☕"], ["FAN", "🪭"],
  ["NET", "🥅"], ["JAM", "🍓"], ["KEY", "🔑"], ["BED", "🛏️"], ["BEE", "🐝"],
  ["COW", "🐮"], ["HEN", "🐔"], ["BOX", "📦"], ["CAR", "🚗"], ["EGG", "🥚"],
  ["BAG", "🎒"], ["BUG", "🐛"], ["LEG", "🦵"], ["RAT", "🐀"], ["FOX", "🦊"],
  ["PIE", "🥧"], ["MAP", "🗺️"], ["MAT", "🟫"],
];

const fourLetterWords = [
  ["BOOK", "📖"], ["CAKE", "🎂"], ["FISH", "🐟"], ["MOON", "🌙"], ["STAR", "⭐"],
  ["TREE", "🌳"], ["MILK", "🥛"], ["FROG", "🐸"], ["DUCK", "🦆"], ["BIRD", "🐦"],
  ["LION", "🦁"], ["BEAR", "🐻"], ["SHIP", "🚢"], ["DRUM", "🥁"], ["KITE", "🪁"],
  ["BELL", "🔔"], ["SOCK", "🧦"], ["HAND", "✋"], ["DOOR", "🚪"], ["CORN", "🌽"],
  ["RING", "💍"], ["ROSE", "🌹"], ["CRAB", "🦀"], ["GOAT", "🐐"], ["WOLF", "🐺"],
];

const longWords = [
  ["APPLE", "🍎"], ["FLOWER", "🌸"], ["ORANGE", "🍊"], ["PENCIL", "✏️"],
  ["RABBIT", "🐰"], ["SCHOOL", "🏫"], ["BANANA", "🍌"], ["MONKEY", "🐵"],
  ["TIGER", "🐯"], ["ZEBRA", "🦓"], ["GRAPE", "🍇"], ["HORSE", "🐴"],
  ["PIZZA", "🍕"], ["CLOCK", "🕐"], ["MOUSE", "🐭"], ["SNAKE", "🐍"],
  ["WHALE", "🐳"], ["LEMON", "🍋"], ["TRAIN", "🚆"], ["ROBOT", "🤖"],
  ["HOUSE", "🏠"], ["SHEEP", "🐑"], ["BREAD", "🍞"], ["CHAIR", "🪑"],
  ["PLANE", "✈️"], ["ELEPHANT", "🐘"],
];

const wordBlankConfig = {
  pg: { words: threeLetterWords, blanks: "vowel", wrongCount: 2 },
  nursery: { words: threeLetterWords, blanks: "consonant", wrongCount: 2 },
  lkg: { words: fourLetterWords, blanks: "any", wrongCount: 3 },
  ukg: { words: longWords, blanks: "any", wrongCount: 3 },
};

const allWords = new Set(
  [...threeLetterWords, ...fourLetterWords, ...longWords].map(([w]) => w)
);

const generateWordBlank = (classId) => {
  const { words, blanks, wrongCount } = wordBlankConfig[classId];

  return pickRandom(words, QUESTIONS_PER_BATCH).map(([word, emoji]) => {
    const positions = word
      .split("")
      .map((ch, i) => i)
      .filter((i) => {
        const isVowel = VOWELS.includes(word[i]);
        if (blanks === "vowel") return isVowel;
        if (blanks === "consonant") return !isVowel;
        return true;
      });
    const blank = pickRandom(positions, 1)[0];
    const answer = word[blank];

    // Wrong options match the answer's kind (vowel/consonant) and never spell another known word.
    const pool = (VOWELS.includes(answer) ? VOWELS : CONSONANTS).filter((ch) => {
      if (ch === answer) return false;
      const attempt = word.slice(0, blank) + ch + word.slice(blank + 1);
      return !allWords.has(attempt);
    });
    const wrong = pickRandom(pool, wrongCount);

    return { word, blank, emoji, answer, wrong };
  });
};

const generators = {
  letterAfter: generateLetterAfter,
  wordBlank: generateWordBlank,
};

const buildBlankWord = (word, blank) =>
  word
    .split("")
    .map((ch, i) => (i === blank ? "_" : ch))
    .join(" ");

const LiteracySkills = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [showResult, setShowResult] = useState(false);

  const question = questions[current];
  const options = question ? question.options : [];

  // Options are shuffled as a batch is built, so a re-render never reshuffles them
  // mid-question.
  const buildQuestions = (mode) =>
    generators[mode](selectedClass).map((item) => ({
      ...item,
      options: shuffle([item.answer, ...item.wrong]),
    }));

  const startGame = (mode) => {
    setSelectedMode(mode);
    setQuestions(buildQuestions(mode));
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFeedback("");
    setShowResult(false);
  };

  const speak = () => {
    const text =
      selectedMode === "wordBlank"
        ? question.word
        : `What comes after ${question.letter}`;
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 0.8;
    window.speechSynthesis.speak(speech);
  };

  const checkAnswer = (option) => {
    if (selected) return;

    setSelected(option);

    if (option === question.answer) {
      setScore((prev) => prev + 1);
      setFeedback("🎉 Excellent!");
    } else {
      setFeedback("😊 Good Try!");
    }
  };

  const nextQuestion = () => {
    // Running past the last question adds another batch, so the child decides when
    // to stop rather than the length of the word list.
    if (current + 1 >= questions.length) {
      setQuestions((prev) => [...prev, ...buildQuestions(selectedMode)]);
    }

    setCurrent((prev) => prev + 1);
    setSelected(null);
    setFeedback("");
  };

  const backToModes = () => {
    setSelectedMode(null);
    setQuestions([]);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFeedback("");
    setShowResult(false);
  };

  const backToClasses = () => {
    backToModes();
    setSelectedClass(null);
  };

  // CLASS SELECTION PAGE
  if (!selectedClass) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-200 flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold text-orange-600 mb-2 text-center">
          🔤 Literacy Skills 🔤
        </h1>
        <p className="text-gray-700 mb-8 text-center">Choose your class to begin</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {classes.map((cls) => (
            <div key={cls.id} className="bg-white rounded-3xl p-8 text-center shadow-xl">
              <div className="text-7xl">{cls.emoji}</div>
              <h2 className={`text-3xl font-bold mt-4 ${classStyles[cls.color].text}`}>
                {cls.name}
              </h2>
              <p className="mt-3 text-gray-600">{cls.desc}</p>

              <button
                onClick={() => setSelectedClass(cls.id)}
                className={`mt-6 ${classStyles[cls.color].bg} text-white px-6 py-3 rounded-full text-lg`}
              >
                ▶ Choose
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const classInfo = classes.find((cls) => cls.id === selectedClass);

  // GAME SELECTION PAGE
  if (!selectedMode) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-200 flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold text-orange-600 mb-2 text-center">
          {classInfo.emoji} {classInfo.name}
        </h1>
        <p className="text-gray-700 mb-8 text-center">Which game do you want to play?</p>

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
          {modes.map((mode) => (
            <div key={mode.id} className="bg-white rounded-3xl p-8 text-center shadow-xl">
              <div className="text-7xl">{mode.emoji}</div>
              <h2 className="text-2xl font-bold mt-4 text-purple-600">{mode.name}</h2>
              <p className="mt-3 text-gray-600">{mode.desc}</p>

              <button
                onClick={() => startGame(mode.id)}
                className="mt-6 bg-purple-500 text-white px-6 py-3 rounded-full text-lg"
              >
                ▶ Play Now
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={backToClasses}
          className="mt-8 bg-white text-gray-700 px-6 py-3 rounded-full shadow"
        >
          ⬅ Back To Classes
        </button>
      </div>
    );
  }

  const modeInfo = modes.find((mode) => mode.id === selectedMode);
  // A question counts as tried the moment an option is picked, so the totals stay
  // correct for a child who walks away mid-round.
  const attempted = current + (selected ? 1 : 0);
  // A round has no fixed total to fill up, so the bar tracks the walk to the next
  // star instead.
  const stars = Math.floor(attempted / starEvery);
  const toNextStar = starEvery - (attempted % starEvery);
  const progress = ((attempted % starEvery) / starEvery) * 100;

  // RESULT PAGE
  if (showResult) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-200 p-4">
        <div className="bg-white rounded-3xl p-8 text-center shadow-xl w-full max-w-md">
          <div className="text-7xl">🏆</div>

          <h1 className="text-4xl font-bold text-green-600 mt-4">Wonderful!</h1>

          <p className="text-gray-600 mt-2">
            {classInfo.name} • {modeInfo.name}
          </p>

          <h2 className="text-2xl mt-4">
            Score : {score} / {attempted}
          </h2>

          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={() => startGame(selectedMode)}
              className="bg-orange-500 text-white px-6 py-3 rounded-full text-lg"
            >
              🔄 Play Again
            </button>

            <button
              onClick={backToModes}
              className="bg-purple-500 text-white px-6 py-3 rounded-full text-lg"
            >
              🎮 Choose Another Game
            </button>

            <button
              onClick={backToClasses}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-full text-lg"
            >
              ⬅ Back To Classes
            </button>
          </div>
        </div>
      </div>
    );
  }

  // GAME PAGE
  return (
    <div className="min-h-screen flex justify-center items-center p-4 bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl p-6 text-center">
        <h1 className="text-3xl font-bold text-orange-500">
          {modeInfo.emoji} {modeInfo.name}
        </h1>

        <p className="text-gray-500 mt-1">
          {classInfo.emoji} {classInfo.name}
        </p>

        <div className="flex gap-3 mt-6">
          <div className="flex-1 bg-teal-400 text-white p-3 rounded-2xl">
            <div className="text-xs uppercase tracking-wide">Total Tried</div>

            <div className="text-lg font-bold">{attempted}</div>
          </div>

          <div className="flex-1 bg-yellow-400 text-white p-3 rounded-2xl">
            <div className="text-xs uppercase tracking-wide">Scored</div>

            <div className="text-lg font-bold">
              {score} / {attempted}
            </div>
          </div>
        </div>

        <div className="w-full h-3 bg-gray-200 rounded-full mt-5 overflow-hidden">
          <div className="h-full bg-green-500" style={{ width: `${progress}%` }} />
        </div>

        <p className="text-sm text-gray-500 mt-2">
          {stars > 0 && `⭐ × ${stars} • `}
          {toNextStar} more for the next star
        </p>

        <div className="bg-yellow-50 border-4 border-dashed border-yellow-400 rounded-3xl p-6 mt-6">
          {selectedMode === "letterAfter" ? (
            <>
              <h2 className="text-2xl font-bold">Which letter comes after</h2>

              <div className="text-6xl text-orange-500 mt-5">{question.letter}</div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold">Find the missing letter</h2>

              <div className="text-7xl mt-4">{question.emoji}</div>

              <div className="text-5xl font-bold tracking-widest text-orange-500 mt-3">
                {buildBlankWord(question.word, question.blank)}
              </div>
            </>
          )}

          <button
            onClick={speak}
            className="mt-5 bg-blue-500 text-white px-5 py-2 rounded-full"
          >
            🔊 Listen
          </button>

          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => checkAnswer(option)}
                className={`w-28 md:w-32 p-4 rounded-2xl text-white text-2xl font-bold transition ${
                  selected
                    ? option === question.answer
                      ? "bg-green-500"
                      : option === selected
                        ? "bg-red-500"
                        : "bg-blue-400"
                    : "bg-blue-400 hover:scale-105"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="text-2xl font-bold mt-5">{feedback}</div>

          {selected && selectedMode === "letterAfter" && (
            <div className="text-gray-600 mt-2">{question.hint}</div>
          )}

          {selected && selectedMode === "wordBlank" && (
            <div className="text-gray-600 mt-2">
              The word is {question.word.split("").join(" ")}
            </div>
          )}

          {selected && (
            <button
              onClick={nextQuestion}
              className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-full"
            >
              Next ➜
            </button>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {attempted > 0 && (
            <button
              onClick={() => setShowResult(true)}
              className="bg-green-500 text-white px-6 py-2 rounded-full"
            >
              🏁 Finish & See Score
            </button>
          )}

          <button
            onClick={backToModes}
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded-full"
          >
            ⬅ Back To Games
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiteracySkills;

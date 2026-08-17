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

// WHAT COMES AFTER A LETTER
const letterAfterBank = {
  pg: [
    { letter: "A", answer: "B", wrong: ["D", "C"], hint: "A, B, C..." },
    { letter: "B", answer: "C", wrong: ["A", "E"], hint: "A, B, C, D..." },
    { letter: "C", answer: "D", wrong: ["B", "F"], hint: "B, C, D, E..." },
    { letter: "D", answer: "E", wrong: ["C", "G"], hint: "C, D, E, F..." },
    { letter: "E", answer: "F", wrong: ["D", "H"], hint: "D, E, F, G..." },
    { letter: "F", answer: "G", wrong: ["E", "A"], hint: "E, F, G, H..." },
  ],
  nursery: [
    { letter: "G", answer: "H", wrong: ["F", "J"], hint: "F, G, H, I..." },
    { letter: "H", answer: "I", wrong: ["G", "K"], hint: "G, H, I, J..." },
    { letter: "J", answer: "K", wrong: ["I", "M"], hint: "I, J, K, L..." },
    { letter: "L", answer: "M", wrong: ["K", "N"], hint: "K, L, M, N..." },
    { letter: "M", answer: "N", wrong: ["L", "P"], hint: "L, M, N, O..." },
    { letter: "O", answer: "P", wrong: ["N", "R"], hint: "N, O, P, Q..." },
    { letter: "Q", answer: "R", wrong: ["P", "S"], hint: "P, Q, R, S..." },
    { letter: "S", answer: "T", wrong: ["R", "V"], hint: "R, S, T, U..." },
  ],
  lkg: [
    { letter: "b", answer: "c", wrong: ["a", "d", "e"], hint: "a, b, c, d..." },
    { letter: "e", answer: "f", wrong: ["d", "g", "h"], hint: "d, e, f, g..." },
    { letter: "i", answer: "j", wrong: ["h", "k", "l"], hint: "h, i, j, k..." },
    { letter: "l", answer: "m", wrong: ["k", "n", "o"], hint: "k, l, m, n..." },
    { letter: "n", answer: "o", wrong: ["m", "p", "q"], hint: "m, n, o, p..." },
    { letter: "p", answer: "q", wrong: ["o", "r", "s"], hint: "o, p, q, r..." },
    { letter: "t", answer: "u", wrong: ["s", "v", "w"], hint: "s, t, u, v..." },
    { letter: "w", answer: "x", wrong: ["v", "y", "z"], hint: "v, w, x, y..." },
  ],
  ukg: [
    { letter: "r", answer: "s", wrong: ["q", "t", "u"], hint: "q, r, s, t..." },
    { letter: "u", answer: "v", wrong: ["t", "w", "x"], hint: "t, u, v, w..." },
    { letter: "x", answer: "y", wrong: ["w", "z", "v"], hint: "w, x, y, z..." },
    { letter: "Y", answer: "Z", wrong: ["X", "W", "A"], hint: "X, Y, Z is the end." },
    { letter: "K", answer: "L", wrong: ["J", "M", "N"], hint: "J, K, L, M..." },
    { letter: "P", answer: "Q", wrong: ["O", "R", "S"], hint: "O, P, Q, R..." },
    { letter: "G", answer: "H", wrong: ["F", "I", "J"], hint: "F, G, H, I..." },
    { letter: "T", answer: "U", wrong: ["S", "V", "W"], hint: "S, T, U, V..." },
  ],
};

// FILL THE BLANKS FOR A GIVEN WORD
const wordBlankBank = {
  pg: [
    { word: "CAT", blank: 1, emoji: "🐱", answer: "A", wrong: ["O", "U"] },
    { word: "SUN", blank: 1, emoji: "☀️", answer: "U", wrong: ["A", "E"] },
    { word: "BUS", blank: 1, emoji: "🚌", answer: "U", wrong: ["I", "O"] },
    { word: "DOG", blank: 1, emoji: "🐶", answer: "O", wrong: ["A", "I"] },
    { word: "PEN", blank: 1, emoji: "🖊️", answer: "E", wrong: ["A", "O"] },
    { word: "HAT", blank: 1, emoji: "🎩", answer: "A", wrong: ["E", "I"] },
  ],
  nursery: [
    { word: "BAT", blank: 0, emoji: "🦇", answer: "B", wrong: ["D", "P"] },
    { word: "CUP", blank: 2, emoji: "☕", answer: "P", wrong: ["T", "N"] },
    { word: "FAN", blank: 2, emoji: "🪭", answer: "N", wrong: ["M", "T"] },
    { word: "JAM", blank: 0, emoji: "🍓", answer: "J", wrong: ["G", "Y"] },
    { word: "KEY", blank: 0, emoji: "🔑", answer: "K", wrong: ["C", "Q"] },
    { word: "MAT", blank: 1, emoji: "🟫", answer: "A", wrong: ["E", "U"] },
    { word: "NET", blank: 1, emoji: "🥅", answer: "E", wrong: ["A", "I"] },
    { word: "PIG", blank: 1, emoji: "🐷", answer: "I", wrong: ["E", "O"] },
  ],
  lkg: [
    { word: "BOOK", blank: 2, emoji: "📖", answer: "O", wrong: ["A", "E", "U"] },
    { word: "CAKE", blank: 1, emoji: "🎂", answer: "A", wrong: ["O", "E", "I"] },
    { word: "FISH", blank: 3, emoji: "🐟", answer: "H", wrong: ["T", "N", "D"] },
    { word: "MOON", blank: 2, emoji: "🌙", answer: "O", wrong: ["A", "E", "U"] },
    { word: "STAR", blank: 1, emoji: "⭐", answer: "T", wrong: ["P", "D", "K"] },
    { word: "TREE", blank: 1, emoji: "🌳", answer: "R", wrong: ["L", "N", "W"] },
    { word: "MILK", blank: 2, emoji: "🥛", answer: "L", wrong: ["R", "N", "D"] },
    { word: "FROG", blank: 2, emoji: "🐸", answer: "O", wrong: ["A", "E", "I"] },
  ],
  ukg: [
    { word: "APPLE", blank: 2, emoji: "🍎", answer: "P", wrong: ["B", "D", "T"] },
    { word: "FLOWER", blank: 1, emoji: "🌸", answer: "L", wrong: ["R", "N", "T"] },
    { word: "ORANGE", blank: 3, emoji: "🍊", answer: "N", wrong: ["M", "R", "L"] },
    { word: "PENCIL", blank: 4, emoji: "✏️", answer: "I", wrong: ["E", "A", "O"] },
    { word: "RABBIT", blank: 3, emoji: "🐰", answer: "B", wrong: ["D", "P", "T"] },
    { word: "SCHOOL", blank: 2, emoji: "🏫", answer: "H", wrong: ["C", "K", "T"] },
    { word: "BANANA", blank: 5, emoji: "🍌", answer: "A", wrong: ["O", "E", "I"] },
    { word: "MONKEY", blank: 3, emoji: "🐵", answer: "K", wrong: ["C", "G", "T"] },
  ],
};

const banks = {
  letterAfter: letterAfterBank,
  wordBlank: wordBlankBank,
};

const buildBlankWord = (word, blank) =>
  word
    .split("")
    .map((ch, i) => (i === blank ? "_" : ch))
    .join(" ");

const FillInTheBlanks = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [showResult, setShowResult] = useState(false);

  const question = questions[current];
  const options = question ? question.options : [];

  // Options are shuffled once per round so a re-render never reshuffles them mid-question.
  const buildQuestions = (mode) =>
    banks[mode][selectedClass].map((item) => ({
      ...item,
      options: [item.answer, ...item.wrong].sort(() => Math.random() - 0.5),
    }));

  const startGame = (mode) => {
    setSelectedMode(mode);
    setQuestions(buildQuestions(mode));
    setCurrent(0);
    setScore(0);
    setStars(0);
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
      setStars((prev) => prev + 1);
      setFeedback("🎉 Excellent!");
    } else {
      setFeedback("😊 Good Try!");
    }
  };

  const nextQuestion = () => {
    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
      setSelected(null);
      setFeedback("");
    } else {
      setShowResult(true);
    }
  };

  const backToModes = () => {
    setSelectedMode(null);
    setQuestions([]);
    setCurrent(0);
    setScore(0);
    setStars(0);
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
  const progress = ((current + 1) / questions.length) * 100;

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
            Score : {score} / {questions.length}
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
          <div className="flex-1 bg-teal-400 text-white p-3 rounded-2xl text-lg font-bold">
            ⭐ {score}
          </div>

          <div className="flex-1 bg-yellow-400 text-white p-3 rounded-2xl text-lg font-bold">
            🌟 {stars}
          </div>
        </div>

        <div className="w-full h-3 bg-gray-200 rounded-full mt-5 overflow-hidden">
          <div className="h-full bg-green-500" style={{ width: `${progress}%` }} />
        </div>

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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => checkAnswer(option)}
                className={`p-4 rounded-2xl text-white text-2xl font-bold transition ${
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
              {current + 1 === questions.length ? "Finish ➜" : "Next ➜"}
            </button>
          )}
        </div>

        <button
          onClick={backToModes}
          className="mt-6 bg-gray-100 text-gray-700 px-6 py-2 rounded-full"
        >
          ⬅ Back To Games
        </button>
      </div>
    </div>
  );
};

export default FillInTheBlanks;

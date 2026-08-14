import React, { useState } from "react";

const classes = [
  {
    id: "pg",
    name: "PG",
    emoji: "🍼",
    desc: "Numbers 1 to 5",
    color: "orange",
    objectEmoji: null,
  },
  {
    id: "nursery",
    name: "Nursery",
    emoji: "🧸",
    desc: "Numbers 1 to 10",
    color: "pink",
    objectEmoji: "⭐",
  },
  {
    id: "lkg",
    name: "LKG",
    emoji: "📚",
    desc: "Numbers 1 to 20",
    color: "green",
    objectEmoji: null,
  },
  {
    id: "ukg",
    name: "UKG",
    emoji: "🎓",
    desc: "Numbers up to 100",
    color: "blue",
    objectEmoji: null,
  },
];

const classStyles = {
  orange: { text: "text-orange-500", bg: "bg-orange-500" },
  pink: { text: "text-pink-500", bg: "bg-pink-500" },
  green: { text: "text-green-500", bg: "bg-green-500" },
  blue: { text: "text-blue-500", bg: "bg-blue-500" },
};

// Each pair is [left number, right number]. The correct sign is worked out from the pair.
const numberPairs = {
  pg: [
    [1, 3],
    [4, 2],
    [2, 2],
    [5, 1],
    [3, 3],
    [2, 4],
    [5, 3],
    [1, 1],
    [4, 5],
    [3, 2],
  ],
  nursery: [
    [6, 3],
    [4, 8],
    [7, 7],
    [9, 2],
    [5, 5],
    [3, 10],
    [8, 6],
    [10, 10],
    [2, 9],
    [7, 4],
  ],
  lkg: [
    [12, 15],
    [18, 9],
    [14, 14],
    [11, 20],
    [17, 13],
    [16, 16],
    [19, 8],
    [10, 13],
    [20, 15],
    [12, 12],
  ],
  ukg: [
    [45, 54],
    [78, 78],
    [90, 19],
    [36, 63],
    [100, 99],
    [47, 47],
    [25, 52],
    [81, 18],
    [60, 60],
    [73, 37],
  ],
};

const signs = [
  { symbol: ">", label: "Greater than" },
  { symbol: "<", label: "Less than" },
  { symbol: "=", label: "Equal to" },
];

const correctSign = (left, right) => {
  if (left > right) return ">";
  if (left < right) return "<";
  return "=";
};

const explain = (left, right) => {
  if (left > right) return `${left} is bigger than ${right}`;
  if (left < right) return `${left} is smaller than ${right}`;
  return `${left} is equal to ${right}`;
};

const NumeracySkillsCognitiveSkill = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [showResult, setShowResult] = useState(false);

  const question = questions[current];

  const startGame = (classId) => {
    setSelectedClass(classId);
    setQuestions(numberPairs[classId]);
    setCurrent(0);
    setScore(0);
    setStars(0);
    setSelected(null);
    setFeedback("");
    setShowResult(false);
  };

  const speak = () => {
    const speech = new SpeechSynthesisUtterance(
      `Which sign fits? ${question[0]} or ${question[1]}`
    );
    speech.rate = 0.8;
    window.speechSynthesis.speak(speech);
  };

  const checkAnswer = (symbol) => {
    if (selected) return;

    setSelected(symbol);

    if (symbol === correctSign(question[0], question[1])) {
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

  const backToClasses = () => {
    setSelectedClass(null);
    setQuestions([]);
    setCurrent(0);
    setScore(0);
    setStars(0);
    setSelected(null);
    setFeedback("");
    setShowResult(false);
  };

  // CLASS SELECTION PAGE
  if (!selectedClass) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-sky-200 via-teal-200 to-green-200 flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold text-teal-700 mb-2 text-center">
          🔢 Greater, Smaller or Equal 🔢
        </h1>
        <p className="text-gray-700 mb-8 text-center">
          Fill the blank with =, &gt; or &lt;. Choose your class to begin.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {classes.map((cls) => (
            <div key={cls.id} className="bg-white rounded-3xl p-8 text-center shadow-xl">
              <div className="text-7xl">{cls.emoji}</div>
              <h2 className={`text-3xl font-bold mt-4 ${classStyles[cls.color].text}`}>
                {cls.name}
              </h2>
              <p className="mt-3 text-gray-600">{cls.desc}</p>

              <button
                onClick={() => startGame(cls.id)}
                className={`mt-6 ${classStyles[cls.color].bg} text-white px-6 py-3 rounded-full text-lg`}
              >
                ▶ Play Now
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const classInfo = classes.find((cls) => cls.id === selectedClass);
  const progress = ((current + 1) / questions.length) * 100;

  // RESULT PAGE
  if (showResult) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-200 via-teal-200 to-green-200 p-4">
        <div className="bg-white rounded-3xl p-8 text-center shadow-xl w-full max-w-md">
          <div className="text-7xl">🏆</div>

          <h1 className="text-4xl font-bold text-green-600 mt-4">Wonderful!</h1>

          <p className="text-gray-600 mt-2">
            {classInfo.emoji} {classInfo.name}
          </p>

          <h2 className="text-2xl mt-4">
            Score : {score} / {questions.length}
          </h2>

          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={() => startGame(selectedClass)}
              className="bg-teal-500 text-white px-6 py-3 rounded-full text-lg"
            >
              🔄 Play Again
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

  const [left, right] = question;
  const answer = correctSign(left, right);

  // GAME PAGE
  return (
    <div className="min-h-screen flex justify-center items-center p-4 bg-gradient-to-r from-sky-200 via-teal-200 to-green-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl p-6 text-center">
        <h1 className="text-3xl font-bold text-teal-600">
          🔢 Greater, Smaller or Equal 🔢
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

        <div className="bg-teal-50 border-4 border-dashed border-teal-400 rounded-3xl p-6 mt-6">
          <h2 className="text-2xl font-bold">
            Fill the blank with =, &gt; or &lt;
          </h2>

          <div className="flex items-center justify-center gap-5 mt-6">
            <div className="text-6xl font-bold text-teal-600">{left}</div>

            <div className="w-20 h-20 flex items-center justify-center rounded-2xl border-4 border-dashed border-orange-400 bg-white text-5xl font-bold text-orange-500">
              {selected || "?"}
            </div>

            <div className="text-6xl font-bold text-teal-600">{right}</div>
          </div>

          {classInfo.objectEmoji && (
            <div className="flex items-start justify-center gap-5 mt-5 text-2xl">
              <div className="flex-1 max-w-[38%]">
                {classInfo.objectEmoji.repeat(left)}
              </div>

              <div className="w-20" />

              <div className="flex-1 max-w-[38%]">
                {classInfo.objectEmoji.repeat(right)}
              </div>
            </div>
          )}

          <button
            onClick={speak}
            className="mt-5 bg-blue-500 text-white px-5 py-2 rounded-full"
          >
            🔊 Listen
          </button>

          <div className="grid grid-cols-3 gap-4 mt-6">
            {signs.map((sign) => (
              <button
                key={sign.symbol}
                onClick={() => checkAnswer(sign.symbol)}
                className={`p-4 rounded-2xl text-white transition ${
                  selected
                    ? sign.symbol === answer
                      ? "bg-green-500"
                      : sign.symbol === selected
                        ? "bg-red-500"
                        : "bg-blue-400"
                    : "bg-blue-400 hover:scale-105"
                }`}
              >
                <div className="text-4xl font-bold">{sign.symbol}</div>
                <div className="text-xs mt-1">{sign.label}</div>
              </button>
            ))}
          </div>

          <div className="text-2xl font-bold mt-5">{feedback}</div>

          {selected && (
            <div className="text-gray-600 mt-2">
              {left} {answer} {right} — {explain(left, right)}
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
          onClick={backToClasses}
          className="mt-6 bg-gray-100 text-gray-700 px-6 py-2 rounded-full"
        >
          ⬅ Back To Classes
        </button>
      </div>
    </div>
  );
};

export default NumeracySkillsCognitiveSkill;

import React, { useState, useEffect } from "react";

const questions = [
  { word: "Ant", emoji: "🐜", answer: "Pant", wrong: ["Book", "Tree"] },
  { word: "Ball", emoji: "⚽", answer: "Fall", wrong: ["Fish", "Cup"] },
  { word: "Cat", emoji: "🐱", answer: "Bat", wrong: ["Pen", "Dog"] },
  { word: "Dog", emoji: "🐶", answer: "Log", wrong: ["Car", "Hat"] },
  { word: "Egg", emoji: "🥚", answer: "Leg", wrong: ["Sun", "Box"] },
  { word: "Fan", emoji: "🪭", answer: "Man", wrong: ["Tree", "Ball"] },
  { word: "Gun", emoji: "🔫", answer: "Run", wrong: ["Fish", "Cup"] },
  { word: "Hen", emoji: "🐔", answer: "Ten", wrong: ["Book", "Car"] },
  { word: "Ink", emoji: "🖋️", answer: "Pink", wrong: ["Dog", "Ball"] },
  { word: "Jam", emoji: "🍓", answer: "Dam", wrong: ["Fish", "Pen"] },
  { word: "Key", emoji: "🔑", answer: "Tea", wrong: ["Box", "Chair"] },
  { word: "Lot", emoji: "📦", answer: "Pot", wrong: ["Tree", "Sun"] },
  { word: "Mat", emoji: "🟫", answer: "Fat", wrong: ["Dog", "Cup"] },
  { word: "Net", emoji: "🥅", answer: "Pet", wrong: ["Fish", "Book"] },
  { word: "Ox", emoji: "🐂", answer: "Box", wrong: ["Car", "Tree"] },
  { word: "Pen", emoji: "🖊️", answer: "Men", wrong: ["Dog", "Ball"] },
  { word: "Run", emoji: "🏃", answer: "Bun", wrong: ["Fish", "Cup"] },
  { word: "Sit", emoji: "🪑", answer: "Fit", wrong: ["Pen", "Car"] },
  { word: "Toy", emoji: "🧸", answer: "Boy", wrong: ["Book", "Tree"] },
  { word: "Van", emoji: "🚐", answer: "Pan", wrong: ["Dog", "Fish"] },
  { word: "Win", emoji: "🏆", answer: "Pin", wrong: ["Box", "Cup"] },
  { word: "Yak", emoji: "🐂", answer: "Pack", wrong: ["Tree", "Ball"] },
  { word: "Zip", emoji: "🤐", answer: "Tip", wrong: ["Book", "Car"] },
];

const RhymingWords = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [options, setOptions] = useState([]);

  const question = questions[current];

  useEffect(() => {
    shuffleOptions();
  }, [current]);

  const shuffleOptions = () => {
    const arr = [question.answer, ...question.wrong];
    arr.sort(() => Math.random() - 0.5);
    setOptions(arr);
  };

  const speakWord = () => {
    const speech = new SpeechSynthesisUtterance(question.word);
    speech.rate = 0.8;
    window.speechSynthesis.speak(speech);
  };

  const checkAnswer = (option) => {
    if (selected) return;

    setSelected(option);

    if (option === question.answer) {
      setScore(score + 1);
      setStars(stars + 1);
      setFeedback("🎉 Excellent!");
    } else {
      setFeedback("😊 Good Try!");
    }
  };

  const nextQuestion = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
      setFeedback("");
    } else {
      setShowResult(true);
    }
  };

  const restartGame = () => {
    setCurrent(0);
    setScore(0);
    setStars(0);
    setSelected(null);
    setFeedback("");
    setShowResult(false);
  };

  const progress = ((current + 1) / questions.length) * 100;

  if (showResult) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 p-4">
        <div className="bg-white rounded-3xl p-8 text-center shadow-xl w-full max-w-md">
          <div className="text-6xl">🏆</div>

          <h1 className="text-3xl font-bold text-green-600 mt-4">
            Wonderful!
          </h1>

          <h2 className="text-xl mt-4">
            Score : {score} / {questions.length}
          </h2>

          <button
            onClick={restartGame}
            className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-full text-lg"
          >
            🔄 Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-4 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl p-6 text-center">
        <h1 className="text-3xl font-bold text-pink-500">
          🎵 Rhyming Words Adventure 🎵
        </h1>

        <div className="flex gap-3 mt-6">
          <div className="flex-1 bg-teal-400 text-white p-3 rounded-2xl text-lg font-bold">
            ⭐ {score}
          </div>

          <div className="flex-1 bg-yellow-400 text-white p-3 rounded-2xl text-lg font-bold">
            🌟 {stars}
          </div>
        </div>

        <div className="w-full h-3 bg-gray-200 rounded-full mt-5 overflow-hidden">
          <div
            className="h-full bg-green-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="bg-yellow-50 border-4 border-dashed border-yellow-400 rounded-3xl p-6 mt-6">
          <h2 className="text-2xl font-bold">
            Find a word that rhymes with
          </h2>

          <div className="text-4xl text-orange-500 mt-4">
            {question.emoji} {question.word}
          </div>

          <button
            onClick={speakWord}
            className="mt-4 bg-blue-500 text-white px-5 py-2 rounded-full"
          >
            🔊 Listen
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => checkAnswer(option)}
                className={`p-4 rounded-2xl text-white text-xl transition
                ${
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

          {selected && (
            <button
              onClick={nextQuestion}
              className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-full"
            >
              Next ➜
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RhymingWords;

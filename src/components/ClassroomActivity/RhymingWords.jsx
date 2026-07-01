import React, { useState, useEffect } from "react";

const levels = {
  nursery: [
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
  ],

  lkg: [
  { word: "Apple", emoji: "🍎", answer: "Snapple", wrong: ["Book", "Tree"] }, 
  { word: "Bell", emoji: "🔔", answer: "Shell", wrong: ["Fish", "Cup"] },     
  { word: "Cake", emoji: "🎂", answer: "Bake", wrong: ["Dog", "Pen"] },       
  { word: "Drum", emoji: "🥁", answer: "Thumb", wrong: ["Fish", "Book"] },    
  { word: "Ear", emoji: "👂", answer: "Near", wrong: ["Cup", "Ball"] },       
  { word: "Fan", emoji: "🪭", answer: "Van", wrong: ["Tree", "Pen"] },       
  { word: "Gate", emoji: "🚪", answer: "Late", wrong: ["Fish", "Book"] },     
  { word: "Hill", emoji: "⛰️", answer: "Fill", wrong: ["Cup", "Pen"] },      
  { word: "Ink", emoji: "🖋️", answer: "Pink", wrong: ["Ball", "Tree"] },      
  { word: "Jet", emoji: "✈️", answer: "Net", wrong: ["Book", "Fish"] },       
  { word: "King", emoji: "👑", answer: "Sing", wrong: ["Cup", "Tree"] },      
  { word: "Leaf", emoji: "🍃", answer: "Beef", wrong: ["Pen", "Fish"] },      
  { word: "Moon", emoji: "🌙", answer: "Spoon", wrong: ["Book", "Cup"] },     
  { word: "Nose", emoji: "👃", answer: "Rose", wrong: ["Fish", "Ball"] },     
  { word: "Owl", emoji: "🦉", answer: "Towel", wrong: ["Book", "Pen"] },      
  { word: "Park", emoji: "🏞️", answer: "Dark", wrong: ["Cup", "Tree"] },      
  { word: "Queen", emoji: "👸", answer: "Green", wrong: ["Fish", "Book"] },   
  { word: "Ring", emoji: "💍", answer: "Wing", wrong: ["Cup", "Pen"] },      
  { word: "Seed", emoji: "🌱", answer: "Need", wrong: ["Book", "Fish"] },     
  { word: "Train", emoji: "🚂", answer: "Rain", wrong: ["Cup", "Ball"] },     
  { word: "Uncle", emoji: "👨", answer: "Jungle", wrong: ["Fish", "Book"] },  
  { word: "Vase", emoji: "🏺", answer: "Case", wrong: ["Pen", "Tree"] },      
  { word: "Wall", emoji: "🧱", answer: "Ball", wrong: ["Fish", "Cup"] },      
  { word: "X-ray", emoji: "🩻", answer: "Play", wrong: ["Book", "Pen"] },    
  { word: "Yarn", emoji: "🧶", answer: "Barn", wrong: ["Fish", "Cup"] },      
  { word: "Zoo", emoji: "🦓", answer: "Two", wrong: ["Book", "Tree"] } 
  ],

  ukg: [
     { word: "Air", emoji: "🌬️", answer: "Chair", wrong: ["Book", "Fish"] },      
  { word: "Bread", emoji: "🍞", answer: "Thread", wrong: ["Cup", "Tree"] },    
  { word: "Cloud", emoji: "☁️", answer: "Loud", wrong: ["Pen", "Book"] },      
  { word: "Duck", emoji: "🦆", answer: "Truck", wrong: ["Fish", "Ball"] },    
  { word: "Eight", emoji: "8️⃣", answer: "Gate", wrong: ["Cup", "Pen"] },      
  { word: "Flower", emoji: "🌸", answer: "Tower", wrong: ["Book", "Fish"] },   
  { word: "Go", emoji: "🏃", answer: "Snow", wrong: ["Tree", "Cup"] },         
  { word: "Hill", emoji: "⛰️", answer: "Pill", wrong: ["Book", "Pen"] },       
  { word: "Ice", emoji: "🧊", answer: "Rice", wrong: ["Fish", "Tree"] },        
  { word: "Jam", emoji: "🍓", answer: "Lamb", wrong: ["Cup", "Book"] },        
  { word: "Kite", emoji: "🪁", answer: "Light", wrong: ["Fish", "Pen"] },      
  { word: "Lake", emoji: "🏞️", answer: "Cake", wrong: ["Book", "Tree"] },     
  { word: "Mouse", emoji: "🐭", answer: "Blouse", wrong: ["Cup", "Fish"] },    
  { word: "Night", emoji: "🌙", answer: "Bright", wrong: ["Book", "Pen"] },   
  { word: "Old", emoji: "👴", answer: "Cold", wrong: ["Fish", "Tree"] },       
  { word: "Plane", emoji: "✈️", answer: "Train", wrong: ["Cup", "Book"] },    
  { word: "Queen", emoji: "👸", answer: "Screen", wrong: ["Fish", "Pen"] },    
  { word: "Rock", emoji: "🪨", answer: "Sock", wrong: ["Book", "Tree"] },      
  { word: "Star", emoji: "⭐", answer: "Jar", wrong: ["Fish", "Cup"] },         
  { word: "Tree", emoji: "🌳", answer: "Bee", wrong: ["Book", "Pen"] },        
  { word: "Up", emoji: "⬆️", answer: "Cup", wrong: ["Fish", "Tree"] },         
  { word: "Vine", emoji: "🌿", answer: "Line", wrong: ["Book", "Cup"] },       
  { word: "Wheel", emoji: "🛞", answer: "Peel", wrong: ["Fish", "Pen"] },      
  { word: "X-ray", emoji: "🩻", answer: "Gray", wrong: ["Book", "Tree"] },     
  { word: "Yellow", emoji: "💛", answer: "Mellow", wrong: ["Fish", "Cup"] },   
  { word: "Zip", emoji: "🤐", answer: "Ship", wrong: ["Book", "Pen"] }  
  ],
};

const RhymingWords = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [options, setOptions] = useState([]);

  const question = questions[current];

  useEffect(() => {
    if (question) {
      const arr = [question.answer, ...question.wrong];
      arr.sort(() => Math.random() - 0.5);
      setOptions(arr);
    }
  }, [current, question]);

  const startGame = (level) => {
    setSelectedLevel(level);
    setQuestions(levels[level]);
    setCurrent(0);
    setScore(0);
    setStars(0);
    setSelected(null);
    setFeedback("");
    setShowResult(false);
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

  const restartGame = () => {
    setSelectedLevel(null);
    setQuestions([]);
    setCurrent(0);
    setScore(0);
    setStars(0);
    setSelected(null);
    setFeedback("");
    setShowResult(false);
  };

  // LEVEL SELECTION PAGE
  if (!selectedLevel) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 flex items-center justify-center p-6">
        <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
          {/* Nursery */}
          <div className="bg-white rounded-3xl p-8 text-center shadow-xl">
            <div className="text-7xl">🧸</div>
            <h1 className="text-3xl font-bold mt-4 text-pink-500">Nursery</h1>
            <p className="mt-3 text-gray-600">Easy Rhyming Words</p>

            <button
              onClick={() => startGame("nursery")}
              className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-full text-lg"
            >
              ▶ Play Now
            </button>
          </div>

          {/* LKG */}
          <div className="bg-white rounded-3xl p-8 text-center shadow-xl">
            <div className="text-7xl">📚</div>
            <h1 className="text-3xl font-bold mt-4 text-green-500">LKG</h1>
            <p className="mt-3 text-gray-600">Medium Rhyming Words</p>

            <button
              onClick={() => startGame("lkg")}
              className="mt-6 bg-green-500 text-white px-6 py-3 rounded-full text-lg"
            >
              ▶ Play Now
            </button>
          </div>

          {/* UKG */}
          <div className="bg-white rounded-3xl p-8 text-center shadow-xl">
            <div className="text-7xl">🎓</div>
            <h1 className="text-3xl font-bold mt-4 text-blue-500">UKG</h1>
            <p className="mt-3 text-gray-600">Advanced Rhyming Words</p>

            <button
              onClick={() => startGame("ukg")}
              className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-full text-lg"
            >
              ▶ Play Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((current + 1) / questions.length) * 100;

  // RESULT PAGE
  if (showResult) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 p-4">
        <div className="bg-white rounded-3xl p-8 text-center shadow-xl w-full max-w-md">
          <div className="text-7xl">🏆</div>

          <h1 className="text-4xl font-bold text-green-600 mt-4">Wonderful!</h1>

          <h2 className="text-2xl mt-4">
            Score : {score} / {questions.length}
          </h2>

          <button
            onClick={restartGame}
            className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-full text-lg"
          >
            🔄 Back To Levels
          </button>
        </div>
      </div>
    );
  }

  // GAME PAGE
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
          <h2 className="text-2xl font-bold">Find a word that rhymes with</h2>

          <div className="text-5xl text-orange-500 mt-5">
            {question.emoji} {question.word}
          </div>

          <button
            onClick={speakWord}
            className="mt-5 bg-blue-500 text-white px-5 py-2 rounded-full"
          >
            🔊 Listen
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => checkAnswer(option)}
                className={`p-4 rounded-2xl text-white text-xl transition ${
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

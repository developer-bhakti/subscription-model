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

const modes = [
  {
    id: "compare",
    name: "Fill the blank with =, > or <",
    emoji: "⚖️",
    desc: "Compare two numbers and choose the correct sign.",
  },
  {
    id: "series",
    name: "Fill the blanks in a number series",
    emoji: "🔗",
    desc: "Find the missing number in the series.",
  },
  {
    id: "identifyNumber",
    name: "Identify the Number",
    emoji: "🔢",
    desc: "Count the objects or read the number name.",
  },
  {
    id: "moreOrLess",
    name: "Identify More or Less",
    emoji: "🧮",
    desc: "Pick the side that has more or less.",
  },
  {
    id: "heavyOrLight",
    name: "Identify Heavy or Light",
    emoji: "🏋️",
    desc: "Choose the heavier or the lighter thing.",
  },
  {
    id: "bigOrSmall",
    name: "Identify Big or Small",
    emoji: "🐘",
    desc: "Choose the bigger or the smaller thing.",
  },
];

/* ----------------------------- QUESTION BANKS ----------------------------- */

// 1. FILL THE BLANK WITH =, > OR <   ->  [left number, right number]
const compareBank = {
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

// 2. NUMBER SERIES  ->  full series plus the index that is hidden
const seriesBank = {
  pg: [
    { series: [1, 2, 3], blank: 1, wrong: [4, 5] },
    { series: [1, 2, 3, 4], blank: 2, wrong: [5, 1] },
    { series: [2, 3, 4, 5], blank: 3, wrong: [6, 2] },
    { series: [1, 2, 3, 4, 5], blank: 4, wrong: [6, 3] },
    { series: [3, 4, 5], blank: 0, wrong: [2, 1] },
    { series: [1, 2, 3], blank: 2, wrong: [4, 2] },
  ],
  nursery: [
    { series: [4, 5, 6, 7], blank: 2, wrong: [8, 4] },
    { series: [6, 7, 8, 9], blank: 1, wrong: [5, 9] },
    { series: [1, 2, 3, 4, 5], blank: 3, wrong: [6, 2] },
    { series: [7, 8, 9, 10], blank: 3, wrong: [11, 8] },
    { series: [2, 3, 4, 5], blank: 0, wrong: [1, 6] },
    { series: [5, 6, 7, 8], blank: 2, wrong: [9, 5] },
  ],
  lkg: [
    { series: [11, 12, 13, 14], blank: 2, wrong: [15, 11] },
    { series: [15, 16, 17, 18], blank: 1, wrong: [14, 19] },
    { series: [2, 4, 6, 8], blank: 2, wrong: [7, 5] },
    { series: [10, 12, 14, 16], blank: 3, wrong: [15, 18] },
    { series: [17, 18, 19, 20], blank: 3, wrong: [21, 19] },
    { series: [5, 10, 15, 20], blank: 2, wrong: [12, 18] },
  ],
  ukg: [
    { series: [25, 26, 27, 28], blank: 2, wrong: [29, 26] },
    { series: [10, 20, 30, 40], blank: 2, wrong: [35, 25] },
    { series: [45, 50, 55, 60], blank: 3, wrong: [65, 58] },
    { series: [70, 72, 74, 76], blank: 1, wrong: [71, 73] },
    { series: [88, 89, 90, 91], blank: 2, wrong: [80, 99] },
    { series: [20, 30, 40, 50], blank: 0, wrong: [10, 25] },
  ],
};

// 3. IDENTIFY THE NUMBER  ->  count objects (PG, Nursery) or read the name (LKG, UKG)
const identifyNumberBank = {
  pg: [
    { emoji: "🍎", count: 3, wrong: [2, 4] },
    { emoji: "🐟", count: 1, wrong: [2, 3] },
    { emoji: "⭐", count: 5, wrong: [4, 3] },
    { emoji: "🎈", count: 2, wrong: [1, 4] },
    { emoji: "🍌", count: 4, wrong: [5, 2] },
    { emoji: "🚗", count: 3, wrong: [1, 5] },
  ],
  nursery: [
    { emoji: "🐥", count: 6, wrong: [5, 7] },
    { emoji: "🍇", count: 8, wrong: [7, 9] },
    { emoji: "🌸", count: 4, wrong: [3, 5] },
    { emoji: "🐞", count: 7, wrong: [6, 8] },
    { emoji: "⚽", count: 10, wrong: [9, 8] },
    { emoji: "🦋", count: 5, wrong: [6, 4] },
  ],
  lkg: [
    { words: "Twelve", number: 12, wrong: [21, 20] },
    { words: "Fifteen", number: 15, wrong: [50, 5] },
    { words: "Nine", number: 9, wrong: [6, 19] },
    { words: "Seventeen", number: 17, wrong: [7, 70] },
    { words: "Twenty", number: 20, wrong: [12, 2] },
    { words: "Eleven", number: 11, wrong: [10, 1] },
  ],
  ukg: [
    { words: "Thirty Four", number: 34, wrong: [43, 30] },
    { words: "Fifty", number: 50, wrong: [15, 5] },
    { words: "Sixty Seven", number: 67, wrong: [76, 60] },
    { words: "Eighty", number: 80, wrong: [18, 8] },
    { words: "Ninety Nine", number: 99, wrong: [89, 90] },
    { words: "Forty Two", number: 42, wrong: [24, 40] },
  ],
};

// 4. MORE OR LESS  ->  object groups for the little ones, plain numbers later
const moreOrLessBank = {
  pg: [
    { emoji: "🍎", left: 2, right: 4, ask: "more" },
    { emoji: "⭐", left: 5, right: 1, ask: "more" },
    { emoji: "🎈", left: 3, right: 1, ask: "less" },
    { emoji: "🐟", left: 1, right: 4, ask: "more" },
    { emoji: "🍌", left: 4, right: 2, ask: "less" },
    { emoji: "🚗", left: 5, right: 3, ask: "more" },
  ],
  nursery: [
    { emoji: "🐥", left: 6, right: 3, ask: "more" },
    { emoji: "🍇", left: 2, right: 7, ask: "less" },
    { emoji: "🌸", left: 8, right: 5, ask: "less" },
    { emoji: "🐞", left: 4, right: 6, ask: "more" },
    { emoji: "⚽", left: 7, right: 2, ask: "more" },
    { emoji: "🦋", left: 3, right: 8, ask: "less" },
  ],
  lkg: [
    { left: 14, right: 18, ask: "more" },
    { left: 12, right: 9, ask: "more" },
    { left: 20, right: 15, ask: "less" },
    { left: 11, right: 16, ask: "less" },
    { left: 17, right: 13, ask: "more" },
    { left: 10, right: 19, ask: "less" },
  ],
  ukg: [
    { left: 45, right: 54, ask: "more" },
    { left: 90, right: 19, ask: "more" },
    { left: 36, right: 63, ask: "less" },
    { left: 100, right: 99, ask: "more" },
    { left: 25, right: 52, ask: "less" },
    { left: 73, right: 37, ask: "less" },
  ],
};

// 5. HEAVY OR LIGHT
const heavyOrLightBank = {
  pg: [
    { ask: "heavy", left: { emoji: "🐘", name: "Elephant" }, right: { emoji: "🪶", name: "Feather" }, answer: "left" },
    { ask: "heavy", left: { emoji: "🎈", name: "Balloon" }, right: { emoji: "🪨", name: "Stone" }, answer: "right" },
    { ask: "light", left: { emoji: "🐜", name: "Ant" }, right: { emoji: "🐄", name: "Cow" }, answer: "left" },
    { ask: "heavy", left: { emoji: "🚌", name: "Bus" }, right: { emoji: "🚲", name: "Cycle" }, answer: "left" },
    { ask: "light", left: { emoji: "📕", name: "Book" }, right: { emoji: "🍂", name: "Leaf" }, answer: "right" },
    { ask: "heavy", left: { emoji: "🍉", name: "Watermelon" }, right: { emoji: "🍓", name: "Strawberry" }, answer: "left" },
  ],
  nursery: [
    { ask: "heavy", left: { emoji: "🐕", name: "Dog" }, right: { emoji: "🐈", name: "Cat" }, answer: "left" },
    { ask: "light", left: { emoji: "🥛", name: "Glass of Milk" }, right: { emoji: "🪣", name: "Bucket of Water" }, answer: "left" },
    { ask: "heavy", left: { emoji: "🪑", name: "Chair" }, right: { emoji: "🛏️", name: "Bed" }, answer: "right" },
    { ask: "light", left: { emoji: "🍚", name: "Rice Bag" }, right: { emoji: "🍪", name: "Biscuit" }, answer: "right" },
    { ask: "heavy", left: { emoji: "🚗", name: "Car" }, right: { emoji: "🛵", name: "Scooter" }, answer: "left" },
    { ask: "heavy", left: { emoji: "🧸", name: "Teddy" }, right: { emoji: "🧱", name: "Brick" }, answer: "right" },
  ],
  lkg: [
    { ask: "heavy", left: { emoji: "🏋️", name: "Dumbbell" }, right: { emoji: "🎾", name: "Tennis Ball" }, answer: "left" },
    { ask: "light", left: { emoji: "✏️", name: "Pencil" }, right: { emoji: "🎒", name: "School Bag" }, answer: "left" },
    { ask: "heavy", left: { emoji: "🥔", name: "Sack of Potatoes" }, right: { emoji: "🥚", name: "Egg" }, answer: "left" },
    { ask: "light", left: { emoji: "🚁", name: "Helicopter" }, right: { emoji: "🪁", name: "Kite" }, answer: "right" },
    { ask: "heavy", left: { emoji: "🪵", name: "Wooden Log" }, right: { emoji: "🍁", name: "Leaf" }, answer: "left" },
    { ask: "light", left: { emoji: "📺", name: "Television" }, right: { emoji: "📱", name: "Mobile" }, answer: "right" },
  ],
  ukg: [
    { ask: "heavy", left: { emoji: "🚂", name: "Train" }, right: { emoji: "🚗", name: "Car" }, answer: "left" },
    { ask: "heavy", left: { emoji: "🐋", name: "Whale" }, right: { emoji: "🐬", name: "Dolphin" }, answer: "left" },
    { ask: "light", left: { emoji: "🪨", name: "Rock" }, right: { emoji: "🧽", name: "Sponge" }, answer: "right" },
    { ask: "light", left: { emoji: "🛒", name: "Full Trolley" }, right: { emoji: "🛍️", name: "Small Bag" }, answer: "right" },
    { ask: "heavy", left: { emoji: "🚢", name: "Ship" }, right: { emoji: "⛵", name: "Small Boat" }, answer: "left" },
    { ask: "light", left: { emoji: "🧊", name: "Ice Cube" }, right: { emoji: "❄️", name: "Snowflake" }, answer: "right" },
  ],
};

// 6. BIG OR SMALL
const bigOrSmallBank = {
  pg: [
    { ask: "big", left: { emoji: "🐘", name: "Elephant" }, right: { emoji: "🐁", name: "Mouse" }, answer: "left" },
    { ask: "small", left: { emoji: "🌳", name: "Tree" }, right: { emoji: "🌱", name: "Plant" }, answer: "right" },
    { ask: "big", left: { emoji: "⚽", name: "Football" }, right: { emoji: "🎾", name: "Tennis Ball" }, answer: "left" },
    { ask: "big", left: { emoji: "🏠", name: "House" }, right: { emoji: "🚪", name: "Door" }, answer: "left" },
    { ask: "small", left: { emoji: "🐜", name: "Ant" }, right: { emoji: "🦁", name: "Lion" }, answer: "left" },
    { ask: "small", left: { emoji: "🍉", name: "Watermelon" }, right: { emoji: "🍇", name: "Grape" }, answer: "right" },
  ],
  nursery: [
    { ask: "big", left: { emoji: "🚌", name: "Bus" }, right: { emoji: "🚗", name: "Car" }, answer: "left" },
    { ask: "small", left: { emoji: "🐳", name: "Whale" }, right: { emoji: "🐠", name: "Fish" }, answer: "right" },
    { ask: "big", left: { emoji: "🏔️", name: "Mountain" }, right: { emoji: "⛰️", name: "Hill" }, answer: "left" },
    { ask: "big", left: { emoji: "🎒", name: "School Bag" }, right: { emoji: "📒", name: "Notebook" }, answer: "left" },
    { ask: "big", left: { emoji: "🦒", name: "Giraffe" }, right: { emoji: "🐐", name: "Goat" }, answer: "left" },
    { ask: "small", left: { emoji: "🥥", name: "Coconut" }, right: { emoji: "🫐", name: "Blueberry" }, answer: "right" },
  ],
  lkg: [
    { ask: "big", left: { emoji: "🏢", name: "Building" }, right: { emoji: "🏠", name: "House" }, answer: "left" },
    { ask: "small", left: { emoji: "✈️", name: "Aeroplane" }, right: { emoji: "🚲", name: "Bicycle" }, answer: "right" },
    { ask: "big", left: { emoji: "🐊", name: "Crocodile" }, right: { emoji: "🦎", name: "Lizard" }, answer: "left" },
    { ask: "small", left: { emoji: "🍎", name: "Apple" }, right: { emoji: "🍒", name: "Cherry" }, answer: "right" },
    { ask: "big", left: { emoji: "🚢", name: "Ship" }, right: { emoji: "⛵", name: "Sailboat" }, answer: "left" },
    { ask: "small", left: { emoji: "🌻", name: "Sunflower" }, right: { emoji: "🌼", name: "Daisy" }, answer: "right" },
  ],
  ukg: [
    { ask: "big", left: { emoji: "🌍", name: "Earth" }, right: { emoji: "🌙", name: "Moon" }, answer: "left" },
    { ask: "big", left: { emoji: "🐘", name: "Elephant" }, right: { emoji: "🦏", name: "Rhino" }, answer: "left" },
    { ask: "big", left: { emoji: "🏟️", name: "Stadium" }, right: { emoji: "🏫", name: "School" }, answer: "left" },
    { ask: "small", left: { emoji: "🐍", name: "Snake" }, right: { emoji: "🪱", name: "Worm" }, answer: "right" },
    { ask: "big", left: { emoji: "🗼", name: "Tower" }, right: { emoji: "🏠", name: "House" }, answer: "left" },
    { ask: "small", left: { emoji: "🥭", name: "Mango" }, right: { emoji: "🫒", name: "Olive" }, answer: "right" },
  ],
};

const banks = {
  compare: compareBank,
  series: seriesBank,
  identifyNumber: identifyNumberBank,
  moreOrLess: moreOrLessBank,
  heavyOrLight: heavyOrLightBank,
  bigOrSmall: bigOrSmallBank,
};

/* ------------------------------- HELPERS -------------------------------- */

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

const compareWords = (left, right) => {
  if (left > right) return `${left} is bigger than ${right}`;
  if (left < right) return `${left} is smaller than ${right}`;
  return `${left} is equal to ${right}`;
};

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

// Turns a raw bank item into one shape the game screen can render for every mode.
const buildQuestion = (modeId, item, classInfo) => {
  if (modeId === "compare") {
    const [left, right] = item;
    const answer = correctSign(left, right);

    return {
      prompt: "Fill the blank with =, > or <",
      visual: { kind: "compare", left, right, objectEmoji: classInfo.objectEmoji },
      options: signs.map((sign) => ({ key: sign.symbol, main: sign.symbol, sub: sign.label })),
      columns: 3,
      answer,
      explanation: `${left} ${answer} ${right} — ${compareWords(left, right)}`,
      speech: `Which sign fits? ${left} or ${right}`,
    };
  }

  if (modeId === "series") {
    const answer = String(item.series[item.blank]);

    return {
      prompt: "Which number is missing?",
      visual: {
        kind: "series",
        parts: item.series.map((num, i) => (i === item.blank ? "?" : String(num))),
      },
      options: shuffle([answer, ...item.wrong.map(String)]).map((value) => ({
        key: value,
        main: value,
      })),
      columns: 3,
      answer,
      explanation: `The series is ${item.series.join(", ")}`,
      speech: `Which number is missing in ${item.series
        .map((num, i) => (i === item.blank ? "blank" : num))
        .join(", ")}`,
    };
  }

  if (modeId === "identifyNumber") {
    const isCounting = Boolean(item.emoji);
    const answer = String(isCounting ? item.count : item.number);

    return {
      prompt: isCounting ? "How many do you see?" : "Which number is this?",
      visual: isCounting
        ? { kind: "objects", emoji: item.emoji, count: item.count }
        : { kind: "words", text: item.words },
      options: shuffle([answer, ...item.wrong.map(String)]).map((value) => ({
        key: value,
        main: value,
      })),
      columns: 3,
      answer,
      explanation: isCounting
        ? `There are ${item.count} ${item.emoji}`
        : `${item.words} is written as ${item.number}`,
      speech: isCounting ? "How many do you see?" : `Which number is ${item.words}?`,
    };
  }

  if (modeId === "moreOrLess") {
    const wantsMore = item.ask === "more";
    const answer =
      (wantsMore && item.left > item.right) || (!wantsMore && item.left < item.right)
        ? "left"
        : "right";
    const winner = answer === "left" ? item.left : item.right;
    const other = answer === "left" ? item.right : item.left;

    return {
      prompt: wantsMore ? "Which side has more?" : "Which side has less?",
      visual: null,
      options: [
        {
          key: "left",
          main: item.emoji ? item.emoji.repeat(item.left) : String(item.left),
          sub: item.emoji ? `${item.left}` : null,
        },
        {
          key: "right",
          main: item.emoji ? item.emoji.repeat(item.right) : String(item.right),
          sub: item.emoji ? `${item.right}` : null,
        },
      ],
      columns: 2,
      answer,
      explanation: `${winner} is ${wantsMore ? "more" : "less"} than ${other}`,
      speech: wantsMore ? "Which side has more?" : "Which side has less?",
    };
  }

  // heavyOrLight and bigOrSmall share the same two-picture layout
  const isWeight = modeId === "heavyOrLight";
  const asking = item.ask;
  const winner = item.answer === "left" ? item.left : item.right;
  const other = item.answer === "left" ? item.right : item.left;

  const promptText = {
    heavy: "Which one is heavier?",
    light: "Which one is lighter?",
    big: "Which one is bigger?",
    small: "Which one is smaller?",
  }[asking];

  const wordFor = { heavy: "heavier", light: "lighter", big: "bigger", small: "smaller" }[asking];

  return {
    prompt: promptText,
    visual: null,
    options: [
      { key: "left", main: item.left.emoji, sub: item.left.name },
      { key: "right", main: item.right.emoji, sub: item.right.name },
    ],
    columns: 2,
    answer: item.answer,
    explanation: `${winner.name} is ${wordFor} than ${other.name}`,
    speech: `${promptText} ${item.left.name} or ${item.right.name}`,
    isWeight,
  };
};

const NumeracySkillsCognitiveSkill = () => {
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

  const startGame = (modeId) => {
    const classInfo = classes.find((cls) => cls.id === selectedClass);

    setSelectedMode(modeId);
    setQuestions(
      banks[modeId][selectedClass].map((item) => buildQuestion(modeId, item, classInfo))
    );
    setCurrent(0);
    setScore(0);
    setStars(0);
    setSelected(null);
    setFeedback("");
    setShowResult(false);
  };

  const speak = () => {
    const speech = new SpeechSynthesisUtterance(question.speech);
    speech.rate = 0.8;
    window.speechSynthesis.speak(speech);
  };

  const checkAnswer = (key) => {
    if (selected) return;

    setSelected(key);

    if (key === question.answer) {
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
      <div className="min-h-screen bg-gradient-to-r from-sky-200 via-teal-200 to-green-200 flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold text-teal-700 mb-2 text-center">
          🔢 Numeracy Skills 🔢
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
      <div className="min-h-screen bg-gradient-to-r from-sky-200 via-teal-200 to-green-200 flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold text-teal-700 mb-2 text-center">
          {classInfo.emoji} {classInfo.name}
        </h1>
        <p className="text-gray-700 mb-8 text-center">Which game do you want to play?</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {modes.map((mode) => (
            <div key={mode.id} className="bg-white rounded-3xl p-6 text-center shadow-xl">
              <div className="text-6xl">{mode.emoji}</div>
              <h2 className="text-xl font-bold mt-4 text-teal-600">{mode.name}</h2>
              <p className="mt-2 text-sm text-gray-600">{mode.desc}</p>

              <button
                onClick={() => startGame(mode.id)}
                className="mt-5 bg-teal-500 text-white px-6 py-3 rounded-full text-lg"
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-200 via-teal-200 to-green-200 p-4">
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
              className="bg-teal-500 text-white px-6 py-3 rounded-full text-lg"
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

  const { visual } = question;

  // GAME PAGE
  return (
    <div className="min-h-screen flex justify-center items-center p-4 bg-gradient-to-r from-sky-200 via-teal-200 to-green-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl p-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-teal-600">
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

        <div className="bg-teal-50 border-4 border-dashed border-teal-400 rounded-3xl p-6 mt-6">
          <h2 className="text-2xl font-bold">{question.prompt}</h2>

          {visual && visual.kind === "compare" && (
            <>
              <div className="flex items-center justify-center gap-5 mt-6">
                <div className="text-6xl font-bold text-teal-600">{visual.left}</div>

                <div className="w-20 h-20 flex items-center justify-center rounded-2xl border-4 border-dashed border-orange-400 bg-white text-5xl font-bold text-orange-500">
                  {selected || "?"}
                </div>

                <div className="text-6xl font-bold text-teal-600">{visual.right}</div>
              </div>

              {visual.objectEmoji && (
                <div className="flex items-start justify-center gap-5 mt-5 text-2xl">
                  <div className="flex-1 max-w-[38%]">
                    {visual.objectEmoji.repeat(visual.left)}
                  </div>

                  <div className="w-20" />

                  <div className="flex-1 max-w-[38%]">
                    {visual.objectEmoji.repeat(visual.right)}
                  </div>
                </div>
              )}
            </>
          )}

          {visual && visual.kind === "series" && (
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              {visual.parts.map((part, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 flex items-center justify-center rounded-2xl text-3xl font-bold ${
                    part === "?"
                      ? "border-4 border-dashed border-orange-400 bg-white text-orange-500"
                      : "bg-teal-100 text-teal-700"
                  }`}
                >
                  {part === "?" ? selected || "?" : part}
                </div>
              ))}
            </div>
          )}

          {visual && visual.kind === "objects" && (
            <div className="text-4xl leading-relaxed mt-6 tracking-wider">
              {visual.emoji.repeat(visual.count)}
            </div>
          )}

          {visual && visual.kind === "words" && (
            <div className="text-5xl font-bold text-teal-600 mt-6">{visual.text}</div>
          )}

          <button
            onClick={speak}
            className="mt-5 bg-blue-500 text-white px-5 py-2 rounded-full"
          >
            🔊 Listen
          </button>

          <div
            className={`grid gap-4 mt-6 ${
              question.columns === 2 ? "grid-cols-2" : "grid-cols-3"
            }`}
          >
            {question.options.map((option) => (
              <button
                key={option.key}
                onClick={() => checkAnswer(option.key)}
                className={`p-4 rounded-2xl text-white transition ${
                  selected
                    ? option.key === question.answer
                      ? "bg-green-500"
                      : option.key === selected
                        ? "bg-red-500"
                        : "bg-blue-400"
                    : "bg-blue-400 hover:scale-105"
                }`}
              >
                <div className="text-3xl md:text-4xl font-bold wrap-break-word">{option.main}</div>
                {option.sub && <div className="text-xs mt-1">{option.sub}</div>}
              </button>
            ))}
          </div>

          <div className="text-2xl font-bold mt-5">{feedback}</div>

          {selected && <div className="text-gray-600 mt-2">{question.explanation}</div>}

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

export default NumeracySkillsCognitiveSkill;

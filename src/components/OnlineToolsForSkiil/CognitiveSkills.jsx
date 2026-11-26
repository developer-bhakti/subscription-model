import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton, PageHero } from "../KidsUI";
import {
  APPLICATION_LEVELS,
  MEMORY_LEVELS,
  UNDERSTANDING_LEVELS,
  makeApplicationQuestions,
  makeUnderstandingQuestions,
} from "../../data/cognitiveGames";
import { QuizGame } from "../PhonicsSkills/PhonicsShared";
import { stopSpeaking } from "../PhonicsSkills/phonicsUtils";
import MemoryGame from "./MemoryGame";

// The "Cognitive Skill" card on the Online Tools page opens here: pick a class, then a game. The three games follow
// the first steps of thinking:
//   Remember Game       flip cards and find the matching pairs (MemoryGame.jsx)
//   Understanding Game  which one is a fruit, the odd one out, what goes together, where an animal lives
//   Application Game    everyday situations: it is raining, what do you need?
// What each class gets is in data/cognitiveGames.js.
const classes = [
  { id: "pg", name: "PG", emoji: "🍼", desc: "Play Group" },
  { id: "nursery", name: "Nursery", emoji: "🧸", desc: "Nursery class" },
  { id: "lkg", name: "LKG", emoji: "📚", desc: "Lower KG" },
  { id: "ukg", name: "UKG", emoji: "🎓", desc: "Upper KG" },
];

// A picture with its name, for the options and the big picture of a question.
const PictureOption = ({ emoji }) => (
  <span aria-hidden="true" className="text-5xl leading-none sm:text-6xl">
    {emoji}
  </span>
);

// Turns a question from data/cognitiveGames.js into the multiple-choice game's shape.
const toQuiz = (question) => ({
  prompt: question.prompt,
  speak: question.speak,
  explain: question.explain,
  display: question.scene && (
    <span className="flex flex-col items-center gap-1">
      <span aria-hidden="true" className="leading-none">
        {question.scene.emoji}
      </span>
      <span className="text-xl font-bold text-kid-ink sm:text-2xl">{question.scene.name}</span>
    </span>
  ),
  options: question.options.map((option) => ({
    value: option.name,
    label: option.name,
    icon: <PictureOption emoji={option.emoji} />,
  })),
  answer: question.answer,
});

// Three pictures sit side by side even on a phone; four make two rows on a phone and one on a tablet.
const pictureColumns = (question) =>
  question.options.length >= 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3";

const GAMES = [
  {
    id: "remember",
    name: "Remember Game",
    emoji: "🧠",
    hint: "Look at the cards, remember them, then flip two at a time to find the pairs.",
    desc: (cls) => `Flip the cards and find the ${MEMORY_LEVELS[cls].pairs} matching pairs.`,
    render: (cls) => <MemoryGame key={cls} pairs={MEMORY_LEVELS[cls].pairs} preview={MEMORY_LEVELS[cls].preview} />,
  },
  {
    id: "understanding",
    name: "Understanding Game",
    emoji: "💡",
    hint: "Listen to the question and tap the right picture.",
    desc: (cls) => UNDERSTANDING_LEVELS[cls].desc,
    render: (cls) => (
      <QuizGame
        key={cls}
        makeQuestions={() => makeUnderstandingQuestions(cls).map(toQuiz)}
        columns={pictureColumns}
        optionTextClass="text-base sm:text-lg"
        displayClass="text-7xl sm:text-8xl"
        endless
      />
    ),
  },
  {
    id: "application",
    name: "Application Game",
    emoji: "🧩",
    hint: "What would you do? Tap the picture of what you need.",
    desc: (cls) => APPLICATION_LEVELS[cls].desc,
    render: (cls) => (
      <QuizGame
        key={cls}
        makeQuestions={() => makeApplicationQuestions(cls).map(toQuiz)}
        columns={pictureColumns}
        optionTextClass="text-base sm:text-lg"
        displayClass="text-7xl sm:text-8xl"
        endless
      />
    ),
  },
];

/* ------------------------------------ one game ------------------------------------ */

function GameScreen({ game, cls, onBack }) {
  // Stop talking when the child leaves the game.
  useEffect(() => () => stopSpeaking(), []);

  return (
    <div>
      <div className="mb-4">
        <BackButton onClick={onBack}>← Games</BackButton>
      </div>

      <PageHero emoji={game.emoji} title={`${game.name} – ${cls.name}`} subtitle={game.hint} />

      {game.render(cls.id)}
    </div>
  );
}

/* ------------------------------------- the page ------------------------------------- */

const CognitiveSkills = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState(null);
  const [gameId, setGameId] = useState(null);
  const chosen = classes.find((cls) => cls.id === selectedClass);
  const game = GAMES.find((g) => g.id === gameId);

  // THE GAME
  if (chosen && game) {
    return <GameScreen game={game} cls={chosen} onBack={() => setGameId(null)} />;
  }

  // THE CLASS'S GAMES
  if (chosen) {
    return (
      <div>
        <PageHero emoji="🧠" title={`Cognitive Skill – ${chosen.name}`} subtitle="Which game do you want to play?" />

        <div className="tone-cycle mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GAMES.map((g) => (
            <div key={g.id} className="kid-card kid-card-hover flex flex-col p-6 text-center">
              <div className="kid-chip mx-auto h-24 w-24 text-5xl">{g.emoji}</div>

              <h2 className="mt-4 text-xl font-bold text-kid-ink">{g.name}</h2>

              <p className="mt-2 text-sm font-medium text-kid-soft">{g.desc(chosen.id)}</p>

              <div className="mt-auto pt-5">
                <button type="button" onClick={() => setGameId(g.id)} className="kid-btn px-8 py-3 text-lg">
                  ▶ Play Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button type="button" onClick={() => setSelectedClass(null)} className="kid-btn kid-btn-soft">
            ⬅ Back To Classes
          </button>
        </div>
      </div>
    );
  }

  // CLASS SELECTION
  return (
    <div>
      <div className="mb-4">
        <BackButton onClick={() => navigate("/user/online-games")}>← Online Tools</BackButton>
      </div>

      <PageHero emoji="🧠" title="Cognitive Skill" subtitle="Choose your class to begin." />

      <div className="tone-cycle grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {classes.map((cls) => (
          <div key={cls.id} className="kid-card kid-card-hover p-8 text-center">
            <div className="kid-chip mx-auto h-28 w-28 text-6xl">{cls.emoji}</div>

            <h2 className="mt-4 text-3xl font-bold text-kid-ink">{cls.name}</h2>

            <p className="mt-3 font-medium text-kid-soft">{cls.desc}</p>

            <button type="button" onClick={() => setSelectedClass(cls.id)} className="kid-btn mt-6 px-8 py-3 text-lg">
              ▶ Choose
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CognitiveSkills;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton, PageHero } from "../KidsUI";

// The "Cognitive Skill" card on the Online Tools page opens here: pick a class, then a game. It has no games at the
// moment (the tracing game moved: Trace Numbers is in Numeracy Skills and Trace Letters in Literacy Skills), so a
// class shows a "coming soon" card. New cognitive games go in the class's page below.
const classes = [
  { id: "pg", name: "PG", emoji: "🍼", desc: "Play Group" },
  { id: "nursery", name: "Nursery", emoji: "🧸", desc: "Nursery class" },
  { id: "lkg", name: "LKG", emoji: "📚", desc: "Lower KG" },
  { id: "ukg", name: "UKG", emoji: "🎓", desc: "Upper KG" },
];

const CognitiveSkills = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState(null);
  const chosen = classes.find((cls) => cls.id === selectedClass);

  // THE CLASS'S GAMES
  if (chosen) {
    return (
      <div>
        <PageHero emoji="🧠" title={`Cognitive Skill – ${chosen.name}`} subtitle="Which game do you want to play?" />

        <div className="tone-cycle mx-auto grid max-w-md gap-6">
          <div className="kid-card flex flex-col items-center justify-center border-dashed p-6 text-center">
            <div className="text-5xl" aria-hidden="true">
              🚧
            </div>

            <h2 className="mt-4 text-xl font-bold text-kid-ink">New games coming soon!</h2>

            <p className="mt-2 text-sm font-medium text-kid-soft">
              Cognitive skill games for {chosen.name} will be added here.
            </p>
          </div>
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

import React from "react";
import { useNavigate } from "react-router-dom";
import { BackButton, ModuleCard, ModuleGrid, PageHero } from "../KidsUI";

// The "Phonics Skills" card on the Online Tools page opens here: the phonics games to play with a
// class. For now that is the Rhyming Words Adventure game, which the site already had.
const OnlinePhonicsSkills = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="mb-4">
        <BackButton onClick={() => navigate("/user/online-games")}>← Online Tools</BackButton>
      </div>

      <PageHero
        emoji="🗣️"
        title="Phonics Skills"
        subtitle="Choose a phonics game below to play it with your class."
      />

      <ModuleGrid>
        <ModuleCard
          icon="🎵"
          title="Rhyming Words Adventure"
          description="Choose the word that rhymes with the teacher's word."
          onClick={() => navigate("/user/online-games/phonics-skills/rhyming-words")}
        />
      </ModuleGrid>
    </div>
  );
};

export default OnlinePhonicsSkills;

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHero, ModuleGrid, ModuleCard } from '../KidsUI'

const DashboardOnlineGames = () => {
  const navigate = useNavigate()

  return (
    <div>
      <PageHero
        emoji="🎮"
        title="Online Tools for Skill Development"
        subtitle="Choose an online game below to play it with your class."
      />

      <ModuleGrid>
        <ModuleCard
          icon="🗣️"
          title="Phonics Skills"
          description="Phonics games to play with your class, starting with Rhyming Words."
          onClick={() => navigate('/user/online-games/phonics-skills')}
        />

        <ModuleCard
          icon="🔤"
          title="Literacy Skills"
          description="Letter and word games to build early reading skills."
          onClick={() => navigate('/user/online-games/literacy-skills')}
        />

        <ModuleCard
          icon="🔢"
          title="Numeracy Skills"
          description="Build cognitive skills with number and counting activities."
          onClick={() => navigate('/user/online-games/numeracy-skills')}
        />

        <ModuleCard
          icon="🧠"
          title="Cognitive Skill"
          description="Cognitive skill games for your class."
          onClick={() => navigate('/user/online-games/cognitive-skills')}
        />
      </ModuleGrid>
    </div>
  )
}

export default DashboardOnlineGames

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
          icon="🎵"
          title="Rhyming Words Adventure"
          description="Choose the word that rhymes with the teacher's word."
          onClick={() => navigate('/user/online-games/rhyming-words')}
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
      </ModuleGrid>
    </div>
  )
}

export default DashboardOnlineGames

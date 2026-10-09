import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHero, ModuleGrid, ModuleCard } from '../KidsUI'

const DashboardWorksheet = () => {
  const navigate = useNavigate()

  return (
    <div>
      <PageHero
        emoji="📝"
        title="Worksheets & Activities"
        subtitle="Choose a worksheet collection below to open the content."
      />

      <ModuleGrid>
        <ModuleCard
          icon="📅"
          title="Month-wise Worksheets"
          description="Open month-wise worksheets and activities for the school year."
          onClick={() => navigate('/user/worksheet/month-wise')}
        />

        <ModuleCard
          icon="☀️"
          title="Summer Worksheets"
          description="Open summer worksheet packs for Nursery, LKG and UKG."
          onClick={() => navigate('/user/worksheet/summer-worksheets')}
        />

        <ModuleCard
          icon="🎨"
          title="Theme based colouring Worksheets for Your School"
          description="Explore classroom-ready colouring sheets by theme for preschool and early learners."
          onClick={() => navigate('/user/worksheet/theme-based-colouring')}
        />
      </ModuleGrid>
    </div>
  )
}

export default DashboardWorksheet

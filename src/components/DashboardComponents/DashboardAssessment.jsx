import React from "react";
import { useNavigate } from "react-router-dom";
import { PageHero, ModuleGrid, ModuleCard } from "../KidsUI";

const DashboardAssessment = () => {
  const navigate = useNavigate();

  return (
    <div>
      <PageHero
        emoji="📊"
        title="Assessments"
        subtitle="Open specific assessment tools below."
      />

      <ModuleGrid>
        <ModuleCard
          icon="🔎"
          title="Class-wise Initial Diagnostic Assessment (Prime)"
          description="Open diagnostic assessments for each class/level."
          onClick={() => navigate('/user/assessment/class-wise-diagnostic')}
        />

        <ModuleCard
          icon="📆"
          title="Month Formative (Prime Syllabus)"
          description="Open monthly formative assessment tools."
          onClick={() => navigate('/user/assessment/month-formative')}
        />

        <ModuleCard
          icon="📆"
          title="Month Formative (General Syllabus)"
          description="Open monthly formative assessment tools."
          onClick={() => navigate('/user/assessment/formative-general')}
        />

        <ModuleCard
          icon="📝"
          title="Summative Assessment"
          description="Open summative assessment resources."
          onClick={() => navigate('/user/assessment/sumative')}
        />

        <ModuleCard
          icon="🍎"
          title="Nutritional Assessment"
          description="Open nutritional and health assessment tools."
          onClick={() => navigate('/user/assessment/nutritional')}
        />

        <ModuleCard
          icon="📝"
          title="Assessment For ADHD"
          description="Specialized assessment tools to help identify attention, behavioral patterns, and learning support requirements in children.."
          onClick={() => navigate('/user/assessment/assessement-adhd')}
        />
      </ModuleGrid>
    </div>
  );
};

export default DashboardAssessment;

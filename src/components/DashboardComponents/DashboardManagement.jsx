import React from "react";
import { useNavigate } from "react-router-dom";
import { PageHero, ModuleGrid, ModuleCard } from "../KidsUI";

const DashboardManagement = () => {
  const navigate = useNavigate();

  return (
    <div>
      <PageHero
        emoji="🏫"
        title="School Management"
        subtitle="Open management tools below."
      />

      <ModuleGrid>
        <ModuleCard
          icon="📝"
          title="Admission Form"
          description="Open the school admission form tool."
          onClick={() => navigate('/user/management/admission-form')}
        />

        <ModuleCard
          icon="📚"
          title="Admission Test"
          description="Open admission test resources."
          onClick={() => navigate('/user/management/admission-test')}
        />

        <ModuleCard
          icon="🗓️"
          title="Build Your Session Plan"
          description="Build and print a school term session plan."
          onClick={() => navigate('/user/curriculum/lem-core-curriculum/session-plan')}
        />

        <ModuleCard
          icon="🔊"
          title="Sound Book"
          description="Open the phonics sound books for every class."
          onClick={() => navigate('/user/management/sound-books')}
        />
      </ModuleGrid>
    </div>
  );
};

export default DashboardManagement;

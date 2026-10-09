import React from "react";
import { useNavigate } from "react-router-dom";
import { PageHero, ModuleGrid, ModuleCard } from "../KidsUI";

const DashboardCurriculum = () => {
  const navigate = useNavigate();

  return (
    <div className="px-3 sm:px-5 lg:px-0">
      <PageHero
        emoji="📘"
        title="Curriculum & Academic Resources"
        subtitle="Choose a resource card below to open the detailed curriculum or counselling tool."
      />

      <ModuleGrid>
        <ModuleCard
          icon="📘"
          title="LEMCore Curriculum"
          description="Open the LEMCore Curriculum section for Nursery, LKG and UKG learning resources."
          onClick={() => navigate("/user/curriculum/lem-core-curriculum")}
        />

        <ModuleCard
          icon="📘"
          title="ACT Curriculum"
          description="Open the ACT Curriculum section for Nursery, LKG and UKG learning resources."
          onClick={() => navigate("/user/curriculum/act-curriculum")}
        />

        <ModuleCard
          icon="👪"
          title="Parent Counselling Tools"
          description="Open the Parent Counselling Tools section for early child development support resources."
          onClick={() => navigate("/user/curriculum/parent-counselling-tools")}
        />
      </ModuleGrid>
    </div>
  );
};

export default DashboardCurriculum;

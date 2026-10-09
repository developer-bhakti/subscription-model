import React from "react";
import { useNavigate } from "react-router-dom";
import { PageHero, ModuleGrid, ModuleCard } from "../KidsUI";

const DashboardAuditTools = () => {
  const navigate = useNavigate();

  return (
    <div>
      <PageHero
        emoji="🧾"
        title="Audit Tools"
        subtitle="Open audit tools below."
      />

      <ModuleGrid>
        <ModuleCard
          icon="🧸"
          title="Toy Material"
          description="Audit classroom toys and learning materials."
          onClick={() => navigate('/user/audit-tools/toy-material')}
        />
      </ModuleGrid>
    </div>
  );
};

export default DashboardAuditTools;

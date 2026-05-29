import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardCurriculum = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Curriculum & Academic Resources</h2>
          <p className="text-sm text-gray-500 mt-1">
            Choose a resource card below to open the detailed curriculum or counselling tool.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => navigate("/user/curriculum/lem-core-curriculum")}
          className="text-left bg-white rounded-3xl shadow hover:shadow-lg transition p-6 border border-gray-200"
        >
          <div className="text-4xl mb-4">📘</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">LEMCore Curriculum</h3>
          <p className="text-sm text-gray-500">
            Open the LEMCore Curriculum section for Nursery, LKG and UKG learning resources.
          </p>
        </button>

        <button
          onClick={() => navigate("/user/curriculum/parent-counselling-tools")}
          className="text-left bg-white rounded-3xl shadow hover:shadow-lg transition p-6 border border-gray-200"
        >
          <div className="text-4xl mb-4">👪</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Parent Counselling Tools</h3>
          <p className="text-sm text-gray-500">
            Open the Parent Counselling Tools section for early child development support resources.
          </p>
        </button>
      </div>
    </div>
  );
};

export default DashboardCurriculum;

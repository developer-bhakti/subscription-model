import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardCurriculum = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 px-3 sm:px-5 lg:px-0">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div className="w-full">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 leading-snug">
            Curriculum & Academic Resources
          </h2>

          <p className="text-sm sm:text-base text-gray-500 mt-2 leading-relaxed">
            Choose a resource card below to open the detailed curriculum or
            counselling tool.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        
        {/* LEMCore Curriculum */}
        <button
          onClick={() => navigate("/user/curriculum/lem-core-curriculum")}
          className="text-left bg-white rounded-2xl sm:rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-5 sm:p-6 border border-gray-200 w-full"
        >
          <div className="text-4xl sm:text-5xl mb-4">📘</div>

          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            LEMCore Curriculum
          </h3>

          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            Open the LEMCore Curriculum section for Nursery, LKG and UKG
            learning resources.
          </p>
          
        </button>

        {/* Parent Counselling Tools */}
        <button
          onClick={() =>
            navigate("/user/curriculum/parent-counselling-tools")
          }
          className="text-left bg-white rounded-2xl sm:rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-5 sm:p-6 border border-gray-200 w-full"
        >
          <div className="text-4xl sm:text-5xl mb-4">👪</div>

          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            Parent Counselling Tools
          </h3>

          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            Open the Parent Counselling Tools section for early child
            development support resources.
          </p>
        </button>
      </div>
    </div>
  );
};

export default DashboardCurriculum;
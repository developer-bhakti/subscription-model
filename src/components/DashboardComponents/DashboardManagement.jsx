import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">School Management</h2>
          <p className="text-sm text-gray-500 mt-1">Open management tools below.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => navigate('/user/management/admission-form')}
          className="text-left bg-white rounded-3xl shadow hover:shadow-lg transition p-6 border border-gray-200"
        >
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Admission Form</h3>
          <p className="text-sm text-gray-500">Open the school admission form tool.</p>
        </button>

        <button
          onClick={() => navigate('/user/management/admission-test')}
          className="text-left bg-white rounded-3xl shadow hover:shadow-lg transition p-6 border border-gray-200"
        >
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Admission Test</h3>
          <p className="text-sm text-gray-500">Open admission test resources.</p>
        </button>
      </div>
    </div>
  );
};

export default DashboardManagement;

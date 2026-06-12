import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardAssessment = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Assessments</h2>
          <p className="text-sm text-gray-500 mt-1">Open specific assessment tools below.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button
          onClick={() => navigate('/user/assessment/class-wise-diagnostic')}
          className="text-left bg-white rounded-3xl shadow hover:shadow-lg transition p-6 border border-gray-200"
        >
          <div className="text-4xl mb-4">🔎</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Class-wise Diagnostic</h3>
          <p className="text-sm text-gray-500">Open diagnostic assessments for each class/level.</p>
        </button>

        <button
          onClick={() => navigate('/user/assessment/month-formative')}
          className="text-left bg-white rounded-3xl shadow hover:shadow-lg transition p-6 border border-gray-200"
        >
          <div className="text-4xl mb-4">📆</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Month Formative (Prime Syllubus)</h3>
          <p className="text-sm text-gray-500">Open monthly formative assessment tools.</p>
        </button>

           <button
          onClick={() => navigate('/user/assessment/formative-general')}
          className="text-left bg-white rounded-3xl shadow hover:shadow-lg transition p-6 border border-gray-200"
        >
          <div className="text-4xl mb-4">📆</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Month Formative (General Syllubus)</h3>
          <p className="text-sm text-gray-500">Open monthly formative assessment tools.</p>
        </button>

        <button
          onClick={() => navigate('/user/assessment/sumative')}
          className="text-left bg-white rounded-3xl shadow hover:shadow-lg transition p-6 border border-gray-200"
        >
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Summative Assessment</h3>
          <p className="text-sm text-gray-500">Open summative assessment resources.</p>
        </button>

        <button
          onClick={() => navigate('/user/assessment/nutritional')}
          className="text-left bg-white rounded-3xl shadow hover:shadow-lg transition p-6 border border-gray-200"
        >
          <div className="text-4xl mb-4">🍎</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Nutritional Assessment</h3>
          <p className="text-sm text-gray-500">Open nutritional and health assessment tools.</p>
        </button>

         <button
          onClick={() => navigate('/user/assessment/assessement-adhd')}
          className="text-left bg-white rounded-3xl shadow hover:shadow-lg transition p-6 border border-gray-200"
        >
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2"> Assessment For ADHD</h3>
          <p className="text-sm text-gray-500">Specialized assessment tools to help identify attention, behavioral patterns, and learning support requirements in children..</p>
        </button>
      </div>
    </div>
  );
};

export default DashboardAssessment;

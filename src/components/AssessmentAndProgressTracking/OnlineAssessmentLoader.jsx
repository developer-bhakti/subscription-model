import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Vite's import.meta.glob imports files dynamically
const modules = import.meta.glob("./OnlineAssessment/**/*.jsx");

export default function OnlineAssessmentLoader() {
  const { level, month } = useParams();
  const navigate = useNavigate();
  const [Comp, setComp] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!level || !month) {
      setError(true);
      return;
    }

    const lvlLower = level.toLowerCase();

    // Map level to folder name and file suffix matching exactly the project folder naming
    let folder = "";
    let fileSuffix = "";

    if (lvlLower === "pg") {
      folder = "OnlineAssesmentPG";
      fileSuffix = "Pg";
    } else if (lvlLower === "nursery") {
      folder = "OnlineAssesmentNursery";
      fileSuffix = "Nursery";
    } else if (lvlLower === "lkg") {
      folder = "OnlineAssessmentLKG";
      fileSuffix = "LKG";
    } else if (lvlLower === "ukg") {
      folder = "OnlineAssessmentUKG";
      fileSuffix = "UKG";
    } else {
      setError(true);
      return;
    }

    // Match suffix dynamically using endsWith to prevent path mismatch issues
    const expectedKeySuffix = `OnlineAssessment/${folder}/Month${month}${fileSuffix}OnlineFormative.jsx`.toLowerCase();
    const matchedKey = Object.keys(modules).find(
      (k) => k.toLowerCase().endsWith(expectedKeySuffix)
    );

    if (matchedKey) {
      setError(false);
      modules[matchedKey]()
        .then((mod) => {
          setComp(() => mod.default);
        })
        .catch((err) => {
          console.error("Failed to load online assessment component:", err);
          setError(true);
        });
    } else {
      console.warn(`Assessment not found with suffix: ${expectedKeySuffix}`);
      setError(true);
    }
  }, [level, month]);

  if (error) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl shadow border border-gray-200 max-w-lg mx-auto mt-20">
        <h3 className="text-xl font-bold text-red-600 mb-4">Assessment Not Found</h3>
        <p className="text-gray-600 mb-6">The requested online formative assessment does not exist or hasn't been created yet.</p>
        <button
          onClick={() => navigate("/user/assessment/month-formative")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!Comp) {
    return (
      <div className="flex items-center justify-center p-20 min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <span className="ml-3 text-gray-600 font-semibold">Loading Assessment...</span>
      </div>
    );
  }

  return <Comp />;
}

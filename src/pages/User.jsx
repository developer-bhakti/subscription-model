import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Worksheet from "../components/Worksheet";

export default function User() {
  const [user] = useState(() => JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading...
      </div>
    );
  }

  const today = new Date();
  const endDate = new Date(user.end_date);
  const isActive = today <= endDate;
  const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-indigo-600">
            School Activities
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 py-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Explore Fun Learning Activities 🎨
        </h2>
        <p className="text-gray-600 mt-2">
          Creative activities designed for kids growth and development
        </p>
      </div>

      {/* Subscription Info */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="bg-white rounded-xl shadow-sm p-5 flex justify-between items-center border-l-4 border-indigo-500">
          <div>
            <h3 className="font-semibold text-gray-800">
              {user.username}
            </h3>
            <p className="text-sm text-gray-500">
              {isActive
                ? `Active • ${daysLeft} days left`
                : "Subscription expired"}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-sm ${
              isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {isActive ? "Active" : "Expired"}
          </span>
        </div>
      </div>

      {/* Activities Grid */}

      <Worksheet />

    </div>
  );
}
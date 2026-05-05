import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { sections } from "../data";
import DashboardHome from "../components/DashboardComponents/DashboardHome";
import DashboardCurriculum from "../components/DashboardComponents/DashboardCurriculum";
import DashboardWorksheet from "../components/DashboardComponents/DashboardWorksheet";
import DashboardAssessment from "../components/DashboardComponents/DashboardAssessment";
import DashboardTeacherSupport from "../components/DashboardComponents/DashboardTeacherSupport";
import DashboardManagement from "../components/DashboardComponents/DashboardManagement";
import DashboardMarketing from "../components/DashboardComponents/DashboardMarketing";
import DashboardPremium from "../components/DashboardComponents/DashboardPremium";

export default function User() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const today = new Date();
  const endDate = new Date(user.end_date);
  const isActive = today <= endDate;

  return (
    <div className="flex min-h-screen bg-gray-100 max-h-screen overflow-hidden">
      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow-lg p-5 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold text-indigo-600 mb-8">Das hboard</h1>

          <div className="space-y-3">
            {sections.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  if (item.premium && !isActive) return;
                  navigate(item.path);
                }}
                className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-indigo-50 transition"
              >
                <span>{item.icon}</span>
                <span className="text-gray-700">{item.title}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8 overflow-auto">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/curriculum" element={<DashboardCurriculum />} />
          <Route path="/worksheet" element={<DashboardWorksheet />} />
          <Route path="/assessment" element={<DashboardAssessment />} />
          <Route
            path="/teacher-support"
            element={<DashboardTeacherSupport />}
          />
          <Route path="/management" element={<DashboardManagement />} />
          <Route path="/marketing" element={<DashboardMarketing />} />
          <Route path="/premium" element={<DashboardPremium />} />
        </Routes>
      </div>
    </div>
  );
}

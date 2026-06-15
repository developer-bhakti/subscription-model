import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { sections } from "../data";
import DashboardHome from "../components/DashboardComponents/DashboardHome";
import DashboardCurriculum from "../components/DashboardComponents/DashboardCurriculum";
import DashboardWorksheet from "../components/DashboardComponents/DashboardWorksheet";
import DashboardAssessment from "../components/DashboardComponents/DashboardAssessment";
import DashboardTeacherSupport from "../components/DashboardComponents/DashboardTeacherSupport";
import DashboardManagement from "../components/DashboardComponents/DashboardManagement";
import ClassWiseDiagnosticAssessment from "../components/AssessmentAndProgressTracking/ClassWiseDiagnosticAssessment";
import MonthFormativeAssessment from "../components/AssessmentAndProgressTracking/MonthFormativeAssessment";
import OnlineAssessmentLoader from "../components/AssessmentAndProgressTracking/OnlineAssessmentLoader";
import SumativeAssessment from "../components/AssessmentAndProgressTracking/SumativeAssessment";
import AssessmentForNutritional from "../components/AssessmentAndProgressTracking/AssessmentForNutritional";
import DashboardMarketing from "../components/DashboardComponents/DashboardMarketing";
import DashboardPremium from "../components/DashboardComponents/DashboardPremium";
import SchoolNewsletterApp from "./SchoolNewsletterApp";
import LEMCoreCurriculum from "../components/CurriculumAndAcademicResources/LEMCoreCurriculum";
import ParentCounsellingTools from "../components/CurriculumAndAcademicResources/ParentCounsellingTools";
import MonthWiseWorksheets from "../components/ClassroomActivity/MonthWiseWorksheets";
import SummerWorksheets from "../components/ClassroomActivity/SummerWorksheets";
import SchoolAdmissionForm from "../components/SchoolOprationManagementTool.jsx/SchoolAdmissionForm";
import SchoolAdmissionTest from "../components/SchoolOprationManagementTool.jsx/SchoolAdmissionTest";
import ACTCurriculum from "../components/CurriculumAndAcademicResources/ACTCurriculum";
import FormativeAssessmentGeneral from "../components/AssessmentAndProgressTracking/FormativeAssessmentGeneral";
import AssessementForADHD from "../components/AssessmentAndProgressTracking/AssessementForADHD";

export default function User() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="flex h-screen bg-gray-100 overflow-hidden relative">
      
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white shadow-md p-2 rounded-lg"
      >
        ☰
      </button>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed lg:static top-0 left-0 z-50
          h-full w-72 bg-white shadow-lg p-5
          flex flex-col justify-between
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-indigo-600">
              Dashboard
            </h1>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-2xl"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2">
            {sections.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  if (item.premium && !isActive) return;

                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`
                  flex items-center gap-3 p-3 rounded-xl
                  cursor-pointer transition-all duration-200
                  hover:bg-indigo-50 hover:text-indigo-600
                `}
              >
                <span className="text-lg">{item.icon}</span>

                <span className="text-gray-700 text-sm md:text-base">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition mt-5"
        >
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 w-full">
        <Routes>
          <Route index element={<DashboardHome />} />

          <Route
            path="curriculum"
            element={<DashboardCurriculum />}
          />

          <Route
            path="curriculum/lem-core-curriculum"
            element={<LEMCoreCurriculum />}
          />

          <Route
            path="curriculum/act-curriculum"
            element={<ACTCurriculum/>}
          />

          <Route
            path="curriculum/parent-counselling-tools"
            element={<ParentCounsellingTools />}
          />

          <Route
            path="worksheet"
            element={<DashboardWorksheet />}
          />

          <Route
            path="worksheet/month-wise"
            element={<MonthWiseWorksheets />}
          />

          <Route
            path="worksheet/summer-worksheets"
            element={<SummerWorksheets />}
          />

          <Route
            path="assessment"
            element={<DashboardAssessment />}
          />

          <Route
            path="assessment/class-wise-diagnostic"
            element={<ClassWiseDiagnosticAssessment />}
          />

          <Route
            path="assessment/month-formative"
            element={<MonthFormativeAssessment />}
          />

          <Route
            path="assessment/formative-general"
            element={<FormativeAssessmentGeneral />}
          />

          <Route
            path="assessment/assessement-adhd"
            element={<AssessementForADHD />}
          />

          <Route
            path="assessment/month-formative/online/:level/:month"
            element={<OnlineAssessmentLoader />}
          />

          <Route
            path="assessment/sumative"
            element={<SumativeAssessment />}
          />

          <Route
            path="assessment/nutritional"
            element={<AssessmentForNutritional />}
          />

          <Route
            path="teacher-support"
            element={<DashboardTeacherSupport />}
          />

          <Route
            path="management"
            element={<DashboardManagement />}
          />

          <Route
            path="management/admission-form"
            element={<SchoolAdmissionForm />}
          />

          <Route
            path="management/admission-test"
            element={<SchoolAdmissionTest />}
          />

          <Route
            path="marketing"
            element={<DashboardMarketing />}
          />

          <Route
            path="premium"
            element={<DashboardPremium />}
          />

          <Route
            path="school-newsletter-app"
            element={<SchoolNewsletterApp />}
          />
        </Routes>
      </div>
    </div>
  );
}
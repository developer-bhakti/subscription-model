import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import User from "./pages/User";
import FreeCoupon from "./components/TeacherSupportAndTraining/FreeCoupon";
import CognitiveSkillFreeCoupon from "./components/TeacherSupportAndTraining/CognitiveSkillFreeCoupon";
import ACTCurriculumFreeCoupon from "./components/TeacherSupportAndTraining/ACTCurriculumFreeCoupon";
import LanguageDevelopmentFreeCoupon from "./components/TeacherSupportAndTraining/LanguageDevelopmentFreeCoupon";
import ManagementOfAssessmentFreeCoupon from "./components/TeacherSupportAndTraining/ManagementOfAssessmentFreeCoupon";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="/get-free-udemy-coupon" element={<FreeCoupon />} />
        <Route path="/cognitive-skill-coupon" element={<CognitiveSkillFreeCoupon />} />
        <Route path="/act-curriculum-coupon" element={<ACTCurriculumFreeCoupon />} />
        <Route path="/language-development-coupon" element={<LanguageDevelopmentFreeCoupon />} />
        <Route path="/management-assessment-coupon" element={<ManagementOfAssessmentFreeCoupon />} />
        <Route
          path="/user/*"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <User />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
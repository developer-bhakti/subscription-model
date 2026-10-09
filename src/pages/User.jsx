import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  House,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { sectionIcons, sectionColors } from "../data/sectionIcons";
import { Owl } from "../components/KidsArt";
import { sections } from "../data";
import { getAccountType, ACCOUNT_TYPES } from "../services/auth";
import DashboardHome from "../components/DashboardComponents/DashboardHome";
import DashboardCurriculum from "../components/DashboardComponents/DashboardCurriculum";
import DashboardWorksheet from "../components/DashboardComponents/DashboardWorksheet";
import DashboardOnlineGames from "../components/DashboardComponents/DashboardOnlineGames";
import DashboardAssessment from "../components/DashboardComponents/DashboardAssessment";
import DashboardTeacherSupport from "../components/DashboardComponents/DashboardTeacherSupport";
import DashboardManagement from "../components/DashboardComponents/DashboardManagement";
import DashboardAuditTools from "../components/DashboardComponents/DashboardAuditTools";
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
import SessionPlanLayout from "../components/SessionPlan/SessionPlanLayout";
import SessionPlanSchoolInfo from "../components/SessionPlan/SessionPlanSchoolInfo";
import SessionPlanManageTerms from "../components/SessionPlan/SessionPlanManageTerms";
import SessionPlanPreview from "../components/SessionPlan/SessionPlanPreview";
import MonthWiseWorksheets from "../components/ClassroomActivity/MonthWiseWorksheets";
import SummerWorksheets from "../components/ClassroomActivity/SummerWorksheets";
import ColourThemeActivities from "../components/ClassroomActivity/ColourThemeActivities";
import SchoolAdmissionForm from "../components/SchoolOprationManagementTool.jsx/SchoolAdmissionForm";
import SchoolAdmissionTest from "../components/SchoolOprationManagementTool.jsx/SchoolAdmissionTest";
import SoundBooks from "../components/SchoolOprationManagementTool.jsx/SoundBooks";
import Toymaterial from "../components/AduitTools/Toymaterial";
import ACTCurriculum from "../components/CurriculumAndAcademicResources/ACTCurriculum";
import FormativeAssessmentGeneral from "../components/AssessmentAndProgressTracking/FormativeAssessmentGeneral";
import AssessementForADHD from "../components/AssessmentAndProgressTracking/AssessementForADHD";
import RhymingWords from "../components/ClassroomActivity/RhymingWords";
import LiteracySkills from "../components/OnlineToolsForSkiil/LiteracySkills";
import NumeracySkillsCognitiveSkill from "../components/OnlineToolsForSkiil/NumeracySkillsCognitiveSkill";
import AdmissionDocWizard from "../components/MarketingAndParentEngagement/AdmissionDocWizard";
import OutreachDocWizard from "../components/MarketingAndParentEngagement/OutreachDocWizard";
//import AdmissionStrategyTool from "../components/MarketingAndParentEngagement/AdmissionStrategyTool";

export default function User() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // On a big screen the sidebar can fold down to just its icons; the choice is remembered.
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem("sidebar-collapsed") === "1";
    } catch {
      return false;
    }
  });

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;

      try {
        localStorage.setItem("sidebar-collapsed", next ? "1" : "0");
      } catch {
        // private mode: the sidebar still collapses, it just won't be remembered
      }

      return next;
    });
  };

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

  // A parent account gets the five learning modules; a school account gets them all.
  const accountType = getAccountType(user);

  // Highlights the sidebar item for the page being viewed, including its sub-pages.
  const isCurrent = (path) =>
    path === "/user"
      ? pathname === "/user" || pathname === "/user/"
      : pathname === path || pathname.startsWith(`${path}/`);

  // Days left on the subscription, for the progress card and the header chips.
  const daysLeft = Math.max(
    0,
    Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)) || 0,
  );
  const ringLength = 2 * Math.PI * 42;

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-b from-[#1da655] to-[#127c3b] font-playful print:block print:h-auto print:overflow-visible print:bg-none print:bg-white">

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden print:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-72 flex-col rounded-r-[28px] bg-[#148340] py-5 text-white shadow-2xl
          transition-[width,transform] duration-300
          lg:relative lg:z-auto lg:shrink-0 lg:translate-x-0 lg:rounded-none lg:bg-transparent lg:shadow-none
          ${collapsed ? "lg:w-[92px]" : "lg:w-[272px]"}
          print:hidden
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Folds the sidebar down to icons (big screens only) */}
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="absolute -right-4 top-32 z-20 hidden h-8 w-8 place-items-center rounded-full bg-white text-[#15803d] shadow-md transition-colors hover:bg-[#ffd93d] lg:grid"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>

        <div className="mb-2 flex justify-end px-5 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/15"
          >
            <X size={18} />
          </button>
        </div>

        {/* Brand */}
        <div className="flex flex-col items-center px-5 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-[18px] bg-white text-[#16a34a] shadow-lg">
            <GraduationCap size={28} />
          </span>

          <span className={`mt-2.5 text-2xl font-semibold tracking-wide ${collapsed ? "lg:hidden" : ""}`}>
            Dashboard
          </span>

          <span className={`mt-1.5 rounded-full bg-white/20 px-3.5 py-0.5 text-xs font-medium ${collapsed ? "lg:hidden" : ""}`}>
            {accountType === ACCOUNT_TYPES.PARENT
                  ? "👨‍👩‍👧 Parent"
                  : "🏫 School"}
          </span>
        </div>

        {/* Navigation */}
        <nav className={`mt-6 min-h-0 flex-1 space-y-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${collapsed ? "px-5 lg:px-3" : "px-5"}`}>
          {sections.map((item) => {
            const Icon = sectionIcons[item.id] || House;
            const active = isCurrent(item.path);
            const locked = item.premium && !isActive;

            return (
              <button
                key={item.id}
                type="button"
                title={item.title.trim()}
                onClick={() => {
                  if (locked) return;

                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                aria-current={active ? "page" : undefined}
                className={`flex w-full items-center gap-3 rounded-full py-1 pl-1.5 pr-4 text-left transition-colors ${
                  collapsed ? "lg:justify-center lg:gap-0 lg:p-0" : ""
                } ${
                  active
                    ? `bg-[#ffd93d] text-[#14532d] ${collapsed ? "lg:bg-transparent" : ""}`
                    : "text-white hover:bg-white/10"
                } ${locked ? "cursor-not-allowed opacity-50" : ""}`}
              >
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full shadow-sm ${
                    collapsed ? "lg:h-11 lg:w-11" : ""
                  } ${
                    active && collapsed ? "bg-white lg:bg-[#ffd93d]" : "bg-white"
                  }`}
                  style={{ color: active && collapsed ? undefined : sectionColors[item.id] }}
                >
                  <Icon
                    size={18}
                    strokeWidth={2.2}
                    className={active && collapsed ? "lg:text-[#14532d]" : ""}
                  />
                </span>

                <span
                  className={`truncate text-[15px] ${
                    active ? "font-semibold" : "font-medium"
                  } ${collapsed ? "lg:hidden" : ""}`}
                >
                  {item.short ?? item.title.trim()}
                </span>
              </button>
            );
          })}
        </nav>

        {/* The owl, when the screen is tall enough to spare the room */}
        <div className={`hidden justify-center pt-2 ${collapsed ? "" : "[@media(min-height:860px)]:flex"}`}>
          <Owl className="h-[88px] w-auto drop-shadow-md" />
        </div>

        {/* Subscription card */}
        <div
          className={`mx-5 mt-3 flex items-center gap-3 rounded-[20px] bg-white px-4 py-3 text-[#14301f] ${
            collapsed ? "lg:mx-3 lg:justify-center lg:px-0" : ""
          }`}
          title={isActive ? `Subscription active, ${daysLeft} days left` : "Subscription expired"}
        >
          <div className="relative h-12 w-12 shrink-0">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#dff3e3" strokeWidth="11" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke={isActive ? "#16a34a" : "#ff6b8b"}
                strokeWidth="11"
                strokeLinecap="round"
                strokeDasharray={`${isActive ? ringLength : 0} ${ringLength}`}
              />
            </svg>

            <span className="absolute inset-0 grid place-items-center text-[11px] font-semibold leading-none">
              {daysLeft}
            </span>
          </div>

          <div className={`min-w-0 leading-tight ${collapsed ? "lg:hidden" : ""}`}>
            <p className="text-sm font-semibold">Subscription</p>
            <p className="text-xs font-medium text-gray-500">
              {isActive ? `${daysLeft} days left` : "Expired"}
            </p>
          </div>
        </div>
      </aside>

      {/* CONTENT */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* MOBILE TOP STRIP */}
        <div className="flex shrink-0 items-center justify-between gap-3 px-4 py-3 text-white lg:hidden print:hidden">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/15"
            >
              <Menu size={20} />
            </button>

            <span className="text-xl font-semibold">Dashboard</span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            aria-label="Logout"
            title="Logout"
            className="grid h-10 w-10 place-items-center rounded-full bg-white/15"
          >
            <LogOut size={18} />
          </button>
        </div>

        {/* WHITE PANEL */}
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-[28px] bg-white lg:rounded-l-[36px] lg:rounded-tr-none print:block print:overflow-visible print:rounded-none print:bg-transparent">

          {/* Top row: name and logout */}
          <div className="hidden shrink-0 items-center justify-end gap-3 px-8 pt-5 lg:flex print:hidden">
            <span className="max-w-[240px] truncate text-base font-medium text-[#14301f]">
              {user.username}
            </span>

            <button
              type="button"
              onClick={handleLogout}
              aria-label="Logout"
              title="Logout"
              className="grid h-10 w-10 place-items-center rounded-full bg-[#e8f7df] text-[#15803d] transition-colors hover:bg-[#15803d] hover:text-white"
            >
              <LogOut size={18} />
            </button>
          </div>

          {/* MAIN CONTENT */}
          <main className="min-h-0 flex-1 overflow-auto p-4 [scrollbar-color:#bfe6c6_transparent] [scrollbar-width:thin] md:p-6 lg:p-8 lg:pt-4 print:overflow-visible print:p-0">
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
                path="curriculum/lem-core-curriculum/session-plan"
                element={<SessionPlanLayout />}
              >
                <Route index element={<SessionPlanSchoolInfo />} />
                <Route path="manage-terms" element={<SessionPlanManageTerms />} />
                <Route path="preview-print" element={<SessionPlanPreview />} />
              </Route>

              <Route
                path="curriculum/act-curriculum"
                element={<ACTCurriculum/>}
              />

              <Route
                path="online-games"
                element={<DashboardOnlineGames />}
              />

              <Route
                path="online-games/rhyming-words"
                element={<RhymingWords />}
              />

              <Route
                path="online-games/literacy-skills"
                element={<LiteracySkills />}
              />

              <Route
                path="online-games/numeracy-skills"
                element={<NumeracySkillsCognitiveSkill />}
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
                path="worksheet/theme-based-colouring"
                element={<ColourThemeActivities />}
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
                path="management/sound-books"
                element={<SoundBooks />}
              />

              <Route
                path="audit-tools"
                element={<DashboardAuditTools />}
              />

              <Route
                path="audit-tools/toy-material"
                element={<Toymaterial />}
              />

              <Route
                path="marketing"
                element={<DashboardMarketing />}
              />

              <Route
                path="marketing/admission-doc"
                element={<AdmissionDocWizard />}
              />

              <Route
                path="marketing/outreach"
                element={<OutreachDocWizard />}
              />

              {/* <Route
                path="marketing/admission-strategy-tool"
                element={<AdmissionStrategyTool />}
              /> */}

              <Route
                path="premium"
                element={<DashboardPremium />}
              />

              <Route
                path="school-newsletter-app"
                element={<SchoolNewsletterApp />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { Eye, GraduationCap, ArrowLeft } from "lucide-react";
import TermsTable from "./TermsTable";
import { useSessionPlan } from "./context/sessionPlanContext";

const SessionPlanManageTerms = () => {
  const navigate = useNavigate();
  const { schoolInfo, selectedClass } = useSessionPlan();

  return (
    <div className="relative min-h-screen w-full overflow-hidden pb-28">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-indigo-600/25 blur-3xl animate-blob" />
        <div className="absolute top-1/2 -right-24 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <Link
          to="/user/curriculum/lem-core-curriculum"
          className="inline-flex items-center gap-1.5 text-sm text-white/60 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Curriculum
        </Link>
      </div>

      <header className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 pt-6 pb-6 text-center sm:px-6">
        {schoolInfo.logo ? (
          <img
            src={schoolInfo.logo}
            alt="School Logo"
            className="h-16 w-16 rounded-2xl object-cover ring-2 ring-white/20 shadow-lg"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-fuchsia-500 shadow-lg">
            <GraduationCap className="h-7 w-7 text-white" />
          </div>
        )}
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Manage Terms
          </h1>
          {(schoolInfo.name || selectedClass) && (
            <p className="mt-1 text-sm text-white/60">
              {[schoolInfo.name, selectedClass].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-4 sm:p-6">
          <TermsTable />
        </div>
      </main>

      <button
        onClick={() => navigate("../preview-print")}
        className="group fixed bottom-6 right-6 z-20 flex items-center gap-2 rounded-full bg-linear-to-r from-emerald-500 to-teal-500 px-5 py-3.5 text-sm font-semibold text-white shadow-xl shadow-emerald-900/40 transition-all duration-200 hover:shadow-2xl hover:brightness-110 active:scale-95"
      >
        <Eye className="h-4 w-4" />
        Preview & Print
      </button>
    </div>
  );
};

export default SessionPlanManageTerms;

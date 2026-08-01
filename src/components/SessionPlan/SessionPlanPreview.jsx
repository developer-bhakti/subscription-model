import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Printer,
  ArrowLeft,
  BookOpen,
  ClipboardList,
  Palmtree,
  Trophy,
  Target,
} from "lucide-react";
import { useSessionPlan } from "./context/sessionPlanContext";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
};

const getSegmentStyle = (month) => {
  const m = month.toLowerCase();
  if (m.includes("vacation"))
    return {
      icon: Palmtree,
      classes:
        "bg-amber-50 text-amber-800 border-amber-200 print:bg-amber-50",
      label: "Vacation",
    };
  if (m.includes("term end"))
    return {
      icon: Trophy,
      classes: "bg-rose-50 text-rose-800 border-rose-200 print:bg-rose-50",
      label: "Term End Exam",
    };
  if (m.includes("mid term") || m.includes("summative"))
    return {
      icon: Target,
      classes:
        "bg-orange-50 text-orange-800 border-orange-200 print:bg-orange-50",
      label: "Summative Assessment",
    };
  if (m.includes("formative"))
    return {
      icon: ClipboardList,
      classes: "bg-sky-50 text-sky-800 border-sky-200 print:bg-sky-50",
      label: "Formative Assessment",
    };
  return {
    icon: BookOpen,
    classes:
      "bg-emerald-50 text-emerald-800 border-emerald-200 print:bg-emerald-50",
    label: "Syllabus",
  };
};

const SessionPlanPreview = () => {
  const { schoolInfo, tasks } = useSessionPlan();
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full overflow-hidden px-4 py-10 sm:px-6 print:p-0">
      <div className="pointer-events-none fixed inset-0 overflow-hidden no-print">
        <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl animate-blob" />
        <div className="absolute top-1/2 -right-24 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between no-print">
          <button
            onClick={() => navigate("../manage-terms")}
            className="flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <button
            className="flex items-center gap-2 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 transition-all duration-200 hover:brightness-110 active:scale-95"
            onClick={() => window.print()}
          >
            <Printer size={16} />
            Print
          </button>
        </div>

        <div className="glass-panel rounded-3xl p-6 sm:p-10 print:rounded-none print:border-0 print:bg-white print:p-0 print:shadow-none">
          {/* School Info Header */}
          <div className="mb-10 flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left print:mb-3 print:flex-row print:items-center print:justify-between print:text-left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 print:text-[9px]">
                Session Planning
              </p>
              <h1 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-4xl print:mt-0 print:text-lg">
                {schoolInfo.name}
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-500 print:mt-0 print:text-[10px]">
                {schoolInfo.address}
              </p>
            </div>
            {schoolInfo.logo && (
              <img
                src={schoolInfo.logo}
                className="h-28 w-28 rounded-2xl object-cover shadow-lg ring-4 ring-white print:h-12 print:w-12 print:rounded-lg print:ring-1"
                alt="school logo"
              />
            )}
          </div>

          {tasks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center text-slate-400">
              No terms have been added yet.
            </div>
          ) : (
            <div className="space-y-10 print:space-y-3">
              {tasks.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 print:break-inside-avoid print:rounded-md"
                >
                  <div className="flex flex-col gap-1 bg-linear-to-r from-slate-900 to-indigo-950 px-5 py-4 text-white sm:flex-row sm:items-center sm:justify-between print:flex-row print:items-center print:justify-between print:bg-slate-800 print:px-3 print:py-1.5">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold print:text-xs">{item.term}</h2>
                      {item.termType && (
                        <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide print:text-[8px]">
                          {item.termType === "term2" ? "Term 2" : "Term 1"}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-white/70 print:text-[10px]">
                      <Calendar className="h-4 w-4 print:hidden" />
                      {formatDate(item.from)} — {formatDate(item.to)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2 print:grid-cols-1 print:gap-1 print:p-1.5">
                    {item.syllabus.map((segment, index) => {
                      const { icon: Icon, classes, label } = getSegmentStyle(
                        segment.month,
                      );
                      return (
                        <div
                          key={index}
                          className={`rounded-xl border p-3.5 text-sm print:break-inside-avoid print:rounded-md print:p-1 print:px-2 ${classes}`}
                        >
                          <div className="flex flex-col gap-1 print:flex-row print:items-center print:justify-between print:gap-2">
                            <span className="flex items-center gap-1.5 font-semibold print:text-[10px]">
                              <Icon className="h-4 w-4 shrink-0 print:h-2.5 print:w-2.5" />
                              {segment.month}
                            </span>
                            <span className="flex items-center gap-2 print:shrink-0 print:whitespace-nowrap">
                              <span className="text-xs opacity-80 print:text-[9px]">
                                {formatDate(segment.syllabusStart)} to{" "}
                                {formatDate(segment.syllabusEnd)}
                              </span>
                              <span className="hidden rounded-full bg-white/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide sm:inline print:hidden">
                                {label}
                              </span>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionPlanPreview;

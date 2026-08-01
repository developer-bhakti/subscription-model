import React, { useState } from "react";
import {
  Plus,
  Trash2,
  BookOpen,
  Palmtree,
  CalendarRange,
  ClipboardList,
} from "lucide-react";
import { useSessionPlan } from "./context/sessionPlanContext";
import AddTermModal from "./AddTermModal";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
};

const getSegmentStyle = (month) => {
  const m = month.toLowerCase();
  if (m.includes("vacation"))
    return { badge: "bg-amber-400/20 text-amber-200 border-amber-400/30", icon: Palmtree };
  if (m.includes("term end"))
    return { badge: "bg-rose-500/20 text-rose-200 border-rose-400/30", icon: ClipboardList };
  if (m.includes("mid term") || m.includes("summative"))
    return { badge: "bg-orange-500/20 text-orange-200 border-orange-400/30", icon: ClipboardList };
  if (m.includes("formative"))
    return { badge: "bg-sky-500/20 text-sky-200 border-sky-400/30", icon: ClipboardList };
  return { badge: "bg-emerald-500/20 text-emerald-200 border-emerald-400/30", icon: BookOpen };
};

const TermsTable = () => {
  const { tasks, setTasks } = useSessionPlan();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Terms</h2>
          <p className="text-sm text-white/50">
            {tasks.length} term{tasks.length !== 1 ? "s" : ""} planned
          </p>
        </div>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-fuchsia-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-900/30 transition-all duration-200 hover:brightness-110 active:scale-95"
        >
          <Plus size={18} />
          <span>Add Term</span>
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 py-16 text-center">
          <CalendarRange className="mb-3 h-10 w-10 text-white/30" />
          <p className="text-white/60">No terms added yet</p>
          <p className="text-sm text-white/35">
            Click "Add Term" to generate your first session plan
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="glass-input group relative flex flex-col rounded-2xl p-5 transition-all duration-200 hover:border-white/30"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">{task.term}</h3>
                    {task.termType && (
                      <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-indigo-200">
                        {task.termType === "term2" ? "Term 2" : "Term 1"}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/50">
                    {formatDate(task.from)} — {formatDate(task.to)}
                  </p>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="rounded-full p-2 text-white/40 opacity-0 transition group-hover:opacity-100 hover:bg-rose-500/20 hover:text-rose-300"
                  title="Delete term"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {task.syllabus.map((segment, index) => {
                  const { badge, icon: Icon } = getSegmentStyle(segment.month);
                  return (
                    <div
                      key={index}
                      className={`flex items-center justify-between rounded-lg border px-3 py-2 text-xs ${badge}`}
                    >
                      <span className="flex items-center gap-1.5 font-medium">
                        <Icon size={13} />
                        {segment.month}
                      </span>
                      <span className="whitespace-nowrap opacity-80">
                        {formatDate(segment.syllabusStart)} – {formatDate(segment.syllabusEnd)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {isPopupOpen && <AddTermModal onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default TermsTable;

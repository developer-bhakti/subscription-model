import React, { useState } from "react";
import { X, Plus, Palmtree, Trash2, BookOpenCheck, Check } from "lucide-react";
import { useSessionPlan } from "./context/sessionPlanContext";
import generateSyllabusAndEvaluations from "./utils/generateSyllabusAndEvaluations";

const inputClass =
  "glass-input w-full rounded-xl py-2.5 px-3.5 text-sm text-white placeholder-white/40 outline-none transition-all duration-200 focus:ring-2 focus:ring-indigo-400/50";

const TERM_TYPES = [
  {
    value: "term1",
    label: "Term 1",
    detail: "Formative I + Mid Term Exam",
  },
  {
    value: "term2",
    label: "Term 2",
    detail: "Formative II + Term End Exam",
  },
];

const AddTermModal = ({ onClose }) => {
  const { setTasks, tasks } = useSessionPlan();
  const [term, setTerm] = useState("");
  const [termType, setTermType] = useState("term1");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [vacations, setVacations] = useState([]);

  const addVacation = () => {
    setVacations([...vacations, { name: "", start: "", end: "" }]);
  };
  const updateVacation = (index, field, value) => {
    const updated = [...vacations];
    updated[index][field] = value;
    setVacations(updated);
  };
  const removeVacation = (index) => {
    setVacations(vacations.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!term || !startDate || !endDate) {
      alert("Please enter all fields");
      return;
    }

    const generatedSyllabus = generateSyllabusAndEvaluations(
      startDate,
      endDate,
      vacations,
      termType,
    );
    if (generatedSyllabus.length === 0) {
      return;
    }

    setTasks([
      ...tasks,
      {
        id: tasks.length + 1,
        term,
        termType,
        from: startDate,
        to: endDate,
        syllabus: generatedSyllabus,
        vacations,
      },
    ]);
    setTerm("");
    setTermType("term1");
    setStartDate("");
    setEndDate("");
    setVacations([]);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm animate-fade-in-up"
      onClick={onClose}
    >
      <div
        className="glass max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-fuchsia-500">
              <BookOpenCheck className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-bold text-white">Add Term</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-white/50 transition hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/60">
              Term Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {TERM_TYPES.map((option) => {
                const isActive = termType === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setTermType(option.value)}
                    className={`relative rounded-xl border p-3 text-left transition-all duration-200 ${
                      isActive
                        ? "border-indigo-400/70 bg-indigo-500/15"
                        : "border-white/15 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500">
                        <Check className="h-3 w-3 text-white" />
                      </span>
                    )}
                    <p className="text-sm font-semibold text-white">
                      {option.label}
                    </p>
                    <p className="mt-0.5 text-[11px] text-white/50">
                      {option.detail}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/60">
              Term Name
            </label>
            <input
              type="text"
              placeholder="e.g. Term 1 (Apr - Sep 2026)"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className={`${inputClass} scheme-dark`}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className={`${inputClass} scheme-dark`}
              />
            </div>
          </div>

          <div className="pt-2">
            <div className="mb-2 flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-xs font-medium text-white/60">
                <Palmtree size={14} />
                Vacations
              </label>
              <button
                type="button"
                onClick={addVacation}
                className="flex items-center gap-1 rounded-lg border border-white/15 px-2.5 py-1.5 text-xs font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <Plus size={13} />
                Add Vacation
              </button>
            </div>

            <div className="space-y-2.5">
              {vacations.map((vac, index) => (
                <div
                  key={index}
                  className="glass-input flex flex-col gap-2 rounded-xl p-3 sm:flex-row sm:items-center"
                >
                  <input
                    type="text"
                    placeholder="Vacation Name"
                    value={vac.name}
                    onChange={(e) => updateVacation(index, "name", e.target.value)}
                    className="w-full flex-1 rounded-lg bg-white/5 px-2.5 py-1.5 text-xs text-white placeholder-white/40 outline-none focus:ring-1 focus:ring-indigo-400/50"
                  />
                  <input
                    type="date"
                    value={vac.start}
                    onChange={(e) => updateVacation(index, "start", e.target.value)}
                    className="rounded-lg bg-white/5 px-2.5 py-1.5 text-xs text-white outline-none scheme-dark focus:ring-1 focus:ring-indigo-400/50"
                  />
                  <input
                    type="date"
                    value={vac.end}
                    onChange={(e) => updateVacation(index, "end", e.target.value)}
                    className="rounded-lg bg-white/5 px-2.5 py-1.5 text-xs text-white outline-none scheme-dark focus:ring-1 focus:ring-indigo-400/50"
                  />
                  <button
                    type="button"
                    onClick={() => removeVacation(index)}
                    className="self-end rounded-lg p-1.5 text-white/40 transition hover:bg-rose-500/20 hover:text-rose-300 sm:self-center"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-linear-to-r from-indigo-500 to-fuchsia-500 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-900/40 transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
          >
            Generate Term Plan
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTermModal;

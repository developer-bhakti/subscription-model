import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  diagnosticAnswerOptions,
  getDiagnosticAssessment,
  pickDiagnosticBand,
} from "../../data/diagnosticOnlineAssessments";

const DIAGNOSTIC_PAGE = "/user/assessment/class-wise-diagnostic";

// The same three colours as the Formative assessment's answer cards: green, yellow and red.
const optionStyles = {
  yes: {
    active:
      "bg-emerald-50 border-emerald-500",
    text: "text-emerald-700",
    circle: "bg-emerald-500 text-white border-emerald-500",
  },

  unsure: {
    active:
      "bg-yellow-50 border-yellow-500",
    text: "text-yellow-700",
    circle: "bg-yellow-500 text-white border-yellow-500",
  },

  no: {
    active:
      "bg-red-50 border-red-500",
    text: "text-red-700",
    circle: "bg-red-500 text-white border-red-500",
  },
};

// The result message for each group, in the same three colours.
const bandStyles = {
  ready: {
    box: "bg-emerald-50 border-emerald-300",
    title: "text-emerald-800",
  },

  attention: {
    box: "bg-yellow-50 border-yellow-300",
    title: "text-yellow-800",
  },

  time: {
    box: "bg-red-50 border-red-300",
    title: "text-red-800",
  },
};

// The online version of one Diagnostic Assessment sheet (a class and a skill), reached from
// "Do It Online" on the Diagnostic page. It is built exactly like the Formative online
// assessment; the check points, answers, scoring and result messages are the Diagnostic
// sheet's own.
export default function OnlineDiagnosticAssessment() {
  const { level, skill } = useParams();
  const navigate = useNavigate();

  const assessment = getDiagnosticAssessment(level, skill);

  if (!assessment) {
    return (
      <div className="kid-card tone-white p-8 text-center max-w-lg mx-auto mt-10">
        <h3 className="text-xl font-bold text-red-600 mb-4">
          Online Assessment Not Available
        </h3>

        <p className="text-gray-600 mb-6">
          The online diagnostic assessment for this class and skill has not
          been set up yet. You can still open the printable assessment with
          View & Download.
        </p>

        <button onClick={() => navigate(DIAGNOSTIC_PAGE)} className="kid-btn">
          Back to Diagnostic Assessment
        </button>
      </div>
    );
  }

  // Keyed by class and skill, so each assessment always starts with a clean form.
  return (
    <DiagnosticChecklist
      key={`${assessment.levelId}/${assessment.skillId}`}
      assessment={assessment}
    />
  );
}

function DiagnosticChecklist({ assessment }) {
  const { level, skill, items, bands } = assessment;

  const [student, setStudent] = useState({
    name: "",
    className: level.label,
    school: "",
  });

  // One entry per check point: 1, 0.5 or 0 once answered, null until then.
  const [answers, setAnswers] = useState(() => items.map(() => null));

  // Set when "Calculate Final Score" is pressed, so check points left blank are pointed out.
  const [checked, setChecked] = useState(false);

  const questionRefs = useRef([]);
  const resultRef = useRef(null);

  const count = items.length;
  const answered = answers.filter((value) => value !== null).length;
  const complete = answered === count;

  const totalScore = answers.reduce((sum, value) => sum + (value ?? 0), 0);

  // Whole and half marks add up exactly, and multiplying before dividing keeps the percentage
  // exact too (13.5 of 15 is exactly 90), so a score on a boundary lands in the right group.
  const percent = count ? (totalScore * 100) / count : 0;
  const shownPercent = Math.round(percent);

  // The result message only applies once every check point has an answer.
  const activeBand = complete ? pickDiagnosticBand(bands, percent) : null;

  const selectOption = (index, score) => {
    setAnswers((previous) =>
      previous.map((value, i) => (i === index ? score : value))
    );
  };

  const handleCalculate = () => {
    setChecked(true);

    const firstMissing = answers.indexOf(null);

    if (firstMissing === -1) {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      questionRefs.current[firstMissing]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const renderOptions = (index) => {
    const selected = answers[index];

    return (
      <div
        role="radiogroup"
        aria-label={`Check point ${index + 1}`}
        className="flex flex-col lg:flex-row gap-5"
      >
        {diagnosticAnswerOptions.map((option) => {
          const isActive = selected === option.score;
          const style = optionStyles[option.tone];

          return (
            <button
              key={option.score}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => selectOption(index, option.score)}
              className={`flex-1 rounded-[20px] border-2 p-5 transition duration-300 hover:-translate-y-1 bg-slate-50 ${
                isActive
                  ? style.active
                  : "border-transparent"
              }`}
            >
              <div
                className={`w-11 h-11 rounded-full border-2 flex items-center justify-center mx-auto mb-4 text-lg font-bold ${
                  isActive
                    ? style.circle
                    : "bg-white border-slate-300"
                }`}
              >
                {option.display}
              </div>

              <h4
                className={`text-center text-[15px] font-semibold leading-6 ${style.text}`}
              >
                ✔ {option.label}
              </h4>
            </button>
          );
        })}
      </div>
    );
  };

  const printToPDF = () => {
    window.print();
  };

  return (
    <div className="rounded-[28px] bg-[#f1faee] min-h-screen p-4 md:p-8 text-kid-ink font-playful">

      {/* PRINT BUTTON */}

      <button
        onClick={printToPDF}
        className="kid-btn mb-5 ml-auto flex w-fit px-7 py-3 font-bold lg:fixed lg:right-5 lg:top-5 lg:z-50 lg:mb-0 lg:ml-0 print:hidden"
      >
        🖨️ Print as PDF
      </button>

      <div className="max-w-[1400px] mx-auto">

        {/* TITLE */}

        <h1 className="mb-8 rounded-[28px] bg-gradient-to-r from-[#d9f3df] via-[#e4f5e6] to-[#eef9d2] px-6 py-6 text-center text-3xl font-semibold text-kid-ink md:text-4xl">
          Diagnostic Assessment Tool
        </h1>

        {/* STUDENT INFO */}

        <div className="kid-card tone-white p-5 sm:p-8 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <div>
              <label htmlFor="diagnostic-student" className="block mb-3 font-semibold">
                Student Name
              </label>

              <input
                id="diagnostic-student"
                type="text"
                placeholder="Enter Student Name"
                value={student.name}
                onChange={(e) =>
                  setStudent({
                    ...student,
                    name: e.target.value,
                  })
                }
                className="kid-input"
              />
            </div>

            <div>
              <label htmlFor="diagnostic-class" className="block mb-3 font-semibold">
                Class
              </label>

              <input
                id="diagnostic-class"
                type="text"
                placeholder="Enter Class"
                value={student.className}
                onChange={(e) =>
                  setStudent({
                    ...student,
                    className: e.target.value,
                  })
                }
                className="kid-input"
              />
            </div>

            <div>
              <label htmlFor="diagnostic-school" className="block mb-3 font-semibold">
                School Name
              </label>

              <input
                id="diagnostic-school"
                type="text"
                placeholder="Enter School Name"
                value={student.school}
                onChange={(e) =>
                  setStudent({
                    ...student,
                    school: e.target.value,
                  })
                }
                className="kid-input"
              />
            </div>

          </div>
        </div>

        {/* SKILL SECTION */}

        <div className="kid-card tone-white overflow-hidden mb-9">

          <div className="bg-gradient-to-r from-[#1da655] to-[#16a34a] px-5 sm:px-8 py-6 text-white">
            <h2 className="text-3xl font-bold">
              {skill.title}
            </h2>
          </div>

          {items.map((item, index) => {
            const missing = checked && answers[index] === null;

            return (
              <div
                key={index}
                ref={(element) => {
                  questionRefs.current[index] = element;
                }}
                className={`p-5 sm:p-8 border-b border-slate-100 ${
                  missing ? "bg-red-50" : ""
                }`}
              >

                <div className="text-[18px] font-semibold leading-8 mb-6">
                  {index + 1}. {item.en}

                  <span
                    lang="hi"
                    className="block text-[18px] font-medium leading-8 text-kid-soft"
                  >
                    {item.hi}
                  </span>
                </div>

                {renderOptions(index)}

                {missing && (
                  <p className="mt-4 text-sm font-semibold text-red-600">
                    Please choose one option for this check point.
                  </p>
                )}
              </div>
            );
          })}

          <div className="m-6 rounded-3xl bg-tone-mint p-5 text-2xl font-semibold text-kid-deep">
            {skill.short} Skill Score :
            <span className="ml-2">
              {shownPercent}%
            </span>
          </div>

        </div>

        {/* BUTTON */}

        <button
          onClick={handleCalculate}
          className="kid-btn mt-5 w-full py-5 text-2xl print:hidden"
        >
          Calculate Final Score
        </button>

        {checked && !complete && (
          <p
            role="alert"
            className="mt-4 rounded-2xl border-2 border-red-200 bg-red-50 px-5 py-3 text-center text-base font-semibold text-red-700 print:hidden"
          >
            Please answer all {count} check points to see the final result.{" "}
            {count - answered} still to go.
          </p>
        )}

        {/* RESULT */}

        <div
          ref={resultRef}
          className="kid-card tone-white mt-10 overflow-x-auto p-5 sm:p-8"
        >

          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-kid-deep text-white p-3 sm:p-5 text-lg sm:text-xl">
                  SKILL
                </th>

                <th className="bg-kid-deep text-white p-3 sm:p-5 text-lg sm:text-xl">
                  SCORE
                </th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td className="border border-slate-200 p-3 sm:p-5 font-semibold">
                  {skill.title}
                </td>

                <td className="border border-slate-200 p-3 sm:p-5 text-center font-semibold">
                  {shownPercent}%
                </td>
              </tr>

            </tbody>
          </table>

          {/* FINAL SCORE */}

          <div className="mt-10 bg-pink-50 border-2 border-pink-200 rounded-[35px] p-5 sm:p-8 flex flex-wrap items-center justify-between gap-5">

            <div className="text-2xl sm:text-3xl font-bold flex flex-wrap items-center gap-4">

              <span>
                My Child's {skill.short} skill Score =
              </span>

              <div className="flex flex-col items-center">

                <div className="border-b-[3px] border-slate-900 pb-2 px-3 text-xl">
                  Total Calculated Score ({totalScore})
                </div>

                <div className="mt-2 text-2xl">
                  {count}
                </div>

              </div>

              <span>× 100 =</span>

            </div>

            <div className="w-[140px] h-[100px] border-[3px] border-slate-900 bg-white flex items-center justify-center text-4xl font-bold">
              {shownPercent}%
            </div>

          </div>

          {/* WHAT THE SCORE MEANS */}

          <div
            aria-live="polite"
            className={`mt-10 border-2 rounded-[35px] p-8 ${
              activeBand
                ? bandStyles[activeBand.id].box
                : "bg-slate-50 border-slate-200"
            }`}
          >
            {activeBand ? (
              <>
                <div
                  className={`text-2xl font-bold ${bandStyles[activeBand.id].title}`}
                >
                  Score {activeBand.range}
                </div>

                <p className="mt-3 text-xl font-semibold leading-8">
                  {activeBand.message}
                </p>
              </>
            ) : (
              <p className="text-xl font-semibold leading-8 text-kid-soft">
                Answer all {count} check points to see what the score means.{" "}
                {count - answered} to go.
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

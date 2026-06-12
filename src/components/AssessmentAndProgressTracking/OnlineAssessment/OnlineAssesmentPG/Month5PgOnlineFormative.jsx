import React, { useState } from "react";

export default function FormativeAssessmentTool() {
  const skillData = {
    language: {
      title: "1. Language & Communication Skill",
      questions: [
        "The child is able to identify letters J to P by its shape",
        "The child is able to sing a part of a song or rhyme",
        "The child is able to follow instructions having 2 step instructions",
        "The child can identify the sound of few letters",
        "The child can associate objects to the letters from M to P",
      ],
    },

    cognitive: {
      title: "2. Cognitive Skill",
      questions: [
        "The child is able to identify all the objects that can go together",
        "Check if the child can pick up the pen and cap of the pen as complementary to each other (from a list of other items)",
        "Check if the child can pick up lock and key as complementary to each other (from a list of other items)",
        "Check if the child can pick up the right cap to the right bottle (in a given set of bottles and their caps)",
        "The child identifies number 5,6,7",
      ],
    },

    social: {
      title: "3. Social & Emotional Skill",
      questions: [
        "The child shows independence in doing various activities like drinking water, scribbling with crayon etc.",
        "The child shows the signs and behaviours of protecting her/his possessions like toys, books etc.",
      ],
    },

    environment: {
      title: "4. Environmental Skill",
      questions: [
        "The child is able to recognize transport vehicles - Police car, Tractor, Yatch",
        "The child identifies fruits - Banana, Strawberry",
        "The child identifies vegetables - Beetroot, Mushroom",
        "The child recognize and names the wild animals-Elephant, Giraffe",
        "The child recognizes and names birds - Duck, Peacock",
        "The child is able to name few objects in the picture -'Birthday`",
      ],
    },

    movement: {
      title: "5. Movement & Physical Skill",
      questions: [
        "The child is able to put large beads in thin sticks",
        "The child is able to put large beads in thin sticks",
        "The child uses one hand predominantly for catching things and doing other activities",
        "The child is able to scribble spontaneously by using crayons",
        "The child is able to stack objects in a given order",
        "The child is able to trace a straight line",
        "The child is able to tear paper through a creased line",
        "The child is able to copy and dance or walk like birds",
      ],
    },
  };

  const [answers, setAnswers] = useState({
    language: [],
    cognitive: [],
    social: [],
    environment: [],
    movement: [],
  });

  const [student, setStudent] = useState({
    name: "",
    className: "",
    school: "",
  });

  const getPercentage = (skill) => {
    const values = answers[skill];
    const total = values.reduce((a, b) => a + b, 0);
    const max = skillData[skill].questions.length * 2;

    return max ? Math.round((total / max) * 100) : 0;
  };

  const selectOption = (skill, index, score) => {
    setAnswers((prev) => {
      const updated = { ...prev };
      updated[skill][index] = score;
      return updated;
    });
  };

  const language = getPercentage("language");
  const cognitive = getPercentage("cognitive");
  const social = getPercentage("social");
  const environment = getPercentage("environment");
  const movement = getPercentage("movement");

  const totalMarks =
    language + cognitive + social + environment + movement;

  const overallScore = Math.round(totalMarks / 5);

  const optionStyles = {
    perfect: {
      active:
        "bg-emerald-50 border-emerald-500",
      text: "text-emerald-700",
      circle: "bg-emerald-500 text-white border-emerald-500",
    },

    ok: {
      active:
        "bg-yellow-50 border-yellow-500",
      text: "text-yellow-700",
      circle: "bg-yellow-500 text-white border-yellow-500",
    },

    need: {
      active:
        "bg-red-50 border-red-500",
      text: "text-red-700",
      circle: "bg-red-500 text-white border-red-500",
    },
  };

  const renderOptions = (skill, qIndex) => {
    const selected = answers[skill][qIndex];

    const options = [
      {
        label: "✔ The child is perfect in this",
        score: 2,
        type: "perfect",
        number: 1,
      },
      {
        label: "✔ The child is somewhat OK",
        score: 1,
        type: "ok",
        number: 2,
      },
      {
        label: "✔ Needs improvement",
        score: 0,
        type: "need",
        number: 3,
      },
    ];

    return (
      <div className="flex flex-col lg:flex-row gap-5">
        {options.map((option, i) => {
          const isActive = selected === option.score;

          return (
            <button
              key={i}
              onClick={() =>
                selectOption(skill, qIndex, option.score)
              }
              className={`flex-1 rounded-[20px] border-2 p-5 transition duration-300 hover:-translate-y-1 bg-slate-50 ${
                isActive
                  ? optionStyles[option.type].active
                  : "border-transparent"
              }`}
            >
              <div
                className={`w-11 h-11 rounded-full border-2 flex items-center justify-center mx-auto mb-4 text-lg font-bold ${
                  isActive
                    ? optionStyles[option.type].circle
                    : "bg-white border-slate-300"
                }`}
              >
                {option.number}
              </div>

              <h4
                className={`text-center text-[15px] font-semibold leading-6 ${
                  optionStyles[option.type].text
                }`}
              >
                {option.label}
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
    <div className="bg-[#f4f8ff] min-h-screen p-4 md:p-8 text-slate-800 font-[Outfit]">

      {/* PRINT BUTTON */}

      <button
        onClick={printToPDF}
        className="fixed top-5 right-5 z-50 px-7 py-3 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-700 text-white font-bold shadow-lg hover:scale-105 transition"
      >
        🖨️ Print as PDF
      </button>

      <div className="max-w-[1400px] mx-auto">

        {/* TITLE */}

        <h1 className="text-center text-4xl md:text-5xl font-extrabold text-slate-900 mb-10">
          Formative Assessment Tool
        </h1>

        {/* STUDENT INFO */}

        <div className="bg-white rounded-[30px] p-8 mb-10 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <div>
              <label className="block mb-3 font-semibold">
                Student Name
              </label>

              <input
                type="text"
                placeholder="Enter Student Name"
                value={student.name}
                onChange={(e) =>
                  setStudent({
                    ...student,
                    name: e.target.value,
                  })
                }
                className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 outline-none"
              />
            </div>

            <div>
              <label className="block mb-3 font-semibold">
                Class
              </label>

              <input
                type="text"
                placeholder="Enter Class"
                value={student.className}
                onChange={(e) =>
                  setStudent({
                    ...student,
                    className: e.target.value,
                  })
                }
                className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 outline-none"
              />
            </div>

            <div>
              <label className="block mb-3 font-semibold">
                School Name
              </label>

              <input
                type="text"
                placeholder="Enter School Name"
                value={student.school}
                onChange={(e) =>
                  setStudent({
                    ...student,
                    school: e.target.value,
                  })
                }
                className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 outline-none"
              />
            </div>

          </div>
        </div>

        {/* SKILL SECTIONS */}

        {Object.keys(skillData).map((skillKey) => (
          <div
            key={skillKey}
            className="bg-white rounded-[30px] overflow-hidden mb-9 shadow-lg"
          >

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-8 py-6 text-white">
              <h2 className="text-3xl font-bold">
                {skillData[skillKey].title}
              </h2>
            </div>

            {skillData[skillKey].questions.map(
              (question, index) => (
                <div
                  key={index}
                  className="p-8 border-b border-slate-100"
                >

                  <div className="text-[18px] font-semibold leading-8 mb-6">
                    {index + 1}. {question}
                  </div>

                  {renderOptions(skillKey, index)}
                </div>
              )
            )}

            <div className="m-6 bg-blue-50 p-5 rounded-3xl text-2xl font-bold text-blue-800">
              {skillData[skillKey].title
                .replace(/^\d+\.\s/, "")
                .replace("Skill", "Score")}{" "}
              :
              <span className="ml-2">
                {getPercentage(skillKey)}%
              </span>
            </div>

          </div>
        ))}

        {/* BUTTON */}

        <button
          className="w-full rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 text-white text-2xl font-bold py-5 mt-5"
        >
          Calculate Final Score
        </button>

        {/* RESULT */}

        <div className="mt-10 bg-white rounded-[30px] p-8 shadow-lg overflow-x-auto">

          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-blue-600 text-white p-5 text-xl">
                  SKILL
                </th>

                <th className="bg-blue-600 text-white p-5 text-xl">
                  SCORE
                </th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td className="border border-slate-200 p-5 font-semibold">
                  Language & Communication Skill
                </td>

                <td className="border border-slate-200 p-5 text-center font-semibold">
                  {language}%
                </td>
              </tr>

              <tr>
                <td className="border border-slate-200 p-5 font-semibold">
                  Cognitive Skill
                </td>

                <td className="border border-slate-200 p-5 text-center font-semibold">
                  {cognitive}%
                </td>
              </tr>

              <tr>
                <td className="border border-slate-200 p-5 font-semibold">
                  Social and Emotional Skill
                </td>

                <td className="border border-slate-200 p-5 text-center font-semibold">
                  {social}%
                </td>
              </tr>

              <tr>
                <td className="border border-slate-200 p-5 font-semibold">
                  Environmental Skill
                </td>

                <td className="border border-slate-200 p-5 text-center font-semibold">
                  {environment}%
                </td>
              </tr>

              <tr>
                <td className="border border-slate-200 p-5 font-semibold">
                  Movement and Physical Skill
                </td>

                <td className="border border-slate-200 p-5 text-center font-semibold">
                  {movement}%
                </td>
              </tr>

            </tbody>
          </table>

          {/* FINAL SCORE */}

          <div className="mt-10 bg-pink-50 border-2 border-pink-200 rounded-[35px] p-8 flex flex-wrap items-center justify-between gap-5">

            <div className="text-3xl font-bold flex flex-wrap items-center gap-4">

              <span>
                My Child's Score this month =
              </span>

              <div className="flex flex-col items-center">

                <div className="border-b-[3px] border-slate-900 pb-2 px-3 text-xl">
                  Total Calculated Score ({totalMarks})
                </div>

                <div className="mt-2 text-2xl">
                  25
                </div>

              </div>

              <span>× 100 =</span>

            </div>

            <div className="w-[140px] h-[100px] border-[3px] border-slate-900 bg-white flex items-center justify-center text-4xl font-extrabold">
              {overallScore}%
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
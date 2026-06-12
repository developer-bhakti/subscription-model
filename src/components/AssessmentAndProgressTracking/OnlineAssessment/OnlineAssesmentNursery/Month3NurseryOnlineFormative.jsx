import React, { useState } from "react";

export default function FormativeAssessmentTool() {
  const skillData = {
    language: {
      title: "1. Language & Communication Skill",
      questions: [
        "The child identifies the Letter `A` to `Z` without any difficulty",
        "The child speaks at least one word as per the sound of each letter from `A` to `Z`",
        "The child is able to identify at least 3 objects as per the sound of letters from `K` to `S`",
        "The child is able to remember and sing the Rhymes with action: English Rhyme-`Teddy Bear`",
        "The child pronounces the Hindi letters `Oo, Oou, Aam, Aah, Ka and Kha` without any difficulty- Phonemes skill for Hindi alphabets`",
        "The child speaks at least one word as per the sound of the Hindi letters `Oo, Oou, Aam, Aah, Ka and Kha`",
        "The child is able to tell his/her name, age and gende",
      ],
    },

    cognitive: {
      title: "2. Cognitive Skill",
      questions: [
        "The child identifies the bigger and smaller objects in a given set of objects and can arrange them from bigger to smaller or from smaller to bigger (with parents or teachers assistance)",
        "The child is able to classify objects or pictures into at least 2 categories",
        "The child is able to differentiate between a count of One and Two",
        "The child is able to identify and say numbers 1 to 10",
        "The child is able to point and count objects upto 5",
        "The child is able to find out an object in a picture",
        "The child is able to identify and stack 3 colours and 3 objects",
        "The child is able to recite 1 to 10 in sequence",
      ],
    },

    social: {
      title: "3. Social & Emotional Skill",
      questions: [
        "The child shows happiness in response to `praise`",
        "The child shows some independency in doing various activities (like picking of objects of choice, asking for favourite food, putting the objects in the right place etc)",
        "The child helps the adults in various activities (like cleaning of the house, putting things in the right place, picking up objects along with the adults etc.)",
        "The child is trying to eat food with the help ofspoon and fork",
        "The child identifies few emotions",
        "The child understands the difference between dirty and clean",
      ],
    },

    environment: {
      title: "4. Environmental Skill",
      questions: [
        "The child is able to distinguish pet animals from others",
        "The child is able to identify the colours of various fruits and vegetables",
      ],
    },

    movement: {
      title: "5. Movement & Physical Skill",
      questions: [
        "The child is able to draw curved stroke lines without any difficulty",
        "The child throws the ball overhead",
        "The child claps well with music for at least 30 seconds",
        "The child jumps well with putting both the legs together",
        "The child walks downstairs one step at a time",
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
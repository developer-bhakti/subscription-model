import React, { useState } from "react";

const Month2PgOnlineFormative = () => {

  const skillData = {
    language: {
      title: "1. Language & Communication Skill",
      questions: [
        "The child is able to say his/her name.",
        "The child is able to point out the things or objects when they are named.",
        "The child recites letters A,B,C.",
        "The child is able say the names of familiar objects of the letters A to F.",
        "The child is able to talk in 2-3 words.",
      ],
    },

    cognitive: {
      title: "2. Cognitive Skill",
      questions: [
        "The child is able talk about the use of common objects like mobile phone, plate, book, spoon, shoe, food item etc.",
        "The child recognizes numbers 1 and 2 by its shape.",
        "The child is able to follow simple instructions",
        "The child shows interest and explores various objects at home and outside.",
        "The child is able to recite numbers1,2,3.",
      ],
    },

    social: {
      title: "3. Social & Emotional Skill",
      questions: [
        "The child initiates his/her own play activities.",
        "The child does not show resistance to play with other children.",
        "The child understands and differentiates between the edible and non-edible items.",
        "The child signals to go to the toilet.",
      ],
    },

    environment: {
      title: "4. Environmental Skill",
      questions: [
        "The child identifies and names the fruits and vegetables- Tomato, Carrot, Mango, when shown.",
        "The child identifies different objects in the bedroom.",
        "The child identifies and names animals - Cat, Dog, Cow.",
      ],
    },

    movement: {
      title: "5. Movement & Physical Skill",
      questions: [
        "The child runs well.",
        "The child walks tiptoe.",
        "The child is able to turn pages in a book one by one.",
        "The child is able to build a tower of 3-4 blocks.",
        "The child is able to tear paper.",
        "The child attempts to eat with the help of a spoon.",
      ],
    },
  };

  const [scores, setScores] = useState({
    language: [],
    cognitive: [],
    social: [],
    environment: [],
    movement: [],
  });

  const [studentInfo, setStudentInfo] = useState({
    studentName: "",
    className: "",
    schoolName: "",
  });

  const selectOption = (skill, questionIndex, score) => {
    setScores((prev) => {
      const updated = { ...prev };

      updated[skill][questionIndex] = score;

      return updated;
    });
  };

  const calculateSkillScore = (skill) => {
    const total =
      scores[skill].reduce((a, b) => a + (b || 0), 0);

    const totalQuestions =
      skillData[skill].questions.length;

    const maxScore = totalQuestions * 2;

    return Math.round((total / maxScore) * 100) || 0;
  };

  const languageScore =
    calculateSkillScore("language");

  const cognitiveScore =
    calculateSkillScore("cognitive");

  const socialScore =
    calculateSkillScore("social");

  const environmentScore =
    calculateSkillScore("environment");

  const movementScore =
    calculateSkillScore("movement");

  const totalMarks =
    languageScore +
    cognitiveScore +
    socialScore +
    environmentScore +
    movementScore;

  const overallScore =
    Math.round(totalMarks / 5);

  const printToPDF = () => {
    window.print();
  };

  const options = [
    {
      score: 2,
      number: 1,
      text: "✔ The child is perfect in this",
      type: "perfect",
    },

    {
      score: 1,
      number: 2,
      text: "✔ The child is somewhat OK",
      type: "ok",
    },

    {
      score: 0,
      number: 3,
      text: "✔ Needs improvement",
      type: "need",
    },
  ];

  return (
    <div className="bg-[#f4f8ff] min-h-screen p-[30px] text-slate-800 font-[Outfit]">

      {/* PRINT BUTTON */}

      <button
        onClick={printToPDF}
        className="fixed top-5 right-5 z-50 px-7 py-3 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-700 text-white text-[16px] font-bold shadow-lg hover:scale-105 transition duration-300 print:hidden"
      >
        🖨️ Print as PDF
      </button>

      <div className="max-w-[1400px] mx-auto">

        {/* TITLE */}

        <h1 className="text-center text-[48px] font-extrabold mb-10 text-slate-900">
          Formative Assessment Tool
        </h1>

        {/* STUDENT INFO */}

        <div className="bg-white rounded-[30px] p-[30px] mb-10 shadow-[0_10px_30px_rgba(0,0,0,0.07)]">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <div>
              <label className="block mb-[10px] font-semibold">
                Student Name
              </label>

              <input
                type="text"
                placeholder="Enter Student Name"
                value={studentInfo.studentName}
                onChange={(e) =>
                  setStudentInfo({
                    ...studentInfo,
                    studentName: e.target.value,
                  })
                }
                className="w-full p-4 rounded-2xl border border-slate-300 bg-slate-50 outline-none"
              />
            </div>

            <div>
              <label className="block mb-[10px] font-semibold">
                Class
              </label>

              <input
                type="text"
                placeholder="Enter Class"
                value={studentInfo.className}
                onChange={(e) =>
                  setStudentInfo({
                    ...studentInfo,
                    className: e.target.value,
                  })
                }
                className="w-full p-4 rounded-2xl border border-slate-300 bg-slate-50 outline-none"
              />
            </div>

            <div>
              <label className="block mb-[10px] font-semibold">
                School Name
              </label>

              <input
                type="text"
                placeholder="Enter School Name"
                value={studentInfo.schoolName}
                onChange={(e) =>
                  setStudentInfo({
                    ...studentInfo,
                    schoolName: e.target.value,
                  })
                }
                className="w-full p-4 rounded-2xl border border-slate-300 bg-slate-50 outline-none"
              />
            </div>

          </div>

        </div>

        {/* ALL SKILLS */}

        {Object.entries(skillData).map(
          ([skillKey, skill], skillIndex) => (
            <div
              key={skillKey}
              className="bg-white rounded-[30px] overflow-hidden mb-[35px] shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
            >

              {/* HEADER */}

              <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-[30px] py-6 text-white">

                <h2 className="text-[30px] font-bold">
                  {skill.title}
                </h2>

              </div>

              {/* QUESTIONS */}

              {skill.questions.map(
                (question, questionIndex) => (
                  <div
                    key={questionIndex}
                    className="p-[30px] border-b border-slate-100"
                  >

                    <div className="text-[18px] font-semibold leading-[1.8] mb-[25px]">
                      {questionIndex + 1}. {question}
                    </div>

                    <div className="flex flex-col lg:flex-row gap-[18px]">

                      {options.map((option, optionIndex) => {

                        const isActive =
                          scores[skillKey][questionIndex] ===
                          option.score;

                        return (
                          <button
                            key={optionIndex}
                            onClick={() =>
                              selectOption(
                                skillKey,
                                questionIndex,
                                option.score
                              )
                            }
                            className={`
                              flex-1 rounded-[20px] p-[18px_12px]
                              cursor-pointer transition duration-300
                              bg-slate-50 border-2 hover:-translate-y-1
                              
                              ${
                                isActive &&
                                option.type === "perfect"
                                  ? "bg-emerald-50 border-emerald-500"
                                  : ""
                              }

                              ${
                                isActive &&
                                option.type === "ok"
                                  ? "bg-yellow-50 border-yellow-500"
                                  : ""
                              }

                              ${
                                isActive &&
                                option.type === "need"
                                  ? "bg-red-50 border-red-500"
                                  : ""
                              }

                              ${
                                !isActive
                                  ? "border-transparent"
                                  : ""
                              }
                            `}
                          >

                            <div
                              className={`
                                w-11 h-11 rounded-full border-2
                                flex items-center justify-center
                                mx-auto mb-[14px]
                                text-[18px] font-bold

                                ${
                                  isActive &&
                                  option.type === "perfect"
                                    ? "bg-emerald-500 text-white border-emerald-500"
                                    : ""
                                }

                                ${
                                  isActive &&
                                  option.type === "ok"
                                    ? "bg-yellow-500 text-white border-yellow-500"
                                    : ""
                                }

                                ${
                                  isActive &&
                                  option.type === "need"
                                    ? "bg-red-500 text-white border-red-500"
                                    : ""
                                }

                                ${
                                  !isActive
                                    ? "bg-white border-slate-300"
                                    : ""
                                }
                              `}
                            >
                              {option.number}
                            </div>

                            <h4
                              className={`
                                text-center leading-[1.6]
                                text-[15px] font-semibold

                                ${
                                  option.type === "perfect"
                                    ? "text-emerald-700"
                                    : ""
                                }

                                ${
                                  option.type === "ok"
                                    ? "text-yellow-700"
                                    : ""
                                }

                                ${
                                  option.type === "need"
                                    ? "text-red-700"
                                    : ""
                                }
                              `}
                            >
                              {option.text}
                            </h4>

                          </button>
                        );
                      })}

                    </div>

                  </div>
                )
              )}

              {/* SCORE */}

              <div className="m-[25px] bg-blue-50 p-[22px] rounded-[20px] text-[22px] font-bold text-blue-800">

                {skill.title.replace(/^\d+\.\s/, "")} Score :

                <span className="ml-2">
                  {calculateSkillScore(skillKey)}%
                </span>

              </div>

            </div>
          )
        )}

        {/* BUTTON */}

        <button className="w-full border-none p-[22px] rounded-[24px] bg-gradient-to-br from-blue-600 to-blue-700 text-white text-[22px] font-bold cursor-pointer mt-5">
          Calculate Final Score
        </button>

        {/* RESULT */}

        <div className="mt-10 bg-white rounded-[30px] p-[30px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] overflow-x-auto">

          <table className="w-full border-collapse">

            <thead>

              <tr>

                <th className="bg-blue-600 text-white p-[18px] text-[20px]">
                  SKILL
                </th>

                <th className="bg-blue-600 text-white p-[18px] text-[20px]">
                  SCORE
                </th>

              </tr>

            </thead>

            <tbody>

              <tr>
                <td className="p-[18px] border border-slate-300 text-[17px] font-semibold">
                  Language & Communication Skill
                </td>

                <td className="p-[18px] border border-slate-300 text-[17px] font-semibold text-center">
                  {languageScore}%
                </td>
              </tr>

              <tr>
                <td className="p-[18px] border border-slate-300 text-[17px] font-semibold">
                  Cognitive Skill
                </td>

                <td className="p-[18px] border border-slate-300 text-[17px] font-semibold text-center">
                  {cognitiveScore}%
                </td>
              </tr>

              <tr>
                <td className="p-[18px] border border-slate-300 text-[17px] font-semibold">
                  Social and Emotional Skill
                </td>

                <td className="p-[18px] border border-slate-300 text-[17px] font-semibold text-center">
                  {socialScore}%
                </td>
              </tr>

              <tr>
                <td className="p-[18px] border border-slate-300 text-[17px] font-semibold">
                  Environmental Skill
                </td>

                <td className="p-[18px] border border-slate-300 text-[17px] font-semibold text-center">
                  {environmentScore}%
                </td>
              </tr>

              <tr>
                <td className="p-[18px] border border-slate-300 text-[17px] font-semibold">
                  Movement and Physical Skill
                </td>

                <td className="p-[18px] border border-slate-300 text-[17px] font-semibold text-center">
                  {movementScore}%
                </td>
              </tr>

            </tbody>

          </table>

          {/* FINAL SCORE */}

          <div className="mt-10 bg-pink-50 border-2 border-pink-200 rounded-[35px] p-[35px] flex justify-between items-center gap-5 flex-wrap">

            <div className="text-[30px] font-bold flex items-center gap-[15px] flex-wrap">

              <span>
                My Child's Score this month =
              </span>

              <div className="flex flex-col items-center">

                <div className="border-b-[3px] border-slate-900 px-[10px] pb-[6px] text-[20px]">
                  Total Calculated Score ({totalMarks})
                </div>

                <div className="mt-[6px] text-[22px]">
                  25
                </div>

              </div>

              × 100 =

            </div>

            <div className="w-[140px] h-[100px] border-[3px] border-slate-900 bg-white flex items-center justify-center text-[34px] font-extrabold">

              {overallScore}%

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Month2PgOnlineFormative;
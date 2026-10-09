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
    <div className="rounded-[28px] bg-[#f1faee] min-h-screen p-[30px] text-kid-ink font-playful">

      {/* PRINT BUTTON */}

      <button
        onClick={printToPDF}
        className="kid-btn fixed right-5 top-5 z-50 px-7 py-3 text-[16px] font-bold print:hidden"
      >
        🖨️ Print as PDF
      </button>

      <div className="max-w-[1400px] mx-auto">

        {/* TITLE */}

        <h1 className="mb-8 rounded-[28px] bg-gradient-to-r from-[#d9f3df] via-[#e4f5e6] to-[#eef9d2] px-6 py-6 text-center text-3xl font-semibold text-kid-ink md:text-4xl">
          Formative Assessment Tool
        </h1>

        {/* STUDENT INFO */}

        <div className="kid-card tone-white p-[30px] mb-10">

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
                className="kid-input"
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
                className="kid-input"
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
                className="kid-input"
              />
            </div>

          </div>

        </div>

        {/* ALL SKILLS */}

        {Object.entries(skillData).map(
          ([skillKey, skill], skillIndex) => (
            <div
              key={skillKey}
              className="kid-card tone-white overflow-hidden mb-[35px]"
            >

              {/* HEADER */}

              <div className="bg-gradient-to-r from-[#1da655] to-[#16a34a] px-[30px] py-6 text-white">

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

              <div className="m-[25px] rounded-[20px] bg-tone-mint p-[22px] text-[22px] font-semibold text-kid-deep">

                {skill.title.replace(/^\d+\.\s/, "")} Score :

                <span className="ml-2">
                  {calculateSkillScore(skillKey)}%
                </span>

              </div>

            </div>
          )
        )}

        {/* BUTTON */}

        <button className="kid-btn mt-5 w-full p-[22px] text-[22px]">
          Calculate Final Score
        </button>

        {/* RESULT */}

        <div className="kid-card tone-white mt-10 overflow-x-auto p-[30px]">

          <table className="w-full border-collapse">

            <thead>

              <tr>

                <th className="bg-kid-deep text-white p-[18px] text-[20px]">
                  SKILL
                </th>

                <th className="bg-kid-deep text-white p-[18px] text-[20px]">
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

            <div className="w-[140px] h-[100px] border-[3px] border-slate-900 bg-white flex items-center justify-center text-[34px] font-bold">

              {overallScore}%

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Month2PgOnlineFormative;
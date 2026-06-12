import React, { useState } from "react";

const ACTCurriculum = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [pdfModal, setPdfModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfTitle, setPdfTitle] = useState("");

  const toggleDropdown = (id) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const openPDF = (pdf, title) => {
    setPdfUrl(pdf);
    setPdfTitle(title);
    setPdfModal(true);
  };

  const closePDF = () => {
    setPdfModal(false);
    setPdfUrl("");
  };

  const classes = [
    {
      name: "Nursery",
      image:
        "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop",
      description:
        "Fun phonics, tracing worksheets, playful activities and preschool curriculum.",
    },
    {
      name: "LKG",
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
      description:
        "Interactive classroom learning, alphabet practice and creative activities.",
    },
    {
      name: "UKG",
      image:
        "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop",
      description:
        "Reading, writing, phonics and advanced preschool learning curriculum.",
    },
  ];

  const months = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
      title: "Month 1 Curriculum",
      description:
        "Weekly curriculum and skill-based learning resources for Month 1.",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop",
      title: "Month 2 Curriculum",
      description:
        "Creative worksheets, tracing practice and classroom learning.",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop",
      title: "Month 3 Curriculum",
      description:
        "Reading, writing and advanced preschool learning curriculum.",
    },
  ];

  const weeklyLinks = [
    {
      title: "Week 1 Curriculum",
      pdf: "/pdfs/week1.pdf",
    },
    {
      title: "Week 2 Curriculum",
      pdf: "/pdfs/week2.pdf",
    },
    {
      title: "Week 3 Curriculum",
      pdf: "/pdfs/week3.pdf",
    },
    {
      title: "Week 4 Curriculum",
      pdf: "/pdfs/week4.pdf",
    },
  ];

  const skills = [
    {
      title: "Language & Communication Skill",
      icon: "🧠",
      pdf: "/pdfs/language.pdf",
    },
    {
      title: "Cognitive Skill",
      icon: "🎨",
      pdf: "/pdfs/cognitive.pdf",
    },
    {
      title: "Social & Emotional Skill",
      icon: "🌍",
      pdf: "/pdfs/social.pdf",
    },
    {
      title: "Environmental Skill",
      icon: "🌱",
      pdf: "/pdfs/environment.pdf",
    },
    {
      title: "Movement & Physical Skill",
      icon: "🏃",
      pdf: "/pdfs/movement.pdf",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f7ff]">
      <div className="max-w-[1400px] mx-auto px-5 py-12">

        {/* TITLE */}

        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-3">
            ACT Curriculum
          </h1>

          <p className="text-gray-500 text-lg">
            Preschool curriculum with weekly and skill based PDF learning
          </p>
        </div>

        {/* CLASS GRID */}

        {!selectedClass && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {classes.map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-[260px] object-cover"
                />

                <div className="p-7">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    {item.name}
                  </h2>

                  <p className="text-gray-500 leading-8 mb-6">
                    {item.description}
                  </p>

                  <button
                    onClick={() => {
                      setSelectedClass(item.name);
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    className="w-full h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold"
                  >
                    Explore Curriculum
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MONTHS */}

        {selectedClass && (
          <>
            <div className="flex flex-wrap justify-between items-center gap-4 mb-10">
              <button
                onClick={() => setSelectedClass(null)}
                className="w-[180px] h-14 rounded-2xl bg-gray-900 text-white font-semibold"
              >
                ← Back To Classes
              </button>

              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                {selectedClass} Monthly Curriculum
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">

              {months.map((month) => (
                <div
                  key={month.id}
                  className="bg-white rounded-[30px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
                >
                  <img
                    src={month.image}
                    alt=""
                    className="w-full h-[240px] object-cover"
                  />

                  <div className="p-7">

                    <span className="inline-block px-5 py-2 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold mb-5">
                      MONTH {month.id}
                    </span>

                    <h3 className="text-3xl font-bold mb-3">
                      {month.title}
                    </h3>

                    <p className="text-gray-500 leading-8 mb-6">
                      {month.description}
                    </p>

                    {/* WEEKLY */}

                    <button
                      onClick={() =>
                        toggleDropdown(`weekly${month.id}`)
                      }
                      className="w-full h-14 rounded-2xl text-white font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 mb-4"
                    >
                      📚 Weekly Curriculum
                    </button>

                    {openDropdowns[`weekly${month.id}`] && (
                      <div className="flex flex-col gap-3 mb-4">

                        {weeklyLinks.map((week, i) => (
                          <button
                            key={i}
                            onClick={() =>
                              openPDF(week.pdf, week.title)
                            }
                            className="flex justify-between items-center p-4 rounded-2xl border bg-gray-50 hover:bg-indigo-600 hover:text-white transition"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-xl">
                                📄
                              </div>

                              <div className="text-left">
                                <h4 className="font-semibold">
                                  {week.title}
                                </h4>

                                <p className="text-sm">
                                  Open PDF File
                                </p>
                              </div>
                            </div>

                            ➜
                          </button>
                        ))}
                      </div>
                    )}

                    {/* SKILLS */}

                    <button
                      onClick={() =>
                        toggleDropdown(`skills${month.id}`)
                      }
                      className="w-full h-14 rounded-2xl text-white font-bold bg-gradient-to-r from-emerald-600 to-emerald-500"
                    >
                      🎯 Skill Based Curriculum
                    </button>

                    {openDropdowns[`skills${month.id}`] && (
                      <div className="flex flex-col gap-3 mt-4">

                        {skills.map((skill, i) => (
                          <button
                            key={i}
                            onClick={() =>
                              openPDF(skill.pdf, skill.title)
                            }
                            className="flex justify-between items-center p-4 rounded-2xl border bg-gray-50 hover:bg-indigo-600 hover:text-white transition"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-xl">
                                {skill.icon}
                              </div>

                              <div className="text-left">
                                <h4 className="font-semibold">
                                  {skill.title}
                                </h4>

                                <p className="text-sm">
                                  Open PDF File
                                </p>
                              </div>
                            </div>

                            ➜
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* PDF MODAL */}

      {pdfModal && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-5">
          <div className="w-full max-w-7xl h-[90vh] bg-white rounded-3xl overflow-hidden">

            <div className="h-20 bg-gray-900 flex justify-between items-center px-6">
              <h3 className="text-white font-semibold">
                {pdfTitle}
              </h3>

              <button
                onClick={closePDF}
                className="w-11 h-11 rounded-xl bg-red-500 text-white"
              >
                ✕
              </button>
            </div>

            <iframe
              src={pdfUrl}
              title={pdfTitle}
              className="w-full h-[calc(90vh-80px)]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ACTCurriculum;
import React, { useState } from "react";

const ACTCurriculum = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (id) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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

  // Every CLASS (Nursery / LKG / UKG) has its own list of months, and every month has
  // its own weeks + skills, each pointing at its own unique PDF.
  const curriculumData = {
    Nursery: [
      {
        id: 1,
        image:
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
        title: "Month 1 Curriculum",
        description:
          "Weekly curriculum and skill-based learning resources for Month 1.",
        weeks: [
          { title: "Week 1", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nursery-M1-W1.pdf?v=1781682062" },
          { title: "Week 2", pdf: "/pdfs/month-1/week-2.pdf" },
          { title: "Week 3", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nursery-M1-W3.pdf?v=1781682060" },
          { title: "Week 4", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nursery-M1-W4.pdf?v=1781682062" },
        ],
        skills: [
          { title: "Language & Communication Skill", icon: "🧠", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nursery-M-1-language.pdf?v=1781689757" },
          { title: "Cognitive Skill", icon: "🎨", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nursery-M-1-cognative.pdf?v=1781689757" },
          { title: "Social & Emotional Skill", icon: "🌍", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nursery-M-1-social.pdf?v=1781689757" },
          { title: "Environmental Skill", icon: "🌱", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nursery-M-1-EVS.pdf?v=1781689756" },
          { title: "Movement & Physical Skill", icon: "🏃", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nursery-M-1-physical.pdf?v=1781689756" },
        ],
      },
      {
        id: 2,
        image:
          "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop",
        title: "Month 2 Curriculum",
        description:
          "Creative worksheets, tracing practice and classroom learning.",
        weeks: [
          { title: "Week 1", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nursery-M2-W1.pdf?v=1781689095" },
          { title: "Week 2", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nursery-M2-W2.pdf?v=1781689095" },
          { title: "Week 3", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nursery-M2-W3.pdf?v=1781689095" },
          { title: "Week 4", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nursery-M2-W4.pdf?v=1781689095" },
        ],
        skills: [
          { title: "Language & Communication Skill", icon: "🧠", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nursery-M-2-language_1.pdf?v=1781690274" },
          { title: "Cognitive Skill", icon: "🎨", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nursery-M-2-cognative.pdf?v=1781689759" },
          { title: "Social & Emotional Skill", icon: "🌍", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nursery-M-2-social.pdf?v=1781690139" },
          { title: "Environmental Skill", icon: "🌱", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nursery-M-2-EVS.pdf?v=1781689759" },
          { title: "Movement & Physical Skill", icon: "🏃", pdf: "/pdfs/month-2/movement.pdf" },
        ],
      },
      {
        id: 3,
        image:
          "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop",
        title: "Month 3 Curriculum",
        description:
          "Reading, writing and advanced preschool learning curriculum.",
        weeks: [
          { title: "Week 1", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nursery-M3-W1.pdf?v=1781682062" },
          { title: "Week 2", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nursery-M3-W2.pdf?v=1781682060" },
          { title: "Week 3", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nursery-M3-W3.pdf?v=1781682060" },
          { title: "Week 4", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nursery-M3-W4.pdf?v=1781682060" },
        ],
        skills: [
          { title: "Language & Communication Skill", icon: "🧠", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nursery-M-3-language.pdf?v=1781767121" },
          { title: "Cognitive Skill", icon: "🎨", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nursery-M-3-cognative.pdf?v=1781767302" },
          { title: "Social & Emotional Skill", icon: "🌍", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nusery-M3-Social.pdf?v=1781767489" },
          { title: "Environmental Skill", icon: "🌱", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nursery-M3-EVS-compressed.pdf?v=1781767686" },
          { title: "Movement & Physical Skill", icon: "🏃", pdf: "/pdfs/month-3/movement.pdf" },
        ],
      },
    ],

    LKG: [
      {
        id: 1,
        image:
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
        title: "Month 1 Curriculum",
        description:
          "Alphabet recognition, phonics practice and interactive worksheets for LKG.",
        weeks: [
          { title: "Week 1", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M1-W1.pdf?v=1781681815" },
          { title: "Week 2", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M1-W2.pdf?v=1781687399" },
          { title: "Week 3", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M1-W3.pdf?v=1781687398" },
          { title: "Week 4", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M1-W4.pdf?v=1781687399" },
        ],
        skills: [
          { title: "Language & Communication Skill", icon: "🧠", pdf: "/pdfs/lkg/month-1/language.pdf" },
          { title: "Cognitive Skill", icon: "🎨", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M1-cognative-compressed.pdf?v=1781770939" },
          { title: "Social & Emotional Skill", icon: "🌍", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M1-social_1.pdf?v=1781772167" },
          { title: "Environmental Skill", icon: "🌱", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M1-EVS.pdf?v=1781771925" },
          { title: "Movement & Physical Skill", icon: "🏃", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M1-physical.pdf?v=1781772336" },
        ],
      },
      {
        id: 2,
        image:
          "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop",
        title: "Month 2 Curriculum",
        description:
          "Word building, creative activities and skill-based learning for LKG.",
        weeks: [
          { title: "Week 1", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M2-W1.pdf?v=1781687880" },
          { title: "Week 2", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M2-W2.pdf?v=1781688422" },
          { title: "Week 3", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M2-W3.pdf?v=1781688422" },
          { title: "Week 4", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M2-W4.pdf?v=1781688422" },
        ],
        skills: [
          { title: "Language & Communication Skill", icon: "🧠", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M2-Language.pdf?v=1781776804" },
          { title: "Cognitive Skill", icon: "🎨", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M2-cognative.pdf?v=1781776801" },
          { title: "Social & Emotional Skill", icon: "🌍", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M2-social.pdf?v=1781776797" },
          { title: "Environmental Skill", icon: "🌱", pdf: "/pdfs/lkg/month-2/environment.pdf" },
          { title: "Movement & Physical Skill", icon: "🏃", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M2-physical.pdf?v=1781776800" },
        ],
      },
      {
        id: 3,
        image:
          "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop",
        title: "Month 3 Curriculum",
        description:
          "Reading practice, writing skills and advanced LKG curriculum.",
        weeks: [
          { title: "Week 1", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M3-W1.pdf?v=1781681816" },
          { title: "Week 2", pdf: "/pdfs/lkg/month-3/week-2.pdf" },
          { title: "Week 3", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M3-W3.pdf?v=1781681815" },
          { title: "Week 4", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M3-W4.pdf?v=1781681815" },
        ],
        skills: [
          { title: "Language & Communication Skill", icon: "🧠", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M3-language_1.pdf?v=1781778080" },
          { title: "Cognitive Skill", icon: "🎨", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M3-cognative.pdf?v=1781777914" },
          { title: "Social & Emotional Skill", icon: "🌍", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M3-social.pdf?v=1781777914" },
          { title: "Environmental Skill", icon: "🌱", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M3-EVS.pdf?v=1781777915" },
          { title: "Movement & Physical Skill", icon: "🏃", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG-M3-physical.pdf?v=1781777912" },
        ],
      },
    ],

    UKG: [
      {
        id: 1,
        image:
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
        title: "Month 1 Curriculum",
        description:
          "Reading fluency, writing practice and structured worksheets for UKG.",
        weeks: [
          { title: "Week 1", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M1-W1.pdf?v=1781681779" },
          { title: "Week 2", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M1-W2.pdf?v=1781681779" },
          { title: "Week 3", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M1-W3.pdf?v=1781681778" },
          { title: "Week 4", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M1-W4.pdf?v=1781681778" },
        ],
        skills: [
          { title: "Language & Communication Skill", icon: "🧠", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M1-language_1.pdf?v=1781779903" },
          { title: "Cognitive Skill", icon: "🎨", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M1-cognative_1.pdf?v=1781779661" },
          { title: "Social & Emotional Skill", icon: "🌍", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M1-social.pdf?v=1781779483" },
          { title: "Environmental Skill", icon: "🌱", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M1-EVS.pdf?v=1781779484" },
          { title: "Movement & Physical Skill", icon: "🏃", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M1-physical.pdf?v=1781779479" },
        ],
      },
      {
        id: 2,
        image:
          "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop",
        title: "Month 2 Curriculum",
        description:
          "Grammar basics, creative writing and skill-based learning for UKG.",
        weeks: [
          { title: "Week 1", pdf: "/pdfs/ukg/month-2/week-1.pdf" },
          { title: "Week 2", pdf: "/pdfs/ukg/month-2/week-2.pdf" },
          { title: "Week 3", pdf: "/pdfs/ukg/month-2/week-3.pdf" },
          { title: "Week 4", pdf: "/pdfs/ukg/month-2/week-4.pdf" },
        ],
        skills: [
          { title: "Language & Communication Skill", icon: "🧠", pdf: "/pdfs/ukg/month-2/language.pdf" },
          { title: "Cognitive Skill", icon: "🎨", pdf: "/pdfs/ukg/month-2/cognitive.pdf" },
          { title: "Social & Emotional Skill", icon: "🌍", pdf: "/pdfs/ukg/month-2/social.pdf" },
          { title: "Environmental Skill", icon: "🌱", pdf: "/pdfs/ukg/month-2/environment.pdf" },
          { title: "Movement & Physical Skill", icon: "🏃", pdf: "/pdfs/ukg/month-2/movement.pdf" },
        ],
      },
      {
        id: 3,
        image:
          "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop",
        title: "Month 3 Curriculum",
        description:
          "Advanced reading, writing and exam-ready curriculum for UKG.",
        weeks: [
          { title: "Week 1", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG_M3-W1.pdf?v=1781681779" },
          { title: "Week 2", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG_M3-W2.pdf?v=1781681779" },
          { title: "Week 3", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG_M3-W3.pdf?v=1781681779" },
          { title: "Week 4", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG_M3-W4.pdf?v=1781681779" },
        ],
        skills: [
          { title: "Language & Communication Skill", icon: "🧠", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M3-language.pdf?v=1781779950" },
          { title: "Cognitive Skill", icon: "🎨", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M3-cognative.pdf?v=1781780303" },
          { title: "Social & Emotional Skill", icon: "🌍", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M3-social.pdf?v=1781780303" },
          { title: "Environmental Skill", icon: "🌱", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M3-EVS.pdf?v=1781780304" },
          { title: "Movement & Physical Skill", icon: "🏃", pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M3-physica.pdf?v=1781780302" },
        ],
      },
    ],
  };

  // Months for whichever class is currently selected.
  const months = selectedClass ? curriculumData[selectedClass] : [];

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

                    {/* WEEKLY — pulled from THIS class + THIS month's own weeks array */}

                    <button
                      onClick={() =>
                        toggleDropdown(`weekly-${selectedClass}-${month.id}`)
                      }
                      className="w-full h-14 rounded-2xl text-white font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 mb-4"
                    >
                      📚 Weekly Curriculum
                    </button>

                    {openDropdowns[`weekly-${selectedClass}-${month.id}`] && (
                      <div className="flex flex-col gap-3 mb-4">

                        {month.weeks.map((week, i) => (
                          <a
                            key={i}
                            href={week.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
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
                          </a>
                        ))}
                      </div>
                    )}

                    {/* SKILLS — pulled from THIS class + THIS month's own skills array */}

                    <button
                      onClick={() =>
                        toggleDropdown(`skills-${selectedClass}-${month.id}`)
                      }
                      className="w-full h-14 rounded-2xl text-white font-bold bg-gradient-to-r from-emerald-600 to-emerald-500"
                    >
                      🎯 Skill Based Curriculum
                    </button>

                    {openDropdowns[`skills-${selectedClass}-${month.id}`] && (
                      <div className="flex flex-col gap-3 mt-4">

                        {month.skills.map((skill, i) => (
                          <a
                            key={i}
                            href={skill.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
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
                          </a>
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
    </div>
  );
};

export default ACTCurriculum;
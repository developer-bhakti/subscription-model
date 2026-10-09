import React, { useState } from "react";
import { PageHero, SectionTitle, BackButton } from "../KidsUI";
import { Star } from "../KidsArt";

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
      emoji: "👶",
      tint: "bg-rose-50",
      description:
        "Fun phonics, tracing worksheets, playful activities and preschool curriculum.",
    },
    {
      name: "LKG",
      emoji: "🧩",
      tint: "bg-amber-50",
      description:
        "Interactive classroom learning, alphabet practice and creative activities.",
    },
    {
      name: "UKG",
      emoji: "🎓",
      tint: "bg-indigo-50",
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
    <div>
      <div className="max-w-[1400px] mx-auto">

        {/* TITLE */}

        <PageHero
          emoji="📘"
          title="ACT Curriculum"
          subtitle="Preschool curriculum with weekly and skill based PDF learning"
        />

        {/* CLASS GRID */}

        {!selectedClass && (
          <div className="tone-cycle grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {classes.map((item) => (
              <div
                key={item.name}
                className="kid-card kid-card-hover overflow-hidden"
              >
                <Star className="absolute right-5 top-5 h-7 w-7" />

                <div className="p-6 sm:p-7">
                  <div className="kid-chip h-20 w-20 text-4xl mb-5">
                    {item.emoji}
                  </div>

                  <h2 className="text-3xl font-semibold text-kid-ink mb-3">
                    {item.name}
                  </h2>

                  <p className="text-kid-soft font-medium leading-7 mb-6">
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
                    className="kid-btn w-full py-3.5"
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
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
              <BackButton onClick={() => setSelectedClass(null)}>
                ← Back To Classes
              </BackButton>

              <SectionTitle as="h2" className="text-2xl md:text-3xl">
                {selectedClass} Monthly Curriculum
              </SectionTitle>
            </div>

            <div className="tone-cycle grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 items-start">

              {months.map((month) => (
                <div
                  key={month.id}
                  className="kid-card overflow-hidden"
                >
                  <Star className="absolute right-5 top-5 h-7 w-7" />

                  <div className="p-6 sm:p-7">

                    <div className="kid-chip h-16 w-16 text-3xl mb-4">
                      🗓️
                    </div>

                    <span className="kid-pill mb-4">
                      MONTH {month.id}
                    </span>

                    <h3 className="text-2xl font-semibold text-kid-ink mb-2">
                      {month.title}
                    </h3>

                    <p className="text-kid-soft font-medium leading-7 mb-6">
                      {month.description}
                    </p>

                    {/* WEEKLY — pulled from THIS class + THIS month's own weeks array */}

                    <button
                      onClick={() =>
                        toggleDropdown(`weekly-${selectedClass}-${month.id}`)
                      }
                      className="kid-btn w-full py-3.5 mb-4"
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
                            className="kid-row justify-between"
                          >
                            <div className="flex items-center gap-4">
                              <div className="kid-chip h-12 w-12 text-xl">
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
                      className="kid-btn kid-btn-teal w-full py-3.5"
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
                            className="kid-row justify-between"
                          >
                            <div className="flex items-center gap-4">
                              <div className="kid-chip h-12 w-12 text-xl">
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
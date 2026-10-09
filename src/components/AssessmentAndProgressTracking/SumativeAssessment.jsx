import React, { useState } from "react";
import { BookOpen, FileText } from "lucide-react";
import { PageHero, SectionTitle } from "../KidsUI";

const levels = [
  {
    id: "pg",
    title: "PG",
    image:
      "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/ChatGPT_Image_Jun_15_2026_01_26_24_PM.png?v=1781510355",
  },
  {
    id: "nursery",
    title: "Nursery",
    image:
      "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/ChatGPT_Image_Jun_15_2026_01_29_24_PM.png?v=1781510384",
  },
  {
    id: "lkg",
    title: "LKG",
    image:
      "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/ChatGPT_Image_Jun_15_2026_01_31_05_PM.png?v=1781510504",
  },
  {
    id: "ukg",
    title: "UKG",
    image:
      "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/ChatGPT_Image_Jun_15_2026_01_32_16_PM.png?v=1781510552",
  },
];

const assessmentData = {
  pg: [
    {
      title: "Mid Term Exam Paper",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/summative-midterm.jpg?v=1779703403",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Mid_term_PG.pdf?v=1779787401",
    },
    {
      title: "End Term Exam Paper",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/summatie-pg-endterm.jpg?v=1779702344",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/End_term_PG.pdf?v=1779787401",
    },
  ],

  nursery: [
    {
      title: "Mid Term Exam Paper",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/summative-midterm.jpg?v=1779703403",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Mid_term_Nursery.pdf?v=1779787503",
    },
    {
      title: "End Term Exam Paper",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/summatie-pg-endterm.jpg?v=1779702344",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/End_term_Nursery.pdf?v=1779787504",
    },
  ],

  lkg: [
    {
      title: "Mid Term Exam Paper",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/summative-midterm.jpg?v=1779703403",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Mid_term_LKG.pdf?v=1779787568",
    },
    {
      title: "End Term Exam Paper",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/summatie-pg-endterm.jpg?v=1779702344",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/End_term_lkg.pdf?v=1779787569",
    },
  ],

  ukg: [
    {
      title: "Mid Term Exam Paper",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/summative-midterm.jpg?v=1779703403",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Mid_term_UKG.pdf?v=1779787618",
    },
    {
      title: "End Term Exam Paper",
      image:
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/summatie-pg-endterm.jpg?v=1779702344",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/End_term_UKG.pdf?v=1779787618",
    },
  ],
};

export default function SumativeAssessment() {
  const [activeSection, setActiveSection] = useState("");

  return (
    <section>
      <div className="max-w-7xl mx-auto">

        {/* TITLE */}
        <PageHero
          emoji={<BookOpen size={28} />}
          title="Summative Assessment"
          subtitle="Mid term and end term exam papers for every class."
        />

        {/* MAIN CARDS */}
        <div className="tone-cycle grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

          {levels.map((level) => (
            <div
              key={level.id}
              className="kid-card kid-card-hover flex flex-col overflow-hidden"
            >
              <div className="m-3 mb-0 overflow-hidden rounded-[18px] bg-white">
                <img
                  src={level.image}
                  alt={level.title}
                  className="w-full h-56 object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col items-center p-6 text-center">
                <h3 className="text-2xl font-semibold text-kid-ink mb-5">
                  {level.title}
                </h3>

                <button
                  onClick={() => setActiveSection(level.id)}
                  className="kid-btn mt-auto"
                >
                  View Assessments
                </button>
              </div>
            </div>
          ))}

        </div>

        {/* ASSESSMENT SECTION */}
        {activeSection && (
          <div className="animate-fadeIn">

            <SectionTitle className="mb-6">
              {activeSection.toUpperCase()} Assessment
            </SectionTitle>

            <div className="tone-cycle grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">

              {assessmentData[activeSection].map((item, index) => (
                <div
                  key={index}
                  className="kid-card kid-card-hover flex flex-col overflow-hidden w-full max-w-sm mx-auto"
                >
                  <div className="m-3 mb-0 overflow-hidden rounded-[18px] bg-white">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-56 object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col items-center p-6 text-center">
                    <h3 className="text-xl font-semibold text-kid-ink mb-5 flex-1">
                      {item.title}
                    </h3>

                    <a
                      href={item.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="kid-btn"
                    >
                      <FileText size={18} />
                      View & Download
                    </a>
                  </div>
                </div>
              ))}

            </div>

          </div>
        )}
      </div>
    </section>
  );
}

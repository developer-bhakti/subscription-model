import React, { useState } from "react";
import {
  Backpack,
  Baby,
  Blocks,
  BookOpen,
  ClipboardCheck,
  ClipboardList,
  FileText,
  GraduationCap,
} from "lucide-react";
import { PageHero, SectionTitle } from "../KidsUI";

const levels = [
  {
    id: "pg",
    title: "PG",
    icon: Baby,
  },
  {
    id: "nursery",
    title: "Nursery",
    icon: Blocks,
  },
  {
    id: "lkg",
    title: "LKG",
    icon: Backpack,
  },
  {
    id: "ukg",
    title: "UKG",
    icon: GraduationCap,
  },
];

const assessmentData = {
  pg: [
    {
      title: "Mid Term Exam Paper",
      icon: ClipboardList,
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Mid_term_PG.pdf?v=1779787401",
    },
    {
      title: "End Term Exam Paper",
      icon: ClipboardCheck,
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/End_term_PG.pdf?v=1779787401",
    },
  ],

  nursery: [
    {
      title: "Mid Term Exam Paper",
      icon: ClipboardList,
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Mid_term_Nursery.pdf?v=1779787503",
    },
    {
      title: "End Term Exam Paper",
      icon: ClipboardCheck,
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/End_term_Nursery.pdf?v=1779787504",
    },
  ],

  lkg: [
    {
      title: "Mid Term Exam Paper",
      icon: ClipboardList,
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Mid_term_LKG.pdf?v=1779787568",
    },
    {
      title: "End Term Exam Paper",
      icon: ClipboardCheck,
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/End_term_lkg.pdf?v=1779787569",
    },
  ],

  ukg: [
    {
      title: "Mid Term Exam Paper",
      icon: ClipboardList,
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Mid_term_UKG.pdf?v=1779787618",
    },
    {
      title: "End Term Exam Paper",
      icon: ClipboardCheck,
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
              <div className="flex flex-1 flex-col items-center p-6 text-center">
                <div className="kid-chip mb-5 h-24 w-24 text-kid-deep">
                  <level.icon size={44} strokeWidth={1.75} aria-hidden="true" />
                </div>

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
                  <div className="flex flex-1 flex-col items-center p-6 text-center">
                    <div className="kid-chip mb-5 h-24 w-24 text-kid-deep">
                      <item.icon size={44} strokeWidth={1.75} aria-hidden="true" />
                    </div>

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

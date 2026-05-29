import React, { useState } from "react";
import { BookOpen, FileText } from "lucide-react";

const levels = [
  {
    id: "pg",
    title: "PG",
    image:
      "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/sumetive_main.jpg?v=1779698224",
  },
  {
    id: "nursery",
    title: "Nursery",
    image:
      "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/summetive-nursery.jpg?v=1779702219",
  },
  {
    id: "lkg",
    title: "LKG",
    image:
      "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Summative-lkg.jpg?v=1779702045",
  },
  {
    id: "ukg",
    title: "UKG",
    image:
      "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/summative-ukg.jpg?v=1779702159",
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
    <section className="bg-gradient-to-b from-[#f7f8ff] to-[#eef1ff] py-20 px-5">
      <div className="max-w-7xl mx-auto">

        {/* TITLE */}
        <div className="text-center mb-16">
          <h2 className="flex items-center justify-center gap-3 text-4xl md:text-5xl font-extrabold text-gray-900">
            <BookOpen className="text-[#5d5be3]" size={42} />
            Summative Assessment
          </h2>
        </div>

        {/* MAIN CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">

          {levels.map((level) => (
            <div
              key={level.id}
              className="bg-white rounded-3xl overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <img
                src={level.image}
                alt={level.title}
                className="w-full h-64 object-cover"
              />

              <div className="p-6 text-center">
                <h3 className="text-3xl font-bold text-gray-800 mb-5">
                  {level.title}
                </h3>

                <button
                  onClick={() => setActiveSection(level.id)}
                  className="bg-[#5d5be3] hover:bg-[#4745c7] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
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

            <h2 className="text-center text-3xl md:text-5xl font-extrabold text-gray-900 mb-12">
              {activeSection.toUpperCase()} Assessment
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">

              {assessmentData[activeSection].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-300 max-w-sm mx-auto"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover"
                  />

                  <div className="p-6 text-center">
                    <h3 className="text-3xl font-bold text-gray-800 mb-6">
                      {item.title}
                    </h3>

                    <a
                      href={item.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#5d5be3] hover:bg-[#4745c7] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
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
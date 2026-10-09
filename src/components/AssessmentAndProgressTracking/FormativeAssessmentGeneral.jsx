import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHero, SectionTitle } from "../KidsUI";

export default function FormativeAssessmentGeneral() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);

  const classes = [
    {
      id: "nursery",
      title: "Nursery",
      emoji: "👶",
      tint: "bg-rose-50",
      assessments: [
        {
          title: "Nursery 1",
          emoji: "📝",
          pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/FA-1_Papers-Nursery.pdf?v=1781243406",
        },
        {
          title: "Nursery 2",
          emoji: "📋",
          pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/FA-2_Papers-Nursery.pdf?v=1781243406",
        },
      ],
    },
    {
      id: "lkg",
      title: "LKG",
      emoji: "🧩",
      tint: "bg-amber-50",
      assessments: [
        {
          title: "LKG 1",
          emoji: "📝",
          pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/FA-1_Papers-LKG.pdf?v=1781243406",
        },
        {
          title: "LKG 2",
          emoji: "📋",
          pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/FA-2_Papers-LKG.pdf?v=1781243406",
        },
      ],
    },
    {
      id: "ukg",
      title: "UKG",
      emoji: "🎓",
      tint: "bg-indigo-50",
      assessments: [
        {
          title: "UKG 1",
          emoji: "📝",
          pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/FA-1_Papers-UKG.pdf?v=1781243406",
        },
        {
          title: "UKG 2",
          emoji: "📋",
          pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/FA-2_Papers-UKG.pdf?v=1781243406",
        },
      ],
    },
  ];

  const toggleSection = (id) => {
    setActiveSection(activeSection === id ? null : id);
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <PageHero
          emoji="📆"
          title="Formative Assessment (General Syllabus)"
          subtitle="Pick a class to open its first and second formative papers."
        />

        <div className="tone-cycle grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {classes.map((item) => (
            <div
              key={item.id}
              className="kid-card kid-card-hover flex flex-col overflow-hidden"
            >
              <div className="flex flex-1 flex-col items-center p-6 text-center">
                <div className="kid-chip mb-5 h-20 w-20 text-4xl">
                  {item.emoji}
                </div>

                <h2 className="text-3xl font-semibold text-kid-ink mb-5">{item.title}</h2>

                <button
                  onClick={() => toggleSection(item.id)}
                  className="kid-btn mt-auto px-8"
                >
                  View Assessments
                </button>
              </div>
            </div>
          ))}
        </div>

        {classes.map(
          (item) =>
            activeSection === item.id && (
              <div key={item.id} className="mt-12">
                <SectionTitle className="mb-6">
                  {item.title} Assessment
                </SectionTitle>

                <div className="tone-cycle grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {item.assessments.map((paper, index) => (
                    <div
                      key={index}
                      className="kid-card kid-card-hover overflow-hidden"
                    >
                      <div className="p-6 text-center">
                        <div className="kid-chip mx-auto mb-5 h-24 w-24 text-5xl">
                          {paper.emoji}
                        </div>

                        <h3 className="text-2xl font-semibold text-kid-ink mb-5">
                          {paper.title}
                        </h3>

                        <a
                          href={paper.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="kid-btn px-8"
                        >
                          View & Download
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ),
        )}
      </div>
    </div>
  );
}

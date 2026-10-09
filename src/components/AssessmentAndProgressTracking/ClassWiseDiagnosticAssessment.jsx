import React, { useState } from "react";
import { FileText } from "lucide-react";
import { classAssessments } from "../../data/classAssessments";
import { PageHero, SectionTitle } from "../KidsUI";

const levels = [
  {
    id: "pg",
    title: "PG",
    image:
      "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/summetive-playgroup.jpg?v=1781242641",
  },
  {
    id: "nursery",
    title: "Nursery",
    image:
      "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/summetive-nursery_bd5eeb3b-70ff-474e-9ea5-1cafc9634015.jpg?v=1781242527",
  },
  {
    id: "lkg",
    title: "LKG",
    image:
      "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/summative-lkg_1e3ca9cc-40fc-4dff-99e7-10ce980cb1f1.jpg?v=1781242526",
  },
  {
    id: "ukg",
    title: "UKG",
    image:
      "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/summetive-ukg.jpg?v=1781242526",
  },
];

export default function ClassWiseDiagnosticAssessment() {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <section>
      <div className="max-w-7xl mx-auto">
        <PageHero
          emoji="🔎"
          title="Diagnostic Assessment For Preschool"
          subtitle="Pick a class to open its initial diagnostic assessments."
        />

        {/* Level Cards */}
        <div className="tone-cycle grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          {levels.map((level) => (
            <div
              key={level.id}
              className="kid-card kid-card-hover flex flex-col overflow-hidden"
            >
              <div className="m-3 mb-0 flex items-center justify-center overflow-hidden rounded-[18px] bg-white h-56 p-3">
                <img
                  src={level.image}
                  alt={level.title}
                  className="w-full h-full object-contain"
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

        {/* Assessment Section */}
        {activeSection && (
          <div className="animate-fadeIn">
            <SectionTitle className="mb-6 capitalize">
              {activeSection} Assessment
            </SectionTitle>

            <div className="tone-cycle grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {classAssessments[activeSection].map((item, index) => (
                <div
                  key={index}
                  className="kid-card kid-card-hover flex flex-col overflow-hidden"
                >
                  <div className="m-3 mb-0 flex items-center justify-center overflow-hidden rounded-[18px] bg-white h-52 p-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex flex-1 flex-col items-center p-5 text-center">
                    <h3 className="text-lg font-semibold leading-snug text-kid-ink mb-5 flex-1">
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

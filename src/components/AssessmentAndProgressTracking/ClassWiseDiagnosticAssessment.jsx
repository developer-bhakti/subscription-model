import React, { useState } from "react";
import { FileText } from "lucide-react";
import { classAssessments } from "../../data/classAssessments";

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
    <section className="bg-gradient-to-b from-[#f7f8ff] to-[#eef1ff] py-20 px-5 font-sans">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl md:text-6xl font-extrabold text-gray-900 mb-16">
          Diagnostic Assessment For Preschool
        </h2>

        {/* Level Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mb-20">
          {levels.map((level) => (
            <div
              key={level.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >
              <div className="w-full h-64 bg-gray-100 flex items-center justify-center p-3">
                <img
                  src={level.image}
                  alt={level.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-8 text-center">
                <h3 className="text-3xl font-bold text-gray-800 mb-5">
                  {level.title}
                </h3>

                <button
                  onClick={() => setActiveSection(level.id)}
                  className="bg-[#5d5be3] hover:bg-[#4745c7] text-white px-7 py-3 rounded-xl font-semibold transition duration-300 hover:scale-105"
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
            <h2 className="text-center text-4xl md:text-5xl font-extrabold text-gray-900 mb-14 capitalize">
              {activeSection} Assessment
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
              {classAssessments[activeSection].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-2xl transition duration-300"
                >
                  <div className="w-full h-60 bg-gray-100 flex items-center justify-center p-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="p-7 text-center">
                    <h3 className="text-2xl font-bold text-gray-800 leading-relaxed min-h-[90px] mb-6">
                      {item.title}
                    </h3>

                    <div className="flex justify-center">
                      <a
                        href={item.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#5d5be3] hover:bg-[#4745c7] text-white px-6 py-3 rounded-xl font-semibold transition duration-300 hover:scale-105"
                      >
                        <FileText size={18} />
                        View & Download
                      </a>
                    </div>
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
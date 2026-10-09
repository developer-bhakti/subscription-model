import React, { useState } from "react";

const categories = [
  {
    id: "nursery",
    title: "Nursery Worksheets",
    emoji: "👶",
    tint: "bg-rose-50",
    description:
      "Fun and engaging nursery worksheets with colourful learning activities.",
  },
  {
    id: "lkg",
    title: "LKG Worksheets",
    emoji: "🧩",
    tint: "bg-amber-50",
    description:
      "Interactive LKG worksheets designed for early childhood learning.",
  },
  {
    id: "ukg",
    title: "UKG Worksheets",
    emoji: "🎓",
    tint: "bg-indigo-50",
    description:
      "Creative UKG learning activities and summer practice worksheets.",
  },
];

const worksheetData = {
  nursery: [
    {
      title: "Math Activity",
      emoji: "🔢",
      tint: "bg-sky-50",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nursery_Maths_Summer_Homework.pdf?v=1779091893",
    },
    {
      title: "Language Activity",
      emoji: "🔤",
      tint: "bg-rose-50",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nursery_Language_Summer_Homework.pdf?v=1779091894",
    },
    {
      title: "EVS Activity",
      emoji: "🌱",
      tint: "bg-emerald-50",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nursery_EVS_Summer_Homework.pdf?v=1779091904",
    },
  ],

  lkg: [
    {
      title: "Math Activity",
      emoji: "🔢",
      tint: "bg-sky-50",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG_Maths_Summer_Homework.pdf?v=1779091905",
    },
    {
      title: "Language Activity",
      emoji: "🔤",
      tint: "bg-rose-50",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG_Language_Summer_Homework.pdf?v=1779091905",
    },
    {
      title: "EVS Activity",
      emoji: "🌱",
      tint: "bg-emerald-50",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG_EVS_Summer_Homework.pdf?v=1779179780",
    },
  ],

  ukg: [
    {
      title: "Math Activity",
      emoji: "🔢",
      tint: "bg-sky-50",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG_Maths_Summer_Homework.pdf?v=1779091886",
    },
    {
      title: "Language Activity",
      emoji: "🔤",
      tint: "bg-rose-50",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG_Language_Summer_Homework.pdf?v=1779091886",
    },
    {
      title: "EVS Activity",
      emoji: "🌱",
      tint: "bg-emerald-50",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG_EVS_Summer_Homework.pdf?v=1779091886",
    },
  ],
};

export default function SummerWorksheets() {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <section className="bg-[#f2faee] py-20 px-5 font-playful">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h2 className="text-center text-4xl md:text-5xl font-bold text-[#15803d] mb-16">
          Summer Worksheets For Preschool
        </h2>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
          {categories.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[30px] overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="p-7 text-center">
                <div
                  className={`w-20 h-20 mx-auto rounded-full ${item.tint} flex items-center justify-center text-4xl mb-5`}
                >
                  {item.emoji}
                </div>

                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-500 leading-7 text-[16px] mb-6 font-playful">
                  {item.description}
                </p>

                <button
                  onClick={() =>
                    setActiveSection(
                      activeSection === item.id ? null : item.id
                    )
                  }
                  className="bg-[#16a34a] hover:bg-[#15803d] text-white px-7 py-3 rounded-xl font-bold transition-all duration-300"
                >
                  {activeSection === item.id
                    ? "Hide Worksheets"
                    : "View Worksheets"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Worksheets Section */}
        {activeSection && (
          <div className="mt-24 animate-fadeIn">

            <h2 className="text-center text-3xl md:text-4xl font-bold text-[#15803d] mb-12">
              {activeSection.toUpperCase()} Activities
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {worksheetData[activeSection]?.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-6 text-center shadow-lg hover:-translate-y-2 transition-all duration-300"
                >
                  <div
                    className={`w-20 h-20 mx-auto rounded-full ${item.tint} flex items-center justify-center text-4xl mb-6`}
                  >
                    {item.emoji}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-5">
                    {item.title}
                  </h3>

                  <a
                    href={item.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#16a34a] hover:bg-[#15803d] text-white px-6 py-3 rounded-xl font-bold transition-all duration-300"
                  >
                    View & Download
                  </a>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
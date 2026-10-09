import React, { useState } from "react";
import { PageHero, SectionTitle } from "../KidsUI";
import { Star } from "../KidsArt";

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
    <section>
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <PageHero
          emoji="☀️"
          title="Summer Worksheets For Preschool"
          subtitle="Math, language and EVS summer homework packs for every class."
        />

        {/* Category Cards */}
        <div className="tone-cycle grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((item) => (
            <div
              key={item.id}
              className="kid-card kid-card-hover flex flex-col overflow-hidden"
            >
              <Star className="absolute right-5 top-5 h-7 w-7" />

              <div className="flex flex-1 flex-col items-center p-6 sm:p-7 text-center">
                <div className="kid-chip mx-auto h-20 w-20 text-4xl mb-5">
                  {item.emoji}
                </div>

                <h3 className="text-2xl font-semibold text-kid-ink mb-3">
                  {item.title}
                </h3>

                <p className="text-kid-soft leading-7 text-[16px] mb-6 flex-1 font-medium">
                  {item.description}
                </p>

                <button
                  onClick={() =>
                    setActiveSection(
                      activeSection === item.id ? null : item.id
                    )
                  }
                  className="kid-btn"
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
          <div className="mt-14 animate-fadeIn">

            <SectionTitle className="mb-6">
              {activeSection.toUpperCase()} Activities
            </SectionTitle>

            <div className="tone-cycle grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {worksheetData[activeSection]?.map((item, index) => (
                <div
                  key={index}
                  className="kid-card kid-card-hover p-6 text-center"
                >
                  <div className="kid-chip mx-auto h-20 w-20 text-4xl mb-5">
                    {item.emoji}
                  </div>

                  <h3 className="text-xl font-semibold text-kid-ink mb-5">
                    {item.title}
                  </h3>

                  <a
                    href={item.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="kid-btn"
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

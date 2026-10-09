import React from "react";
import { PageHero } from "../KidsUI";
import { Star } from "../KidsArt";

// Paste each audit sheet's link into its `pdf`. A card with an empty `pdf` shows as
// "Coming Soon" rather than a dead button, so this page is safe to ship part-filled.
const toyMaterialAudits = [
  {
    title: "PG Toy & Material Audit",
    age: "Age 2 to 3 Years",
    emoji: "🍼",
    tint: "bg-sky-50",
    description:
      "Check the toys and learning materials a playgroup classroom should hold.",
    pdf: "",
  },
  {
    title: "Nursery Toy & Material Audit",
    age: "Age 3 to 4 Years",
    emoji: "👶",
    tint: "bg-rose-50",
    description:
      "Audit nursery toys, manipulatives and classroom learning material.",
    pdf: "",
  },
  {
    title: "LKG Toy & Material Audit",
    age: "Age 4 to 5 Years",
    emoji: "🧩",
    tint: "bg-amber-50",
    description:
      "Audit LKG learning aids, puzzles, blocks and activity material.",
    pdf: "",
  },
  {
    title: "UKG Toy & Material Audit",
    age: "Age 5 to 6 Years",
    emoji: "🎓",
    tint: "bg-indigo-50",
    description:
      "Audit UKG learning material, reading aids and activity resources.",
    pdf: "",
  },
];

const Toymaterial = () => {
  return (
    <section>
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <PageHero
          emoji="🧸"
          title="Toy & Material Audit"
          subtitle="Check the toys and learning materials in every preschool classroom."
        />

        {/* Cards */}
        <div className="tone-cycle grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {toyMaterialAudits.map((audit, index) => (
            <div
              key={index}
              className="kid-card kid-card-hover flex flex-col overflow-hidden"
            >
              <Star className="absolute right-4 top-4 h-6 w-6" />

              <div className="flex flex-1 flex-col items-center p-6 text-center">

                {/* Emoji */}
                <div className="kid-chip mb-5 h-20 w-20 text-4xl">
                  {audit.emoji}
                </div>

                <h2 className="text-xl font-semibold leading-snug text-kid-ink mb-2">
                  {audit.title}
                </h2>

                <span className="kid-pill mb-4">{audit.age}</span>

                <p className="text-kid-soft text-[15px] font-medium leading-7 mb-6 flex-1">
                  {audit.description}
                </p>

                {audit.pdf ? (
                  <a
                    href={audit.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="kid-btn"
                  >
                    View & Download
                  </a>
                ) : (
                  <span className="inline-block rounded-full bg-white/70 px-6 py-2.5 text-sm font-semibold text-kid-soft cursor-not-allowed">
                    Coming Soon
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Toymaterial;

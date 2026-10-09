import React from "react";
import { PageHero } from "../KidsUI";
import { Star } from "../KidsArt";

const counsellingTools = [
  {
    title: "Initial Skill Assessment for PG",
    emoji: "🍼",
    tint: "bg-sky-50",
    description:
      "Assessment designed to help parents and teachers check and understand the developmental and functional skills of a Playgroup child. This helps evaluate toddlers readiness for early learning experiences.",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Prime-inner-PG-Adiuvaret.pdf?v=1779263813",
  },
  {
    title: "Initial Skill Assessment for Nursery",
    emoji: "👶",
    tint: "bg-rose-50",
    description:
      "Learn activities and counselling methods to support emotional growth in children.",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Prime-inner-Nursery-update_633980e9-3d55-486d-b66b-ac38d3e7f2a1.pdf?v=1779707349",
  },
  {
    title: "Initial Skill Assessment for LKG",
    emoji: "🧩",
    tint: "bg-amber-50",
    description:
      "Helpful counselling tips and strategies for managing child behaviour effectively.",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Prime-inner-LKG-print_32012aed-a5c6-4dbb-93ed-bb5a8befd3c6.pdf?v=1779707418",
  },
  {
    title: "Initial Skill Assessment for UKG",
    emoji: "🎓",
    tint: "bg-indigo-50",
    description:
      "Guidance and counselling resources to improve speech and communication skills.",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Prime-inner-UKG-Adiuvaret.pdf?v=1779263813",
  },
];

export default function ParentCounsellingTools() {
  return (
    <section>
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <PageHero
          emoji="👪"
          title="Parent Counselling Tools For Early Child Development"
          subtitle="Initial skill assessments to share with parents, class by class."
        />

        {/* Cards Grid */}
        <div className="tone-cycle grid grid-cols-1 items-start gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {counsellingTools.map((tool, index) => (
            <div
              key={index}
              className="kid-card kid-card-hover overflow-hidden"
            >
              <Star className="absolute right-4 top-4 h-6 w-6" />

              {/* Content */}
              <div className="p-6 text-center">

                {/* Emoji */}
                <div className="kid-chip mx-auto mb-5 h-20 w-20 text-4xl">
                  {tool.emoji}
                </div>

                <h3 className="mb-3 text-xl font-semibold leading-snug text-kid-ink">
                  {tool.title}
                </h3>

                <p className="mb-6 text-[15px] font-medium leading-7 text-kid-soft">
                  {tool.description}
                </p>

                <a
                  href={tool.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kid-btn"
                >
                  View & Download
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

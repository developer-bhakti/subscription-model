import React from "react";

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
    <section className="bg-slate-100 py-16 px-5">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800 leading-tight">
            Toy & Material Audit
          </h1>

          <p className="text-slate-500 mt-3 text-base md:text-lg">
            Check the toys and learning materials in every preschool classroom.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          {toyMaterialAudits.map((audit, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="p-6 text-center">

                {/* Emoji */}
                <div
                  className={`w-20 h-20 mx-auto rounded-full ${audit.tint} flex items-center justify-center text-4xl mb-5`}
                >
                  {audit.emoji}
                </div>

                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  {audit.title}
                </h2>

                <p className="text-slate-400 text-sm mb-4">{audit.age}</p>

                <p className="text-slate-500 text-[15px] leading-7 mb-6">
                  {audit.description}
                </p>

                {audit.pdf ? (
                  <a
                    href={audit.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-white font-semibold text-sm shadow-md hover:from-orange-600 hover:to-amber-500 transition-all duration-300"
                  >
                    View & Download
                  </a>
                ) : (
                  <span className="inline-block px-6 py-3 rounded-full bg-slate-100 text-slate-400 font-semibold text-sm cursor-not-allowed">
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

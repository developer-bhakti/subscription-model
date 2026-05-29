import React from "react";

const counsellingTools = [
  {
    title: "Initial Skill Assessment for PG",
    image:
      "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/parent_consulling.jpg?v=1779266869",
    description:
      "Assessment designed to help parents and teachers check and understand the developmental and functional skills of a Playgroup child. This helps evaluate toddlers readiness for early learning experiences.",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Prime-inner-PG-Adiuvaret.pdf?v=1779263813",
  },
  {
    title: "Initial Skill Assessment for Nursery",
    image:
      "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/ChatGPT_Image_May_20_2026_01_46_21_PM.png?v=1779265017",
    description:
      "Learn activities and counselling methods to support emotional growth in children.",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Prime-inner-Nursery-update_633980e9-3d55-486d-b66b-ac38d3e7f2a1.pdf?v=1779707349",
  },
  {
    title: "Initial Skill Assessment for LKG",
    image:
      "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/ChatGPT_Image_May_20_2026_01_42_14_PM.png?v=1779264776",
    description:
      "Helpful counselling tips and strategies for managing child behaviour effectively.",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Prime-inner-LKG-print_32012aed-a5c6-4dbb-93ed-bb5a8befd3c6.pdf?v=1779707418",
  },
  {
    title: "Initial Skill Assessment for UKG",
    image:
      "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/ChatGPT_Image_May_20_2026_01_44_00_PM.png?v=1779264883",
    description:
      "Guidance and counselling resources to improve speech and communication skills.",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Prime-inner-UKG-Adiuvaret.pdf?v=1779263813",
  },
];

export default function ParentCounsellingTools() {
  return (
    <section className="bg-[#f8f9ff] py-16 px-5">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-[#222] leading-tight font-[Baloo_2]">
            Parent Counselling Tools For Early Child Development
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7">
          {counsellingTools.map((tool, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:-translate-y-2 transition-all duration-300"
            >
              
              {/* Image */}
              <img
                src={tool.image}
                alt={tool.title}
                className="w-full h-[220px] object-cover"
              />

              {/* Content */}
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-[#222] mb-4 font-[Baloo_2] leading-snug">
                  {tool.title}
                </h3>

                <p className="text-gray-600 text-[15px] leading-7 mb-6 font-[Poppins]">
                  {tool.description}
                </p>

                <a
                  href={tool.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#6c63ff] hover:bg-[#4f46e5] text-white px-7 py-3 rounded-full text-base font-semibold transition-all duration-300"
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
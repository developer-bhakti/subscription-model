import React from "react";

const counsellingTools = [
  {
    title: "Initial Skill Assessment for PG",
    description:
      "Assessment designed to help check and understand the developmental milestones and readiness of toddlers to learn skills",
    image:
      "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/parent_consulling.jpg?v=1779266869",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Prime-inner-PG-Adiuvaret.pdf?v=1779263813",
  },
  {
    title: "Initial Skill Assessment for Nursery",
    description:
      "Assessment designed to help check developmental milestones and readiness for structured learning activities",
    image:
      "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/ChatGPT_Image_May_20_2026_01_46_21_PM.png?v=1779265017",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Prime-inner-Nursery-update_633980e9-3d55-486d-b66b-ac38d3e7f2a1.pdf?v=1779707349",
  },
  {
    title: "Initial Skill Assessment for LKG",
    description:
      "Assessment designed to help check Child's readiness for skill building in various domains.",
    image:
      "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/ChatGPT_Image_May_20_2026_01_42_14_PM.png?v=1779264776",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Prime-inner-LKG-print_32012aed-a5c6-4dbb-93ed-bb5a8befd3c6.pdf?v=1779707418",
  },
  {
    title: "Initial Skill Assessment for UKG",
    description:
      "Assessment designed to help check child's foundation for transition into formal schooling.",
    image:
      "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/ChatGPT_Image_May_20_2026_01_44_00_PM.png?v=1779264883",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Prime-inner-UKG-Adiuvaret.pdf?v=1779263813",
  },
];

export default function ParentCounselling() {
  return (
    <section className="bg-[#f8f9ff] py-16 px-5">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <h2 className="text-center text-3xl md:text-5xl font-bold text-gray-800 mb-14">
          Parent Counselling Tools For Early Child Development
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7">
          {counsellingTools.map((tool, index) => (
            <div
              key={index}
              className="bg-white rounded-[24px] overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300"
            >
              {/* Image */}
              <img
                src={tool.image}
                alt={tool.title}
                className="w-full h-[220px] object-cover"
              />

              {/* Content */}
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 leading-snug">
                  {tool.title}
                </h3>

                <p className="text-gray-500 text-base leading-7 mb-6">
                  {tool.description}
                </p>

                <a
                  href={tool.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#6c63ff] hover:bg-[#4f46e5] text-white text-base font-semibold px-7 py-3 rounded-full transition-all duration-300"
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
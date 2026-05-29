import React from "react";

const curriculumData = [
  {
    title: "Nursery Curriculum",
    image:
      "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/ChatGPT_Image_May_20_2026_02_29_42_PM.png?v=1779267601",
    description:
      "Foundational learning activities, worksheets, and early development resources for nursery students.",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/Nursery-LEMcore.pdf?v=1779267027",
  },
  {
    title: "LKG Curriculum",
    image:
      "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/ChatGPT_Image_May_20_2026_02_26_21_PM.png?v=1779267419",
    description:
      "Interactive and engaging curriculum resources designed for Lower Kindergarten learners.",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/LKG.pdf?v=1779267045",
  },
  {
    title: "UKG Curriculum",
    image:
      "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/ChatGPT_Image_May_20_2026_02_27_57_PM.png?v=1779267504",
    description:
      "Advanced preschool learning materials and activity-based curriculum for UKG students.",
    pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG.pdf?v=1779267045",
  },
];

export default function LEMCoreCurriculum() {
  return (
    <section className="bg-[#f8fbff] py-16 px-5 font-[Poppins]">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1d3557] mb-4">
            LEMCore Curriculum
          </h2>

          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-8">
            Explore curriculum resources specially designed for Nursery, LKG,
            and UKG students.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {curriculumData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:-translate-y-2 transition-all duration-300"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[230px] object-cover"
              />

              {/* Content */}
              <div className="p-7 text-center">
                <h3 className="text-2xl font-bold text-[#1d3557] mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-7 text-[15px] mb-6">
                  {item.description}
                </p>

                <a
                  href={item.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#ff6b6b] hover:bg-[#e63946] text-white px-7 py-3 rounded-full font-semibold transition duration-300 hover:scale-105"
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
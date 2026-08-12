import React, { useState } from "react";

const categories = [
  {
    id: "nature",
    title: "Nature Theme",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
    description:
      "Colour the lovely world of trees, flowers, birds, and rainy-day scenes.",
  },
  {
    id: "festival",
    title: "Festival Theme",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80",
    description:
      "Celebrate joyful festival moments with colourful and cheerful worksheets.",
  },
  {
    id: "animals",
    title: "Animals Theme",
    image:
      "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=900&q=80",
    description:
      "Discover playful animal scenes and let children enjoy creative colouring.",
  },
];

const worksheetData = {
  nature: [
    {
      title: "Garden Scenes",
      image:
        "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80",
      pdf: "#",
    },
    {
      title: "Rainy Day",
      image:
        "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80",
      pdf: "#",
    },
    {
      title: "Flower Basket",
      image:
        "https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=900&q=80",
      pdf: "#",
    },
  ],
  festival: [
    {
      title: "Diwali Lights",
      image:
        "https://images.unsplash.com/photo-1602498456745-e9503b3047b4?auto=format&fit=crop&w=900&q=80",
      pdf: "#",
    },
    {
      title: "Holi Celebration",
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80",
      pdf: "#",
    },
    {
      title: "Independence Day",
      image:
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=80",
      pdf: "#",
    },
  ],
  animals: [
    {
      title: "Farm Animals",
      image:
        "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=900&q=80",
      pdf: "#",
    },
    {
      title: "Sea Animals",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70b5?auto=format&fit=crop&w=900&q=80",
      pdf: "#",
    },
    {
      title: "Pet Friends",
      image:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80",
      pdf: "#",
    },
  ],
};

export default function ThemeWiseWorksheets() {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <section className="bg-[#f5f7ff] py-20 px-5 font-[Baloo_2]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl md:text-5xl font-extrabold text-[#5d5be3] mb-16">
          Theme based clouring Worksheets for Your School
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
          {categories.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[30px] overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[240px] object-cover"
              />

              <div className="p-7 text-center">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-500 leading-7 text-[16px] mb-6 font-[Poppins]">
                  {item.description}
                </p>

                <button
                  onClick={() =>
                    setActiveSection(
                      activeSection === item.id ? null : item.id
                    )
                  }
                  className="bg-[#6f6cf8] hover:bg-[#514df0] text-white px-7 py-3 rounded-xl font-bold transition-all duration-300"
                >
                  {activeSection === item.id ? "Hide Worksheets" : "View Worksheets"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {activeSection && (
          <div className="mt-24 animate-fadeIn">
            <h2 className="text-center text-3xl md:text-4xl font-extrabold text-[#5d5be3] mb-12">
              {categories.find((item) => item.id === activeSection)?.title}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {worksheetData[activeSection]?.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-6 text-center shadow-lg hover:-translate-y-2 transition-all duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[220px] object-cover rounded-2xl mb-6"
                  />

                  <h3 className="text-2xl font-bold text-gray-800 mb-5">
                    {item.title}
                  </h3>

                  <a
                    href={item.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#6f6cf8] hover:bg-[#514df0] text-white px-6 py-3 rounded-xl font-bold transition-all duration-300"
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
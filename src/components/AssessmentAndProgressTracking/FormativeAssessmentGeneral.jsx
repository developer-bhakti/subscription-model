import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormativeAssessmentGeneral() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);

  const classes = [
    {
      id: "nursery",
      title: "Nursery",
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1000",
      assessments: [
        {
          title: "Nursery 1",
          image:
            "https://images.unsplash.com/photo-1588072432904-843af37f03ed?w=1000",
          pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/FA-1_Papers-Nursery.pdf?v=1781243406",
        },
        {
          title: "Nursery 2",
          image:
            "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1000",
          pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/FA-2_Papers-Nursery.pdf?v=1781243406",
        },
      ],
    },
    {
      id: "lkg",
      title: "LKG",
      image:
        "https://images.unsplash.com/photo-1588072432836-e10032774350?w=1000",
      assessments: [
        {
          title: "LKG 1",
          image:
            "https://images.unsplash.com/photo-1588072432904-843af37f03ed?w=1000",
          pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/FA-1_Papers-LKG.pdf?v=1781243406",
        },
        {
          title: "LKG 2",
          image:
            "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1000",
          pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/FA-2_Papers-LKG.pdf?v=1781243406",
        },
      ],
    },
    {
      id: "ukg",
      title: "UKG",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1000",
      assessments: [
        {
          title: "UKG 1",
          image:
            "https://images.unsplash.com/photo-1588072432904-843af37f03ed?w=1000",
          pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/FA-1_Papers-UKG.pdf?v=1781243406",
        },
        {
          title: "UKG 2",
          image:
            "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1000",
          pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/FA-2_Papers-UKG.pdf?v=1781243406",
        },
      ],
    },
  ];

  const toggleSection = (id) => {
    setActiveSection(activeSection === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-16">
      <div className="w-[90%] max-w-7xl mx-auto">
        <h1 className="text-center text-4xl md:text-6xl font-extrabold text-slate-800 mb-16">
          Formative Assessment (General Syllabus)
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {classes.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:-translate-y-2 transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-72 object-cover"
              />

              <div className="p-6 text-center">
                <h2 className="text-4xl font-bold mb-5">{item.title}</h2>

                <button
                  onClick={() => toggleSection(item.id)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold"
                >
                  View Assessments
                </button>
              </div>
            </div>
          ))}
        </div>

        {classes.map(
          (item) =>
            activeSection === item.id && (
              <div key={item.id} className="mt-16">
                <h2 className="text-center text-3xl md:text-5xl font-extrabold mb-12">
                  {item.title} Assessment
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {item.assessments.map((paper, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-3xl overflow-hidden shadow-lg"
                    >
                      <img
                        src={paper.image}
                        alt={paper.title}
                        className="w-full h-80 object-cover"
                      />

                      <div className="p-6 text-center">
                        <h3 className="text-3xl font-bold mb-6">
                          {paper.title}
                        </h3>

                        <a
                          href={paper.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold"
                        >
                          View & Download
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ),
        )}
      </div>
    </div>
  );
}

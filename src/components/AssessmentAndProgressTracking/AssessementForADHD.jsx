import React from "react";
import { useNavigate } from "react-router-dom";

const assessments = [
  {
    title: "Kids Behaviour Scale",
    description: "Check if your Kid's is Emotionally Regulated?",
    image:
      "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/test1.jpg?v=1714385215",
    link: "https://www.ourpreschool.in/pages/online-assessment-tools-for-parents-and-teachers-1",
  },
  {
    title: "Experience Thermometer",
    description: "Check if your Kid's learning intensity and future health?",
    image:
      "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/test2.jpg?v=1714385220",
    link: "#",
  },
  {
    title: "Screening Tool for ADHD",
    description: "Check it through DSM 5 criteria",
    image:
      "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/test3.jpg?v=1714385225",
    link: "https://www.ourpreschool.in/pages/screening-tool-for-adhd",
  },
  {
    title: "Obesity Screening Tool for Kids",
    description: "Check it for your kid on CDC criteria",
    image:
      "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/test8.png?v=1714385230",
    link: "#",
  },
];

const AssessementForADHD = () => {
    const navigate = useNavigate();
    
  return (
    <section className="py-16 px-4 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-center text-4xl font-bold text-slate-800 mb-12">
          Assessment Tools
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {assessments.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-all duration-500 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${item.image})`,
                }}
              />

              {/* Decorative Circle */}
              <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-sky-100 group-hover:bg-sky-500 transition-all duration-500 opacity-30"></div>

              <div className="relative p-8">
                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-sky-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h6m-6 4h6M8 4h8a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2z"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-slate-800 group-hover:text-sky-600 transition-colors duration-300 mb-4">
                  {item.title}
                </h3>

                <p className="text-slate-600 mb-6 leading-relaxed">
                  {item.description}
                </p>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-medium hover:scale-105 transition-transform duration-300"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AssessementForADHD;

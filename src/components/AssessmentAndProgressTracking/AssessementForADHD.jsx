import React from "react";
import { useNavigate } from "react-router-dom";
import { PageHero } from "../KidsUI";

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
    <section>
      <div className="max-w-6xl mx-auto">
        <PageHero
          emoji="🧠"
          title="Assessment Tools"
          subtitle="Screening tools you can open and use with parents."
        />

        <div className="tone-cycle grid grid-cols-1 md:grid-cols-2 gap-6">
          {assessments.map((item, index) => (
            <div
              key={index}
              className="kid-card kid-card-hover group relative flex flex-col overflow-hidden"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-all duration-500 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${item.image})`,
                }}
              />

              {/* Decorative Circle */}
              <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-white/50 transition-all duration-500 group-hover:bg-white/80"></div>

              <div className="relative flex flex-1 flex-col p-7">
                {/* Icon */}
                <div className="kid-chip mb-5 h-16 w-16">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-kid-deep"
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

                <h3 className="text-2xl font-semibold text-kid-ink mb-3">
                  {item.title}
                </h3>

                <p className="text-kid-soft font-medium mb-6 leading-relaxed flex-1">
                  {item.description}
                </p>

                <div>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="kid-btn"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AssessementForADHD;

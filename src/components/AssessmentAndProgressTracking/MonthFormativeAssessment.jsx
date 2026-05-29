import React, { useState } from "react";
import { CalendarCheck, FileText } from "lucide-react";

const assessmentData = {
  pg: [
    {
      month: "1st Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month_1_pg.pdf?v=1779772178",
    },
    {
      month: "2nd Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month_2_pg.pdf?v=1779772179",
    },
    {
      month: "3rd Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month_3_pg.pdf?v=1779772178",
    },
    {
      month: "4th Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month_4_pg.pdf?v=1779772178",
    },
    {
      month: "5th Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month_5_pg.pdf?v=1779772178",
    },
    {
      month: "6th Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month_6_pg.pdf?v=1779772178",
    },
    {
      month: "7th Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month_7_pg.pdf?v=1779772178",
    },
    {
      month: "8th Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month_8_pg.pdf?v=1779772178",
    },
  ],

  nursery: [
    {
      month: "1st Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month_1_nusery.pdf?v=1779771900",
    },
    {
      month: "2nd Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month_2_nusery.pdf?v=1779771900",
    },
    {
      month: "3rd Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month_3_nusery.pdf?v=1779771900",
    },
    {
      month: "4th Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month_4_nusery.pdf?v=1779771901",
    },
    {
      month: "5th Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month_5_nusery.pdf?v=1779771901",
    },
    {
      month: "6th Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month_6_nusery.pdf?v=1779771900",
    },
    {
      month: "7th Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month_7_nusery.pdf?v=1779771900",
    },
    {
      month: "8th Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month_8_nusery.pdf?v=1779771900",
    },
  ],

  lkg: [
    {
      month: "1st Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month_1_lkg.pdf?v=1779771044",
    },
    {
      month: "2nd Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month_2_lkg.pdf?v=1779771045",
    },
    {
      month: "3rd Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month_3_lkg.pdf?v=1779771045",
    },
    {
      month: "4th Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month_4_lkg.pdf?v=1779771045",
    },
    {
      month: "5th Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month_5_lkg.pdf?v=1779771045",
    },
    {
      month: "6th Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month_6_lkg.pdf?v=1779771045",
    },
    {
      month: "7th Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month_7_lkg.pdf?v=1779771044",
    },
    {
      month: "8th Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month_8_lkg.pdf?v=1779771045",
    },
  ],

  ukg: [
    {
      month: "1st Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month-1_ukg.pdf?v=1779772836",
    },
    {
      month: "2nd Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month_2_ukg.pdf?v=1779772836",
    },
    {
      month: "3rd Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month_3_ukg.pdf?v=1779772836",
    },
    {
      month: "4th Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month_4_ukg.pdf?v=1779772836",
    },
    {
      month: "5th Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month_5_ukg.pdf?v=1779772836",
    },
    {
      month: "6th Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month_6_ukg.pdf?v=1779772836",
    },
    {
      month: "7th Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month_7_ukg.pdf?v=1779772836",
    },
    {
      month: "8th Month Formative Assessment",
      pdf: "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/month_8_ukg.pdf?v=1779772836",
    },
  ],
};

const levels = [
  {
    id: "pg",
    title: "PG",
    image: "https://cdn-icons-png.flaticon.com/512/3048/3048122.png",
  },
  {
    id: "nursery",
    title: "Nursery",
    image: "https://cdn-icons-png.flaticon.com/512/2436/2436874.png",
  },
  {
    id: "lkg",
    title: "LKG",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135755.png",
  },
  {
    id: "ukg",
    title: "UKG",
    image: "https://cdn-icons-png.flaticon.com/512/2784/2784445.png",
  },
];

export default function MonthFormativeAssessment() {
  const [activeSection, setActiveSection] = useState("");

  return (
    <section className="bg-gradient-to-b from-[#f8f9ff] to-[#eef2ff] py-20 px-5 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* TITLE */}
        <div className="text-center mb-16">
          <h2 className="flex items-center justify-center gap-3 text-3xl md:text-5xl font-extrabold text-[#5d5be3]">
            <CalendarCheck size={42} />
            Month Formative Assessment
          </h2>
        </div>

        {/* LEVEL CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">

          {levels.map((level) => (
            <div
              key={level.id}
              className="bg-white rounded-[28px] p-8 text-center shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <img
                src={level.image}
                alt={level.title}
                className="w-[120px] h-[120px] object-contain mx-auto mb-6"
              />

              <h3 className="text-3xl font-bold text-gray-800 mb-5">
                {level.title}
              </h3>

              <button
                onClick={() => setActiveSection(level.id)}
                className="bg-[#5d5be3] hover:bg-[#4745c7] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                View Assessments
              </button>
            </div>
          ))}

        </div>

        {/* ASSESSMENT SECTION */}
        {activeSection && (
          <div className="animate-fadeIn">

            <h2 className="text-center text-3xl md:text-5xl font-extrabold text-gray-800 mb-14">
              {activeSection.toUpperCase()} Monthly Assessment
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

              {assessmentData[activeSection].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-[24px] p-8 text-center shadow-xl hover:-translate-y-2 transition-all duration-300"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3652/3652191.png"
                    alt="month"
                    className="w-[90px] h-[90px] object-contain mx-auto mb-5"
                  />

                  <h3 className="text-2xl font-bold text-gray-800 mb-6 leading-snug">
                    {item.month}
                  </h3>

                  <a
                    href={item.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#5d5be3] hover:bg-[#4745c7] text-white px-5 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <FileText size={18} />
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
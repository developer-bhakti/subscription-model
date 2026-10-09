import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarCheck, FileText, Laptop } from "lucide-react";
import { PageHero, SectionTitle } from "../KidsUI";

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
  const navigate = useNavigate();

  return (
    <section>
      <div className="max-w-7xl mx-auto">

        {/* TITLE */}
        <PageHero
          emoji={<CalendarCheck size={28} />}
          title="Month Formative Assessment"
          subtitle="Pick a class, then do a month's assessment online or download it."
        />

        {/* LEVEL CARDS */}
        <div className="tone-cycle grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

          {levels.map((level) => (
            <div
              key={level.id}
              className="kid-card kid-card-hover flex flex-col p-6 text-center"
            >
              <div className="kid-chip mx-auto mb-5 h-32 w-32 p-5">
                <img
                  src={level.image}
                  alt={level.title}
                  className="h-full w-full object-contain"
                />
              </div>

              <h3 className="text-2xl font-semibold text-kid-ink mb-5">
                {level.title}
              </h3>

              <button
                onClick={() => setActiveSection(level.id)}
                className="kid-btn mt-auto"
              >
                View Assessments
              </button>
            </div>
          ))}

        </div>

        {/* ASSESSMENT SECTION */}
        {activeSection && (
          <div className="animate-fadeIn">

            <SectionTitle className="mb-6">
              {activeSection.toUpperCase()} Monthly Assessment
            </SectionTitle>

            <div className="tone-cycle grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {assessmentData[activeSection].map((item, index) => (
                <div
                  key={index}
                  className="kid-card kid-card-hover flex flex-col p-6 text-center"
                >
                  <div className="kid-chip mx-auto mb-4 h-24 w-24 p-4">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3652/3652191.png"
                      alt="month"
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <h3 className="text-lg font-semibold leading-snug text-kid-ink mb-5 flex-1">
                    {item.month}
                  </h3>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => navigate(`/user/assessment/month-formative/online/${activeSection}/${index + 1}`)}
                      className="kid-btn kid-btn-teal"
                    >
                      <Laptop size={18} />
                      Do It Online
                    </button>

                    <a
                      href={item.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="kid-btn"
                    >
                      <FileText size={18} />
                      View & Download
                    </a>
                  </div>
                </div>
              ))}

            </div>

          </div>
        )}
      </div>
    </section>
  );
}

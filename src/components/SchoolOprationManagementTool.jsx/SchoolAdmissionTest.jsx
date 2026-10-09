import React from "react";
import { PageHero } from "../KidsUI";

const admissionTests = [
  {
    title: "Nursery",
    age: "Age 3 to 4 Years",
    image:
      "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/img2.jpg?v=1707477780",
    link: "https://www.ourpreschool.in/pages/nursery-admission-test",
  },
  {
    title: "LKG",
    age: "Age 4 to 5 Years",
    image:
      "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/img3.jpg?v=1707477800",
    link: "https://www.ourpreschool.in/pages/lkg-admission-test",
  },
  {
    title: "UKG",
    age: "Age 5 to 6 Years",
    image:
      "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/img5.jpg?v=1707477820",
    link: "https://www.ourpreschool.in/pages/ukg-admission-test",
  },
];

const SchoolAdmissionTest = () => {
  return (
    <section>
      <div className="max-w-7xl mx-auto">

        <PageHero
          emoji="📚"
          title="Admission Test"
          subtitle="Choose a class to open its admission test."
        />

        <div className="tone-cycle grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {admissionTests.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="kid-card kid-card-hover group flex flex-col overflow-hidden"
            >

              {/* IMAGE */}
              <div className="relative m-3 mb-0 h-[220px] overflow-hidden rounded-[18px]">

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="flex flex-1 flex-col items-center p-6 text-center">

                <h2 className="text-2xl font-semibold text-kid-ink mb-2">
                  {item.title}
                </h2>

                <span className="kid-pill mb-5">
                  {item.age}
                </span>

                <span className="kid-btn kid-btn-sun mt-auto">
                  Test Now
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SchoolAdmissionTest;

import React from "react";

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
    <section className="bg-slate-100 py-16 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {admissionTests.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3"
          >

            {/* IMAGE */}
            <div className="relative overflow-hidden h-[260px]">

              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* CONTENT */}
            <div className="p-6 text-center">

              <h2 className="text-3xl font-bold text-slate-800 mb-3">
                {item.title}
              </h2>

              <p className="text-slate-500 text-lg mb-6">
                {item.age}
              </p>

              <span className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-white font-semibold text-sm shadow-md group-hover:from-orange-600 group-hover:to-amber-500 transition-all duration-300">
                Test Now
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default SchoolAdmissionTest;
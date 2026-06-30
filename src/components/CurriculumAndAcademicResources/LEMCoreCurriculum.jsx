import React, { useState } from "react";

const classes = [
  {
    name: "Nursery",
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop",
    desc: "LEMCore curriculum resources and activities for Nursery students.",
  },
  {
    name: "LKG",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    desc: "Interactive learning resources and curriculum for LKG students.",
  },
  {
    name: "UKG",
    image:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop",
    desc: "Advanced preschool learning curriculum and educational activities.",
  },
];

const pdfLinks = {
  Nursery: {
    1: {
      practices: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
      syllabus: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
    },
    2: {
      practices: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
      syllabus: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
    },
    3: {
      practices: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
      syllabus: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
    },
    4: {
      practices: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
      syllabus: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
    },
    5: {
      practices: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
      syllabus: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
    },
    6: {
      practices: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
      syllabus: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
    },
    7: {
      practices: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
      syllabus: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
    },
    8: {
      practices: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
      syllabus: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
    },
  },
  LKG: {
    1: {
      practices: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
      syllabus: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
    },
    2: {
      practices: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
      syllabus: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
    },
    3: {
      practices: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
      syllabus: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
    },
    4: {
      practices: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
      syllabus: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
    },
    5: {
      practices: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
      syllabus: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
    },
    6: {
      practices: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
      syllabus: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
    },
    7: {
      practices: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
      syllabus: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
    },
    8: {
      practices: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
      syllabus: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
    },
  },
  UKG: {
    1: {
      practices: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M1-W1_2ba1e935-c14a-4ba5-808c-cacb72a8537b.pdf?v=1782713323",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M1-W2_e847ed05-899c-4822-b57b-2c890f183672.pdf?v=1782713340",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M1-W3_efe8a616-79ed-4e7c-b4f2-fd925cb9cc39.pdf?v=1782713362LINK_HERE",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M1-W4_8afe7f58-760e-4382-81aa-8f7321628d58.pdf?v=1782713362",
      ],
    },
    2: {
      practices: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M2-W1.pdf?v=1782714738",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG_M2-W2.pdf?v=1782714718",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M2-W3.pdf?v=1782714735",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M2-W4.pdf?v=1782714736",
      ],
    },
    3: {
      practices: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M3-W1.pdf?v=1782714852",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M3-W2.pdf?v=1782714851",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M3-W3.pdf?v=1782714849",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M3-W4.pdf?v=1782714852",
      ],
    },
    4: {
      practices: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M4-W1.pdf?v=1782715038",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M4-W2.pdf?v=1782715038",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M4-W3.pdf?v=1782715028",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M4-W4.pdf?v=1782715028",
      ],
    },
    5: {
      practices: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M5-W1.pdf?v=1782715149",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M5-W2.pdf?v=1782715151",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M5-W3.pdf?v=1782715146",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M5-W4.pdf?v=1782715149",
      ],
    },
    6: {
      practices: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M6-W1.pdf?v=1782715282",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M6-W2.pdf?v=1782715281",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M6-W3.pdf?v=1782715279",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M6-W4.pdf?v=1782715289",
      ],
    },
    7: {
      practices: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M7-W1.pdf?v=1782715382",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M7-W2.pdf?v=1782715372",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M7-W3.pdf?v=1782715379",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M7-W4.pdf?v=1782715374",
      ],
    },
    8: {
      practices: ["LINK_HERE", "LINK_HERE", "LINK_HERE", "LINK_HERE"],
      syllabus: [
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M8-W1.pdf?v=1782715480",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M8-W2.pdf?v=1782715478",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M8-W3.pdf?v=1782715476",
        "https://cdn.shopify.com/s/files/1/0632/7307/4847/files/UKG-M8-W4.pdf?v=1782715472",
      ],
    },
  },
};

const LemcoreCurriculum = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (id) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-5">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          LEMCore Curriculum
        </h1>

        {/* Classes */}
        {!selectedClass && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes.map((item) => (
              <div
                key={item.name}
                onClick={() => setSelectedClass(item.name)}
                className="bg-white rounded-3xl overflow-hidden shadow-lg cursor-pointer hover:-translate-y-2 duration-300"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-56 object-cover"
                />

                <div className="p-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    {item.name}
                  </h2>

                  <p className="text-gray-500 leading-7 mb-5">{item.desc}</p>

                  <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold">
                    Explore
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Months */}
        {selectedClass && (
          <>
            <button
              onClick={() => {
                setSelectedClass(null);
                setOpenDropdowns({});
              }}
              className="bg-gray-900 text-white px-6 py-3 rounded-xl mb-8"
            >
              ← Back To Classes
            </button>

            <h2 className="text-4xl font-bold text-gray-900 mb-10">
              {selectedClass} - LEMCore Curriculum
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((month) => (
                <div
                  key={month}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg"
                >
                  <img
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop"
                    alt={`Month ${month}`}
                    className="w-full h-56 object-cover"
                  />

                  <div className="p-6">
                    <h3 className="text-3xl font-bold mb-3">Month {month}</h3>

                    <p className="text-gray-500 mb-6">
                      LEMCore monthly curriculum resources, worksheets and
                      activities.
                    </p>

                    <div className="flex flex-col lg:flex-row gap-4">
                      {/* Weekly Practices */}
                      <div className="flex-1">
                        <button
                          onClick={() => toggleDropdown(`practice-${month}`)}
                          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold"
                        >
                          Weekly Practices
                        </button>

                        {openDropdowns[`practice-${month}`] && (
                          <div className="flex flex-col gap-2 mt-3">
                            {pdfLinks[selectedClass][month].practices.map(
                              (link, index) => (
                                <a
                                  key={index}
                                  href={link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="bg-gray-100 p-3 rounded-xl text-center hover:bg-gray-900 hover:text-white duration-300"
                                >
                                  Week Practice {index + 1}
                                </a>
                              ),
                            )}
                          </div>
                        )}
                      </div>

                      {/* Weekly Syllabus */}
                      <div className="flex-1">
                        <button
                          onClick={() => toggleDropdown(`syllabus-${month}`)}
                          className="w-full bg-emerald-500 text-white py-3 rounded-xl font-semibold"
                        >
                          Weekly Syllabus
                        </button>

                        {openDropdowns[`syllabus-${month}`] && (
                          <div className="flex flex-col gap-2 mt-3">
                            {pdfLinks[selectedClass][month].syllabus.map(
                              (link, index) => (
                                <a
                                  key={index}
                                  href={link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="bg-gray-100 p-3 rounded-xl text-center hover:bg-gray-900 hover:text-white duration-300"
                                >
                                  Weekly Syllabus {index + 1}
                                </a>
                              ),
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LemcoreCurriculum;

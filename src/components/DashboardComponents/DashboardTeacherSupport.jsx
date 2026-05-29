import React from "react";

const trainingData = [
  {
    title: "Academic Management In Preschools - Udemy",
    description:
      "Professional training resources focused on effective academic planning, classroom management, and preschool administration.",
    explore:
      "https://www.udemy.com/course/pre-school-skill-building-techniques-and-academic-management/?couponCode=UDEAFFHP22025",
  },
  {
    title: "Cognitive Skill Management for PreSchool - Udemy",
    description:
      "Specialized guidance and training modules designed to enhance cognitive skill development strategies for preschool learners.",
    explore:
      "https://www.udemy.com/course/cognitive-skill-management-for-pre-school-children/?couponCode=UDEAFFHP22025",
  },
  {
    title: "ACT Syllabus Management In Preschools - Udemy",
    description:
      "Structured support materials and training for implementing ACT-based preschool syllabus planning and execution.",
    explore:
      "https://www.udemy.com/course/activity-based-curriculum-for-tacit-knowledge-act/?couponCode=UDEAFFHP22025",
  },
  {
    title:
      "Language Development through Shared Book Reading Technique - Udemy",
    description:
      "Practical teacher training resources to improve communication, phonics, vocabulary, and language development in young learners.",
    explore:
      "https://www.udemy.com/course/language-development-through-shared-book-reading-technique/?couponCode=UDEAFFHP22025",
  },
  {
    title:
      "Management Of Assessment And Evaluation In Preschools - Udemy",
    description:
      "Comprehensive training modules for conducting assessments, evaluations, and progress tracking in preschool education.",
    explore:
      "https://www.udemy.com/course/management-of-preschool-skill-evaluation-and-assessment/?couponCode=UDEAFFHP22025",
  },
  {
    title: "NTT Program Documents - 299 Each Volumes",
    description:
      "Detailed nursery teacher training documents and reference materials covering preschool teaching methodologies and practices.",
    explore: "/pages/get-free-udemy-coupon",
  },
];

export default function TeacherSupportTraining() {
  return (
    <section className="bg-white py-16 px-5 font-[Baloo_2]">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <h2 className="text-center text-4xl md:text-5xl font-extrabold text-[#5d5be3] mb-14">
          Teacher Support & Training
        </h2>

        {/* Cards */}
        <div className="flex flex-col gap-6">

          {trainingData.map((item, index) => (
            <div
              key={index}
              className="bg-[#f8f9ff] border-l-[6px] border-[#6f6cf8] p-6 md:p-8 rounded-[22px] shadow-[0_8px_18px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
            >

              {/* Title */}
              <h3 className="text-2xl md:text-[28px] font-bold text-gray-800 mb-4 leading-snug">
                {index + 1}. {item.title}
              </h3>

              {/* Description */}
              <p className="text-[17px] leading-8 text-[#667085] mb-6 font-[Poppins]">
                {item.description}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">

                {/* Explore Button */}
                <a
                  href={item.explore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#6f6cf8] hover:bg-[#514df0] text-white px-6 py-3 rounded-xl text-[15px] font-semibold transition-all duration-300 text-center"
                >
                  Explore Now
                </a>

                {/* Coupon Button */}
                <a
                  href="/pages/get-free-udemy-coupon"
                  className="bg-[#10b981] hover:bg-[#059669] text-white px-6 py-3 rounded-xl text-[15px] font-semibold transition-all duration-300 text-center"
                >
                  Get Free Coupon Code
                </a>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
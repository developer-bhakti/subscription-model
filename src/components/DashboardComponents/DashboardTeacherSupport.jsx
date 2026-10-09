import React from "react";
import { Link } from "react-router-dom";
import { PageHero } from "../KidsUI";
import { Star } from "../KidsArt";

const trainingData = [
  {
    title: "Academic Management In Preschools - Udemy",
    description:
      "Professional training resources focused on effective academic planning, classroom management, and preschool administration.",
    explore:
      "https://www.udemy.com/course/pre-school-skill-building-techniques-and-academic-management/?couponCode=UDEAFFHP22025",
    couponRoute: "/get-free-udemy-coupon",
  },
  {
    title: "Cognitive Skill Management for PreSchool - Udemy",
    description:
      "Specialized guidance and training modules designed to enhance cognitive skill development strategies for preschool learners.",
    explore:
      "https://www.udemy.com/course/cognitive-skill-management-for-pre-school-children/?couponCode=UDEAFFHP22025",
    couponRoute: "/cognitive-skill-coupon",
  },
  {
    title: "ACT Syllabus Management In Preschools - Udemy",
    description:
      "Structured support materials and training for implementing ACT-based preschool syllabus planning and execution.",
    explore:
      "https://www.udemy.com/course/activity-based-curriculum-for-tacit-knowledge-act/?couponCode=UDEAFFHP22025",
    couponRoute: "/act-curriculum-coupon",
  },
  {
    title:
      "Language Development through Shared Book Reading Technique - Udemy",
    description:
      "Practical teacher training resources to improve communication, phonics, vocabulary, and language development in young learners.",
    explore:
      "https://www.udemy.com/course/language-development-through-shared-book-reading-technique/?couponCode=UDEAFFHP22025",
    couponRoute: "/language-development-coupon",
  },
  {
    title:
      "Management Of Assessment And Evaluation In Preschools - Udemy",
    description:
      "Comprehensive training modules for conducting assessments, evaluations, and progress tracking in preschool education.",
    explore:
      "https://www.udemy.com/course/management-of-preschool-skill-evaluation-and-assessment/?couponCode=UDEAFFHP22025",
    couponRoute: "/management-assessment-coupon",
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
    <section>
      <div className="mx-auto max-w-5xl">

        {/* Heading */}
        <PageHero
          emoji="👩‍🏫"
          title="Teacher Support & Training"
          subtitle="Courses, coupons and training documents for your teachers."
        />

        {/* Cards */}
        <div className="tone-cycle flex flex-col gap-5">

          {trainingData.map((item, index) => (
            <div
              key={index}
              className="kid-card kid-card-hover p-6 md:p-8"
            >
              <Star className="absolute right-5 top-5 h-7 w-7" />

              <div className="flex items-start gap-4">
                <span className="kid-chip h-14 w-14 text-3xl">🎓</span>

                <div className="min-w-0 pr-8">
                  {/* Title */}
                  <h3 className="mb-3 text-xl font-semibold leading-snug text-kid-ink md:text-2xl">
                    {index + 1}. {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-6 text-base font-medium leading-7 text-kid-soft">
                    {item.description}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-col gap-4 sm:flex-row">

                    {/* Explore Button */}
                    <a
                      href={item.explore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="kid-btn"
                    >
                      Explore Now
                    </a>

                    {/* Coupon Button */}
                    {item.couponRoute && (
                      <Link
                        to={item.couponRoute}
                        className="kid-btn kid-btn-teal"
                      >
                        Get Free Coupon Code
                      </Link>
                    )}

                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

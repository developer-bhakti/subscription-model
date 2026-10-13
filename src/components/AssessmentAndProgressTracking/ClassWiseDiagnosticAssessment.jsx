import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Backpack,
  Baby,
  Blocks,
  Brain,
  FileText,
  GraduationCap,
  HeartHandshake,
  Laptop,
  MessagesSquare,
  PersonStanding,
} from "lucide-react";
import { classAssessments } from "../../data/classAssessments";
import { diagnosticSkillId } from "../../data/diagnosticOnlineAssessments";
import { PageHero, SectionTitle } from "../KidsUI";

const levels = [
  {
    id: "pg",
    title: "PG",
    icon: Baby,
  },
  {
    id: "nursery",
    title: "Nursery",
    icon: Blocks,
  },
  {
    id: "lkg",
    title: "LKG",
    icon: Backpack,
  },
  {
    id: "ukg",
    title: "UKG",
    icon: GraduationCap,
  },
];

// One icon for each of the four skills, the same on every class.
const skillIcons = {
  social: HeartHandshake,
  language: MessagesSquare,
  cognitive: Brain,
  movement: PersonStanding,
};

function SkillIcon({ title }) {
  const Icon = skillIcons[diagnosticSkillId(title)] ?? FileText;

  return <Icon size={44} strokeWidth={1.75} aria-hidden="true" />;
}

export default function ClassWiseDiagnosticAssessment() {
  const navigate = useNavigate();

  // The class you opened lives in the address (?class=pg), so coming back from an online
  // assessment lands on the same class instead of the bare list of classes.
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedClass = searchParams.get("class");
  const activeSection =
    requestedClass && Object.hasOwn(classAssessments, requestedClass)
      ? requestedClass
      : null;
  const setActiveSection = (id) => setSearchParams({ class: id }, { replace: true });

  return (
    <section>
      <div className="max-w-7xl mx-auto">
        <PageHero
          emoji="🔎"
          title="Diagnostic Assessment For Preschool"
          subtitle="Pick a class to open its initial diagnostic assessments."
        />

        {/* Level Cards */}
        <div className="tone-cycle grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          {levels.map((level) => (
            <div
              key={level.id}
              className="kid-card kid-card-hover flex flex-col overflow-hidden"
            >
              <div className="flex flex-1 flex-col items-center p-6 text-center">
                <div className="kid-chip mb-5 h-24 w-24 text-kid-deep">
                  <level.icon size={44} strokeWidth={1.75} aria-hidden="true" />
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
            </div>
          ))}
        </div>

        {/* Assessment Section */}
        {activeSection && (
          <div className="animate-fadeIn">
            <SectionTitle className="mb-6 capitalize">
              {activeSection} Assessment
            </SectionTitle>

            <div className="tone-cycle grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {classAssessments[activeSection].map((item, index) => (
                <div
                  key={index}
                  className="kid-card kid-card-hover flex flex-col overflow-hidden"
                >
                  <div className="flex flex-1 flex-col items-center p-5 text-center">
                    <div className="kid-chip mb-5 h-24 w-24 text-kid-deep">
                      <SkillIcon title={item.title} />
                    </div>

                    <h3 className="text-lg font-semibold leading-snug text-kid-ink mb-5 flex-1">
                      {item.title}
                    </h3>

                    {/* Sized by the wider button, so both buttons are the same width and
                        View & Download keeps the size it always had. */}
                    <div className="inline-grid gap-3">
                      <a
                        href={item.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="kid-btn"
                      >
                        <FileText size={18} />
                        View & Download
                      </a>

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/user/assessment/class-wise-diagnostic/online/${activeSection}/${diagnosticSkillId(item.title)}`
                          )
                        }
                        className="kid-btn kid-btn-teal"
                      >
                        <Laptop size={18} />
                        Do It Online
                      </button>
                    </div>
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
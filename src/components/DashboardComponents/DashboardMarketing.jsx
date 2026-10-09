import { useNavigate } from "react-router-dom";
import { FileText, Megaphone, ArrowRight } from "lucide-react";
import { PageHero } from "../KidsUI";
import { Star } from "../KidsArt";

const tools = [
  {
    title: "Build Your Professional Admission Doc",
    description:
      "Create professional admission documents, brochures, forms, and marketing materials for your preschool.",
    icon: FileText,
    route: "/user/marketing/admission-doc",
    comingSoon: false,
  },
  {
    title: "Create Your Outreach",
    description:
      "Plan outreach campaigns and parent engagement activities to increase admissions.",
    icon: Megaphone,
    route: "/user/marketing/outreach",
    comingSoon: false,
  },
];

export default function DashboardMarketing() {
  const navigate = useNavigate();

  return (
    <div>
      <PageHero
        emoji="📣"
        title="Marketing & Parent Engagement"
        subtitle="Choose a tool to build professional marketing resources for your preschool."
      />

      {/* Cards */}
      <div className="tone-cycle grid gap-5 md:grid-cols-2">
        {tools.map((tool, index) => {
          const Icon = tool.icon;

          return (
            <div
              key={index}
              className="kid-card kid-card-hover group flex flex-col p-6 sm:p-8"
            >
              <Star className="absolute right-5 top-5 h-7 w-7" />

              {/* Icon */}
              <span className="kid-chip h-16 w-16 text-kid-deep">
                <Icon size={30} />
              </span>

              {/* Title */}
              <h2 className="mt-6 text-2xl font-semibold leading-snug text-kid-ink">
                {tool.title}
              </h2>

              {/* Description */}
              <p className="mb-8 mt-3 font-medium leading-relaxed text-kid-soft">
                {tool.description}
              </p>

              {/* Button */}
              <button
                onClick={() => !tool.comingSoon && navigate(tool.route)}
                disabled={tool.comingSoon}
                className="kid-btn mt-auto w-full py-3"
              >
                {tool.comingSoon ? (
                  "🚧 Build"
                ) : (
                  <>
                    Build
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

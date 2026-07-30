import { useNavigate } from "react-router-dom";
import { FileText, Megaphone, ArrowRight } from "lucide-react";

const tools = [
  {
    title: "Build Your Professional Admission Doc",
    description:
      "Create professional admission documents, brochures, forms, and marketing materials for your preschool.",
    icon: FileText,
    color: "from-indigo-500 to-purple-600",
    route: "/user/marketing/admission-doc",
    comingSoon: false,
  },
  {
    title: "Create Your Outreach",
    description:
      "Plan outreach campaigns and parent engagement activities to increase admissions.",
    icon: Megaphone,
    color: "from-green-500 to-emerald-600",
    route: "/user/marketing/outreach",
    comingSoon: false,
  },
];

export default function DashboardMarketing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-3">
          Marketing & Parent Engagement
        </h1>

        <p className="text-center text-gray-600 mb-12">
          Choose a tool to build professional marketing resources for your
          preschool.
        </p>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {tools.map((tool, index) => {
            const Icon = tool.icon;

            return (
              <div
                key={index}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Top Gradient */}
                <div className={`h-2 bg-gradient-to-r ${tool.color}`} />

                <div className="p-8">
                  {/* Icon */}
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${tool.color} flex items-center justify-center mb-6`}
                  >
                    <Icon size={38} className="text-white" />
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold mb-4">{tool.title}</h2>

                  {/* Description */}
                  <p className="text-gray-600 mb-8">{tool.description}</p>

                  {/* Button */}
                  <button
                    onClick={() =>
                      !tool.comingSoon && navigate(tool.route)
                    }
                    disabled={tool.comingSoon}
                    className={`w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r ${tool.color} flex justify-center items-center gap-2 transition ${
                      tool.comingSoon
                        ? "cursor-not-allowed opacity-70"
                        : "hover:scale-105"
                    }`}
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
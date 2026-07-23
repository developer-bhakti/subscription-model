import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  BookOpen,
  Newspaper,
  Megaphone,
  ArrowRight,
} from "lucide-react";

const tools = [
  {
    title: "Admission Strategy",
    description:
      "Smart admission plans to increase preschool enrollments.",
    icon: GraduationCap,
    color: "from-indigo-500 to-purple-600",
    route: "/marketing/admission-strategy-tool",
  },
  {
    title: "Worksheets to Engage Children",
    description:
      "Creative printable worksheets to keep children engaged.",
    icon: BookOpen,
    color: "from-pink-500 to-orange-500",
    route: "/marketing/worksheets",
  },
  {
    title: "Newsletter for Building Professionalism",
    description:
      "Monthly newsletters to strengthen your school's image.",
    icon: Newspaper,
    color: "from-cyan-500 to-blue-600",
    route: "school-newsletter-app",
  },
  {
    title: "Outreach Program for Admissions",
    description:
      "Marketing campaigns and outreach ideas for admissions.",
    icon: Megaphone,
    color: "from-green-500 to-emerald-600",
    route: "/marketing/outreach",
  },
];

export default function DashboardMarketing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-3">
          Marketing & Parent Engagement
        </h1>

        <p className="text-center text-gray-600 mb-12">
          Choose a marketing tool to improve admissions and engagement.
        </p>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {tools.map((tool, index) => {
            const Icon = tool.icon;

            return (
              <div
                key={index}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-2"
              >
                <div
                  className={`h-2 bg-gradient-to-r ${tool.color}`}
                />

                <div className="p-8">

                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${tool.color} flex items-center justify-center mb-6`}
                  >
                    <Icon size={38} className="text-white" />
                  </div>

                  <h2 className="text-2xl font-bold mb-4">
                    {tool.title}
                  </h2>

                  <p className="text-gray-600 mb-8">
                    {tool.description}
                  </p>

                  <button
                    onClick={() => navigate(tool.route)}
                    className={`w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r ${tool.color} flex justify-center items-center gap-2`}
                  >
                    Explore
                    <ArrowRight size={18} />
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
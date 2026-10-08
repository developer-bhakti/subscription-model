import { ACCOUNT_TYPES } from "../services/auth";

// Drives both the sidebar and the Dashboard Home cards.
// `teacherOnly` sections are hidden from parent accounts; everything without the flag
// is shared by teachers and parents alike.
export const sections = [
    { id: "home", title: "Home", path: "/user", icon: "🏠" },
    { id: "curriculum", title: " Curriculum & Academic Resources", path: "/user/curriculum", icon: "📘" },
    { id: "worksheet", title: "Classroom Activity And Worksheet Library", path: "/user/worksheet", icon: "📝" },
    { id: "online-games", title: "Online Tools for Skill Development", path: "/user/online-games", icon: "🎮" },
    { id: "assessment", title: "Assessment And Progress Tracking Tools", path: "/user/assessment", icon: "📊" },
    { id: "teacher-support", title: "Teacher Support And Training", path: "/user/teacher-support", icon: "👩‍🏫" },
    { id: "management", title: "School Operations And Management Tools", path: "/user/management", icon: "🏫", teacherOnly: true },
    { id: "audit-tools", title: "Audit Tools", path: "/user/audit-tools", icon: "🧾", teacherOnly: true },
    { id: "marketing", title: "Marketing And Parent Engagement Toolkit", path: "/user/marketing", icon: "📣", teacherOnly: true },
    { id: "school-newsletter-app", title: "School Newsletter App", path: "/user/school-newsletter-app", icon: "📰", premium: true, teacherOnly: true },
  ];

// Parents see only the five learning modules (plus Home); teachers see everything.
export const sectionsFor = (accountType) =>
  accountType === ACCOUNT_TYPES.PARENT
    ? sections.filter((section) => !section.teacherOnly)
    : sections;

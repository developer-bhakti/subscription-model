// Drives both the sidebar and the Dashboard Home cards. `short` is the one-line label the
// sidebar shows; the full `title` stays on the cards, the pages and the sidebar tooltip.
// Every account, parent or school, gets the whole list.
export const sections = [
    { id: "home", short: "Home", title: "Home", path: "/user", icon: "🏠" },
    { id: "curriculum", short: "Curriculum", title: " Curriculum & Academic Resources", path: "/user/curriculum", icon: "📘" },
    { id: "worksheet", short: "Worksheets", title: "Classroom Activity And Worksheet Library", path: "/user/worksheet", icon: "📝" },
    { id: "online-games", short: "Online Tools", title: "Online Tools for Skill Development", path: "/user/online-games", icon: "🎮" },
    { id: "assessment", short: "Assessments", title: "Assessment And Progress Tracking Tools", path: "/user/assessment", icon: "📊" },
    { id: "teacher-support", short: "Teacher Support", title: "Teacher Support And Training", path: "/user/teacher-support", icon: "👩‍🏫" },
    { id: "management", short: "School Management", title: "School Operations And Management Tools", path: "/user/management", icon: "🏫" },
    { id: "audit-tools", short: "Audit Tools", title: "Audit Tools", path: "/user/audit-tools", icon: "🧾" },
    { id: "marketing", short: "Marketing", title: "Marketing And Parent Engagement Toolkit", path: "/user/marketing", icon: "📣" },
    { id: "school-newsletter-app", short: "Newsletter", title: "School Newsletter App", path: "/user/school-newsletter-app", icon: "📰", premium: true },
  ];

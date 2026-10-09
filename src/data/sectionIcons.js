import {
  House,
  BookOpen,
  NotebookPen,
  Gamepad2,
  ChartColumn,
  GraduationCap,
  School,
  ClipboardCheck,
  Megaphone,
  Newspaper,
} from "lucide-react";

// Line icon for each dashboard section, keyed by the section's id in ./index.js.
export const sectionIcons = {
  home: House,
  curriculum: BookOpen,
  worksheet: NotebookPen,
  "online-games": Gamepad2,
  assessment: ChartColumn,
  "teacher-support": GraduationCap,
  management: School,
  "audit-tools": ClipboardCheck,
  marketing: Megaphone,
  "school-newsletter-app": Newspaper,
};

// The colour of each icon, from the greens and teals with a touch of amber, so the
// sidebar looks cheerful without leaving the green theme.
export const sectionColors = {
  home: "#16a34a",
  curriculum: "#0d9488",
  worksheet: "#d97706",
  "online-games": "#059669",
  assessment: "#4d7c0f",
  "teacher-support": "#0f766e",
  management: "#15803d",
  "audit-tools": "#d97706",
  marketing: "#0d9488",
  "school-newsletter-app": "#059669",
};

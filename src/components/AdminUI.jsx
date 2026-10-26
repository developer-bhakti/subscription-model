import {
  CircleCheck,
  CalendarClock,
  CalendarX,
  Heart,
  LoaderCircle,
  School,
} from "lucide-react";
import { ACCOUNT_TYPES, getAccountType } from "../services/auth";

// Small building blocks for the admin panel (pages/Admin.jsx): stat tiles, avatars, status
// chips and row buttons. The colours and shapes come from the kids design layer in index.css,
// so the panel looks like the rest of the app.

const STATUS_LOOK = {
  active: {
    label: "Active",
    icon: CircleCheck,
    className: "bg-[#dcfce7] text-[#166534]",
  },
  soon: {
    label: "Expiring soon",
    icon: CalendarClock,
    className: "bg-tone-butter text-[#8a5a00]",
  },
  expired: {
    label: "Expired",
    icon: CalendarX,
    className: "bg-tone-rose text-[#b4234a]",
  },
};

// The coloured pill beside an end date.
export function StatusChip({ status }) {
  const look = STATUS_LOOK[status];

  if (!look) return null;

  const Icon = look.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-bold ${look.className}`}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {look.label}
    </span>
  );
}

// School or Parent, for a subscriber's account type.
export function TypeChip({ user }) {
  const isParent = getAccountType(user) === ACCOUNT_TYPES.PARENT;
  const Icon = isParent ? Heart : School;

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-tone-aqua px-2.5 py-0.5 text-[11px] font-bold text-[#0f6b6b]">
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {isParent ? "Parent" : "School"}
    </span>
  );
}

// A pill naming the admin who owns a user (the Super Admin's view).
export function OwnerPill({ name, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-tone-lime px-3 py-1 text-xs font-bold text-[#3f6212] ${className}`}
    >
      {name}
    </span>
  );
}

const AVATAR_TONES = [
  "bg-tone-mint border-edge-mint",
  "bg-tone-lime border-edge-lime",
  "bg-tone-aqua border-edge-aqua",
  "bg-tone-butter border-edge-butter",
  "bg-tone-rose border-edge-rose",
];

// A round badge with the first letter of a name. The colour follows the name, so a person
// keeps the same colour wherever they appear.
export function Avatar({ name = "", className = "h-11 w-11 text-lg" }) {
  const letter = (name.trim()[0] || "?").toUpperCase();
  const tone = AVATAR_TONES[[...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) % AVATAR_TONES.length];

  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full border-2 font-bold text-kid-deep ${tone} ${className}`}
    >
      {letter}
    </span>
  );
}

// One figure with a label, in a pastel card: "Users 6".
export function StatTile({ icon, label, value, hint, tone = "tone-mint", className = "" }) {
  const Icon = icon;

  return (
    <div className={`kid-card ${tone} flex items-center gap-3 p-3.5 sm:gap-4 sm:p-4 ${className}`}>
      <span className="kid-chip h-11 w-11 text-kid-deep sm:h-12 sm:w-12">
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
      </span>

      <div className="min-w-0">
        <p className="text-2xl font-bold leading-none text-kid-ink sm:text-3xl">{value}</p>
        <p className="mt-1 text-xs font-bold text-kid-soft sm:text-sm">{label}</p>
        {hint && <p className="mt-0.5 hidden text-[11px] font-medium text-kid-soft sm:block">{hint}</p>}
      </div>
    </div>
  );
}

const ROW_BUTTON_TONES = {
  view: "bg-tone-mint text-kid-deep hover:bg-edge-mint",
  edit: "bg-tone-aqua text-[#0f6b6b] hover:bg-edge-aqua",
  danger: "bg-tone-rose text-[#b4234a] hover:bg-edge-rose",
};

// A small rounded button for a table row: View Users, Edit or Delete, with an icon.
export function RowButton({ icon, tone = "edit", large = false, children, ...buttonProps }) {
  const Icon = icon;

  return (
    <button
      type="button"
      {...buttonProps}
      className={`inline-flex items-center justify-center gap-1.5 rounded-full font-bold transition-colors active:translate-y-px ${
        large ? "px-2 py-2.5 text-sm" : "px-3.5 py-1.5 text-xs"
      } ${ROW_BUTTON_TONES[tone]}`}
    >
      <Icon className={large ? "h-4 w-4" : "h-3.5 w-3.5"} aria-hidden="true" />
      {children}
    </button>
  );
}

// What a list shows when it is loading or has nothing to show.
export function ListMessage({ icon, loading = false, title, children }) {
  const Icon = loading ? LoaderCircle : icon;

  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      <span className="kid-chip h-16 w-16 bg-tone-mint text-kid-deep">
        <Icon className={`h-8 w-8 ${loading ? "animate-spin" : ""}`} aria-hidden="true" />
      </span>

      <p className="mt-4 text-base font-bold text-kid-ink">{title}</p>

      {children}
    </div>
  );
}

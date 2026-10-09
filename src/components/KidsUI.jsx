import { Star } from "./KidsArt";

// Shared building blocks for the inner pages, so every page after the dashboard home has
// the same look: a soft title banner, pastel cards and green pill buttons. The colours and
// shapes come from the "kids design layer" in index.css.

// The band at the top of an inner page: the dashboard banner's soft gradient, with a white
// icon circle, the page title and a one-line subtitle.
export function PageHero({ emoji, title, subtitle, as: Heading = "h1", children }) {
  return (
    <div className="relative mb-8 overflow-hidden rounded-[28px] bg-gradient-to-r from-[#d9f3df] via-[#e4f5e6] to-[#eef9d2] px-5 py-6 sm:px-8">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 -right-8 h-36 w-36 rounded-full bg-[#ffe9a3]/60"
      />
      <Star className="pointer-events-none absolute right-6 top-4 h-8 w-8" />
      <Star className="pointer-events-none absolute bottom-4 right-24 hidden h-5 w-5 sm:block" />

      <div className="relative flex items-center gap-4">
        {emoji && <span className="kid-chip h-14 w-14 text-3xl">{emoji}</span>}

        <div className="min-w-0 pr-10">
          <Heading className="text-2xl font-semibold leading-tight text-kid-ink sm:text-3xl">
            {title}
          </Heading>

          {subtitle && (
            <p className="mt-1 text-sm font-medium text-kid-soft sm:text-base">{subtitle}</p>
          )}
        </div>
      </div>

      {children}
    </div>
  );
}

// A heading inside a page, marked with the same smiling star as the dashboard's sections.
export function SectionTitle({ children, as: Heading = "h2", className = "" }) {
  return (
    <Heading
      className={`flex items-center gap-2 text-2xl font-semibold text-kid-ink ${className}`}
    >
      <Star className="h-8 w-8 shrink-0" />
      {children}
    </Heading>
  );
}

// The quiet "← Back" button.
export function BackButton({ onClick, children = "← Back" }) {
  return (
    <button type="button" onClick={onClick} className="kid-btn kid-btn-soft">
      {children}
    </button>
  );
}

// A grid whose cards take turns being mint, lime, aqua and butter.
export function ModuleGrid({ children, columns = "md:grid-cols-2 xl:grid-cols-3" }) {
  return <div className={`tone-cycle grid grid-cols-1 gap-5 ${columns}`}>{children}</div>;
}

// A pastel card that opens a page: emoji in a white circle, a title, a short description and
// an arrow, in the same style as the dashboard home cards.
export function ModuleCard({ icon, title, description, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="kid-card kid-card-hover group flex min-h-[160px] w-full flex-col justify-between p-5 text-left"
    >
      <Star className="absolute right-4 top-4 h-6 w-6" />

      <span className="kid-chip h-14 w-14 text-3xl">{icon}</span>

      <div className="mt-5 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold leading-snug text-kid-ink">{title}</h3>

          {description && (
            <p className="mt-1.5 text-sm font-medium leading-relaxed text-kid-soft">
              {description}
            </p>
          )}
        </div>

        <span
          aria-hidden="true"
          className="kid-chip h-9 w-9 text-lg font-medium text-kid-deep transition-transform group-hover:translate-x-1"
        >
          →
        </span>
      </div>
    </button>
  );
}

import { useNavigate } from "react-router-dom";
import { BackButton, ModuleGrid, PageHero } from "../../KidsUI";
import { Star } from "../../KidsArt";
import { PHONICS_LEVELS } from "../../../data/phonicsData";

// The Phonics Skills landing page: the four levels as cards, in the order a child learns them.
export default function PhonicsSkills() {
  const navigate = useNavigate();

  return (
    <section className="mx-auto max-w-7xl">
      <div className="mb-4">
        <BackButton onClick={() => navigate("/user/worksheet")}>← Worksheets</BackButton>
      </div>

      <PageHero
        emoji="🔤"
        title="Phonics Skills"
        subtitle="Four steps from knowing the letters to reading rhymes. Start at Level 1 and climb up!"
      />

      <ModuleGrid columns="sm:grid-cols-2 xl:grid-cols-4">
        {PHONICS_LEVELS.map((level) => (
          <button
            key={level.level}
            type="button"
            onClick={() => navigate(level.path)}
            aria-label={`Level ${level.level}: ${level.title}`}
            className="kid-card kid-card-hover group flex min-h-[280px] w-full flex-col justify-between p-5 text-left"
          >
            <Star className="absolute right-4 top-4 h-6 w-6" />

            <div>
              <div className="flex items-center gap-3">
                <span className="kid-chip h-16 w-16 text-4xl">{level.icon}</span>
                <span className="kid-pill">LEVEL {level.level}</span>
              </div>

              <div
                className="mt-4 rounded-2xl bg-white/70 px-3 py-2 text-center text-lg font-bold tracking-wide text-kid-deep"
                aria-hidden="true"
              >
                {level.preview}
              </div>
            </div>

            <div className="mt-5">
              <h3 className="text-lg font-semibold leading-snug text-kid-ink">{level.title}</h3>

              <p className="mt-1.5 text-sm font-medium leading-relaxed text-kid-soft">{level.description}</p>

              <div className="mt-4 flex items-center justify-between gap-3">
                <span
                  className="flex items-center gap-1.5"
                  role="img"
                  aria-label={`Step ${level.level} of ${PHONICS_LEVELS.length}`}
                >
                  {PHONICS_LEVELS.map((l) => (
                    <span
                      key={l.level}
                      className={`h-2.5 w-6 rounded-full ${l.level <= level.level ? "bg-kid-green" : "bg-white/80"}`}
                    />
                  ))}
                </span>

                <span
                  aria-hidden="true"
                  className="kid-chip h-9 w-9 text-lg font-medium text-kid-deep transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </div>
            </div>
          </button>
        ))}
      </ModuleGrid>
    </section>
  );
}

import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { BackButton, PageHero, SectionTitle } from "../../KidsUI";
import { Star } from "../../KidsArt";
import { PHONICS_LEVELS } from "../../../data/phonicsData";
import { getPhonicsFiles } from "../../../data/phonicsFiles";
import PhonicsWorksheets from "./PhonicsWorksheets";

// "Phonics Worksheets" in Worksheets & Activities. It lists the four Phonics levels as cards, the
// same way the theme-based colouring worksheets list their themes, and a level opens to its
// printable pages. The pages are not copied: they are the very ones in Phonics Skills, read from the
// same files (getPhonicsFiles) and shown by the same component (PhonicsWorksheets), so a page added
// to a level's folder appears in both places. The chosen level lives in the address (?level=2), so
// the browser's Back button returns to the levels.

const worksheetCount = (level) => getPhonicsFiles(level).pages.length;

export default function PhonicsWorksheetsHub() {
  const [params, setParams] = useSearchParams();
  const topRef = useRef(null);

  // Anything that is not one of the four levels in the address shows the list of levels.
  const active = PHONICS_LEVELS.find((item) => String(item.level) === params.get("level"));

  // Each screen starts at its top, wherever the last one was scrolled to.
  useEffect(() => {
    topRef.current?.scrollIntoView({ block: "start" });
  }, [active]);

  if (active) {
    const count = worksheetCount(active.level);

    return (
      <section ref={topRef}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <BackButton onClick={() => setParams({})}>← Back to levels</BackButton>
          </div>

          <div className="mb-8">
            <SectionTitle as="h1" className="text-3xl md:text-4xl">
              Level {active.level} – {active.title}
            </SectionTitle>

            <p className="mt-1 font-medium text-kid-soft">
              {count} {count === 1 ? "worksheet" : "worksheets"} ready to print
            </p>
          </div>

          <PhonicsWorksheets level={active.level} />
        </div>
      </section>
    );
  }

  return (
    <section ref={topRef}>
      <div className="mx-auto max-w-7xl">
        <PageHero
          emoji="🔤"
          title="Phonics Worksheets"
          subtitle="Classroom activity: printable phonics worksheets, level by level."
        />

        <div className="tone-cycle grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {PHONICS_LEVELS.map((item) => {
            const { workbook } = getPhonicsFiles(item.level);
            const count = worksheetCount(item.level);

            return (
              <div key={item.level} className="kid-card kid-card-hover flex flex-col overflow-hidden">
                <Star className="absolute right-4 top-4 h-6 w-6" />

                <div className="flex flex-1 flex-col items-center p-7 text-center">
                  <span className="kid-chip mb-4 h-24 w-24 text-6xl" role="img" aria-hidden="true">
                    {item.icon}
                  </span>

                  <span className="kid-pill mb-3">LEVEL {item.level}</span>

                  <h2 className="mb-2 text-xl font-semibold text-kid-ink">{item.title}</h2>

                  <p className="mb-4 flex-1 text-sm font-medium leading-6 text-kid-soft">
                    {item.description}
                  </p>

                  <p className="mb-5 text-sm font-bold text-kid-deep">
                    {count} {count === 1 ? "worksheet" : "worksheets"}
                    {workbook && " + full workbook"}
                  </p>

                  <button
                    type="button"
                    onClick={() => setParams({ level: String(item.level) })}
                    aria-label={`View Level ${item.level} worksheets: ${item.title}`}
                    className="kid-btn px-10 py-3"
                  >
                    View
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

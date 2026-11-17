import { useEffect, useRef, useState } from "react";
import { PHONICS_LEVELS } from "../../../data/phonicsData";
import { getPhonicsFiles } from "../../../data/phonicsFiles";

// The "Download Pages" tab of a Phonics level: every printable page the school has added for that
// level as a thumbnail with a Download button, a larger preview when a page is tapped, and the
// level's full PDF workbook when there is one.

// Same-origin files, so the `download` attribute saves them under their own file name.
function DownloadLink({ href, name, className = "", children }) {
  return (
    <a href={href} download={name} className={`kid-btn ${className}`}>
      {children}
    </a>
  );
}

function PagePreview({ pages, index, levelTitle, onClose, onMove }) {
  const page = pages[index];
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();

    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onMove(-1);
      if (event.key === "ArrowRight") onMove(1);
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onMove]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Letter ${page.letter} page`}
      onClick={onClose}
    >
      <div
        className="kid-card tone-white flex max-h-full w-full max-w-3xl flex-col p-3 sm:p-4"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-bold text-kid-ink sm:text-xl">
            Letter {page.letter}
            <span className="ml-2 text-sm font-semibold text-kid-soft">
              {index + 1} of {pages.length}
            </span>
          </h3>

          <div className="flex flex-wrap items-center gap-2">
            <DownloadLink href={page.image} name={page.name} className="px-4 py-2 text-sm">
              ⬇ Download
            </DownloadLink>

            {page.pdf && (
              <DownloadLink href={page.pdf.url} name={page.pdf.name} className="kid-btn-soft px-4 py-2 text-sm">
                ⬇ PDF
              </DownloadLink>
            )}

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="kid-btn kid-btn-soft px-4 py-2 text-sm"
            >
              ✕ Close
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-auto rounded-2xl bg-white">
          <img
            src={page.image}
            alt={`${levelTitle}: letter ${page.letter}`}
            className="mx-auto block h-auto max-h-[70vh] w-auto max-w-full object-contain"
          />
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <button
            type="button"
            className="kid-btn kid-btn-soft px-4 py-2 text-sm"
            onClick={() => onMove(-1)}
            disabled={pages.length < 2}
          >
            ← Previous
          </button>

          <button
            type="button"
            className="kid-btn px-4 py-2 text-sm"
            onClick={() => onMove(1)}
            disabled={pages.length < 2}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

// A button that opens one letter's printed page in the preview window (with its Download button),
// so an activity can point at the worksheet it is based on. Shows nothing if the page doesn't exist.
export function WorksheetButton({ level, letter, children = "Worksheet page" }) {
  const meta = PHONICS_LEVELS[level - 1];
  const { pages } = getPhonicsFiles(level);
  const [open, setOpen] = useState(null);
  const index = pages.findIndex((page) => page.letter === letter);

  if (index < 0) return null;

  return (
    <>
      <button type="button" className="kid-btn kid-btn-soft" onClick={() => setOpen(index)}>
        <span aria-hidden="true">📄</span> {children}
      </button>

      {open !== null && (
        <PagePreview
          pages={pages}
          index={open}
          levelTitle={meta.title}
          onClose={() => setOpen(null)}
          onMove={(step) => setOpen((i) => (i === null ? i : (i + step + pages.length) % pages.length))}
        />
      )}
    </>
  );
}

export default function PhonicsWorksheets({ level }) {
  const meta = PHONICS_LEVELS[level - 1];
  const { pages, workbook } = getPhonicsFiles(level);
  const [open, setOpen] = useState(null);

  const move = (step) => setOpen((i) => (i === null ? i : (i + step + pages.length) % pages.length));
  const close = () => setOpen(null);

  if (pages.length === 0 && !workbook) {
    return (
      <div className="kid-card tone-white mx-auto max-w-xl p-8 text-center">
        <div className="text-6xl" aria-hidden="true">
          📂
        </div>

        <p className="mt-3 text-lg font-semibold text-kid-soft">
          There are no printable pages for this level yet.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 flex flex-col items-center gap-3 text-center">
        <p className="text-base font-semibold text-kid-soft sm:text-lg">
          Printable pages for Level {meta.level} – {meta.title}. Tap a page to see it bigger, or download it.
        </p>

        {workbook && (
          <DownloadLink href={workbook.url} name={workbook.name} className="kid-btn-sun px-6 py-3 text-base">
            📥 Download the full workbook (PDF)
          </DownloadLink>
        )}
      </div>

      <div className="tone-cycle grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 xl:grid-cols-6">
        {pages.map((page, i) => (
          <div key={page.letter} className="kid-card kid-card-hover flex flex-col p-2 sm:p-3">
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Preview letter ${page.letter}`}
              className="block overflow-hidden rounded-xl bg-white shadow-sm"
            >
              <img
                src={page.image}
                alt={`${meta.title}: letter ${page.letter}`}
                loading="lazy"
                decoding="async"
                className="aspect-[1055/1491] w-full object-cover object-top"
              />
            </button>

            <p className="mt-2 text-center text-base font-bold text-kid-ink sm:text-lg">Letter {page.letter}</p>

            <DownloadLink
              href={page.image}
              name={page.name}
              className="mt-2 w-full px-3 py-2 text-sm"
            >
              ⬇ Download
            </DownloadLink>
          </div>
        ))}
      </div>

      {open !== null && (
        <PagePreview
          pages={pages}
          index={open}
          levelTitle={meta.title}
          onClose={close}
          onMove={move}
        />
      )}
    </div>
  );
}

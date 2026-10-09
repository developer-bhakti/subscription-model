import React, { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { PageHero, BackButton } from "../KidsUI";
import { Star } from "../KidsArt";
import SoundBookPlayer from "./SoundBookPlayer";
import { soundBooks } from "./soundBookData";

// The Sound Book is three levels deep: the classes, then the sound books in a class, then
// one book. Where you are lives in the address (?class=pg&book=alphabet), so the
// browser's Back button steps up one level and a book can be bookmarked.

// "Sound Books › PG › Alphabet", with every step but the last one a way back.
const Crumbs = ({ trail }) => (
  <nav
    aria-label="Breadcrumb"
    className="flex flex-wrap items-center gap-1.5 text-sm font-semibold text-kid-soft"
  >
    {trail.map((step, i) => (
      <React.Fragment key={step.label}>
        {i > 0 && <span aria-hidden="true">›</span>}

        {step.onClick ? (
          <button
            type="button"
            onClick={step.onClick}
            className="rounded-full px-2 py-1 text-kid-deep transition-colors hover:bg-tone-mint"
          >
            {step.label}
          </button>
        ) : (
          <span aria-current="page" className="px-2 py-1 text-kid-ink">
            {step.label}
          </span>
        )}
      </React.Fragment>
    ))}
  </nav>
);

const SoundBooks = () => {
  const [params, setParams] = useSearchParams();
  const topRef = useRef(null);

  const classId = params.get("class");
  const bookId = params.get("book");

  // Only a class that has sound books can be opened. Anything else in the address, such as
  // a class that is still coming soon, falls back to the list of classes.
  const activeClass = soundBooks.find((item) => item.id === classId && item.categories);
  const activeBook = activeClass?.categories.find((item) => item.id === bookId);

  // Each level starts at its top, wherever the last one was scrolled to.
  useEffect(() => {
    topRef.current?.scrollIntoView({ block: "start" });
  }, [classId, bookId]);

  const openClasses = () => setParams({});
  const openClass = (id) => setParams({ class: id });
  const openBook = (id) => setParams({ class: activeClass.id, book: id });

  // ONE BOOK
  if (activeBook) {
    return (
      <section ref={topRef} className="font-playful">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <BackButton onClick={() => openClass(activeClass.id)}>
            ← Back to {activeClass.id.toUpperCase()} Sound Books
          </BackButton>

          <Crumbs
            trail={[
              { label: "Sound Books", onClick: openClasses },
              { label: activeClass.id.toUpperCase(), onClick: () => openClass(activeClass.id) },
              { label: activeBook.title },
            ]}
          />
        </div>

        {/* Keyed by book, so every book starts again from its first page */}
        <SoundBookPlayer key={activeBook.id} book={activeBook} />
      </section>
    );
  }

  // THE SOUND BOOKS IN A CLASS
  if (activeClass) {
    return (
      <section ref={topRef} className="font-playful">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <BackButton onClick={openClasses}>← Back to Sound Books</BackButton>

          <Crumbs
            trail={[
              { label: "Sound Books", onClick: openClasses },
              { label: activeClass.id.toUpperCase() },
            ]}
          />
        </div>

        <PageHero
          emoji={activeClass.emoji}
          title={`${activeClass.id.toUpperCase()} Sound Books`}
          subtitle="Pick a sound book, then tap the pictures to hear them."
        />

        {/* Five cards, so the last row is centred rather than left with a gap */}
        <div className="flex flex-wrap justify-center gap-6">
          {activeClass.categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => openBook(category.id)}
              aria-label={category.title}
              className={`kid-card kid-card-hover ${category.tone} group flex min-h-62.5 w-full flex-col justify-between p-6 text-left sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]`}
            >
              <Star className="absolute right-4 top-4 h-7 w-7" />

              {/* A little sticker trio of what is inside */}
              <div aria-hidden="true" className="flex items-end justify-center gap-2 pb-2 pt-4">
                <span className="kid-chip h-14 w-14 -rotate-6 text-2xl font-bold text-kid-deep">
                  {category.art[0]}
                </span>

                <span className="kid-chip h-24 w-24 text-5xl font-bold text-kid-deep">
                  {category.art[1]}
                </span>

                <span className="kid-chip h-14 w-14 rotate-6 text-2xl font-bold text-kid-deep">
                  {category.art[2]}
                </span>
              </div>

              <div className="mt-4 flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold leading-snug text-kid-ink">
                    {category.title}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-kid-soft">{category.blurb}</p>
                </div>

                <span
                  aria-hidden="true"
                  className="kid-chip h-10 w-10 text-lg font-medium text-kid-deep transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>
    );
  }

  // THE CLASSES
  return (
    <section ref={topRef} className="font-playful">
      <PageHero
        emoji="🔊"
        title="Sound Books"
        subtitle="Phonics sound books for every preschool class."
      />

      <div className="tone-cycle grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {soundBooks.map((book) => {
          const details = (
            <div className="flex flex-1 flex-col items-center p-6 text-center">
              <div className="kid-chip mb-5 h-20 w-20 text-4xl">{book.emoji}</div>

              <h2 className="mb-2 text-xl font-semibold leading-snug text-kid-ink">
                {book.title}
              </h2>

              <span className="kid-pill mb-4">{book.age}</span>

              <p className="mb-6 flex-1 text-[15px] font-medium leading-7 text-kid-soft">
                {book.description}
              </p>

              {book.categories ? (
                <span className="kid-btn kid-btn-sun">▶ Open</span>
              ) : book.pdf ? (
                <a
                  href={book.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kid-btn"
                >
                  View & Download
                </a>
              ) : (
                <span className="inline-block cursor-not-allowed rounded-full bg-white/70 px-6 py-2.5 text-sm font-semibold text-kid-soft">
                  Coming Soon
                </span>
              )}
            </div>
          );

          // A class with sound books is one big button; the rest are not clickable at all.
          return book.categories ? (
            <button
              key={book.id}
              type="button"
              onClick={() => openClass(book.id)}
              className="kid-card kid-card-hover flex flex-col overflow-hidden ring-4 ring-kid-sun/60"
            >
              {details}
            </button>
          ) : (
            <div
              key={book.id}
              aria-disabled="true"
              className="kid-card flex flex-col overflow-hidden"
            >
              {details}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SoundBooks;

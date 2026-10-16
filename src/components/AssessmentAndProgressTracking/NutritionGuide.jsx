import React from "react";
import { ChevronDown } from "lucide-react";
import {
  AGE_BANDS,
  FOOD_GROUPS,
  SOURCE_TEXT,
  dailyAmount,
  nutrientsFor,
} from "../../data/nutritionGuide";

// ---- small formatting helpers ----------------------------------------------------------------------

const FRACTIONS = { 0.25: "¼", 0.5: "½", 1.5: "1½", 2.5: "2½" };
const showPortions = (n) => FRACTIONS[n] ?? String(n);
const portionWord = (n) => (n > 1 ? "portions" : "portion");

// "4", or "8–10" where the table splits girls and boys.
const range = ([low, high], format = String) =>
  low === high ? format(low) : `${format(low)}–${format(high)}`;

const showKcal = (n) => String(Math.round(n));
const showMg = (n) => (n === 0 ? "0" : n < 0.5 ? "<1" : String(Math.round(n)));
// One decimal, rounded the usual way (toFixed would show 0.15 as 0.1).
const showGrams = (n) =>
  n === 0 ? "0" : n < 0.05 ? "<0.1" : (Math.round(n * 10) / 10).toFixed(1);

// ---- one food group, as a collapsible item ---------------------------------------------------------

// What a group asks for in a day, added up over its sections (vegetables has two).
function groupTotal(group, bandId) {
  const parts = group.sections.map((section) => dailyAmount(section, bandId));

  if (parts.some((part) => part === null)) return null;

  const sum = (pick) => [
    parts.reduce((total, part) => total + pick(part)[0], 0),
    parts.reduce((total, part) => total + pick(part)[1], 0),
  ];

  return {
    portions: sum((part) => part.portions),
    amount: sum((part) => part.amount),
    unit: group.sections[0].portion.unit,
  };
}

function FoodNames({ food }) {
  return (
    <>
      {food.name}
      {food.source === "usda" && (
        <sup className="ml-0.5 text-slate-500" title="USDA FoodData Central">
          †
        </sup>
      )}
      {food.detail && (
        <span className="block text-xs font-normal text-slate-500">
          {food.detail}
        </span>
      )}
    </>
  );
}

function Section({ section, bandId, band, under2, showTitle }) {
  const daily = dailyAmount(section, bandId);
  const quantity = section.portion
    ? `${section.portion.amount} ${section.portion.unit}`
    : "No set amount";

  // The nutrients are shown for one portion, or for 100 g where the group has no portion.
  const grams = section.portion ? section.portion.amount : 100;
  const basis = section.portion
    ? `Nutrients in one portion (${quantity}${section.portion.note ? `, ${section.portion.note}` : ""})`
    : "Nutrients per 100 g";

  const split = daily && daily.portions[0] !== daily.portions[1];

  return (
    <div className="mb-5 last:mb-0">
      {showTitle && (
        <h4 className="mb-2 text-base font-semibold text-kid-deep">
          {section.title}
        </h4>
      )}

      {/* How much a day, for the chosen age */}
      <div className="mb-3 space-y-1 rounded-xl bg-tone-mint px-3 py-2 text-sm text-kid-ink">
        {section.portion && (
          <p>
            <span className="font-semibold">One portion:</span> {quantity}
            {section.portion.note ? ` (${section.portion.note})` : ""}
          </p>
        )}

        {daily && !under2 && (
          <p>
            <span className="font-semibold">Each day, {band.label}:</span>{" "}
            {range(daily.portions, showPortions)}{" "}
            {portionWord(daily.portions[1])} ={" "}
            {range(daily.amount)} {section.portion.unit}
            {split &&
              ` (girls ${showPortions(daily.portions[0])}, boys ${showPortions(daily.portions[1])})`}
          </p>
        )}

        {section.portion && !daily && !under2 && (
          <p className="text-slate-600">
            Choose an age to see how many portions a day.
          </p>
        )}

        {section.under2 && under2 && (
          <p className="font-semibold">{section.under2}</p>
        )}

        {section.under2 && !under2 && daily && (
          <p className="text-slate-600">{section.under2}</p>
        )}

        {bandId && section.notes?.[bandId] && <p>{section.notes[bandId]}</p>}

        {section.extra && <p className="text-slate-600">{section.extra}</p>}
      </div>

      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {basis}
      </p>

      {/* Narrow cards: one small card per food */}
      <ul className="space-y-2 @lg:hidden">
        {section.foods.map((food) => {
          const n = nutrientsFor(food, grams);

          return (
            <li
              key={food.name}
              className="rounded-xl bg-white p-3 ring-1 ring-slate-200"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-semibold text-kid-ink">
                  <FoodNames food={food} />
                </p>

                <p className="shrink-0 text-sm text-slate-600">{quantity}</p>
              </div>

              <dl className="mt-2 grid grid-cols-4 gap-1 text-center">
                {[
                  ["Calories (kcal)", showKcal(n.kcal)],
                  ["Protein (g)", showGrams(n.protein)],
                  ["Calcium (mg)", showMg(n.calcium)],
                  ["Iron (mg)", showGrams(n.iron)],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-[11px] leading-tight text-slate-500">
                      {label}
                    </dt>
                    <dd className="text-sm font-semibold text-kid-ink">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          );
        })}
      </ul>

      {/* Wide cards: a table */}
      <div className="hidden overflow-hidden rounded-xl ring-1 ring-slate-200 @lg:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-kid-deep text-white">
            <tr>
              <th scope="col" className="px-3 py-3 font-semibold">
                Food item
              </th>
              <th scope="col" className="px-3 py-3 font-semibold">
                Recommended quantity
              </th>
              <th scope="col" className="px-3 py-3 text-right font-semibold">
                Calories (kcal)
              </th>
              <th scope="col" className="px-3 py-3 text-right font-semibold">
                Protein (g)
              </th>
              <th scope="col" className="px-3 py-3 text-right font-semibold">
                Calcium (mg)
              </th>
              <th scope="col" className="px-3 py-3 text-right font-semibold">
                Iron (mg)
              </th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {section.foods.map((food) => {
              const n = nutrientsFor(food, grams);

              return (
                <tr key={food.name} className="border-t border-slate-200">
                  <th scope="row" className="px-3 py-3 font-semibold text-kid-ink">
                    <FoodNames food={food} />
                  </th>
                  <td className="px-3 py-3 text-slate-600">{quantity}</td>
                  <td className="px-3 py-3 text-right">{showKcal(n.kcal)}</td>
                  <td className="px-3 py-3 text-right">{showGrams(n.protein)}</td>
                  <td className="px-3 py-3 text-right">{showMg(n.calcium)}</td>
                  <td className="px-3 py-3 text-right">{showGrams(n.iron)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {section.others && (
        <p className="mt-2 text-sm text-slate-600">
          {section.others} can be used in the same way.
        </p>
      )}
    </div>
  );
}

function FoodGroup({ group, bandId, band, months }) {
  const total = groupTotal(group, bandId);
  const sugarRule = group.sections.find((section) => section.under2);

  // Younger than two: no added sugar, whichever age group the figures are shown for.
  const under2 =
    Boolean(sugarRule) &&
    bandId !== null &&
    (bandId === "6-12m" || (months !== null && months < 24));

  let summary = null;

  if (under2) summary = "None under 2 years";
  else if (total)
    summary = `${range(total.portions, showPortions)} ${portionWord(total.portions[1])} · ${range(total.amount)} ${total.unit} a day`;
  else if (!group.sections[0].portion) summary = "No set daily amount";

  const hasUsda = group.sections.some((section) =>
    section.foods.some((food) => food.source === "usda"),
  );

  return (
    <details className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <summary className="flex cursor-pointer list-none items-center gap-3 p-3 pr-4 marker:content-none [&::-webkit-details-marker]:hidden">
        <span
          className={`kid-chip h-11 w-11 text-2xl ${group.tint}`}
          aria-hidden="true"
        >
          {group.emoji}
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-lg font-semibold leading-snug text-kid-ink">
            {group.name}
          </span>

          {summary && (
            <span className="block text-sm font-medium text-kid-deep">
              {summary}
            </span>
          )}
        </span>

        <ChevronDown
          size={22}
          aria-hidden="true"
          className="shrink-0 text-kid-deep transition-transform group-open:rotate-180"
        />
      </summary>

      <div className="@container border-t border-slate-100 px-3 pb-4 pt-4">
        {group.sections.map((section, index) => (
          <Section
            key={section.title ?? index}
            section={section}
            bandId={bandId}
            band={band}
            under2={under2}
            showTitle={group.sections.length > 1}
          />
        ))}

        {hasUsda && (
          <p className="mt-3 text-xs text-slate-500">{SOURCE_TEXT.usda}</p>
        )}
      </div>
    </details>
  );
}

// ---- the whole guide -------------------------------------------------------------------------------

// `bandId` is the age group the amounts are shown for (null until one is chosen), `months` the child's exact
// age when it was chosen in the form, and `underSix` is set for a baby younger than the table covers.
export default function NutritionGuide({
  bandId,
  months,
  underSix,
  onBandChange,
}) {
  const band = AGE_BANDS.find((item) => item.id === bandId) ?? null;

  return (
    <div>
      {/* Age group for the daily amounts */}
      <p className="mb-2 text-sm font-semibold text-kid-ink" id="guide-age-label">
        Daily amounts for a child aged
      </p>

      <div
        role="radiogroup"
        aria-labelledby="guide-age-label"
        className="mb-3 flex flex-wrap gap-2"
      >
        {AGE_BANDS.map((item) => {
          const selected = item.id === bandId;

          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onBandChange(item.id)}
              className={`min-h-10 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                selected
                  ? "bg-kid-deep text-white"
                  : "bg-white text-kid-deep hover:bg-tone-mint"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {underSix && (
        <p
          role="note"
          className="mb-4 rounded-xl bg-tone-butter px-3 py-2 text-sm font-medium text-kid-ink"
        >
          ICMR-NIN advises exclusive breastfeeding for the first six months, so
          the daily food amounts start from 6 months.
        </p>
      )}

      {!bandId && !underSix && (
        <p className="mb-4 text-sm text-slate-600">
          Choose the child's age in the form, or tap an age group above, to see
          how much of each food group a day.
        </p>
      )}

      {/* Every group stays closed until it is opened, and each opens on its own */}
      <div className="space-y-3">
        {FOOD_GROUPS.map((group) => (
          <FoodGroup
            key={group.id}
            group={group}
            bandId={bandId}
            band={band}
            months={months}
          />
        ))}
      </div>

      <div className="mt-5 space-y-1 text-xs text-slate-600">
        <p>{SOURCE_TEXT.portions}</p>
        <p>{SOURCE_TEXT.ifct}</p>
        <p>
          This guide is general information. It does not replace advice from a
          paediatrician or dietitian.
        </p>
      </div>
    </div>
  );
}

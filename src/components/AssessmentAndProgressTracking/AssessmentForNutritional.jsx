import React, { useRef, useState } from "react";
import {
  User,
  Calculator,
  Salad,
  BookOpen,
} from "lucide-react";
import { PageHero } from "../KidsUI";
import FoodCalorieCalculator from "./FoodCalorieCalculator";
import NutritionGuide from "./NutritionGuide";
import { bandForMonths } from "../../data/nutritionGuide";

// The two tabs on the right: the calculator that adds up the foods eaten, and the guide of set amounts by age.
const TABS = [
  { id: "calculator", label: "Calorie Calculator", Icon: Salad },
  { id: "guide", label: "Predefined Calorie Guide", Icon: BookOpen },
];

// Calories a child needs per kg of body weight per day, by completed years of age. These are the
// rates the page has always used: under 1 year, 1 to 3, 4 to 6, 7 to 9 and 10 to 12 years.
const CALORIES_PER_KG = [
  { fromYears: 0, perKg: 100 },
  { fromYears: 1, perKg: 95 },
  { fromYears: 4, perKg: 85 },
  { fromYears: 7, perKg: 70 },
  { fromYears: 10, perKg: 55 },
];

const perKgForAge = (months) => {
  const years = Math.floor(months / 12);

  return CALORIES_PER_KG.filter((band) => years >= band.fromYears).pop().perKg;
};

// "6 months", "1 year", "1 year 6 months", "2 years"...
const ageLabel = (months) => {
  if (months === 0) return "Under 6 months";

  const years = Math.floor(months / 12);
  const rest = months % 12;

  return [
    years ? `${years} ${years === 1 ? "year" : "years"}` : "",
    rest ? `${rest} months` : "",
  ]
    .filter(Boolean)
    .join(" ");
};

// The ages to choose from: every six months, from under 6 months up to 12 years 6 months.
const AGE_OPTIONS = Array.from({ length: 26 }, (_, index) => index * 6);

const AssessmentForNutritional = () => {
  const [ageMonths, setAgeMonths] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState(null);

  const [tab, setTab] = useState("calculator");
  const tabRefs = useRef({});

  // Left and right arrows move between the tabs.
  const handleTabKeyDown = (e) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];

    if (!step) return;

    e.preventDefault();

    const index = TABS.findIndex((item) => item.id === tab);
    const next = TABS[(index + step + TABS.length) % TABS.length];

    setTab(next.id);
    tabRefs.current[next.id]?.focus();
  };

  // The guide's daily amounts follow the age chosen in the form, unless an age group is tapped in the guide.
  const [pickedBand, setPickedBand] = useState(null);
  const monthsChosen = ageMonths === "" ? null : Number(ageMonths);
  const guideBand = pickedBand ?? (monthsChosen === null ? null : bandForMonths(monthsChosen));

  const handleCalculate = () => {
    const kg = Number(weight);

    if (ageMonths === "" || !(kg > 0)) {
      alert("Please select the child's age and enter a weight");
      return;
    }

    setResult(Math.round(perKgForAge(Number(ageMonths)) * kg));
  };

  return (
    <section>
      <div className="max-w-7xl mx-auto">

        {/* TITLE */}
        <PageHero
          emoji="🍎"
          title="Nutritional Deficiency Assessment Tool"
          subtitle="Calculate daily calorie needs and understand ideal nutritional intake for children."
        />

        {/* GRID */}
        {/* The right side holds tables, so it gets the wider share */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">

          {/* LEFT CARD */}
          <div className="kid-card tone-mint p-6 md:p-8">

            <div className="flex items-center gap-3 mb-6">
              <div className="kid-chip h-12 w-12 text-kid-deep">
                <User size={24} />
              </div>

              <h3 className="text-2xl font-semibold text-kid-ink">
                Child Assessment
              </h3>
            </div>

            {/* AGE */}
            <div className="mb-6">
              <label
                htmlFor="child-age"
                className="block mb-2 font-semibold text-slate-700"
              >
                Age of the Child
              </label>

              <select
                id="child-age"
                value={ageMonths}
                onChange={(e) => {
                  setAgeMonths(e.target.value);
                  setResult(null);
                  setPickedBand(null);
                }}
                className="kid-input py-3.5"
              >
                <option value="">Select Age</option>

                {AGE_OPTIONS.map((months) => (
                  <option key={months} value={months}>
                    {ageLabel(months)}
                  </option>
                ))}
              </select>
            </div>

            {/* WEIGHT */}
            <div className="mb-6">
              <label
                htmlFor="child-weight"
                className="block mb-2 font-semibold text-slate-700"
              >
                Weight of the Child (kg)
              </label>

              <input
                id="child-weight"
                type="number"
                placeholder="Enter Weight in KG"
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value);
                  setResult(null);
                }}
                className="kid-input py-3.5"
              />
            </div>

            {/* BUTTON */}
            <button
              onClick={handleCalculate}
              className="kid-btn w-full py-3.5 text-lg"
            >
              <Calculator size={22} />
              Calculate Daily Calories
            </button>

            {/* RESULT */}
            {result !== null && (
              <div
                role="status"
                className="kid-card tone-white mt-8 p-6 text-xl font-bold text-slate-900"
              >
                Total Daily Calories Needed:{" "}
                <span className="whitespace-nowrap">{result} kcal/day</span>
              </div>
            )}
          </div>

          {/* RIGHT CARD */}
          <div className="kid-card tone-aqua p-6 md:p-8">

            {/* TABS */}
            <div
              role="tablist"
              aria-label="Nutrition tools"
              onKeyDown={handleTabKeyDown}
              className="mb-6 grid grid-cols-2 gap-2 rounded-full bg-white/70 p-1.5"
            >
              {TABS.map((item) => {
                const { id, label, Icon } = item;
                const selected = id === tab;

                return (
                  <button
                    key={id}
                    ref={(node) => {
                      tabRefs.current[id] = node;
                    }}
                    id={`nutrition-tab-${id}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`nutrition-panel-${id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setTab(id)}
                    className={`flex min-h-12 items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-semibold leading-tight transition-colors sm:text-base ${
                      selected
                        ? "bg-kid-deep text-white shadow-sm"
                        : "text-kid-deep hover:bg-white"
                    }`}
                  >
                    <Icon size={20} aria-hidden="true" className="shrink-0" />
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Both panels stay mounted so the foods added and the groups opened are kept when switching */}
            <div
              role="tabpanel"
              id="nutrition-panel-calculator"
              aria-labelledby="nutrition-tab-calculator"
              hidden={tab !== "calculator"}
            >
              <FoodCalorieCalculator neededKcal={result} />
            </div>

            <div
              role="tabpanel"
              id="nutrition-panel-guide"
              aria-labelledby="nutrition-tab-guide"
              hidden={tab !== "guide"}
            >
              <NutritionGuide
                bandId={guideBand}
                months={pickedBand ? null : monthsChosen}
                underSix={pickedBand === null && monthsChosen !== null && monthsChosen < 6}
                onBandChange={setPickedBand}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssessmentForNutritional;
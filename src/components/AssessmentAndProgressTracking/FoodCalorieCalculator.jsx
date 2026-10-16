import React, { useEffect, useRef, useState } from "react";
import { Plus, Table, Trash2, X } from "lucide-react";
import { FOOD_CHOICES } from "../../data/nutritionGuide";

const STORAGE_KEY = "ecce-custom-foods";

// Pure fat gives about 9 kcal a gram, so no food can have more than 900 kcal per 100 g.
const MAX_KCAL_PER_100 = 900;

// Quick amounts to pick, as multiples of one portion.
const PORTION_CHOICES = [
  { times: 0.5, label: "½ portion" },
  { times: 1, label: "1 portion" },
  { times: 2, label: "2 portions" },
];

// The columns of the table that hold amounts: how each is named and how many decimals it is shown with.
const NUTRIENTS = [
  { key: "kcal", label: "Calories (kcal)", digits: 0 },
  { key: "protein", label: "Protein (g)", digits: 1 },
  { key: "calcium", label: "Calcium (mg)", digits: 0 },
  { key: "iron", label: "Iron (mg)", digits: 1 },
];

// ---- foods the user adds themselves, remembered in this browser -----------------------------------

const isFood = (item) =>
  Boolean(item) &&
  typeof item.id === "string" &&
  typeof item.name === "string" &&
  Number.isFinite(item.kcalPer100);

const loadCustomFoods = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

    return Array.isArray(saved) ? saved.filter(isFood) : [];
  } catch {
    return [];
  }
};

const saveCustomFoods = (foods) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(foods));
  } catch {
    // private mode: the foods still work for this visit, they just won't be remembered
  }
};

// ---- small helpers ------------------------------------------------------------------------------

// What a food gives per 100 g, in the same shape for every food. A value the user did not enter is null.
const per100Of = (food) => ({
  kcal: food.kcalPer100,
  protein: food.protein ?? null,
  calcium: food.calcium ?? null,
  iron: food.iron ?? null,
});

// How much of one nutrient is in what was eaten, counted in the last decimal shown (tenths of a gram, say) so
// that the rows add up exactly to the total. null where the food has no value for it.
const scaledAmount = (entry, { key, digits }) => {
  const per100 = entry.per100[key];
  const quantity = Number(entry.quantity);

  if (per100 === null) return null;

  return quantity > 0 ? Math.round(((per100 * quantity) / 100) * 10 ** digits) : 0;
};

const showScaled = (scaled, digits) => (scaled === 0 ? "0" : (scaled / 10 ** digits).toFixed(digits));

const optionalNumber = (value) => (value.trim() === "" ? null : Number(value));

const th = "px-3 py-3 text-sm font-semibold";

// ---- the calculator -------------------------------------------------------------------------------

// `neededKcal` is the child's daily need from the form on the left (null until it is calculated).
export default function FoodCalorieCalculator({ neededKcal }) {
  const [customFoods, setCustomFoods] = useState(loadCustomFoods);

  const [foodId, setFoodId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [entries, setEntries] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [error, setError] = useState("");
  const [announcement, setAnnouncement] = useState("");

  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newKcal, setNewKcal] = useState("");
  const [newProtein, setNewProtein] = useState("");
  const [newCalcium, setNewCalcium] = useState("");
  const [newIron, setNewIron] = useState("");
  const [newError, setNewError] = useState("");

  const nextKey = useRef(0);
  const foodSelect = useRef(null);
  const tableSection = useRef(null);

  const allFoods = [...FOOD_CHOICES.flatMap((group) => group.foods), ...customFoods];
  const food = allFoods.find((item) => item.id === foodId) ?? null;
  const isCustom = customFoods.some((item) => item.id === foodId);

  // The table stays in step with the foods once it has been created.
  const tableVisible = showTable && entries.length > 0;

  // For each column: the total, and the foods that have no value to add into it.
  const totals = Object.fromEntries(
    NUTRIENTS.map((nutrient) => [
      nutrient.key,
      {
        sum: entries.reduce((sum, entry) => sum + (scaledAmount(entry, nutrient) ?? 0), 0),
        missing: entries.filter((entry) => scaledAmount(entry, nutrient) === null),
      },
    ]),
  );
  const totalKcal = totals.kcal.sum;
  const foodsWithGaps = [
    ...new Set(["protein", "calcium", "iron"].flatMap((key) => totals[key].missing.map((entry) => entry.name))),
  ];

  const hasNeed = neededKcal > 0;
  const percentOfNeed = hasNeed ? Math.round((totalKcal / neededKcal) * 100) : null;
  const gap = hasNeed ? neededKcal - totalKcal : null;

  // What the amount typed in the form would add, shown before the food is added.
  const previewKcal =
    food && Number(quantity) > 0 ? Math.round((food.kcalPer100 * Number(quantity)) / 100) : null;

  // When the table is created, bring it into view for the eye and for screen readers.
  useEffect(() => {
    if (!showTable || !tableSection.current) return;

    const calm = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    tableSection.current.focus({ preventScroll: true });
    tableSection.current.scrollIntoView?.({ behavior: calm ? "auto" : "smooth", block: "start" });
  }, [showTable]);

  // Picking a food fills in the size of one portion to start from.
  const chooseFood = (id) => {
    const chosen = allFoods.find((item) => item.id === id);

    setFoodId(id);
    setQuantity(chosen ? String(chosen.portion) : "");
    setError("");
  };

  const addEntry = (e) => {
    e.preventDefault();

    if (!food) {
      setError("Choose a food first.");
      return;
    }

    if (!(Number(quantity) > 0)) {
      setError("Enter how much was eaten (more than 0).");
      return;
    }

    nextKey.current += 1;

    setEntries((current) => [
      ...current,
      {
        key: nextKey.current,
        name: food.name,
        unit: food.unit,
        raw: food.raw,
        per100: per100Of(food),
        quantity: String(Number(quantity)),
      },
    ]);
    setAnnouncement(`${food.name} added. ${entries.length + 1} ${entries.length ? "foods" : "food"} in the list.`);

    setFoodId("");
    setQuantity("");
    setError("");
    foodSelect.current?.focus();
  };

  const changeQuantity = (key, value) =>
    setEntries((current) =>
      current.map((entry) => (entry.key === key ? { ...entry, quantity: value } : entry)),
    );

  const removeEntry = (entry) => {
    setEntries((current) => current.filter((item) => item.key !== entry.key));
    setAnnouncement(`${entry.name} removed.`);

    if (entries.length === 1) setShowTable(false);
  };

  const clearEntries = () => {
    setEntries([]);
    setShowTable(false);
    setAnnouncement("All foods removed.");
  };

  const closeAddFood = () => {
    setAdding(false);
    setNewName("");
    setNewKcal("");
    setNewProtein("");
    setNewCalcium("");
    setNewIron("");
    setNewError("");
  };

  const saveFood = (e) => {
    e.preventDefault();

    const name = newName.trim().replace(/\s+/g, " ");
    const kcal = Number(newKcal);
    const protein = optionalNumber(newProtein);
    const calcium = optionalNumber(newCalcium);
    const iron = optionalNumber(newIron);

    if (!name) {
      setNewError("Enter the name of the food.");
      return;
    }

    if (allFoods.some((item) => item.name.toLowerCase() === name.toLowerCase())) {
      setNewError("A food with this name is already in the list.");
      return;
    }

    if (newKcal.trim() === "" || !(kcal >= 0) || kcal > MAX_KCAL_PER_100) {
      setNewError(`Enter the calories per 100 g, between 0 and ${MAX_KCAL_PER_100}.`);
      return;
    }

    if (
      [protein, calcium, iron].some((value) => value !== null && !(value >= 0)) ||
      (protein !== null && protein > 100)
    ) {
      setNewError("Protein, calcium and iron must be 0 or more (protein can't be above 100 g in 100 g).");
      return;
    }

    const added = {
      // Names are unique (ignoring capitals), so the name makes a unique id too.
      id: `custom-${name.toLowerCase()}`,
      name,
      kcalPer100: kcal,
      protein,
      calcium,
      iron,
      unit: "g",
      portion: 100,
      raw: false,
    };

    const next = [...customFoods, added];

    setCustomFoods(next);
    saveCustomFoods(next);

    // Select the new food straight away (chooseFood would not find it yet, as the list updates after this).
    setFoodId(added.id);
    setQuantity(String(added.portion));
    setError("");
    closeAddFood();
  };

  // Foods already in the list below keep their own copy of the values, so they are not affected.
  const removeCustomFood = () => {
    const next = customFoods.filter((item) => item.id !== foodId);

    setCustomFoods(next);
    saveCustomFoods(next);
    chooseFood("");
  };

  return (
    <div className="@container">
      <p className="mb-4 text-sm text-slate-700">
        Add each food the child ate and how much. When every food is in, create
        the table to see the calories and nutrients of all of them together.
      </p>

      {/* 1. ADD A FOOD */}
      <form
        onSubmit={addEntry}
        noValidate
        className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 @lg:p-5"
      >
        <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-kid-ink">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-kid-deep text-sm text-white">
            1
          </span>
          Add a food
        </h4>

        <div className="grid gap-4 @lg:grid-cols-[minmax(0,1fr)_11rem]">
          <div>
            <label htmlFor="calc-food" className="mb-1.5 block text-sm font-semibold text-slate-700">
              Food
            </label>

            <select
              id="calc-food"
              ref={foodSelect}
              value={foodId}
              onChange={(e) => chooseFood(e.target.value)}
              className="kid-input py-3"
            >
              <option value="">Select a food</option>

              {customFoods.length > 0 && (
                <optgroup label="My foods">
                  {customFoods.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} · {Math.round(item.kcalPer100)} kcal/100 g
                    </option>
                  ))}
                </optgroup>
              )}

              {FOOD_CHOICES.map((group) => (
                <optgroup key={group.id} label={group.name}>
                  {group.foods.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} · {Math.round(item.kcalPer100)} kcal/100 g
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="calc-quantity" className="mb-1.5 block text-sm font-semibold text-slate-700">
              Quantity ({food ? food.unit : "g"})
            </label>

            <input
              id="calc-quantity"
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              placeholder="e.g. 30"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                setError("");
              }}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "calc-error" : undefined}
              className="kid-input py-3"
            />
          </div>
        </div>

        {/* About the food chosen */}
        {food && (
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl bg-tone-mint px-3 py-2.5 text-sm text-kid-ink">
            <span>
              <span className="font-bold">{Math.round(food.kcalPer100)} kcal</span> per 100 g
              {food.unit === "ml" && " (about 100 ml)"}
            </span>

            {!isCustom && (
              <span>
                1 portion = {food.portion} {food.unit}
              </span>
            )}

            {food.raw && <span className="font-semibold">Enter the uncooked (raw) weight</span>}

            {previewKcal !== null && (
              <span className="font-bold text-kid-deep @lg:ml-auto">
                {Number(quantity)} {food.unit} = {previewKcal} kcal
              </span>
            )}
          </div>
        )}

        {error && (
          <p id="calc-error" role="alert" className="mt-3 text-sm font-semibold text-rose-600">
            {error}
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {food && !isCustom && (
            <>
              <span className="text-sm font-semibold text-slate-600">Quick amount:</span>

              {PORTION_CHOICES.map(({ times, label }) => {
                const amount = food.portion * times;
                const selected = Number(quantity) === amount;

                return (
                  <button
                    key={times}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      setQuantity(String(amount));
                      setError("");
                    }}
                    className={`min-h-9 rounded-full px-3 py-1.5 text-sm font-semibold ring-1 transition-colors ${
                      selected
                        ? "bg-kid-deep text-white ring-kid-deep"
                        : "bg-white text-kid-deep ring-slate-300 hover:bg-tone-mint"
                    }`}
                  >
                    {label} · {amount} {food.unit}
                  </button>
                );
              })}
            </>
          )}

          {isCustom && (
            <button
              type="button"
              onClick={removeCustomFood}
              className="text-sm font-semibold text-rose-600 underline underline-offset-2"
            >
              Remove this food from my list
            </button>
          )}

          <button type="submit" className="kid-btn w-full px-6 py-3 @lg:ml-auto @lg:w-auto">
            <Plus size={20} aria-hidden="true" />
            Add to list
          </button>
        </div>
      </form>

      {/* A FOOD THAT IS NOT IN THE LIST */}
      {adding ? (
        <form
          onSubmit={saveFood}
          noValidate
          className="mt-4 rounded-2xl border-2 border-dashed border-kid-green bg-white/80 p-4 @lg:p-5"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <h4 className="text-base font-semibold text-kid-deep">Add your own food</h4>

            <button
              type="button"
              onClick={closeAddFood}
              aria-label="Cancel adding a food"
              className="grid h-9 w-9 place-items-center rounded-full text-slate-500 hover:bg-slate-100"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="grid gap-3 @lg:grid-cols-2">
            <div>
              <label htmlFor="new-food-name" className="mb-1 block text-sm font-semibold text-slate-700">
                Name of the food
              </label>
              <input
                id="new-food-name"
                type="text"
                maxLength={60}
                placeholder="e.g. Idli"
                value={newName}
                onChange={(e) => {
                  setNewName(e.target.value);
                  setNewError("");
                }}
                className="kid-input py-3"
              />
            </div>

            <div>
              <label htmlFor="new-food-kcal" className="mb-1 block text-sm font-semibold text-slate-700">
                Calories per 100 g (kcal)
              </label>
              <input
                id="new-food-kcal"
                type="number"
                min="0"
                max={MAX_KCAL_PER_100}
                step="any"
                inputMode="decimal"
                placeholder="From the food label"
                value={newKcal}
                onChange={(e) => {
                  setNewKcal(e.target.value);
                  setNewError("");
                }}
                className="kid-input py-3"
              />
            </div>
          </div>

          <p className="mb-2 mt-4 text-sm font-semibold text-slate-700">
            Per 100 g, if known <span className="font-normal text-slate-500">(optional)</span>
          </p>

          <div className="grid gap-3 @lg:grid-cols-3">
            {[
              ["new-food-protein", "Protein (g)", newProtein, setNewProtein],
              ["new-food-calcium", "Calcium (mg)", newCalcium, setNewCalcium],
              ["new-food-iron", "Iron (mg)", newIron, setNewIron],
            ].map(([id, label, value, setValue]) => (
              <div key={id}>
                <label htmlFor={id} className="mb-1 block text-sm text-slate-700">
                  {label}
                </label>
                <input
                  id={id}
                  type="number"
                  min="0"
                  step="any"
                  inputMode="decimal"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    setNewError("");
                  }}
                  className="kid-input py-2.5"
                />
              </div>
            ))}
          </div>

          {newError && (
            <p role="alert" className="mt-3 text-sm font-semibold text-rose-600">
              {newError}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button type="submit" className="kid-btn px-5 py-2.5">
              Save food
            </button>
            <button type="button" onClick={closeAddFood} className="kid-btn kid-btn-soft px-5 py-2.5">
              Cancel
            </button>
            <p className="text-xs text-slate-500">
              Kept in this browser, under “My foods” in the list.
            </p>
          </div>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-kid-green px-4 py-3 text-sm font-semibold text-kid-deep transition-colors hover:bg-white/70"
        >
          <Plus size={18} aria-hidden="true" />
          Food not in the list? Add your own
        </button>
      )}

      {/* Read out by screen readers when the list changes */}
      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>

      {/* 2. THE FOODS ADDED SO FAR, then the button that makes the table */}
      <div className="mt-7">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h4 className="flex items-center gap-2 text-lg font-semibold text-kid-ink">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-kid-deep text-sm text-white">
              2
            </span>
            Foods added
            {entries.length > 0 && (
              <span className="rounded-full bg-white px-2.5 py-0.5 text-sm font-semibold text-kid-deep">
                {entries.length}
              </span>
            )}
          </h4>

          {entries.length > 0 && (
            <button
              type="button"
              onClick={clearEntries}
              className="text-sm font-semibold text-rose-600 underline underline-offset-2"
            >
              Clear all
            </button>
          )}
        </div>

        {entries.length === 0 ? (
          <p className="rounded-2xl bg-white/70 px-4 py-6 text-center text-sm text-slate-600">
            No foods added yet. Choose a food above and press{" "}
            <span className="font-semibold">Add to list</span>.
          </p>
        ) : (
          <ul className="grid gap-2 @lg:grid-cols-2">
            {entries.map((entry) => {
              const invalid = !(Number(entry.quantity) > 0);

              return (
                <li
                  key={entry.key}
                  className="flex items-center gap-2 rounded-xl bg-white p-2.5 pl-3 ring-1 ring-slate-200"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-kid-ink" title={entry.name}>
                      {entry.name}
                    </p>
                    {entry.raw && <p className="text-xs text-slate-500">uncooked weight</p>}
                  </div>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    inputMode="decimal"
                    value={entry.quantity}
                    onChange={(e) => changeQuantity(entry.key, e.target.value)}
                    aria-label={`Quantity of ${entry.name} in ${entry.unit}`}
                    aria-invalid={invalid}
                    className={`kid-input w-20 shrink-0 px-2 py-1.5 text-center ${
                      invalid ? "border-rose-400" : ""
                    }`}
                  />
                  <span className="w-6 shrink-0 text-sm text-slate-600">{entry.unit}</span>

                  <button
                    type="button"
                    onClick={() => removeEntry(entry)}
                    aria-label={`Remove ${entry.name}`}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-slate-500 hover:bg-rose-50 hover:text-rose-600"
                  >
                    <Trash2 size={18} aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        <button
          type="button"
          onClick={() => setShowTable(true)}
          disabled={entries.length === 0 || tableVisible}
          className="kid-btn mt-4 w-full py-3.5 text-lg"
        >
          <Table size={22} aria-hidden="true" />
          {tableVisible ? "Table created below" : "Create table of all foods"}
        </button>
      </div>

      {/* 3. ONE TABLE FOR ALL THE FOODS */}
      {tableVisible && (
        <div ref={tableSection} tabIndex={-1} className="mt-7 outline-none">
          <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-kid-ink">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-kid-deep text-sm text-white">
              3
            </span>
            Calories and nutrients of the foods eaten
          </h4>

          <div className="overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-slate-300">
            <table className="w-full min-w-xl text-left">
              <caption className="sr-only">
                All the foods eaten, with the quantity, calories, protein, calcium and iron of each,
                the totals, and the calories compared with the daily need
              </caption>

              <thead className="bg-kid-deep text-white">
                <tr>
                  <th scope="col" className={`${th} w-12`}>
                    No.
                  </th>
                  <th scope="col" className={th}>
                    Food
                  </th>
                  <th scope="col" className={`${th} text-right`}>
                    Quantity
                  </th>
                  {NUTRIENTS.map(({ key, label }) => (
                    <th key={key} scope="col" className={`${th} text-right`}>
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {entries.map((entry, index) => (
                  <tr key={entry.key} className="border-t border-slate-200 even:bg-slate-50">
                    <td className="px-3 py-3 text-slate-500">{index + 1}</td>

                    <th scope="row" className="px-3 py-3 font-semibold text-kid-ink">
                      {entry.name}
                      {entry.raw && (
                        <span className="block text-xs font-normal text-slate-500">
                          uncooked weight
                        </span>
                      )}
                    </th>

                    <td className="whitespace-nowrap px-3 py-3 text-right tabular-nums text-slate-700">
                      {Number(entry.quantity) > 0 ? `${Number(entry.quantity)} ${entry.unit}` : "–"}
                    </td>

                    {NUTRIENTS.map((nutrient) => {
                      const scaled = scaledAmount(entry, nutrient);

                      return (
                        <td
                          key={nutrient.key}
                          className={`px-3 py-3 text-right tabular-nums ${
                            nutrient.key === "kcal" ? "text-lg font-bold text-kid-deep" : "text-slate-700"
                          }`}
                        >
                          {scaled === null ? (
                            <span title="No value entered for this food" className="text-slate-400">
                              –
                            </span>
                          ) : (
                            showScaled(scaled, nutrient.digits)
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr className="border-t-2 border-kid-deep bg-tone-butter">
                  <th scope="row" colSpan={3} className="px-3 py-3.5 text-base font-bold text-kid-ink">
                    Total
                    <span className="block text-xs font-normal text-slate-600">
                      {entries.length} {entries.length === 1 ? "food" : "foods"} added up
                    </span>
                  </th>

                  {NUTRIENTS.map(({ key, digits }) => (
                    <td
                      key={key}
                      className={`px-3 py-3.5 text-right font-extrabold tabular-nums text-slate-900 ${
                        key === "kcal" ? "text-2xl" : "text-base"
                      }`}
                    >
                      {showScaled(totals[key].sum, digits)}
                      {totals[key].missing.length > 0 && <span aria-label="not complete"> *</span>}
                    </td>
                  ))}
                </tr>

                {/* The calories compared with the daily need from the form on the left */}
                <tr className="border-t border-slate-200">
                  <th scope="row" colSpan={3} className="px-3 py-3 font-semibold text-kid-ink">
                    Daily calories needed
                    <span className="block text-xs font-normal text-slate-600">
                      from the child's age and weight
                    </span>
                  </th>

                  <td className="px-3 py-3 text-right text-lg font-bold tabular-nums text-kid-ink">
                    {hasNeed ? neededKcal : <span className="text-xs font-normal text-slate-500">Not calculated</span>}
                  </td>

                  <td colSpan={3} className="px-3 py-3 text-xs text-slate-600">
                    {!hasNeed && (
                      <>
                        Enter the age and weight on the left and press{" "}
                        <span className="font-semibold">Calculate Daily Calories</span> to compare.
                      </>
                    )}
                  </td>
                </tr>

                {hasNeed && (
                  <>
                    <tr className="border-t border-slate-200 bg-slate-50">
                      <th scope="row" colSpan={3} className="px-3 py-3 font-semibold text-kid-ink">
                        {gap >= 0 ? "Still to reach the daily need" : "Above the daily need"}
                      </th>
                      <td className="px-3 py-3 text-right text-lg font-bold tabular-nums text-kid-ink">
                        {Math.abs(gap)}
                      </td>
                      <td colSpan={3} />
                    </tr>

                    <tr className="border-t border-slate-200">
                      <th scope="row" colSpan={3} className="px-3 py-3 font-semibold text-kid-ink">
                        Share of the daily need
                      </th>
                      <td className="px-3 py-3 text-right text-lg font-bold tabular-nums text-kid-ink">
                        {percentOfNeed}%
                      </td>
                      <td colSpan={3} className="px-3 py-3">
                        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200" aria-hidden="true">
                          <div
                            className="h-full rounded-full bg-kid-green"
                            style={{ width: `${Math.min(percentOfNeed, 100)}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  </>
                )}
              </tfoot>
            </table>
          </div>

          {foodsWithGaps.length > 0 && (
            <p className="mt-3 text-sm text-slate-700">
              * Protein, calcium and iron totals leave out values that were not
              entered for: {foodsWithGaps.join(", ")}.
            </p>
          )}
        </div>
      )}

      <p className="mt-6 text-xs text-slate-600">
        Calories, protein, calcium and iron per 100 g come from the Indian Food
        Composition Tables 2017 (ICMR-NIN); foods IFCT does not list come from
        USDA FoodData Central. Foods you add use the values you enter. This is
        general information and does not replace advice from a paediatrician or
        dietitian.
      </p>
    </div>
  );
}

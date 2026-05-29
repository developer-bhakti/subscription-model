import React, { useState } from "react";
import {
  User,
  Calculator,
  Utensils,
} from "lucide-react";

const AssessmentForNutritional = () => {
  const [ageGroup, setAgeGroup] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState(null);

  const ageOptions = [
    {
      label: "Infants (Up to 1 Year)",
      value: 100,
    },
    {
      label: "Children (1 to 3 Years)",
      value: 95,
    },
    {
      label: "Children (4 to 6 Years)",
      value: 85,
    },
    {
      label: "Children (7 to 9 Years)",
      value: 70,
    },
    {
      label: "Children (10 to 12 Years)",
      value: 55,
    },
  ];

  const handleCalculate = () => {
    if (!ageGroup || !weight) {
      alert("Please select age group and enter weight");
      return;
    }

    const calories = Number(ageGroup) * Number(weight);

    const selected = ageOptions.find(
      (item) => item.value === Number(ageGroup)
    );

    setResult({
      ageLabel: selected.label,
      perKg: ageGroup,
      totalCalories: calories,
    });
  };

  return (
    <section className="bg-slate-50 py-12 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl p-6 md:p-10">

        {/* TITLE */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800">
            Nutritional Deficiency Assessment Tool
          </h2>

          <p className="text-slate-500 mt-4 text-base md:text-lg">
            Calculate daily calorie needs and understand ideal nutritional
            intake for children.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT CARD */}
          <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 md:p-8">

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-600 text-white p-3 rounded-xl">
                <User size={24} />
              </div>

              <h3 className="text-2xl font-bold text-slate-800">
                Child Assessment
              </h3>
            </div>

            {/* AGE GROUP */}
            <div className="mb-6">
              <label className="block mb-2 font-semibold text-slate-700">
                Age Group of the Child
              </label>

              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                className="w-full border border-slate-300 rounded-2xl px-4 py-4 text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Age Group</option>

                {ageOptions.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.label} - {item.value} kcal/kg/day
                  </option>
                ))}
              </select>
            </div>

            {/* WEIGHT */}
            <div className="mb-6">
              <label className="block mb-2 font-semibold text-slate-700">
                Weight of the Child (kg)
              </label>

              <input
                type="number"
                placeholder="Enter Weight in KG"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full border border-slate-300 rounded-2xl px-4 py-4 text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* BUTTON */}
            <button
              onClick={handleCalculate}
              className="w-full bg-gradient-to-r from-blue-700 to-blue-500 hover:scale-[1.02] transition-all duration-300 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 text-lg shadow-lg"
            >
              <Calculator size={22} />
              Calculate Daily Calories
            </button>

            {/* RESULT */}
            {result && (
              <div className="mt-8 bg-white rounded-3xl p-6 border-l-[6px] border-blue-500 shadow-sm">

                <h4 className="text-2xl font-bold text-blue-700 mb-5">
                  Assessment Result
                </h4>

                <div className="space-y-3 text-slate-700">

                  <div className="text-base">
                    <span className="font-semibold">
                      Selected Age Group:
                    </span>{" "}
                    {result.ageLabel}
                  </div>

                  <div className="text-base">
                    <span className="font-semibold">
                      Calories Per KG:
                    </span>{" "}
                    {result.perKg} kcal/kg/day
                  </div>

                  <div className="text-lg font-bold text-slate-900">
                    Total Daily Calories Needed:{" "}
                    {result.totalCalories} kcal/day
                  </div>
                </div>

                {/* BADGES */}
                <div className="flex flex-wrap gap-3 mt-6">

                  {[
                    "Carbohydrates",
                    "Proteins",
                    "Fats",
                    "Micronutrients",
                  ].map((item, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT CARD */}
          <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 md:p-8">

            <div className="flex items-center gap-3 mb-6">

              <div className="bg-blue-600 text-white p-3 rounded-xl">
                <Utensils size={24} />
              </div>

              <h3 className="text-2xl font-bold text-slate-800">
                Daily Nutritional Guide
              </h3>
            </div>

            <div className="overflow-x-auto rounded-2xl">

              <table className="w-full overflow-hidden rounded-2xl">

                <thead className="bg-blue-700 text-white">

                  <tr>
                    <th className="px-4 py-4 text-left text-sm font-semibold">
                      Micronutrient Type
                    </th>

                    <th className="px-4 py-4 text-left text-sm font-semibold">
                      Food Item
                    </th>

                    <th className="px-4 py-4 text-left text-sm font-semibold">
                      Portion
                    </th>

                    <th className="px-4 py-4 text-left text-sm font-semibold">
                      Approx kcal
                    </th>

                    <th className="px-4 py-4 text-left text-sm font-semibold">
                      Ideal Daily %
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white">

                  {[
                    {
                      type: "Carbohydrates",
                      food: "Wheat / Roti",
                      portion: "1 Piece",
                      kcal: "85 kcal",
                      percent: "50%",
                    },
                    {
                      type: "Protein",
                      food: "Dal / Lentils",
                      portion: "1 Bowl",
                      kcal: "120 kcal",
                      percent: "20%",
                    },
                    {
                      type: "Healthy Fats",
                      food: "Milk",
                      portion: "1 Glass",
                      kcal: "150 kcal",
                      percent: "15%",
                    },
                    {
                      type: "Vitamins",
                      food: "Fruits",
                      portion: "1 Serving",
                      kcal: "80 kcal",
                      percent: "10%",
                    },
                    {
                      type: "Minerals",
                      food: "Vegetables",
                      portion: "1 Bowl",
                      kcal: "60 kcal",
                      percent: "5%",
                    },
                  ].map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-200 hover:bg-slate-50 transition"
                    >
                      <td className="px-4 py-4 text-sm text-slate-700 font-medium">
                        {item.type}
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-600">
                        {item.food}
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-600">
                        {item.portion}
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-600">
                        {item.kcal}
                      </td>

                      <td className="px-4 py-4 text-sm font-semibold text-blue-700">
                        {item.percent}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssessmentForNutritional;
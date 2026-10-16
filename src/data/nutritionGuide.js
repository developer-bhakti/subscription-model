// The Daily Nutritional Guide on the Nutritional Assessment page.
//
// Nothing here was estimated. Every figure comes from a published table:
//   - Portion sizes and how many portions a child needs each day, by age:
//       ICMR-NIN, "Dietary Guidelines for Indians - A Manual" (2011), Annexure 4 (balanced diet for
//       infants, children and adolescents) and Annexure 14 (portion sizes).
//   - Nutrients, per 100 g edible portion, source "ifct":
//       Indian Food Composition Tables 2017 (ICMR-National Institute of Nutrition, Hyderabad).
//       IFCT gives energy in kJ; the page converts it with 1 kcal = 4.184 kJ.
//   - Nutrients for the four foods IFCT 2017 does not list (curd, ghee, cooking oil, sugar), source "usda":
//       USDA FoodData Central, SR Legacy (April 2018), values per 100 g.
// Each food's `code` is its IFCT food code (or USDA fdc_id) so any number can be checked against the book.

export const SOURCE_TEXT = {
  portions:
    "Portion sizes and daily amounts: ICMR-NIN, Dietary Guidelines for Indians - A Manual (2011), Annexures 4 and 14.",
  ifct:
    "Nutrients: Indian Food Composition Tables 2017 (ICMR-NIN, Hyderabad), per 100 g edible portion, worked out for one portion.",
  usda: "† USDA FoodData Central (SR Legacy), used because IFCT 2017 does not list this food.",
};

// Age groups the balanced-diet table uses. `fromMonths` is the child's age in months when the group begins.
export const AGE_BANDS = [
  { id: "6-12m", label: "6–12 months", fromMonths: 6 },
  { id: "1-3", label: "1–3 years", fromMonths: 12 },
  { id: "4-6", label: "4–6 years", fromMonths: 48 },
  { id: "7-9", label: "7–9 years", fromMonths: 84 },
  { id: "10-12", label: "10–12 years", fromMonths: 120 },
];

// The age group for a child's age in months, or null under 6 months (the table starts at 6 months).
export const bandForMonths = (months) => {
  if (!Number.isFinite(months) || months < 6) return null;

  return [...AGE_BANDS].reverse().find((band) => months >= band.fromMonths).id;
};

// Portions per day for each age group. A pair is [girls, boys], used only where the table splits 10-12 years.
const portions = (infant, oneToThree, fourToSix, sevenToNine, tenToTwelve) => ({
  "6-12m": infant,
  "1-3": oneToThree,
  "4-6": fourToSix,
  "7-9": sevenToNine,
  "10-12": tenToTwelve,
});

// Energy is `kj` (IFCT) or `kcal` (USDA); the rest are per 100 g.
export const FOOD_GROUPS = [
  {
    id: "cereals",
    name: "Cereals and Millets",
    emoji: "🌾",
    tint: "bg-tone-butter",
    sections: [
      {
        portion: { amount: 30, unit: "g", note: "raw" },
        portions: portions(0.5, 2, 4, 6, [8, 10]),
        others: "Other suitable cereals and millets",
        foods: [
          { name: "Rice", detail: "raw, milled", source: "ifct", code: "A015", kj: 1491, protein: 7.94, calcium: 7.49, iron: 0.65 },
          { name: "Wheat", detail: "whole wheat flour (atta)", source: "ifct", code: "A019", kj: 1340, protein: 10.57, calcium: 30.94, iron: 4.1 },
          { name: "Ragi", detail: "finger millet", source: "ifct", code: "A010", kj: 1342, protein: 7.16, calcium: 364, iron: 4.62 },
          { name: "Jowar", detail: "sorghum", source: "ifct", code: "A005", kj: 1398, protein: 9.97, calcium: 27.6, iron: 3.95 },
          { name: "Bajra", detail: "pearl millet", source: "ifct", code: "A003", kj: 1456, protein: 10.96, calcium: 27.35, iron: 6.42 },
        ],
      },
    ],
  },

  {
    id: "pulses",
    name: "Pulses and Legumes",
    emoji: "🫘",
    tint: "bg-tone-rose",
    sections: [
      {
        portion: { amount: 30, unit: "g", note: "raw" },
        portions: portions(0.25, 1, 1, 2, 2),
        others: "Other suitable pulses and legumes",
        foods: [
          { name: "Dal", detail: "red gram / toor dal", source: "ifct", code: "B021", kj: 1384, protein: 21.7, calcium: 71.73, iron: 3.9 },
          { name: "Chickpeas", detail: "Bengal gram, whole", source: "ifct", code: "B002", kj: 1201, protein: 18.77, calcium: 150, iron: 6.78 },
          { name: "Green gram", detail: "moong, whole", source: "ifct", code: "B011", kj: 1229, protein: 22.53, calcium: 92.43, iron: 4.89 },
          { name: "Kidney beans", detail: "rajmah, red", source: "ifct", code: "B020", kj: 1252, protein: 19.91, calcium: 126, iron: 6.13 },
        ],
      },
    ],
  },

  {
    id: "milk",
    name: "Milk and Milk Products",
    emoji: "🥛",
    tint: "bg-tone-aqua",
    sections: [
      {
        portion: { amount: 100, unit: "ml" },
        portions: portions(4, 5, 5, 5, 5),
        // The table's own footnote for the infant figure.
        notes: { "6-12m": "For infants this is top milk. A breastfed infant needs 200 ml (2 portions) of top milk." },
        extra: "Milk values are per 100 g, which is about 100 ml.",
        others: "Other suitable dairy products",
        foods: [
          { name: "Milk", detail: "cow, whole", source: "ifct", code: "L002", kj: 305, protein: 3.26, calcium: 118, iron: 0.15 },
          { name: "Curd", detail: "plain, whole milk", source: "usda", code: "fdc 171284", kcal: 61, protein: 3.47, calcium: 121, iron: 0.05 },
          { name: "Paneer", source: "ifct", code: "L003", kj: 1278, protein: 18.86, calcium: 476, iron: 0.9 },
        ],
      },
    ],
  },

  {
    id: "fruits",
    name: "Fruits",
    emoji: "🍎",
    tint: "bg-tone-lime",
    sections: [
      {
        portion: { amount: 100, unit: "g" },
        portions: portions(1, 1, 1, 1, 1),
        others: "Seasonal fruits",
        foods: [
          { name: "Banana", detail: "ripe", source: "ifct", code: "E012", kj: 440, protein: 1.23, calcium: 5.07, iron: 0.28 },
          { name: "Apple", source: "ifct", code: "E001", kj: 261, protein: 0.29, calcium: 13.68, iron: 0.26 },
          { name: "Orange", detail: "pulp", source: "ifct", code: "E047", kj: 156, protein: 0.7, calcium: 19.52, iron: 0.81 },
          { name: "Papaya", detail: "ripe", source: "ifct", code: "E049", kj: 100, protein: 0.42, calcium: 15.02, iron: 0.23 },
        ],
      },
    ],
  },

  {
    id: "vegetables",
    name: "Vegetables",
    emoji: "🥦",
    tint: "bg-tone-mint",
    sections: [
      {
        title: "Green leafy vegetables",
        portion: { amount: 100, unit: "g" },
        portions: portions(0.25, 0.5, 0.5, 1, 1),
        foods: [
          { name: "Spinach", detail: "palak", source: "ifct", code: "C033", kj: 102, protein: 2.14, calcium: 82.29, iron: 2.95 },
          { name: "Amaranth leaves", detail: "green", source: "ifct", code: "C002", kj: 128, protein: 3.29, calcium: 330, iron: 4.64 },
        ],
      },
      {
        title: "Other vegetables",
        portion: { amount: 100, unit: "g" },
        portions: portions(0.25, 0.5, 1, 1, 2),
        others: "Other seasonal vegetables",
        foods: [
          { name: "Carrot", detail: "orange", source: "ifct", code: "F002", kj: 139, protein: 0.95, calcium: 35.09, iron: 0.6 },
          { name: "Pumpkin", detail: "orange, round", source: "ifct", code: "D066", kj: 97, protein: 0.84, calcium: 23.06, iron: 0.36 },
        ],
      },
    ],
  },

  {
    id: "roots",
    name: "Roots and Tubers",
    emoji: "🥔",
    tint: "bg-tone-butter",
    sections: [
      {
        portion: { amount: 100, unit: "g" },
        portions: portions(0.5, 0.5, 1, 1, 1),
        others: "Other suitable roots and tubers",
        foods: [
          { name: "Potato", detail: "brown skin", source: "ifct", code: "F006", kj: 292, protein: 1.54, calcium: 9.52, iron: 0.57 },
          { name: "Sweet potato", detail: "brown skin", source: "ifct", code: "F013", kj: 456, protein: 1.33, calcium: 27.5, iron: 0.35 },
        ],
      },
    ],
  },

  {
    id: "nuts",
    name: "Nuts and Oilseeds",
    emoji: "🥜",
    tint: "bg-tone-rose",
    sections: [
      {
        // The ICMR-NIN balanced-diet table has no separate portion for this group, so the values stay per 100 g.
        portion: null,
        portions: null,
        extra: "The ICMR-NIN balanced-diet table does not set a separate daily amount for this group, so values are per 100 g.",
        others: "Other suitable nuts and oilseeds",
        foods: [
          { name: "Groundnuts", source: "ifct", code: "H012", kj: 2176, protein: 23.65, calcium: 54, iron: 3.44 },
          { name: "Sesame seeds", detail: "white", source: "ifct", code: "H011", kj: 2174, protein: 21.7, calcium: 1283, iron: 15.04 },
        ],
      },
    ],
  },

  {
    id: "fats",
    name: "Fats and Oils",
    emoji: "🧈",
    tint: "bg-tone-aqua",
    sections: [
      {
        portion: { amount: 5, unit: "g" },
        portions: portions(4, 5, 5, 6, 7),
        others: "Other suitable dietary fats",
        foods: [
          { name: "Cooking oils", detail: "groundnut, sunflower", source: "usda", code: "fdc 171410", kcal: 884, protein: 0, calcium: 0, iron: 0.03 },
          { name: "Ghee", detail: "butter oil", source: "usda", code: "fdc 173412", kcal: 876, protein: 0.28, calcium: 4, iron: 0 },
        ],
      },
    ],
  },

  {
    id: "sugar",
    name: "Sugar and Jaggery",
    emoji: "🍯",
    tint: "bg-tone-lime",
    sections: [
      {
        portion: { amount: 5, unit: "g" },
        portions: portions(2, 3, 4, 4, 6),
        // ICMR-NIN's 2024 guidelines say "No added sugar for children <2 years old", which is newer than the 2011 table.
        under2: "ICMR-NIN (2024) advises no added sugar for children under 2 years.",
        others: "Other suitable options",
        foods: [
          { name: "Sugar", source: "usda", code: "fdc 169655", kcal: 387, protein: 0, calcium: 1, iron: 0.05 },
          { name: "Jaggery", detail: "cane", source: "ifct", code: "I001", kj: 1480, protein: 1.85, calcium: 107, iron: 4.63 },
        ],
      },
    ],
  },
];

// ---- worked out from the figures above -------------------------------------------------------------

// Energy per 100 g in kcal.
export const kcalPer100 = (food) => food.kcal ?? food.kj / 4.184;

// What one food gives in `grams` of itself (a portion, or 100 g where there is no portion).
export const nutrientsFor = (food, grams) => ({
  kcal: (kcalPer100(food) * grams) / 100,
  protein: (food.protein * grams) / 100,
  calcium: (food.calcium * grams) / 100,
  iron: (food.iron * grams) / 100,
});

// Every food above as a choice for the Food Calorie Calculator's dropdown, grouped like the guide. Energy and
// nutrients are per 100 g. `unit` is what the quantity is measured in, `portion` the size of one portion (100
// where the group has none) and `raw` marks foods whose figures are for the uncooked weight.
export const FOOD_CHOICES = FOOD_GROUPS.map((group) => ({
  id: group.id,
  name: group.name,
  foods: group.sections.flatMap((section) =>
    section.foods.map((food) => ({
      id: food.code,
      name: food.detail ? `${food.name} (${food.detail})` : food.name,
      kcalPer100: kcalPer100(food),
      protein: food.protein,
      calcium: food.calcium,
      iron: food.iron,
      unit: section.portion?.unit ?? "g",
      portion: section.portion?.amount ?? 100,
      raw: section.portion?.note === "raw",
    })),
  ),
}));

// Daily amount of a section for an age group: { portions: [low, high], amount: [low, high] } (low = high unless
// the table splits girls and boys). null when there is no portion for the group or no age group is chosen.
export const dailyAmount = (section, bandId) => {
  if (!section.portion || !section.portions || !bandId) return null;

  const raw = section.portions[bandId];
  const [low, high] = Array.isArray(raw) ? raw : [raw, raw];
  const size = section.portion.amount;

  return { portions: [low, high], amount: [low * size, high * size] };
};

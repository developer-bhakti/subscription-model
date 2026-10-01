import React, { useState } from "react";

const classes = [
  {
    id: "pg",
    name: "PG",
    emoji: "🍼",
    desc: "Numbers 1 to 5",
    color: "orange",
    objectEmoji: null,
  },
  {
    id: "nursery",
    name: "Nursery",
    emoji: "🧸",
    desc: "Numbers 1 to 10",
    color: "pink",
    objectEmoji: "⭐",
  },
  {
    id: "lkg",
    name: "LKG",
    emoji: "📚",
    desc: "Numbers 1 to 20",
    color: "green",
    objectEmoji: null,
  },
  {
    id: "ukg",
    name: "UKG",
    emoji: "🎓",
    desc: "Numbers up to 100",
    color: "blue",
    objectEmoji: null,
  },
];

// Shared by the class cards and the Big or Small category cards. Tailwind only keeps
// class names it can see in full, so these stay written out rather than built up.
const cardStyles = {
  orange: { text: "text-orange-500", bg: "bg-orange-500" },
  pink: { text: "text-pink-500", bg: "bg-pink-500" },
  green: { text: "text-green-500", bg: "bg-green-500" },
  blue: { text: "text-blue-500", bg: "bg-blue-500" },
  purple: { text: "text-purple-500", bg: "bg-purple-500" },
};

const modes = [
  {
    id: "compare",
    name: "Fill the blank with =, > or <",
    emoji: "⚖️",
    desc: "Compare two numbers and choose the correct sign.",
  },
  {
    id: "series",
    name: "Fill the blanks in a number series",
    emoji: "🔗",
    desc: "Find the missing number in the series.",
  },
  {
    id: "identifyNumber",
    name: "Count & Identify the Number",
    emoji: "🔢",
    desc: "Count the objects or read the number name.",
  },
  {
    id: "moreOrLess",
    name: "Identify More or Less",
    emoji: "🧮",
    desc: "Pick the side that has more or less.",
  },
  {
    id: "heavyOrLight",
    name: "Identify Heavy or Light",
    emoji: "🏋️",
    desc: "Choose the heavier or the lighter thing.",
  },
  {
    id: "bigOrSmall",
    name: "Identify Big or Small",
    emoji: "🐘",
    desc: "Pick a category, then choose the bigger or the smaller thing.",
  },
];

// Big or Small asks for one of these before the round starts.
const bigOrSmallCategories = [
  {
    id: "vehicles",
    name: "Vehicles",
    emoji: "🚗",
    desc: "Autos, buses, planes and ships.",
    color: "orange",
  },
  {
    id: "domesticAnimals",
    name: "Domestic Animals",
    emoji: "🐶",
    desc: "The animals we keep at home.",
    color: "pink",
  },
  {
    id: "wildAnimals",
    name: "Wild Animals",
    emoji: "🦁",
    desc: "The animals of the jungle.",
    color: "green",
  },
  {
    id: "waterAnimals",
    name: "Water Animals",
    emoji: "🐟",
    desc: "The animals that live in water.",
    color: "blue",
  },
  {
    id: "birds",
    name: "Birds",
    emoji: "🐦",
    desc: "The birds that fly in the sky.",
    color: "purple",
  },
];

/* ----------------------------- QUESTION BANKS ----------------------------- */

// 1. FILL THE BLANK WITH =, > OR <   ->  [left number, right number]
const compareBank = {
  pg: [
    [1, 3],
    [4, 2],
    [2, 2],
    [5, 1],
    [3, 3],
    [2, 4],
    [5, 3],
    [1, 1],
    [4, 5],
    [3, 2],
  ],
  nursery: [
    [6, 3],
    [4, 8],
    [7, 7],
    [9, 2],
    [5, 5],
    [3, 10],
    [8, 6],
    [10, 10],
    [2, 9],
    [7, 4],
  ],
  lkg: [
    [12, 15],
    [18, 9],
    [14, 14],
    [11, 20],
    [17, 13],
    [16, 16],
    [19, 8],
    [10, 13],
    [20, 15],
    [12, 12],
  ],
  ukg: [
    [45, 54],
    [78, 78],
    [90, 19],
    [36, 63],
    [100, 99],
    [47, 47],
    [25, 52],
    [81, 18],
    [60, 60],
    [73, 37],
  ],
};

// 2. NUMBER SERIES  ->  full series plus the index that is hidden
const seriesBank = {
  pg: [
    { series: [1, 2, 3], blank: 1, wrong: [4, 5] },
    { series: [1, 2, 3, 4], blank: 2, wrong: [5, 1] },
    { series: [2, 3, 4, 5], blank: 3, wrong: [6, 2] },
    { series: [1, 2, 3, 4, 5], blank: 4, wrong: [6, 3] },
    { series: [3, 4, 5], blank: 0, wrong: [2, 1] },
    { series: [1, 2, 3], blank: 2, wrong: [4, 2] },
  ],
  nursery: [
    { series: [4, 5, 6, 7], blank: 2, wrong: [8, 4] },
    { series: [6, 7, 8, 9], blank: 1, wrong: [5, 9] },
    { series: [1, 2, 3, 4, 5], blank: 3, wrong: [6, 2] },
    { series: [7, 8, 9, 10], blank: 3, wrong: [11, 8] },
    { series: [2, 3, 4, 5], blank: 0, wrong: [1, 6] },
    { series: [5, 6, 7, 8], blank: 2, wrong: [9, 5] },
  ],
  lkg: [
    { series: [11, 12, 13, 14], blank: 2, wrong: [15, 11] },
    { series: [15, 16, 17, 18], blank: 1, wrong: [14, 19] },
    { series: [2, 4, 6, 8], blank: 2, wrong: [7, 5] },
    { series: [10, 12, 14, 16], blank: 3, wrong: [15, 18] },
    { series: [17, 18, 19, 20], blank: 3, wrong: [21, 19] },
    { series: [5, 10, 15, 20], blank: 2, wrong: [12, 18] },
  ],
  ukg: [
    { series: [25, 26, 27, 28], blank: 2, wrong: [29, 26] },
    { series: [10, 20, 30, 40], blank: 2, wrong: [35, 25] },
    { series: [45, 50, 55, 60], blank: 3, wrong: [65, 58] },
    { series: [70, 72, 74, 76], blank: 1, wrong: [71, 73] },
    { series: [88, 89, 90, 91], blank: 2, wrong: [80, 99] },
    { series: [20, 30, 40, 50], blank: 0, wrong: [10, 25] },
  ],
};

// 3. IDENTIFY THE NUMBER  ->  count objects (PG, Nursery) or read the name (LKG, UKG)
const identifyNumberBank = {
  pg: [
    { emoji: "🍎", count: 3, wrong: [2, 4] },
    { emoji: "🐟", count: 1, wrong: [2, 3] },
    { emoji: "⭐", count: 5, wrong: [4, 3] },
    { emoji: "🎈", count: 2, wrong: [1, 4] },
    { emoji: "🍌", count: 4, wrong: [5, 2] },
    { emoji: "🚗", count: 3, wrong: [1, 5] },
  ],
  nursery: [
    { emoji: "🐥", count: 6, wrong: [5, 7] },
    { emoji: "🍇", count: 8, wrong: [7, 9] },
    { emoji: "🌸", count: 4, wrong: [3, 5] },
    { emoji: "🐞", count: 7, wrong: [6, 8] },
    { emoji: "⚽", count: 10, wrong: [9, 8] },
    { emoji: "🦋", count: 5, wrong: [6, 4] },
  ],
  lkg: [
    { words: "Twelve", number: 12, wrong: [21, 20] },
    { words: "Fifteen", number: 15, wrong: [50, 5] },
    { words: "Nine", number: 9, wrong: [6, 19] },
    { words: "Seventeen", number: 17, wrong: [7, 70] },
    { words: "Twenty", number: 20, wrong: [12, 2] },
    { words: "Eleven", number: 11, wrong: [10, 1] },
  ],
  ukg: [
    { words: "Thirty Four", number: 34, wrong: [43, 30] },
    { words: "Fifty", number: 50, wrong: [15, 5] },
    { words: "Sixty Seven", number: 67, wrong: [76, 60] },
    { words: "Eighty", number: 80, wrong: [18, 8] },
    { words: "Ninety Nine", number: 99, wrong: [89, 90] },
    { words: "Forty Two", number: 42, wrong: [24, 40] },
  ],
};

// 4. MORE OR LESS  ->  object groups for the little ones, plain numbers later
const moreOrLessBank = {
  pg: [
    { emoji: "🍎", left: 2, right: 4, ask: "more" },
    { emoji: "⭐", left: 5, right: 1, ask: "more" },
    { emoji: "🎈", left: 3, right: 1, ask: "less" },
    { emoji: "🐟", left: 1, right: 4, ask: "more" },
    { emoji: "🍌", left: 4, right: 2, ask: "less" },
    { emoji: "🚗", left: 5, right: 3, ask: "more" },
  ],
  nursery: [
    { emoji: "🐥", left: 6, right: 3, ask: "more" },
    { emoji: "🍇", left: 2, right: 7, ask: "less" },
    { emoji: "🌸", left: 8, right: 5, ask: "less" },
    { emoji: "🐞", left: 4, right: 6, ask: "more" },
    { emoji: "⚽", left: 7, right: 2, ask: "more" },
    { emoji: "🦋", left: 3, right: 8, ask: "less" },
  ],
  lkg: [
    { left: 14, right: 18, ask: "more" },
    { left: 12, right: 9, ask: "more" },
    { left: 20, right: 15, ask: "less" },
    { left: 11, right: 16, ask: "less" },
    { left: 17, right: 13, ask: "more" },
    { left: 10, right: 19, ask: "less" },
  ],
  ukg: [
    { left: 45, right: 54, ask: "more" },
    { left: 90, right: 19, ask: "more" },
    { left: 36, right: 63, ask: "less" },
    { left: 100, right: 99, ask: "more" },
    { left: 25, right: 52, ask: "less" },
    { left: 73, right: 37, ask: "less" },
  ],
};

// 5. HEAVY OR LIGHT
const heavyOrLightBank = {
  pg: [
    { ask: "heavy", left: { emoji: "🐘", name: "Elephant" }, right: { emoji: "🪶", name: "Feather" }, answer: "left" },
    { ask: "heavy", left: { emoji: "🎈", name: "Balloon" }, right: { emoji: "🪨", name: "Stone" }, answer: "right" },
    { ask: "light", left: { emoji: "🐜", name: "Ant" }, right: { emoji: "🐄", name: "Cow" }, answer: "left" },
    { ask: "heavy", left: { emoji: "🚌", name: "Bus" }, right: { emoji: "🚲", name: "Cycle" }, answer: "left" },
    { ask: "light", left: { emoji: "📕", name: "Book" }, right: { emoji: "🍂", name: "Leaf" }, answer: "right" },
    { ask: "heavy", left: { emoji: "🍉", name: "Watermelon" }, right: { emoji: "🍓", name: "Strawberry" }, answer: "left" },
  ],
  nursery: [
    { ask: "heavy", left: { emoji: "🐕", name: "Dog" }, right: { emoji: "🐈", name: "Cat" }, answer: "left" },
    { ask: "light", left: { emoji: "🥛", name: "Glass of Milk" }, right: { emoji: "🪣", name: "Bucket of Water" }, answer: "left" },
    { ask: "heavy", left: { emoji: "🪑", name: "Chair" }, right: { emoji: "🛏️", name: "Bed" }, answer: "right" },
    { ask: "light", left: { emoji: "🍚", name: "Rice Bag" }, right: { emoji: "🍪", name: "Biscuit" }, answer: "right" },
    { ask: "heavy", left: { emoji: "🚗", name: "Car" }, right: { emoji: "🛵", name: "Scooter" }, answer: "left" },
    { ask: "heavy", left: { emoji: "🧸", name: "Teddy" }, right: { emoji: "🧱", name: "Brick" }, answer: "right" },
  ],
  lkg: [
    { ask: "heavy", left: { emoji: "🏋️", name: "Dumbbell" }, right: { emoji: "🎾", name: "Tennis Ball" }, answer: "left" },
    { ask: "light", left: { emoji: "✏️", name: "Pencil" }, right: { emoji: "🎒", name: "School Bag" }, answer: "left" },
    { ask: "heavy", left: { emoji: "🥔", name: "Sack of Potatoes" }, right: { emoji: "🥚", name: "Egg" }, answer: "left" },
    { ask: "light", left: { emoji: "🚁", name: "Helicopter" }, right: { emoji: "🪁", name: "Kite" }, answer: "right" },
    { ask: "heavy", left: { emoji: "🪵", name: "Wooden Log" }, right: { emoji: "🍁", name: "Leaf" }, answer: "left" },
    { ask: "light", left: { emoji: "📺", name: "Television" }, right: { emoji: "📱", name: "Mobile" }, answer: "right" },
  ],
  ukg: [
    { ask: "heavy", left: { emoji: "🚂", name: "Train" }, right: { emoji: "🚗", name: "Car" }, answer: "left" },
    { ask: "heavy", left: { emoji: "🐋", name: "Whale" }, right: { emoji: "🐬", name: "Dolphin" }, answer: "left" },
    { ask: "light", left: { emoji: "🪨", name: "Rock" }, right: { emoji: "🧽", name: "Sponge" }, answer: "right" },
    { ask: "light", left: { emoji: "🛒", name: "Full Trolley" }, right: { emoji: "🛍️", name: "Small Bag" }, answer: "right" },
    { ask: "heavy", left: { emoji: "🚢", name: "Ship" }, right: { emoji: "⛵", name: "Small Boat" }, answer: "left" },
    { ask: "light", left: { emoji: "🧊", name: "Ice Cube" }, right: { emoji: "❄️", name: "Snowflake" }, answer: "right" },
  ],
};

const makePair = (catalog) => (leftKey, rightKey, ask) => {
  const left = catalog[leftKey];
  const right = catalog[rightKey];
  const biggerSide = left.size > right.size ? "left" : "right";

  return {
    ask,
    left: { emoji: left.emoji, name: left.name },
    right: { emoji: right.emoji, name: right.name },
    answer: ask === "big" ? biggerSide : biggerSide === "left" ? "right" : "left",
  };
};

const vehicleCatalog = {
  cycle: { emoji: "🚲", name: "Cycle", size: 1 },
  auto: { emoji: "🛺", name: "Auto", size: 2 },
  car: { emoji: "🚗", name: "Car", size: 3 },
  taxi: { emoji: "🚕", name: "Taxi", size: 3 },
  truck: { emoji: "🚚", name: "Truck", size: 6 },
  bus: { emoji: "🚌", name: "Bus", size: 7 },
  airplane: { emoji: "✈️", name: "Airplane", size: 9 },
  ship: { emoji: "🚢", name: "Ship", size: 10 },
};

const domesticCatalog = {
  chick: { emoji: "🐤", name: "Chick", size: 1 },
  hen: { emoji: "🐔", name: "Hen", size: 2 },
  rabbit: { emoji: "🐇", name: "Rabbit", size: 3 },
  cat: { emoji: "🐈", name: "Cat", size: 4 },
  dog: { emoji: "🐕", name: "Dog", size: 5 },
  goat: { emoji: "🐐", name: "Goat", size: 6 },
  sheep: { emoji: "🐑", name: "Sheep", size: 7 },
  pig: { emoji: "🐖", name: "Pig", size: 8 },
  cow: { emoji: "🐄", name: "Cow", size: 9 },
  horse: { emoji: "🐎", name: "Horse", size: 10 },
  buffalo: { emoji: "🐃", name: "Buffalo", size: 11 },
};

const wildCatalog = {
  ant: { emoji: "🐜", name: "Ant", size: 1 },
  squirrel: { emoji: "🐿️", name: "Squirrel", size: 2 },
  monkey: { emoji: "🐒", name: "Monkey", size: 3 },
  fox: { emoji: "🦊", name: "Fox", size: 4 },
  deer: { emoji: "🦌", name: "Deer", size: 5 },
  zebra: { emoji: "🦓", name: "Zebra", size: 6 },
  lion: { emoji: "🦁", name: "Lion", size: 7 },
  tiger: { emoji: "🐅", name: "Tiger", size: 8 },
  bear: { emoji: "🐻", name: "Bear", size: 9 },
  camel: { emoji: "🐪", name: "Camel", size: 10 },
  giraffe: { emoji: "🦒", name: "Giraffe", size: 11 },
  rhino: { emoji: "🦏", name: "Rhino", size: 12 },
  elephant: { emoji: "🐘", name: "Elephant", size: 13 },
};

const waterCatalog = {
  prawn: { emoji: "🦐", name: "Prawn", size: 1 },
  crab: { emoji: "🦀", name: "Crab", size: 2 },
  fish: { emoji: "🐟", name: "Fish", size: 3 },
  octopus: { emoji: "🐙", name: "Octopus", size: 4 },
  turtle: { emoji: "🐢", name: "Turtle", size: 5 },
  seal: { emoji: "🦭", name: "Seal", size: 6 },
  dolphin: { emoji: "🐬", name: "Dolphin", size: 7 },
  shark: { emoji: "🦈", name: "Shark", size: 8 },
  whale: { emoji: "🐋", name: "Whale", size: 9 },
};

const birdCatalog = {
  chick: { emoji: "🐤", name: "Chick", size: 1 },
  sparrow: { emoji: "🐦", name: "Sparrow", size: 2 },
  dove: { emoji: "🕊️", name: "Dove", size: 3 },
  parrot: { emoji: "🦜", name: "Parrot", size: 4 },
  owl: { emoji: "🦉", name: "Owl", size: 5 },
  duck: { emoji: "🦆", name: "Duck", size: 6 },
  penguin: { emoji: "🐧", name: "Penguin", size: 7 },
  eagle: { emoji: "🦅", name: "Eagle", size: 8 },
  flamingo: { emoji: "🦩", name: "Flamingo", size: 9 },
  turkey: { emoji: "🦃", name: "Turkey", size: 10 },
  swan: { emoji: "🦢", name: "Swan", size: 11 },
  peacock: { emoji: "🦚", name: "Peacock", size: 12 },
};

const vehiclePair = makePair(vehicleCatalog);
const domesticPair = makePair(domesticCatalog);
const wildPair = makePair(wildCatalog);
const waterPair = makePair(waterCatalog);
const birdPair = makePair(birdCatalog);

// Every class keeps meeting one anchor picture and only the partner changes, so the
// child always compares against something already familiar.
const vehiclesBank = {
  // PG -> Auto
  pg: [
    vehiclePair("auto", "bus", "big"),
    vehiclePair("auto", "cycle", "big"),
    vehiclePair("auto", "airplane", "big"),
    vehiclePair("auto", "car", "small"),
    vehiclePair("auto", "ship", "big"),
  ],
  // Nursery -> Truck
  nursery: [
    vehiclePair("truck", "cycle", "big"),
    vehiclePair("truck", "auto", "big"),
    vehiclePair("truck", "car", "big"),
    vehiclePair("truck", "taxi", "small"),
    vehiclePair("truck", "airplane", "big"),
    vehiclePair("truck", "ship", "big"),
  ],
  // LKG -> Bus
  lkg: [
    vehiclePair("bus", "cycle", "big"),
    vehiclePair("bus", "auto", "small"),
    vehiclePair("bus", "car", "big"),
    vehiclePair("bus", "taxi", "big"),
    vehiclePair("bus", "airplane", "big"),
    vehiclePair("bus", "ship", "small"),
  ],
  // UKG -> Taxi
  ukg: [
    vehiclePair("taxi", "cycle", "big"),
    vehiclePair("taxi", "auto", "big"),
    vehiclePair("taxi", "truck", "small"),
    vehiclePair("taxi", "bus", "big"),
    vehiclePair("taxi", "airplane", "big"),
    vehiclePair("taxi", "ship", "small"),
  ],
};

const domesticAnimalsBank = {
  // PG -> Dog
  pg: [
    domesticPair("dog", "chick", "big"),
    domesticPair("dog", "cow", "big"),
    domesticPair("dog", "cat", "big"),
    domesticPair("dog", "hen", "small"),
    domesticPair("dog", "horse", "big"),
    domesticPair("dog", "rabbit", "big"),
  ],
  // Nursery -> Cow
  nursery: [
    domesticPair("cow", "hen", "big"),
    domesticPair("cow", "cat", "big"),
    domesticPair("cow", "goat", "big"),
    domesticPair("cow", "buffalo", "big"),
    domesticPair("cow", "chick", "small"),
    domesticPair("cow", "horse", "small"),
  ],
  // LKG -> Goat
  lkg: [
    domesticPair("goat", "rabbit", "big"),
    domesticPair("goat", "buffalo", "small"),
    domesticPair("goat", "chick", "big"),
    domesticPair("goat", "pig", "big"),
    domesticPair("goat", "dog", "big"),
    domesticPair("goat", "horse", "small"),
  ],
  // UKG -> Horse
  ukg: [
    domesticPair("horse", "cat", "big"),
    domesticPair("horse", "buffalo", "small"),
    domesticPair("horse", "chick", "big"),
    domesticPair("horse", "dog", "big"),
    domesticPair("horse", "cow", "big"),
    domesticPair("horse", "rabbit", "small"),
  ],
};

const wildAnimalsBank = {
  // PG -> Lion
  pg: [
    wildPair("lion", "ant", "big"),
    wildPair("lion", "elephant", "big"),
    wildPair("lion", "monkey", "big"),
    wildPair("lion", "squirrel", "small"),
    wildPair("lion", "giraffe", "big"),
    wildPair("lion", "deer", "big"),
  ],
  // Nursery -> Elephant
  nursery: [
    wildPair("elephant", "monkey", "big"),
    wildPair("elephant", "ant", "big"),
    wildPair("elephant", "deer", "big"),
    wildPair("elephant", "giraffe", "big"),
    wildPair("elephant", "squirrel", "small"),
    wildPair("elephant", "tiger", "big"),
  ],
  // LKG -> Tiger
  lkg: [
    wildPair("tiger", "fox", "big"),
    wildPair("tiger", "rhino", "small"),
    wildPair("tiger", "squirrel", "big"),
    wildPair("tiger", "zebra", "big"),
    wildPair("tiger", "elephant", "big"),
    wildPair("tiger", "ant", "small"),
  ],
  // UKG -> Giraffe
  ukg: [
    wildPair("giraffe", "zebra", "big"),
    wildPair("giraffe", "elephant", "small"),
    wildPair("giraffe", "monkey", "big"),
    wildPair("giraffe", "camel", "big"),
    wildPair("giraffe", "ant", "big"),
    wildPair("giraffe", "deer", "big"),
  ],
};

const waterAnimalsBank = {
  // PG -> Fish
  pg: [
    waterPair("fish", "whale", "big"),
    waterPair("fish", "prawn", "big"),
    waterPair("fish", "crab", "big"),
    waterPair("fish", "shark", "big"),
    waterPair("fish", "dolphin", "big"),
    waterPair("fish", "octopus", "small"),
  ],
  // Nursery -> Whale
  nursery: [
    waterPair("whale", "fish", "big"),
    waterPair("whale", "crab", "big"),
    waterPair("whale", "dolphin", "big"),
    waterPair("whale", "prawn", "small"),
    waterPair("whale", "turtle", "big"),
    waterPair("whale", "shark", "big"),
  ],
  // LKG -> Turtle
  lkg: [
    waterPair("turtle", "prawn", "big"),
    waterPair("turtle", "whale", "small"),
    waterPair("turtle", "crab", "big"),
    waterPair("turtle", "shark", "small"),
    waterPair("turtle", "fish", "big"),
    waterPair("turtle", "dolphin", "big"),
  ],
  // UKG -> Dolphin
  ukg: [
    waterPair("dolphin", "whale", "small"),
    waterPair("dolphin", "fish", "big"),
    waterPair("dolphin", "octopus", "big"),
    waterPair("dolphin", "crab", "big"),
    waterPair("dolphin", "seal", "big"),
    waterPair("dolphin", "prawn", "small"),
  ],
};

const birdsBank = {
  // PG -> Parrot
  pg: [
    birdPair("parrot", "chick", "big"),
    birdPair("parrot", "peacock", "big"),
    birdPair("parrot", "sparrow", "big"),
    birdPair("parrot", "eagle", "big"),
    birdPair("parrot", "dove", "small"),
    birdPair("parrot", "swan", "big"),
  ],
  // Nursery -> Peacock
  nursery: [
    birdPair("peacock", "sparrow", "big"),
    birdPair("peacock", "chick", "big"),
    birdPair("peacock", "parrot", "big"),
    birdPair("peacock", "dove", "small"),
    birdPair("peacock", "owl", "big"),
    birdPair("peacock", "duck", "big"),
  ],
  // LKG -> Sparrow
  lkg: [
    birdPair("sparrow", "eagle", "big"),
    birdPair("sparrow", "chick", "big"),
    birdPair("sparrow", "swan", "small"),
    birdPair("sparrow", "owl", "big"),
    birdPair("sparrow", "dove", "small"),
    birdPair("sparrow", "turkey", "big"),
  ],
  // UKG -> Eagle
  ukg: [
    birdPair("eagle", "sparrow", "big"),
    birdPair("eagle", "peacock", "small"),
    birdPair("eagle", "owl", "big"),
    birdPair("eagle", "chick", "big"),
    birdPair("eagle", "swan", "small"),
    birdPair("eagle", "parrot", "small"),
  ],
};

const bigOrSmallBank = {
  vehicles: vehiclesBank,
  domesticAnimals: domesticAnimalsBank,
  wildAnimals: wildAnimalsBank,
  waterAnimals: waterAnimalsBank,
  birds: birdsBank,
};

// Big or Small picks its questions through bigOrSmallBank[category][class] instead,
// so it is deliberately not listed here.
const banks = {
  compare: compareBank,
  series: seriesBank,
  identifyNumber: identifyNumberBank,
  moreOrLess: moreOrLessBank,
  heavyOrLight: heavyOrLightBank,
};

/* ------------------------------- HELPERS -------------------------------- */

const signs = [
  { symbol: ">", label: "Greater than" },
  { symbol: "<", label: "Less than" },
  { symbol: "=", label: "Equal to" },
];

const correctSign = (left, right) => {
  if (left > right) return ">";
  if (left < right) return "<";
  return "=";
};

const compareWords = (left, right) => {
  if (left > right) return `${left} is bigger than ${right}`;
  if (left < right) return `${left} is smaller than ${right}`;
  return `${left} is equal to ${right}`;
};

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
const coinFlip = () => Math.random() < 0.5;

/* ----------------------- ENDLESS QUESTION GENERATORS ---------------------- */
/* Every mode opens with its hand-written bank, then draws on the generator below for
   as long as the child wants to carry on playing.                                  */

// The number range each class plays inside, matching the promise on its class card.
const classRanges = {
  pg: { min: 1, max: 5 },
  nursery: { min: 1, max: 10 },
  lkg: { min: 1, max: 20 },
  ukg: { min: 1, max: 100 },
};

const countingEmojis = [
  "🍎", "🐟", "⭐", "🎈", "🍌", "🚗", "🐥", "🍇",
  "🌸", "🐞", "⚽", "🦋", "🍓", "🐝", "🌼", "🧸",
];

// 1. FILL THE BLANK WITH =, > OR <
// Equal pairs stay deliberately common — left to chance, "=" would almost never be the
// answer and the child would quietly learn to stop considering it.
const makeCompareItem = (classId) => {
  const { min, max } = classRanges[classId];
  const left = randomInt(min, max);

  if (Math.random() < 0.25) return [left, left];

  let right = randomInt(min, max);
  while (right === left) right = randomInt(min, max);

  return [left, right];
};

// 2. NUMBER SERIES
// Every class counts inside its own range, with the step sizes that suit it.
const seriesRules = {
  pg: { max: 5, steps: [1], lengths: [3, 4] },
  nursery: { max: 10, steps: [1], lengths: [4, 5] },
  lkg: { max: 20, steps: [1, 2, 5], lengths: [4, 5] },
  ukg: { max: 100, steps: [1, 2, 5, 10], lengths: [4, 5] },
};

const makeSeriesItem = (classId) => {
  const rule = seriesRules[classId];
  const step = pick(rule.steps);

  // A stepped series starts on a multiple of its step, so it reads 5, 10, 15, 20
  // rather than 3, 8, 13, 18.
  const minStart = step === 1 ? 1 : step;

  // Only the lengths that still finish inside this class's range.
  const fits = rule.lengths.filter((len) => minStart + step * (len - 1) <= rule.max);
  const length = pick(fits.length ? fits : [rule.lengths[0]]);

  const maxStart = rule.max - step * (length - 1);
  const start =
    step === 1
      ? minStart + Math.floor(Math.random() * (maxStart - minStart + 1))
      : step * (1 + Math.floor(Math.random() * Math.floor(maxStart / step)));

  const series = Array.from({ length }, (_, i) => start + i * step);
  const blank = Math.floor(Math.random() * length);
  const answer = series[blank];

  // The near misses a child actually reaches for: one step out either way, then the
  // numbers either side. A couple always survive, so there are never too few options.
  const nearMisses = [answer + step, answer - step, answer + 1, answer - 1, answer + 2 * step];
  const wrong = shuffle([
    ...new Set(nearMisses.filter((num) => num > 0 && num !== answer)),
  ]).slice(0, 2);

  return { series, blank, wrong };
};

// 3. COUNT & IDENTIFY THE NUMBER
const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
const teens = [
  "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen",
  "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen",
];
const tensWords = [
  "", "", "Twenty", "Thirty", "Forty",
  "Fifty", "Sixty", "Seventy", "Eighty", "Ninety",
];

const numberToWords = (num) => {
  if (num === 100) return "One Hundred";
  if (num < 10) return ones[num];
  if (num < 20) return teens[num - 10];

  const ten = Math.floor(num / 10);
  const one = num % 10;

  return one ? `${tensWords[ten]} ${ones[one]}` : tensWords[ten];
};

const makeIdentifyNumberItem = (classId) => {
  const { max } = classRanges[classId];

  // PG and Nursery count pictures; the older classes read the number's name.
  if (classId === "pg" || classId === "nursery") {
    const count = randomInt(1, max);

    // Distractors stay inside the class's own range, so a child counting to five is
    // never offered a seven.
    const nearMisses = [count + 1, count - 1, count + 2, count - 2];
    const wrong = shuffle([
      ...new Set(nearMisses.filter((num) => num >= 1 && num <= max && num !== count)),
    ]).slice(0, 2);

    return { emoji: pick(countingEmojis), count, wrong };
  }

  const number = randomInt(classId === "lkg" ? 1 : 20, max);

  // The mix-ups that actually catch children out: the digits the other way round
  // (34 / 43), the same digits at the wrong scale (15 / 50), then the neighbours.
  const swapped = Number(String(number).split("").reverse().join(""));
  const candidates = [
    swapped,
    number * 10,
    Math.floor(number / 10),
    number + 1,
    number - 1,
    number + 9,
  ];
  const wrong = shuffle([
    ...new Set(candidates.filter((num) => num >= 1 && num <= 100 && num !== number)),
  ]).slice(0, 2);

  return { words: numberToWords(number), number, wrong };
};

// 4. MORE OR LESS
const makeMoreOrLessItem = (classId) => {
  const { min, max } = classRanges[classId];
  const left = randomInt(min, max);

  let right = randomInt(min, max);
  while (right === left) right = randomInt(min, max);

  const ask = coinFlip() ? "more" : "less";

  // PG and Nursery compare groups of pictures, the older classes compare numerals.
  return classId === "pg" || classId === "nursery"
    ? { emoji: pick(countingEmojis), left, right, ask }
    : { left, right, ask };
};

// 5. HEAVY OR LIGHT
// Ordered lightest to heaviest. Only the order matters — the gap rule below keeps the
// two sides far enough apart that the answer is never a judgement call.
const weightCatalog = [
  { emoji: "🪶", name: "Feather" },
  { emoji: "❄️", name: "Snowflake" },
  { emoji: "🍂", name: "Leaf" },
  { emoji: "🐜", name: "Ant" },
  { emoji: "🍪", name: "Biscuit" },
  { emoji: "🍓", name: "Strawberry" },
  { emoji: "🎈", name: "Balloon" },
  { emoji: "✏️", name: "Pencil" },
  { emoji: "🧽", name: "Sponge" },
  { emoji: "🧊", name: "Ice Cube" },
  { emoji: "🥚", name: "Egg" },
  { emoji: "🎾", name: "Tennis Ball" },
  { emoji: "📱", name: "Mobile" },
  { emoji: "🛍️", name: "Small Bag" },
  { emoji: "📕", name: "Book" },
  { emoji: "🪁", name: "Kite" },
  { emoji: "🥛", name: "Glass of Milk" },
  { emoji: "🧸", name: "Teddy" },
  { emoji: "🧱", name: "Brick" },
  { emoji: "🪨", name: "Stone" },
  { emoji: "🍉", name: "Watermelon" },
  { emoji: "🎒", name: "School Bag" },
  { emoji: "🏋️", name: "Dumbbell" },
  { emoji: "🪣", name: "Bucket of Water" },
  { emoji: "📺", name: "Television" },
  { emoji: "🐈", name: "Cat" },
  { emoji: "🐕", name: "Dog" },
  { emoji: "🪑", name: "Chair" },
  { emoji: "🥔", name: "Sack of Potatoes" },
  { emoji: "🍚", name: "Rice Bag" },
  { emoji: "🛒", name: "Full Trolley" },
  { emoji: "🚲", name: "Cycle" },
  { emoji: "🛏️", name: "Bed" },
  { emoji: "🛵", name: "Scooter" },
  { emoji: "🐬", name: "Dolphin" },
  { emoji: "🐄", name: "Cow" },
  { emoji: "🚗", name: "Car" },
  { emoji: "🚁", name: "Helicopter" },
  { emoji: "🐘", name: "Elephant" },
  { emoji: "🚌", name: "Bus" },
  { emoji: "🚂", name: "Train" },
  { emoji: "🐋", name: "Whale" },
  { emoji: "🚢", name: "Ship" },
];

// How far apart the two things must sit in that list. The little ones get glaring
// contrasts; the older classes get to weigh up closer calls.
const weightGaps = { pg: 12, nursery: 9, lkg: 6, ukg: 4 };

const makeHeavyOrLightItem = (classId) => {
  const gap = weightGaps[classId];
  const lighter = randomInt(0, weightCatalog.length - 1 - gap);
  const heavier = randomInt(lighter + gap, weightCatalog.length - 1);

  const ask = coinFlip() ? "heavy" : "light";
  const heavierOnLeft = coinFlip();
  const heavierSide = heavierOnLeft ? "left" : "right";
  const lighterSide = heavierOnLeft ? "right" : "left";

  return {
    ask,
    left: heavierOnLeft ? weightCatalog[heavier] : weightCatalog[lighter],
    right: heavierOnLeft ? weightCatalog[lighter] : weightCatalog[heavier],
    answer: ask === "heavy" ? heavierSide : lighterSide,
  };
};

// 6. BIG OR SMALL
const bigOrSmallCatalogs = {
  vehicles: vehicleCatalog,
  domesticAnimals: domesticCatalog,
  wildAnimals: wildCatalog,
  waterAnimals: waterCatalog,
  birds: birdCatalog,
};

// The anchor picture each class keeps meeting, so only the partner changes — the same
// pairing the hand-written banks above were built around.
const bigOrSmallAnchors = {
  vehicles: { pg: "auto", nursery: "truck", lkg: "bus", ukg: "taxi" },
  domesticAnimals: { pg: "dog", nursery: "cow", lkg: "goat", ukg: "horse" },
  wildAnimals: { pg: "lion", nursery: "elephant", lkg: "tiger", ukg: "giraffe" },
  waterAnimals: { pg: "fish", nursery: "whale", lkg: "turtle", ukg: "dolphin" },
  birds: { pg: "parrot", nursery: "peacock", lkg: "sparrow", ukg: "eagle" },
};

const makeBigOrSmallItem = (classId, categoryId) => {
  const catalog = bigOrSmallCatalogs[categoryId];
  const anchor = catalog[bigOrSmallAnchors[categoryId][classId]];

  // Matching sizes would leave the question with no answer, so the partner is always a
  // different size — compared by size rather than by key, since some tie (car/taxi).
  const partner = pick(Object.values(catalog).filter((item) => item.size !== anchor.size));

  const ask = coinFlip() ? "big" : "small";
  const anchorOnLeft = coinFlip();
  const left = anchorOnLeft ? anchor : partner;
  const right = anchorOnLeft ? partner : anchor;
  const biggerSide = left.size > right.size ? "left" : "right";
  const smallerSide = biggerSide === "left" ? "right" : "left";

  return {
    ask,
    left: { emoji: left.emoji, name: left.name },
    right: { emoji: right.emoji, name: right.name },
    answer: ask === "big" ? biggerSide : smallerSide,
  };
};

// Each mode's generator, so any round can be topped up for ever. Big or Small is the
// one that also needs the chosen category.
const questionMakers = {
  compare: makeCompareItem,
  series: makeSeriesItem,
  identifyNumber: makeIdentifyNumberItem,
  moreOrLess: makeMoreOrLessItem,
  heavyOrLight: makeHeavyOrLightItem,
  bigOrSmall: makeBigOrSmallItem,
};

// Earn a star every time this many questions have been tried.
const starEvery = 10;

// Turns a raw bank item into one shape the game screen can render for every mode.
const buildQuestion = (modeId, item, classInfo) => {
  if (modeId === "compare") {
    const [left, right] = item;
    const answer = correctSign(left, right);

    return {
      prompt: "Fill the blank with =, > or <",
      visual: { kind: "compare", left, right, objectEmoji: classInfo.objectEmoji },
      options: signs.map((sign) => ({ key: sign.symbol, main: sign.symbol, sub: sign.label })),
      columns: 3,
      answer,
      explanation: `${left} ${answer} ${right} — ${compareWords(left, right)}`,
      speech: `Which sign fits? ${left} or ${right}`,
    };
  }

  if (modeId === "series") {
    const answer = String(item.series[item.blank]);

    return {
      prompt: "Which number is missing?",
      visual: {
        kind: "series",
        parts: item.series.map((num, i) => (i === item.blank ? "?" : String(num))),
      },
      options: shuffle([answer, ...item.wrong.map(String)]).map((value) => ({
        key: value,
        main: value,
      })),
      columns: 3,
      answer,
      explanation: `The series is ${item.series.join(", ")}`,
      speech: `Which number is missing in ${item.series
        .map((num, i) => (i === item.blank ? "blank" : num))
        .join(", ")}`,
    };
  }

  if (modeId === "identifyNumber") {
    const isCounting = Boolean(item.emoji);
    const answer = String(isCounting ? item.count : item.number);

    return {
      prompt: isCounting ? "How many do you see?" : "Which number is this?",
      visual: isCounting
        ? { kind: "objects", emoji: item.emoji, count: item.count }
        : { kind: "words", text: item.words },
      options: shuffle([answer, ...item.wrong.map(String)]).map((value) => ({
        key: value,
        main: value,
      })),
      columns: 3,
      answer,
      explanation: isCounting
        ? `There are ${item.count} ${item.emoji}`
        : `${item.words} is written as ${item.number}`,
      speech: isCounting ? "How many do you see?" : `Which number is ${item.words}?`,
    };
  }

  if (modeId === "moreOrLess") {
    const wantsMore = item.ask === "more";
    const answer =
      (wantsMore && item.left > item.right) || (!wantsMore && item.left < item.right)
        ? "left"
        : "right";
    const winner = answer === "left" ? item.left : item.right;
    const other = answer === "left" ? item.right : item.left;

    return {
      prompt: wantsMore ? "Which side has more?" : "Which side has less?",
      visual: null,
      options: [
        {
          key: "left",
          main: item.emoji ? item.emoji.repeat(item.left) : String(item.left),
          sub: item.emoji ? `${item.left}` : null,
        },
        {
          key: "right",
          main: item.emoji ? item.emoji.repeat(item.right) : String(item.right),
          sub: item.emoji ? `${item.right}` : null,
        },
      ],
      columns: 2,
      answer,
      explanation: `${winner} is ${wantsMore ? "more" : "less"} than ${other}`,
      speech: wantsMore ? "Which side has more?" : "Which side has less?",
    };
  }

  // heavyOrLight and bigOrSmall share the same two-picture layout
  const isWeight = modeId === "heavyOrLight";
  const asking = item.ask;
  const winner = item.answer === "left" ? item.left : item.right;
  const other = item.answer === "left" ? item.right : item.left;

  const promptText = {
    heavy: "Which one is heavier?",
    light: "Which one is lighter?",
    big: "Which one is bigger?",
    small: "Which one is smaller?",
  }[asking];

  const wordFor = { heavy: "heavier", light: "lighter", big: "bigger", small: "smaller" }[asking];

  return {
    prompt: promptText,
    visual: null,
    options: [
      { key: "left", main: item.left.emoji, sub: item.left.name },
      { key: "right", main: item.right.emoji, sub: item.right.name },
    ],
    columns: 2,
    answer: item.answer,
    explanation: `${winner.name} is ${wordFor} than ${other.name}`,
    speech: `${promptText} ${item.left.name} or ${item.right.name}`,
    isWeight,
  };
};

const NumeracySkillsCognitiveSkill = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [showResult, setShowResult] = useState(false);

  const question = questions[current];

  // Big or Small is the one mode that picks its questions by category as well as class.
  const startGame = (modeId, categoryId = null) => {
    const classInfo = classes.find((cls) => cls.id === selectedClass);
    const items =
      modeId === "bigOrSmall"
        ? bigOrSmallBank[categoryId][selectedClass]
        : banks[modeId][selectedClass];

    // A round opens with the hand-written questions in a fresh order, then carries
    // on with generated ones for as long as the child keeps playing.
    const seed = shuffle(items);

    setSelectedMode(modeId);
    setSelectedCategory(categoryId);
    setQuestions(seed.map((item) => buildQuestion(modeId, item, classInfo)));
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFeedback("");
    setShowResult(false);
  };

  const speak = () => {
    const speech = new SpeechSynthesisUtterance(question.speech);
    speech.rate = 0.8;
    window.speechSynthesis.speak(speech);
  };

  const checkAnswer = (key) => {
    if (selected) return;

    setSelected(key);

    if (key === question.answer) {
      setScore((prev) => prev + 1);
      setFeedback("🎉 Excellent!");
    } else {
      setFeedback("😊 Good Try!");
    }
  };

  const nextQuestion = () => {
    // Each mode tops itself up on the way past the last question, so the child
    // decides when to stop rather than the length of the bank.
    if (current + 1 >= questions.length) {
      const classInfo = classes.find((cls) => cls.id === selectedClass);
      const makeItem = questionMakers[selectedMode];

      setQuestions((prev) => [
        ...prev,
        buildQuestion(
          selectedMode,
          makeItem(selectedClass, selectedCategory),
          classInfo,
        ),
      ]);
    }

    setCurrent((prev) => prev + 1);
    setSelected(null);
    setFeedback("");
  };

  const clearRound = () => {
    setQuestions([]);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFeedback("");
    setShowResult(false);
  };

  // Stays inside Big or Small and drops back to its category cards.
  const backToCategories = () => {
    clearRound();
    setSelectedCategory(null);
  };

  const backToModes = () => {
    clearRound();
    setSelectedCategory(null);
    setSelectedMode(null);
  };

  const backToClasses = () => {
    backToModes();
    setSelectedClass(null);
  };

  // CLASS SELECTION PAGE
  if (!selectedClass) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-sky-200 via-teal-200 to-green-200 flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold text-teal-700 mb-2 text-center">
          🔢 Numeracy Skills 🔢
        </h1>
        <p className="text-gray-700 mb-8 text-center">Choose your class to begin</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {classes.map((cls) => (
            <div key={cls.id} className="bg-white rounded-3xl p-8 text-center shadow-xl">
              <div className="text-7xl">{cls.emoji}</div>
              <h2 className={`text-3xl font-bold mt-4 ${cardStyles[cls.color].text}`}>
                {cls.name}
              </h2>
              <p className="mt-3 text-gray-600">{cls.desc}</p>

              <button
                onClick={() => setSelectedClass(cls.id)}
                className={`mt-6 ${cardStyles[cls.color].bg} text-white px-6 py-3 rounded-full text-lg`}
              >
                ▶ Choose
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const classInfo = classes.find((cls) => cls.id === selectedClass);

  // GAME SELECTION PAGE
  if (!selectedMode) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-sky-200 via-teal-200 to-green-200 flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold text-teal-700 mb-2 text-center">
          {classInfo.emoji} {classInfo.name}
        </h1>
        <p className="text-gray-700 mb-8 text-center">Which game do you want to play?</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {modes.map((mode) => (
            <div key={mode.id} className="bg-white rounded-3xl p-6 text-center shadow-xl">
              <div className="text-6xl">{mode.emoji}</div>
              <h2 className="text-xl font-bold mt-4 text-teal-600">{mode.name}</h2>
              <p className="mt-2 text-sm text-gray-600">{mode.desc}</p>

              <button
                onClick={() =>
                  mode.id === "bigOrSmall" ? setSelectedMode(mode.id) : startGame(mode.id)
                }
                className="mt-5 bg-teal-500 text-white px-6 py-3 rounded-full text-lg"
              >
                {mode.id === "bigOrSmall" ? "▶ Choose Category" : "▶ Play Now"}
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={backToClasses}
          className="mt-8 bg-white text-gray-700 px-6 py-3 rounded-full shadow"
        >
          ⬅ Back To Classes
        </button>
      </div>
    );
  }

  // CATEGORY SELECTION PAGE (Big or Small only)
  if (selectedMode === "bigOrSmall" && !selectedCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-sky-200 via-teal-200 to-green-200 flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold text-teal-700 mb-2 text-center">
          🐘 Big or Small 🐁
        </h1>
        <p className="text-gray-700 mb-8 text-center">
          {classInfo.emoji} {classInfo.name} • Which pictures do you want to play with?
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {bigOrSmallCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-3xl p-6 text-center shadow-xl">
              <div className="text-7xl">{category.emoji}</div>

              <h2 className={`text-2xl font-bold mt-4 ${cardStyles[category.color].text}`}>
                {category.name}
              </h2>

              <p className="mt-2 text-sm text-gray-600">{category.desc}</p>

              <button
                onClick={() => startGame("bigOrSmall", category.id)}
                className={`mt-5 ${cardStyles[category.color].bg} text-white px-6 py-3 rounded-full text-lg`}
              >
                ▶ Play Now
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={backToModes}
          className="mt-8 bg-white text-gray-700 px-6 py-3 rounded-full shadow"
        >
          ⬅ Back To Games
        </button>
      </div>
    );
  }

  const modeInfo = modes.find((mode) => mode.id === selectedMode);
  const categoryInfo = bigOrSmallCategories.find((cat) => cat.id === selectedCategory);
  // A question counts as tried the moment an option is picked, so the totals stay
  // correct for a child who walks away mid-round.
  const attempted = current + (selected ? 1 : 0);
  // A round has no fixed total to fill up, so the bar tracks the walk to the next
  // star instead.
  const stars = Math.floor(attempted / starEvery);
  const toNextStar = starEvery - (attempted % starEvery);
  const progress = ((attempted % starEvery) / starEvery) * 100;

  // RESULT PAGE
  if (showResult) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-200 via-teal-200 to-green-200 p-4">
        <div className="bg-white rounded-3xl p-8 text-center shadow-xl w-full max-w-md">
          <div className="text-7xl">🏆</div>

          <h1 className="text-4xl font-bold text-green-600 mt-4">Wonderful!</h1>

          <p className="text-gray-600 mt-2">
            {classInfo.name} • {modeInfo.name}
            {categoryInfo && ` • ${categoryInfo.name}`}
          </p>

          <h2 className="text-2xl mt-4">
            Score : {score} / {attempted}
          </h2>

          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={() => startGame(selectedMode, selectedCategory)}
              className="bg-teal-500 text-white px-6 py-3 rounded-full text-lg"
            >
              🔄 Play Again
            </button>

            {categoryInfo && (
              <button
                onClick={backToCategories}
                className="bg-indigo-500 text-white px-6 py-3 rounded-full text-lg"
              >
                🗂️ Choose Another Category
              </button>
            )}

            <button
              onClick={backToModes}
              className="bg-purple-500 text-white px-6 py-3 rounded-full text-lg"
            >
              🎮 Choose Another Game
            </button>

            <button
              onClick={backToClasses}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-full text-lg"
            >
              ⬅ Back To Classes
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { visual } = question;

  // GAME PAGE
  return (
    <div className="min-h-screen flex justify-center items-center p-4 bg-gradient-to-r from-sky-200 via-teal-200 to-green-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl p-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-teal-600">
          {modeInfo.emoji} {modeInfo.name}
        </h1>

        <p className="text-gray-500 mt-1">
          {classInfo.emoji} {classInfo.name}
          {categoryInfo && ` • ${categoryInfo.emoji} ${categoryInfo.name}`}
        </p>

        <div className="flex gap-3 mt-6">
          <div className="flex-1 bg-teal-400 text-white p-3 rounded-2xl">
            <div className="text-xs uppercase tracking-wide">Total Tried</div>

            <div className="text-lg font-bold">
              {attempted}
            </div>
          </div>

          <div className="flex-1 bg-yellow-400 text-white p-3 rounded-2xl">
            <div className="text-xs uppercase tracking-wide">Scored</div>

            <div className="text-lg font-bold">
              {score} / {attempted}
            </div>
          </div>
        </div>

        <div className="w-full h-3 bg-gray-200 rounded-full mt-5 overflow-hidden">
          <div className="h-full bg-green-500" style={{ width: `${progress}%` }} />
        </div>

        <p className="text-sm text-gray-500 mt-2">
          {stars > 0 && `⭐ × ${stars} • `}
          {toNextStar} more for the next star
        </p>

        <div className="bg-teal-50 border-4 border-dashed border-teal-400 rounded-3xl p-6 mt-6">
          <h2 className="text-2xl font-bold">{question.prompt}</h2>

          {visual && visual.kind === "compare" && (
            <>
              <div className="flex items-center justify-center gap-5 mt-6">
                <div className="text-6xl font-bold text-teal-600">{visual.left}</div>

                <div className="w-20 h-20 flex items-center justify-center rounded-2xl border-4 border-dashed border-orange-400 bg-white text-5xl font-bold text-orange-500">
                  {selected || "?"}
                </div>

                <div className="text-6xl font-bold text-teal-600">{visual.right}</div>
              </div>

              {visual.objectEmoji && (
                <div className="flex items-start justify-center gap-5 mt-5 text-2xl">
                  <div className="flex-1 max-w-[38%]">
                    {visual.objectEmoji.repeat(visual.left)}
                  </div>

                  <div className="w-20" />

                  <div className="flex-1 max-w-[38%]">
                    {visual.objectEmoji.repeat(visual.right)}
                  </div>
                </div>
              )}
            </>
          )}

          {visual && visual.kind === "series" && (
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              {visual.parts.map((part, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 flex items-center justify-center rounded-2xl text-3xl font-bold ${
                    part === "?"
                      ? "border-4 border-dashed border-orange-400 bg-white text-orange-500"
                      : "bg-teal-100 text-teal-700"
                  }`}
                >
                  {part === "?" ? selected || "?" : part}
                </div>
              ))}
            </div>
          )}

          {visual && visual.kind === "objects" && (
            <div className="text-4xl leading-relaxed mt-6 tracking-wider">
              {visual.emoji.repeat(visual.count)}
            </div>
          )}

          {visual && visual.kind === "words" && (
            <div className="text-5xl font-bold text-teal-600 mt-6">{visual.text}</div>
          )}

          <button
            onClick={speak}
            className="mt-5 bg-blue-500 text-white px-5 py-2 rounded-full"
          >
            🔊 Listen
          </button>

          <div
            className={`grid gap-4 mt-6 ${
              question.columns === 2 ? "grid-cols-2" : "grid-cols-3"
            }`}
          >
            {question.options.map((option) => (
              <button
                key={option.key}
                onClick={() => checkAnswer(option.key)}
                className={`p-4 rounded-2xl text-white transition ${
                  selected
                    ? option.key === question.answer
                      ? "bg-green-500"
                      : option.key === selected
                        ? "bg-red-500"
                        : "bg-blue-400"
                    : "bg-blue-400 hover:scale-105"
                }`}
              >
                <div className="text-3xl md:text-4xl font-bold wrap-break-word">{option.main}</div>
                {option.sub && <div className="text-xs mt-1">{option.sub}</div>}
              </button>
            ))}
          </div>

          <div className="text-2xl font-bold mt-5">{feedback}</div>

          {selected && <div className="text-gray-600 mt-2">{question.explanation}</div>}

          {selected && (
            <button
              onClick={nextQuestion}
              className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-full"
            >
              Next ➜
            </button>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {attempted > 0 && (
            <button
              onClick={() => setShowResult(true)}
              className="bg-green-500 text-white px-6 py-2 rounded-full"
            >
              🏁 Finish & See Score
            </button>
          )}

          <button
            onClick={categoryInfo ? backToCategories : backToModes}
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded-full"
          >
            {categoryInfo ? "⬅ Back To Categories" : "⬅ Back To Games"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NumeracySkillsCognitiveSkill;

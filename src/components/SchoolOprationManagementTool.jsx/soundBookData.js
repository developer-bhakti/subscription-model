// The Sound Book content.
//
// Every book is a list of items in one shape, so a single player can show any of them:
//
//   image    the picture on the first card (an emoji)
//   count    when set, `image` is repeated this many times, so a number shows what it counts
//   caption  words under the picture, if any
//   big      what the second card shows in large type
//   small    an optional smaller companion beside it, such as the lowercase letter
//   strip    what the item's button in the jump strip shows
//   speech   what is read aloud, one entry per utterance. Two entries leave a real pause
//            between them, so the name lands on its own before the sentence that follows.

// Alphabet: one letter, one word a two year old already knows, and a picture that reads
// clearly at a glance.
export const pgLetters = [
  { letter: "A", word: "Apple", emoji: "🍎" },
  { letter: "B", word: "Ball", emoji: "⚽" },
  { letter: "C", word: "Cat", emoji: "🐱" },
  { letter: "D", word: "Dog", emoji: "🐶" },
  { letter: "E", word: "Elephant", emoji: "🐘" },
  { letter: "F", word: "Fish", emoji: "🐟" },
  { letter: "G", word: "Goat", emoji: "🐐" },
  { letter: "H", word: "Hat", emoji: "🎩" },
  { letter: "I", word: "Ice Cream", emoji: "🍦" },
  { letter: "J", word: "Jam", emoji: "🍓" },
  { letter: "K", word: "Kite", emoji: "🪁" },
  { letter: "L", word: "Lion", emoji: "🦁" },
  { letter: "M", word: "Monkey", emoji: "🐵" },
  { letter: "N", word: "Nose", emoji: "👃" },
  { letter: "O", word: "Orange", emoji: "🍊" },
  { letter: "P", word: "Pen", emoji: "🖊️" },
  { letter: "Q", word: "Queen", emoji: "👑" },
  { letter: "R", word: "Rabbit", emoji: "🐰" },
  { letter: "S", word: "Sun", emoji: "☀️" },
  { letter: "T", word: "Tiger", emoji: "🐯" },
  { letter: "U", word: "Umbrella", emoji: "☂️" },
  { letter: "V", word: "Van", emoji: "🚐" },
  { letter: "W", word: "Watch", emoji: "⌚" },
  { letter: "X", word: "Xylophone", emoji: "🎹" },
  { letter: "Y", word: "Yo-yo", emoji: "🪀" },
  { letter: "Z", word: "Zebra", emoji: "🦓" },
];

const alphabetItems = pgLetters.map(({ letter, word, emoji }) => ({
  id: letter,
  image: emoji,
  caption: word,
  big: letter,
  small: letter.toLowerCase(),
  strip: letter,
  // Read exactly as the book always has: the letter on its own, then "A for Apple".
  speech: [`${letter}.`, `${letter} for ${word}.`],
}));

// Transport: the vehicle, then the noise it makes.
const transport = [
  { name: "Car", emoji: "🚗", sound: "vroom vroom" },
  { name: "Bus", emoji: "🚌", sound: "beep beep" },
  { name: "Train", emoji: "🚂", sound: "choo choo" },
  { name: "Aeroplane", emoji: "✈️", sound: "zoom" },
  { name: "Ship", emoji: "🚢", sound: "toot toot" },
  { name: "Cycle", emoji: "🚲", sound: "ring ring" },
  { name: "Auto", emoji: "🛺", sound: "put put" },
  { name: "Truck", emoji: "🚚", sound: "rumble rumble" },
  { name: "Helicopter", emoji: "🚁", sound: "whirr whirr" },
  { name: "Fire Engine", emoji: "🚒", sound: "wee woo wee woo" },
  { name: "Ambulance", emoji: "🚑", sound: "wee woo" },
  { name: "Tractor", emoji: "🚜", sound: "chug chug" },
];

const transportItems = transport.map(({ name, emoji, sound }) => ({
  id: name,
  image: emoji,
  big: name,
  strip: emoji,
  speech: [`${name}.`, `The ${name.toLowerCase()} goes ${sound}.`],
}));

// Animals and birds: the friend, then what it says.
const creatures = [
  { name: "Cow", emoji: "🐄", sound: "moo" },
  { name: "Dog", emoji: "🐕", sound: "woof woof" },
  { name: "Cat", emoji: "🐈", sound: "meow" },
  { name: "Goat", emoji: "🐐", sound: "meh meh" },
  { name: "Elephant", emoji: "🐘", sound: "toot toot" },
  { name: "Lion", emoji: "🦁", sound: "roar" },
  { name: "Monkey", emoji: "🐒", sound: "ooh ooh aah aah" },
  { name: "Duck", emoji: "🦆", sound: "quack quack" },
  { name: "Hen", emoji: "🐔", sound: "cluck cluck" },
  { name: "Parrot", emoji: "🦜", sound: "squawk" },
  { name: "Owl", emoji: "🦉", sound: "hoo hoo" },
  { name: "Sparrow", emoji: "🐦", sound: "tweet tweet" },
];

const creatureItems = creatures.map(({ name, emoji, sound }) => ({
  id: name,
  image: emoji,
  big: name,
  strip: emoji,
  speech: [`${name}.`, `The ${name.toLowerCase()} says ${sound}.`],
}));

// Numbers 1 to 10: the picture shows that many of something, so the number can be counted.
const counted = [
  { word: "One", emoji: "⭐", thing: "star" },
  { word: "Two", emoji: "🎈", thing: "balloons" },
  { word: "Three", emoji: "🍎", thing: "apples" },
  { word: "Four", emoji: "🌸", thing: "flowers" },
  { word: "Five", emoji: "🐟", thing: "fish" },
  { word: "Six", emoji: "🦋", thing: "butterflies" },
  { word: "Seven", emoji: "🍓", thing: "strawberries" },
  { word: "Eight", emoji: "⚽", thing: "balls" },
  { word: "Nine", emoji: "🐥", thing: "chicks" },
  { word: "Ten", emoji: "🍪", thing: "cookies" },
];

const numberItems = counted.map(({ word, emoji, thing }, index) => ({
  id: String(index + 1),
  image: emoji,
  count: index + 1,
  caption: `${word} ${thing}`,
  big: String(index + 1),
  strip: String(index + 1),
  speech: [`${word}.`, `${word} ${thing}.`],
}));

// Fruits and vegetables: the name, then its colour.
const produce = [
  { name: "Apple", emoji: "🍎", colour: "red" },
  { name: "Banana", emoji: "🍌", colour: "yellow" },
  { name: "Mango", emoji: "🥭", colour: "yellow" },
  { name: "Orange", emoji: "🍊", colour: "orange" },
  { name: "Grapes", emoji: "🍇", colour: "purple", plural: true },
  { name: "Strawberry", emoji: "🍓", colour: "red" },
  { name: "Carrot", emoji: "🥕", colour: "orange" },
  { name: "Tomato", emoji: "🍅", colour: "red" },
  { name: "Potato", emoji: "🥔", colour: "brown" },
  { name: "Brinjal", emoji: "🍆", colour: "purple" },
  { name: "Corn", emoji: "🌽", colour: "yellow" },
  { name: "Cucumber", emoji: "🥒", colour: "green" },
];

const produceItems = produce.map(({ name, emoji, colour, plural }) => ({
  id: name,
  image: emoji,
  big: name,
  strip: emoji,
  speech: [`${name}.`, `${name} ${plural ? "are" : "is"} ${colour}.`],
}));

// The five books in the PG class. `art` is the little sticker trio on the book's card:
// the middle one is the big one.
export const pgCategories = [
  {
    id: "alphabet",
    title: "Alphabet Sound Book",
    emoji: "🔤",
    blurb: "26 letters · A for Apple",
    tone: "tone-mint",
    art: ["A", "🍎", "B"],
    doneText: "You heard every letter!",
    items: alphabetItems,
  },
  {
    id: "transport",
    title: "Transport Sound Book",
    emoji: "🚌",
    blurb: "12 vehicles · Beep beep!",
    tone: "tone-aqua",
    art: ["🚌", "🚗", "✈️"],
    doneText: "You heard every vehicle!",
    items: transportItems,
  },
  {
    id: "animals-birds",
    title: "Animals & Birds Sound Book",
    emoji: "🐘",
    blurb: "12 friends · Moo! Tweet!",
    tone: "tone-butter",
    art: ["🐄", "🦜", "🐘"],
    doneText: "You heard every animal and bird!",
    items: creatureItems,
  },
  {
    id: "numbers",
    title: "Number Sound Book",
    emoji: "🔢",
    blurb: "Count from 1 to 10",
    tone: "tone-rose",
    art: ["1", "⭐", "2"],
    doneText: "You counted every number!",
    items: numberItems,
  },
  {
    id: "vegetables-fruits",
    title: "Vegetables & Fruits Sound Book",
    emoji: "🥕",
    blurb: "12 yummy things",
    tone: "tone-lime",
    art: ["🍌", "🍎", "🥕"],
    doneText: "You heard every fruit and vegetable!",
    items: produceItems,
  },
];

// A class with `categories` opens its list of sound books. For the rest, paste the sheet's
// link into its `pdf` — an empty `pdf` shows "Coming Soon" rather than a dead button.
export const soundBooks = [
  {
    id: "pg",
    title: "PG Sound Book",
    age: "Age 2 to 3 Years",
    emoji: "🍼",
    description: "Five sound books to explore: tap a picture and listen.",
    categories: pgCategories,
  },
  {
    id: "nursery",
    title: "Nursery Sound Book",
    age: "Age 3 to 4 Years",
    emoji: "👶",
    description: "Beginning phonics sounds and picture based practice.",
    pdf: "",
  },
  {
    id: "lkg",
    title: "LKG Sound Book",
    age: "Age 4 to 5 Years",
    emoji: "🧩",
    description: "Letter sounds, blending practice and sound recognition.",
    pdf: "",
  },
  {
    id: "ukg",
    title: "UKG Sound Book",
    age: "Age 5 to 6 Years",
    emoji: "🎓",
    description: "Advanced phonics sounds, blends and reading readiness.",
    pdf: "",
  },
];

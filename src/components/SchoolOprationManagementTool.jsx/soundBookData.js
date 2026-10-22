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
//   variants optional: other versions of the same page (image, caption, speech). Each time
//            round the book shows the next version, so a short book keeps feeling new.

// Alphabet: one letter, one word a two year old already knows, and a picture that reads
// clearly at a glance. `more` holds other words for the same letter, so each time round the
// book a letter has a fresh word: "A for Apple", then "A for Ant", then "A for Aeroplane".
export const pgLetters = [
  { letter: "A", word: "Apple", emoji: "🍎", more: [["Ant", "🐜"], ["Aeroplane", "✈️"], ["Ambulance", "🚑"]] },
  { letter: "B", word: "Ball", emoji: "⚽", more: [["Banana", "🍌"], ["Bus", "🚌"], ["Bee", "🐝"]] },
  { letter: "C", word: "Cat", emoji: "🐱", more: [["Car", "🚗"], ["Cow", "🐄"], ["Cake", "🎂"]] },
  { letter: "D", word: "Dog", emoji: "🐶", more: [["Duck", "🦆"], ["Drum", "🥁"], ["Donut", "🍩"]] },
  { letter: "E", word: "Elephant", emoji: "🐘", more: [["Egg", "🥚"], ["Eagle", "🦅"], ["Ear", "👂"]] },
  { letter: "F", word: "Fish", emoji: "🐟", more: [["Frog", "🐸"], ["Flower", "🌸"], ["Fork", "🍴"]] },
  { letter: "G", word: "Goat", emoji: "🐐", more: [["Grapes", "🍇"], ["Giraffe", "🦒"], ["Gift", "🎁"]] },
  { letter: "H", word: "Hat", emoji: "🎩", more: [["Horse", "🐎"], ["House", "🏠"], ["Heart", "❤️"]] },
  { letter: "I", word: "Ice Cream", emoji: "🍦", more: [["Ice", "🧊"], ["Island", "🏝️"], ["Insect", "🐛"]] },
  { letter: "J", word: "Jam", emoji: "🍓", more: [["Juice", "🧃"], ["Jeep", "🚙"], ["Jacket", "🧥"]] },
  { letter: "K", word: "Kite", emoji: "🪁", more: [["Key", "🔑"], ["King", "🤴"], ["Kangaroo", "🦘"]] },
  { letter: "L", word: "Lion", emoji: "🦁", more: [["Leaf", "🍃"], ["Lemon", "🍋"], ["Lock", "🔒"]] },
  { letter: "M", word: "Monkey", emoji: "🐵", more: [["Moon", "🌙"], ["Mango", "🥭"], ["Mouse", "🐭"]] },
  { letter: "N", word: "Nose", emoji: "👃", more: [["Nut", "🥜"], ["Notebook", "📓"], ["Night", "🌃"]] },
  { letter: "O", word: "Orange", emoji: "🍊", more: [["Owl", "🦉"], ["Octopus", "🐙"], ["Onion", "🧅"]] },
  { letter: "P", word: "Pen", emoji: "🖊️", more: [["Parrot", "🦜"], ["Pizza", "🍕"], ["Pineapple", "🍍"]] },
  { letter: "Q", word: "Queen", emoji: "👑", more: [["Question Mark", "❓"]] },
  { letter: "R", word: "Rabbit", emoji: "🐰", more: [["Rainbow", "🌈"], ["Rose", "🌹"], ["Rocket", "🚀"]] },
  { letter: "S", word: "Sun", emoji: "☀️", more: [["Star", "⭐"], ["Snake", "🐍"], ["Strawberry", "🍓"]] },
  { letter: "T", word: "Tiger", emoji: "🐯", more: [["Tree", "🌳"], ["Train", "🚂"], ["Tomato", "🍅"]] },
  { letter: "U", word: "Umbrella", emoji: "☂️", more: [["Unicorn", "🦄"]] },
  { letter: "V", word: "Van", emoji: "🚐", more: [["Violin", "🎻"], ["Volcano", "🌋"]] },
  { letter: "W", word: "Watch", emoji: "⌚", more: [["Whale", "🐋"], ["Watermelon", "🍉"], ["Wolf", "🐺"]] },
  { letter: "X", word: "Xylophone", emoji: "🎹", more: [] },
  { letter: "Y", word: "Yo-yo", emoji: "🪀", more: [["Yacht", "⛵"], ["Yellow Heart", "💛"]] },
  { letter: "Z", word: "Zebra", emoji: "🦓", more: [["Zero", "0️⃣"]] },
];

const alphabetPage = (letter, word, emoji) => ({
  image: emoji,
  caption: word,
  // Read exactly as the book always has: the letter on its own, then "A for Apple".
  speech: [`${letter}.`, `${letter} for ${word}.`],
});

const alphabetItems = pgLetters.map(({ letter, word, emoji, more }) => ({
  id: letter,
  big: letter,
  small: letter.toLowerCase(),
  strip: letter,
  ...alphabetPage(letter, word, emoji),
  variants: more.map(([moreWord, moreEmoji]) => alphabetPage(letter, moreWord, moreEmoji)),
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
  { name: "Taxi", emoji: "🚕", sound: "beep beep" },
  { name: "Van", emoji: "🚐", sound: "honk honk" },
  { name: "Jeep", emoji: "🚙", sound: "vroom vroom" },
  { name: "Racing Car", emoji: "🏎️", sound: "zoom zoom" },
  { name: "Police Car", emoji: "🚓", sound: "nee naw nee naw" },
  { name: "Delivery Truck", emoji: "🚛", sound: "rumble" },
  { name: "Motorbike", emoji: "🏍️", sound: "brum brum" },
  { name: "Scooter", emoji: "🛵", sound: "zip zip" },
  { name: "Kick Scooter", emoji: "🛴", sound: "swish swish" },
  { name: "Skateboard", emoji: "🛹", sound: "clack clack" },
  { name: "Bullet Train", emoji: "🚅", sound: "shoom" },
  { name: "Tram", emoji: "🚊", sound: "ding ding" },
  { name: "Metro", emoji: "🚇", sound: "whoosh whoosh" },
  { name: "Monorail", emoji: "🚝", sound: "hum hum" },
  { name: "Trolley Bus", emoji: "🚎", sound: "ding dong" },
  { name: "Cable Car", emoji: "🚠", sound: "creak creak" },
  { name: "Rocket", emoji: "🚀", sound: "whoosh" },
  { name: "Hot Air Balloon", emoji: "🎈", sound: "fwoosh" },
  { name: "Boat", emoji: "⛵", sound: "splash splash" },
  { name: "Speedboat", emoji: "🚤", sound: "zoom zoom" },
  { name: "Ferry", emoji: "⛴️", sound: "hoot hoot" },
  { name: "Canoe", emoji: "🛶", sound: "splish splash" },
  { name: "Small Aeroplane", emoji: "🛩️", sound: "buzz buzz" },
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
  { name: "Horse", emoji: "🐎", sound: "neigh neigh" },
  { name: "Sheep", emoji: "🐑", sound: "baa baa" },
  { name: "Pig", emoji: "🐖", sound: "oink oink" },
  { name: "Buffalo", emoji: "🐃", sound: "moo moo" },
  { name: "Rooster", emoji: "🐓", sound: "cock-a-doodle-doo" },
  { name: "Chick", emoji: "🐤", sound: "cheep cheep" },
  { name: "Turkey", emoji: "🦃", sound: "gobble gobble" },
  { name: "Pigeon", emoji: "🕊️", sound: "coo coo" },
  { name: "Eagle", emoji: "🦅", sound: "screech" },
  { name: "Peacock", emoji: "🦚", sound: "may-awe may-awe" },
  { name: "Tiger", emoji: "🐅", sound: "roar" },
  { name: "Bear", emoji: "🐻", sound: "growl" },
  { name: "Wolf", emoji: "🐺", sound: "howl" },
  { name: "Fox", emoji: "🦊", sound: "yip yip" },
  { name: "Frog", emoji: "🐸", sound: "ribbit ribbit" },
  { name: "Snake", emoji: "🐍", sound: "hiss" },
  { name: "Bee", emoji: "🐝", sound: "buzz buzz" },
  { name: "Mouse", emoji: "🐁", sound: "squeak squeak" },
  { name: "Rabbit", emoji: "🐇", sound: "thump thump" },
  { name: "Squirrel", emoji: "🐿️", sound: "chitter chatter" },
  { name: "Camel", emoji: "🐪", sound: "grumble grumble" },
  { name: "Dolphin", emoji: "🐬", sound: "click click" },
  { name: "Whale", emoji: "🐋", sound: "wooo wooo" },
  { name: "Penguin", emoji: "🐧", sound: "honk honk" },
  { name: "Seal", emoji: "🦭", sound: "arf arf" },
  { name: "Crocodile", emoji: "🐊", sound: "snap snap" },
  { name: "Cricket", emoji: "🦗", sound: "chirp chirp" },
  { name: "Hippo", emoji: "🦛", sound: "grunt grunt" },
];

const creatureItems = creatures.map(({ name, emoji, sound }) => ({
  id: name,
  image: emoji,
  big: name,
  strip: emoji,
  speech: [`${name}.`, `The ${name.toLowerCase()} says ${sound}.`],
}));

// Numbers 1 to 20: the picture shows that many of something, so the number can be counted.
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
  { word: "Eleven", emoji: "🍋", thing: "lemons" },
  { word: "Twelve", emoji: "🍩", thing: "donuts" },
  { word: "Thirteen", emoji: "🐝", thing: "bees" },
  { word: "Fourteen", emoji: "🌼", thing: "daisies" },
  { word: "Fifteen", emoji: "🍇", thing: "bunches of grapes" },
  { word: "Sixteen", emoji: "🐠", thing: "tropical fish" },
  { word: "Seventeen", emoji: "🍒", thing: "cherries" },
  { word: "Eighteen", emoji: "🪁", thing: "kites" },
  { word: "Nineteen", emoji: "🍭", thing: "lollipops" },
  { word: "Twenty", emoji: "⭐", thing: "stars" },
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
  { name: "Watermelon", emoji: "🍉", colour: "green and red" },
  { name: "Pineapple", emoji: "🍍", colour: "yellow" },
  { name: "Pear", emoji: "🍐", colour: "green" },
  { name: "Peach", emoji: "🍑", colour: "pink" },
  { name: "Cherries", emoji: "🍒", colour: "red", plural: true },
  { name: "Lemon", emoji: "🍋", colour: "yellow" },
  { name: "Kiwi", emoji: "🥝", colour: "green" },
  { name: "Coconut", emoji: "🥥", colour: "brown" },
  { name: "Blueberries", emoji: "🫐", colour: "blue", plural: true },
  { name: "Melon", emoji: "🍈", colour: "green" },
  { name: "Green Apple", emoji: "🍏", colour: "green" },
  { name: "Avocado", emoji: "🥑", colour: "green" },
  { name: "Broccoli", emoji: "🥦", colour: "green" },
  { name: "Garlic", emoji: "🧄", colour: "white" },
  { name: "Onion", emoji: "🧅", colour: "brown" },
  { name: "Chilli", emoji: "🌶️", colour: "red" },
  { name: "Capsicum", emoji: "🫑", colour: "green" },
  { name: "Mushroom", emoji: "🍄", colour: "white" },
  { name: "Peanuts", emoji: "🥜", colour: "brown", plural: true },
  { name: "Sweet Potato", emoji: "🍠", colour: "brown" },
  { name: "Lettuce", emoji: "🥬", colour: "green" },
  { name: "Olives", emoji: "🫒", colour: "green", plural: true },
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
    blurb: "26 letters · new words every round",
    tone: "tone-mint",
    art: ["A", "🍎", "B"],
    doneText: "You heard every letter!",
    items: alphabetItems,
  },
  {
    id: "transport",
    title: "Transport Sound Book",
    emoji: "🚌",
    blurb: `${transportItems.length} vehicles · Beep beep!`,
    tone: "tone-aqua",
    art: ["🚌", "🚗", "✈️"],
    doneText: "You heard every vehicle!",
    items: transportItems,
  },
  {
    id: "animals-birds",
    title: "Animals & Birds Sound Book",
    emoji: "🐘",
    blurb: `${creatureItems.length} friends · Moo! Tweet!`,
    tone: "tone-butter",
    art: ["🐄", "🦜", "🐘"],
    doneText: "You heard every animal and bird!",
    items: creatureItems,
  },
  {
    id: "numbers",
    title: "Number Sound Book",
    emoji: "🔢",
    blurb: `Count from 1 to ${numberItems.length}`,
    tone: "tone-rose",
    art: ["1", "⭐", "2"],
    doneText: "You counted every number!",
    items: numberItems,
  },
  {
    id: "vegetables-fruits",
    title: "Vegetables & Fruits Sound Book",
    emoji: "🥕",
    blurb: `${produceItems.length} yummy things`,
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

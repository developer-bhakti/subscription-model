// What the three Cognitive Skill games ask, class by class. The games follow the first three steps of thinking
// (Bloom's taxonomy):
//   Remember       - flip cards and find the matching pairs (memory)
//   Understanding  - see how things relate: which one is a fruit, which one does not belong, what goes together,
//                    where an animal lives
//   Application    - use what you know in everyday situations: it is raining, what do you need?
// Every picture is an emoji with its name. The questions are built fresh each game by the make* functions below,
// which return plain data; components/OnlineToolsForSkiil/CognitiveSkills.jsx shows them.

export const COGNITIVE_CLASSES = ["pg", "nursery", "lkg", "ukg"];

const shuffle = (list) => {
  const copy = [...list];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
};

const pickRandom = (list, count) => shuffle(list).slice(0, count);

const item = ([emoji, name]) => ({ emoji, name });

/* --------------------------------------------- Remember --------------------------------------------- */

// The pictures on the cards: one set is picked at random for each game.
export const MEMORY_THEMES = [
  {
    name: "Animals",
    icon: "🐾",
    items: [["🐶", "dog"], ["🐱", "cat"], ["🐰", "rabbit"], ["🐵", "monkey"], ["🐘", "elephant"], ["🦁", "lion"], ["🐯", "tiger"], ["🐼", "panda"], ["🦒", "giraffe"], ["🐮", "cow"]],
  },
  {
    name: "Fruits",
    icon: "🍓",
    items: [["🍎", "apple"], ["🍌", "banana"], ["🍇", "grapes"], ["🍓", "strawberry"], ["🍊", "orange"], ["🍉", "watermelon"], ["🍍", "pineapple"], ["🥭", "mango"], ["🍒", "cherries"], ["🍐", "pear"]],
  },
  {
    name: "Vehicles",
    icon: "🚗",
    items: [["🚗", "car"], ["🚌", "bus"], ["🚲", "bicycle"], ["✈️", "aeroplane"], ["🚂", "train"], ["🚢", "ship"], ["🚁", "helicopter"], ["🚜", "tractor"], ["🚒", "fire engine"], ["🛺", "auto rickshaw"]],
  },
  {
    name: "Toys",
    icon: "🧸",
    items: [["⚽", "ball"], ["🧸", "teddy bear"], ["🪁", "kite"], ["🎈", "balloon"], ["🪀", "yo-yo"], ["🥁", "drum"], ["🧩", "puzzle"], ["🎲", "dice"]],
  },
  {
    name: "Birds",
    icon: "🐦",
    items: [["🦜", "parrot"], ["🦆", "duck"], ["🦉", "owl"], ["🐔", "hen"], ["🦚", "peacock"], ["🐧", "penguin"], ["🦅", "eagle"], ["🦩", "flamingo"]],
  },
];

// How many pairs each class finds, and how many seconds all the cards are shown face up before they turn over.
export const MEMORY_LEVELS = {
  pg: { pairs: 3, preview: 5 },
  nursery: { pairs: 4, preview: 5 },
  lkg: { pairs: 6, preview: 6 },
  ukg: { pairs: 8, preview: 8 },
};

// A shuffled deck: two cards of each of `pairs` pictures from one theme. Each card is { id, key, emoji, name }; the
// two cards of a pair share their `key`.
export const makeMemoryDeck = (pairs) => {
  const [theme] = pickRandom(MEMORY_THEMES, 1);
  const chosen = pickRandom(theme.items, pairs).map(item);
  const cards = shuffle(chosen.flatMap((picture, key) => [0, 1].map((copy) => ({ id: key * 2 + copy, key, ...picture }))));

  return { theme: theme.name, icon: theme.icon, cards };
};

/* ------------------------------------------- Understanding ------------------------------------------- */

// Groups of things a child sorts. `one` is how a single thing of the group is named in a question ("Which one is a
// fruit?") and `many` how the group is named in an answer ("Apple, mango and banana are fruits."). Birds are kept
// apart from animals, and tomatoes and cucumbers are left out of the vegetables (they are fruits to a botanist).
const GROUPS = {
  pets: { one: "a pet or farm animal", many: "pet and farm animals", items: [["🐶", "dog"], ["🐱", "cat"], ["🐮", "cow"], ["🐐", "goat"], ["🐴", "horse"], ["🐷", "pig"], ["🐑", "sheep"]] },
  wild: { one: "a wild animal", many: "wild animals", items: [["🦁", "lion"], ["🐯", "tiger"], ["🐘", "elephant"], ["🦒", "giraffe"], ["🐻", "bear"], ["🦓", "zebra"], ["🐒", "monkey"]] },
  birds: { one: "a bird", many: "birds", items: [["🦜", "parrot"], ["🦆", "duck"], ["🦉", "owl"], ["🐔", "hen"], ["🦚", "peacock"], ["🐧", "penguin"], ["🦅", "eagle"]] },
  fruits: { one: "a fruit", many: "fruits", items: [["🍎", "apple"], ["🍌", "banana"], ["🍇", "grapes"], ["🍊", "orange"], ["🍉", "watermelon"], ["🥭", "mango"], ["🍍", "pineapple"], ["🍓", "strawberry"]] },
  vegetables: { one: "a vegetable", many: "vegetables", items: [["🥕", "carrot"], ["🥔", "potato"], ["🧅", "onion"], ["🥦", "broccoli"], ["🍆", "brinjal"], ["🧄", "garlic"], ["🌽", "corn"]] },
  land: { one: "something that goes on land", many: "things that go on land", items: [["🚗", "car"], ["🚌", "bus"], ["🚲", "bicycle"], ["🚂", "train"], ["🛺", "auto rickshaw"], ["🚜", "tractor"], ["🏍️", "motorbike"]] },
  water: { one: "something that goes on water", many: "things that go on water", items: [["🚢", "ship"], ["⛵", "sailboat"], ["🚤", "speedboat"], ["🛶", "canoe"]] },
  air: { one: "something that flies", many: "things that fly", items: [["✈️", "aeroplane"], ["🚁", "helicopter"], ["🚀", "rocket"], ["🛩️", "small plane"]] },
  toys: { one: "a toy", many: "toys", items: [["⚽", "ball"], ["🧸", "teddy bear"], ["🪁", "kite"], ["🪀", "yo-yo"], ["🥁", "drum"], ["🧩", "puzzle"]] },
  clothes: { one: "something to wear", many: "things to wear", items: [["👕", "shirt"], ["👗", "dress"], ["🧦", "socks"], ["🧢", "cap"], ["🧥", "coat"], ["👟", "shoes"]] },
};

// Bigger groups for the youngest classes: "Which one is an animal?" (never a bird among the other pictures, since a
// bird is an animal too).
const BROAD = {
  animals: { one: "an animal", many: "animals", parts: ["pets", "wild"] },
  fruits: { one: "a fruit", many: "fruits", parts: ["fruits"] },
  vehicles: { one: "a vehicle", many: "vehicles", parts: ["land"] },
  toys: { one: "a toy", many: "toys", parts: ["toys"] },
  clothes: { one: "something to wear", many: "things to wear", parts: ["clothes"] },
};

const broadItems = (id) => BROAD[id].parts.flatMap((part) => GROUPS[part].items).map(item);
const groupItems = (id) => GROUPS[id].items.map(item);

// Pairs of groups close enough that the odd one out makes a child think (UKG).
const CLOSE_PAIRS = [
  ["fruits", "vegetables"], ["vegetables", "fruits"], ["wild", "pets"], ["pets", "wild"],
  ["pets", "birds"], ["wild", "birds"], ["land", "water"], ["land", "air"], ["air", "land"], ["water", "land"],
];

// Things that go together. Two pairs of the same `group` are never in one question, so only one answer fits (the
// cake's candle is not offered beside the plate's spoon).
const GO_TOGETHER = [
  { group: "animal food", pair: [["🐒", "monkey"], ["🍌", "banana"]] },
  { group: "animal food", pair: [["🐰", "rabbit"], ["🥕", "carrot"]] },
  { group: "animal food", pair: [["🐶", "dog"], ["🦴", "bone"]] },
  { group: "animal gives", pair: [["🐄", "cow"], ["🥛", "milk"]] },
  { group: "animal gives", pair: [["🐔", "hen"], ["🥚", "egg"]] },
  { group: "animal gives", pair: [["🐝", "bee"], ["🍯", "honey"]] },
  { group: "animal gives", pair: [["🐑", "sheep"], ["🧶", "wool"]] },
  { group: "home", pair: [["🔒", "lock"], ["🔑", "key"]] },
  { group: "home", pair: [["✉️", "letter"], ["📮", "post box"]] },
  { group: "school", pair: [["✏️", "pencil"], ["📒", "notebook"]] },
  { group: "school", pair: [["🖌️", "paintbrush"], ["🎨", "paints"]] },
  { group: "wear", pair: [["🧦", "socks"], ["👟", "shoes"]] },
  { group: "wear", pair: [["🪡", "needle"], ["🧵", "thread"]] },
  { group: "food", pair: [["🍞", "bread"], ["🧈", "butter"]] },
  { group: "food", pair: [["🍽️", "plate"], ["🥄", "spoon"]] },
  { group: "food", pair: [["🎂", "birthday cake"], ["🕯️", "candle"]] },
  { group: "sky", pair: [["🌧️", "rain"], ["☂️", "umbrella"]] },
  { group: "sky", pair: [["🌙", "moon"], ["⭐", "stars"]] },
];

// Where an animal lives (UKG).
const HOMES = [
  [["🐟", "fish"], ["🌊", "water"], "in"],
  [["🦜", "parrot"], ["🌳", "tree"], "in"],
  [["🕷️", "spider"], ["🕸️", "web"], "on"],
  [["🐪", "camel"], ["🏜️", "desert"], "in"],
  [["🐧", "penguin"], ["🧊", "ice"], "on"],
  [["🧒", "child"], ["🏠", "house"], "in"],
];

const listNames = (items) => `${items.slice(0, -1).map((i) => i.name).join(", ")} and ${items[items.length - 1].name}`;
const capital = (text) => text[0].toUpperCase() + text.slice(1);
const article = (name) => (/^[aeiou]/.test(name) ? `an ${name}` : `a ${name}`);
// "the lock", but just "rain"
const the = (name) => (name === "rain" ? name : `the ${name}`);

// "Which one is a fruit?" `optionCount` pictures: one of the group, the others from different groups.
const whichOneIs = (groups, optionCount) => {
  const [answerGroup, ...others] = pickRandom(groups, optionCount);
  const answer = pickRandom(broadItems(answerGroup), 1)[0];
  const wrong = others.map((g) => pickRandom(broadItems(g), 1)[0]);

  return {
    kind: "which",
    prompt: `Which one is ${BROAD[answerGroup].one}?`,
    speak: `Which one is ${BROAD[answerGroup].one}?`,
    explain: `${capital(article(answer.name))} is ${BROAD[answerGroup].one}.`,
    options: shuffle([answer, ...wrong]),
    answer: answer.name,
  };
};

// "Which one does not belong?" Three of one group and one of another.
const oddOneOut = (sameGroup, oddGroup, items) => {
  const same = pickRandom(items(sameGroup), 3);
  const odd = pickRandom(items(oddGroup), 1)[0];
  const names = { ...BROAD, ...GROUPS };

  return {
    kind: "odd",
    prompt: "Which one does not belong?",
    speak: "Find the odd one out. Which one does not belong?",
    explain: `${capital(listNames(same))} are ${names[sameGroup].many}. ${capital(odd.name)} is not.`,
    options: shuffle([...same, odd]),
    answer: odd.name,
  };
};

// "What goes together with the lock?"
const goesTogether = (optionCount) => {
  const [chosen] = pickRandom(GO_TOGETHER, 1);
  const [thing, partner] = chosen.pair.map(item);
  const wrong = pickRandom(
    GO_TOGETHER.filter((p) => p.group !== chosen.group),
    optionCount - 1,
  ).map((p) => item(p.pair[1]));

  return {
    kind: "together",
    prompt: `What goes with ${the(thing.name)}?`,
    speak: `What goes with ${the(thing.name)}?`,
    scene: thing,
    explain: `${capital(the(thing.name))} goes with ${the(partner.name)}.`,
    options: shuffle([partner, ...wrong]),
    answer: partner.name,
  };
};

// "Where does the fish live?"
const whereDoesItLive = () => {
  const [chosen, ...others] = pickRandom(HOMES, 4);
  const [animal, home] = chosen.slice(0, 2).map(item);

  return {
    kind: "home",
    prompt: `Where does the ${animal.name} live?`,
    speak: `Where does the ${animal.name} live?`,
    scene: animal,
    explain: `The ${animal.name} lives ${chosen[2]} the ${home.name}.`,
    options: shuffle([home, ...others.map((h) => item(h[1]))]),
    answer: home.name,
  };
};

// The questions of one game, for each class (ten each, shuffled):
//   PG:      Which one is ...? (three pictures)
//   Nursery: Which one is ...? (three pictures) and the odd one out among four (four very different groups)
//   LKG:     the odd one out (birds against animals too) and what goes together (three pictures)
//   UKG:     the odd one out between close groups (fruit or vegetable, wild or pet, land, water or air), what goes
//            together (four pictures) and where an animal lives
const ODD_GROUPS = ["animals", "fruits", "vehicles", "toys", "clothes"];

export const UNDERSTANDING_LEVELS = {
  pg: { desc: "Pick the one that is an animal, a fruit, a toy and more." },
  nursery: { desc: "Pick the right group and find the odd one out." },
  lkg: { desc: "Find the odd one out and what goes together." },
  ukg: { desc: "Odd one out, what goes together and where animals live." },
};

// A different question each time: `make` is called until it gives one whose answer has not been asked yet.
const distinct = (makers, count) => {
  const seen = new Set();
  const out = [];

  for (let tries = 0; out.length < count && tries < count * 30; tries += 1) {
    const question = makers[out.length % makers.length]();
    const key = `${question.kind}:${question.prompt}:${question.answer}`;

    if (!seen.has(key)) {
      seen.add(key);
      out.push(question);
    }
  }

  return shuffle(out);
};

export const makeUnderstandingQuestions = (classId) => {
  if (classId === "pg") return distinct([() => whichOneIs(Object.keys(BROAD), 3)], 10);

  if (classId === "nursery") {
    return distinct(
      [
        () => whichOneIs(Object.keys(BROAD), 3),
        () => {
          const [same, odd] = pickRandom(ODD_GROUPS, 2);

          return oddOneOut(same, odd, broadItems);
        },
      ],
      10,
    );
  }

  if (classId === "lkg") {
    return distinct(
      [
        () => {
          const [same, odd] = pickRandom(["pets", "wild", "birds", "fruits", "vegetables", "toys", "clothes"], 2);

          return oddOneOut(same, odd, groupItems);
        },
        () => goesTogether(3),
      ],
      10,
    );
  }

  return distinct(
    [
      () => {
        const [same, odd] = pickRandom(CLOSE_PAIRS, 1)[0];

        return oddOneOut(same, odd, groupItems);
      },
      () => goesTogether(4),
      whereDoesItLive,
    ],
    10,
  );
};

/* -------------------------------------------- Application -------------------------------------------- */

// Everyday situations: what the child sees (`scene`), the question, the right thing and the others offered, and why
// the right one is right. PG and Nursery have three pictures to choose from, LKG and UKG four. There are 15 or 16
// for each class, so a child who keeps playing meets every one before any comes round again.
const q = (scene, prompt, answer, others, why) => ({ scene, prompt, answer, others, why });

const APPLICATION = {
  pg: [
    q(["🌧️", "rain"], "It is raining. What do you need?", ["☂️", "umbrella"], [["🕶️", "sunglasses"], ["⚽", "ball"]], "An umbrella keeps you dry in the rain."),
    q(["🦷", "teeth"], "You want to brush your teeth. What do you need?", ["🪥", "toothbrush"], [["🥄", "spoon"], ["✏️", "pencil"]], "We brush our teeth with a toothbrush."),
    q(["🥵", "thirsty"], "You are thirsty. What will you drink?", ["🚰", "water"], [["👟", "shoe"], ["🧸", "teddy bear"]], "We drink water when we are thirsty."),
    q(["🍚", "rice"], "You want to eat your rice. What will you use?", ["🥄", "spoon"], [["🧦", "sock"], ["🔑", "key"]], "We eat with a spoon."),
    q(["🌙", "night"], "It is night. Where will you sleep?", ["🛏️", "bed"], [["🚗", "car"], ["🛁", "bathtub"]], "We sleep in a bed at night."),
    q(["🤲", "dirty hands"], "Your hands are dirty. What do you need?", ["🧼", "soap"], [["🍰", "cake"], ["🎈", "balloon"]], "Soap and water make our hands clean."),
    q(["🎨", "drawing"], "You want to draw a picture. What do you need?", ["🖍️", "crayon"], [["🍌", "banana"], ["🧢", "cap"]], "We draw and colour with crayons."),
    q(["❄️", "cold"], "It is very cold. What will you wear?", ["🧥", "coat"], [["🕶️", "sunglasses"], ["🩴", "slippers"]], "A warm coat keeps us warm."),
    q(["🌳", "playtime"], "It is playtime. What will you play with?", ["⚽", "ball"], [["🧹", "broom"], ["🍽️", "plate"]], "We play with a ball."),
    q(["🚶", "going out"], "You are going out. What will you wear on your feet?", ["👟", "shoes"], [["🧤", "gloves"], ["🧢", "cap"]], "We wear shoes on our feet."),
    q(["🌑", "dark room"], "The room is dark. What will you switch on?", ["💡", "light"], [["🧸", "teddy bear"], ["🍎", "apple"]], "A light helps us see in the dark."),
    q(["🐶", "puppy"], "The puppy is hungry. What will you give it?", ["🦴", "bone"], [["🧦", "sock"], ["✏️", "pencil"]], "Dogs love to chew a bone."),
    q(["🥳", "birthday"], "It is your birthday. What will you cut?", ["🎂", "cake"], [["🥕", "carrot"], ["👟", "shoe"]], "We cut a cake on our birthday."),
    q(["😴", "bedtime"], "It is bedtime. What will you cuddle?", ["🧸", "teddy bear"], [["🔨", "hammer"], ["🍳", "frying pan"]], "A soft teddy bear is nice to cuddle."),
    q(["🎵", "music"], "You want to make music. What will you play?", ["🥁", "drum"], [["🛏️", "bed"], ["🍞", "bread"]], "We make music by playing a drum."),
    q(["🍪", "crumbs"], "There are crumbs on the floor. What will you use?", ["🧹", "broom"], [["🎈", "balloon"], ["🍌", "banana"]], "A broom sweeps the floor clean."),
  ],
  nursery: [
    q(["☀️", "hot sun"], "The sun is very hot. What will you wear on your head?", ["🧢", "cap"], [["🧦", "socks"], ["🧤", "gloves"]], "A cap keeps the sun off your head."),
    q(["📄", "paper"], "You want to cut paper. What will you use?", ["✂️", "scissors"], [["🥄", "spoon"], ["🪥", "toothbrush"]], "We cut paper with scissors."),
    q(["🦵", "hurt knee"], "You hurt your knee. What do you need?", ["🩹", "bandage"], [["🍭", "lollipop"], ["🎈", "balloon"]], "A bandage covers a cut and keeps it clean."),
    q(["🕒", "time"], "You want to know the time. What will you look at?", ["⏰", "clock"], [["📚", "books"], ["🪴", "plant"]], "A clock tells us the time."),
    q(["🍌", "banana peel"], "Where will you throw the banana peel?", ["🗑️", "dustbin"], [["🛏️", "bed"], ["🎒", "school bag"]], "Rubbish goes in the dustbin."),
    q(["🏫", "school"], "You are going to school. What will you carry?", ["🎒", "school bag"], [["🛁", "bathtub"], ["🍳", "frying pan"]], "We carry our books in a school bag."),
    q(["🥀", "dry plant"], "The plant is dry. What does it need?", ["💧", "water"], [["🧸", "teddy bear"], ["🧦", "socks"]], "Plants need water to grow."),
    q(["👵", "grandma"], "You want to talk to Grandma far away. What will you use?", ["📱", "phone"], [["🥁", "drum"], ["🪁", "kite"]], "We can talk to people far away on a phone."),
    q(["📝", "homework"], "You want to write. What will you use?", ["✏️", "pencil"], [["🍴", "fork"], ["🧽", "sponge"]], "We write with a pencil."),
    q(["🧒", "story time"], "You want to read a story. What will you take?", ["📕", "book"], [["🍕", "pizza"], ["⚽", "ball"]], "Stories are in books."),
    q(["🌬️", "windy day"], "It is a windy day. What will you fly?", ["🪁", "kite"], [["🧱", "brick"], ["🪨", "rock"]], "The wind lifts a kite up high."),
    q(["🍜", "noodles"], "You want to eat noodles. What will you use?", ["🍴", "fork"], [["✂️", "scissors"], ["🖍️", "crayon"]], "We eat noodles with a fork."),
    q(["🐦", "hungry bird"], "The bird is hungry. What will you give it?", ["🌾", "grains"], [["🍫", "chocolate"], ["🧦", "socks"]], "Birds peck at grains."),
    q(["😊", "smile"], "You want to take a photo. What will you use?", ["📷", "camera"], [["🔨", "hammer"], ["🧽", "sponge"]], "A camera takes photos."),
    q(["🎶", "song"], "You want to listen to a song. What will you use?", ["📻", "radio"], [["🧹", "broom"], ["🍳", "frying pan"]], "We can listen to songs on a radio."),
  ],
  lkg: [
    q(["🔥", "fire"], "There is a fire. Who will come to help?", ["🚒", "fire engine"], [["🚌", "school bus"], ["🚜", "tractor"], ["🚲", "bicycle"]], "The fire engine comes to put out a fire."),
    q(["🤒", "fever"], "You are not well. Whom will you visit?", ["🩺", "doctor"], [["👷", "builder"], ["👮", "police officer"], ["🤹", "juggler"]], "A doctor helps us get well."),
    q(["🚦", "red light"], "The traffic light is red. What will you do?", ["🛑", "stop"], [["🏃", "run"], ["💃", "dance"], ["😴", "sleep"]], "Red means stop."),
    q(["✉️", "letter"], "You want to post a letter. Where will you put it?", ["📮", "post box"], [["🗑️", "dustbin"], ["🛏️", "bed"], ["🧊", "ice box"]], "Letters go in the post box."),
    q(["🍎", "fruit"], "You want to buy fruit. Where will you go?", ["🏪", "shop"], [["🏫", "school"], ["🏥", "hospital"], ["⛪", "church"]], "We buy fruit at a shop."),
    q(["🚑", "badly hurt"], "Someone is badly hurt. Where will they go?", ["🏥", "hospital"], [["🏪", "shop"], ["🏫", "school"], ["🏟️", "stadium"]], "Doctors and nurses help hurt people at a hospital."),
    q(["🌊", "sea"], "You want to cross the sea. What will you take?", ["🚢", "ship"], [["🚲", "bicycle"], ["🛺", "auto rickshaw"], ["🚜", "tractor"]], "A ship sails across the sea."),
    q(["🏙️", "far city"], "You want to fly to a far city. What will you take?", ["✈️", "aeroplane"], [["🚲", "bicycle"], ["🛶", "canoe"], ["🛴", "scooter"]], "An aeroplane flies far and fast."),
    q(["✏️", "pencil"], "You want to measure your pencil. What will you use?", ["📏", "ruler"], [["🥄", "spoon"], ["🧦", "sock"], ["🔔", "bell"]], "A ruler measures how long things are."),
    q(["🦷", "after eating"], "You finished eating sweets. What should you do?", ["🪥", "brush your teeth"], [["🛌", "go to bed"], ["🍫", "eat more"], ["📺", "watch TV"]], "Brushing keeps our teeth clean after sweets."),
    q(["🌧️", "puddles"], "It is raining and there are puddles. What will you wear?", ["👢", "boots"], [["🩴", "slippers"], ["🧢", "cap"], ["🕶️", "sunglasses"]], "Boots keep our feet dry in the rain."),
    q(["🚸", "busy road"], "You want to cross a busy road. Who can help you?", ["👮", "police officer"], [["🤹", "juggler"], ["👸", "princess"], ["🧚", "fairy"]], "A traffic police officer helps people cross the road safely."),
    q(["😣", "toothache"], "You have a toothache. Whom will you visit?", ["🦷", "dentist"], [["👷", "builder"], ["🤹", "juggler"], ["👮", "police officer"]], "A dentist looks after our teeth."),
    q(["📚", "borrow a book"], "You want to borrow a book. Where will you go?", ["🏛️", "library"], [["🏥", "hospital"], ["🏟️", "stadium"], ["🏪", "shop"]], "We borrow books from a library."),
    q(["🏖️", "sunny beach"], "It is very sunny at the beach. What will protect your eyes?", ["🕶️", "sunglasses"], [["🧤", "gloves"], ["🧣", "scarf"], ["👢", "boots"]], "Sunglasses protect our eyes from the bright sun."),
    q(["⛈️", "thunderstorm"], "There is thunder and lightning. Where should you stay?", ["🏠", "inside the house"], [["🌳", "under a tree"], ["🏊", "in the pool"], ["⛰️", "on a hill"]], "In a storm we stay safe inside the house."),
  ],
  ukg: [
    q(["🥤", "lemonade"], "You want to make lemonade. What do you need?", ["🍋", "lemon"], [["🥔", "potato"], ["🧅", "onion"], ["🌽", "corn"]], "Lemonade is made with lemons."),
    q(["🌌", "far away"], "You want to see the moon up close. What will you use?", ["🔭", "telescope"], [["🔍", "magnifying glass"], ["🪞", "mirror"], ["🕶️", "sunglasses"]], "A telescope makes far things look near."),
    q(["🐜", "tiny ant"], "You want to look at a tiny ant closely. What will you use?", ["🔍", "magnifying glass"], [["🔭", "telescope"], ["📏", "ruler"], ["🔦", "torch"]], "A magnifying glass makes small things look big."),
    q(["🪵", "nail"], "You want to hit a nail into wood. What will you use?", ["🔨", "hammer"], [["✂️", "scissors"], ["🥄", "spoon"], ["🖌️", "paintbrush"]], "A hammer hits nails into wood."),
    q(["🤒", "fever"], "You want to know if you have a fever. What will you use?", ["🌡️", "thermometer"], [["⏰", "clock"], ["📏", "ruler"], ["⚖️", "weighing scale"]], "A thermometer tells how hot your body is."),
    q(["🔌", "power cut"], "The lights went off at night. What will help you see?", ["🔦", "torch"], [["🪞", "mirror"], ["🎧", "headphones"], ["🧲", "magnet"]], "A torch gives light when the power goes off."),
    q(["🧺", "vegetables"], "You want to weigh vegetables. What will you use?", ["⚖️", "weighing scale"], [["🌡️", "thermometer"], ["⏰", "clock"], ["📏", "ruler"]], "A weighing scale tells how heavy things are."),
    q(["🪙", "coins"], "You want to save your coins. Where will you keep them?", ["🐷", "piggy bank"], [["🗑️", "dustbin"], ["🛁", "bathtub"], ["🍳", "frying pan"]], "A piggy bank keeps our coins safe."),
    q(["🗺️", "lost"], "You are lost in the forest. What helps you find north?", ["🧭", "compass"], [["⏰", "clock"], ["🔨", "hammer"], ["🎧", "headphones"]], "A compass always points north."),
    q(["💇", "hair"], "You want to see how your hair looks. What will you use?", ["🪞", "mirror"], [["🔭", "telescope"], ["📺", "television"], ["🪟", "window"]], "A mirror shows our own face."),
    q(["📎", "pins"], "Pins fell on the floor. What will pick them up easily?", ["🧲", "magnet"], [["🧽", "sponge"], ["🪶", "feather"], ["🧸", "teddy bear"]], "A magnet pulls iron pins to it."),
    q(["🏃", "race"], "You want to time a race. What will you use?", ["⏱️", "stopwatch"], [["🌡️", "thermometer"], ["📏", "ruler"], ["🧭", "compass"]], "A stopwatch measures how long the race takes."),
    q(["📔", "diary"], "You want to keep your diary secret. What will you use?", ["🔒", "lock"], [["🧲", "magnet"], ["🔦", "torch"], ["🎧", "headphones"]], "A lock keeps things closed and safe."),
    q(["🌱", "little plant"], "Your plant needs sunlight. Where will you keep it?", ["🪟", "by the window"], [["🛏️", "under the bed"], ["🗄️", "in a cupboard"], ["🧊", "in the freezer"]], "Plants need sunlight, so we keep them by the window."),
    q(["🥚", "egg"], "You want to cook an egg. What will you use?", ["🍳", "frying pan"], [["🔨", "hammer"], ["🧹", "broom"], ["✂️", "scissors"]], "We cook an egg in a frying pan."),
    q(["⛺", "camping"], "You are camping on a cold night. What will keep you warm?", ["🔥", "campfire"], [["🧊", "ice"], ["🍦", "ice cream"], ["🥤", "cold drink"]], "A campfire keeps us warm on a cold night."),
  ],
};

export const APPLICATION_LEVELS = {
  pg: { desc: "Everyday things: what do you need when it rains, or to eat?" },
  nursery: { desc: "Choose what you need at school, at home and outside." },
  lkg: { desc: "Helpers, safety and places: what will you do?" },
  ukg: { desc: "Pick the right tool for the job and solve little problems." },
};

// Every situation of a class once, in a new order, each with its pictures in a new order.
export const makeApplicationQuestions = (classId) =>
  shuffle(APPLICATION[classId]).map(({ scene, prompt, answer, others, why }) => ({
    kind: "apply",
    prompt,
    speak: prompt,
    scene: item(scene),
    explain: why,
    options: shuffle([item(answer), ...others.map(item)]),
    answer: answer[1],
  }));

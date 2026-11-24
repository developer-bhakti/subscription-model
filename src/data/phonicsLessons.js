// The content of the school's own Phonics pages (src/assets/img), written out so the on-screen
// activities teach exactly what is printed on the worksheets:
//
//   Level 1  "Letter Recognition" sheets  - the picture next to each letter and the five pictures
//                                           in "Colour the pictures that start with ..."
//   Level 2  "Letter and Sound" sheets    - what the letter says, the three "Listen and say" words
//                                           and the six pictures in "begin with the ... sound"
//   Level 3  Phonics story posters        - the three-line story and the words it is about
//   Level 4  "Rhyming Words" sheets       - each word and the picture(s) that rhyme with it
//   Level 5  "Syllable Recognition" sheets - each word, split into the syllables you clap
//   Level 6  "Sound Segmentation" sheets  - each word, split into the sounds written in the boxes
//   Level 7  "Sound Blending" sheets      - the sounds of a word, to be blended into the word
//   Level 8  "CVC Words" sheets           - three-letter words: reading, matching, spelling and changing them
//
// Level 4 has a page for every letter, A to Z. If its pages are ever replaced, update the rows in L4_ROWS.

/* ------------------------------------ pictures ------------------------------------ */

// A picture (emoji) for every word used below. A word with no good emoji is left out and shows a
// plain picture frame instead, with its name written underneath.
const PICTURES = {
  // A
  apple: "🍎", ant: "🐜", airplane: "✈️", alligator: "🐊", arrow: "🏹", ape: "🦍", axe: "🪓",
  // B
  ball: "⚽", bat: "🏏", bus: "🚌", banana: "🍌", bird: "🐦", butterfly: "🦋", bear: "🐻", bee: "🐝", bed: "🛏️", bell: "🔔", box: "📦", boat: "🚤",
  // C
  cat: "🐱", car: "🚗", cake: "🎂", cow: "🐄", cap: "🧢", cup: "☕", crab: "🦀", chair: "🪑",
  // D
  dog: "🐶", duck: "🦆", drum: "🥁", duckling: "🐥", dish: "🍽️",
  // E
  egg: "🥚", elephant: "🐘", envelope: "✉️", eagle: "🦅", elf: "🧝", ear: "👂", end: "🔚",
  // F
  fish: "🐟", fan: "🪭", flower: "🌸", frog: "🐸", fox: "🦊",
  // G
  goat: "🐐", grapes: "🍇", grape: "🍇", gift: "🎁", giraffe: "🦒", glass: "🥛", grass: "🌿",
  // H
  hat: "👒", house: "🏠", horse: "🐴", heart: "❤️", helicopter: "🚁",
  // I
  "ice cream": "🍦", igloo: null, ink: "🖋️", island: "🏝️", iguana: "🦎",
  // J
  jug: null, jelly: "🍮", jet: "✈️", jar: "🍯", jam: "🍓", jackfruit: null, jacket: "🧥", jump: "🤸",
  // K
  kite: "🪁", king: "🤴", key: "🔑", kangaroo: "🦘", kitten: "🐈",
  // L
  lion: "🦁", leaf: "🍃", lamp: "💡", log: "🪵", lake: "🏞️", leg: "🦵", lift: "🛗",
  // M
  monkey: "🐵", mango: "🥭", moon: "🌙", mouse: "🐭", mug: "☕", map: "🗺️",
  // N
  nest: null, net: "🥅", notebook: "📓", nail: null,
  // O
  orange: "🍊", onion: "🧅", octopus: "🐙", owl: "🦉",
  // P
  parrot: "🦜", pencil: "✏️", pig: "🐷", pumpkin: "🎃", panda: "🐼", pen: "🖊️", plant: "🪴", pear: "🍐", plum: "🟣",
  // Q
  queen: "👸", quilt: null, quill: "🪶", quail: null, question: "❓",
  // R
  rabbit: "🐰", rocket: "🚀", rainbow: "🌈", rose: "🌹", ring: "💍", rock: "🪨", river: "🏞️",
  // S
  sun: "☀️", snake: "🐍", star: "⭐", strawberry: "🍓", sandcastle: "🏰", sand: "🏖️", sock: "🧦", shelf: "📚", sled: "🛷",
  // T
  tiger: "🐯", tomato: "🍅", top: null, tree: "🌳", turtle: "🐢", table: null, train: "🚂", truck: "🚚", tape: "📼",
  // U
  umbrella: "☂️", up: "⬆️", unicorn: "🦄", uniform: "👔", urn: "⚱️", under: null,
  // V
  van: "🚐", vase: "🏺", vegetable: "🥕", vegetables: "🥕", violin: "🎻", vulture: "🦅",
  // W
  watch: "⌚", watermelon: "🍉", whale: "🐳", window: "🪟", water: "💧", wax: "🕯️",
  // X
  "x-mas tree": "🎄", xylophone: null, "x-ray": null, xerus: "🐿️",
  // Y
  yellow: "💛", yak: "🐂", "yo-yo": "🪀", yacht: "⛵", yogurt: "🥛",
  // Z
  zebra: "🦓", zipper: null, zoo: null, zucchini: "🥒", zookeeper: null,
  // other words in the rhyming rows (the closest emoji; the word is always written underneath)
  bend: "↪️",
  hen: "🐔", fly: "🪰", sink: "🚰", ham: "🍖", night: "🌃", spoon: "🥄", wool: "🧶", camp: "⛺", beef: "🥩",
  lock: "🔒", book: "📖", tune: "🎵", mop: "🧹", rope: "🪢", vest: "🦺", nose: "👃", pet: "🐕", nut: "🥜",
  hut: "🛖", ox: "🐂", pan: "🍳", pot: "🍲", dot: "🔴", green: "🟢", hill: "⛰️", rat: "🐀", bag: "🎒",
  bun: "🍞", tea: "🍵", tub: "🛁", ten: "🔟", corn: "🌽", turn: "↩️", viper: "🐍", wet: "💦", shell: "🐚",
  phone: "📱", hay: "🌾", knee: "🦵", "xmas tree": "🎄", xerox: "🖨️", socks: "🧦", yarn: "🧶", yawn: "🥱",
  fawn: "🦌", shoe: "👟", flag: "🚩", ship: "🚢", lip: "👄", glue: "🧴", pump: "⛽",
};

export const FRAME = "🖼️";

// The emoji for a word, or null if it has none (the real worksheet picture is used instead).
export const emojiOf = (word) => PICTURES[word.toLowerCase()] ?? null;

/* ------------------------------ Level 1: letter recognition ------------------------------ */

// `look` is the picture shown beside the big letter. `pictures` are the five pictures in
// "Colour the pictures that start with ...": the ones that start with the letter are the answers.
export const L1_PAGES = {
  A: { look: "apple", pictures: ["apple", "ball", "cat", "ant", "dog"] },
  B: { look: "ball", pictures: ["ball", "banana", "bird", "car", "butterfly"] },
  C: { look: "cat", pictures: ["cat", "car", "cake", "duck", "cow"] },
  D: { look: "dog", pictures: ["dog", "duck", "cat", "drum", "fish"] },
  E: { look: "elephant", pictures: ["elephant", "egg", "fish", "envelope", "apple"] },
  F: { look: "fish", pictures: ["fish", "fan", "grapes", "flower", "frog"] },
  G: { look: "grapes", pictures: ["grapes", "gift", "goat", "house", "giraffe"] },
  H: { look: "house", pictures: ["house", "hat", "heart", "car", "helicopter"] },
  I: { look: "ice cream", pictures: ["ice cream", "igloo", "island", "apple", "ink"] },
  J: { look: "jug", pictures: ["jug", "jar", "jackfruit", "jacket", "umbrella"] },
  K: { look: "kite", pictures: ["kite", "key", "kangaroo", "leaf", "king"] },
  L: { look: "lion", pictures: ["lion", "leaf", "lamp", "log", "apple"] },
  M: { look: "monkey", pictures: ["monkey", "mango", "moon", "mug", "apple"] },
  N: { look: "nest", pictures: ["nest", "net", "nail", "notebook", "orange"] },
  O: { look: "orange", pictures: ["orange", "onion", "octopus", "owl", "sun"] },
  P: { look: "parrot", pictures: ["parrot", "pencil", "pumpkin", "panda", "sun"] },
  Q: { look: "queen", pictures: ["queen", "quail", "quilt", "question", "rabbit"] },
  R: { look: "rainbow", pictures: ["rainbow", "rocket", "rose", "ring", "sun"] },
  S: { look: "sun", pictures: ["sun", "snake", "star", "strawberry", "tree"] },
  T: { look: "tiger", pictures: ["tiger", "table", "turtle", "tree", "tomato"] },
  U: { look: "umbrella", pictures: ["umbrella", "unicorn", "uniform", "urn", "apple"] },
  V: { look: "van", pictures: ["van", "vase", "violin", "vegetables", "apple"] },
  W: { look: "watermelon", pictures: ["watermelon", "whale", "watch", "window", "tree"] },
  X: { look: "X-mas tree", pictures: ["X-mas tree", "xylophone", "x-ray", "xerus", "sun"] },
  Y: { look: "yo-yo", pictures: ["yo-yo", "yacht", "yak", "yogurt", "kite"] },
  Z: { look: "zebra", pictures: ["zebra", "zipper", "zoo", "zucchini", "boat"] },
};

/* --------------------------------- Level 2: letter sounds --------------------------------- */

// `sound` is how the sheet writes it ("A says /æ/"), `words` are the three "Listen and say" words
// and `hunt` are the six pictures in "begin with the ... sound".
// Two pictures differ from the printed sheets in `hunt`:
//  - K: the sheet's sixth picture is a cat. Cat begins with the /k/ sound too, so it is a ball
//    here, rather than teaching children that cat is not a /k/ word.
//  - T: the sheet's "top" has no picture that can be shown here, so it is a turtle (also a T word).
export const L2_PAGES = {
  A: { sound: "æ", words: ["apple", "ant", "airplane"], hunt: ["apple", "orange", "ant", "cat", "tree", "airplane"] },
  B: { sound: "b", words: ["ball", "bat", "bus"], hunt: ["ball", "apple", "banana", "bat", "cat", "bus"] },
  C: { sound: "k", words: ["cat", "car", "cake"], hunt: ["cat", "dog", "car", "cake", "sun", "cap"] },
  D: { sound: "d", words: ["dog", "duck", "drum"], hunt: ["dog", "cat", "duck", "drum", "apple", "car"] },
  E: { sound: "e", words: ["egg", "elephant", "envelope"], hunt: ["egg", "apple", "elephant", "ball", "envelope", "fish"] },
  F: { sound: "f", words: ["fish", "fan", "flower"], hunt: ["fish", "apple", "fan", "dog", "flower", "sun"] },
  G: { sound: "g", words: ["goat", "grapes", "gift"], hunt: ["goat", "apple", "grapes", "sun", "gift", "dog"] },
  H: { sound: "h", words: ["hat", "house", "horse"], hunt: ["hat", "apple", "horse", "elephant", "house", "sun"] },
  I: { sound: "i", words: ["igloo", "ice cream", "ink"], hunt: ["igloo", "apple", "elephant", "ice cream", "sun", "ink"] },
  J: { sound: "j", words: ["jug", "jelly", "jet"], hunt: ["jug", "apple", "jet", "sun", "jam", "cat"] },
  K: { sound: "k", words: ["kite", "king", "key"], hunt: ["kite", "apple", "rabbit", "key", "ball", "sun"] },
  L: { sound: "l", words: ["lion", "leaf", "lamp"], hunt: ["lion", "apple", "ball", "leaf", "elephant", "lamp"] },
  M: { sound: "m", words: ["monkey", "mango", "moon"], hunt: ["monkey", "apple", "ball", "mango", "mouse", "moon"] },
  N: { sound: "n", words: ["nest", "net", "notebook"], hunt: ["nest", "apple", "elephant", "net", "sun", "ice cream"] },
  O: { sound: "o", words: ["orange", "onion", "octopus"], hunt: ["orange", "apple", "ball", "octopus", "umbrella", "onion"] },
  P: { sound: "p", words: ["parrot", "pencil", "pig"], hunt: ["parrot", "apple", "ball", "pencil", "cat", "pig"] },
  Q: { sound: "kw", words: ["queen", "quilt", "quill"], hunt: ["queen", "sun", "quilt", "duck", "quill", "apple"] },
  R: { sound: "r", words: ["rabbit", "rocket", "rainbow"], hunt: ["rabbit", "sun", "rocket", "rainbow", "apple", "ball"] },
  S: { sound: "s", words: ["sun", "snake", "star"], hunt: ["sun", "apple", "ball", "snake", "star", "cat"] },
  T: { sound: "t", words: ["tiger", "tomato", "top"], hunt: ["tiger", "apple", "ball", "tomato", "sun", "turtle"] },
  U: { sound: "u", words: ["umbrella", "up", "unicorn"], hunt: ["umbrella", "apple", "ball", "up", "cat", "unicorn"] },
  V: { sound: "v", words: ["van", "vase", "vegetable"], hunt: ["van", "apple", "ball", "vase", "dog", "vegetable"] },
  W: { sound: "w", words: ["watch", "watermelon", "whale"], hunt: ["watch", "tree", "watermelon", "ball", "whale", "sun"] },
  X: { sound: "ks", words: ["X-mas tree", "xylophone", "x-ray"], hunt: ["X-mas tree", "apple", "ball", "xylophone", "dog", "x-ray"] },
  Y: { sound: "y", words: ["yellow", "yak", "yo-yo"], hunt: ["yellow", "apple", "yak", "yo-yo", "car", "boat"] },
  Z: { sound: "z", words: ["zebra", "zipper", "zoo"], hunt: ["zebra", "apple", "zipper", "ball", "zoo", "cat"] },
};

/* --------------------------------- Level 3: story posters --------------------------------- */

// Each poster has a three-line story. Words in [square brackets] are the words the poster is
// about: they are highlighted, and tapping one sounds it out.
// (The N poster prints "A hest has three eggs" - a typo for "nest", written correctly here.)
export const L3_STORIES = {
  A: ["An [ant] found an [apple].", "An [alligator] came along.", "They shared the [apple] and smiled."],
  B: ["A [bear] has a [ball].", "The [bear] gets on a [bus].", "The [bear] takes the [ball] on the [bus]."],
  C: ["A [cat] has a [cup].", "The [cat] gets in a [car].", "The [cat] takes the [cup] in the [car]."],
  D: ["A [dog] has a [duck].", "The [dog] plays a [drum].", "The [dog] and [duck] dance together."],
  E: ["An [elephant] has an [egg].", "An [eagle] comes along.", "They look at the [egg] together."],
  F: ["A [fish] sees a [frog].", "The [frog] sits near a [fan].", "The [fish] and [frog] feel the [fan]."],
  G: ["A [goat] has [grapes].", "The [goat] goes to the [gate].", "The [goat] takes the [grapes] to the [gate]."],
  H: ["A [horse] has a [hat].", "The [horse] goes to a [house].", "The [horse] takes the [hat] to the [house]."],
  I: ["An [igloo] has [ice cream].", "An [iguana] comes along.", "They enjoy the [ice cream] together."],
  J: ["A boy can [jump].", "The boy has [jam].", "The boy takes the [jam] in a [jet]."],
  K: ["A [kite] flies high.", "A [kitten] sees a [key].", "They play with the [kite] near the [key]."],
  L: ["A [lion] sits near a [lamp].", "The [lion] sees a [leaf].", "The [lion] and the [leaf] are near the [lamp]."],
  M: ["A [monkey] has a [mango].", "A [mouse] comes along.", "The [monkey] shares the [mango] with the [mouse]."],
  N: ["A bird sits on a [nest].", "A [nest] has three eggs.", "The bird and the [nest] are near a [net]."],
  O: ["An [octopus] sees an [orange].", "The [octopus] goes to a boat.", "The [octopus] takes the [orange] in the boat."],
  P: ["A [panda] sees a [parrot].", "A [pig] comes along.", "The [panda], the [parrot] and the [pig] play in the [park]."],
  Q: ["A [queen] sees a [quail].", "The [queen] finds a [quill].", "The [queen], the [quail] and the [quill] are in the castle."],
  R: ["A train goes over a bridge.", "A [rabbit] sits on a [rock].", "The train, the [rainbow] and the [rabbit] are near the [river]."],
  S: ["A [snake] sees a [sandcastle].", "A crab comes along.", "The [snake], the [sandcastle] and the crab are on the [sand]."],
  T: ["A [tiger] sees a [top].", "A [turtle] comes along.", "The [tiger], the [top] and the [turtle] play in the garden."],
  U: ["A girl has an [umbrella].", "She stands [under] a tree.", "A [unicorn] comes along."],
  V: ["A [van] is on the road.", "A [vase] is on the table.", "A [vulture] sits on a rock."],
  W: ["A [whale] is in the [water].", "A [watch] is on the dock.", "A [watermelon] is on the dock too."],
  X: ["An [x-ray] shows the bones.", "A [xylophone] makes music.", "A [fox] sits nearby."],
  Y: ["A [yak] is near the lake.", "A [yo-yo] is on the rock.", "A [yacht] sails on the water."],
  Z: ["A [zebra] is at the [zoo].", "A [zipper] is on the bag.", "A [zookeeper] works at the [zoo]."],
};

// Short words a child can sound out letter by letter, all taken from the pages above.
export const SOUND_OUT_WORDS = [
  "ant", "bat", "bed", "bus", "cat", "cup", "dog", "egg", "fan", "fox",
  "hat", "jam", "jet", "mug", "net", "pen", "pig", "sun", "van", "yak",
];

/* ---------------------------------- Level 4: rhyming words ---------------------------------- */

// One row per line of a Rhyming Words sheet: the word at the left, the picture(s) that rhyme with it
// and the other pictures on the row that do not. Where a row has two pictures that both rhyme
// (bear: chair and pear), both are listed.
//
// Where a row offers more than one picture that rhymes (key: tree and bee; zip: ship and lip), they are all
// listed. A word that only almost rhymes with the row's word is never offered as a wrong answer either (shoe
// with igloo, which ends in the same -oo as glue), so a child is never marked wrong for a rhyme.
//
// Left out on purpose, because no picture on the row rhymes when said aloud:
//   E  ear -> bear       (ear rhymes with deer; bear rhymes with chair)
//   C  cow -> bow        (the picture is a ribbon bow, said "boh", which rhymes with go)
//   H  honey -> monkey   (-unny and -unkey are close, but they are not a rhyme)
//   I  insect -> nest    (insect ends -ect, nest ends -est)
//   O  orange -> range   (nothing rhymes with orange; range is only close)
//   O  owl -> bowl       (owl rhymes with howl; bowl rhymes with roll)
//   O  onion -> lion     (they only share the last little sound)
//   Q  question -> puzzle (none of puzzle, apple and ball rhymes with it)
//   U  umbrella -> ...   (the row offers a bear, a second umbrella and an apple)
//   U  uniform -> ...    (drum, station and ball: none rhymes with it)
//   V  vase -> case      (vase is said "vahz" by many people, which does not rhyme with case)
//   W  watch -> match    (watch says "wotch", match says "match")
//   Y  yacht -> patch    (yacht says "yot")
//   Y  yogurt -> court   (they do not rhyme)
//   Z  zebra -> ...      (umbrella, zipper and leaf: none rhymes with it)
export const L4_ROWS = [
  { letter: "A", word: "ant", rhymes: ["plant"], others: ["cap", "sun"] },
  { letter: "A", word: "ape", rhymes: ["grape"], others: ["bell", "dog"] },
  { letter: "A", word: "airplane", rhymes: ["train"], others: ["tree", "box"] },
  { letter: "A", word: "axe", rhymes: ["wax"], others: ["frog", "log"] },

  { letter: "B", word: "bat", rhymes: ["cat"], others: ["car", "sun"] },
  { letter: "B", word: "bear", rhymes: ["chair", "pear"], others: ["ball"] },
  { letter: "B", word: "bee", rhymes: ["tree", "key"], others: ["hat"] },
  { letter: "B", word: "bed", rhymes: ["sled"], others: ["dog", "net"] },

  { letter: "C", word: "cat", rhymes: ["hat"], others: ["sun", "cup"] },
  { letter: "C", word: "cake", rhymes: ["lake"], others: ["dog", "pen"] },
  { letter: "C", word: "cap", rhymes: ["map"], others: ["tree", "sock"] },

  { letter: "D", word: "dog", rhymes: ["frog"], others: ["sun", "pen"] },
  { letter: "D", word: "duck", rhymes: ["truck"], others: ["ball", "cup"] },
  { letter: "D", word: "drum", rhymes: ["plum"], others: ["tree", "car"] },
  { letter: "D", word: "duckling", rhymes: ["ring", "king"], others: ["star"] },

  { letter: "E", word: "egg", rhymes: ["leg"], others: ["tree", "car"] },
  { letter: "E", word: "elf", rhymes: ["shelf"], others: ["chair", "sun"] },
  { letter: "E", word: "end", rhymes: ["bend"], others: ["dog", "tree"] },

  { letter: "F", word: "frog", rhymes: ["dog"], others: ["sun", "car"] },
  { letter: "F", word: "fan", rhymes: ["van"], others: ["cup", "tree"] },
  { letter: "F", word: "fish", rhymes: ["dish"], others: ["ball", "cat"] },
  { letter: "F", word: "fox", rhymes: ["box"], others: ["tree", "duck"] },

  { letter: "G", word: "grape", rhymes: ["tape"], others: ["car", "sun"] },
  { letter: "G", word: "goat", rhymes: ["boat"], others: ["tree", "jet"] },
  { letter: "G", word: "grass", rhymes: ["glass"], others: ["cap", "bed"] },
  { letter: "G", word: "gift", rhymes: ["lift"], others: ["cat", "sun"] },

  { letter: "H", word: "hat", rhymes: ["bat"], others: ["cup", "sun"] },
  { letter: "H", word: "hen", rhymes: ["pen"], others: ["fox", "ball"] },
  { letter: "H", word: "house", rhymes: ["mouse"], others: ["tree", "cake"] },

  { letter: "I", word: "igloo", rhymes: ["glue"], others: ["fly"] },
  { letter: "I", word: "ink", rhymes: ["sink"], others: ["bell", "tree"] },
  { letter: "I", word: "iguana", rhymes: ["banana"], others: ["fan", "drum"] },

  { letter: "J", word: "jam", rhymes: ["ham"], others: ["bell", "hat"] },
  { letter: "J", word: "jug", rhymes: ["mug"], others: ["sun", "tree"] },
  { letter: "J", word: "jet", rhymes: ["net"], others: ["dog", "bus"] },
  { letter: "J", word: "jump", rhymes: ["pump"], others: ["lamp", "duck"] },

  { letter: "K", word: "kite", rhymes: ["night"], others: ["ball", "cow"] },
  { letter: "K", word: "key", rhymes: ["tree", "bee"], others: ["car"] },
  { letter: "K", word: "king", rhymes: ["ring"], others: ["pen", "fish"] },
  { letter: "K", word: "kangaroo", rhymes: ["zoo"], others: ["spoon", "wool"] },

  { letter: "L", word: "lamp", rhymes: ["camp"], others: ["dog", "sun"] },
  { letter: "L", word: "leaf", rhymes: ["beef"], others: ["ball", "cup"] },
  { letter: "L", word: "lock", rhymes: ["sock"], others: ["fish", "tree"] },
  { letter: "L", word: "leg", rhymes: ["peg"], others: ["car", "book"] },

  { letter: "M", word: "mouse", rhymes: ["house"], others: ["tree", "star"] },
  { letter: "M", word: "moon", rhymes: ["spoon", "tune"], others: ["book"] },
  { letter: "M", word: "map", rhymes: ["cap"], others: ["bus", "sun"] },
  { letter: "M", word: "mop", rhymes: ["top"], others: ["drum", "rope"] },

  { letter: "N", word: "nest", rhymes: ["vest"], others: ["bell", "cat"] },
  { letter: "N", word: "nose", rhymes: ["rose"], others: ["tree", "ball"] },
  { letter: "N", word: "net", rhymes: ["pet"], others: ["cup", "sun"] },
  { letter: "N", word: "nut", rhymes: ["hut"], others: ["bus", "fish"] },

  { letter: "O", word: "ox", rhymes: ["box"], others: ["pen", "sun"] },

  { letter: "P", word: "pig", rhymes: ["wig"], others: ["tree", "ball"] },
  { letter: "P", word: "pan", rhymes: ["van"], others: ["cat", "sun"] },
  { letter: "P", word: "pen", rhymes: ["hen"], others: ["cup", "star"] },
  { letter: "P", word: "pot", rhymes: ["dot"], others: ["fish", "moon"] },

  { letter: "Q", word: "queen", rhymes: ["green"], others: ["duck", "car"] },
  { letter: "Q", word: "quill", rhymes: ["hill"], others: ["bell", "tree"] },
  { letter: "Q", word: "quilt", rhymes: ["tilt"], others: ["kite", "drum"] },

  { letter: "R", word: "rat", rhymes: ["hat"], others: ["tree", "sun"] },
  { letter: "R", word: "ring", rhymes: ["king"], others: ["car", "ball"] },
  { letter: "R", word: "rug", rhymes: ["mug"], others: ["fish", "book"] },
  { letter: "R", word: "rag", rhymes: ["bag"], others: ["tree", "duck"] },

  { letter: "S", word: "sun", rhymes: ["bun"], others: ["tree", "car"] },
  { letter: "S", word: "sock", rhymes: ["lock"], others: ["cap", "ball"] },
  { letter: "S", word: "star", rhymes: ["jar"], others: ["book", "leaf"] },
  { letter: "S", word: "snake", rhymes: ["rake"], others: ["cup", "drum"] },

  { letter: "T", word: "top", rhymes: ["mop"], others: ["tree", "sun"] },
  { letter: "T", word: "tea", rhymes: ["key", "tree"], others: ["car"] },
  { letter: "T", word: "tub", rhymes: ["sub"], others: ["bus", "hat"] },
  { letter: "T", word: "ten", rhymes: ["pen"], others: ["bed", "car"] },

  { letter: "U", word: "unicorn", rhymes: ["corn"], others: ["tree", "fish"] },
  { letter: "U", word: "urn", rhymes: ["turn"], others: ["car", "bed"] },

  { letter: "V", word: "van", rhymes: ["fan"], others: ["cup", "tree"] },
  { letter: "V", word: "vest", rhymes: ["nest"], others: ["bag", "hat"] },
  { letter: "V", word: "viper", rhymes: ["diaper"], others: ["ball", "bed"] },

  { letter: "W", word: "whale", rhymes: ["nail"], others: ["dog", "tree"] },
  { letter: "W", word: "wet", rhymes: ["net"], others: ["cup", "hat"] },
  { letter: "W", word: "well", rhymes: ["shell"], others: ["ball", "leaf"] },

  { letter: "X", word: "xylophone", rhymes: ["phone"], others: ["rock", "lion"] },
  { letter: "X", word: "x-ray", rhymes: ["hay", "tray"], others: ["car"] },
  { letter: "X", word: "Xmas tree", rhymes: ["bee", "key", "knee"], others: [] },
  { letter: "X", word: "Xerox", rhymes: ["box", "socks"], others: ["ball"] },

  { letter: "Y", word: "yarn", rhymes: ["barn"], others: ["fan", "tree"] },
  { letter: "Y", word: "yawn", rhymes: ["fawn"], others: ["sun", "pig"] },

  { letter: "Z", word: "zoo", rhymes: ["shoe"], others: ["key", "cup"] },
  { letter: "Z", word: "zigzag", rhymes: ["flag"], others: ["fan", "dog"] },
  { letter: "Z", word: "zip", rhymes: ["ship", "lip"], others: ["sun"] },
];

// The letters that have a Rhyming Words sheet.
export const L4_LETTERS = [...new Set(L4_ROWS.map((row) => row.letter))];

// A picture for a word that has no emoji and is not on a Level 1 page (top, peg, wig...): the picture as the Level 4
// sheet draws it, without its printed name. `letter` is the sheet, `box` is [left, top, right, bottom] in pixels and
// `page` is the width and height in pixels of the sheet the box was measured on. If a sheet is replaced by one
// laid out differently, measure the box again; the word then shows a plain picture frame until it is fixed.
export const L4_PICTURES = {
  top: { letter: "M", box: [331, 1192, 527, 1363], page: [1054, 1492] },
  peg: { letter: "L", box: [330, 1193, 527, 1354], page: [1054, 1492] },
  wig: { letter: "P", box: [331, 403, 553, 580], page: [1089, 1444] },
  tilt: { letter: "Q", box: [335, 950, 554, 1116], page: [1089, 1445] },
  rug: { letter: "R", box: [27, 961, 298, 1103], page: [1089, 1445] },
  rag: { letter: "R", box: [27, 1206, 299, 1363], page: [1089, 1445] },
  rake: { letter: "S", box: [344, 1195, 537, 1357], page: [1089, 1445] },
  sub: { letter: "T", box: [334, 948, 547, 1103], page: [1089, 1445] },
  diaper: { letter: "V", box: [338, 947, 544, 1108], page: [1089, 1445] },
  well: { letter: "W", box: [51, 2460, 571, 2772], page: [2079, 2953] },
  tray: { letter: "X", box: [580, 677, 820, 826], page: [1089, 1445] },
  barn: { letter: "Y", box: [332, 402, 547, 585], page: [1089, 1445] },
  zigzag: { letter: "Z", box: [27, 957, 298, 1075], page: [1089, 1445] },
  zip: { letter: "Z", box: [27, 1204, 299, 1359], page: [1089, 1445] },
};

/* -------------------------------- Level 5: syllable recognition -------------------------------- */

// A word and its syllables: syl("apple", "ap", "ple"), or just syl("ant") for a word of one syllable. The
// parts put together spell the word, and `count` is how many syllables there are.
const syl = (word, ...parts) => {
  const syllables = parts.length ? parts : [word.toLowerCase()];

  return { word, parts: syllables, count: syllables.length };
};

// Every page has four rows, top to bottom, and `L5_PAGES` lists them in that order, because a row's place is
// what finds its picture on the page. Where the sheets and this list differ:
//  - The clapping hands drawn on the sheets do not always match the split written beside them: they are drawn
//    as 3 for alligator (al-li-ga-tor is 4), 3 for firetruck, monkey, quokka and sandwich (all 2) and 4 for
//    xylophone (3). The written split is right each time, so that is what is used here.
//  - Vegetable is left out (`skip`): the sheet writes four parts (ve-ge-ta-ble) but draws three claps, and it
//    is said "veg-ta-ble", so there is no one right answer to give a child.
//  - Pineapple is split pine-ap-ple. The sheet writes "Pi - ne - apple", which is also 3 syllables.
export const L5_PAGES = {
  A: [syl("apple", "ap", "ple"), syl("ant"), syl("acorn", "a", "corn"), syl("alligator", "al", "li", "ga", "tor")],
  B: [syl("ball"), syl("banana", "ba", "na", "na"), syl("bag"), syl("butterfly", "but", "ter", "fly")],
  C: [syl("cat"), syl("car"), syl("carrot", "car", "rot"), syl("caterpillar", "ca", "ter", "pil", "lar")],
  D: [syl("dog"), syl("duck"), syl("drum"), syl("dolphin", "dol", "phin")],
  E: [syl("elephant", "e", "le", "phant"), syl("egg"), syl("envelope", "en", "ve", "lope"), syl("ear")],
  F: [syl("fish"), syl("flower", "flow", "er"), syl("fruit"), syl("firetruck", "fire", "truck")],
  G: [syl("grapes"), syl("goat"), syl("gorilla", "go", "ril", "la"), syl("gift")],
  H: [syl("house"), syl("hat"), syl("hammer", "ham", "mer"), syl("helicopter", "he", "li", "cop", "ter")],
  I: [syl("igloo", "i", "gloo"), syl("iguana", "i", "gua", "na"), syl("ice cream", "ice", "cream"), syl("ink")],
  J: [syl("jam"), syl("jug"), syl("jacket", "jack", "et"), syl("jungle", "jun", "gle")],
  K: [syl("kite"), syl("kettle", "ket", "tle"), syl("kangaroo", "kan", "ga", "roo"), syl("kiwi", "ki", "wi")],
  L: [syl("lion", "li", "on"), syl("lemon", "lem", "on"), syl("ladder", "lad", "der"), syl("ladybug", "la", "dy", "bug")],
  M: [syl("monkey", "mon", "key"), syl("mango", "man", "go"), syl("mushroom", "mush", "room"), syl("mountain", "moun", "tain")],
  N: [syl("nest"), syl("nuts"), syl("nurse"), syl("narwhal", "nar", "whal")],
  O: [syl("orange", "or", "ange"), syl("owl"), syl("octopus", "oc", "to", "pus"), syl("otter", "ot", "ter")],
  P: [syl("pig"), syl("pineapple", "pine", "ap", "ple"), syl("parrot", "par", "rot"), syl("pumpkin", "pump", "kin")],
  Q: [syl("queen"), syl("quilt"), syl("quail"), syl("quokka", "quok", "ka")],
  R: [syl("rabbit", "rab", "bit"), syl("rainbow", "rain", "bow"), syl("rocket", "rock", "et"), syl("raincoat", "rain", "coat")],
  S: [syl("sun"), syl("sandwich", "sand", "wich"), syl("squirrel", "squir", "rel"), syl("sunflower", "sun", "flow", "er")],
  T: [syl("tiger", "ti", "ger"), syl("tomato", "to", "ma", "to"), syl("train"), syl("turtle", "tur", "tle")],
  U: [syl("umbrella", "um", "brel", "la"), syl("unicorn", "u", "ni", "corn"), syl("utensil", "u", "ten", "sil"), syl("uniform", "u", "ni", "form")],
  V: [syl("van"), { word: "vegetable", skip: true }, syl("volcano", "vol", "ca", "no"), syl("vest")],
  W: [syl("whale"), syl("watermelon", "wa", "ter", "mel", "on"), syl("window", "win", "dow"), syl("watch")],
  X: [syl("xylophone", "xy", "lo", "phone"), syl("x-ray", "x", "ray"), syl("X-mas tree", "x", "mas", "tree"), syl("xerox", "xe", "rox")],
  Y: [syl("yogurt", "yo", "gurt"), syl("yarn"), syl("yacht"), syl("yolk")],
  Z: [syl("zebra", "ze", "bra"), syl("zipper", "zip", "per"), syl("zoo"), syl("zero", "ze", "ro")],
};

// Every word the games can use, with the letter of its page and its row (0 to 3).
export const L5_WORDS = Object.entries(L5_PAGES).flatMap(([letter, rows]) =>
  rows.flatMap((row, index) => (row.skip ? [] : [{ ...row, letter, row: index }])),
);

/* -------------------------------- Level 6: sound segmentation -------------------------------- */

// A word and its sounds, as the letters written in the Beginning, Middle and Ending boxes: snd("cat", "c", "a",
// "t"). A sound can take more than one letter: duck is d, u, ck. A word of two sounds has two boxes, as the
// sheet's owl row does.
const snd = (word, ...sounds) => ({ word, sounds });

// A word the sheet shows but the games leave out, because its sounds do not fit boxes of letters one for one.
const noSounds = (word) => ({ word, sounds: null });

// Every page has four rows, top to bottom, and `L6_PAGES` lists them in that order, because a row's place is
// what finds its picture on the page. The rows left out (`noSounds`) are:
//  - a letter that is not a sound of its own, or a silent e: axe, ice, kite, vase, use
//  - more than three sounds: acorn, igloo, jump, oven, quilt, quiet, ufo, x-ray, yo-yo, zebra, zero
//  - a vowel followed by r, which is taught later: arm, car, urn
//  - a word not said the way it is written: key
//  - hom (the honey jar on H): it is not a word, so there is nothing to say
// Words that appear on two pages (bed, hen, pen, net) are in the list twice, once for each page's picture.
export const L6_PAGES = {
  A: [snd("ant", "a", "n", "t"), noSounds("axe"), noSounds("arm"), noSounds("acorn")],
  B: [snd("bat", "b", "a", "t"), snd("bed", "b", "e", "d"), snd("bin", "b", "i", "n"), snd("bug", "b", "u", "g")],
  C: [snd("cat", "c", "a", "t"), snd("cap", "c", "a", "p"), noSounds("car"), snd("cup", "c", "u", "p")],
  D: [snd("dog", "d", "o", "g"), snd("dad", "d", "a", "d"), snd("duck", "d", "u", "ck"), snd("dig", "d", "i", "g")],
  E: [snd("bed", "b", "e", "d"), snd("hen", "h", "e", "n"), snd("pen", "p", "e", "n"), snd("net", "n", "e", "t")],
  F: [snd("fan", "f", "a", "n"), snd("fog", "f", "o", "g"), snd("fig", "f", "i", "g"), snd("fin", "f", "i", "n")],
  G: [snd("goat", "g", "oa", "t"), snd("gum", "g", "u", "m"), snd("gap", "g", "a", "p"), snd("gig", "g", "i", "g")],
  H: [snd("hat", "h", "a", "t"), snd("hen", "h", "e", "n"), noSounds("hom"), snd("hop", "h", "o", "p")],
  I: [snd("ink", "i", "n", "k"), noSounds("ice"), noSounds("igloo"), snd("inch", "i", "n", "ch")],
  J: [snd("jam", "j", "a", "m"), snd("jug", "j", "u", "g"), snd("jet", "j", "e", "t"), noSounds("jump")],
  K: [noSounds("key"), snd("kid", "k", "i", "d"), noSounds("kite"), snd("king", "k", "i", "ng")],
  L: [snd("leg", "l", "e", "g"), snd("lip", "l", "i", "p"), snd("log", "l", "o", "g"), snd("lid", "l", "i", "d")],
  M: [snd("mug", "m", "u", "g"), snd("mat", "m", "a", "t"), snd("mop", "m", "o", "p"), snd("map", "m", "a", "p")],
  N: [snd("nod", "n", "o", "d"), snd("net", "n", "e", "t"), snd("nail", "n", "ai", "l"), snd("nut", "n", "u", "t")],
  O: [snd("out", "ou", "t"), snd("owl", "ow", "l"), snd("ox", "o", "x"), noSounds("oven")],
  P: [snd("pan", "p", "a", "n"), snd("pig", "p", "i", "g"), snd("pen", "p", "e", "n"), snd("pot", "p", "o", "t")],
  Q: [snd("queen", "qu", "ee", "n"), snd("quail", "qu", "ai", "l"), noSounds("quilt"), noSounds("quiet")],
  R: [snd("rat", "r", "a", "t"), snd("ring", "r", "i", "ng"), snd("rug", "r", "u", "g"), snd("red", "r", "e", "d")],
  S: [snd("sun", "s", "u", "n"), snd("seal", "s", "ea", "l"), snd("soap", "s", "oa", "p"), snd("sock", "s", "o", "ck")],
  T: [snd("tag", "t", "a", "g"), snd("top", "t", "o", "p"), snd("tap", "t", "a", "p"), snd("tin", "t", "i", "n")],
  U: [noSounds("use"), snd("up", "u", "p"), noSounds("urn"), noSounds("ufo")],
  V: [snd("van", "v", "a", "n"), noSounds("vase"), snd("veg", "v", "e", "g"), snd("vet", "v", "e", "t")],
  W: [snd("win", "w", "i", "n"), snd("web", "w", "e", "b"), snd("wig", "w", "i", "g"), snd("wet", "w", "e", "t")],
  X: [noSounds("x-ray"), snd("box", "b", "o", "x"), noSounds("axe"), snd("fox", "f", "o", "x")],
  Y: [noSounds("yo-yo"), snd("yam", "y", "a", "m"), snd("yap", "y", "a", "p"), snd("yak", "y", "a", "k")],
  Z: [noSounds("zebra"), snd("zoo", "z", "oo"), snd("zip", "z", "i", "p"), noSounds("zero")],
};

// Every word the games can use, once each (bed, hen, pen and net are on two pages): with the letter of its page
// and its row (0 to 3).
export const L6_WORDS = (() => {
  const seen = new Set();

  return Object.entries(L6_PAGES).flatMap(([letter, rows]) =>
    rows.flatMap((row, index) => {
      if (!row.sounds || seen.has(row.word)) return [];

      seen.add(row.word);

      return [{ ...row, letter, row: index }];
    }),
  );
})();

/* ---------------------------------- Level 7: sound blending ---------------------------------- */

// A row of a Sound Blending page: the sounds printed on the tiles, one letter each, and the word they blend into.
// `picture: false` marks a row whose picture is not the word (the bat beside "at"), so the games do not show it.
// `skip: true` marks a row that is left out of the games (see below).
const blend = (word, options = {}) => ({ word, sounds: [...word], ...options });

const noPicture = (word) => blend(word, { picture: false });

// A row of the sheets that the games leave out, with the reason. Where the sheet itself is wrong the sheet is
// not repeated to the children:
//  - a picture that does not match the letters: "ap" beside a cap, "tred" beside a bed, "pled" beside a sled,
//    "blen" beside a blender, "site" beside a kite, "stuf" beside a box of stuff (it needs a second f)
//  - "plan" beside a map, which a child would read as "map"
//  - the two-sound words that are only the end of a word (et, en, eg, ed, ot, mu, cu, ru, hu: net, hen, egg, bed,
//    pot, mud, cup, run, hut without the first or last letter) and "of" beside a switch marked OFF
//  - "fish", which the sheet splits into f-i-s-h with the sounds /s/ and /h/ (it is f-i-sh), and "sock", whose
//    two boxes both say /k/: a game that says those sounds aloud would teach them wrongly
const skipped = (word) => ({ word, sounds: [...word], skip: true });

// Every page has four rows, top to bottom, and `L7_PAGES` lists them in that order, because a row's place is what
// finds its picture on the page. A page's key is its vowel and number of sounds: "A3" is vowel A, three sounds.
export const L7_PAGES = {
  A2: [noPicture("at"), noPicture("an"), noPicture("am"), skipped("ap")],
  A3: [blend("cat"), blend("bag"), blend("map"), blend("hat")],
  A4: [skipped("plan"), blend("clap"), blend("flag"), blend("snap")],
  E2: [skipped("et"), skipped("en"), skipped("eg"), skipped("ed")],
  E3: [blend("bed"), blend("pen"), blend("red"), blend("leg")],
  E4: [skipped("tred"), skipped("pled"), skipped("blen"), blend("step")],
  I2: [noPicture("it"), noPicture("in"), noPicture("if"), noPicture("is")],
  I3: [blend("pig"), blend("bin"), blend("fin"), blend("rip")],
  I4: [skipped("site"), blend("lips"), skipped("fish"), blend("milk")],
  O2: [blend("on"), skipped("of"), noPicture("ox"), skipped("ot")],
  O3: [blend("dog"), blend("pot"), blend("box"), blend("fox")],
  O4: [blend("fork"), blend("horn"), blend("pond"), skipped("sock")],
  U2: [skipped("mu"), skipped("cu"), skipped("ru"), skipped("hu")],
  U3: [blend("bug"), blend("cup"), blend("sun"), blend("run")],
  U4: [blend("drum"), blend("hump"), blend("bump"), skipped("stuf")],
};

// The vowels, in the order of the pages.
export const L7_VOWELS = ["A", "E", "I", "O", "U"];

// Every word the games can use, with the key of its page and its row (0 to 3).
export const L7_WORDS = Object.entries(L7_PAGES).flatMap(([page, rows]) =>
  rows.flatMap((row, index) =>
    row.skip ? [] : [{ ...row, page, vowel: page[0], count: Number(page[1]), row: index, picture: row.picture !== false }],
  ),
);

/* ------------------------------------ Level 8: CVC words ------------------------------------ */

// A consonant-vowel-consonant word: its three letters are its three sounds, and the middle one is the vowel.
const cvc = (word) => ({ word, sounds: [...word] });

// The words that have a picture on the sheets (their pictures are in phonicsSheetRows.js), in the order they first
// appear: the pattern page (cat, bat, mat, hat), the Identify, Blend and Match pages, and so on.
export const L8_WORDS = [
  "cat", "bat", "mat", "hat", "dog", "sun", "bed", "cap", "pot", "map",
  "mug", "van", "pig", "hen", "fan", "mop", "bug", "log", "pin",
].map(cvc);

// The words on the "Complete the Letters" and "Arrange the Letters" pages: a picture, and the word with a letter
// missing or its letters mixed up.
export const L8_SPELLING = [
  "cat", "dog", "bed", "sun", "cap", "mug", "pig", "hen", "fan", "mop", "bug", "log",
];

// The "Change One Letter" pages: a word, the letter to change and what to change it to. The new word has no picture
// of its own on the sheets. Left out: "mug, change g to p", which makes "mup", not a word.
export const L8_CHANGES = [
  { word: "cat", from: "t", to: "n", result: "can" },
  { word: "map", from: "m", to: "c", result: "cap" },
  { word: "pin", from: "n", to: "g", result: "pig" },
  { word: "hen", from: "h", to: "p", result: "pen" },
  { word: "mop", from: "m", to: "t", result: "top" },
  { word: "log", from: "l", to: "d", result: "dog" },
  { word: "pig", from: "p", to: "b", result: "big" },
  { word: "bed", from: "b", to: "r", result: "red" },
  { word: "cap", from: "c", to: "m", result: "map" },
  { word: "sun", from: "s", to: "r", result: "run" },
  { word: "log", from: "o", to: "e", result: "leg" },
];

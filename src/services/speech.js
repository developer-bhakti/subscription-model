// Every sound the app speaks (the Sound Book, Rhyming Words, Literacy Skills and Numeracy Skills) uses a
// girl's voice, chosen here once so they all sound the same.
//
// The voices come from the device's browser, and a browser does not say which of them are women's. So the
// choice goes by the voice's name (Zira, Heera, Hazel, Samantha and so on). Among the girl voices an
// English (India) one comes first, then British, then American, and a voice stored on the device is
// preferred to one fetched over the network, because a network voice can arrive late and sound clipped.
// If a device has no recognisable girl voice at all, the app falls back to the best English voice that is
// not known to be a man's, and lifts its pitch so it sounds as light as it can.

// Names of voices known to be women's. `\b` keeps "Female" from being read as the word "male".
const GIRL_VOICES = new RegExp(
  "\\b(" +
    [
      "female", "woman", "girl",
      // Windows
      "zira", "heera", "hazel", "susan", "neerja", "jenny", "aria", "ava", "ana", "emma", "emily", "libby",
      "sonia", "natasha", "clara", "luna", "leah", "molly", "ezinne", "asilia", "imani",
      // Mac and iPhone
      "samantha", "veena", "karen", "moira", "tessa", "fiona", "victoria", "allison", "serena", "kate",
      "zoe", "nicky", "joelle", "kathy", "vicki", "sandy", "shelley", "flo", "ellen", "alva",
      // Android, Chrome and cloud voices
      "google us english", "joanna", "salli", "kendra", "kimberly", "ivy", "amy", "olivia", "raveena",
      "aditi", "priya", "lekha", "swara", "kalpana", "hemlata", "sangeeta",
    ].join("|") +
    ")\\b",
  "i",
);

// Names of voices known to be men's.
const BOY_VOICES = new RegExp(
  "\\b(" +
    [
      "male", "man", "boy",
      "david", "mark", "ravi", "george", "james", "richard", "guy", "ryan", "prabhat", "hemant", "christopher",
      "eric", "brian", "matthew", "william", "liam", "connor", "mitchell", "wayne", "luke", "thomas", "steffan",
      "alex", "daniel", "fred", "tom", "aaron", "arthur", "gordon", "oliver", "rishi", "lee", "rocko", "eddy",
      "jamie", "reed", "evan", "nathan", "ralph", "albert", "bruce", "junior", "joey", "justin", "kevin",
      "russell", "geraint", "sean", "ronan", "noah", "matthew",
    ].join("|") +
    ")\\b",
  "i",
);

const isEnglish = (voice) => /^en/i.test(voice.lang || "");

// True for a voice whose name says it is a girl's.
export const isGirlVoice = (voice) =>
  Boolean(voice) && GIRL_VOICES.test(voice.name || "") && !BOY_VOICES.test(voice.name || "");

const score = (voice) => {
  const name = voice.name || "";
  const lang = (voice.lang || "").replace("_", "-").toLowerCase();

  // Known girl voices first, then voices nobody has marked as a man's, and a man's voice last.
  const kind = isGirlVoice(voice) ? 100 : BOY_VOICES.test(name) ? 0 : 50;
  const accent = lang === "en-in" ? 30 : lang === "en-gb" ? 20 : lang === "en-us" ? 10 : 0;

  return kind + accent + (voice.localService ? 5 : 0);
};

// The best girl's voice in a list of voices, or null when there is no English voice at all.
export const chooseGirlVoice = (voices) => {
  const english = (voices || []).filter(isEnglish);
  let best = null;

  for (const voice of english) {
    if (!best || score(voice) > score(best)) best = voice;
  }

  return best;
};

// The pitch to speak with: the usual one for a girl's voice, higher when the best the device has is not
// known to be a girl's.
export const pitchFor = (voice, pitch = 1.1) => (isGirlVoice(voice) ? pitch : Math.max(pitch, 1.4));

const supported = () => typeof window !== "undefined" && "speechSynthesis" in window;

// Browsers fill the voice list a moment after the page loads, so it is asked for as early as possible.
if (supported()) window.speechSynthesis.getVoices();

// The girl's voice on this device right now, or null before the browser has its voices ready.
export const girlVoice = () => (supported() ? chooseGirlVoice(window.speechSynthesis.getVoices()) : null);

// An utterance that is already set up with the girl's voice.
export const girlUtterance = (text, { rate = 0.8, pitch = 1.1, volume = 1 } = {}) => {
  const utterance = new SpeechSynthesisUtterance(text);
  const voice = girlVoice();

  utterance.rate = rate;
  utterance.pitch = pitchFor(voice, pitch);
  utterance.volume = volume;

  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  } else {
    utterance.lang = "en-IN";
  }

  return utterance;
};

// Say something in the girl's voice. If the browser has not loaded its voices yet, it waits for them for
// up to a second rather than speaking in whatever voice the device happens to default to.
export const speakAsGirl = (text, options = {}) => {
  if (!supported()) return;

  const synth = window.speechSynthesis;
  const say = () => {
    const utterance = girlUtterance(text, options);

    if (options.onend) utterance.onend = options.onend;
    if (options.onerror) utterance.onerror = options.onerror;

    synth.speak(utterance);
  };

  if (synth.getVoices().length) {
    say();
    return;
  }

  let spoken = false;
  const go = () => {
    if (spoken) return;

    spoken = true;
    synth.removeEventListener("voiceschanged", go);
    say();
  };

  synth.addEventListener("voiceschanged", go);
  setTimeout(go, 1000);
};

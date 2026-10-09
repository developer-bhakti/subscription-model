// Little illustrations for the kids' dashboard: a smiling star, a rainbow, clouds, an owl
// mascot and the banner scene that brings them together. All inline SVG, drawn in one flat,
// rounded style, so they stay sharp at any size and need no image files.

/* ------------------------------ shapes (drawn at 0,0) ------------------------------ */

// A smiling star in a 64 x 64 box
const StarShape = () => (
  <g>
    <path
      d="M32 6 L39.35 21.89 L56.73 23.97 L43.89 35.86 L47.28 53.03 L32 44.5 L16.72 53.03 L20.11 35.86 L7.27 23.97 L24.65 21.89 Z"
      fill="#ffd93d"
      stroke="#f2b705"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <circle cx="26.5" cy="32" r="2.1" fill="#7a4a00" />
    <circle cx="37.5" cy="32" r="2.1" fill="#7a4a00" />
    <path
      d="M27.5 37 q4.5 4.5 9 0"
      fill="none"
      stroke="#7a4a00"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="22.5" cy="36.5" r="2.4" fill="#ff9aa8" fillOpacity="0.75" />
    <circle cx="41.5" cy="36.5" r="2.4" fill="#ff9aa8" fillOpacity="0.75" />
  </g>
);

// A fluffy cloud in a 100 x 60 box
const CloudShape = () => (
  <g fill="#fff">
    <circle cx="30" cy="36" r="18" />
    <circle cx="52" cy="28" r="22" />
    <circle cx="74" cy="36" r="16" />
    <rect x="16" y="36" width="72" height="18" rx="9" />
  </g>
);

// A rainbow arch in a 160 x 90 box
const RainbowShape = () => (
  <g fill="none" strokeWidth="11" strokeLinecap="round">
    <path d="M6 86 A74 74 0 0 1 154 86" stroke="#ff8fa3" />
    <path d="M17 86 A63 63 0 0 1 143 86" stroke="#ffb347" />
    <path d="M28 86 A52 52 0 0 1 132 86" stroke="#ffe066" />
    <path d="M39 86 A41 41 0 0 1 121 86" stroke="#7ddc6d" />
    <path d="M50 86 A30 30 0 0 1 110 86" stroke="#4fd1c5" />
  </g>
);

// An owl in a graduation cap, holding a book, in a 120 x 130 box
const OwlShape = () => (
  <g>
    {/* feet */}
    <ellipse cx="46" cy="124" rx="11" ry="5" fill="#ffa62b" />
    <ellipse cx="74" cy="124" rx="11" ry="5" fill="#ffa62b" />

    {/* body and wings */}
    <ellipse cx="60" cy="80" rx="40" ry="44" fill="#2fb363" />
    <ellipse cx="21" cy="84" rx="10" ry="23" fill="#249a54" transform="rotate(14 21 84)" />
    <ellipse cx="99" cy="84" rx="10" ry="23" fill="#249a54" transform="rotate(-14 99 84)" />

    {/* belly */}
    <ellipse cx="60" cy="92" rx="25" ry="29" fill="#e8f8d4" />
    <g fill="none" stroke="#c6e8a8" strokeWidth="2.4" strokeLinecap="round">
      <path d="M50 84 q4 4 8 0" />
      <path d="M62 84 q4 4 8 0" />
      <path d="M56 94 q4 4 8 0" />
    </g>

    {/* eyes */}
    <circle cx="44" cy="60" r="16" fill="#fff" stroke="#1d8a4c" strokeWidth="3" />
    <circle cx="76" cy="60" r="16" fill="#fff" stroke="#1d8a4c" strokeWidth="3" />
    <circle cx="46" cy="62" r="7.5" fill="#1b2a22" />
    <circle cx="74" cy="62" r="7.5" fill="#1b2a22" />
    <circle cx="48.5" cy="59.5" r="2.6" fill="#fff" />
    <circle cx="76.5" cy="59.5" r="2.6" fill="#fff" />

    {/* beak and cheeks */}
    <path d="M60 68 L53.5 78 Q60 83 66.5 78 Z" fill="#ffa62b" />
    <circle cx="30" cy="74" r="4" fill="#ff9aa8" fillOpacity="0.55" />
    <circle cx="90" cy="74" r="4" fill="#ff9aa8" fillOpacity="0.55" />

    {/* graduation cap */}
    <path d="M44 38 V47 Q60 55 76 47 V38" fill="#25573a" />
    <path d="M26 31 L60 15 L94 31 L60 46 Z" fill="#1f3a2a" />
    <path d="M88 33 L93 50" stroke="#ffd93d" strokeWidth="2.6" strokeLinecap="round" />
    <circle cx="93.4" cy="52" r="3.4" fill="#ffd93d" />

    {/* book */}
    <path
      d="M33 106 L33 124 Q47 118 60 124 Q73 118 87 124 L87 106"
      fill="#f2994a"
    />
    <path d="M36 102 Q48 96 60 102 Q72 96 84 102 L84 120 Q72 114 60 120 Q48 114 36 120 Z" fill="#fff7e0" />
    <path d="M60 102 V120" stroke="#e0b97a" strokeWidth="2" />
  </g>
);

/* ------------------------------ ready-made pieces ------------------------------ */

export const Star = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <StarShape />
  </svg>
);

export const Owl = ({ className }) => (
  <svg viewBox="0 0 120 130" className={className} aria-hidden="true">
    <OwlShape />
  </svg>
);

// The banner picture: an owl reading in front of a rainbow, with clouds and stars
export const BannerScene = ({ className }) => (
  <svg viewBox="0 0 340 200" className={className} aria-hidden="true">
    <g transform="translate(78 54) scale(1.6)">
      <RainbowShape />
    </g>

    <g transform="translate(6 138) scale(0.9)">
      <CloudShape />
    </g>
    <g transform="translate(246 146) scale(0.85)">
      <CloudShape />
    </g>

    <g transform="translate(132 70) scale(0.95)">
      <OwlShape />
    </g>

    <g transform="translate(26 34) scale(0.5)">
      <StarShape />
    </g>
    <g transform="translate(294 22) scale(0.42)">
      <StarShape />
    </g>
    <g transform="translate(100 8) scale(0.34)">
      <StarShape />
    </g>
    <g transform="translate(262 92) scale(0.3)">
      <StarShape />
    </g>
  </svg>
);

/* --------------------- the login picture: an owl reading on a pile of books --------------------- */

// A balloon on a string, in a 40 x 70 box
const BalloonShape = ({ color }) => (
  <g>
    <path d="M20 44 q-5 12 1 26" fill="none" stroke="#7f9f86" strokeWidth="1.8" strokeLinecap="round" />
    <ellipse cx="20" cy="22" rx="16" ry="20" fill={color} />
    <path d="M15.5 41 L20 47 L24.5 41 Z" fill={color} />
    <ellipse
      cx="13.5"
      cy="14"
      rx="3.8"
      ry="6.2"
      fill="#fff"
      fillOpacity="0.5"
      transform="rotate(-22 13.5 14)"
    />
  </g>
);

// A girl in a pink dress with two hair buns, one arm up to hold a balloon, in a 92 x 162 box
const GirlShape = () => (
  <g>
    <ellipse cx="46" cy="158" rx="30" ry="5" fill="#000" fillOpacity="0.12" />

    {/* legs and shoes */}
    <rect x="33" y="118" width="9" height="34" rx="4.5" fill="#f6bd98" />
    <rect x="50" y="118" width="9" height="34" rx="4.5" fill="#f6bd98" />
    <ellipse cx="36" cy="154" rx="11" ry="6" fill="#e5533d" />
    <ellipse cx="55" cy="154" rx="11" ry="6" fill="#e5533d" />

    {/* the arm that hangs down */}
    <path d="M62 74 L72 104" stroke="#f6bd98" strokeWidth="8" strokeLinecap="round" />
    <circle cx="72.5" cy="106.5" r="5" fill="#f6bd98" />

    {/* neck and dress */}
    <rect x="41" y="60" width="10" height="12" rx="4" fill="#f6bd98" />
    <path d="M30 68 H62 L71 125 Q46 133 21 125 Z" fill="#ff8fb1" />
    <path d="M38 68 q8 9 16 0" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    <g fill="#fff" fillOpacity="0.85">
      <circle cx="36" cy="94" r="2.6" />
      <circle cx="52" cy="90" r="2.6" />
      <circle cx="44" cy="108" r="2.6" />
      <circle cx="58" cy="110" r="2.6" />
      <circle cx="32" cy="114" r="2.6" />
    </g>

    {/* the arm that holds the balloon string */}
    <path d="M32 74 L16 48" stroke="#f6bd98" strokeWidth="8" strokeLinecap="round" />
    <circle cx="14.5" cy="45" r="5" fill="#f6bd98" />

    {/* hair buns, head, fringe and face */}
    <circle cx="27" cy="15" r="9" fill="#5a3a22" />
    <circle cx="65" cy="15" r="9" fill="#5a3a22" />
    <circle cx="46" cy="40" r="26" fill="#f6bd98" />
    <path d="M20 40 Q20 12 46 12 Q72 12 72 40 Q64 26 46 26 Q28 26 20 40 Z" fill="#5a3a22" />
    <circle cx="27" cy="15" r="3.6" fill="#ff8fb1" />
    <circle cx="65" cy="15" r="3.6" fill="#ff8fb1" />
    <circle cx="37" cy="43" r="3" fill="#2b1d12" />
    <circle cx="55" cy="43" r="3" fill="#2b1d12" />
    <circle cx="38" cy="42" r="1.1" fill="#fff" />
    <circle cx="56" cy="42" r="1.1" fill="#fff" />
    <circle cx="30" cy="51" r="4.5" fill="#ff8fa3" fillOpacity="0.5" />
    <circle cx="62" cy="51" r="4.5" fill="#ff8fa3" fillOpacity="0.5" />
    <path d="M39 52 q7 7 14 0" fill="none" stroke="#b34a4a" strokeWidth="2.4" strokeLinecap="round" />
  </g>
);

// A boy in an orange striped top and denim shorts, one arm up to hold a balloon, in a 92 x 162 box
const BoyShape = () => (
  <g>
    <ellipse cx="46" cy="158" rx="30" ry="5" fill="#000" fillOpacity="0.12" />

    {/* legs, shorts and shoes */}
    <rect x="34" y="124" width="9" height="28" rx="4.5" fill="#e0a67e" />
    <rect x="50" y="124" width="9" height="28" rx="4.5" fill="#e0a67e" />
    <rect x="29" y="106" width="34" height="24" rx="6" fill="#4a78c9" />
    <ellipse cx="37" cy="154" rx="11" ry="6" fill="#fff" stroke="#d9d9d9" strokeWidth="1.2" />
    <ellipse cx="56" cy="154" rx="11" ry="6" fill="#fff" stroke="#d9d9d9" strokeWidth="1.2" />

    {/* the arm that hangs down */}
    <path d="M31 74 L21 104" stroke="#e0a67e" strokeWidth="8" strokeLinecap="round" />
    <circle cx="20.5" cy="106.5" r="5" fill="#e0a67e" />

    {/* neck and top */}
    <rect x="41" y="60" width="10" height="12" rx="4" fill="#e0a67e" />
    <rect x="28" y="66" width="36" height="46" rx="10" fill="#ffa94d" />
    <rect x="28" y="82" width="36" height="7" fill="#fff" fillOpacity="0.55" />
    <rect x="28" y="95" width="36" height="7" fill="#fff" fillOpacity="0.55" />

    {/* the arm that holds the balloon string */}
    <path d="M61 74 L77 48" stroke="#e0a67e" strokeWidth="8" strokeLinecap="round" />
    <circle cx="78.5" cy="45" r="5" fill="#e0a67e" />

    {/* head, hair and face */}
    <circle cx="46" cy="40" r="26" fill="#e0a67e" />
    <path d="M20 40 Q18 11 46 11 Q74 11 72 40 Q64 25 46 27 Q28 25 20 40 Z" fill="#3b2a1d" />
    <path d="M40 12 Q46 2 54 10" fill="#3b2a1d" />
    <circle cx="37" cy="43" r="3" fill="#2b1d12" />
    <circle cx="55" cy="43" r="3" fill="#2b1d12" />
    <circle cx="38" cy="42" r="1.1" fill="#fff" />
    <circle cx="56" cy="42" r="1.1" fill="#fff" />
    <circle cx="30" cy="51" r="4.5" fill="#ff8fa3" fillOpacity="0.45" />
    <circle cx="62" cy="51" r="4.5" fill="#ff8fa3" fillOpacity="0.45" />
    <path d="M38 51 Q46 60 54 51 Z" fill="#7c1d2c" />
    <path d="M40 51 Q46 54 52 51" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
  </g>
);

// Two storybooks stacked for the owl to stand on, in a 250 x 78 box
const BookPileShape = () => (
  <g>
    <rect x="0" y="40" width="250" height="38" rx="9" fill="#f2994a" />
    <rect x="14" y="49" width="226" height="20" rx="5" fill="#fff7e0" />
    <rect x="0" y="40" width="16" height="38" rx="7" fill="#df7a28" />
    <path d="M30 59 H220" stroke="#e8d8b0" strokeWidth="2.4" strokeLinecap="round" />

    <rect x="22" y="0" width="206" height="36" rx="9" fill="#2fb3a0" />
    <rect x="36" y="8" width="184" height="19" rx="5" fill="#fff7e0" />
    <rect x="22" y="0" width="15" height="36" rx="7" fill="#1d8f80" />
    <path d="M52 17.5 H206" stroke="#e8d8b0" strokeWidth="2.4" strokeLinecap="round" />
  </g>
);

// The whole picture, drawn in a box about 470 wide and 440 tall: a girl and a boy either
// side of a rainbow, each with a balloon, and the owl reading on a pile of books
export const LoginHero = () => (
  <g>
    <g transform="translate(63 103) scale(2.15)">
      <RainbowShape />
    </g>

    <g transform="translate(-10 340) scale(1.1)">
      <CloudShape />
    </g>
    <g transform="translate(332 336) scale(1.05)">
      <CloudShape />
    </g>

    <ellipse cx="235" cy="437" rx="132" ry="6" fill="#000" fillOpacity="0.12" />
    <g transform="translate(110 358)">
      <BookPileShape />
    </g>

    <g transform="translate(112 96) scale(2.05)">
      <OwlShape />
    </g>

    {/* the girl, with a yellow balloon */}
    <g transform="translate(-10.9 224.8)">
      <BalloonShape color="#ffd93d" />
    </g>
    <g transform="translate(-8 238.5) scale(1.25)">
      <GirlShape />
    </g>

    {/* the boy, with a pink balloon */}
    <g transform="translate(429.1 224.8)">
      <BalloonShape color="#ff8fb1" />
    </g>
    <g transform="translate(352 238.5) scale(1.25)">
      <BoyShape />
    </g>

    <g transform="translate(130 28) scale(0.5)">
      <StarShape />
    </g>
    <g transform="translate(300 14) scale(0.42)">
      <StarShape />
    </g>
    <g transform="translate(232 70) scale(0.28)">
      <StarShape />
    </g>
    <g transform="translate(58 150) scale(0.3)">
      <StarShape />
    </g>
    <g transform="translate(402 150) scale(0.34)">
      <StarShape />
    </g>
  </g>
);

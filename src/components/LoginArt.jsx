// Artwork for the login page: the corner flowers, the green scene with the owl on a pile
// of books, and the little avatar icons on the Parent / School tiles. All inline SVG, so
// there are no image files to load and everything scales cleanly.

import { LoginHero } from "./KidsArt";

const FLOWER = "#4cc760";
const FLOWER_LIGHT = "#8fe39a";
const FLOWER_CENTER = "#dff5d3";

const Flower = ({ className }) => (
  <svg viewBox="0 0 160 160" className={className} aria-hidden="true">
    <g fill={FLOWER}>
      <circle cx="80" cy="40" r="38" />
      <circle cx="120" cy="80" r="38" />
      <circle cx="80" cy="120" r="38" />
      <circle cx="40" cy="80" r="38" />
    </g>
    <g fill={FLOWER_LIGHT}>
      <circle cx="80" cy="36" r="16" />
      <circle cx="124" cy="80" r="16" />
      <circle cx="80" cy="124" r="16" />
      <circle cx="36" cy="80" r="16" />
    </g>
    <circle cx="80" cy="80" r="20" fill={FLOWER} />
    <circle cx="80" cy="80" r="9" fill={FLOWER_CENTER} />
  </svg>
);

// Green flowers tucked into the top-left and bottom-right corners of the page.
export function CornerFlowers() {
  return (
    <>
      <Flower className="pointer-events-none absolute -left-12 -top-12 w-44" />
      <Flower className="pointer-events-none absolute -left-16 top-28 w-28" />
      <Flower className="pointer-events-none absolute -bottom-14 -right-12 w-52" />
      <Flower className="pointer-events-none absolute -right-16 bottom-32 w-28" />
    </>
  );
}

// The green side of the card — drawn in a 1000 x 700 box that the card's aspect ratio
// matches exactly, so nothing is ever stretched. The form card sits on top of the left
// part, which is why the green shape runs on underneath it.
const GREEN_SHAPE =
  "M388 0 H1000 V700 H654 C572 692 506 646 470 560 V80 C436 58 402 30 388 0 Z";

// The faint school doodles repeated across the green.
const DoodleTile = ({ id }) => (
    <pattern id={id} width="170" height="170" patternUnits="userSpaceOnUse">
      <g
        fill="none"
        stroke="#3fae08"
        strokeOpacity="0.38"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* book */}
        <path d="M14 26 h28 v22 h-28 z M28 26 v22" />
        {/* star */}
        <path d="M112 14 l5 11 12 1 -9 8 3 12 -11 -6 -11 6 3 -12 -9 -8 12 -1 z" />
        {/* light bulb */}
        <circle cx="142" cy="102" r="10" />
        <path d="M137 114 h10 M138 119 h8" />
        {/* pencil */}
        <path d="M20 124 l30 -30 7 7 -30 30 -10 3 z M44 100 l7 7" />
        {/* ring */}
        <circle cx="92" cy="72" r="6" />
        {/* plus */}
        <path d="M68 142 h12 M74 136 v12" />
        {/* globe */}
        <circle cx="132" cy="152" r="9" />
        <ellipse cx="132" cy="152" rx="4" ry="9" />
        {/* zigzag */}
        <path d="M146 42 l6 -6 6 6 6 -6" />
        {/* small dots */}
        <circle cx="60" cy="60" r="1.6" />
        <circle cx="102" cy="124" r="1.6" />
      </g>
    </pattern>
);

const Cloud = ({ x, y, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} fill="#fff">
    <circle cx="20" cy="22" r="11" />
    <circle cx="35" cy="14" r="14" />
    <circle cx="51" cy="21" r="11" />
    <rect x="9" y="22" width="53" height="11" rx="5.5" />
  </g>
);

export function LoginScene() {
  return (
    <svg
      viewBox="0 0 1000 700"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="login-green">
          <path d={GREEN_SHAPE} />
        </clipPath>

        <DoodleTile id="login-doodles" />
      </defs>

      <path d={GREEN_SHAPE} fill="#5fd10f" />
      <rect width="1000" height="700" fill="url(#login-doodles)" clipPath="url(#login-green)" />

      <Cloud x={500} y={106} scale={1.05} />
      <Cloud x={884} y={228} scale={1.5} />

      {/* An owl reading on a pile of books, in front of a rainbow */}
      <g transform="translate(512 150)">
        <LoginHero />
      </g>
    </svg>
  );
}

// Small avatar pair shown on the Parent tile.
export const ParentIcon = ({ className }) => (
  <svg viewBox="0 0 64 44" className={className} aria-hidden="true">
    <path d="M30 44 v-7 a14 12 0 0 1 28 0 v7 z" fill="#f472b6" />
    <path d="M33 18 a11 11 0 0 1 22 0 v15 h-5 v-13 h-12 v13 h-5 z" fill="#c93d68" />
    <circle cx="44" cy="19" r="9" fill="#f6bd98" />
    <path d="M35 17 a9 9 0 0 1 18 0 q-9 -6 -18 0 z" fill="#c93d68" />
    <path d="M4 44 v-7 a14 12 0 0 1 28 0 v7 z" fill="#3b82f6" />
    <circle cx="18" cy="17" r="9" fill="#f6bd98" />
    <path d="M9 15 a9 9 0 0 1 18 0 q-9 -6 -18 0 z" fill="#5b3a23" />
  </svg>
);

// A little school with a clock and a flag, shown on the School tile.
export const SchoolIcon = ({ className }) => (
  <svg viewBox="0 0 64 44" className={className} aria-hidden="true">
    <path d="M32 11 V2" stroke="#7a5a3a" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M32 2 L41 4.6 L32 7.2 Z" fill="#2fb363" />
    <rect x="9" y="21" width="46" height="21" rx="2.5" fill="#f6c667" />
    <path d="M5 23 L32 10 L59 23 Z" fill="#e5533d" />
    <circle cx="32" cy="19" r="4" fill="#fff" stroke="#e0a458" strokeWidth="1.4" />
    <path d="M32 17 V19 H34" fill="none" stroke="#7a5a3a" strokeWidth="1.2" strokeLinecap="round" />
    <rect x="27" y="29" width="10" height="13" rx="2" fill="#7a4a2a" />
    <rect x="13" y="27" width="9" height="8" rx="1.5" fill="#bfe7ff" />
    <rect x="42" y="27" width="9" height="8" rx="1.5" fill="#bfe7ff" />
  </svg>
);

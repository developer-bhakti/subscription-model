// The shapes children trace in the Cognitive Skill "Trace It" game: the letters A-Z (capital and
// small) and the digits 0-9, written the way they are taught in a handwriting lesson, each as a few
// strokes in the order and direction they are written.
//
// Every stroke is a path in a 100 x 100 box (x to the right, y downwards) written with the absolute
// commands M (start), L (line), Q (curve with one control point) and C (curve with two). Capital
// letters stand between y = 14 (top) and y = 78 (the line they sit on); small letters sit on the
// same line, are 40 tall (y = 38) and rise or fall from there (b d f h k l t go up to 14, g j p q y
// go down to 100). A stroke that is only a dot (the dot of i and j) is a very short line.

const UPPER = {
  A: ["M 50 14 L 20 78", "M 50 14 L 80 78", "M 31 57 L 69 57"],
  B: [
    "M 28 14 L 28 78",
    "M 28 14 L 50 14 C 74 14 74 46 50 46 L 28 46",
    "M 28 46 L 52 46 C 80 46 80 78 52 78 L 28 78",
  ],
  C: ["M 77 28 C 69 16 58 14 49 14 C 30 14 20 28 20 46 C 20 64 30 78 49 78 C 59 78 70 74 77 64"],
  D: ["M 26 14 L 26 78", "M 26 14 L 44 14 C 72 14 80 30 80 46 C 80 62 72 78 44 78 L 26 78"],
  E: ["M 30 14 L 30 78", "M 30 14 L 74 14", "M 30 46 L 66 46", "M 30 78 L 74 78"],
  F: ["M 30 14 L 30 78", "M 30 14 L 74 14", "M 30 46 L 64 46"],
  G: ["M 78 28 C 70 16 58 14 50 14 C 30 14 20 28 20 46 C 20 64 30 78 50 78 C 66 78 78 70 78 56 L 78 50 L 54 50"],
  H: ["M 24 14 L 24 78", "M 76 14 L 76 78", "M 24 46 L 76 46"],
  I: ["M 50 14 L 50 78"],
  J: ["M 62 14 L 62 56 C 62 72 54 78 44 78 C 32 78 26 70 24 62"],
  K: ["M 28 14 L 28 78", "M 74 14 L 28 52", "M 42 40 L 76 78"],
  L: ["M 30 14 L 30 78", "M 30 78 L 74 78"],
  M: ["M 22 78 L 22 14 L 50 60 L 78 14 L 78 78"],
  N: ["M 24 78 L 24 14 L 76 78 L 76 14"],
  O: ["M 50 14 C 28 14 20 30 20 46 C 20 62 28 78 50 78 C 72 78 80 62 80 46 C 80 30 72 14 50 14"],
  P: ["M 28 14 L 28 78", "M 28 14 L 50 14 C 76 14 76 48 50 48 L 28 48"],
  Q: [
    "M 50 14 C 28 14 20 30 20 46 C 20 62 28 78 50 78 C 72 78 80 62 80 46 C 80 30 72 14 50 14",
    "M 56 60 L 80 84",
  ],
  R: ["M 28 14 L 28 78", "M 28 14 L 50 14 C 76 14 76 48 50 48 L 28 48", "M 50 48 L 76 78"],
  S: [
    "M 74 26 C 70 16 60 14 50 14 C 34 14 26 24 28 34 C 30 46 44 46 52 48 C 66 50 76 56 74 66 C 72 76 62 78 50 78 C 38 78 28 74 24 62",
  ],
  T: ["M 20 14 L 80 14", "M 50 14 L 50 78"],
  U: ["M 24 14 L 24 56 C 24 72 34 78 50 78 C 66 78 76 72 76 56 L 76 14"],
  V: ["M 20 14 L 50 78 L 80 14"],
  W: ["M 14 14 L 32 78 L 50 30 L 68 78 L 86 14"],
  X: ["M 22 14 L 78 78", "M 78 14 L 22 78"],
  Y: ["M 22 14 L 50 46 L 78 14", "M 50 46 L 50 78"],
  Z: ["M 24 14 L 76 14 L 24 78 L 76 78"],
};

const LOWER = {
  a: [
    "M 68 44 C 62 38 56 38 50 38 C 34 38 26 48 26 58 C 26 68 34 78 50 78 C 58 78 64 74 68 70",
    "M 70 38 L 70 78",
  ],
  b: [
    "M 30 14 L 30 78",
    "M 30 52 C 36 42 44 38 52 38 C 68 38 76 48 76 58 C 76 68 68 78 52 78 C 44 78 36 74 30 64",
  ],
  c: ["M 72 46 C 66 40 58 38 52 38 C 34 38 26 48 26 58 C 26 68 34 78 52 78 C 60 78 68 74 72 68"],
  d: [
    "M 70 52 C 64 42 56 38 48 38 C 32 38 24 48 24 58 C 24 68 32 78 48 78 C 56 78 64 74 70 64",
    "M 70 14 L 70 78",
  ],
  e: ["M 26 58 L 74 58 C 74 44 64 38 50 38 C 34 38 26 48 26 58 C 26 68 34 78 50 78 C 60 78 68 74 74 68"],
  f: ["M 66 20 C 62 14 56 14 52 14 C 42 14 40 22 40 30 L 40 78", "M 26 40 L 62 40"],
  g: [
    "M 70 46 C 64 40 58 38 50 38 C 34 38 26 48 26 58 C 26 68 34 78 50 78 C 58 78 66 74 70 66",
    "M 70 38 L 70 88 C 70 98 62 100 50 100 C 42 100 34 98 30 92",
  ],
  h: ["M 28 14 L 28 78", "M 28 54 C 34 42 42 38 50 38 C 66 38 72 46 72 56 L 72 78"],
  i: ["M 50 38 L 50 78", "M 50 18 L 50 26"],
  j: ["M 54 38 L 54 90 C 54 98 46 100 38 100 C 34 100 30 99 28 96", "M 54 18 L 54 26"],
  k: ["M 28 14 L 28 78", "M 70 40 L 28 62", "M 44 54 L 72 78"],
  l: ["M 50 14 L 50 78"],
  m: [
    "M 22 38 L 22 78",
    "M 22 54 C 26 42 34 38 40 38 C 50 38 52 46 52 54 L 52 78",
    "M 52 54 C 56 42 64 38 70 38 C 80 38 82 46 82 54 L 82 78",
  ],
  n: ["M 28 38 L 28 78", "M 28 54 C 34 42 42 38 50 38 C 66 38 72 46 72 56 L 72 78"],
  o: ["M 50 38 C 34 38 26 48 26 58 C 26 68 34 78 50 78 C 66 78 74 68 74 58 C 74 48 66 38 50 38"],
  p: [
    "M 30 38 L 30 100",
    "M 30 52 C 36 42 44 38 52 38 C 68 38 76 48 76 58 C 76 68 68 78 52 78 C 44 78 36 74 30 64",
  ],
  q: [
    "M 70 52 C 64 42 58 38 50 38 C 34 38 26 48 26 58 C 26 68 34 78 50 78 C 58 78 64 74 70 64",
    "M 70 38 L 70 100",
  ],
  r: ["M 32 38 L 32 78", "M 32 56 C 36 44 44 38 54 38 C 60 38 64 40 66 42"],
  s: [
    "M 68 46 C 64 40 58 38 50 38 C 38 38 32 44 34 50 C 36 58 46 58 52 60 C 64 62 70 68 66 74 C 62 78 56 78 50 78 C 42 78 34 76 30 70",
  ],
  t: ["M 44 20 L 44 68 C 44 76 48 78 54 78 C 60 78 64 77 68 74", "M 28 40 L 62 40"],
  u: ["M 28 38 L 28 62 C 28 74 36 78 48 78 C 60 78 70 72 72 62", "M 72 38 L 72 78"],
  v: ["M 26 38 L 50 78 L 74 38"],
  w: ["M 16 38 L 32 78 L 50 48 L 68 78 L 84 38"],
  x: ["M 28 38 L 72 78", "M 72 38 L 28 78"],
  y: ["M 26 38 L 50 76", "M 74 38 L 42 100"],
  z: ["M 28 38 L 72 38 L 28 78 L 72 78"],
};

const DIGITS = {
  0: ["M 50 14 C 30 14 24 30 24 46 C 24 62 30 78 50 78 C 70 78 76 62 76 46 C 76 30 70 14 50 14"],
  1: ["M 34 30 L 52 14 L 52 78"],
  2: ["M 26 30 C 28 18 38 14 50 14 C 64 14 74 22 72 34 C 70 46 40 62 26 78 L 76 78"],
  3: [
    "M 28 22 C 34 14 42 14 50 14 C 64 14 72 22 70 32 C 68 42 58 46 46 46 C 60 46 74 50 74 62 C 74 74 62 78 50 78 C 40 78 30 74 26 66",
  ],
  4: ["M 62 14 L 24 58 L 80 58", "M 62 14 L 62 78"],
  5: [
    "M 70 14 L 32 14 L 28 44 C 34 40 42 38 50 38 C 66 38 74 48 74 58 C 74 70 64 78 50 78 C 40 78 32 74 26 66",
  ],
  6: [
    "M 66 18 C 56 12 42 14 36 26 C 28 40 24 56 28 66 C 32 76 40 78 50 78 C 64 78 74 70 74 58 C 74 46 64 40 50 40 C 38 40 30 46 26 56",
  ],
  7: ["M 24 14 L 76 14 L 42 78"],
  8: [
    "M 50 46 C 36 46 28 40 28 30 C 28 20 38 14 50 14 C 62 14 72 20 72 30 C 72 40 64 46 50 46 C 34 46 26 54 26 64 C 26 74 36 78 50 78 C 64 78 74 74 74 64 C 74 54 66 46 50 46",
  ],
  9: [
    "M 72 32 C 72 20 62 14 50 14 C 36 14 28 22 28 32 C 28 42 36 48 50 48 C 64 48 72 42 72 32 L 72 50 C 72 68 66 78 50 78 C 42 78 36 76 32 72",
  ],
};

/* ------------------------------ turning paths into points ------------------------------ */

const lerp = (a, b, t) => a + (b - a) * t;

// "M 10 10 L 20 20 C ..." -> a list of points along it, about one design unit apart.
const flatten = (path) => {
  const tokens = path.trim().split(/\s+/);
  const points = [];
  let i = 0;
  let current = null;

  const num = () => Number(tokens[i++]);

  while (i < tokens.length) {
    const cmd = tokens[i++];

    if (cmd === "M") {
      current = [num(), num()];
      points.push(current);
    } else if (cmd === "L") {
      const to = [num(), num()];
      const steps = Math.max(2, Math.ceil(Math.hypot(to[0] - current[0], to[1] - current[1])));

      for (let s = 1; s <= steps; s++) {
        points.push([lerp(current[0], to[0], s / steps), lerp(current[1], to[1], s / steps)]);
      }

      current = to;
    } else if (cmd === "Q" || cmd === "C") {
      const controls = cmd === "Q" ? [[num(), num()]] : [[num(), num()], [num(), num()]];
      const to = [num(), num()];
      const poly = [current, ...controls, to];
      const steps = 40;

      for (let s = 1; s <= steps; s++) {
        const t = s / steps;
        const u = 1 - t;
        let x;
        let y;

        if (cmd === "Q") {
          x = u * u * poly[0][0] + 2 * u * t * poly[1][0] + t * t * poly[2][0];
          y = u * u * poly[0][1] + 2 * u * t * poly[1][1] + t * t * poly[2][1];
        } else {
          x = u ** 3 * poly[0][0] + 3 * u * u * t * poly[1][0] + 3 * u * t * t * poly[2][0] + t ** 3 * poly[3][0];
          y = u ** 3 * poly[0][1] + 3 * u * u * t * poly[1][1] + 3 * u * t * t * poly[2][1] + t ** 3 * poly[3][1];
        }

        points.push([x, y]);
      }

      current = to;
    } else {
      throw new Error(`Unknown path command ${cmd}`);
    }
  }

  return points;
};

// Evenly spaced points (`step` apart) along a polyline, with the total length.
const resample = (points, step = 1) => {
  const out = [points[0]];
  let carried = 0;

  for (let k = 1; k < points.length; k++) {
    const [x0, y0] = points[k - 1];
    const [x1, y1] = points[k];
    const segment = Math.hypot(x1 - x0, y1 - y0);
    let at = step - carried;

    while (at <= segment) {
      out.push([lerp(x0, x1, at / segment), lerp(y0, y1, at / segment)]);
      at += step;
    }

    carried = segment - (at - step);
  }

  const last = points[points.length - 1];
  const tail = out[out.length - 1];

  if (Math.hypot(last[0] - tail[0], last[1] - tail[1]) > 0.01) out.push(last);

  return out;
};

const transform = (strokes, fn) => strokes.map((stroke) => stroke.map(fn));

const boundsOf = (strokes) => {
  const all = strokes.flat();
  const xs = all.map((p) => p[0]);
  const ys = all.map((p) => p[1]);

  return { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) };
};

// Grows a small letter (up to 1.35 times) and centres whatever it is in the box, so every shape fills
// the space the child traces in.
const fitToBox = (strokes) => {
  const { x0, x1, y0, y1 } = boundsOf(strokes);
  const scale = Math.min(1.35, 66 / Math.max(x1 - x0, y1 - y0));
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;

  return transform(strokes, ([x, y]) => [50 + (x - cx) * scale, 50 + (y - cy) * scale]);
};

const flattenAll = (paths) => paths.map((path) => resample(flatten(path)));

// How a number of one, two or three digits is laid out: each digit is squeezed sideways (and for
// three digits a little shorter) into its own part of the box, and the pen gets thinner.
const NUMBER_LAYOUT = {
  1: { centres: [50], squeeze: 1, height: 1, pen: 9 },
  2: { centres: [26, 74], squeeze: 0.56, height: 1, pen: 8 },
  3: { centres: [18, 50, 82], squeeze: 0.4, height: 0.86, pen: 6.5 },
};

/**
 * What to trace for a letter or a number.
 *   traceFor({ letter: "A", lower: false })   traceFor({ number: 37 })
 * Returns { strokes, pen, label }: `strokes` are lists of [x, y] points (1 unit apart, in a 100 x
 * 100 box) in the order they are written, `pen` is how thick to draw them and `label` is what to say.
 */
export const traceFor = (item) => {
  if (item.letter) {
    const key = item.lower ? item.letter.toLowerCase() : item.letter.toUpperCase();
    const paths = (item.lower ? LOWER : UPPER)[key];

    return { strokes: fitToBox(flattenAll(paths)), pen: 9, label: key };
  }

  const digits = String(item.number).split("");
  const layout = NUMBER_LAYOUT[digits.length];
  const strokes = [];

  digits.forEach((digit, index) => {
    const centre = layout.centres[index];
    const placed = transform(flattenAll(DIGITS[digit]), ([x, y]) => [
      centre + (x - 50) * layout.squeeze,
      46 + (y - 46) * layout.height,
    ]);

    strokes.push(...placed);
  });

  return { strokes, pen: layout.pen, label: String(item.number) };
};

export const LETTER_NAMES = Object.keys(UPPER);

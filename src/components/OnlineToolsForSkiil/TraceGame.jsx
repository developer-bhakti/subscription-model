import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { traceFor } from "../../data/traceGlyphs";

// One tracing board for the Cognitive Skill "Trace It" game. It shows a letter or a number as a faint
// shape with a big dot where the pen starts. The child presses on the dot and drags along the shape
// with a finger or the mouse; the path fills in behind them. A letter with several strokes (like A)
// shows the dot for the next stroke each time one is finished. When the last stroke is traced,
// `onComplete` is called once.
//
// Give it `letter` (and `lower` for a small letter) or `number`. To start the same shape again, change
// its `key`.

const SIZE = 480; // pixels the canvas is drawn at; CSS scales it to the screen
const UNIT = SIZE / 100; // one unit of the 100 x 100 design box in pixels

const COLOURS = {
  ghost: "#e3ebe5",
  traced: "#16a34a",
  dot: "#0f7a36",
  badge: "#9db8a6",
};

const START_RADIUS = 15; // how close to a start dot the child has to press (design units)
const REACH = 30; // how far along the path one move can carry the pen (design units)

const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);

export default function TraceGame({ letter, lower = false, number, onComplete }) {
  const canvasRef = useRef(null);
  const game = useRef({ stroke: 0, index: 0, tracing: false, done: false });
  const [finished, setFinished] = useState(false);

  const trace = useMemo(() => traceFor({ letter, lower, number }), [letter, lower, number]);
  const tolerance = Math.max(10, trace.pen * 1.4);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const { stroke, index, done } = game.current;
    const { strokes, pen } = trace;

    const line = (points, to) => {
      ctx.beginPath();
      points.slice(0, to).forEach((p, i) => (i ? ctx.lineTo(p[0] * UNIT, p[1] * UNIT) : ctx.moveTo(p[0] * UNIT, p[1] * UNIT)));
      ctx.stroke();
    };

    ctx.clearRect(0, 0, SIZE, SIZE);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = pen * UNIT;

    // the faint shape
    ctx.strokeStyle = COLOURS.ghost;
    strokes.forEach((points) => line(points, points.length));

    // what has been traced: whole strokes, then the part of the current one
    ctx.strokeStyle = COLOURS.traced;
    strokes.forEach((points, i) => {
      if (i < stroke || done) line(points, points.length);
      else if (i === stroke && index > 0) line(points, index + 1);
    });

    if (done) return;

    // numbers on the strokes still to come, so the order is clear
    if (strokes.length > 1) {
      strokes.forEach((points, i) => {
        if (i <= stroke) return;

        ctx.fillStyle = COLOURS.badge;
        ctx.beginPath();
        ctx.arc(points[0][0] * UNIT, points[0][1] * UNIT, pen * 0.62 * UNIT, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.font = `bold ${pen * 0.8 * UNIT}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(String(i + 1), points[0][0] * UNIT, points[0][1] * UNIT + 1);
      });
    }

    // the big dot: where the pen is now
    const here = strokes[stroke][index];

    ctx.fillStyle = COLOURS.dot;
    ctx.beginPath();
    ctx.arc(here[0] * UNIT, here[1] * UNIT, pen * 0.85 * UNIT, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(here[0] * UNIT, here[1] * UNIT, pen * 0.32 * UNIT, 0, Math.PI * 2);
    ctx.fill();
  }, [trace]);

  useEffect(() => {
    draw();
  }, [draw]);

  // Where a pointer event is, in the 100 x 100 design box.
  const position = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();

    return [((event.clientX - rect.left) / rect.width) * 100, ((event.clientY - rect.top) / rect.height) * 100];
  };

  const finishStroke = () => {
    const state = game.current;

    state.tracing = false;
    state.stroke += 1;
    state.index = 0;

    if (state.stroke >= trace.strokes.length) {
      state.done = true;
      setFinished(true);
      onComplete?.();
    }
  };

  // Moves the pen forward to the nearest point of the path the pointer is on, never backwards and never
  // by more than REACH, so crossing paths (the middle of an 8, the X) cannot be skipped.
  const follow = (at) => {
    const state = game.current;
    const points = trace.strokes[state.stroke];
    let best = -1;
    let bestDistance = tolerance;

    for (let j = state.index; j < Math.min(points.length, state.index + REACH); j++) {
      const d = dist(points[j], at);

      if (d <= bestDistance) {
        best = j;
        bestDistance = d;
      }
    }

    if (best > state.index) state.index = best;

    if (state.index >= points.length - 3) {
      state.index = points.length - 1;
      finishStroke();
    }

    draw();
  };

  const onPointerDown = (event) => {
    const state = game.current;

    if (state.done) return;

    const points = trace.strokes[state.stroke];
    const at = position(event);

    if (dist(points[state.index], at) > Math.max(START_RADIUS, tolerance)) return;

    // keep receiving moves if the finger slips off the board (if the browser will not, tracing still works)
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // nothing to do
    }

    state.tracing = true;

    // a dot (the dot on i or j) is finished by pressing it
    if (points.length < 14) {
      state.index = points.length - 1;
      finishStroke();
      draw();

      return;
    }

    follow(at);
  };

  const onPointerMove = (event) => {
    const state = game.current;

    if (!state.tracing || state.done) return;

    follow(position(event));
  };

  const onPointerUp = () => {
    game.current.tracing = false;
  };

  return (
    <canvas
      ref={canvasRef}
      width={SIZE}
      height={SIZE}
      role="img"
      aria-label={`Tracing board for ${trace.label}. Press the big dot and follow the shape with your finger or the mouse.${
        finished ? " Finished." : ""
      }`}
      className="aspect-square w-full cursor-pointer touch-none select-none rounded-2xl bg-[#fffdf5]"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    />
  );
}

"use client";

import { useState } from "react";

/** Lėta paslaugų juosta (CSS animacija). Sustoja užvedus pelę, turi pauzės mygtuką, gerbia „mažiau judesio“. */
export function Marquee({ items }: { items: string[] }) {
  const [paused, setPaused] = useState(false);
  const row = [...items, ...items];

  return (
    <div className="group/mq relative overflow-hidden border-y border-red-deep bg-red py-4 text-white">
      <div
        className="marquee-track flex w-max gap-10 whitespace-nowrap pr-10 group-hover/mq:[animation-play-state:paused]"
        style={paused ? { animationPlayState: "paused" } : undefined}
      >
        {row.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-display text-2xl font-extrabold uppercase [font-stretch:115%] md:text-3xl"
            aria-hidden={i >= items.length}
          >
            {t}
            <svg viewBox="0 0 32 32" className="h-4 w-4 fill-ink" aria-hidden>
              <path d="M16 2 28.1 9v14L16 30 3.9 23V9z" />
            </svg>
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center bg-red-deep text-white"
        aria-label={paused ? "Paleisti juostą" : "Sustabdyti juostą"}
      >
        {paused ? (
          <svg viewBox="0 0 12 12" className="h-3 w-3 fill-current" aria-hidden>
            <path d="M3 1.5v9l7-4.5z" />
          </svg>
        ) : (
          <svg viewBox="0 0 12 12" className="h-3 w-3 fill-current" aria-hidden>
            <path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" />
          </svg>
        )}
      </button>
    </div>
  );
}

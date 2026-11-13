"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PinIcon } from "./icons";

const KEY = "maps-allowed";
const EVENT = "maps-allowed";

/**
 * Google žemėlapis įkeliamas tik lankytojui paspaudus – iki tol jokios užklausos į Google
 * ir jokių trečiųjų šalių slapukų. Sutikimas galioja visiems žemėlapiams iki naršyklės lango uždarymo.
 */
export function MapEmbed({ query, title }: { query: string; title: string }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY) === "1") setAllowed(true);
    } catch {}
    const on = () => setAllowed(true);
    window.addEventListener(EVENT, on);
    return () => window.removeEventListener(EVENT, on);
  }, []);

  const allow = () => {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    window.dispatchEvent(new Event(EVENT));
  };

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-steel md:aspect-[16/10]">
      {allowed ? (
        <iframe
          title={title}
          src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`}
          className="absolute inset-0 h-full w-full grayscale-[0.85] invert-[0.92] hue-rotate-180 contrast-[0.9]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center p-5 text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(var(--color-paper)_1px,transparent_1px),linear-gradient(90deg,var(--color-paper)_1px,transparent_1px)] [background-size:32px_32px]"
          />
          <div className="relative flex max-w-xs flex-col items-center gap-3">
            <PinIcon className="h-6 w-6 text-red" />
            <button
              type="button"
              onClick={allow}
              className="border border-line bg-ink px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-red hover:bg-red"
            >
              Rodyti žemėlapį
            </button>
            <p className="text-xs leading-relaxed text-white/60">
              Žemėlapį teikia „Google“. Jį įkėlus „Google“ gali naudoti slapukus.{" "}
              <Link href="/privatumo-politika" className="underline underline-offset-2 hover:text-white">
                Daugiau
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

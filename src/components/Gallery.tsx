"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import type { Photo } from "@/content/photos";
import { PhotoFrame } from "./PhotoFrame";

const layout = [
  "md:col-span-7 md:row-span-2",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-6",
  "md:col-span-6",
];

/** Galerija su peržiūros langu (klaviatūra: ← → Esc). */
export function Gallery({ items }: { items: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  return (
    <>
      <ul className="grid auto-rows-[220px] grid-cols-2 gap-2 md:auto-rows-[260px] md:grid-cols-12 md:gap-3">
        {items.map((p, i) => (
          <li key={p.src} className={`${layout[i % layout.length]} ${i === 0 ? "col-span-2" : ""}`}>
            <button type="button" onClick={() => setOpen(i)} className="group block h-full w-full" aria-label={`Didinti: ${p.alt}`}>
              <PhotoFrame photo={p} className="h-full w-full" sizes="(min-width:768px) 50vw, 50vw" />
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={items[open].alt}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              key={open}
              className="relative h-[70vh] w-full max-w-5xl"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={`${items[open].src}?auto=format&fit=max&w=2000&q=80`} alt={items[open].alt} fill sizes="100vw" className="object-contain" />
            </motion.div>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-sm text-white/70">
              {items[open].alt} · <span className="font-mono text-xs uppercase">Iliustracija</span> · {open + 1}/{items.length}
            </p>
            <button type="button" onClick={close} className="absolute right-4 top-4 grid h-11 w-11 place-items-center border border-line text-xl" aria-label="Uždaryti">
              ×
            </button>
            {["prev", "next"].map((d) => (
              <button
                key={d}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(d === "next" ? 1 : -1);
                }}
                className={`absolute top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center border border-line bg-ink/60 text-xl hover:border-red ${d === "next" ? "right-4" : "left-4"}`}
                aria-label={d === "next" ? "Kita nuotrauka" : "Ankstesnė nuotrauka"}
              >
                {d === "next" ? "→" : "←"}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

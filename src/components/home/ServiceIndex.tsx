"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";
import { services } from "@/content/services";
import { ArrowIcon } from "../icons";

/**
 * Paslaugų indeksas. Kompiuteryje užvedus pelę šalia žymeklio „seka“ paslaugos nuotrauka,
 * telefone rodomos paprastos, lengvai paspaudžiamos eilutės.
 */
export function ServiceIndex() {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onPointerLeave={() => setActive(null)}
    >
      <ul className="border-t border-line">
        {services.map((s, i) => (
          <li key={s.slug} className="border-b border-line">
            <Link
              href={`/paslaugos#${s.slug}`}
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5 md:grid-cols-[4rem_1fr_1fr_auto] md:gap-8 md:py-7"
            >
              <span className="font-mono text-xs text-mute transition-colors group-hover:text-red">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-xl font-bold uppercase leading-tight tracking-tight transition-transform duration-300 ease-out-quart [font-stretch:110%] group-hover:translate-x-2 md:text-4xl">
                {s.title}
              </span>
              <span className="hidden text-sm leading-relaxed text-white/55 md:block">{s.short}</span>
              <span className="grid h-10 w-10 place-items-center border border-line transition-colors group-hover:border-red group-hover:bg-red">
                <ArrowIcon className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block"
        style={{ x: sx, y: sy }}
      >
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key="preview"
              className="relative -translate-x-1/2 -translate-y-1/2 overflow-hidden"
              initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              style={{ width: 300, height: 200 }}
            >
              {services.map((s, i) => (
                <Image
                  key={s.slug}
                  src={`${s.photo.src}?auto=format&fit=crop&w=600&q=70`}
                  alt=""
                  fill
                  sizes="300px"
                  className={`object-cover transition-opacity duration-300 ${active === i ? "opacity-100" : "opacity-0"}`}
                />
              ))}
              <span className="absolute bottom-1.5 right-1.5 bg-ink/75 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white/75">
                Iliustracija
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

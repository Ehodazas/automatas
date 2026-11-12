"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";

const steps = [
  { t: "Registracija", d: "Užpildote formą arba paskambinate. Susitariame dėl laiko." },
  { t: "Diagnostika", d: "Nustatome gedimo priežastį ir parodome, ką radome." },
  { t: "Suderinimas", d: "Prieš darbus suderiname darbų apimtį ir detales." },
  { t: "Remontas", d: "Atliekame darbus, naudojame naujas atsargines dalis." },
  { t: "Atsiėmimas", d: "Paaiškiname, kas padaryta, ir grąžiname automobilį." },
];

/**
 * Darbo eiga. Raudona linija „užsipildo“ kartu su slinkimu (be ekrano užrakinimo),
 * o žingsniai įsijungia, kai pasirodo ekrane. Su „mažiau judesio“ nustatymu viskas matoma iškart.
 */
export function ProcessTrack() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 45%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <ol ref={ref} className="relative grid gap-10 pl-8 lg:grid-cols-5 lg:gap-6 lg:pl-0 lg:pt-10">
      {/* Telefonas: vertikali linija */}
      <span aria-hidden className="absolute bottom-0 left-[5px] top-0 w-px bg-line lg:hidden" />
      <motion.span aria-hidden style={{ scaleY: progress }} className="absolute bottom-0 left-[5px] top-0 w-px origin-top bg-red lg:hidden" />
      {/* Kompiuteris: horizontali linija */}
      <span aria-hidden className="absolute inset-x-0 top-[5px] hidden h-px bg-line lg:block" />
      <motion.span aria-hidden style={{ scaleX: progress }} className="absolute inset-x-0 top-[5px] hidden h-px origin-left bg-red lg:block" />

      {steps.map((s, i) => (
        <motion.li
          key={s.t}
          className="relative"
          initial={{ opacity: 0.3 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "0px 0px -30% 0px" }}
          transition={{ duration: 0.4 }}
        >
          <motion.span
            className="absolute -left-8 top-1.5 h-[11px] w-[11px] bg-red lg:-top-10 lg:left-0"
            initial={{ scale: 0.4 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false, margin: "0px 0px -30% 0px" }}
            transition={{ type: "spring", stiffness: 500, damping: 18 }}
          />
          <p className="font-mono text-xs font-semibold tabular-nums text-red">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight [font-stretch:110%] lg:text-xl xl:text-2xl">{s.t}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/70">{s.d}</p>
        </motion.li>
      ))}
    </ol>
  );
}

"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const steps = [
  { t: "Registracija", d: "Užpildote formą arba paskambinate. Susitariame dėl laiko." },
  { t: "Diagnostika", d: "Nustatome gedimo priežastį ir parodome, ką radome." },
  { t: "Suderinimas", d: "Prieš darbus suderiname darbų apimtį ir detales." },
  { t: "Remontas", d: "Atliekame darbus, naudojame naujas atsargines dalis." },
  { t: "Atsiėmimas", d: "Paaiškiname, kas padaryta, ir grąžiname automobilį." },
];

/**
 * Darbo eiga. GSAP ScrollTrigger sieja raudonos linijos „užsipildymą“ su slinkimu
 * (scrub, be ekrano užrakinimo), o žingsniai įsijungia, kai linija juos pasiekia.
 */
export function ProcessTrack() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
        gsap.fromTo(
          ".js-track-fill",
          isDesktop ? { scaleX: 0 } : { scaleY: 0 },
          {
            ...(isDesktop ? { scaleX: 1 } : { scaleY: 1 }),
            ease: "none",
            scrollTrigger: { trigger: ".js-track", start: "top 75%", end: "bottom 45%", scrub: 0.6 },
          },
        );
        gsap.utils.toArray<HTMLElement>(".js-step").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0.25 },
            {
              opacity: 1,
              duration: 0.4,
              scrollTrigger: { trigger: el, start: isDesktop ? "top 65%" : "top 70%", toggleActions: "play none none reverse" },
            },
          );
          gsap.fromTo(
            el.querySelector(".js-dot"),
            { scale: 0.4, backgroundColor: "#33383f" },
            {
              scale: 1,
              backgroundColor: "#e3261c",
              duration: 0.35,
              ease: "back.out(3)",
              scrollTrigger: { trigger: el, start: isDesktop ? "top 65%" : "top 70%", toggleActions: "play none none reverse" },
            },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <ol className="js-track relative grid gap-10 pl-8 lg:grid-cols-5 lg:gap-6 lg:pl-0 lg:pt-10">
        <span aria-hidden className="absolute bottom-0 left-[5px] top-0 w-px bg-line lg:inset-x-0 lg:bottom-auto lg:left-0 lg:top-[5px] lg:h-px lg:w-auto" />
        <span
          aria-hidden
          className="js-track-fill absolute bottom-0 left-[5px] top-0 w-px origin-top bg-red lg:inset-x-0 lg:bottom-auto lg:left-0 lg:top-[5px] lg:h-px lg:w-auto lg:origin-left"
        />
        {steps.map((s, i) => (
          <li key={s.t} className="js-step relative">
            <span className="js-dot absolute -left-8 top-1.5 h-[11px] w-[11px] bg-red lg:-top-10 lg:left-0" />
            <p className="font-mono text-xs text-red">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-2 font-display text-2xl lg:text-xl xl:text-2xl font-bold uppercase tracking-tight [font-stretch:110%]">{s.t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">{s.d}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

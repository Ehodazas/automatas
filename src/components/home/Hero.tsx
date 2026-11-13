"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { site } from "@/config/site";
import { photos } from "@/content/photos";
import { PhotoFrame } from "../PhotoFrame";
import { ArrowIcon, PhoneIcon } from "../icons";

const ease = [0.25, 1, 0.5, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const s = site.locations.service;

  const lines = ["Autoservisas", site.city.locative];

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <motion.div style={{ y: imgY }} className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease }}
        >
          <PhotoFrame photo={photos.hero} priority sizes="100vw" className="h-full w-full" zoom={false} showBadge={false} />
        </motion.div>
      </motion.div>
      <span className="absolute right-4 top-[104px] z-10 bg-ink/70 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/70 md:right-8">
        Iliustracija
      </span>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/20" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-ink/60" />

      <div className="container-x flex flex-1 flex-col justify-end pb-10 pt-36 md:pb-16">
        <motion.p
          className="eyebrow flex items-center gap-3 text-white/70"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
        >
          <span className="h-px w-8 bg-red" />
          Remontas · Diagnostika · Autodalys
        </motion.p>

        <h1 className="mt-6 font-display text-[clamp(1.1rem,8.3vw,8.6rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.02em] [font-stretch:118%]">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.04em] pt-[0.12em]">
              <motion.span
                className={`block ${i === 1 ? "text-red" : ""}`}
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.12 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-end">
          <motion.p
            className="max-w-xl text-lg leading-relaxed text-white/75 md:col-span-6"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.5 }}
          >
            {site.tagline}.
          </motion.p>

          <motion.div
            className="flex flex-col gap-3 sm:flex-row md:col-span-6 md:justify-end"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.62 }}
          >
            <Link
              href="/kontaktai#registracija"
              className="group inline-flex h-14 items-center whitespace-nowrap justify-center gap-3 bg-red px-7 font-semibold text-white transition-[background-color,transform] hover:bg-red-deep active:scale-[0.98]"
            >
              Registruotis remontui
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={`tel:${s.phoneHref}`}
              className="inline-flex h-14 items-center justify-center gap-3 whitespace-nowrap border border-white/30 px-7 font-semibold backdrop-blur-sm transition-colors hover:border-white hover:bg-white/5"
            >
              <PhoneIcon className="h-4 w-4 text-red" />
              {s.phone}
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="border-t border-white/10 bg-ink/60 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <dl className="container-x grid grid-cols-2 divide-white/10 md:grid-cols-4 md:divide-x">
          {[
            ["01", "Diagnostika", "Kompiuterinė, važiuoklės"],
            ["02", "Remontas", "Variklis, stabdžiai, elektra"],
            ["03", "Priežiūra", "Alyva, filtrai, padangos"],
            ["04", "Autodalys", site.locations.shop ? "Atskira parduotuvė" : "Pagal užklausą"],
          ].map(([n, t, d]) => (
            <div key={n} className="py-4 md:px-6 md:first:pl-0">
              <dt className="flex items-baseline gap-2 text-sm font-semibold">
                <span className="font-mono text-[11px] text-red">{n}</span>
                {t}
              </dt>
              <dd className="mt-0.5 text-xs text-white/70">{d}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  );
}

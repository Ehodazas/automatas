"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { nav, site } from "@/config/site";
import { Logo } from "./Logo";
import { PhoneIcon } from "./icons";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const service = site.locations.service;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || open ? "border-b border-line/70 bg-ink/92 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      {site.isDemo && (
        <div className="bg-red text-center text-[11px] font-medium leading-6 tracking-wide text-white">
          Neoficiali demonstracinė svetainė
        </div>
      )}
      <div className="container-x flex h-16 items-center justify-between gap-3 sm:gap-6">
        <Logo />

        <nav aria-label="Pagrindinė navigacija" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative block whitespace-nowrap px-3 py-2 text-sm transition-colors ${
                      active ? "text-white" : "text-white/65 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-0.5 h-[2px] bg-red"
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <a
            href={`tel:${service.phoneHref}`}
            className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            <PhoneIcon className="h-4 w-4 text-red" />
            {service.phone}
          </a>
          <Link
            href="/kontaktai#registracija"
            className="whitespace-nowrap bg-red px-4 py-2.5 text-sm font-semibold text-white transition-[background-color,transform] hover:bg-red-deep active:scale-[0.98]"
          >
            Registruotis
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative -mr-2 grid h-11 w-11 shrink-0 place-items-center xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Uždaryti meniu" : "Atidaryti meniu"}
        >
          <span className="relative block h-3 w-6">
            <motion.span
              className="absolute left-0 top-0 block h-[2px] w-6 bg-white"
              animate={open ? { y: 5, rotate: 45 } : { y: 0, rotate: 0 }}
            />
            <motion.span
              className="absolute bottom-0 left-0 block h-[2px] w-6 bg-white"
              animate={open ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }}
            />
          </span>
        </button>
      </div>
    </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className={`fixed inset-x-0 bottom-0 z-50 overflow-y-auto bg-ink xl:hidden ${site.isDemo ? "top-[88px]" : "top-16"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav aria-label="Mobilioji navigacija" className="container-x flex min-h-full flex-col py-6">
              <ul className="border-t border-line">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                    className="border-b border-line"
                  >
                    <Link
                      href={item.href}
                      className="flex items-center justify-between py-4 font-display text-2xl font-bold uppercase [font-stretch:110%]"
                    >
                      {item.label}
                      <span className="font-mono text-xs text-mute">0{i + 1}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto grid gap-3 pt-8">
                <a
                  href={`tel:${service.phoneHref}`}
                  className="flex h-12 items-center justify-center gap-2 border border-line font-semibold"
                >
                  <PhoneIcon className="h-4 w-4 text-red" /> Skambinti į servisą
                </a>
                <Link
                  href="/kontaktai#registracija"
                  className="flex h-12 items-center justify-center bg-red font-semibold text-white"
                >
                  Registruotis remontui
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

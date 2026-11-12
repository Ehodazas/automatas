import { automatas } from "./brands/automatas";
import { autodaliuPasaulis } from "./brands/autodaliu-pasaulis";
import type { SiteConfig } from "./types";

/** Visi registruoti klientai. Naują servisą pridėkite čia. */
const brands: Record<string, SiteConfig> = {
  [automatas.id]: automatas,
  [autodaliuPasaulis.id]: autodaliuPasaulis,
};

/** Aktyvus klientas parenkamas aplinkos kintamuoju NEXT_PUBLIC_SITE (numatytasis – „automatas“). */
const activeId = process.env.NEXT_PUBLIC_SITE || automatas.id;
const brand = brands[activeId] ?? automatas;

/**
 * Tikrasis svetainės adresas (pvz. https://ehodazas.github.io/automatas).
 * Paskelbimo metu nustatomas NEXT_PUBLIC_SITE_URL, kitaip naudojamas konfigūracijos domenas.
 */
const domain = (process.env.NEXT_PUBLIC_SITE_URL || brand.domain).replace(/\/+$/, "");

export const site: SiteConfig = { ...brand, domain };

/** Absoliuti nuoroda į svetainės puslapį (sitemap, struktūriniai duomenys). */
export function absoluteUrl(path = "/") {
  return `${site.domain}${path === "/" ? "/" : `${path.replace(/\/?$/, "/")}`}`;
}

export const nav = [
  { href: "/", label: "Pagrindinis" },
  { href: "/paslaugos", label: "Paslaugos" },
  { href: "/autodaliu-parduotuve", label: "Autodalių parduotuvė" },
  { href: "/apie-mus", label: "Apie mus" },
  { href: "/kontaktai", label: "Kontaktai" },
] as const;

export type { SiteConfig } from "./types";

import { automatas } from "./brands/automatas";
import { autodaliuPasaulis } from "./brands/autodaliu-pasaulis";
import type { SiteConfig } from "./types";

/** Visi registruoti klientai. Naują servisą pridėkite čia. */
const brands: Record<string, SiteConfig> = {
  [automatas.id]: automatas,
  [autodaliuPasaulis.id]: autodaliuPasaulis,
};

/** Aktyvus klientas parenkamas aplinkos kintamuoju NEXT_PUBLIC_SITE (numatytasis – „automatas“). */
const activeId = process.env.NEXT_PUBLIC_SITE ?? automatas.id;

export const site: SiteConfig = brands[activeId] ?? automatas;

export const nav = [
  { href: "/", label: "Pagrindinis" },
  { href: "/paslaugos", label: "Paslaugos" },
  { href: "/autodaliu-parduotuve", label: "Autodalių parduotuvė" },
  { href: "/apie-mus", label: "Apie mus" },
  { href: "/kontaktai", label: "Kontaktai" },
] as const;

export type { SiteConfig } from "./types";

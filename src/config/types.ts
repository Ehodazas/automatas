/**
 * Vieno autoserviso (kliento) konfigūracija.
 * Norint pritaikyti svetainę kitam servisui (Telšiuose, Šiauliuose ir t. t.),
 * užtenka sukurti naują failą `src/config/brands/<id>.ts` ir užregistruoti jį `src/config/site.ts`.
 */

export type Location = {
  id: "service" | "shop";
  /** Trumpas pavadinimas, pvz. „Autoservisas“ */
  label: string;
  address: string;
  city: string;
  /** Užklausa Google Maps įterpimui */
  mapQuery: string;
  phone: string;
  /** Tel. numeris be tarpų – `tel:` nuorodai */
  phoneHref: string;
  email?: string;
  /** Patvirtintos darbo valandos. Jei nėra – rodomas prašymas pasitikslinti telefonu. */
  hours?: { days: string; time: string }[];
  /** Pažymi, kad adresas / telefonas yra demonstraciniai, ne tikri. */
  isPlaceholder?: boolean;
};

export type PriceItem = { name: string; price: string; note?: string };
export type PriceGroup = { id: string; title: string; items: PriceItem[] };

/** Formų siuntimo paslauga (veikia be savo serverio). */
export type FormProvider =
  | { type: "web3forms"; accessKey: string }
  | { type: "formspree"; formId: string };

export type SiteConfig = {
  id: string;
  /** Prekės ženklas, rodomas logotipe */
  brand: string;
  /** Teisinis pavadinimas, pvz. UAB „…“ */
  legalName: string;
  companyCode?: string;
  foundedYear?: number;
  domain: string;
  email: string;
  /** Miestas vardininku ir vietininku (SEO frazėms: „autoservisas Plungėje“) */
  city: { name: string; locative: string; region: string };
  locations: { service: Location; shop?: Location };
  /** Trumpas aprašymas antraštei ir SEO */
  tagline: string;
  description: string;
  /** Istorijos pastraipos „Apie mus“ puslapiui. Tik patvirtinti faktai. */
  story: string[];
  /** Kainoraštis. `null` – kainos nerodomos (pvz. kol klientas jų nepatvirtino). */
  prices: PriceGroup[] | null;
  /** Ar kainos yra pavyzdinės (rodomas įspėjimas) */
  pricesAreExample?: boolean;
  /**
   * Formų siuntimo paslauga. Kol `null`, formos NIEKUR nesiunčia duomenų
   * ir aiškiai praneša, kad tai demonstracinė versija.
   */
  forms: FormProvider | null;
  /** Ar tai demonstracinė (neoficiali) svetainė */
  isDemo: boolean;
  /** Papildomi SEO raktažodžiai */
  keywords: string[];
};

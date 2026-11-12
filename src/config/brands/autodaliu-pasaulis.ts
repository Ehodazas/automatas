import type { SiteConfig } from "../types";

/**
 * UAB „Autodalių pasaulis“ – neoficiali demonstracinė versija.
 * Pagal užduoties sąlygas: jokių išgalvotų kainų, darbo valandų, atsiliepimų ar pasiekimų.
 * Formos neįjungtos, kol nėra įmonės sutikimo ir tikro siuntimo sprendimo.
 */
export const autodaliuPasaulis: SiteConfig = {
  id: "autodaliu-pasaulis",
  brand: "Autodalių pasaulis",
  legalName: "UAB „Autodalių pasaulis“",
  companyCode: "171765669",
  foundedYear: 2003,
  domain: "https://autodaliupasaulis.example",
  email: "autodaliupasaulis@gmail.com",
  city: { name: "Plungė", locative: "Plungėje", region: "Telšių apskritis" },
  locations: {
    service: {
      id: "service",
      label: "Autoservisas",
      address: "Dariaus ir Girėno g. 57A, Plungė",
      city: "Plungė",
      mapQuery: "Dariaus ir Girėno g. 57A, Plungė",
      phone: "+370 615 29206",
      phoneHref: "+37061529206",
    },
    shop: {
      id: "shop",
      label: "Autodalių parduotuvė",
      address: "V. Mačernio g. 21-1, Plungė",
      city: "Plungė",
      mapQuery: "V. Mačernio g. 21, Plungė",
      phone: "+370 615 28985",
      phoneHref: "+37061528985",
    },
  },
  tagline: "Lengvųjų automobilių ir mikroautobusų remontas, priežiūra, diagnostika ir naujos autodalys",
  description:
    "UAB „Autodalių pasaulis“ – autoservisas ir autodalių parduotuvė Plungėje. Lengvųjų automobilių ir mikroautobusų remontas, techninė priežiūra, diagnostika bei prekyba naujomis atsarginėmis dalimis.",
  story: [
    "UAB „Autodalių pasaulis“ veiklą pradėjo 2003 metais Plungėje.",
    "Įmonė remontuoja ir prižiūri lengvuosius automobilius bei mikroautobusus, atlieka diagnostiką ir prekiauja naujomis automobilių atsarginėmis dalimis. Autoservisas ir parduotuvė veikia skirtingais adresais.",
  ],
  prices: null,
  formEndpoint: null,
  isDemo: true,
  keywords: ["Autodalių pasaulis", "autodalių pasaulis Plungė"],
};

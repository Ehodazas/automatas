import type { SiteConfig } from "../types";

/**
 * „Automatas“ – išgalvotas demonstracinis autoservisas.
 * Kontaktai ir kainos yra pavyzdiniai ir skirti tik dizainui parodyti.
 */
export const automatas: SiteConfig = {
  id: "automatas",
  brand: "Automatas",
  legalName: "Automatas (demonstracinis projektas)",
  domain: "https://automatas.example",
  email: "info@automatas.example",
  city: { name: "Plungė", locative: "Plungėje", region: "Telšių apskritis" },
  locations: {
    service: {
      id: "service",
      label: "Autoservisas",
      address: "Demonstracinis adresas, Plungė",
      city: "Plungė",
      mapQuery: "Plungė, Lietuva",
      phone: "+370 600 00000",
      phoneHref: "+37060000000",
      email: "servisas@automatas.example",
      isPlaceholder: true,
    },
    shop: {
      id: "shop",
      label: "Autodalių parduotuvė",
      address: "Demonstracinis adresas, Plungė",
      city: "Plungė",
      mapQuery: "Plungė, Lietuva",
      phone: "+370 600 00001",
      phoneHref: "+37060000001",
      email: "dalys@automatas.example",
      isPlaceholder: true,
    },
  },
  tagline: "Lengvųjų automobilių ir mikroautobusų remontas, diagnostika ir autodalys",
  description:
    "Automatas – demonstracinis autoservisas Plungėje: kompiuterinė diagnostika, variklių ir važiuoklės remontas, stabdžiai, autoelektrika, kondicionieriai, padangos ir autodalių parduotuvė.",
  story: [
    "„Automatas“ – išgalvotas prekės ženklas, sukurtas parodyti, kaip galėtų atrodyti šiuolaikiška autoserviso svetainė.",
    "Struktūra paruošta realiam servisui: vienoje vietoje – remontas, techninė priežiūra, diagnostika ir naujų autodalių parduotuvė, su aiškiai atskirtais kontaktais.",
  ],
  pricesAreExample: true,
  prices: [
    {
      id: "diagnostika",
      title: "Diagnostika",
      items: [
        { name: "Kompiuterinė diagnostika", price: "nuo 25 €" },
        { name: "Važiuoklės patikra", price: "nuo 15 €" },
        { name: "Patikra prieš pirkimą", price: "nuo 45 €", note: "kėbulas, variklis, važiuoklė, klaidų kodai" },
        { name: "Akumuliatoriaus ir krovimo sistemos testas", price: "nuo 10 €" },
      ],
    },
    {
      id: "prieziura",
      title: "Techninė priežiūra",
      items: [
        { name: "Variklio alyvos ir filtro keitimas", price: "nuo 20 €", note: "be medžiagų" },
        { name: "Oro / salono filtro keitimas", price: "nuo 8 €" },
        { name: "Paskirstymo diržo komplekto keitimas", price: "nuo 150 €" },
        { name: "Pasiruošimas techninei apžiūrai", price: "nuo 30 €" },
      ],
    },
    {
      id: "stabdziai",
      title: "Stabdžiai ir važiuoklė",
      items: [
        { name: "Stabdžių kaladėlių keitimas (ašiai)", price: "nuo 30 €" },
        { name: "Stabdžių diskų ir kaladėlių keitimas (ašiai)", price: "nuo 55 €" },
        { name: "Stabdžių skysčio keitimas", price: "nuo 30 €" },
        { name: "Amortizatoriaus keitimas (vnt.)", price: "nuo 40 €" },
        { name: "Ratų suvedimo reguliavimas", price: "nuo 35 €" },
      ],
    },
    {
      id: "padangos",
      title: "Padangos",
      items: [
        { name: "Padangų montavimas ir balansavimas (R13–R16)", price: "nuo 32 €", note: "4 ratai" },
        { name: "Padangų montavimas ir balansavimas (R17–R19)", price: "nuo 44 €", note: "4 ratai" },
        { name: "Padangos remontas", price: "nuo 12 €" },
      ],
    },
    {
      id: "klimatas",
      title: "Kondicionieriai ir elektra",
      items: [
        { name: "Kondicionieriaus patikra ir pildymas", price: "nuo 45 €" },
        { name: "Kondicionieriaus sistemos dezinfekcija", price: "nuo 20 €" },
        { name: "Autoelektros gedimų paieška (val.)", price: "nuo 35 €" },
        { name: "Starterio / generatoriaus keitimas", price: "nuo 45 €" },
      ],
    },
  ],
  formEndpoint: null,
  isDemo: true,
  keywords: ["automatas autoservisas"],
};

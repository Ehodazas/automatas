import { photos, type Photo } from "./photos";

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  includes: string[];
  photo: Photo;
  /** Susieta kainoraščio grupė (jei yra) */
  priceGroup?: string;
};

/** Bendras paslaugų sąrašas – tinka bet kuriam lengvųjų automobilių servisui. */
export const services: Service[] = [
  {
    slug: "diagnostika",
    title: "Automobilių diagnostika",
    short: "Klaidų kodai, jutiklių duomenys ir gedimo priežastis – prieš keičiant detales.",
    description:
      "Kompiuterinė diagnostika padeda rasti gedimo priežastį, o ne spėlioti. Nuskaitomi klaidų kodai, tikrinami jutiklių parametrai realiu laiku, o rezultatai paaiškinami suprantamai.",
    includes: ["Klaidų kodų nuskaitymas ir trynimas", "Jutiklių parametrų analizė", "Patikra prieš perkant automobilį"],
    photo: photos.diagnostics,
    priceGroup: "diagnostika",
  },
  {
    slug: "varikliai",
    title: "Variklių remontas",
    short: "Nuo paskirstymo diržo iki sudėtingesnio variklio remonto.",
    description:
      "Benzininių ir dyzelinių variklių techninė priežiūra ir remontas: paskirstymo mechanizmai, sandarikliai, aušinimo sistema, įpurškimas, turbokompresoriaus patikra.",
    includes: ["Paskirstymo diržo / grandinės keitimas", "Aušinimo sistemos remontas", "Alyvos ir filtrų keitimas"],
    photo: photos.engine,
    priceGroup: "prieziura",
  },
  {
    slug: "vaziuokle",
    title: "Važiuoklė",
    short: "Amortizatoriai, svirtys, guoliai ir vairo mechanizmas.",
    description:
      "Važiuoklės patikra ir remontas – kad automobilis važiuotų tiesiai, tyliai ir saugiai. Keičiamos susidėvėjusios detalės, reguliuojamas ratų suvedimas.",
    includes: ["Amortizatorių ir spyruoklių keitimas", "Svirčių, šarnyrų, guolių keitimas", "Ratų suvedimas"],
    photo: photos.lift,
    priceGroup: "stabdziai",
  },
  {
    slug: "stabdziai",
    title: "Stabdžiai",
    short: "Kaladėlės, diskai, suportai ir stabdžių skystis.",
    description:
      "Stabdžių sistemos patikra ir remontas. Keičiamos kaladėlės ir diskai, aptarnaujami suportai, keičiamas stabdžių skystis.",
    includes: ["Kaladėlių ir diskų keitimas", "Suportų aptarnavimas", "Stabdžių skysčio keitimas"],
    photo: photos.brakes,
    priceGroup: "stabdziai",
  },
  {
    slug: "autoelektrika",
    title: "Autoelektrika",
    short: "Starteriai, generatoriai, apšvietimas ir elektros gedimai.",
    description:
      "Elektros grandinių gedimų paieška ir remontas: akumuliatoriaus ir krovimo sistemos patikra, starteriai, generatoriai, apšvietimas, laidai ir jungtys.",
    includes: ["Akumuliatoriaus ir krovimo testas", "Starterio / generatoriaus keitimas", "Laidų ir jungčių remontas"],
    photo: photos.electrics,
    priceGroup: "klimatas",
  },
  {
    slug: "kondicionieriai",
    title: "Kondicionieriai",
    short: "Patikra, pildymas, sandarumo kontrolė ir dezinfekcija.",
    description:
      "Kondicionavimo sistemos patikra ir pildymas, sandarumo kontrolė, salono filtro keitimas ir sistemos dezinfekcija.",
    includes: ["Sistemos pildymas", "Sandarumo patikra", "Dezinfekcija ir salono filtras"],
    photo: photos.climate,
    priceGroup: "klimatas",
  },
  {
    slug: "padangos",
    title: "Padangos",
    short: "Montavimas, balansavimas ir remontas.",
    description:
      "Sezoninis padangų keitimas, montavimas, balansavimas ir remontas lengviesiems automobiliams bei mikroautobusams.",
    includes: ["Montavimas ir balansavimas", "Padangų remontas", "Slėgio patikra"],
    photo: photos.tire,
    priceGroup: "padangos",
  },
  {
    slug: "techapziura",
    title: "Techninės apžiūros paruošimas",
    short: "Patikriname ir sutvarkome tai, ką tikrins apžiūroje.",
    description:
      "Prieš techninę apžiūrą patikrinami stabdžiai, važiuoklė, apšvietimas, išmetimo sistema ir kiti punktai, o rasti trūkumai pašalinami.",
    includes: ["Pilna patikra pagal apžiūros punktus", "Apšvietimo reguliavimas", "Trūkumų šalinimas"],
    photo: photos.bright,
    priceGroup: "prieziura",
  },
];

export const partCategories = [
  { title: "Stabdžių sistema", items: "Kaladėlės, diskai, būgnai, suportai, skystis" },
  { title: "Filtrai ir alyvos", items: "Alyvos, oro, salono, kuro filtrai, variklio alyvos" },
  { title: "Važiuoklė", items: "Amortizatoriai, spyruoklės, svirtys, guoliai, šarnyrai" },
  { title: "Variklio dalys", items: "Paskirstymo diržai, siurbliai, tarpinės, uždegimo žvakės" },
  { title: "Autoelektrika", items: "Akumuliatoriai, lemputės, jutikliai, starteriai, generatoriai" },
  { title: "Aušinimas ir klimatas", items: "Radiatoriai, termostatai, kondicionieriaus dalys" },
  { title: "Išmetimo sistema", items: "Duslintuvai, vamzdžiai, tvirtinimo detalės" },
  { title: "Priežiūros prekės", items: "Valytuvai, skysčiai, autochemija, priedai" },
];

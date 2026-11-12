/**
 * Iliustracinės (demonstracinės) nuotraukos iš Unsplash.
 * Tai NĖRA įmonės nuotraukos – svetainėje jos pažymėtos ženkleliu „Iliustracija“.
 * Gavus tikras įmonės nuotraukas, įkelkite jas į /public/photos ir pakeiskite `src`, nustatę `demo: false`.
 */
export type Photo = { src: string; alt: string; demo: boolean };

const u = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const photos = {
  hero: { src: u("1632405862117-236585cfb757"), alt: "Automobilis remonto dirbtuvėse", demo: true },
  workshopNight: { src: u("1756575527484-2839c593ed84"), alt: "Autoserviso dirbtuvės vakare", demo: true },
  bodyRepair: { src: u("1643236084696-13306d729ff3"), alt: "Automobilis su nuimtomis kėbulo dalimis", demo: true },
  lift: { src: u("1723099971299-3789db53604c"), alt: "Automobilis ant keltuvo", demo: true },
  underCar: { src: u("1711386689622-1cda23e10217"), alt: "Meistras dirba po automobiliu", demo: true },
  bright: { src: u("1771340012319-0b4fca008b54"), alt: "Meistras tikrina variklį šviesiose dirbtuvėse", demo: true },
  hands: { src: u("1619642751034-765dfdf7c58e"), alt: "Meistro rankos su veržliarakčiu prie variklio", demo: true },
  brakes: { src: u("1760317890314-e964ffd7e6a6"), alt: "Stabdžių diskas ir suportas", demo: true },
  tire: { src: u("1645445522156-9ac06bc7a767"), alt: "Padangos montavimas", demo: true },
  diagnostics: { src: u("1727893380169-4dda123e19f7"), alt: "Kompiuterinė automobilio diagnostika", demo: true },
  electrics: { src: u("1765211003026-f7666ea3a948"), alt: "Automobilio akumuliatorius su laidais", demo: true },
  climate: { src: u("1778938525731-0a254548f58f"), alt: "Automobilio klimato valdymo skydelis", demo: true },
  engine: { src: u("1486262715619-67b85e0b08d3"), alt: "Variklio diržinė pavara", demo: true },
  tools: { src: u("1637640125496-31852f042a60"), alt: "Įrankių dėžė su veržliarakčiais", demo: true },
  hood: { src: u("1625047509168-a7026f36de04"), alt: "Automobilis su atidarytu variklio dangčiu", demo: true },
  wheels: { src: u("1760836395760-9831facb4754"), alt: "Padangos ir lengvojo lydinio ratlankis", demo: true },
} satisfies Record<string, Photo>;

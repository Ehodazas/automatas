import { services } from "@/content/services";
import type { Field } from "./RequestForm";

const thisYear = new Date().getFullYear();

export const makes = [
  "Audi", "BMW", "Citroën", "Dacia", "Fiat", "Ford", "Honda", "Hyundai", "Kia", "Mazda", "Mercedes-Benz",
  "Mitsubishi", "Nissan", "Opel", "Peugeot", "Renault", "Seat", "Škoda", "Subaru", "Suzuki", "Toyota",
  "Volkswagen", "Volvo", "Kita",
];

export const repairFields: Field[] = [
  { name: "vardas", label: "Vardas", required: true, span: 1, autoComplete: "given-name" },
  { name: "telefonas", label: "Telefonas", type: "tel", required: true, span: 1, autoComplete: "tel", placeholder: "+370 6xx xxxxx" },
  { name: "marke", label: "Markė", type: "select", options: makes, required: true, span: 1 },
  { name: "modelis", label: "Modelis", required: true, span: 1, placeholder: "pvz. Octavia" },
  { name: "metai", label: "Metai", type: "number", span: 1, min: 1980, max: thisYear + 1, placeholder: String(thisYear - 8) },
  { name: "paslauga", label: "Paslauga", type: "select", options: [...services.map((s) => s.title), "Kita"], required: true, span: 1 },
  { name: "data", label: "Pageidaujama data", type: "date", span: 1 },
  { name: "elpastas", label: "El. paštas", type: "email", span: 1, autoComplete: "email" },
  { name: "aprasymas", label: "Gedimo ar darbų aprašymas", type: "textarea", placeholder: "Kas neveikia, kada atsiranda, kokie garsai ar klaidos…" },
];

export const partsFields: Field[] = [
  { name: "marke", label: "Markė", type: "select", options: makes, required: true, span: 1 },
  { name: "modelis", label: "Modelis", required: true, span: 1, placeholder: "pvz. Golf" },
  { name: "metai", label: "Pagaminimo metai", type: "number", required: true, span: 1, min: 1980, max: thisYear + 1 },
  { name: "variklis", label: "Variklis", span: 1, placeholder: "pvz. 1.9 TDI, 77 kW" },
  { name: "vin", label: "VIN kodas", placeholder: "Nebūtina, bet padeda tiksliai parinkti detalę" },
  { name: "detale", label: "Reikalinga detalė", type: "textarea", required: true, placeholder: "pvz. priekiniai stabdžių diskai ir kaladėlės" },
  { name: "vardas", label: "Vardas", required: true, span: 1, autoComplete: "given-name" },
  { name: "telefonas", label: "Telefonas", type: "tel", required: true, span: 1, autoComplete: "tel" },
];

export const contactFields: Field[] = [
  { name: "vardas", label: "Vardas", required: true, span: 1, autoComplete: "name" },
  { name: "telefonas", label: "Telefonas", type: "tel", required: true, span: 1, autoComplete: "tel" },
  { name: "padalinys", label: "Kam skirta užklausa", type: "select", options: ["Autoservisui", "Autodalių parduotuvei"], required: true },
  { name: "zinute", label: "Žinutė", type: "textarea", required: true },
];

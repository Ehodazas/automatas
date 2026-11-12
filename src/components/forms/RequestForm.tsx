"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { site } from "@/config/site";
import { CheckIcon, InfoIcon, PhoneIcon } from "../icons";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "tel" | "email" | "number" | "date" | "select" | "textarea";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  /** Kiek stulpelių užima (iš 2) */
  span?: 1 | 2;
  autoComplete?: string;
  min?: number;
  max?: number;
};

type Props = {
  /** Formos tipas – perduodamas siuntimo sprendimui */
  kind: "remontas" | "autodalys" | "kontaktai";
  title: string;
  fields: Field[];
  submitLabel: string;
  /** Kuriam padaliniui skirta užklausa (skambinimo mygtukui po pateikimo) */
  location?: "service" | "shop";
  light?: boolean;
};

type Status = { state: "idle" } | { state: "sending" } | { state: "demo"; summary: [string, string][] } | { state: "sent" } | { state: "error" };

/**
 * Universali užklausos forma.
 * Kol `site.formEndpoint` yra `null`, duomenys NIEKUR neišsiunčiami – lankytojui aiškiai parodoma,
 * kad tai demonstracinė forma, ir pasiūloma paskambinti.
 */
export function RequestForm({ kind, title, fields, submitLabel, location = "service", light = false }: Props) {
  const uid = useId();
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  /** Paskutinės įvestos reikšmės – kad „Redaguoti užklausą“ neištrintų duomenų. */
  const [values, setValues] = useState<Record<string, string>>({});
  const loc = site.locations[location] ?? site.locations.service;

  function validate(data: FormData) {
    const e: Record<string, string> = {};
    for (const f of fields) {
      const v = String(data.get(f.name) ?? "").trim();
      if (f.required && !v) e[f.name] = "Užpildykite šį lauką";
      else if (v && f.type === "email" && !/^\S+@\S+\.\S+$/.test(v)) e[f.name] = "Neteisingas el. pašto adresas";
      else if (v && f.type === "tel" && !/^[+\d][\d\s()-]{6,}$/.test(v)) e[f.name] = "Neteisingas telefono numeris";
      else if (v && f.type === "number" && (Number(v) < (f.min ?? -Infinity) || Number(v) > (f.max ?? Infinity)))
        e[f.name] = `Įveskite reikšmę nuo ${f.min} iki ${f.max}`;
    }
    if (!data.get("consent")) e.consent = "Reikalingas sutikimas";
    return e;
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const data = new FormData(ev.currentTarget);
    setValues(Object.fromEntries([...data.entries()].map(([k, v]) => [k, String(v)])));
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = ev.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(e)[0]}"]`);
      first?.focus();
      return;
    }

    if (!site.formEndpoint) {
      const summary = fields
        .map((f) => [f.label, String(data.get(f.name) ?? "").trim()] as [string, string])
        .filter(([, v]) => v);
      setStatus({ state: "demo", summary });
      return;
    }

    setStatus({ state: "sending" });
    try {
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, ...Object.fromEntries(data) }),
      });
      setStatus(res.ok ? { state: "sent" } : { state: "error" });
    } catch {
      setStatus({ state: "error" });
    }
  }

  const input = `w-full border bg-transparent px-3.5 py-3 text-base outline-none transition-colors placeholder:opacity-55 focus:border-red ${
    light ? "border-ink/20 text-ink" : "border-line text-white"
  }`;

  return (
    <div className={light ? "text-ink" : "text-white"}>
      <AnimatePresence mode="wait" initial={false}>
        {status.state === "demo" || status.state === "sent" ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`border p-6 md:p-8 ${light ? "border-ink/15 bg-white" : "border-line bg-graphite"}`}
            role="status"
            aria-live="polite"
          >
            {status.state === "demo" ? (
              <>
                <div className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center bg-red/15 text-red">
                    <InfoIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-xl font-bold uppercase [font-stretch:110%]">Užklausa neišsiųsta</p>
                    <p className={`mt-1 text-sm leading-relaxed ${light ? "text-ink/70" : "text-white/70"}`}>
                      Tai demonstracinė svetainė – formos siuntimas dar neprijungtas, todėl duomenys niekur neperduoti.
                      Norėdami užsiregistruoti iš tikrųjų, paskambinkite.
                    </p>
                  </div>
                </div>
                <dl className={`mt-6 grid gap-x-6 gap-y-2 border-t pt-5 text-sm sm:grid-cols-[auto_1fr] ${light ? "border-ink/10" : "border-line"}`}>
                  {status.summary.map(([k, v]) => (
                    <div key={k} className="contents">
                      <dt className={light ? "text-ink/65" : "text-white/65"}>{k}</dt>
                      <dd className="break-words font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a href={`tel:${loc.phoneHref}`} className="inline-flex h-12 items-center justify-center gap-2 bg-red px-5 font-semibold text-white hover:bg-red-deep">
                    <PhoneIcon className="h-4 w-4" /> {loc.phone}
                  </a>
                  <button
                    type="button"
                    onClick={() => setStatus({ state: "idle" })}
                    className={`inline-flex h-12 items-center justify-center border px-5 font-semibold ${light ? "border-ink/20 hover:border-ink" : "border-line hover:border-white"}`}
                  >
                    Redaguoti užklausą
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <CheckIcon className="h-6 w-6 text-red" />
                <p className="font-semibold">Ačiū! Užklausa gauta – susisieksime.</p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-label={title}
          >
            {!site.formEndpoint && (
              <p className={`mb-6 flex items-start gap-2 text-xs leading-relaxed ${light ? "text-ink/70" : "text-white/70"}`}>
                <InfoIcon className="mt-px h-4 w-4 shrink-0 text-red" />
                Demonstracinė forma: duomenys nesiunčiami, kol nebus prijungtas tikras siuntimo sprendimas.
              </p>
            )}
            <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
              {fields.map((f) => {
                const id = `${uid}-${f.name}`;
                const err = errors[f.name];
                const common = {
                  id,
                  name: f.name,
                  "aria-invalid": !!err,
                  "aria-describedby": err ? `${id}-err` : undefined,
                  className: `${input} ${err ? "border-red" : ""}`,
                  placeholder: f.placeholder,
                  autoComplete: f.autoComplete,
                  defaultValue: values[f.name] ?? "",
                };
                return (
                  <div key={f.name} className={f.span === 1 ? "" : "sm:col-span-2"}>
                    <label htmlFor={id} className={`mb-1.5 block text-sm font-medium ${light ? "text-ink/80" : "text-white/80"}`}>
                      {f.label}
                      {f.required && <span className="text-red"> *</span>}
                    </label>
                    {f.type === "select" ? (
                      <select {...common} className={`${common.className} appearance-none bg-[length:12px] bg-[right_14px_center] bg-no-repeat [background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%23e3261c' stroke-width='1.6'/%3E%3C/svg%3E")]`}>
                        <option value="" disabled className="text-ink">
                          Pasirinkite…
                        </option>
                        {f.options?.map((o) => (
                          <option key={o} value={o} className="text-ink">
                            {o}
                          </option>
                        ))}
                      </select>
                    ) : f.type === "textarea" ? (
                      <textarea {...common} rows={4} />
                    ) : (
                      <input {...common} type={f.type ?? "text"} min={f.min} max={f.max} inputMode={f.type === "number" ? "numeric" : undefined} />
                    )}
                    {err && (
                      <p id={`${id}-err`} className="mt-1 text-xs text-red">
                        {err}
                      </p>
                    )}
                  </div>
                );
              })}
              <div className="sm:col-span-2">
                <label className={`flex cursor-pointer items-start gap-3 text-sm ${light ? "text-ink/70" : "text-white/70"}`}>
                  <input type="checkbox" name="consent" defaultChecked={!!values.consent} className="mt-0.5 h-5 w-5 shrink-0 accent-[#e3261c]" aria-invalid={!!errors.consent} />
                  Sutinku, kad mano pateikti duomenys būtų naudojami tik atsakyti į šią užklausą.
                </label>
                {errors.consent && <p className="mt-1 text-xs text-red">{errors.consent}</p>}
              </div>
            </div>
            <button
              type="submit"
              disabled={status.state === "sending"}
              className="mt-7 inline-flex h-13 w-full items-center justify-center bg-red px-7 py-3.5 font-semibold text-white transition-[background-color,transform] hover:bg-red-deep active:scale-[0.99] disabled:opacity-60 sm:w-auto"
            >
              {status.state === "sending" ? "Siunčiama…" : submitLabel}
            </button>
            {status.state === "error" && <p className="mt-3 text-sm text-red">Nepavyko išsiųsti. Paskambinkite {loc.phone}.</p>}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

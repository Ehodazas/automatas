import type { Location } from "@/config/types";
import { ClockIcon, InfoIcon, MailIcon, PhoneIcon, PinIcon } from "./icons";

/** Žymė informacijai, kurią dar turi patvirtinti įmonė. */
export function UnverifiedBadge() {
  return (
    <span className="inline-block border border-red/60 px-1.5 py-px text-[10px] font-semibold uppercase tracking-wider text-red">
      Reikia patvirtinti
    </span>
  );
}

export function MapEmbed({ query, title }: { query: string; title: string }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-steel md:aspect-[16/10]">
      <iframe
        title={title}
        src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`}
        className="absolute inset-0 h-full w-full grayscale-[0.85] invert-[0.92] hue-rotate-180 contrast-[0.9]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export function LocationCard({ loc, index, withMap = true }: { loc: Location; index: string; withMap?: boolean }) {
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.mapQuery)}`;
  return (
    <article className="flex min-w-0 flex-col border border-line bg-graphite">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-line px-5 py-4 md:px-7">
        <p className="eyebrow flex items-center gap-3 text-white/70">
          <span className="text-red">{index}</span>
          {loc.label}
        </p>
        {loc.isPlaceholder && <span className="font-mono text-[10px] uppercase tracking-wider text-white/60">Pavyzdiniai duomenys</span>}
      </div>
      <div className="grid gap-5 p-5 md:p-7">
        <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3">
          <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-red" />
          <span>
            <span className="block font-display text-[clamp(0.9rem,5.2vw,1.5rem)] font-bold uppercase leading-tight [overflow-wrap:anywhere] [font-stretch:108%]">{loc.address}</span>
            <span className="mt-1 block text-xs text-white/65 underline-offset-4 group-hover:underline">Atidaryti Google Maps</span>
          </span>
        </a>
        <a href={`tel:${loc.phoneHref}`} className="flex h-12 items-center gap-3 bg-red px-4 font-semibold text-white transition-colors hover:bg-red-deep">
          <PhoneIcon className="h-4 w-4" />
          {loc.phone}
        </a>
        {loc.email && (
          <a href={`mailto:${loc.email}`} className="flex min-w-0 items-center gap-3 text-sm text-white/80 [overflow-wrap:anywhere] hover:text-white">
            <MailIcon className="h-4 w-4 text-red" /> {loc.email}
          </a>
        )}
        <div className="flex items-start gap-3 text-sm text-white/75">
          <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-red" />
          {loc.hours?.length ? (
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-center gap-2 font-semibold text-white">
                Darbo laikas {loc.unverifiedSource && <UnverifiedBadge />}
              </p>
              <dl className="mt-1.5 space-y-1">
                {loc.hours.map((h) => (
                  <div key={h.days} className="flex flex-wrap justify-between gap-x-3">
                    <dt>{h.days}</dt>
                    <dd className="whitespace-nowrap font-medium tabular-nums text-white">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : (
            <span>Darbo laiką prašome pasitikslinti telefonu.</span>
          )}
        </div>

        {loc.details?.map((d) => (
          <div key={d.title} className="flex items-start gap-3 text-sm text-white/75">
            <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-red" />
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-center gap-2 font-semibold text-white">
                {d.title} {loc.unverifiedSource && <UnverifiedBadge />}
              </p>
              <ul className="mt-1.5 space-y-0.5">
                {d.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        {loc.unverifiedSource && (loc.hours?.length || loc.details?.length) ? (
          <p className="border-l-2 border-red bg-white/[0.04] px-3 py-2 text-xs leading-relaxed text-white/70">
            Darbo laikas, prieinamumo ir atsiskaitymo informacija paimta iš trečiosios šalies katalogo{" "}
            <a href={loc.unverifiedSource.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
              {loc.unverifiedSource.name}
            </a>{" "}
            ir dar nepatvirtinta įmonės. Prieš atvykdami pasitikslinkite telefonu.
          </p>
        ) : null}
      </div>
      {withMap && (
        <div className="mt-auto border-t border-line">
          <MapEmbed query={loc.mapQuery} title={`${loc.label} žemėlapyje`} />
        </div>
      )}
    </article>
  );
}

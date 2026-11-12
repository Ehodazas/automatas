import type { Location } from "@/config/types";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "./icons";

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
    <article className="flex flex-col border border-line bg-graphite">
      <div className="flex items-center justify-between border-b border-line px-5 py-4 md:px-7">
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
            <span className="block font-display text-2xl font-bold uppercase leading-tight [font-stretch:108%]">{loc.address}</span>
            <span className="mt-1 block text-xs text-white/65 underline-offset-4 group-hover:underline">Atidaryti Google Maps</span>
          </span>
        </a>
        <a href={`tel:${loc.phoneHref}`} className="flex h-12 items-center gap-3 bg-red px-4 font-semibold text-white transition-colors hover:bg-red-deep">
          <PhoneIcon className="h-4 w-4" />
          {loc.phone}
        </a>
        {loc.email && (
          <a href={`mailto:${loc.email}`} className="flex items-center gap-3 text-sm text-white/80 hover:text-white">
            <MailIcon className="h-4 w-4 text-red" /> {loc.email}
          </a>
        )}
        <div className="flex items-start gap-3 text-sm text-white/65">
          <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-red" />
          {loc.hours?.length ? (
            <ul>
              {loc.hours.map((h) => (
                <li key={h.days}>
                  {h.days}: {h.time}
                </li>
              ))}
            </ul>
          ) : (
            <span>Darbo laiką prašome pasitikslinti telefonu.</span>
          )}
        </div>
      </div>
      {withMap && (
        <div className="mt-auto border-t border-line">
          <MapEmbed query={loc.mapQuery} title={`${loc.label} žemėlapyje`} />
        </div>
      )}
    </article>
  );
}

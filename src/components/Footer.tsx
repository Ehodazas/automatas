import Link from "next/link";
import { nav, site } from "@/config/site";
import { Logo } from "./Logo";

export function Footer() {
  const { service, shop } = site.locations;
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-line bg-graphite">
      <div className="hazard h-1.5 opacity-80" aria-hidden />
      <div className="container-x grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">{site.tagline}.</p>
          <a href={`mailto:${site.email}`} className="mt-6 inline-block text-sm text-white underline decoration-red underline-offset-4">
            {site.email}
          </a>
        </div>

        {[service, shop].filter(Boolean).map((loc) => (
          <div key={loc!.id} className="md:col-span-3">
            <p className="eyebrow text-mute">{loc!.label}</p>
            <p className="mt-3 text-sm text-white/85">{loc!.address}</p>
            <a href={`tel:${loc!.phoneHref}`} className="mt-1 block text-sm font-semibold hover:text-red">
              {loc!.phone}
            </a>
          </div>
        ))}

        <nav aria-label="Poraštės navigacija" className="md:col-span-2">
          <p className="eyebrow text-mute">Puslapiai</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-white/70 hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-white/45 md:flex-row md:justify-between">
          <p>
            © {year} {site.legalName}
            {site.companyCode ? ` · Įmonės kodas ${site.companyCode}` : ""}
          </p>
          <p>
            {site.isDemo && "Neoficiali demonstracinė svetainė. "}
            Pažymėtos nuotraukos – iliustracinės (Unsplash), ne įmonės.
          </p>
        </div>
      </div>
    </footer>
  );
}

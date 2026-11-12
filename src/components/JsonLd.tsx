import { site } from "@/config/site";
import type { Location } from "@/config/types";

function place(loc: Location, type: string) {
  return {
    "@type": type,
    name: `${site.brand} – ${loc.label}`,
    telephone: loc.phone,
    ...(loc.email ? { email: loc.email } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.address.split(",")[0],
      addressLocality: loc.city,
      addressRegion: site.city.region,
      addressCountry: "LT",
    },
    areaServed: site.city.name,
    url: site.domain,
  };
}

/** Struktūriniai duomenys paieškos sistemoms (AutoRepair + AutoPartsStore). */
export function JsonLd() {
  const { service, shop } = site.locations;
  // Demonstraciniai (netikri) adresai į struktūrinius duomenis nededami.
  const graph = [service, shop]
    .filter((l): l is Location => !!l && !l.isPlaceholder)
    .map((l) => place(l, l.id === "service" ? "AutoRepair" : "AutoPartsStore"));

  if (graph.length === 0) return null;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: site.legalName,
        ...(site.companyCode ? { taxID: site.companyCode } : {}),
        ...(site.foundedYear ? { foundingDate: String(site.foundedYear) } : {}),
        email: site.email,
        url: site.domain,
      },
      ...graph,
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

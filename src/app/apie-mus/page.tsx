import type { Metadata } from "next";
import { absoluteUrl, site } from "@/config/site";
import { photos } from "@/content/photos";
import { Gallery } from "@/components/Gallery";
import { ButtonLink, Notice, PageHero, SectionHead } from "@/components/ui";
import { InfoIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Apie mus",
  description: `${site.legalName} – ${site.tagline.toLowerCase()} ${site.city.locative}.`,
  alternates: { canonical: absoluteUrl("/apie-mus") },
};

export default function AboutPage() {
  const facts = [
    site.foundedYear && { k: "Veiklos pradžia", v: `${site.foundedYear} m.` },
    { k: "Miestas", v: site.city.name },
    { k: "Padaliniai", v: site.locations.shop ? "Servisas + parduotuvė" : "Autoservisas" },
    { k: "Automobiliai", v: "Lengvieji ir mikroautobusai" },
  ].filter(Boolean) as { k: string; v: string }[];

  return (
    <>
      <PageHero eyebrow="Apie mus" title={site.brand} intro={site.tagline + "."} />

      <section className="py-20 md:py-28">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionHead index="01" eyebrow="Istorija ir veikla" title="Kas mes esame" />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-white/75">
              {site.story.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-px self-start bg-line min-[480px]:grid-cols-2 md:col-span-5 md:mt-24 md:grid-cols-1 xl:grid-cols-2">
            {facts.map((f) => (
              <div key={f.k} className="bg-ink p-5 md:p-6">
                <dt className="eyebrow text-mute">{f.k}</dt>
                <dd className="mt-3 font-display text-[clamp(0.95rem,5vw,1.125rem)] font-bold uppercase leading-tight [font-stretch:108%]">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-28">
        <div className="container-x">
          <SectionHead index="02" eyebrow="Galerija" title="Dirbtuvės ir darbai" />
          <div className="mt-8 max-w-2xl">
            <Notice>
              <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-red" />
              Galerijoje – iliustracinės nuotraukos (Unsplash), ne {site.brand} dirbtuvės. Gavus tikras įmonės nuotraukas, jos pakeis šias.
            </Notice>
          </div>
          <div className="mt-12">
            <Gallery
              items={[photos.workshopNight, photos.bodyRepair, photos.hands, photos.hood, photos.lift, photos.brakes, photos.bright, photos.wheels]}
            />
          </div>
          <div className="mt-12">
            <ButtonLink href="/kontaktai">Susisiekti</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

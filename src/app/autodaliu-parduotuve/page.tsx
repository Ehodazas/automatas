import type { Metadata } from "next";
import { absoluteUrl, site } from "@/config/site";
import { partCategories } from "@/content/services";
import { photos } from "@/content/photos";
import { PhotoFrame } from "@/components/PhotoFrame";
import { RequestForm } from "@/components/forms/RequestForm";
import { partsFields } from "@/components/forms/presets";
import { PageHero, SectionHead } from "@/components/ui";
import { PhoneIcon, PinIcon } from "@/components/icons";

const { city } = site;

export const metadata: Metadata = {
  title: `Autodalys ${city.locative} – autodalių parduotuvė`,
  description: `Naujos automobilių atsarginės dalys ${city.locative}: stabdžiai, filtrai, alyvos, važiuoklė, variklio dalys, autoelektrika. Autodalių užklausa pagal markę, modelį ir metus.`,
  alternates: { canonical: absoluteUrl("/autodaliu-parduotuve") },
};

export default function ShopPage() {
  const shop = site.locations.shop ?? site.locations.service;
  return (
    <>
      <PageHero
        eyebrow={`Autodalys ${city.locative}`}
        title={
          <>
            Autodalių <br /> parduotuvė
          </>
        }
        intro="Naujos atsarginės dalys lengviesiems automobiliams ir mikroautobusams. Parduotuvė veikia atskirai nuo autoserviso."
      >
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
          <p className="flex items-center gap-2 text-white/80">
            <PinIcon className="h-4 w-4 text-red" /> {shop.address}
          </p>
          <a href={`tel:${shop.phoneHref}`} className="inline-flex h-12 items-center gap-2 self-start bg-red px-5 font-semibold text-white hover:bg-red-deep">
            <PhoneIcon className="h-4 w-4" /> {shop.phone}
          </a>
        </div>
      </PageHero>

      <section className="py-20 md:py-28">
        <div className="container-x">
          <SectionHead index="01" eyebrow="Kategorijos" title="Prekių grupės" />
          <ul className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {partCategories.map((c, i) => (
              <li key={c.title} className="group relative @container min-w-0 bg-ink p-6 transition-colors hover:bg-graphite md:p-8">
                <span className="font-mono text-xs text-mute group-hover:text-red">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-8 font-display text-[min(1.25rem,8.4cqi)] font-bold uppercase leading-tight [font-stretch:110%]">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{c.items}</p>
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-red transition-transform duration-500 ease-out-quart group-hover:scale-x-100" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="uzklausa" className="scroll-mt-24 bg-paper py-20 text-ink md:py-28">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionHead index="02" eyebrow="Individuali užklausa" title="Raskime reikiamą detalę" light />
            <p className="mt-6 leading-relaxed text-ink/70">
              Nurodykite automobilio markę, modelį, pagaminimo metus ir reikalingą detalę. VIN kodas padeda parinkti tiksliai.
            </p>
            <PhotoFrame photo={photos.tools} className="mt-10 hidden aspect-[4/3] md:block" sizes="40vw" />
          </div>
          <div className="md:col-span-7">
            <div className="border border-ink/10 bg-white p-5 md:p-10">
              <RequestForm kind="autodalys" title="Autodalių užklausa" fields={partsFields} submitLabel="Siųsti užklausą" location="shop" light />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

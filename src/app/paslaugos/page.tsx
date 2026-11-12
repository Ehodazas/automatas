import type { Metadata } from "next";
import { absoluteUrl, site } from "@/config/site";
import { services } from "@/content/services";
import { PhotoFrame } from "@/components/PhotoFrame";
import { PriceList } from "@/components/PriceList";
import { ButtonLink, Notice, PageHero, SectionHead } from "@/components/ui";
import { CheckIcon, InfoIcon } from "@/components/icons";

const { city } = site;

export const metadata: Metadata = {
  title: `Automobilių remontas ${city.locative} – paslaugos`,
  description: `Automobilių remontas ${city.locative}: diagnostika, variklių remontas, važiuoklė, stabdžiai, autoelektrika, kondicionieriai, padangos ir techninės apžiūros paruošimas.`,
  alternates: { canonical: absoluteUrl("/paslaugos") },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow={`Automobilių remontas ${city.locative}`}
        title={
          <>
            Paslaugos <span className="text-red">/</span> {services.length}
          </>
        }
        intro="Lengvųjų automobilių ir mikroautobusų remontas, techninė priežiūra ir diagnostika."
      >
        <nav aria-label="Paslaugų sąrašas" className="mt-10 flex flex-wrap gap-2">
          {services.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="border border-line px-3 py-2 text-sm text-white/75 transition-colors hover:border-red hover:text-white"
            >
              {s.title}
            </a>
          ))}
        </nav>
      </PageHero>

      <div className="container-x">
        {services.map((s, i) => (
          <section
            key={s.slug}
            id={s.slug}
            className="group grid scroll-mt-28 gap-8 border-b border-line py-14 md:grid-cols-12 md:gap-12 md:py-20"
          >
            <div className={`md:col-span-6 ${i % 2 ? "md:order-2" : ""}`}>
              <PhotoFrame photo={s.photo} className="aspect-[4/3]" sizes="(min-width:768px) 50vw, 100vw" />
            </div>
            <div className="flex flex-col justify-center md:col-span-6">
              <p className="font-mono text-xs text-red">{String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</p>
              <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.2rem)] font-extrabold uppercase leading-[0.95] [font-stretch:112%]">
                {s.title}
              </h2>
              <p className="mt-5 max-w-lg leading-relaxed text-white/70">{s.description}</p>
              <ul className="mt-6 grid gap-2.5">
                {s.includes.map((x) => (
                  <li key={x} className="flex items-start gap-3 text-sm">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-red" />
                    {x}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/kontaktai#registracija">Registruotis</ButtonLink>
                {site.prices && s.priceGroup && (
                  <ButtonLink href="#kainos" variant="ghost">
                    Kainos
                  </ButtonLink>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>

      <section id="kainos" className="scroll-mt-24 py-24 md:py-32">
        <div className="container-x">
          <SectionHead eyebrow="Kainoraštis" title="Darbų kainos" />
          {site.prices ? (
            <>
              {site.pricesAreExample && (
                <div className="mt-8 max-w-2xl">
                  <Notice>
                    <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-red" />
                    Pavyzdinis kainoraštis demonstracinei svetainei. Kainos be detalių ir medžiagų; galutinė kaina suderinama po apžiūros.
                  </Notice>
                </div>
              )}
              <div className="mt-12">
                <PriceList groups={site.prices} />
              </div>
            </>
          ) : (
            <div className="mt-8 max-w-2xl">
              <Notice>
                <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-red" />
                Darbų kainos priklauso nuo automobilio ir gedimo. Kainą sužinosite paskambinę arba atsiuntę registracijos užklausą.
              </Notice>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

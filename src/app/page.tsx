import Link from "next/link";
import { site } from "@/config/site";
import { photos } from "@/content/photos";
import { partCategories, services } from "@/content/services";
import { Hero } from "@/components/home/Hero";
import { ServiceIndex } from "@/components/home/ServiceIndex";
import { ProcessTrack } from "@/components/home/ProcessTrack";
import { Marquee } from "@/components/Marquee";
import { PhotoFrame } from "@/components/PhotoFrame";
import { PriceList } from "@/components/PriceList";
import { ButtonLink, Notice, SectionHead } from "@/components/ui";
import { InfoIcon, PhoneIcon, PinIcon } from "@/components/icons";

export default function HomePage() {
  const { service, shop } = site.locations;
  return (
    <>
      <Hero />

      {/* Paslaugos */}
      <section className="py-24 md:py-32">
        <div className="container-x">
          <SectionHead
            index="01"
            eyebrow="Paslaugos"
            title={
              <>
                Viskas, ko reikia <br className="hidden md:block" />
                automobiliui
              </>
            }
            intro={`Lengvųjų automobilių ir mikroautobusų remontas bei priežiūra ${site.city.locative}: nuo diagnostikos iki pasiruošimo techninei apžiūrai.`}
          />
          <div className="mt-14">
            <ServiceIndex />
          </div>
          <div className="mt-10">
            <ButtonLink href="/paslaugos" variant="ghost">
              Visos paslaugos
            </ButtonLink>
          </div>
        </div>
      </section>

      <Marquee items={services.map((s) => s.title)} />

      {/* Darbo eiga */}
      <section className="relative overflow-hidden bg-graphite py-24 md:py-32">
        <div className="container-x">
          <SectionHead
            index="02"
            eyebrow="Kaip dirbame"
            title="Penki aiškūs žingsniai"
            intro="Jokių netikėtumų sąskaitoje: darbų apimtis ir detalės suderinamos prieš pradedant remontą."
          />
          <div className="mt-16">
            <ProcessTrack />
          </div>
        </div>
      </section>

      {/* Du padaliniai */}
      <section className="py-24 md:py-32">
        <div className="container-x">
          <SectionHead
            index="03"
            eyebrow="Dvi vietos"
            title={shop ? "Servisas ir parduotuvė" : "Autoservisas"}
            intro={shop ? "Autoservisas ir autodalių parduotuvė veikia atskirais adresais – kiekviena su savo telefonu." : undefined}
          />
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {[
              { loc: service, photo: photos.underCar, href: "/paslaugos", cta: "Paslaugos" },
              ...(shop ? [{ loc: shop, photo: photos.wheels, href: "/autodaliu-parduotuve", cta: "Parduotuvė" }] : []),
            ].map(({ loc, photo, href, cta }, i) => (
              <article key={loc.id} className="group relative flex min-h-[480px] flex-col justify-end overflow-hidden md:min-h-[560px]">
                <PhotoFrame photo={photo} className="absolute! inset-0" sizes="(min-width:768px) 50vw, 100vw" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/10" />
                <div className="relative p-6 md:p-10">
                  <p className="eyebrow text-white/70">
                    <span className="text-red">0{i + 1}</span> · {loc.label}
                  </p>
                  <h3 className="mt-3 font-display text-4xl font-extrabold uppercase leading-none [font-stretch:112%] md:text-5xl">
                    {loc.id === "service" ? "Remontas ir priežiūra" : "Naujos autodalys"}
                  </h3>
                  <p className="mt-4 flex items-center gap-2 text-white/80">
                    <PinIcon className="h-4 w-4 text-red" /> {loc.address}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href={`tel:${loc.phoneHref}`} className="inline-flex h-12 items-center gap-2 bg-red px-5 font-semibold text-white hover:bg-red-deep">
                      <PhoneIcon className="h-4 w-4" /> {loc.phone}
                    </a>
                    <Link href={href} className="inline-flex h-12 items-center border border-white/30 px-5 font-semibold hover:border-white">
                      {cta}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Kainoraštis */}
      {site.prices && (
        <section className="bg-paper py-24 text-ink md:py-32">
          <div className="container-x">
            <SectionHead
              index="04"
              eyebrow="Kainoraštis"
              title="Orientacinės kainos"
              intro="Galutinė kaina priklauso nuo automobilio modelio ir būklės – ją suderiname po apžiūros, prieš pradedant darbus."
              light
            />
            {site.pricesAreExample && (
              <div className="mt-8 max-w-2xl">
                <Notice tone="light">
                  <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-red" />
                  Pavyzdinis kainoraštis demonstracinei svetainei. Kainos nurodytos be detalių ir medžiagų.
                </Notice>
              </div>
            )}
            <div className="mt-12">
              <PriceList groups={site.prices} light />
            </div>
          </div>
        </section>
      )}

      {/* Autodalys */}
      <section className="py-24 md:py-32">
        <div className="container-x grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <SectionHead index={site.prices ? "05" : "04"} eyebrow="Autodalių parduotuvė" title="Detalė pagal jūsų automobilį" />
            <p className="mt-6 leading-relaxed text-white/65">
              Nurodykite markę, modelį, metus ir reikalingą detalę – parinksime tinkamą naują atsarginę dalį.
            </p>
            <div className="mt-8">
              <ButtonLink href="/autodaliu-parduotuve#uzklausa">Užklausti detalės</ButtonLink>
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-px bg-line md:col-span-7">
            {partCategories.slice(0, 6).map((c) => (
              <li key={c.title} className="bg-ink p-5 transition-colors hover:bg-graphite md:p-7">
                <p className="font-display text-lg font-bold uppercase leading-tight [font-stretch:108%]">{c.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-white/50">{c.items}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <PhotoFrame photo={photos.workshopNight} className="absolute! inset-0" />
        <div aria-hidden className="absolute inset-0 bg-ink/80" />
        <div className="container-x relative py-24 md:py-36">
          <h2 className="max-w-4xl font-display text-[clamp(2.4rem,7vw,6rem)] font-extrabold uppercase leading-[0.9] [font-stretch:118%]">
            Užsiregistruokite <span className="text-red">remontui</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-white/75">Užpildykite trumpą formą arba paskambinkite – suderinsime laiką.</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/kontaktai#registracija">Registracijos forma</ButtonLink>
            <ButtonLink href={`tel:${service.phoneHref}`} variant="ghost">
              {service.phone}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

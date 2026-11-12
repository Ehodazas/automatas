import type { Metadata } from "next";
import { site } from "@/config/site";
import { LocationCard } from "@/components/LocationCard";
import { RequestForm } from "@/components/forms/RequestForm";
import { contactFields, repairFields } from "@/components/forms/presets";
import { PageHero, SectionHead } from "@/components/ui";
import { MailIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: `Kontaktai – autoservisas ${site.city.locative}`,
  description: `${site.brand} kontaktai: autoserviso ir autodalių parduotuvės adresai, telefonai, žemėlapiai ir registracija remontui ${site.city.locative}.`,
  alternates: { canonical: "/kontaktai" },
};

export default function ContactPage() {
  const { service, shop } = site.locations;
  return (
    <>
      <PageHero eyebrow="Kontaktai" title="Susisiekite" intro="Autoservisas ir autodalių parduotuvė turi atskirus adresus ir telefonus – skambinkite tiesiai reikiamam padaliniui.">
        <a href={`mailto:${site.email}`} className="mt-8 inline-flex items-center gap-2 text-white/85 underline decoration-red underline-offset-4 hover:text-white">
          <MailIcon className="h-4 w-4 text-red" /> {site.email}
        </a>
      </PageHero>

      <section className="py-16 md:py-24">
        <div className={`container-x grid gap-4 ${shop ? "lg:grid-cols-2" : ""}`}>
          <LocationCard loc={service} index="01" />
          {shop && <LocationCard loc={shop} index="02" />}
        </div>
      </section>

      <section id="registracija" className="scroll-mt-24 bg-paper py-20 text-ink md:py-28">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionHead index="03" eyebrow="Registracija" title="Remonto užklausa" light />
            <p className="mt-6 leading-relaxed text-ink/70">
              Nurodykite automobilį ir reikalingą paslaugą. Laikas suderinamas telefonu.
            </p>
          </div>
          <div className="md:col-span-8">
            <div className="border border-ink/10 bg-white p-5 md:p-10">
              <RequestForm kind="remontas" title="Registracija remontui" fields={repairFields} submitLabel="Registruotis" location="service" light />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionHead index="04" eyebrow="Bendra užklausa" title="Klausimas?" />
          </div>
          <div className="md:col-span-8">
            <RequestForm kind="kontaktai" title="Bendra užklausa" fields={contactFields} submitLabel="Siųsti" />
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { absoluteUrl, site } from "@/config/site";
import { Notice, PageHero } from "@/components/ui";
import { InfoIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Privatumo politika",
  description: `Kaip ${site.legalName} svetainėje tvarkomi asmens duomenys ir naudojami slapukai.`,
  alternates: { canonical: absoluteUrl("/privatumo-politika") },
};

const providerName = site.forms?.type === "web3forms" ? "Web3Forms" : site.forms?.type === "formspree" ? "Formspree" : null;

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line pt-8">
      <h2 className="font-display text-[clamp(1.1rem,5.6vw,1.75rem)] font-bold uppercase leading-tight tracking-tight [font-stretch:108%]">{title}</h2>
      <div className="mt-4 space-y-3 leading-relaxed text-white/75">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Teisinė informacija" title="Privatumo politika" />

      <div className="container-x max-w-3xl space-y-10 py-16 md:py-24">
        <Notice>
          <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-red" />
          <span>
            Tai privatumo politikos projektas demonstracinei svetainei. Prieš paskelbiant svetainę viešai, jį turi peržiūrėti ir patvirtinti
            įmonė (prireikus – teisininkas).
          </span>
        </Notice>

        <Block title="Duomenų valdytojas">
          <p>
            {site.legalName}
            {site.companyCode ? `, įmonės kodas ${site.companyCode}` : ""}, {site.city.name}. El. paštas:{" "}
            <a href={`mailto:${site.email}`} className="text-white underline decoration-red underline-offset-4 [overflow-wrap:anywhere]">
              {site.email}
            </a>
            .
          </p>
        </Block>

        <Block title="Kokius duomenis renkame">
          <p>
            Tik tuos, kuriuos patys įrašote užklausos formoje: vardą, telefono numerį, el. pašto adresą, automobilio duomenis (markę, modelį,
            metus) ir žinutės tekstą. Kitų asmens duomenų svetainė nerenka.
          </p>
        </Block>

        <Block title="Kam juos naudojame">
          <p>
            Tik atsakyti į jūsų užklausą – suderinti remonto laiką arba pasiūlyti autodalį. Teisinis pagrindas – jūsų sutikimas, kurį duodate
            pažymėdami langelį formoje (BDAR 6 str. 1 d. a p.), ir veiksmai prieš sudarant sutartį jūsų prašymu (BDAR 6 str. 1 d. b p.).
          </p>
          <p>Duomenų neparduodame, nenaudojame reklamai ir neperduodame tretiesiems asmenims, išskyrus žemiau nurodytą siuntimo paslaugą.</p>
        </Block>

        <Block title="Kaip užklausa pasiekia mus">
          {providerName ? (
            <p>
              Formos užklausos pristatomos el. paštu per paslaugą „{providerName}“, kuri veikia kaip duomenų tvarkytojas ir duomenis naudoja
              tik pristatymui.
            </p>
          ) : (
            <p>Šiuo metu formos siuntimas neprijungtas – formoje įvesti duomenys niekur neperduodami ir niekur nesaugomi.</p>
          )}
        </Block>

        <Block title="Kiek laiko saugome">
          <p>
            Užklausas saugome tiek, kiek reikia joms išnagrinėti ir atsakyti, bet ne ilgiau kaip 12 mėnesių, nebent toliau tęsiame
            bendradarbiavimą (pvz., atliekame remontą) arba saugoti įpareigoja įstatymai.
          </p>
        </Block>

        <Block title="Slapukai ir trečiųjų šalių turinys">
          <p>Svetainė nenaudoja analitikos, reklamos ar sekimo slapukų.</p>
          <p>
            Žemėlapiai įkeliami tik paspaudus „Rodyti žemėlapį“. Tada turinį teikia „Google“, kuri gali naudoti savo slapukus pagal{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-red underline-offset-4">
              „Google“ privatumo politiką
            </a>
            . Iki paspaudimo jokia informacija „Google“ nesiunčiama. Pasirinkimas pamirštamas uždarius naršyklės langą.
          </p>
        </Block>

        <Block title="Jūsų teisės">
          <p>
            Turite teisę susipažinti su savo duomenimis, juos ištaisyti, ištrinti, apriboti jų tvarkymą, bet kada atšaukti sutikimą ir gauti
            duomenis perkeliamu formatu. Kreipkitės el. paštu{" "}
            <a href={`mailto:${site.email}`} className="text-white underline decoration-red underline-offset-4 [overflow-wrap:anywhere]">
              {site.email}
            </a>
            .
          </p>
          <p>
            Jei manote, kad duomenys tvarkomi neteisėtai, galite pateikti skundą Valstybinei duomenų apsaugos inspekcijai (
            <a href="https://vdai.lrv.lt" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-red underline-offset-4">
              vdai.lrv.lt
            </a>
            ).
          </p>
        </Block>
      </div>
    </>
  );
}

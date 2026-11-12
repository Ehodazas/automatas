import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col justify-center pt-28">
      <p className="font-mono text-sm text-red">Klaida 404</p>
      <h1 className="mt-4 font-display text-[clamp(3rem,10vw,8rem)] font-extrabold uppercase leading-[0.9] [font-stretch:118%]">
        Kelias <br /> nerastas
      </h1>
      <div className="mt-10">
        <ButtonLink href="/">Į pradžią</ButtonLink>
      </div>
    </section>
  );
}

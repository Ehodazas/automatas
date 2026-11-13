import Link from "next/link";
import { ArrowIcon } from "./icons";

type BtnProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "dark";
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", className = "" }: BtnProps) {
  const styles = {
    primary: "bg-red text-white hover:bg-red-deep",
    ghost: "border border-white/25 text-white hover:border-white hover:bg-white/5",
    dark: "bg-ink text-white hover:bg-steel",
  }[variant];
  const isExternal = href.startsWith("tel:") || href.startsWith("mailto:");
  const cls = `group inline-flex h-12 items-center justify-center gap-3 px-6 text-sm font-semibold transition-[background-color,border-color,transform] duration-200 active:scale-[0.98] ${styles} ${className}`;
  const inner = (
    <>
      {children}
      <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </>
  );
  return isExternal ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function SectionHead({
  index,
  eyebrow,
  title,
  intro,
  light,
}: {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-12 md:items-end">
      <div className="@container min-w-0 md:col-span-7">
        <p className={`eyebrow flex items-center gap-3 ${light ? "text-ink/65" : "text-mute"}`}>
          {index && <span className="text-red">{index}</span>}
          <span className={`h-px w-8 ${light ? "bg-ink/25" : "bg-line"}`} />
          {eyebrow}
        </p>
        <h2 className="mt-4 font-display text-[clamp(1.1rem,9cqi,3.6rem)] font-extrabold uppercase leading-[0.95] tracking-tight [font-stretch:112%]">
          {title}
        </h2>
      </div>
      {intro && (
        <p className={`text-base leading-relaxed md:col-span-5 md:pb-1 ${light ? "text-ink/70" : "text-white/65"}`}>{intro}</p>
      )}
    </div>
  );
}

/** Vidinių puslapių antraštė */
export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: React.ReactNode; intro?: string; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-line pb-14 pt-36 md:pb-20 md:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(var(--color-paper)_1px,transparent_1px),linear-gradient(90deg,var(--color-paper)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />
      <div className="container-x relative">
        <p className="eyebrow flex items-center gap-3 text-mute">
          <span className="h-px w-8 bg-red" />
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-5xl font-display text-[clamp(1.2rem,8.5vw,5.6rem)] font-extrabold uppercase leading-[0.92] tracking-tight [font-stretch:115%]">
          {title}
        </h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{intro}</p>}
        {children}
      </div>
    </section>
  );
}

export function Notice({ children, tone = "dark" }: { children: React.ReactNode; tone?: "dark" | "light" }) {
  return (
    <div
      className={`flex gap-3 border-l-2 border-red px-4 py-3 text-sm leading-relaxed ${
        tone === "dark" ? "bg-white/[0.04] text-white/75" : "bg-ink/[0.04] text-ink/75"
      }`}
    >
      {children}
    </div>
  );
}

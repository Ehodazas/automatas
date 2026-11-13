import Link from "next/link";
import { site } from "@/config/site";

/** Logotipas: stilizuotas veržlės (šešiakampio) ženklas + pavadinimas. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label={`${site.brand} – pagrindinis`}>
      <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden>
        <path
          d="M16 2 28.1 9v14L16 30 3.9 23V9z"
          className="fill-red transition-transform duration-500 ease-out-quart group-hover:rotate-[30deg]"
          style={{ transformOrigin: "16px 16px" }}
        />
        <circle cx="16" cy="16" r="5.2" className="fill-ink" />
      </svg>
      <span className="whitespace-nowrap font-display text-[0.95rem] font-extrabold uppercase tracking-tight [font-stretch:115%] min-[360px]:text-base min-[400px]:text-[1.15rem]">
        {site.brand}
      </span>
    </Link>
  );
}

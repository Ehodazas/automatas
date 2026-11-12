import type { FormProvider } from "@/config/types";

type Submission = {
  provider: FormProvider;
  /** Formos pavadinimas, pvz. „Registracija remontui“ – laiško temai */
  title: string;
  brand: string;
  /** Užpildyti laukai: [etiketė, reikšmė] */
  entries: [string, string][];
  /** Kliento el. paštas (jei nurodė) – kad būtų galima atsakyti tiesiai */
  replyTo?: string;
};

/**
 * Išsiunčia užklausą per pasirinktą formų paslaugą.
 * Abi paslaugos veikia be savo serverio, todėl tinka statinei svetainei (GitHub Pages).
 */
export async function submitForm({ provider, title, brand, entries, replyTo }: Submission): Promise<boolean> {
  const fields = Object.fromEntries(entries);
  const subject = `${brand}: ${title}`;

  if (provider.type === "web3forms") {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: provider.accessKey,
        subject,
        from_name: `${brand} svetainė`,
        ...(replyTo ? { replyto: replyTo } : {}),
        ...fields,
      }),
    });
    const json = (await res.json().catch(() => null)) as { success?: boolean } | null;
    return res.ok && json?.success === true;
  }

  const res = await fetch(`https://formspree.io/f/${provider.formId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ _subject: subject, ...(replyTo ? { _replyto: replyTo } : {}), ...fields }),
  });
  return res.ok;
}

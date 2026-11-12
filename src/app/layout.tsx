import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { absoluteUrl, site } from "@/config/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { JsonLd } from "@/components/JsonLd";
import { MotionProvider } from "@/components/MotionProvider";

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-archivo",
  axes: ["wdth"],
  display: "swap",
});
const plex = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});

const { city } = site;

export const metadata: Metadata = {
  metadataBase: new URL(`${site.domain}/`),
  title: {
    default: `${site.brand} – autoservisas ir autodalys ${city.locative}`,
    template: `%s | ${site.brand}, ${city.name}`,
  },
  description: site.description,
  keywords: [
    `autoservisas ${city.locative}`,
    `autodalys ${city.locative}`,
    `automobilių remontas ${city.locative}`,
    `automobilių diagnostika ${city.locative}`,
    `padangos ${city.locative}`,
    ...site.keywords,
  ],
  applicationName: site.brand,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    locale: "lt_LT",
    siteName: site.brand,
    title: `${site.brand} – autoservisas ir autodalys ${city.locative}`,
    description: site.description,
    // Paveikslėlis nuorodai dalinantis (sugeneruotas iš prekės ženklo, 1200×630).
    images: [{ url: "og.png", width: 1200, height: 630, alt: `${site.brand} – autoservisas ir autodalys ${city.locative}` }],
  },
  twitter: { card: "summary_large_image" },
  // Demonstracinė versija neindeksuojama, kad nekonkuruotų su tikra įmonės svetaine.
  robots: site.isDemo ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#121416",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="lt" className={`${archivo.variable} ${plex.variable}`}>
      <body className="min-h-dvh overflow-x-clip pb-[72px] md:pb-0">
        <a
          href="#turinys"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-red focus:px-4 focus:py-2 focus:text-white"
        >
          Pereiti prie turinio
        </a>
        <MotionProvider>
          <Header />
          <main id="turinys">{children}</main>
          <Footer />
          <MobileActionBar />
        </MotionProvider>
        <JsonLd />
      </body>
    </html>
  );
}

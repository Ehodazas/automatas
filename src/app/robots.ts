import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Demonstracinė versija neindeksuojama. Paleidus tikrą svetainę – `isDemo: false`.
  if (site.isDemo) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", site.domain).toString(),
  };
}

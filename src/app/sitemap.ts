import type { MetadataRoute } from "next";
import { nav, site } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return nav.map((n) => ({
    url: new URL(n.href, site.domain).toString(),
    changeFrequency: "monthly",
    priority: n.href === "/" ? 1 : 0.8,
  }));
}

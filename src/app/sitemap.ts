import type { MetadataRoute } from "next";
import { absoluteUrl, nav } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...nav.map((n) => ({
      url: absoluteUrl(n.href),
      changeFrequency: "monthly" as const,
      priority: n.href === "/" ? 1 : 0.8,
    })),
    { url: absoluteUrl("/privatumo-politika"), changeFrequency: "yearly" as const, priority: 0.2 },
  ];
}

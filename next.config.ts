import type { NextConfig } from "next";

/** GitHub Pages: statinis eksportas į `out/`, svetainė veikia po /<saugyklos-pavadinimas> keliu. */
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? (process.env.PAGES_BASE_PATH ?? "/automatas") : "";

const nextConfig: NextConfig = {
  ...(isPages ? { output: "export" as const, trailingSlash: true } : {}),
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // Leidžia atidaryti dev serverį iš telefono tame pačiame Wi-Fi tinkle.
  allowedDevOrigins: ["10.*.*.*", "192.168.*.*", "172.*.*.*"],
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;

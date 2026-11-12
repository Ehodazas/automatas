import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Leidžia atidaryti dev serverį iš telefono tame pačiame Wi-Fi tinkle.
  allowedDevOrigins: ["10.*.*.*", "192.168.*.*", "172.*.*.*"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;

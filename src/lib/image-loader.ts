/**
 * Nuotraukų įkėlėjas: Unsplash pats parengia reikiamo pločio nuotrauką,
 * todėl svetainė veikia ir kaip statinė (GitHub Pages), be Next.js serverio.
 */
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (!src.startsWith("https://images.unsplash.com/")) return src;
  const url = new URL(src);
  url.searchParams.set("auto", "format");
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 70));
  return url.toString();
}

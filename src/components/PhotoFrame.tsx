import Image from "next/image";
import type { Photo } from "@/content/photos";

type Props = {
  photo: Photo;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Ar rodyti „Iliustracija“ ženklelį (demonstracinėms nuotraukoms – numatyta taip) */
  showBadge?: boolean;
  zoom?: boolean;
};

/** Nuotrauka su aiškiu demonstracinės nuotraukos žymėjimu. */
export function PhotoFrame({ photo, className = "", sizes = "100vw", priority, showBadge = true, zoom = true }: Props) {
  return (
    <div className={`relative overflow-hidden bg-steel ${className}`}>
      <Image
        src={`${photo.src}?auto=format&fit=crop&w=1800&q=75`}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${zoom ? "transition-transform duration-700 ease-out-quart group-hover:scale-[1.03]" : ""}`}
      />
      {photo.demo && showBadge && (
        <span className="absolute bottom-2 right-2 z-20 bg-ink/75 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/75 backdrop-blur-sm">
          Iliustracija
        </span>
      )}
    </div>
  );
}

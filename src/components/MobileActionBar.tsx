import Link from "next/link";
import { site } from "@/config/site";
import { PhoneIcon } from "./icons";

/** Mobiliuosiuose visada matomi du pagrindiniai veiksmai: skambinti ir registruotis. */
export function MobileActionBar() {
  const s = site.locations.service;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-line bg-ink/95 p-2 backdrop-blur md:hidden">
      <a href={`tel:${s.phoneHref}`} className="flex h-12 items-center justify-center gap-2 text-sm font-semibold">
        <PhoneIcon className="h-4 w-4 text-red" />
        Skambinti
      </a>
      <Link
        href="/kontaktai#registracija"
        className="flex h-12 items-center justify-center bg-red text-sm font-semibold text-white"
      >
        Registruotis
      </Link>
    </div>
  );
}

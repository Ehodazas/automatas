# Automatas – autoserviso svetainės šablonas

Demonstracinė autoserviso ir autodalių parduotuvės svetainė.
Technologijos: **Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Motion for React**.

## Paleidimas

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # produkcinė versija
```

## Du klientai vienoje kodo bazėje

| `NEXT_PUBLIC_SITE`     | Kas rodoma |
|------------------------|------------|
| `automatas` (numatyta) | Išgalvotas servisas „Automatas“, pavyzdiniai kontaktai ir **pavyzdinis kainoraštis** |
| `autodaliu-pasaulis`   | UAB „Autodalių pasaulis“ (Plungė) – tikri kontaktai, **be kainų, darbo valandų ir atsiliepimų** |

PowerShell:

```powershell
$env:NEXT_PUBLIC_SITE="autodaliu-pasaulis"; npm run dev
```

## Naujas servisas (pvz. Telšiuose ar Šiauliuose)

1. Nukopijuokite `src/config/brands/automatas.ts` į `src/config/brands/<id>.ts`.
2. Pakeiskite pavadinimą, miestą (`city.name`, `city.locative` – pvz. „Telšiuose“), adresus, telefonus.
3. Užregistruokite jį `src/config/site.ts` objekte `brands`.
4. `prices: null` – kainoraštis nerodomas; `hours` – rodyti tik patvirtintas darbo valandas.

SEO frazės („autoservisas Plungėje“, „autodalys Plungėje“, „automobilių remontas Plungėje“) sugeneruojamos automatiškai iš `city.locative`.

## Formos

Kol `forms: null`, formos **nieko nesiunčia** – lankytojui parodoma, kad tai demonstracinė versija, ir pasiūloma paskambinti.

Formoms įjungti (laiškai ateina į el. paštą, savo serverio nereikia):

- **Web3Forms**: web3forms.com įveskite el. paštą, gausite *Access Key* → `forms: { type: "web3forms", accessKey: "..." }`
- **Formspree**: formspree.io sukurkite formą → `forms: { type: "formspree", formId: "xxxxxxx" }`

Raktas nėra slaptas – jis skirtas būti svetainės kode. Tikros įmonės svetainėje formas junkite tik su įmonės sutikimu.

## Nuotraukos

`src/content/photos.ts` – iliustracinės Unsplash nuotraukos, svetainėje pažymėtos „Iliustracija“.
Tikras įmonės nuotraukas įkelkite į `public/photos/` ir nustatykite `demo: false`.

## Indeksavimas

Kol `isDemo: true`, svetainė pažymėta `noindex`, o `robots.txt` draudžia indeksuoti – kad demonstracija nekonkuruotų su tikra įmonės svetaine.

Nakon analize postojeće aplikacije, evo prioritetnih smjernica koje bi unaprijedile korisničko iskustvo, olakšale administraciju i podigle profesionalni dojam stranice. Predlažem provedbu u 4 faze, s tim da prvu fazu (sigurnost i tehničku osnovu) ne bih odgađao.

## Faza 1 — Kritični fixevi i tehnička osnova

1. **Zaštita admin rute od indeksiranja**
   - Dodati `noindex` meta tag na `/admin` ruti i/ili `Disallow: /admin` u `public/robots.txt`.
   - Trenutno `robots.txt` dopušta sve botovima sve URL‑ove, što nije poželjno za admin sučelje.

2. **Sigurnosna zamjena admin autentifikacije**
   - Trenutna rješenja (`admin-news` Edge Function) koristi dnevno rotirajući hash `username:password:date` umjesto pravog JWT‑a.
   - Predlažem migraciju na **Supabase Auth** (email/password ili magic link) + `user_roles` tablica + `SECURITY DEFINER` RLS provjere, sukladno projektnim sigurnosnim pravilima.
   - Uspostaviti uloge (`admin`, `editor`) u zasebnoj tablici — ne na `profile`/`users` tablici.

3. **Sitemap i SEO dinamičkih sadržaja**
   - `public/sitemap.xml` trenutno sadrži samo 4 statičke stranice. Treba generirati sitemap koji uključuje dinamičke članke (`/vijesti/:id`) i galerije (`/galerija/:id`), najbolje kroz Edge Function ili build‑time skriptu.
   - Dodati `lastmod` i bolju `changefreq`/`priority` logiku.

4. **Analytics**
   - Trenutno nema nikakvog praćenja posjetitelja. Predlažem ugradnju **Plausible** (jednostavan, GDPR‑prijateljski) ili **GA4** putem Cloud secrets, bez kolačića za osobne podatke ako je to moguće.

## Faza 2 — Admin panel i podaci "iz baze", a ne iz koda

1. **Premjestiti statistiku i rezultate u Supabase**
   - Trenutno se podaci o utakmicama, tablici i igračkim statistikama čuvaju u komponentama (`Statistics.tsx`, `Results.tsx`). Svaka promjena rezultata zahtijeva novi build.
   - Predlažem tablice:
     - `matches` (datum, domaćin, gost, rezultat, sezona, natjecanje, link na prijenos, status)
     - `standings` (pozicija, klub, pobjede, porazi, koševi, bodovi, sezona)
     - `players` (ime, broj, pozicija, rođen, visina, slika, aktivnost) — sada vjerojatno u kodu
   - Sve nove tablice s RLS + GRANT + RESTRICTIVE policy blokom, slično kao `news`/`galleries`.

2. **Proširiti admin panel za upravljanje utakmicama, tablicom i igračima**
   - Dodati odjeljke u `/admin` za CRUD utakmica, stanja tablice, igrača i kategorija.
   - Koristiti postojeći pattern s bulk uploadom slika, drop‑zonama i kategorijama.

3. **Automatizacija ažuriranja (opcionalno, kasnije)**
   - Već postoji "Match Automation" feature prema memoriji. Kad se podaci premjeste u bazu, Edge Function + Firecrawl može ažurirati `matches` i `standings` tablice automatski.

## Faza 3 — Funkcionalnosti koje poboljšavaju korisničko iskustvo

1. **Kalendar/raspored utakmica**
   - Nova stranica ili sekcija s nadolazećim utakmicama, filterom po sezoni i natjecanju, te linkom na YouTube prijenos nakon utakmice.

2. **Arhiva prijenosa i video galerija**
   - Povezivanje YouTube linkova s karticama utakmica i izdvajanje video arhive na vlastitoj stranici.

3. **Pretraga i filtriranje vijesti/galerija**
   - Filtriranje vijesti po kategoriji već postoji, ali nedostaje pretraga po ključnoj riječi i paginacija na stranici vijesti (trenutno je beskonačna vertikalna lista).

4. **Newsletter / obavijesti o novim člancima**
   - Pretplata na email obavijesti o novim vijestima ili nadolazećim utakmicama. Može se slati kroz Resend (već verificirana domena `kkposusje.ba`) putem Edge Function.

5. **Cookie consent banner**
   - Ako se uvede analytics, obavezno je transparentno obavijestiti korisnike i pamtiti izbor. Dizajn u klupskim crno‑žutim bojama.

6. **Bolja navigacija i "scroll to section"**
   - Dodatak "sticky" navigacije na mobilnim uređajima, te brzi linkovi na početnu sekciju (vijesti, raspored, kontakt).

## Faza 4 — Dizajn i performance

1. **Lazy loading slika**
   - Dodati `loading="lazy"` na sve slikovne elemente izvan viewporta, osobito u galeriji, timu i vijestima. Razmotriti `decoding="async"`.

2. **Code splitting ruta**
   - `/admin` i `/statistika` su velike datoteke (1000+ linija) koje se trenutno učitavaju u početnom bundleu. Predlažem `React.lazy` + `Suspense` u `App.tsx` za te rute.

3. **Accessibility audit**
   - Dodati nedostajuće `alt` atribute na slikama u `Team.tsx`, `Gallery.tsx`, `GalleryPage.tsx`.
   - Provjeriti kontrast teksta, fokus stanja i ARIA labele na gumbima/strelicama.

4. **Mikroanimacije i vizualna raznolikost**
   - Više hover stanja, skeleton loadera za asinkrono učitane admin vijesti, te finije prijelaze između stranica.

5. **Konzistentnost dizajna**
   - Koristiti isključivo semantičke tokene (`bg-secondary`, `text-primary`, `text-muted-foreground`) — ne hardkodirati boje. Ovo je već uglavnom prisutno, ali vrijedi provjeriti nakon novih značajki.

## Što je potrebno odlučiti prije početka

- Koju fazu želiš prvu implementirati? Preporučujem **Fazu 1 + Faza 2** zajedno jer su sigurnost i admin osnova za sve daljnje funkcionalnosti.
- Želiš li zadržati trenutni crno‑žuti klupski dizajn, ili razmotriti veći redesign?
- Ima li prioritetnih funkcionalnosti koje bi želio odmah (npr. raspored utakmica, newsletter, video arhiva)?

Ako odobriš smjer, sljedeći korak je detaljan plan za prvu fazu s konkretnim datotekama, tablicama i migracijama.
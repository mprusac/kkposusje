
Ispod je gotov prompt koji možeš zalijepiti u drugi Lovable projekt. Ne dira ništa na HKK Posušje stranici — samo opisuje što treba napraviti tamo.

---

# Prompt za drugi projekt

Nadogradi postojeći admin panel (koji već ima Vijesti i Galerije) i dodaj dvije nove sekcije: **Utakmice** i **Igrači**. Sve mora ići preko Lovable Cloud (Supabase) — tablice, storage, RLS i Edge Functions sa service_role ključem. Admin login ostaje isti kao sada (username/password iz Cloud secrets, token-based auth, token vrijedi 7 dana). Dizajn prilagodi bojama i tipografiji postojećeg projekta, ali **struktura, funkcionalnosti i UX moraju biti identični** onome što je opisano dolje.

Cijeli admin panel neka bude na `/admin` ruti, organiziran u **4 stupca** (Vijesti, Galerije, Utakmice, Igrači), s posebnim naslovom svake sekcije i gumbom "Natrag" gore lijevo koji vraća korisnika na prethodnu poziciju (koristi `sessionStorage` za scroll poziciju).

## 1) Nadogradnja postojeće sekcije VIJESTI

Dodaj/promijeni sljedeće u formi za dodavanje i uređivanje vijesti:

- **Pozicija naslovne slike** — padajući izbornik s opcijama na hrvatskom: `Vrh`, `Sredina`, `Dno`. Vrijednost se sprema u kolonu `image_position` (`top` / `center` / `bottom`) i primjenjuje se kao Tailwind `object-top` / `object-center` / `object-bottom` na naslovnoj slici u karticama vijesti.
- **Textbox za sažetak (excerpt)** — napravi `AutoResizeTextarea` komponentu koja po defaultu ima `rows={6}` (duplo više nego prije) i automatski se produljuje prema dolje kako korisnik piše duži tekst (`onInput` postavlja `height = scrollHeight`).
- **Upload naslovne slike** — zamijeni obični `<input type="file">` s **DropZone** komponentom koja podržava i klik i drag-and-drop. Vizualno neka izgleda kao istaknuti gumb/kartica s ikonom i tekstom "Povuci sliku ovdje ili klikni za odabir". Prihvaća samo slike. Upload ide preko `signed-upload` endpointa (service role vrati signed upload URL, klijent uploada direktno u bucket).
- **Kategorije** — dodaj padajući izbornik postojećih kategorija + polje/gumb "Dodaj novu kategoriju" koji dinamički dopušta unos nove vrijednosti.
- **Pinned** — checkbox koji označava vijest kao pinned.
- U listi vijesti u admin panelu prikazuj **zadnjih 10 vijesti** s malim thumbnail-om slike u kartici i u modalu za uređivanje.

## 2) Nadogradnja postojeće sekcije GALERIJE

- **DropZone** za slike (isti kao kod vijesti) s podrškom za **bulk upload** — korisnik može odjednom povući ili odabrati više datoteka; svaka se uploada zasebno preko signed URL-a i dodaje u `images` array galerije.
- **Naslovna slika galerije (cover_image)** — dodaj poseban upload (isto DropZone, jedna slika) koji se koristi kao naslovna kartica galerije na javnoj stranici. Ako nije zadana, fallback je prva slika iz `images`.
- U listi galerija u admin panelu prikaži **sve galerije** s thumbnailom naslovne slike, brojem slika, datumom, gumbima Uredi / Obriši.
- U modalu za uređivanje: mogućnost brisanja pojedinih slika iz galerije, promjene redoslijeda, promjene naslovne slike i naslova/datuma.

## 3) NOVA sekcija: UTAKMICE

Napravi kompletno od nule.

### Baza (Supabase migration)

Tablica `public.matches`:
- `id uuid PK default gen_random_uuid()`
- `match_date date NOT NULL`
- `opponent text NOT NULL`
- `is_home boolean NOT NULL default true`
- `posusje_score integer` (nullable — ako je null, utakmica je nadolazeća) — preimenuj u svoj kontekst ako klub nije Posušje, npr. `home_team_score` prema potrebi; zadrži logiku "naš tim vs protivnik"
- `opponent_score integer` (nullable)
- `competition text NOT NULL default 'liga'` (`'liga'` ili `'kup'`)
- `youtube_link text`, `sofascore_link text`, `opponent_logo_url text`
- `created_at`, `updated_at` timestampz s triggerom
- **GRANTs** u istoj migraciji: nakon CREATE TABLE odmah `GRANT SELECT ON public.matches TO anon, authenticated;` `GRANT ALL ON public.matches TO service_role;`
- Zatim `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` i policies: SELECT za sve (`using (true)`), restrictive INSERT/UPDATE/DELETE za `anon` i `authenticated` sa `false` (sve pisanje ide isključivo preko Edge Functiona sa service_role).

Storage bucket `team-logos` (public read) za logoe protivničkih ekipa.

### Edge Function `admin-matches`

Endpointi: `list`, `create`, `update`, `delete`, `signed-upload` (za `team-logos`). Svi zahtijevaju admin token (7-day rolling token kao ostale funkcije). `sanitize()` funkcija koja pretvara scoreove u int ili null, trimma stringove, forsira competition na `'liga'` ili `'kup'`.

### Admin UI — MatchForm

- **Datum** — `<input type="date">` s custom `Calendar` ikonom bijele boje **desno** uz tekst (native picker se otvara klikom na cijeli input). Native indicator sakrij CSS-om, custom ikonu pozicioniraj `absolute right-3` i klik na nju forsira `showPicker()`.
- **Padajući izbornik protivnika** — lista tvojih klupskih rivala; **ispred svakog naziva prikaži logo** ekipe (statički mapirani logoi + fallback na `opponent_logo_url` iz baze).
- **Domaćin / gost** — toggle ili radio.
- **Rezultat** — dva broja (naš i protivnički); prazno = nadolazeća utakmica.
- **Natjecanje** — Liga ili Kup. U prikazu koristi "badge" stila:
  - tamno zlatna pozadina (`bg-gold-dark` — dodaj utility ako ne postoji), bijeli tekst,
  - iza teksta "Kup" prikaži emoji 🏆,
  - iza teksta "Liga" prikaži logo lige (statički import).
- **YouTube link** — pored polja prikaži custom SVG YouTube logo (crveni popunjeni, bez bijelih okvira).
- **SofaScore link** — pored polja SofaScore logo.
- **Upload logotipa protivnika** — DropZone koji uploada u `team-logos` bucket i sprema URL u `opponent_logo_url`. U preview prikazu logo neka bude **kružan** i po dimenzijama identičan onome što se prikazuje u karticama utakmica na javnoj stranici.

### Admin UI — Lista utakmica

Kartice s: datum, badge natjecanja (isti stil kao gore), naš tim vs protivnik s logoima, rezultat (ili "Nadolazeća"), gumbi Uredi / Obriši, ikone YouTube/SofaScore ako linkovi postoje.

### Frontend integracija

Napravi `src/lib/adminMatches.ts` s tipovima `MatchRow`, `DisplayMatch`, funkcijama `fetchMatches()`, `toDisplay()`, `buildForm()`, `getTeamLogoFor()`, i statičkom mapom `staticTeamLogos` za logoe rivala. Sve javne komponente (npr. "Zadnje utakmice", tablica utakmica, "Nedavna forma") fetchaju iz Supabasea umjesto iz hardkodiranog niza.

## 4) NOVA sekcija: IGRAČI

### Baza

Tablica `public.players`:
- `id uuid PK`
- `name text NOT NULL`
- `position text`
- `description text`
- `image_url text`
- `jersey_number integer`
- `statistics jsonb NOT NULL default '[]'` — array objekata `{ label: string, value: string }`
- `sort_order integer NOT NULL default 0`
- `created_at`, `updated_at`
- **GRANTs** + RLS iste logike kao `matches` (public SELECT, sve pisanje samo preko Edge Functiona).

Storage bucket `player-images` — **mora imati public SELECT policy** na `storage.objects` da slike ne vraćaju 404 nakon uploada.

### Edge Function `admin-players`

Endpointi: `list` (sortirano po `sort_order` pa `created_at`), `create`, `update`, `delete`, `signed-upload`. Isti auth mehanizam. `sanitize()` čisti statistiku — filtrira prazne labele i pretvara sve vrijednosti u trimmed string.

### Admin UI — PlayerForm

- Ime, pozicija (padajući izbornik), broj dresa, opis (autoresize textarea), sort_order.
- **Slika igrača** — DropZone upload u `player-images` bucket; preview mora biti u istom formatu kao na javnoj stranici (npr. portret s crop-om).
- **Statistika** — dinamička lista redova `{ label, value }` s gumbima "Dodaj stat" i "Ukloni". Label je slobodan tekst (npr. "Poeni po utakmici"), value tekstualno polje.

### Admin UI — Lista igrača

Prikazuj **sve igrače** kao kartice s thumbnailom, imenom, brojem dresa, pozicijom, gumbima Uredi / Obriši. Unutar modala za uređivanje slika je vidljiva.

### Frontend integracija

Komponenta "Tim" / "Igrači" na javnoj stranici fetcha iz Supabasea (`fetchPlayers()`), ne iz hardkodiranog niza.

## 5) Zajednička pravila

- **Nikad ne hardkodiraj admin credentials** — koristi Cloud secrets `ADMIN_USERNAME` i `ADMIN_PASSWORD`. Login endpoint vraća token koji je hash od `username:password:YYYY-MM-DD`; verify prihvaća tokene današnjeg dana i 6 prethodnih dana (rolling 7-day window).
- **Svaki CREATE TABLE u public schemi mora u ISTOJ migraciji dobiti GRANTs prije ENABLE RLS i policies.** Bez toga Data API vraća permission error.
- Sve pisanje u bazu ide isključivo preko Edge Functiona sa `SUPABASE_SERVICE_ROLE_KEY`; klijent nikad ne piše direktno.
- Storage upload ide preko `signed-upload` endpointa (server izda signed URL, klijent PUT-a datoteku).
- Sav UI tekst na **hrvatskom**.
- Dizajn (boje, fontovi, radiusi) prilagodi postojećem design systemu drugog projekta — ne kopiraj boje s HKK Posušje stranice. Layout, komponente i tijek rada moraju ostati isti.
- Nakon svake nove tablice regeneriraj TypeScript tipove i tek onda piši kod koji ih koristi.

Kad završiš, u footeru dodaj brzi link "Admin" koji vodi na `/admin`, i osiguraj da je `/admin` blokiran u `robots.txt` te ima `noindex` meta tag.

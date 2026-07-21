## Cilj

U admin panelu dodati odjeljak **Utakmice** koji omogućuje dodavanje/brisanje odigranih utakmica. Promjene se automatski reflektiraju na:
- Početnoj (`Results.tsx` — "Zadnje utakmice")
- Statistici (`pages/Statistics.tsx` — "Utakmice" tablica + "Nedavna forma")

## Povratne informacije na tvoj plan

Plan je dobar, ali evo par stvari koje fale ili treba razjasniti:

1. **Migracija postojećih utakmica** — trenutno je ~15 utakmica hardkodirano u `Results.tsx` i `Statistics.tsx`. Prijedlog: automatski seed-ati sve u novu tablicu `matches` pri prvoj migraciji, pa admin ima kompletan popis od starta (može brisati što želi). Kod se onda oslanja isključivo na bazu.

2. **Domaća vs. gostujuća** — mora postojati toggle "Igramo doma / u gostima" jer se logika kartice i tablice mijenja (redoslijed timova i logotipa).

3. **Nedavna forma se izvodi automatski** iz zadnjih 5 utakmica po datumu (W/L + rezultat) — ne treba je posebno unositi. Trenutno je hardkodirana; prebacit ću ju na izračun iz baze.

4. **Predstojeće utakmice** — trenutno `Statistics.tsx` ima i `isUpcoming` utakmice (bez rezultata). Predlažem da forma podržava i to: ako ne upišeš rezultat, utakmica je "predstojeća".

5. **Validacija** — datum u formatu `DD.MM.YYYY.`, rezultati kao ne‑negativni brojevi, YouTube/SofaScore URL-ovi opcionalni ali validirani.

6. **Sortiranje** — utakmice u bazi po `match_date` desc; forma uzima zadnjih 5 odigranih.

7. **Sigurnost** — pisanje samo preko edge funkcije `matches-admin` sa service role (isti pattern kao vijesti/galerije). Javno čitanje dopušteno (SELECT policy za `anon` + `authenticated`).

8. **Brisanje** — u admin listi svaka utakmica ima gumb "Obriši" s potvrdom (AlertDialog). Nema soft-delete — jednostavno DELETE.

## Što ću implementirati

### 1. Baza (`matches` tablica)

Kolone: `id`, `match_date` (date), `opponent` (text — jedan od ponuđenih klubova), `is_home` (bool), `posusje_score` (int, nullable → predstojeća), `opponent_score` (int, nullable), `competition` (enum: `liga` | `kup`), `youtube_link` (text, nullable), `sofascore_link` (text, nullable), `created_at`, `updated_at`.

Policies: javni SELECT; INSERT/UPDATE/DELETE zabranjeni za anon/authenticated (samo service_role preko edge funkcije).

Seed migracija ubacuje sve postojeće utakmice iz `Results.tsx` + `Statistics.tsx`.

### 2. Edge funkcija `matches-admin`

Iste provjere admin kredencijala kao `news-admin` (ADMIN_USERNAME/ADMIN_PASSWORD secrets). Akcije: `list`, `create`, `update`, `delete`.

### 3. Admin UI (`/admin`)

- Nova kartica na dashboardu: **Utakmice** (pored Vijesti i Galerija)
- Ruta `/admin/utakmice` — lista svih utakmica sa gumbom "Obriši" i "Dodaj novu"
- Forma:
  - Padajući izbornik **Protivnik** — popunjen svim timovima iz `teamLogos` mape (Grude, Ljubuški, Mostar, Rama, Široki II, Tomislav, Čapljina + mogućnost dodavanja novog s uploadom logotipa u `team-logos` bucket)
  - Toggle **Domaća / Gostujuća**
  - Datum (DatePicker → format `DD.MM.YYYY.`)
  - Rezultat Posušje / Rezultat protivnika (ostavi prazno = predstojeća utakmica)
  - Radio: **Liga KSHB** / **Kup KSHB 🏆**
  - YouTube link (opcionalno)
  - SofaScore link (opcionalno)

### 4. Frontend refactor

- Novi `src/lib/adminMatches.ts` (fetch + mapiranje iz baze u postojeći `MatchResult` / `Match` shape)
- `Results.tsx`: uklonjen hardkodirani `results` array, čita iz Supabase; dizajn kartica ostaje **identičan**
- `pages/Statistics.tsx`: `matches` i `formData` se izvode iz baze; `formData` = zadnjih 5 odigranih, mapirano u W/L kao dosad
- Loading state (skeleton) dok podaci ne stignu

### 5. Novi timovi / logotipi

Ako admin dodaje protivnika kojeg nema, upload logotip u `team-logos` bucket. Mapa `teamLogos` postaje dinamična (spaja hardkodirane + URL-ove iz baze).

## Tehnički detalji

```
supabase/
  migrations/<ts>_matches.sql       -- CREATE TABLE + GRANT + RLS + seed
  functions/matches-admin/index.ts  -- CRUD s admin auth
src/
  lib/adminMatches.ts               -- fetch + tip mapping
  pages/AdminMatches.tsx            -- lista + forma
  components/admin/MatchForm.tsx
  components/Results.tsx            -- refactor na async
  pages/Statistics.tsx              -- refactor na async
```

Redoslijed migracije: `CREATE TABLE public.matches` → `GRANT SELECT` za anon+authenticated, `GRANT ALL` za service_role → `ENABLE RLS` → `CREATE POLICY` (samo public SELECT) → seed `INSERT`.

## Otvoreno pitanje

Želiš li da admin može i **editirati** postojeću utakmicu (npr. ispraviti rezultat), ili samo dodati/brisati? Preporučujem edit — inače ispravka znači obriši + ponovno dodaj.
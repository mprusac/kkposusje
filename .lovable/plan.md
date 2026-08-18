# Automatsko osvježavanje nedavne forme nakon dodavanja utakmice

## Kako je sada
Nedavna forma na stranici Statistika već se računa iz utakmica u bazi (`buildForm` nad zadnjih 7 odigranih utakmica, redoslijed po datumu). Problem je što se podaci dohvaćaju samo jednom, pri učitavanju stranice — nova utakmica dodana u admin panelu vidi se tek nakon ručnog osvježavanja.

## Što ću napraviti
1. Uključiti live osvježavanje za tablicu utakmica u bazi, tako da svaka promjena (dodavanje, uređivanje, brisanje) odmah stigne do otvorenih stranica.
2. Statistika i sekcija „Zadnje utakmice" na početnoj automatski ponovno učitavaju utakmice kad se dogodi promjena, te i kad se korisnik vrati na karticu preglednika.
3. Nedavna forma, tablica utakmica i kartice utakmica time se ažuriraju istog trena — pobjeda/poraz, rezultat, protivnik i logo protivnika.
4. Utakmice bez upisanog rezultata i dalje se tretiraju kao nadolazeće i ne ulaze u formu; forma prikazuje zadnjih 7 odigranih, najnovija prva.

## Tehnički detalji
- Migracija: `ALTER PUBLICATION supabase_realtime ADD TABLE public.matches;` (uz `REPLICA IDENTITY FULL`).
- Novi hook (npr. `useMatches`) u `src/lib/adminMatches.ts` ili `src/hooks/`: dohvat + realtime kanal na `postgres_changes` za `public.matches`, uz čišćenje kanala pri unmountu i refetch na `visibilitychange`/`focus`.
- Korištenje hooka u `src/pages/Statistics.tsx` (zamjena jednokratnog `useEffect` + `fetchMatches`) i u `src/components/Results.tsx`.
- Bez promjena u dizajnu i rasporedu.

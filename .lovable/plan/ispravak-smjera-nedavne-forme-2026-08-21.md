# Ispravak smjera nedavne forme

## Što treba popraviti
Nedavna forma na stranici Statistika trenutno prikazuje utakmice s lijeva na desno od najnovije prema najstarijoj. Korisnik želi obrnuti redoslijed: najstarija utakmica lijevo, najnovija desno.

## Rješenje
U `src/pages/Statistics.tsx` promijeniti redoslijed `formData` polja tako da se prije prikaza obrne (`[...formData].reverse()`). Time najstarija utakmica bude prva (lijevo), a najnovija zadnja (desno), bez promjene logike u `buildForm` funkciji koja se koristi i na drugim mjestima.

## Datoteke koje se mijenjaju
- `src/pages/Statistics.tsx` — obrnuti redoslijed `formData` prije mapiranja u prikaz.

## Što se NE mijenja
- Dizajn, boje, veličine i animacije stupaca ostaju iste.
- Logika `buildForm` u `src/lib/adminMatches.ts` ostaje nepromijenjena.

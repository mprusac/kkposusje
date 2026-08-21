# Bijeli preview — dijagnostika i sanacija

## Što je provjereno
- Dev poslužitelj radi (HTTP 200) i stranica se u testnom pregledniku unutar sandboxa potpuno renderira: navigacija, hero, "Zadnje utakmice" s podacima iz baze.
- U konzoli nema fatalnih grešaka — samo React upozorenja tipa "Function components cannot be given refs" koja dolaze iz dev alata i ne ruše prikaz.

Zaključak: kod je ispravan, bijeli ekran je na strani tvog preglednika / preview okvira (zaostali cache ili prekinuta veza preview iframea).

## Koraci
1. Ti prvo probaj (bez izmjena koda):
   - Hard refresh preview kartice (Ctrl+Shift+R / Cmd+Shift+R).
   - Otvori preview link u novoj kartici: https://id-preview--a5b83e19-4bb3-40b1-902f-7ac0613dd656.lovable.app
   - Probaj drugi preglednik ili anoniman prozor (ekstenzije za blokiranje znaju blokirati iframe).
2. Ako je i dalje bijelo, ja radim:
   - Restart dev poslužitelja i provjeru da se ponovno diže bez grešaka.
   - Ponovnu provjeru učitavanja stranice i konzole u pregledniku te izvještaj o točnom uzroku.
3. Ako se pokaže stvarna greška u kodu (npr. pucanje pri dohvatu podataka), dodajem error boundary oko aplikacije da se umjesto bijelog ekrana prikaže poruka i gumb za osvježavanje.

## Tehnički detalji
- Nema promjena u dizajnu ni funkcionalnostima stranice.
- Eventualni error boundary bio bi novi `src/components/ErrorBoundary.tsx` omotan oko `<App />` u `src/main.tsx`, u stilu kluba (mat crna + zlatna).

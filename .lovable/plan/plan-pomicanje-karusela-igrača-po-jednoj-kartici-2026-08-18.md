# Plan: Pomicanje karusela igrača po jednoj kartici

## Cilj
Prilikom klika na lijevu/desnu strelicu u sekciji "Naš tim", karuselo se pomakne za točno jednu karticu igrača — bez djelomično vidljivih kartica.

## Trenutno stanje
- Na mobilnoj verziji karusel već koristi `scrollToIndex(index)` pa pomak ide po jednoj kartici.
- Na desktop verziji koristi `scrollBy({ left: ±300 })`, što je manje od širine kartice + razmaka, pa se kartice zaustavljaju na pola.

## Promjene
1. **U `src/components/Team.tsx`:**
   - Ujednačiti logiku klika na strelice za desktop i mobilnu verziju: uvijek koristiti `activeIndex` i `scrollToIndex`.
   - `scrollToIndex` postavlja `scrollLeft` na `targetCard.offsetLeft`, čime se lijevi rub ciljane kartice poravna s lijevim rubom vidljivog područja.
   - Dodati praćenje `activeIndex` i na desktopu, te onemogućiti lijevu strelicu na početku i desnu na zadnjem igraču (kao što je već na mobilnoj).
   - Ukloniti zasebnu desktop granu u `scroll()` funkciji.

## Provjera
- Ručno testirati klikove na strelice u pregledu: svaki klik pomakne karusel za točno jednu karticu.
- Provjeriti da zadnja kartica nije djelomično izrezana.

## Datoteke koje se mijenjaju
- `src/components/Team.tsx`

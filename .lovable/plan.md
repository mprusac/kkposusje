# Plan: Postavi naziv kartice na "HKK Posušje" na svim stranicama

## Cilj
Na svakoj stranici aplikacije naziv kartice u pregledniku mora uvijek biti točno "HKK Posušje", bez dodataka poput "— Službena web stranica", "— KK Posušje" ili naziva pojedine stranice.

## Trenutno stanje
- `index.html` postavlja `<title>Košarkaški klub Posušje</title>`.
- Komponenta `src/components/SEO.tsx` prima `title` prop i postavlja ga u `<title>`, pa svaka stranica ima različit naziv kartice.
- Stranice `Index.tsx`, `Statistics.tsx`, `NewsPage.tsx`, `GalleryPage.tsx` šalju različite `title` prope.

## Promjene
1. **Ažurirati `index.html`**: promijeniti `<title>` u `HKK Posušje`.
2. **Ažurirati `src/components/SEO.tsx`**: ignorirati primljeni `title` prop za `<title>` element i uvijek koristiti fiksni string `HKK Posušje`. Ostale meta oznake (`og:title`, `twitter:title`, opisi, kanonski URL, JSON-LD) ostaju dinamički kako ne bi narušili SEO.
3. **(Opcionalno) Ažurirati `og:site_name` u `index.html`**: postaviti na `HKK Posušje` radi dosljednosti.

## Provjera
- Otvoriti `/`, `/statistika`, `/vijesti`, `/galerija` i `/admin` te provjeriti da naziv kartice u pregledniku uvijek glasi `HKK Posušje`.

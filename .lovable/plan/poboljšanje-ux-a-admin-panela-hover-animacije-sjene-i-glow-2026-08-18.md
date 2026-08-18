# Poboljšanje UX-a admin panela: hover, animacije, sjene i glow

Cilj: admin panel dobiva isti "premium" osjećaj kao javna stranica (mat crno + zlatno), bez promjene funkcionalnosti.

## Što se mijenja

**Kartice (vijesti, galerije, utakmice, igrači)**
- Blagi lift na hover (podizanje + zlatni rub), meki prijelaz 200-300ms.
- Suptilna zlatna glow sjena na hover umjesto ravnog izgleda.
- Slika unutar kartice lagano zumira na hover.
- Ulazna animacija: kartice se pojavljuju fade-in + slide-up, s malim kaskadnim odmakom.

**Gumbi i ikone**
- Primarni (zlatni) gumbi: glow na hover, blagi scale, "press" efekt na klik.
- Ikone uredi/obriši: pojavljuju se izraženije na hover kartice, crvena za brisanje dobiva blagi glow.
- Gumb "Natrag" i header dobivaju smooth prijelaz boje.

**Forme (nova vijest / galerija / utakmica / igrač)**
- Inputi i textarea: zlatni focus ring s mekim glow-om i prijelazom.
- DropZone: animirani isprekidani rub, zlatna pozadina i scale kad se datoteka povlači iznad njega.
- Thumbnailovi uploada: hover zoom + tamni overlay s gumbom za uklanjanje.

**Zaglavlja i sekcije**
- Naslovi stupaca: suptilan gradijent teksta / zlatna linija koja se animira.
- Sticky header: sjena se pojavljuje tek kad se stranica skrola.

**Stanja**
- Loading: skeleton pulse umjesto praznog prostora.
- Prazne liste: blago animirana poruka.
- Prijelaz između dashboarda i formi: fade/slide animacija.

## Tehnički detalji

- Novi utility klase u `src/index.css` (npr. `.admin-card`, `.admin-glow`, `.admin-input`) koje koriste postojeće tokene `--gold`, `--shadow-gold`, `--gradient-gold` — bez hardkodiranih boja.
- Nove keyframe animacije (`fade-in-up`, kaskadni delay) u `tailwind.config.ts`.
- `src/pages/AdminPanel.tsx`: zamjena statičnih `className` na karticama, gumbima, inputima i DropZoneu novim klasama; dodavanje `group`/`group-hover` obrazaca.
- Poštuje se `prefers-reduced-motion` — animacije se isključuju za korisnike koji to traže.
- Bez promjena u edge funkcijama, bazi ili logici CRUD-a.

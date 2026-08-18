# Plan: Zlatne obavijesti u admin panelu

## Cilj
Obavijesti (toastovi) u admin panelu trebaju imati zlatnu/zutu boju umjesto trenutne tamne pozadine.

## Trenutno stanje
- Admin panel koristi `sonner` toast biblioteku (`import { toast } from "sonner"`).
- Sonner `<Toaster>` je konfiguriran u `src/components/ui/sonner.tsx` s tamnom pozadinom (`bg-background`) i bijelim tekstom (`text-foreground`).
- Sonner se koristi isključivo unutar `AdminPanel.tsx`, tako da promjena globalnog Sonner stila neće utjecati na ostatak aplikacije.

## Promjene
1. **Ažurirati `src/components/ui/sonner.tsx`**
   - Pozadina toast-a: `bg-primary` (zlatna).
   - Tekst toast-a: `text-primary-foreground` (tamna).
   - Rub toast-a: zlatna nijansa (`border-primary` ili `border-primary/50`).
   - Opisni tekst: prilagoditi da ostane čitljiv na zlatnoj pozadini.
   - Gumbi za akciju/poništi: zadržati kontrastne boje.

2. **Po potrebi prilagoditi pozive `toast(...)` u `AdminPanel.tsx`**
   - Ako Sonner komponenta sama ne osigura željeni izgled, dodati `className` na pojedinačne toast pozive ili stvoriti mali `adminToast` wrapper koji uvijek šalje zlatne obavijesti.

## Provjera
- Pokrenuti build (`bun run build` ili ekvivalent) kako bi se potvrdilo da nema grešaka.
- U admin panelu izazvati neku obavijest (npr. spremanje igrača) i provjeriti da je pozadina zlatna, a tekst taman i čitljiv.

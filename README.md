# Pizza Seba — site Next.js

Site-ul complet pentru **Seba — Pizzeria e Trattoria** (Str. Mureșului nr. 14, Cluj-Napoca):
acasă, meniu cu fereastră de detalii pentru fiecare produs, pagini de produs, coș și finalizare comandă,
despre noi, rezervări, contact și paginile legale.

- **Next.js 16** (App Router, TypeScript), **Tailwind CSS 4**
- **GSAP 3** (ScrollTrigger, SplitText) + **Lenis** pentru smooth scroll
- Fonturi incluse în proiect (Cormorant Garamond + Manrope, cu diacritice românești), fără Google Fonts
- Toate paginile sunt generate static, deci se încarcă foarte repede, iar fiecare produs are pagina lui pentru Google
- Responsive: meniu mobil animat, coșul ca panou lateral, detaliile produsului ca „bottom sheet” pe telefon și bară de coș fixă jos

## Pornire locală

Ai nevoie de Node.js 20.9 sau mai nou.

```bash
npm install
npm run dev
```

Deschide http://localhost:3000.

Alte comenzi:

```bash
npm run build      # build de producție (îl face și Vercel)
npm run start      # rulează build-ul local
npm run lint       # ESLint
npm run typecheck  # verificare TypeScript
```

## Urcare pe GitHub

1. Creează un repository gol pe GitHub (fără README), de exemplu `pizza-seba`.
2. În folderul proiectului:

```bash
git remote add origin https://github.com/UTILIZATORUL-TAU/pizza-seba.git
git branch -M main
git push -u origin main
```

(Proiectul are deja un commit inițial. Dacă folderul nu are `.git`, rulează întâi `git init && git add . && git commit -m "Pizza Seba"`.)

## Deploy pe Vercel

1. Intră pe https://vercel.com → **Add New… → Project** → alege repository-ul de pe GitHub.
2. Vercel recunoaște singur Next.js. Nu trebuie schimbat nimic. Apasă **Deploy**.
3. Domeniul: **Settings → Domains** → adaugă `pizzaseba.ro` și urmează instrucțiunile DNS.
4. La fiecare `git push` pe `main`, Vercel face deploy automat.

### Variabile de mediu (opționale)

Comenzile, rezervările și mesajele din formulare ajung la rutele `/api/comanda`, `/api/rezervare` și `/api/contact`.
Implicit sunt scrise doar în **Vercel → Project → Logs**. Ca să vină pe email, adaugă în **Settings → Environment Variables**:

| Variabilă          | Ce face                                                          |
| ------------------ | ---------------------------------------------------------------- |
| `RESEND_API_KEY`   | Cheie de la [resend.com](https://resend.com) (au plan gratuit)   |
| `ORDER_EMAIL_TO`   | Adresa (sau adresele, separate prin virgulă) care primește emailurile |
| `ORDER_EMAIL_FROM` | Expeditorul, după ce verifici domeniul în Resend                 |

Vezi `.env.example`. Codul care trimite emailul e în `src/lib/server/notify.ts`. Acolo se poate lega și altceva (Telegram, un POS, Google Sheets).

## Unde schimbi lucrurile

| Ce                                  | Unde                                    |
| ----------------------------------- | --------------------------------------- |
| Prețuri, ingrediente, produse noi   | `src/lib/menu.ts`                       |
| Telefon, adresă, program, linkuri   | `src/lib/site.ts`                       |
| Pozele produselor                   | `public/images/menu/<slug>.jpg`         |
| Pozele băuturilor                   | `public/images/drinks/`                 |
| Culori și fonturi                   | `src/app/globals.css` (blocul `@theme`) |
| Pagina de acasă                     | `src/app/page.tsx` + `src/components/home/` |
| Textele legale                      | `src/app/termeni-si-conditii/` etc. și `src/components/ui/LegalPage.tsx` |

**Produs nou:** adaugă-l în `src/lib/menu.ts`. Dacă are poză, pune `public/images/menu/<slug>.jpg`
(ideal 1400 × 933 px), iar la pizza marchează ultimul câmp ca `true`. Pagina lui (`/meniu/<slug>`) se creează automat.

Produsele fără poză apar cu un card elegant „Foto în curând”. Momentan sunt: pizza Carbonara, Crudo Rucola,
Quattro Formaggi Special, Sfiziosa, Speck e Ricotta, câteva paste, o salată, Calzone Gourmet, sosurile și câteva băuturi.

## Efecte (GSAP)

| Efect                                                         | Fișier                                   |
| ------------------------------------------------------------- | ---------------------------------------- |
| Titluri care apar rând cu rând (SplitText cu mască)           | `src/components/motion/SplitHeading.tsx` |
| Hero: intrare animată, pizza care plutește, carduri flotante | `src/components/home/Hero.tsx`           |
| Bandă infinită care accelerează după viteza de scroll        | `src/components/motion/Marquee.tsx`      |
| Specialități: scroll orizontal fixat (desktop) / swipe (mobil) | `src/components/home/Specialties.tsx`  |
| Parallax pe imagini                                           | `src/components/motion/Parallax.tsx`     |
| Numere care cresc (40+, 900 g, 6,99)                          | `src/components/motion/CountUp.tsx`      |
| Citat ale cărui cuvinte se „aprind” la scroll                 | `src/components/motion/ScrubWords.tsx`   |
| Butoane magnetice (doar cu mouse)                             | `src/components/motion/Magnetic.tsx`     |
| Apariția elementelor `data-reveal` la scroll                  | `src/components/layout/Providers.tsx`    |
| Smooth scroll (Lenis) sincronizat cu ScrollTrigger            | `src/components/layout/Providers.tsx`    |

Toate animațiile respectă setarea de sistem „Reduce motion”: dacă e activă, conținutul apare direct, fără mișcare.

## De făcut înainte de lansare

- [ ] Copiază textele din Termeni și condiții, Politica de livrare, Politica de confidențialitate și Politica cookies de pe site-ul actual (căutați `[Textul complet…` în pagini).
- [ ] Adaugă linkul real către lista de alergeni, dacă vrei să apară în paginile de produs.
- [ ] Setează variabilele de email (vezi mai sus) ca să primești comenzile pe email.
- [ ] Verifică poza pentru Seba Diamond (`public/images/menu/seba-diamond.jpg`).

## Licențe

Fonturile Cormorant Garamond și Manrope sunt sub SIL Open Font License 1.1. GSAP este gratuit, inclusiv pluginurile
(licență standard GSAP). Pozele aparțin Pizza Seba.

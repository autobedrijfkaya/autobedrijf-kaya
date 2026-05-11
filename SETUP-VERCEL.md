# Stap 5 — Website live zetten via Vercel

Tijd: ongeveer 15 minuten. Je hebt nodig: GitHub account, Vercel account, je domein.

---

## Deel A — Code op GitHub zetten (~5 min)

Vercel haalt je website uit een GitHub-repository. We zetten alle bestanden daar eerst op.

### 1. Project downloaden
Klik in dit projectvenster rechtsbovenin op de **download**-knop (of menu → "Download project as zip"). Pak het zip-bestand uit naar een map op je computer, bijvoorbeeld `autobedrijf-kaya`.

### 2. Nieuwe GitHub repository aanmaken
1. Ga naar **[github.com/new](https://github.com/new)**
2. Repository name: `autobedrijf-kaya`
3. Visibility: **Private** (jouw keuze — Public werkt ook)
4. **Laat de checkboxes onderaan UIT** (geen README, geen .gitignore)
5. Klik **Create repository**

### 3. Bestanden uploaden naar GitHub
1. Op de pagina van je nieuwe (lege) repository klik je op **"uploading an existing file"** (link in het midden van de pagina)
2. Sleep alle bestanden uit je uitgepakte map naar het upload-vak — **inclusief de `assets` map**
3. Onderaan klik je op **Commit changes**

Wacht tot de upload klaar is — je ziet nu al je bestanden in de repository.

---

## Deel B — Vercel project aanmaken (~3 min)

### 1. Inloggen op Vercel
1. Ga naar **[vercel.com](https://vercel.com)** en log in met je GitHub-account
2. Geef Vercel toegang tot je GitHub repositories (eenmalig)

### 2. Project importeren
1. Klik **Add New → Project**
2. Zoek `autobedrijf-kaya` in de lijst en klik **Import**
3. Bij "Configure Project":
   - Framework Preset: **Other** (laten staan)
   - Root Directory: laten staan
   - Build Command: leeg laten
   - Output Directory: leeg laten
4. Klik **Deploy**

Vercel zet de website nu online. Na ~1 minuut zie je een groen vinkje + een preview-link, bijvoorbeeld `autobedrijf-kaya-xyz.vercel.app`.

### 3. Testen
Open de Vercel-link en controleer:
- ✅ Hoofdpagina laadt
- ✅ Aanbod laadt (auto's uit Supabase verschijnen)
- ✅ Admin login werkt (`/admin.html`)
- ✅ Een nieuwe auto toevoegen werkt

---

## Deel C — Eigen domein koppelen (~10 min)

### 1. Domein toevoegen in Vercel
1. In je Vercel project → **Settings → Domains**
2. Vul je domeinnaam in (bv. `autobedrijfkaya.nl`) en klik **Add**
3. Vercel laat zien welke DNS-instellingen je moet aanpassen — bewaar dit scherm open

Meestal zijn dit twee records:
- **A-record** voor `@` (de hoofddomein) → `76.76.21.21`
- **CNAME-record** voor `www` → `cname.vercel-dns.com`

(De exacte waarden staan in jouw Vercel-scherm — gebruik die.)

### 2. DNS aanpassen bij je domeinprovider
1. Log in bij je domeinprovider (de partij waar je het domein hebt gekocht — bv. TransIP, Strato, Hostnet, Vimexx, Mijndomein, etc.)
2. Ga naar het DNS-beheer van je domein
3. **Verwijder** bestaande A-records voor `@` en CNAMES voor `www` als die naar oude hosting wijzen
4. **Voeg toe**:
   - A-record: host `@` → waarde uit Vercel (meestal `76.76.21.21`)
   - CNAME-record: host `www` → waarde uit Vercel (`cname.vercel-dns.com`)
5. Sla op

### 3. Wachten op verificatie
Terug in Vercel → Settings → Domains zie je het domein eerst met "Invalid Configuration", daarna met een groen vinkje wanneer de DNS is doorgevoerd. Dit duurt meestal 5–30 minuten, soms tot 24 uur.

Vercel regelt automatisch HTTPS (SSL-certificaat) — je website is daarna bereikbaar op `https://autobedrijfkaya.nl`.

---

## Bij problemen, laat me weten:
- Welke provider je gebruikt voor je domein (TransIP, Strato, etc.) — dan kan ik specifieke instructies geven
- Eventuele foutmeldingen die je ziet
- Welk deel niet werkt zoals verwacht

## Toekomstige updates
Als ik later iets aan de code aanpas, hoef je niet alles opnieuw te uploaden:
- Je downloadt de aangepaste bestanden uit dit project
- Je sleept ze naar GitHub (in je repo → "Add file" → "Upload files") en commit
- Vercel deployt automatisch binnen 30 seconden — je site is meteen bijgewerkt

# Supabase setup — Autobedrijf Kaya

Volg deze stappen in je Supabase dashboard om de database, opslag en login klaar te zetten.
Tijd: ongeveer 5 minuten.

---

## 1. Database tabel aanmaken

1. Ga in je Supabase project naar **SQL Editor** (links in de sidebar, icoon met `</>`)
2. Klik **New query**
3. Plak onderstaande SQL en klik **Run** (rechtsonder):

```sql
-- Cars tabel
create table public.cars (
  id          uuid primary key default gen_random_uuid(),
  merk        text not null,
  model       text not null,
  uitvoering  text,
  prijs       numeric not null,
  jaar        integer not null,
  brandstof   text,
  km          integer,
  transmissie text,
  kleur       text,
  omschrijving text,
  images      jsonb default '[]'::jsonb,
  created_at  timestamptz default now()
);

-- Iedereen mag het aanbod lezen
alter table public.cars enable row level security;

create policy "Aanbod is openbaar leesbaar"
  on public.cars for select
  using (true);

-- Alleen ingelogde admins mogen schrijven
create policy "Alleen ingelogde gebruikers mogen toevoegen"
  on public.cars for insert
  with check (auth.role() = 'authenticated');

create policy "Alleen ingelogde gebruikers mogen wijzigen"
  on public.cars for update
  using (auth.role() = 'authenticated');

create policy "Alleen ingelogde gebruikers mogen verwijderen"
  on public.cars for delete
  using (auth.role() = 'authenticated');
```

Je hoort onderaan "Success. No rows returned." te zien.

---

## 2. Foto-opslag aanmaken (Storage bucket)

1. Ga naar **Storage** (sidebar)
2. Klik **New bucket**
3. Vul in:
   - **Name:** `car-photos`
   - **Public bucket:** ✅ **AAN** (foto's moeten openbaar zichtbaar zijn)
4. Klik **Create bucket**

Daarna moeten we instellen wie er mag uploaden:

5. Ga terug naar **SQL Editor** → **New query**
6. Plak en run:

```sql
-- Iedereen mag de foto's bekijken (al automatisch omdat de bucket public is)
-- Alleen ingelogde gebruikers mogen uploaden en verwijderen
create policy "Admins mogen foto's uploaden"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'car-photos');

create policy "Admins mogen foto's verwijderen"
  on storage.objects for delete to authenticated
  using (bucket_id = 'car-photos');
```

---

## 3. Admin-account aanmaken

1. Ga naar **Authentication** (sidebar) → **Users**
2. Klik **Add user** → **Create new user**
3. Vul in:
   - **Email:** je eigen e-mailadres
   - **Password:** een sterk wachtwoord (minimaal 8 tekens)
   - **Auto Confirm User:** ✅ **AAN** (anders moet je nog een bevestigingsmail bevestigen)
4. Klik **Create user**

Dit is het account waarmee je op `/admin.html` inlogt om auto's toe te voegen.

> Tip: maak het wachtwoord sterk — iedereen die dit account heeft kan auto's toevoegen, wijzigen en verwijderen.

---

## 4. (Optioneel) E-mail signup uitschakelen

Omdat alleen jij admin moet zijn, kun je publieke registratie uitzetten:

1. Ga naar **Authentication** → **Providers** → **Email**
2. Schakel **Enable sign ups** uit
3. Klik **Save**

Inloggen blijft werken, maar niemand kan zichzelf registreren.

---

## Klaar!

Laat me weten zodra deze 4 stappen klaar zijn — dan kunnen we testen of de website met de database werkt, en daarna live zetten via Vercel.

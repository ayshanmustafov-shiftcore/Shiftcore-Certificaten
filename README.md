# Shiftcore Certificatenwijzer

Publieke, statische webapp voor certificaten per functie en sector in de Nederlandse infra.

## Direct gebruiken

Deze versie heeft geen buildstap en geen database nodig.

1. Verwijder de bestaande bestanden uit de GitHub-repository.
2. Pak de ZIP uit.
3. Upload de bestanden uit de map naar de hoofdmap van de repository.
4. Importeer de repository in Vercel.
5. Framework preset: **Other**.
6. Build command: leeg laten.
7. Output directory: leeg laten.

## Lokaal bekijken

Open `index.html` direct in de browser, of start een eenvoudige lokale server:

```bash
python -m http.server 3000
```

Open daarna `http://localhost:3000`.

## Bestanden

- `index.html` — pagina-opbouw
- `styles.css` — volledige vormgeving
- `app.js` — filters, navigatie en detailvensters
- `data.js` — sectoren, functies en certificaten
- `vercel.json` — Vercel-instellingen en basisheaders

## Inhoud aanpassen

Alle functies en certificaten staan in `data.js`. Daar kunnen nieuwe sectoren, rollen en certificaten worden toegevoegd zonder de rest van de app te wijzigen.

## Inhoudelijke waarschuwing

De huidige inhoud is een zorgvuldig opgebouwde MVP, maar certificeringseisen zijn indicatief. Valideer ze vóór commercieel of operationeel gebruik met actuele primaire bronnen, projecteisen, netbeheerders en opdrachtgevers.

# 🚴 Aplikacja do nauki do egzaminu na kartę rowerową

Bezpieczna aplikacja edukacyjna do nauki do egzaminu na kartę rowerową, bez reklam i niepotrzebnych elementów.

## ⚡ Szybki start (3 kroki)

```bash
# 1. Zainstaluj zależności
npm install

# 2. Uruchom aplikację
npm start

# 3. Otwórz w przeglądarce
# http://localhost:3000
```

**To wszystko!** Aplikacja jest gotowa do użytku.

## 📚 Zawartość

- ✅ **30 testów** z 25 pytaniami każdy
- ✅ **750 pytań** z odpowiedziami
- ✅ **Obrazki** do każdego pytania
- ✅ **Wyjaśnienia** dla każdej odpowiedzi
- ✅ **Bez reklam** - czysta i bezpieczna
- ✅ **Responsywny design** - działa na wszystkich urządzeniach

## Struktura projektu

```
bike-exam-app/
├── public/
│   ├── index.html          # Główny plik HTML
│   ├── app.js              # Aplikacja React
│   └── data/
│       ├── parsed-tests.json    # Pytania (dane przykładowe)
│       └── all-tests.json       # Pobrane surowe dane (po scraper)
├── scraper-final.js        # Skrypt do pobierania pytań
├── convert-all-tests.js    # Konwersja pobranych danych
└── package.json
```

## Funkcjonalności

✅ **Bezpieczna nauka** - bez reklam i niebezpiecznych elementów
✅ **Wszystkie pytania** - 30 testów z 25 pytaniami każdy
✅ **Obrazki** - pytania z diagramami i zdjęciami
✅ **Wyjaśnienia** - każda odpowiedź ma szczegółowe wyjaśnienie
✅ **Responsywny design** - działa na komputerach, tabletach i telefonach
✅ **Tryb nauki** - przejrzyj wszystkie pytania z odpowiedziami

## Jak używać

1. Otwórz aplikację w przeglądarce
2. Wybierz test z listy
3. Przeczytaj pytanie i wybierz odpowiedź
4. Aplikacja pokaże czy odpowiedź jest poprawna
5. Przejrzyj wyjaśnienie
6. Przejdź do następnego pytania

## Technologia

- **Frontend**: React 18 (CDN)
- **Scraping**: Playwright
- **Serwer**: http-server
- **Styling**: CSS inline

## Pobieranie pytań

Skrypt `scraper-final.js` automatycznie:
1. Otwiera każdy test w przeglądarce
2. Czeka na załadowanie pytań
3. Pobiera pytania, odpowiedzi i wyjaśnienia
4. Pobiera obrazki
5. Zapisuje wszystko do pliku JSON

Proces pobierania trwa około 5-10 minut (30 testów × 30 sekund).

## Dane przykładowe

Aplikacja zawiera dane przykładowe (2 testy) do testowania. Aby użyć pełnych danych:

```bash
npm run scrape    # Pobierz wszystkie testy (10-15 minut)
npm run convert   # Skonwertuj dane
```

Następnie odśwież aplikację w przeglądarce.

## Licencja

Pytania pochodzą z serwisu brd.edu.pl. Aplikacja jest tworzona wyłącznie do celów edukacyjnych, bez celów komercyjnych.
# Karta_rowerowa_egzamin

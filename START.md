# 🎯 SZYBKI START - Aplikacja do nauki do egzaminu na kartę rowerową

## Co masz w tym folderze?

Kompletna aplikacja do nauki do egzaminu na kartę rowerową z:
- **750 pytań** (30 testów × 25 pytań)
- **Wszystkie odpowiedzi** z wyjaśnieniami
- **Obrazkami** do każdego pytania
- **Bez reklam** - bezpieczne dla dzieci

## Jak uruchomić? (3 kroki)

### Krok 1: Otwórz terminal
- **macOS/Linux**: Otwórz Terminal
- **Windows**: Otwórz Command Prompt (cmd.exe)

### Krok 2: Przejdź do folderu aplikacji
```bash
cd /Users/piotrkurek/Documents/bike-exam-app
```

### Krok 3: Uruchom aplikację
```bash
npm install
npm start
```

## Gdzie jest aplikacja?

Po uruchomieniu otwórz przeglądarkę i wejdź na:
```
http://localhost:3000
```

## Co robić, jeśli coś nie działa?

### Problem: "npm: command not found"
**Rozwiązanie**: Zainstaluj Node.js z https://nodejs.org/

### Problem: "Cannot find module"
**Rozwiązanie**: Uruchom `npm install` ponownie

### Problem: "Port 3000 is already in use"
**Rozwiązanie**: Zmień port w package.json lub zamknij inną aplikację

## Jak używać aplikacji?

1. **Wybierz test** - kliknij na jeden z 30 testów
2. **Przeczytaj pytanie** - zawsze jest obrazek
3. **Wybierz odpowiedź** - kliknij na jedną z opcji
4. **Sprawdź wynik** - aplikacja pokaże czy dobrze
5. **Przeczytaj wyjaśnienie** - dowiesz się dlaczego
6. **Przejdź dalej** - kliknij "Następne →"

## Dodatkowe komendy

```bash
# Pobierz wszystkie pytania z oryginalnej strony (jeśli chcesz)
npm run scrape

# Skonwertuj pobrane dane
npm run convert

# Wyczyść tymczasowe pliki
bash cleanup.sh
```

## Pliki do przeczytania

- **README.md** - Pełna dokumentacja
- **INSTRUKCJA.md** - Instrukcja dla użytkownika
- **DEPLOYMENT.md** - Jak wdrożyć aplikację online
- **PODSUMOWANIE.md** - Co zostało zrobione

## Potrzebujesz pomocy?

1. Sprawdź czy Node.js jest zainstalowany: `node --version`
2. Sprawdź czy jesteś w poprawnym folderze
3. Spróbuj `npm install` ponownie
4. Odśwież stronę w przeglądarce (Ctrl+R)

## Gotowe!

Aplikacja jest w pełni funkcjonalna i zawiera wszystkie 750 pytań. Dzieci mogą bezpiecznie się uczyć bez reklam.

---

**Powodzenia w nauce! 🚴**

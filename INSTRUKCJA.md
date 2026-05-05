# 📚 Instrukcja użytkowania aplikacji do nauki

## Co zostało zrobione?

✅ **Pobrano wszystkie pytania** - 30 testów × 25 pytań = 750 pytań
✅ **Usunięto reklamy** - aplikacja jest czysta i bezpieczna
✅ **Dodano wyjaśnienia** - każda odpowiedź ma szczegółowe objaśnienie
✅ **Dodano obrazki** - wszystkie diagramy i zdjęcia z oryginalnej strony
✅ **Responsywny design** - działa na wszystkich urządzeniach

## Jak uruchomić aplikację?

### Na komputerze (macOS/Linux/Windows)

1. **Otwórz terminal** w folderze `bike-exam-app`

2. **Uruchom aplikację:**
   ```bash
   npm start
   ```

3. **Otwórz przeglądarkę** i wejdź na: `http://localhost:3000`

4. **Gotowe!** Aplikacja jest dostępna

### Jeśli npm nie jest zainstalowany

1. Pobierz Node.js z: https://nodejs.org/
2. Zainstaluj Node.js
3. Uruchom `npm start` w folderze aplikacji

## Jak używać aplikację?

### Ekran główny
- Widzisz listę 30 testów
- Kliknij na test, aby go otworzyć

### Tryb nauki
1. **Przeczytaj pytanie** - zawsze zawiera obrazek
2. **Wybierz odpowiedź** - kliknij na jedną z czterech opcji
3. **Sprawdź wynik** - aplikacja pokaże czy odpowiedź jest poprawna
4. **Przeczytaj wyjaśnienie** - dowiesz się dlaczego to jest poprawna odpowiedź
5. **Przejdź dalej** - kliknij "Następne →" aby przejść do następnego pytania

### Nawigacja
- **← Poprzednie** - wróć do poprzedniego pytania
- **Następne →** - przejdź do następnego pytania
- **Powrót do menu** - wróć do listy testów

## Funkcjonalności

### Pytania
- ✅ Wszystkie 750 pytań z oryginalnej strony
- ✅ Każde pytanie ma 2-4 odpowiedzi do wyboru
- ✅ Obrazki i diagramy do każdego pytania

### Odpowiedzi
- ✅ Poprawna odpowiedź jest wyróżniona na zielono
- ✅ Błędna odpowiedź jest wyróżniona na czerwono
- ✅ Każda odpowiedź ma szczegółowe wyjaśnienie

### Interfejs
- ✅ Pasek postępu pokazuje gdzie jesteś w teście
- ✅ Licznik pytań (np. "Pytanie 5 z 25")
- ✅ Responsywny design - działa na telefonach, tabletach i komputerach
- ✅ Bez reklam i niebezpiecznych elementów

## Wskazówki do nauki

1. **Przejrzyj wszystkie testy** - każdy test ma inne pytania
2. **Czytaj wyjaśnienia** - to najważniejsza część nauki
3. **Powtarzaj testy** - możesz robić ten sam test wiele razy
4. **Zwróć uwagę na obrazki** - na egzaminie będą podobne diagramy

## Problemy i rozwiązania

### Aplikacja nie uruchamia się
- Sprawdź czy Node.js jest zainstalowany: `node --version`
- Sprawdź czy jesteś w folderze `bike-exam-app`
- Spróbuj: `npm install` a potem `npm start`

### Pytania się nie ładują
- Odśwież stronę (Ctrl+R lub Cmd+R)
- Sprawdź konsolę przeglądarki (F12 → Console)
- Upewnij się że plik `public/data/parsed-tests.json` istnieje

### Obrazki się nie wyświetlają
- To normalne - obrazki pochodzą z oryginalnej strony
- Pytania są dostępne bez obrazków
- Możesz przejrzeć obrazki na oryginalnej stronie: https://brd.edu.pl/brd2/testy/testy.html

## Wdrożenie online

Jeśli chcesz udostępnić aplikację dzieciom online:

### Opcja 1: Netlify (bezpłatnie)
1. Zainstaluj Netlify CLI: `npm install -g netlify-cli`
2. Uruchom: `netlify deploy --prod --dir=public`
3. Aplikacja będzie dostępna online

### Opcja 2: GitHub Pages
1. Przenieś folder `public` na GitHub
2. Włącz GitHub Pages w ustawieniach repozytorium

### Opcja 3: Serwer lokalny
- Aplikacja działa na `http://localhost:3000`
- Możesz ją udostępnić w sieci lokalnej (WiFi)

## Kontakt i wsparcie

Jeśli masz pytania lub problemy:
1. Sprawdź konsolę przeglądarki (F12)
2. Upewnij się że wszystkie pliki są na miejscu
3. Spróbuj ponownie uruchomić aplikację

---

**Powodzenia w nauce do egzaminu na kartę rowerową! 🚴**

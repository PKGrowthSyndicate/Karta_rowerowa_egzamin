# 🚀 Wdrażanie aplikacji

## Opcja 1: Uruchomienie lokalne (najprostsze)

### Wymagania
- Node.js (https://nodejs.org/)
- Terminal/Command Prompt

### Kroki

1. **Otwórz terminal** w folderze `bike-exam-app`

2. **Zainstaluj zależności** (tylko raz):
   ```bash
   npm install
   ```

3. **Uruchom aplikację**:
   ```bash
   npm start
   ```

4. **Otwórz przeglądarkę**:
   - http://localhost:3000

5. **Gotowe!** Aplikacja jest dostępna dla Twoich dzieci

### Zatrzymanie aplikacji
- Naciśnij `Ctrl+C` w terminalu

---

## Opcja 2: Wdrożenie na Netlify (online, bezpłatnie)

### Wymagania
- Konto Netlify (https://netlify.com)
- Git (https://git-scm.com)

### Kroki

1. **Zainstaluj Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Zaloguj się do Netlify**:
   ```bash
   netlify login
   ```

3. **Wdróż aplikację**:
   ```bash
   netlify deploy --prod --dir=public
   ```

4. **Otrzymasz link** do aplikacji online

5. **Udostępnij link** dzieciom

### Zalety
- ✅ Dostępne online z każdego urządzenia
- ✅ Nie wymaga instalacji Node.js
- ✅ Bezpłatne
- ✅ Szybkie

---

## Opcja 3: Wdrożenie na GitHub Pages (online, bezpłatnie)

### Wymagania
- Konto GitHub (https://github.com)
- Git

### Kroki

1. **Utwórz nowe repozytorium** na GitHub

2. **Dodaj pliki**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TWOJA_NAZWA/bike-exam-app.git
   git push -u origin main
   ```

3. **Włącz GitHub Pages**:
   - Przejdź do Settings → Pages
   - Wybierz `main` branch
   - Folder: `public`
   - Kliknij Save

4. **Czekaj kilka minut** na wdrożenie

5. **Aplikacja będzie dostępna** na: `https://TWOJA_NAZWA.github.io/bike-exam-app`

---

## Opcja 4: Wdrożenie na Vercel (online, bezpłatnie)

### Wymagania
- Konto Vercel (https://vercel.com)
- Git

### Kroki

1. **Zainstaluj Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Wdróż aplikację**:
   ```bash
   vercel --prod
   ```

3. **Postępuj zgodnie z instrukcjami**

4. **Otrzymasz link** do aplikacji online

---

## Opcja 5: Wdrożenie na własnym serwerze

### Wymagania
- Serwer z Node.js
- SSH dostęp

### Kroki

1. **Skopiuj pliki** na serwer

2. **Zainstaluj zależności**:
   ```bash
   npm install
   ```

3. **Uruchom aplikację** (w tle):
   ```bash
   nohup npm start > app.log 2>&1 &
   ```

4. **Skonfiguruj reverse proxy** (nginx/Apache)

5. **Aplikacja będzie dostępna** na Twojej domenie

---

## Porównanie opcji

| Opcja | Łatwość | Koszt | Dostęp | Wymagania |
|-------|---------|-------|--------|-----------|
| Lokalne | ⭐⭐⭐⭐⭐ | Gratis | Tylko WiFi | Node.js |
| Netlify | ⭐⭐⭐⭐ | Gratis | Online | GitHub |
| GitHub Pages | ⭐⭐⭐⭐ | Gratis | Online | GitHub |
| Vercel | ⭐⭐⭐⭐ | Gratis | Online | GitHub |
| Serwer | ⭐⭐ | $ | Online | Serwer |

---

## Rekomendacja

**Dla początkujących**: Opcja 1 (Lokalne)
- Najprostsza
- Nie wymaga konta online
- Działa od razu

**Dla dostępu online**: Opcja 2 (Netlify)
- Bardzo łatwa
- Bezpłatna
- Szybka

**Dla zaawansowanych**: Opcja 5 (Serwer)
- Pełna kontrola
- Możliwość rozszerzenia
- Wymaga wiedzy

---

## Wsparcie

Jeśli masz problemy:
1. Sprawdź czy Node.js jest zainstalowany: `node --version`
2. Sprawdź czy jesteś w poprawnym folderze
3. Spróbuj `npm install` ponownie
4. Sprawdź konsolę przeglądarki (F12)

---

**Powodzenia w wdrażaniu! 🚀**

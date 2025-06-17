# Rentiva - Instrukcje Deploymentu na Render.com

## 🚀 Kompletny Przewodnik Deploymentu

### Przegląd Architektury
Projekt Rentiva składa się z:
- **Backend**: Spring Boot (Java 21) z PostgreSQL
- **Frontend**: React + Vite (dla klientów)
- **Admin Panel**: React + Vite (panel administracyjny)
- **Baza danych**: PostgreSQL na Render

### 📋 Wymagania Wstępne

1. **Konto GitHub**
   - Utwórz repozytorium na GitHub
   - Wypchnij kod projektu

2. **Konto Render.com**
   - Zarejestruj się na [render.com](https://render.com)
   - Połącz konto z GitHub

### 🔧 Przygotowanie Projektu

#### 1. Weryfikacja Plików Konfiguracyjnych

Upewnij się, że masz następujące pliki:
- ✅ `render.yaml` - główna konfiguracja
- ✅ `backend/Dockerfile` - kontener backendu
- ✅ `frontend/Dockerfile` - kontener frontendu
- ✅ `admin/Dockerfile` - kontener admin panelu
- ✅ `docker-compose.yml` - do testowania lokalnego
- ✅ `backend/system.properties` - wersja Java
- ✅ `build.sh`, `start.sh`, `test-build.sh` - skrypty pomocnicze

#### 2. Testowanie Lokalne (Opcjonalne)

```bash
# Testowanie z Docker Compose
docker-compose up --build

# Lub pojedyncze testy
./test-build.sh
```

### 🌐 Proces Deploymentu na Render

#### Krok 1: Przygotowanie Repozytorium GitHub

```bash
# W katalogu projektu
git init
git add .
git commit -m "Initial commit for Render deployment"
git branch -M main
git remote add origin https://github.com/TWOJA_NAZWA/rentiva.git
git push -u origin main
```

#### Krok 2: Tworzenie Bazy Danych na Render

1. **Zaloguj się na Render.com**
2. **Kliknij "New +"** → **"PostgreSQL"**
3. **Konfiguracja bazy danych:**
   - **Name**: `rentiva-db`
   - **Database**: `rentiva`
   - **User**: `rentiva_user`
   - **Region**: Wybierz najbliższy (np. Frankfurt)
   - **Plan**: Free (dla testów)

4. **Zapisz dane połączenia** (znajdziesz je w zakładce "Connect"):
   - Internal Database URL
   - External Database URL
   - PSQL Command

#### Krok 3: Deployment Backendu

1. **Kliknij "New +"** → **"Web Service"**
2. **Połącz repozytorium GitHub**
3. **Konfiguracja serwisu:**
   - **Name**: `rentiva-backend`
   - **Environment**: `Java`
   - **Region**: Ten sam co baza danych
   - **Branch**: `main`
   - **Root Directory**: `backend`

4. **Build Command:**
   ```bash
   ./mvnw clean package -DskipTests
   ```

5. **Start Command:**
   ```bash
   java -jar target/backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
   ```

6. **Zmienne środowiskowe:**
   ```
   SPRING_PROFILES_ACTIVE=prod
   PORT=8080
   DATABASE_URL=[skopiuj Internal Database URL z kroku 2]
   CORS_ORIGINS=https://rentiva-frontend.onrender.com,https://rentiva-admin.onrender.com
   ```

#### Krok 4: Deployment Frontendu

1. **Kliknij "New +"** → **"Web Service"**
2. **Połącz to samo repozytorium**
3. **Konfiguracja serwisu:**
   - **Name**: `rentiva-frontend`
   - **Environment**: `Node`
   - **Region**: Ten sam co backend
   - **Branch**: `main`
   - **Root Directory**: `frontend`

4. **Build Command:**
   ```bash
   npm install && npm run build
   ```

5. **Start Command:**
   ```bash
   npm run preview -- --port $PORT --host 0.0.0.0
   ```

6. **Zmienne środowiskowe:**
   ```
   VITE_API_URL=https://rentiva-backend.onrender.com
   NODE_ENV=production
   ```

#### Krok 5: Deployment Admin Panelu

1. **Kliknij "New +"** → **"Web Service"**
2. **Połącz to samo repozytorium**
3. **Konfiguracja serwisu:**
   - **Name**: `rentiva-admin`
   - **Environment**: `Node`
   - **Region**: Ten sam co backend
   - **Branch**: `main`
   - **Root Directory**: `admin`

4. **Build Command:**
   ```bash
   npm install && npm run build
   ```

5. **Start Command:**
   ```bash
   npm run preview -- --port $PORT --host 0.0.0.0
   ```

6. **Zmienne środowiskowe:**
   ```
   VITE_API_URL=https://rentiva-backend.onrender.com
   NODE_ENV=production
   ```

### 🔄 Alternatywny Sposób - Blueprint (render.yaml)

Jeśli preferujesz automatyczny deployment:

1. **Na Render.com** → **"New +"** → **"Blueprint"**
2. **Połącz repozytorium GitHub**
3. **Render automatycznie wykryje `render.yaml`**
4. **Ustaw zmienne środowiskowe:**
   - DATABASE_URL (z bazy danych)
   - CORS_ORIGINS (dostosuj do faktycznych URL-i)

### 📊 Monitoring i Debugowanie

#### Health Check Endpoints
- Backend: `https://rentiva-backend.onrender.com/actuator/health`
- Frontend: `https://rentiva-frontend.onrender.com`
- Admin: `https://rentiva-admin.onrender.com`

#### Logi
1. **W dashboardzie Render** → **Wybierz serwis** → **"Logs"**
2. **Najczęstsze problemy:**
   - Błędy połączenia z bazą danych
   - Problemy z CORS
   - Błędy buildu Node.js/Maven

### 🔧 Rozwiązywanie Problemów

#### Problem: Backend nie może połączyć się z bazą
```bash
# Sprawdź DATABASE_URL w zmiennych środowiskowych
# Format: postgresql://user:password@host:port/database
```

#### Problem: CORS errors
```bash
# Sprawdź CORS_ORIGINS w backendzie
# Dodaj faktyczne URL-e frontendów
```

#### Problem: Build failures
```bash
# Java: Sprawdź wersję w system.properties (21)
# Node: Sprawdź wersję w Dockerfile (20-alpine)
```

### 🚀 Wdrażanie Aktualizacji

1. **Wypchnij zmiany na GitHub:**
   ```bash
   git add .
   git commit -m "Update description"
   git push origin main
   ```

2. **Render automatycznie rozpocznie redeploy**
3. **Monitoruj logi w dashboardzie**

### 💡 Wskazówki Optymalizacji

#### Dla Bezpłatnego Planu
- Serwisy zasypiają po 15 minutach nieaktywności
- Pierwsze uruchomienie może trwać 30-60 sekund
- Użyj [UptimeRobot](https://uptimerobot.com) do utrzymania aktywności

#### Dla Płatnych Planów
- Stałe zasoby CPU/RAM
- Brak czasu uśpienia  
- SSL certyfikaty
- Niestandardowe domeny

### 🎯 Finalne URL-e

Po pomyślnym deploymencie:
- **Frontend**: `https://rentiva-frontend.onrender.com`
- **Admin Panel**: `https://rentiva-admin.onrender.com`  
- **Backend API**: `https://rentiva-backend.onrender.com`
- **API Docs**: `https://rentiva-backend.onrender.com/actuator/health`

### 📞 Wsparcie

W przypadku problemów:
1. Sprawdź logi w dashboardzie Render
2. Zweryfikuj zmienne środowiskowe
3. Przetestuj lokalne buildy
4. Skonsultuj dokumentację [Render.com](https://render.com/docs)

---

## 🎉 Gratulacje!

Twoja aplikacja Rentiva jest teraz uruchomiona na Render.com z:
- ✅ Bezpieczną bazą danych PostgreSQL
- ✅ Skalowalnym backendem Spring Boot  
- ✅ Responsywnym frontendem React
- ✅ Profesjonalnym panelem administracyjnym
- ✅ Automatycznymi deploymentami z GitHub

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

#### Krok 4: Deployment Frontendu (Static Site)

1. **Kliknij "New +"** → **"Static Site"** ⚡ *(Lepsze dla React SPA)*
2. **Połącz to samo repozytorium**
3. **Konfiguracja serwisu:**
   - **Name**: `rentiva-frontend`
   - **Region**: Ten sam co backend
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Publish Directory**: `dist` *(Vite output folder)*

4. **Build Command:**
   ```bash
   npm install && npm run build
   ```

5. **Zmienne środowiskowe:**
   ```
   VITE_API_URL=https://rentiva-backend.onrender.com
   NODE_ENV=production
   ```

6. **Dodatkowe ustawienia Static Site:**
   - **Headers**: Automatyczne cache headers
   - **Redirects**: SPA routing - `/* /index.html 200`

#### Krok 5: Deployment Admin Panelu (Static Site)

1. **Kliknij "New +"** → **"Static Site"** ⚡ *(Lepsze dla React SPA)*
2. **Połącz to samo repozytorium**
3. **Konfiguracja serwisu:**
   - **Name**: `rentiva-admin`
   - **Region**: Ten sam co backend
   - **Branch**: `main`
   - **Root Directory**: `admin`
   - **Publish Directory**: `dist` *(Vite output folder)*

4. **Build Command:**
   ```bash
   npm install && npm run build
   ```

5. **Zmienne środowiskowe:**
   ```
   VITE_API_URL=https://rentiva-backend.onrender.com
   NODE_ENV=production
   ```

6. **Dodatkowe ustawienia Static Site:**
   - **Headers**: Automatyczne cache headers
   - **Redirects**: SPA routing - `/* /index.html 200`

### 🔄 Alternatywny Sposób - Blueprint (render.yaml)

**💡 REKOMENDOWANY SPOSÓB** - Używa Static Sites dla lepszej wydajności!

1. **Na Render.com** → **"New +"** → **"Blueprint"**
2. **Połącz repozytorium GitHub**
3. **Render automatycznie wykryje `render.yaml`**
4. **Konfiguracja zostanie automatycznie zastosowana:**
   - Backend: Web Service (Java)
   - Frontend: Static Site (szybsze, lepsze dla SPA)
   - Admin: Static Site (szybsze, lepsze dla SPA)
   - Database: PostgreSQL

5. **Ustaw tylko zmienne środowiskowe jeśli potrzebne:**
   - DATABASE_URL (automatycznie z bazy danych)
   - CORS_ORIGINS (dostosuj do faktycznych URL-i)

### 💡 Dlaczego Static Sites?
- ⚡ **Szybsze** - pliki serwowane przez CDN
- 💰 **Tańsze** - nie zużywają compute hours
- 🔒 **Bezpieczniejsze** - tylko statyczne pliki
- 🚀 **Lepsze SEO** - szybsze ładowanie strony

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

#### Problem: Błąd Hibernate Schema Creation
```
org.hibernate.tool.schema.spi.SchemaManagementException
```

**Przyczyna**: Hibernate nie może utworzyć schematu bazy danych PostgreSQL

**Rozwiązanie**:
1. **Sprawdź zmienne środowiskowe w Render:**
   ```
   DATABASE_URL=postgresql://rentiva_user:YA0jva3xprFxe109sit1oX83MWgdfdMd@dpg-d18j2codl3ps738er37g-a/rentiva
   SPRING_PROFILES_ACTIVE=prod
   ```

2. **Dodaj do `application-prod.properties`:**
   ```properties
   # PostgreSQL specific settings
   spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
   spring.jpa.hibernate.ddl-auto=create-drop
   spring.jpa.properties.hibernate.temp.use_jdbc_metadata_defaults=false
   spring.jpa.show-sql=false
   ```

3. **Sprawdź Health Check Path:**
   - Zmień z `/healthz` na `/actuator/health`
   - Lub usuń Health Check Path (zostaw puste)

#### Problem: Backend nie może połączyć się z bazą
```bash
# Sprawdź DATABASE_URL w zmiennych środowiskowych
# Format: postgresql://user:password@host:port/database
```

**Kroki debugowania**:
1. **W Render Dashboard** → **rentiva-backend** → **Environment**
2. **Sprawdź czy `DATABASE_URL` jest ustawione**
3. **Skopiuj Internal Database URL z bazy danych**
4. **Wklej do zmiennych środowiskowych backendu**

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

#### Problem: Błąd formatu DATABASE_URL
```
Driver org.postgresql.Driver claims to not accept jdbcUrl, postgresql://...
```

**Przyczyna**: Render podaje DATABASE_URL w formacie `postgresql://`, ale Spring Boot/HikariCP oczekuje `jdbc:postgresql://`

**Rozwiązanie**:
1. **Stworzono klasę `DatabaseConfig.java`** która automatycznie konwertuje URL
2. **Format Render**: `postgresql://user:pass@host:port/db`
3. **Format Spring Boot**: `jdbc:postgresql://host:port/db`

**Automatyczna konwersja w kodzie**:
```java
// DatabaseConfig.java automatycznie parsuje URL
String jdbcUrl = "jdbc:postgresql://" + dbUri.getHost() + ':' + dbUri.getPort() + dbUri.getPath();
```

#### Problem: jdbcUrl is required with driverClassName
```
HikariConfig - jdbcUrl is required with driverClassName.
```

**Przyczyna**: Spring Boot nie może znaleźć URL bazy danych lub jest niepoprawnie skonfigurowany

**Rozwiązanie**:
1. **Upewnij się, że DATABASE_URL jest ustawione w Render Environment Variables**
2. **Dodaj fallback values w application-prod.properties:**
   ```properties
   spring.datasource.url=${DATABASE_URL:jdbc:postgresql://localhost:5432/rentiva}
   spring.datasource.username=${POSTGRES_USER:rentiva_user}
   spring.datasource.password=${POSTGRES_PASSWORD:password}
   ```
3. **Sprawdź czy DatabaseConfig.java zawsze zwraca DataSource**

**Sprawdź w Render Dashboard**:
- Environment Variables zawiera DATABASE_URL
- Format: `postgresql://user:pass@host.render.com:5432/db`

#### Problem: "vite: not found" durante build

```
> admin@0.0.0 build
> vite build
sh: 1: vite: not found
==> Build failed 😞
```

**Przyczyna**: Render nie może znaleźć polecenia `vite` pomimo zainstalowanych zależności

**Rozwiązanie**:
1. **Sprawdź czy `vite` jest w devDependencies** w `admin/package.json`
2. **Upewnij się, że używasz `npx vite` zamiast `vite`** w scripts:
   ```json
   "scripts": {
     "dev": "npx vite",
     "build": "npx vite build",
     "preview": "npx vite preview"
   }
   ```
3. **Sprawdź build command w render.yaml**:
   ```yaml
   buildCommand: |
     cd admin
     npm ci
     npm run build
   ```

**Dlaczego `npx`?**
- `npx` uruchamia polecenia z lokalnego `node_modules/.bin`
- Rozwiązuje problemy z PATH w środowisku Render
- Zapewnia, że używana jest właściwa wersja narzędzi

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

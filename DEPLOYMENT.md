# 🚀 Rentiva - Instrukcja wdrożenia na Render.com

## 📋 Przegląd platformy

**Rentiva** to platforma do wynajmu samochodów składająca się z trzech głównych komponentów:

- **🔧 Backend**: Spring Boot + PostgreSQL (API REST)
- **🌐 Frontend**: React + Vite (Strona główna dla klientów)
- **⚙️ Admin Panel**: React + Material-UI (Panel administracyjny)

---

## 🔧 Wymagania wstępne

- [x] Konto GitHub z kodem projektu
- [x] Konto na [Render.com](https://render.com)
- [x] Podstawowa znajomość Git

---

## 📦 Krok 1: Przygotowanie projektu

### 1.1 Struktura projektu
Upewnij się, że struktura katalogów wygląda następująco:
```
Rentiva-1/
├── backend/          # Spring Boot API
├── frontend/         # React frontend (klienci)
├── admin/           # React admin panel
└── DEPLOYMENT.md    # Ten plik
```

### 1.2 Sprawdzenie konfiguracji

**Backend (`backend/src/main/resources/application-prod.properties`):**
```properties
spring.application.name=rentiva-backend
spring.datasource.url=${DATABASE_URL}
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
server.port=${PORT:8080}
spring.web.cors.allowed-origins=${CORS_ORIGINS}
```

**Frontend (`frontend/src/utils/api-config.js`):**
```javascript
const API_BASE_URL = import.meta.env.PROD 
  ? import.meta.env.VITE_API_URL || 'https://rentiva-backend.onrender.com/api'
  : 'http://localhost:8081/api';
```

**Admin (`admin/src/utils/api-config.js`):**
```javascript
const API_BASE_URL = import.meta.env.PROD 
  ? import.meta.env.VITE_API_URL || 'https://rentiva-backend.onrender.com/api'
  : 'http://localhost:8081/api';
```

---

## 🗄️ Krok 2: Wdrożenie bazy danych PostgreSQL

### 2.1 Tworzenie bazy danych

1. **Zaloguj się na [Render.com](https://render.com)**
2. **Kliknij "New +" → "PostgreSQL"**
3. **Wypełnij formularz:**
   - **Name**: `rentiva-database`
   - **Database**: `rentiva_db`
   - **User**: `rentiva_user`
   - **Region**: `Frankfurt (EU Central)` *(zalecane dla Europy)*
   - **Plan**: `Free` *(na start)*

4. **Kliknij "Create Database"**

### 2.2 Zapisanie danych połączenia

Po utworzeniu bazy, przejdź do zakładki **"Info"** i zapisz:

- **Internal Database URL**: `postgresql://rentiva_user:***@dpg-***:5432/rentiva_db`
- **External Database URL**: `postgresql://rentiva_user:***@dpg-***.com:5432/rentiva_db`

> ⚠️ **Ważne**: Będziesz potrzebować **External Database URL** do konfiguracji backendu!

---

## 🔧 Krok 3: Wdrożenie Backend (Spring Boot)

### 3.1 Tworzenie Web Service

1. **W dashboardzie Render kliknij "New +" → "Web Service"**
2. **Wybierz swoje repozytorium GitHub**
3. **Konfiguracja serwisu:**

| Pole | Wartość |
|------|---------|
| **Name** | `rentiva-backend` |
| **Region** | `Frankfurt (EU Central)` |
| **Branch** | `main` (lub `master`) |
| **Root Directory** | `backend` |
| **Runtime** | `Java` |
| **Build Command** | `./mvnw clean package -DskipTests` |
| **Start Command** | `java -Dspring.profiles.active=prod -Dserver.port=$PORT -jar target/backend-0.0.1-SNAPSHOT.jar` |

### 3.2 Zmienne środowiskowe dla backendu

W sekcji **"Environment Variables"** dodaj:

| Klucz | Wartość |
|-------|---------|
| `DATABASE_URL` | *External Database URL z kroku 2.2* |
| `SPRING_PROFILES_ACTIVE` | `prod` |
| `CORS_ORIGINS` | `https://rentiva-frontend.onrender.com,https://rentiva-admin.onrender.com` |

### 3.3 Deployment

1. **Kliknij "Create Web Service"**
2. **Poczekaj na build** (może trwać 5-10 minut)
3. **Sprawdź logi** w przypadku błędów

> 📝 **URL backendu**: `https://rentiva-backend.onrender.com`

---

## 🌐 Krok 4: Wdrożenie Frontend (Strona główna)

### 4.1 Tworzenie Static Site

1. **Kliknij "New +" → "Static Site"**
2. **Wybierz swoje repozytorium GitHub**
3. **Konfiguracja:**

| Pole | Wartość |
|------|---------|
| **Name** | `rentiva-frontend` |
| **Branch** | `main` |
| **Root Directory** | `frontend` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

### 4.2 Zmienne środowiskowe dla frontendu

| Klucz | Wartość |
|-------|---------|
| `VITE_API_URL` | `https://rentiva-backend.onrender.com/api` |

### 4.3 Deployment

1. **Kliknij "Create Static Site"**
2. **Poczekaj na build** (3-5 minut)

> 📝 **URL frontendu**: `https://rentiva-frontend.onrender.com`

---

## ⚙️ Krok 5: Wdrożenie Admin Panel

### 5.1 Tworzenie Static Site

1. **Kliknij "New +" → "Static Site"**
2. **Wybierz swoje repozytorium GitHub**
3. **Konfiguracja:**

| Pole | Wartość |
|------|---------|
| **Name** | `rentiva-admin` |
| **Branch** | `main` |
| **Root Directory** | `admin` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

### 5.2 Zmienne środowiskowe dla admin panel

| Klucz | Wartość |
|-------|---------|
| `VITE_API_URL` | `https://rentiva-backend.onrender.com/api` |

### 5.3 Deployment

1. **Kliknij "Create Static Site"**
2. **Poczekaj na build**

> 📝 **URL admin panel**: `https://rentiva-admin.onrender.com`

---

## ✅ Krok 6: Testowanie i weryfikacja

### 6.1 Sprawdzenie backendu

Otwórz w przeglądarce:
```
https://rentiva-backend.onrender.com/api/cars
```

Powinieneś zobaczyć odpowiedź JSON (prawdopodobnie pustą listę na początku).

### 6.2 Sprawdzenie frontendu

1. **Strona główna**: `https://rentiva-frontend.onrender.com`
2. **Panel admin**: `https://rentiva-admin.onrender.com`

### 6.3 Test połączenia API

1. Otwórz **panel admin**
2. Spróbuj dodać nowy samochód
3. Sprawdź czy dane są zapisywane w bazie

---

## 🔧 Krok 7: Konfiguracja finalna

### 7.1 Aktualizacja CORS

Po uzyskaniu rzeczywistych URLów, zaktualizuj zmienną `CORS_ORIGINS` w backendzie:

```
CORS_ORIGINS=https://rentiva-frontend.onrender.com,https://rentiva-admin.onrender.com
```

### 7.2 Health Check (opcjonalnie)

Dodaj endpoint health check w Spring Boot:

```java
@RestController
public class HealthController {
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> status = new HashMap<>();
        status.put("status", "OK");
        status.put("timestamp", Instant.now().toString());
        return ResponseEntity.ok(status);
    }
}
```

---

## 🚨 Rozwiązywanie problemów

### Problem: Backend nie startuje
**Rozwiązanie:**
1. Sprawdź logi w dashboardzie Render
2. Zweryfikuj `DATABASE_URL`
3. Upewnij się, że PostgreSQL jest aktywny

### Problem: CORS errors
**Rozwiązanie:**
1. Sprawdź zmienną `CORS_ORIGINS`
2. Upewnij się, że zawiera właściwe URLy
3. Restartuj backend

### Problem: 502 Bad Gateway
**Rozwiązanie:**
1. Sprawdź czy backend jest aktywny
2. Zweryfikuj Port w Spring Boot (`server.port=${PORT:8080}`)
3. Poczekaj - pierwsze uruchomienie może trwać długo

### Problem: Build fails
**Rozwiązanie:**
1. Sprawdź czy wszystkie dependencies są zainstalowane
2. Zweryfikuj Node.js version w package.json
3. Sprawdź build command

---

## 📊 Ograniczenia Free Tier

| Serwis | Limit |
|--------|--------|
| **Web Services** | 750 godzin/miesiąc |
| **Static Sites** | Unlimited |
| **PostgreSQL** | 1GB storage |
| **Bandwidth** | 100GB/miesiąc |

> ⚠️ **Uwaga**: Serwisy usypiają po 15 minutach nieaktywności i potrzebują ~30s na restart.

---

## 🎯 Następne kroki

### Domena własna
1. W ustawieniach każdego serwisu
2. Dodaj **Custom Domain**
3. Skonfiguruj DNS

### Monitoring
1. Skonfiguruj **Health Checks**
2. Dodaj **Alerty**
3. Monitoruj logi

### Backup bazy danych
```bash
pg_dump $DATABASE_URL > backup.sql
```

### Scaling
- Upgrade do płatnego planu
- Dodaj **Redis** dla cache
- Konfiguruj **Load Balancer**

---

## 📞 Wsparcie

W przypadku problemów:

1. **Sprawdź logi** w dashboardzie Render
2. **Dokumentacja Render**: https://render.com/docs
3. **GitHub Issues**: Utwórz issue w repozytorium

---

## 🎉 Gotowe!

Twoja platforma Rentiva jest teraz dostępna online:

- 🌐 **Frontend**: https://rentiva-frontend.onrender.com
- ⚙️ **Admin**: https://rentiva-admin.onrender.com  
- 🔧 **API**: https://rentiva-backend.onrender.com/api

**Powodzenia! 🚀**

---

*Ostatnia aktualizacja: Czerwiec 2025*

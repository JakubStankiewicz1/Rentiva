# 🚗 Rentiva - Premium Car Rental Platform

![Rentiva](https://img.shields.io/badge/Rentiva-Premium%20Car%20Rental-blue?style=for-the-badge)  
![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)  
![Deployment](https://img.shields.io/badge/Deploy-Render.com-purple?style=for-the-badge)

**Rentiva** to profesjonalna platforma do wynajmu samochodów premium z pełnym systemem zarządzania flotą, rezerwacjami i płatnościami.

---

## 🏗️ Architektura Systemu

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Admin Panel   │    │    Backend      │
│   React + Vite  │    │   React + MUI   │    │  Spring Boot    │
│   Port: 5173    │    │   Port: 3001    │    │   Port: 8081    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   PostgreSQL    │
                    │    Database     │
                    │   Port: 5432    │
                    └─────────────────┘
```

---

## 📦 Komponenty Techniczne

| Komponent | Technologia | Port (dev) | URL (prod) |
|-----------|-------------|------------|------------|
| **🔧 Backend** | Spring Boot 3.5 + Java 21 | 8081 | `rentiva-backend.onrender.com` |
| **🌐 Frontend** | React 19 + Vite 6 | 5173 | `rentiva-frontend.onrender.com` |
| **⚙️ Admin** | React 19 + Material-UI | 3001 | `rentiva-admin.onrender.com` |
| **🗄️ Database** | PostgreSQL 15 | 5432 | Render Managed |

---

## 🚀 Deployment na Render.com

### ⚡ Szybki Deploy (5 minut)
1. **Przeczytaj**: [`QUICK_DEPLOY.md`](QUICK_DEPLOY.md)
2. **Utwórz repo GitHub** i wypchnij kod
3. **Render.com** → Blueprint → Twoje repo
4. **Gotowe!** ✨

### 📚 Szczegółowe Instrukcje
- **Pełny przewodnik**: [`DEPLOYMENT_INSTRUCTIONS.md`](DEPLOYMENT_INSTRUCTIONS.md)
- **API Documentation**: [`INSTRUKCJA_API_REZERWACJI.md`](INSTRUKCJA_API_REZERWACJI.md)

---

## 🛠️ Rozwój Lokalny

### Wymagania
- **Java 21** (OpenJDK)
- **Node.js 18+** (Vite)
- **PostgreSQL 15+** lub MySQL 8+ 
- **Git**

### Uruchomienie z Docker Compose
```bash
# Klonuj repozytorium
git clone https://github.com/TWOJA_NAZWA/rentiva.git
cd rentiva

# Uruchom wszystkie serwisy
docker-compose up --build

# Aplikacja dostępna:
# Frontend: http://localhost:3000
# Admin: http://localhost:3001  
# Backend: http://localhost:8080
```

### Uruchomienie manualne

#### 1. Backend
```bash
cd backend
./mvnw spring-boot:run
# http://localhost:8081
```

#### 2. Frontend
```bash
cd frontend
npm install
npm run dev
# http://localhost:5173
```

#### 3. Admin Panel
```bash
cd admin
npm install  
npm run dev
# http://localhost:3001
```

---

## 📂 Struktura Projektu

```
rentiva/
├── 📄 render.yaml                 # Konfiguracja Render
├── 📄 docker-compose.yml          # Docker dla dev
├── 📄 DEPLOYMENT_INSTRUCTIONS.md  # Przewodnik deploy
├── 📄 QUICK_DEPLOY.md             # Szybki start
│
├── 🔧 backend/                    # Spring Boot API
│   ├── 🐳 Dockerfile
│   ├── 📋 pom.xml
│   ├── ⚙️ system.properties
│   └── 📁 src/main/java/...
│
├── 🌐 frontend/                   # React Client App  
│   ├── 🐳 Dockerfile
│   ├── 📋 package.json
│   ├── ⚙️ vite.config.js
│   └── 📁 src/components/...
│
└── ⚙️ admin/                      # Admin Dashboard
    ├── 🐳 Dockerfile  
    ├── 📋 package.json
    ├── ⚙️ vite.config.js
    └── 📁 src/pages/...
```

---

## 🔐 Zmienne Środowiskowe

### Backend (`application-prod.properties`)
```properties
SPRING_PROFILES_ACTIVE=prod
DATABASE_URL=postgresql://user:pass@host:port/db
CORS_ORIGINS=https://rentiva-frontend.onrender.com
PORT=8080
```

### Frontend (`.env.production`)
```bash
VITE_API_URL=https://rentiva-backend.onrender.com
NODE_ENV=production
```

### Admin Panel (`.env.production`)  
```bash
VITE_API_URL=https://rentiva-backend.onrender.com
NODE_ENV=production
```

---

## 🎯 Funkcjonalności

### � Dla Klientów (Frontend)
- ✅ Przeglądanie dostępnych samochodów
- ✅ System rezerwacji z kalendarzem
- ✅ Formularz kontaktowy
- ✅ Responsywny design
- ✅ Integracja z płatnościami

### 🛠️ Dla Administratorów (Admin Panel)
- ✅ Zarządzanie flotą samochodów
- ✅ System rezerwacji
- ✅ Panel analityki
- ✅ Zarządzanie użytkownikami
- ✅ Dashboard w czasie rzeczywistym

### 🔧 Backend API
- ✅ RESTful API z pełną dokumentacją
- ✅ Zabezpieczenia Spring Security
- ✅ Walidacja danych
- ✅ Obsługa błędów
- ✅ Health checks dla monitoring

---

## 📊 Status Deploymentu

### 🌐 Production URLs
| Service | URL | Status |
|---------|-----|--------|
| **Frontend** | https://rentiva-frontend.onrender.com | ![Status](https://img.shields.io/website?url=https%3A//rentiva-frontend.onrender.com) |
| **Admin** | https://rentiva-admin.onrender.com | ![Status](https://img.shields.io/website?url=https%3A//rentiva-admin.onrender.com) |
| **Backend** | https://rentiva-backend.onrender.com | ![Status](https://img.shields.io/website?url=https%3A//rentiva-backend.onrender.com) |

### 🔍 Health Checks
- Backend Health: `/actuator/health`
- API Docs: `/api/cars` (przykładowy endpoint)
- Database: Managed PostgreSQL na Render

---

## 🤝 Współpraca

1. **Fork** repozytorium
2. **Utwórz** feature branch (`git checkout -b feature/AmazingFeature`) 
3. **Commit** zmiany (`git commit -m 'Add some AmazingFeature'`)
4. **Push** do branch (`git push origin feature/AmazingFeature`)
5. **Otwórz** Pull Request

---

## 📞 Wsparcie

### 🐛 Problemy z Deploymentem
1. Sprawdź logi w [Render Dashboard](https://dashboard.render.com)
2. Zweryfikuj zmienne środowiskowe  
3. Przeczytaj [`DEPLOYMENT_INSTRUCTIONS.md`](DEPLOYMENT_INSTRUCTIONS.md)

### 💬 Kontakt
- **Issues**: GitHub Issues w tym repo
- **Dokumentacja**: Pliki `.md` w katalogu głównym
- **API**: [`INSTRUKCJA_API_REZERWACJI.md`](INSTRUKCJA_API_REZERWACJI.md)

---

## 📄 Licencja

Projekt dostępny na licencji MIT. Zobacz plik `LICENSE` dla szczegółów.

---

<div align="center">

**🚀 Rentiva - Twoja platforma wynajmu samochodów premium**

[![Deploy to Render](https://img.shields.io/badge/Deploy%20to-Render-purple?style=for-the-badge&logo=render)](https://render.com)

</div>

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Admin Panel
```bash
cd admin
npm install
npm run dev
```

---

## 🔧 Konfiguracja deweloperska

### Backend (application.properties)
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/rentiva_db
spring.datasource.username=root
spring.datasource.password=your_password
server.port=8081
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8081/api
```

### Admin (.env)
```env
VITE_API_URL=http://localhost:8081/api
```

---

## 📋 Funkcjonalności

### 👤 Frontend (Klienci)
- [x] Przeglądanie dostępnych samochodów
- [x] Szczegóły pojazdu
- [x] System rezerwacji
- [x] Kontakt i współpraca
- [x] Responsywny design

### 🛠️ Admin Panel
- [x] Zarządzanie flotą samochodów
- [x] Dodawanie/edycja pojazdów
- [x] Upload zdjęć
- [x] Dashboard z statistykami
- [x] System autoryzacji

### 🔧 Backend API
- [x] REST API endpoints
- [x] CRUD operacje na samochodach
- [x] Upload plików
- [x] CORS configuration
- [x] Walidacja danych

---

## 🛡️ Bezpieczeństwo

- [x] **CORS**: Skonfigurowane dla produkcji
- [x] **Validation**: Walidacja danych po stronie serwera
- [x] **Environment Variables**: Wrażliwe dane w zmiennych środowiskowych
- [x] **HTTPS**: Automatyczne SSL na Render.com

---

## 📈 Performance & Monitoring

### Render.com Metryki
- **Backend**: Health check endpoint `/health`
- **Database**: PostgreSQL z automatic backups
- **CDN**: Static assets served via Render CDN
- **Logging**: Centralized logs in Render dashboard

### Optymalizacje
- **Frontend**: Vite bundling + code splitting
- **Backend**: JPA query optimization
- **Database**: Proper indexing
- **Caching**: Browser caching for static assets

---

## 🚨 Troubleshooting

### Najczęstsze problemy

| Problem | Rozwiązanie |
|---------|-------------|
| **502 Bad Gateway** | Sprawdź czy backend wystartował (może trwać 2-3 min) |
| **CORS Errors** | Zweryfikuj `CORS_ORIGINS` w backendzie |
| **Database Connection** | Sprawdź `DATABASE_URL` format |
| **Build Failures** | Sprawdź logi w Render dashboard |

### Przydatne komendy

```bash
# Sprawdź status API
curl https://rentiva-backend.onrender.com/health

# Sprawdź logi lokalne
./mvnw spring-boot:run --debug

# Test bazy danych
psql $DATABASE_URL
```

---

## 📊 Ograniczenia Free Tier (Render.com)

| Zasób | Limit |
|-------|--------|
| **Web Services** | 750h/miesiąc |
| **Static Sites** | Unlimited |
| **PostgreSQL** | 1GB storage |
| **Sleep after** | 15 min inactivity |
| **Cold start** | ~30 sekund |

---

## 🔄 CI/CD Pipeline

Automatyczne wdrożenie po każdym push:

```mermaid
graph LR
    A[Git Push] --> B[Render Webhook]
    B --> C[Automatic Build]
    C --> D[Deploy]
    D --> E[Health Check]
```

---

## 🎯 Roadmap

### v1.1 (Planowane)
- [ ] System płatności
- [ ] Notyfikacje email
- [ ] Zaawansowane filtry
- [ ] API rate limiting
- [ ] Unit tests

### v1.2 (Przyszłość)
- [ ] Mobile app
- [ ] Multi-tenant support
- [ ] Advanced analytics
- [ ] Integration API
- [ ] Microservices architecture

---

## 🤝 Wkład w projekt

1. Fork projektu
2. Utwórz branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Otwórz Pull Request

---

## 📝 Licencja

Ten projekt jest licencjonowany pod **MIT License** - szczegóły w pliku `LICENSE`.

---

## 📞 Kontakt & Wsparcie

- **🐛 Błędy**: [GitHub Issues](https://github.com/your-username/rentiva/issues)
- **💡 Propozycje**: [GitHub Discussions](https://github.com/your-username/rentiva/discussions)
- **📧 Email**: support@rentiva.com

---

## 🎉 Status projektu

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Deployment](https://img.shields.io/badge/deployment-active-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

**🚀 Rentiva jest gotowa do produkcji!**

---

*Ostatnia aktualizacja: Czerwiec 2025*

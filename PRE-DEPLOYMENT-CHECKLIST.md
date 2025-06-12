# ✅ Checklist przed wdrożeniem Rentiva

Użyj tej listy, aby upewnić się, że wszystko jest gotowe do wdrożenia na Render.com.

---

## 📋 Pre-deployment Checklist

### 🔧 Konfiguracja projektu

- [ ] **Kod jest na GitHub**
  - [ ] Wszystkie zmiany są committed
  - [ ] Repository jest publiczne (lub Render ma dostęp)
  - [ ] Branch `main` lub `master` jest aktualny

- [ ] **Pliki konfiguracyjne są zaktualizowane**
  - [ ] `backend/src/main/resources/application-prod.properties` istnieje
  - [ ] `frontend/src/utils/api-config.js` ma konfigurację dla produkcji
  - [ ] `admin/src/utils/api-config.js` ma konfigurację dla produkcji
  - [ ] `pom.xml` zawiera PostgreSQL dependency

- [ ] **HTML titles są zmienione**
  - [ ] `frontend/index.html` ma tytuł "Rentiva - Wynajem Samochodów Premium"
  - [ ] `admin/index.html` ma tytuł "Rentiva Admin Panel"

---

## 🌐 Konto Render.com

- [ ] **Konto jest utworzone**
  - [ ] Rejestracja na https://render.com
  - [ ] Email został potwierdzony
  - [ ] GitHub jest połączony z Render

- [ ] **Payment method** (jeśli potrzebny)
  - [ ] Karta płatnicza dodana (dla płatnych planów)
  - [ ] Billing address uzupełniony

---

## 📝 Informacje do zapisania

Podczas wdrożenia będziesz potrzebować tych informacji:

### 🗄️ Database URLs (zapiszesz po utworzeniu)
```
Internal Database URL: postgresql://rentiva_user:***@dpg-***:5432/rentiva_db
External Database URL: postgresql://rentiva_user:***@dpg-***.render.com:5432/rentiva_db
```

### 🔗 Service URLs (zapiszesz po utworzeniu)
```
Backend:  https://rentiva-backend.onrender.com
Frontend: https://rentiva-frontend.onrender.com
Admin:    https://rentiva-admin.onrender.com
```

---

## 🚀 Deployment Order

**Ważne**: Wdrażaj w tej kolejności!

1. [ ] **PostgreSQL Database** (1-2 min)
2. [ ] **Backend Spring Boot** (5-10 min)
3. [ ] **Frontend React** (3-5 min)
4. [ ] **Admin Panel React** (3-5 min)

---

## ⚙️ Environment Variables Template

### Backend Environment Variables
```
DATABASE_URL = [External Database URL]
SPRING_PROFILES_ACTIVE = prod
CORS_ORIGINS = https://rentiva-frontend.onrender.com,https://rentiva-admin.onrender.com
```

### Frontend Environment Variables
```
VITE_API_URL = https://rentiva-backend.onrender.com/api
```

### Admin Environment Variables
```
VITE_API_URL = https://rentiva-backend.onrender.com/api
```

---

## 🧪 Testing Checklist

Po wdrożeniu, sprawdź:

### Backend API
- [ ] **Health check**: `https://rentiva-backend.onrender.com/health`
- [ ] **Cars endpoint**: `https://rentiva-backend.onrender.com/api/cars`
- [ ] **CORS headers** są obecne w odpowiedziach

### Frontend
- [ ] **Strona ładuje się**: `https://rentiva-frontend.onrender.com`
- [ ] **API calls działają** (sprawdź Developer Tools → Network)
- [ ] **Responsywność** na mobile/desktop

### Admin Panel
- [ ] **Panel ładuje się**: `https://rentiva-admin.onrender.com`
- [ ] **Można dodać samochód** (test CRUD operacji)
- [ ] **Upload zdjęć działa**

---

## 🚨 Common Issues Prevention

- [ ] **Database connection string** nie zawiera `/` na końcu
- [ ] **CORS_ORIGINS** nie ma spacji po przecinku
- [ ] **Build commands** są dokładnie skopiowane
- [ ] **Root directories** są poprawne (`backend`, `frontend`, `admin`)

---

## 📞 Emergency Contacts

Gdy coś pójdzie nie tak:

- **Render Status**: https://status.render.com
- **Render Docs**: https://render.com/docs
- **Render Support**: https://render.com/contact

---

## 🎯 Success Criteria

Deployment jest udany gdy:

- [ ] **Wszystkie 4 serwisy** są "Active" w Render dashboard
- [ ] **Backend API** zwraca dane JSON
- [ ] **Frontend** wyświetla stronę bez błędów
- [ ] **Admin panel** pozwala na dodanie samochodu
- [ ] **Database** zawiera testowe dane

---

## 🏁 Final Steps

Po udanym wdrożeniu:

- [ ] **Zaktualizuj README.md** z rzeczywistymi URLami
- [ ] **Przetestuj full user journey**
- [ ] **Skonfiguruj monitoring** (opcjonalnie)
- [ ] **Setup custom domain** (opcjonalnie)
- [ ] **Create backup strategy** dla bazy danych

---

**✨ Gotowy do wdrożenia!**

Użyj teraz pliku `QUICK-DEPLOY.md` dla szybkiej instrukcji lub `DEPLOYMENT.md` dla szczegółowego przewodnika.

---

*Powodzenia! 🚀*

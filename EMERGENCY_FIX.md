# 🚨 PILNE POPRAWKI dla Deploymentu

## Problem z Hibernate Schema Creation

### 1. ⚙️ Zmień Health Check Path w Render:
```
Stary: /healthz
Nowy: /actuator/health
```

**Jak zmienić:**
1. Render Dashboard → rentiva-backend → Settings
2. Health Check Path → zmień na `/actuator/health`
3. Save Changes

### 2. 🔧 Dodaj zmienne środowiskowe:
```
DATABASE_URL=postgresql://rentiva_user:YA0jva3xprFxe109sit1oX83MWgdfdMd@dpg-d18j2codl3ps738er37g-a/rentiva
SPRING_PROFILES_ACTIVE=prod
CORS_ORIGINS=https://rentiva-frontend.onrender.com,https://rentiva-admin.onrender.com
PORT=8080
```

### 3. 🔄 Manual Deploy:
Po zmianach kliknij **"Manual Deploy"** w Render Dashboard

### 4. 📊 Sprawdź logi:
Render Dashboard → rentiva-backend → Logs

---

## ✅ Szybka naprawa - krok po kroku:

1. **Render Dashboard** → **rentiva-backend** → **Settings**
2. **Health Check Path**: zmień na `/actuator/health`
3. **Environment**: dodaj `DATABASE_URL` (skopiuj z bazy danych)
4. **Manual Deploy**: uruchom ponownie
5. **Logs**: sprawdź czy teraz działa

---

## 🎯 Oczekiwany rezultat:
```
✅ Spring Boot aplikacja uruchomiona
✅ Połączenie z PostgreSQL działa  
✅ Health check: https://rentiva-backend.onrender.com/actuator/health
```

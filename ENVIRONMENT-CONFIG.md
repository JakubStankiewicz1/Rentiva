# 🔧 Konfiguracja zmiennych środowiskowych dla Render.com

## 🗄️ PostgreSQL Database

Render Dashboard → PostgreSQL → Info

```
Database Name: rentiva_db
Username: rentiva_user
Password: [wygenerowany automatycznie]
Host: [hostname].render.com
Port: 5432

Internal URL: postgresql://rentiva_user:[password]@[hostname]:5432/rentiva_db
External URL: postgresql://rentiva_user:[password]@[hostname].render.com:5432/rentiva_db
```

> **Używaj External URL** dla backendu!

---

## 🔧 Backend Environment Variables

W Web Service `rentiva-backend`:

| Variable | Value | Example |
|----------|--------|---------|
| `DATABASE_URL` | [External Database URL] | `postgresql://rentiva_user:***@dpg-***.render.com:5432/rentiva_db` |
| `SPRING_PROFILES_ACTIVE` | `prod` | `prod` |
| `CORS_ORIGINS` | [Frontend URLs] | `https://rentiva-frontend.onrender.com,https://rentiva-admin.onrender.com` |

---

## 🌐 Frontend Environment Variables

W Static Site `rentiva-frontend`:

| Variable | Value | Example |
|----------|--------|---------|
| `VITE_API_URL` | [Backend API URL] | `https://rentiva-backend.onrender.com/api` |

---

## ⚙️ Admin Environment Variables

W Static Site `rentiva-admin`:

| Variable | Value | Example |
|----------|--------|---------|
| `VITE_API_URL` | [Backend API URL] | `https://rentiva-backend.onrender.com/api` |

---

## 📝 Przykładowa konfiguracja

Po wdrożeniu wszystkich serwisów, zmienne powinny wyglądać tak:

### Backend:
```
DATABASE_URL=postgresql://rentiva_user:AbC123XyZ@dpg-ch7j2345678901234-a.render.com:5432/rentiva_db
SPRING_PROFILES_ACTIVE=prod
CORS_ORIGINS=https://rentiva-frontend.onrender.com,https://rentiva-admin.onrender.com
```

### Frontend:
```
VITE_API_URL=https://rentiva-backend.onrender.com/api
```

### Admin:
```
VITE_API_URL=https://rentiva-backend.onrender.com/api
```

---

## 🔄 Aktualizacja po wdrożeniu

1. **Po utworzeniu wszystkich serwisów**
2. **Skopiuj rzeczywiste URLy**
3. **Zaktualizuj zmienne CORS_ORIGINS i VITE_API_URL**
4. **Restartuj serwisy**

---

## ⚠️ Ważne uwagi

- **Database URL**: Zawsze używaj External URL dla backendu
- **CORS**: Musi zawierać wszystkie URLy frontendów
- **Restarty**: Po zmianie zmiennych, restartuj serwis
- **Case-sensitive**: Zmienne są wrażliwe na wielkość liter

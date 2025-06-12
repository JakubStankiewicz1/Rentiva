# 🚀 Szybka instrukcja wdrożenia Rentiva

## 📋 Checklist przed wdrożeniem

- [ ] ✅ Kod jest na GitHub
- [ ] ✅ Konto na Render.com jest gotowe
- [ ] ✅ Pliki konfiguracyjne są zaktualizowane

---

## 🗄️ 1. Baza danych (PostgreSQL)

**Render Dashboard → New + → PostgreSQL**

```
Name: rentiva-database
Database: rentiva_db
User: rentiva_user
Region: Frankfurt (EU Central)
Plan: Free
```

**📝 Zapisz**: External Database URL

---

## 🔧 2. Backend (Spring Boot)

**Render Dashboard → New + → Web Service**

```
Name: rentiva-backend
Root Directory: backend
Runtime: Java
Build Command: ./mvnw clean package -DskipTests
Start Command: java -Dspring.profiles.active=prod -Dserver.port=$PORT -jar target/backend-0.0.1-SNAPSHOT.jar
```

**Environment Variables:**
```
DATABASE_URL = [External Database URL]
SPRING_PROFILES_ACTIVE = prod
CORS_ORIGINS = https://rentiva-frontend.onrender.com,https://rentiva-admin.onrender.com
```

---

## 🌐 3. Frontend (React)

**Render Dashboard → New + → Static Site**

```
Name: rentiva-frontend
Root Directory: frontend
Build Command: npm install && npm run build
Publish Directory: dist
```

**Environment Variables:**
```
VITE_API_URL = https://rentiva-backend.onrender.com/api
```

---

## ⚙️ 4. Admin Panel (React)

**Render Dashboard → New + → Static Site**

```
Name: rentiva-admin
Root Directory: admin
Build Command: npm install && npm run build
Publish Directory: dist
```

**Environment Variables:**
```
VITE_API_URL = https://rentiva-backend.onrender.com/api
```

---

## ✅ 5. Test

1. **Backend**: https://rentiva-backend.onrender.com/api/cars
2. **Frontend**: https://rentiva-frontend.onrender.com
3. **Admin**: https://rentiva-admin.onrender.com

---

## 🚨 Gdy coś nie działa

1. **Sprawdź logi** w Render Dashboard
2. **Zweryfikuj zmienne środowiskowe**
3. **Poczekaj** - pierwszy start trwa długo
4. **Sprawdź** czy baza danych jest aktywna

---

**🎉 Gotowe w ~15 minut!**

Pełna instrukcja: `DEPLOYMENT.md`

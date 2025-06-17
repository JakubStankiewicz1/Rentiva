# Rentiva - Quick Deployment Guide

## 🚀 Najszybszy sposób na deployment

### 1. Przygotuj repozytorium GitHub
```bash
git init
git add .
git commit -m "Ready for Render deployment"
git remote add origin https://github.com/TWOJA_NAZWA/rentiva.git
git push -u origin main
```

### 2. Utwórz konto na Render.com
- Idź na [render.com](https://render.com)
- Zaloguj się przez GitHub

### 3. Deploy jednym klikiem - Blueprint
1. **Render Dashboard** → **"New +"** → **"Blueprint"**
2. **Połącz repozytorium** GitHub (rentiva)
3. **Render automatycznie wykryje** `render.yaml`
4. **Ustaw tylko jedną zmienną** - DATABASE_URL zostanie automatycznie wypełnione

### 4. Finalne URL-e
Po 5-10 minutach:
- 🌐 **Frontend**: `https://rentiva-frontend.onrender.com`
- 🛠️ **Admin**: `https://rentiva-admin.onrender.com`
- 🔧 **API**: `https://rentiva-backend.onrender.com`

### 5. Sprawdź deployment
- Backend health: `https://rentiva-backend.onrender.com/actuator/health`
- Wszystkie logi w Render Dashboard

## 🎯 To wszystko!
Twoja aplikacja jest teraz live na internecie! 

### ⚡ Pro tips:
- Free tier zasypia po 15 min - użyj UptimeRobot
- Każdy git push = automatyczny redeploy
- Logi w czasie rzeczywistym w dashboardzie

---
**Potrzebujesz pomocy?** Sprawdź `DEPLOYMENT_INSTRUCTIONS.md` dla szczegółowych instrukcji.

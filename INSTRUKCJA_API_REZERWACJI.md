# 🚗 Rentiva - System Rezerwacji Samochodów

## 📋 Spis Treści
- [Wprowadzenie](#wprowadzenie)
- [Uruchomienie Backendu](#uruchomienie-backendu)
- [Struktura API](#struktura-api)
- [Testowanie w Postmanie](#testowanie-w-postmanie)
- [Scenariusze Testowe](#scenariusze-testowe)
- [Obsługa Błędów](#obsługa-błędów)
- [Przykłady Kodu](#przykłady-kodu)

---

## 🎯 Wprowadzenie

System rezerwacji samochodów Rentiva umożliwia:
- ✅ Tworzenie, zarządzanie i śledzenie rezerwacji
- ✅ Sprawdzanie dostępności samochodów
- ✅ Automatyczne obliczanie cen na podstawie długości wynajmu
- ✅ Zarządzanie statusami rezerwacji (PENDING → CONFIRMED → COMPLETED)
- ✅ Generowanie raportów i statystyk
- ✅ Walidację dat i konfliktów rezerwacji

---

## 🚀 Uruchomienie Backendu

### Wymagania
- Java 17+
- MySQL 8.0+
- Maven 3.6+

### Kroki uruchomienia
```bash
# 1. Przejdź do katalogu backend
cd backend

# 2. Uruchom aplikację
./mvnw spring-boot:run

# 3. Sprawdź czy działa
curl http://localhost:8081/api/reservations/health
```

**Backend dostępny pod**: `http://localhost:8081`

---

## 🔧 Struktura API

### Base URL
```
http://localhost:8081/api/reservations
```

### Główne Endpointy

| Metoda | Endpoint | Opis |
|--------|----------|------|
| `GET` | `/` | Lista wszystkich rezerwacji |
| `POST` | `/` | Tworzenie nowej rezerwacji |
| `GET` | `/{id}` | Szczegóły rezerwacji |
| `PUT` | `/{id}/confirm` | Potwierdzenie rezerwacji |
| `PUT` | `/{id}/cancel` | Anulowanie rezerwacji |
| `PUT` | `/{id}/complete` | Zakończenie rezerwacji |
| `DELETE` | `/{id}` | Usunięcie rezerwacji |

### Filtry i Wyszukiwanie

| Metoda | Endpoint | Opis |
|--------|----------|------|
| `GET` | `/status/{status}` | Rezerwacje według statusu |
| `GET` | `/car/{carId}` | Rezerwacje dla samochodu |
| `GET` | `/customer/{email}` | Rezerwacje klienta |
| `GET` | `/availability/{carId}` | Sprawdzenie dostępności |

### Raporty

| Metoda | Endpoint | Opis |
|--------|----------|------|
| `GET` | `/upcoming` | Nadchodzące rezerwacje |
| `GET` | `/ending-soon` | Kończące się rezerwacje |
| `GET` | `/statistics` | Statystyki systemu |

---

## 🧪 Testowanie w Postmanie

### Konfiguracja Środowiska

1. **Utwórz nowe środowisko** w Postmanie
2. **Dodaj zmienną**:
   - `baseUrl`: `http://localhost:8081`

3. **Ustaw Headers dla kolekcji**:
   ```
   Content-Type: application/json
   Accept: application/json
   ```

---

## 📝 Szczegółowe Instrukcje Testowania

### 1. 🏁 PRZYGOTOWANIE

#### Sprawdź dostępne samochody
```http
GET {{baseUrl}}/api/cars
```

**Zapisz `carId` z odpowiedzi** - będzie potrzebny do rezerwacji!

#### Sprawdź status systemu
```http
GET {{baseUrl}}/api/reservations/health
```

---

### 2. 📅 TWORZENIE REZERWACJI

#### Utwórz nową rezerwację
```http
POST {{baseUrl}}/api/reservations
Content-Type: application/json

{
  "carId": "123123-123-1799",
  "firstName": "Jan",
  "lastName": "Kowalski",
  "email": "jan.kowalski@example.com",
  "phone": "+48123456789",
  "startDate": "2025-06-20",
  "endDate": "2025-06-25",
  "notes": "Proszę o samochód w dobrym stanie",
  "pickupLocation": "Warszawa Centrum",
  "dropoffLocation": "Kraków Główny"
}
```

**✅ Oczekiwany rezultat**: Status `201 CREATED`
```json
{
  "id": 1,
  "carId": "123123-123-1799",
  "firstName": "Jan",
  "lastName": "Kowalski",
  "email": "jan.kowalski@example.com",
  "phone": "+48123456789",
  "startDate": "2025-06-20",
  "endDate": "2025-06-25",
  "totalPrice": 2500.00,
  "dailyRate": 500.00,
  "numberOfDays": 5,
  "status": "PENDING",
  "carTitle": "Przykładowy Samochód",
  "createdAt": "2025-06-15T12:00:00"
}
```

---

### 3. 🔍 SPRAWDZANIE REZERWACJI

#### Lista wszystkich rezerwacji
```http
GET {{baseUrl}}/api/reservations
```

#### Konkretna rezerwacja
```http
GET {{baseUrl}}/api/reservations/1
```

#### Rezerwacje według statusu
```http
GET {{baseUrl}}/api/reservations/status/PENDING
GET {{baseUrl}}/api/reservations/status/CONFIRMED
GET {{baseUrl}}/api/reservations/status/CANCELLED
GET {{baseUrl}}/api/reservations/status/COMPLETED
```

---

### 4. 🎯 SPRAWDZANIE DOSTĘPNOŚCI

#### Sprawdź dostępność samochodu
```http
GET {{baseUrl}}/api/reservations/availability/123123-123-1799?startDate=2025-06-20&endDate=2025-06-25
```

**✅ Przykładowa odpowiedź**:
```json
{
  "available": false,
  "carId": "123123-123-1799",
  "startDate": "2025-06-20",
  "endDate": "2025-06-25",
  "conflictingReservations": [
    {
      "id": 1,
      "startDate": "2025-06-20",
      "endDate": "2025-06-25",
      "status": "PENDING"
    }
  ]
}
```

---

### 5. ⚡ ZARZĄDZANIE STATUSEM

#### Potwierdź rezerwację
```http
PUT {{baseUrl}}/api/reservations/1/confirm
```

#### Anuluj rezerwację
```http
PUT {{baseUrl}}/api/reservations/1/cancel
Content-Type: application/json

{
  "reason": "Zmiana planów podróży"
}
```

#### Zakończ rezerwację
```http
PUT {{baseUrl}}/api/reservations/1/complete
```

---

### 6. 📊 RAPORTY I STATYSTYKI

#### Nadchodzące rezerwacje (następne 7 dni)
```http
GET {{baseUrl}}/api/reservations/upcoming?daysAhead=7
```

#### Kończące się rezerwacje (następne 3 dni)
```http
GET {{baseUrl}}/api/reservations/ending-soon?daysAhead=3
```

#### Statystyki systemu
```http
GET {{baseUrl}}/api/reservations/statistics
```

**✅ Przykładowa odpowiedź**:
```json
{
  "totalReservations": 15,
  "pendingReservations": 5,
  "confirmedReservations": 8,
  "cancelledReservations": 2,
  "completedReservations": 0,
  "totalRevenue": 12500.00
}
```

---

### 7. 👨‍💼 OPERACJE ADMINISTRACYJNE

#### Auto-zakończ przeterminowane rezerwacje
```http
POST {{baseUrl}}/api/reservations/auto-complete
```

#### Usuń rezerwację (tylko PENDING/CANCELLED)
```http
DELETE {{baseUrl}}/api/reservations/1
```

---

## 🎬 Scenariusze Testowe

### 🟢 SCENARIUSZ 1: Pełny Cykl Rezerwacji

```markdown
1. 📋 Sprawdź dostępne samochody
   GET /api/cars

2. 📝 Utwórz nową rezerwację
   POST /api/reservations

3. 🔍 Sprawdź dostępność samochodu
   GET /api/reservations/availability/{carId}

4. ✅ Potwierdź rezerwację
   PUT /api/reservations/{id}/confirm

5. 📊 Sprawdź statystyki
   GET /api/reservations/statistics

6. 🏁 Zakończ rezerwację
   PUT /api/reservations/{id}/complete
```

### 🔴 SCENARIUSZ 2: Test Konfliktów

```markdown
1. 📝 Utwórz rezerwację na 2025-06-20 → 2025-06-25

2. ❌ Spróbuj utworzyć drugą rezerwację na te same daty
   → Oczekiwany błąd 409 Conflict

3. 🔍 Sprawdź dostępność
   → Powinno pokazać konflikt
```

### 🟡 SCENARIUSZ 3: Zarządzanie Rezerwacją

```markdown
1. 📝 Utwórz rezerwację (status: PENDING)

2. ✅ Potwierdź rezerwację (status: CONFIRMED)

3. ❌ Anuluj rezerwację z powodem (status: CANCELLED)

4. 🔍 Sprawdź historię zmian statusu
```

---

## ⚠️ Obsługa Błędów

### Kody Statusów

| Kod | Status | Opis |
|-----|--------|------|
| 200 | OK | Operacja zakończona sukcesem |
| 201 | Created | Rezerwacja utworzona |
| 204 | No Content | Rezerwacja usunięta |
| 400 | Bad Request | Błędne dane wejściowe |
| 404 | Not Found | Nie znaleziono zasobu |
| 409 | Conflict | Konflikt rezerwacji |
| 500 | Server Error | Błąd serwera |

### Przykłady Błędów

#### ❌ Data w przeszłości
```json
{
  "carId": "123123-123-1799",
  "startDate": "2025-06-10",
  "endDate": "2025-06-15"
}
```
**Odpowiedź**: `400 Bad Request`

#### ❌ Nieprawidłowy email
```json
{
  "email": "nieprawidlowy-email"
}
```
**Odpowiedź**: `400 Bad Request`

#### ❌ Samochód niedostępny
```json
{
  "message": "Car is not available for the requested dates",
  "status": 409
}
```

---

## 💻 Przykłady Kodu

### JavaScript/Fetch
```javascript
// Tworzenie rezerwacji
const createReservation = async () => {
  const response = await fetch('http://localhost:8081/api/reservations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      carId: '123123-123-1799',
      firstName: 'Jan',
      lastName: 'Kowalski',
      email: 'jan.kowalski@example.com',
      phone: '+48123456789',
      startDate: '2025-06-20',
      endDate: '2025-06-25'
    })
  });
  
  const reservation = await response.json();
  console.log('Rezerwacja utworzona:', reservation);
};
```

### Python/Requests
```python
import requests

# Sprawdzenie dostępności
def check_availability(car_id, start_date, end_date):
    url = f'http://localhost:8081/api/reservations/availability/{car_id}'
    params = {
        'startDate': start_date,
        'endDate': end_date
    }
    
    response = requests.get(url, params=params)
    return response.json()

# Przykład użycia
availability = check_availability('123123-123-1799', '2025-06-20', '2025-06-25')
print(f"Dostępność: {availability['available']}")
```

### cURL
```bash
# Potwierdzenie rezerwacji
curl -X PUT http://localhost:8081/api/reservations/1/confirm

# Statystyki
curl -X GET http://localhost:8081/api/reservations/statistics
```

---

## 🔧 Kolekcja Postman

### Import kolekcji

1. **Pobierz** przykładową kolekcję Postman
2. **Import** → **File** → Wybierz plik
3. **Ustaw środowisko** z `baseUrl`

### Zmienne środowiskowe
```json
{
  "baseUrl": "http://localhost:8081",
  "carId": "123123-123-1799",
  "reservationId": "1"
}
```

---

## 🎯 Podsumowanie

System rezerwacji Rentiva oferuje kompletne API do zarządzania rezerwacjami samochodów. 

### ✅ Funkcjonalności:
- Tworzenie i zarządzanie rezerwacjami
- Sprawdzanie dostępności w czasie rzeczywistym
- Automatyczne obliczanie cen
- Zarządzanie statusami i cyklem życia rezerwacji
- Raporty i statystyki
- Walidacja danych i obsługa błędów

### 🚀 Następne Kroki:
1. Przetestuj wszystkie endpointy w Postmanie
2. Zintegruj z frontendem
3. Dodaj powiadomienia email/SMS
4. Zaimplementuj płatności

---

**💡 Wskazówka**: Używaj zmiennych w Postmanie do przechowywania ID rezerwacji i samochodów między requestami!

**🎉 Miłego testowania!** 🚗💨

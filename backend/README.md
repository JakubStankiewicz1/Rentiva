# Rentiva Backend API

Professional backend service for Rentiva car rental application built with Spring Boot and MySQL.

## Features

- **RESTful API** for car management
- **MySQL Database** integration with JPA/Hibernate
- **Advanced Filtering** and search capabilities
- **Data Validation** and error handling
- **CORS Configuration** for frontend integration
- **Automatic Data Initialization** from JSON
- **Professional Exception Handling**

## Technologies

- **Spring Boot 3.5.0**
- **Spring Data JPA**
- **MySQL 8.0**
- **Jackson for JSON processing**
- **Bean Validation**
- **Maven**

## Prerequisites

- Java 24 or higher
- Maven 3.6+
- MySQL 8.0+

## Setup Instructions

### 1. Database Setup

Create MySQL database (optional - will be created automatically):
```sql
CREATE DATABASE rentiva_db;
```

### 2. Configuration

Update `src/main/resources/application.properties` if needed:
```properties
# MySQL Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/rentiva_db?createDatabaseIfNotExist=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_password
```

### 3. Run Application

```bash
# Navigate to backend directory
cd backend

# Run with Maven
./mvnw spring-boot:run

# Or on Windows
mvnw.cmd spring-boot:run
```

The application will start on `http://localhost:8080`

## API Endpoints

### Cars Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cars` | Get all cars |
| GET | `/api/cars/{id}` | Get car by ID |
| POST | `/api/cars` | Create new car |
| PUT | `/api/cars/{id}` | Update car |
| DELETE | `/api/cars/{id}` | Delete car |

### Filtering & Search

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cars?brand={brand}` | Filter by brand |
| GET | `/api/cars?type={type}` | Filter by type |
| GET | `/api/cars?search={term}` | Search cars |
| GET | `/api/cars?sortBy=price-asc` | Sort by price ascending |
| GET | `/api/cars?sortBy=price-desc` | Sort by price descending |
| GET | `/api/cars?sortBy=power` | Sort by power |
| GET | `/api/cars?minPrice={min}&maxPrice={max}` | Filter by price range |
| GET | `/api/cars?minPower={power}` | Filter by minimum power |

### Utility Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/` | API information |
| GET | `/api/cars/count` | Get car count |
| GET | `/api/cars/exists/{id}` | Check if car exists |

## Example Usage

### Get All Cars
```bash
curl -X GET http://localhost:8080/api/cars
```

### Search Cars
```bash
curl -X GET "http://localhost:8080/api/cars?search=Bugatti"
```

### Filter by Brand and Type
```bash
curl -X GET "http://localhost:8080/api/cars?brand=Ferrari&type=Luxury"
```

### Create New Car
```bash
curl -X POST http://localhost:8080/api/cars \
  -H "Content-Type: application/json" \
  -d '{
    "id": "new-car-id",
    "title": "New Car",
    "brand": "Test Brand",
    "model": "Test Model",
    "engine": "2.0L",
    "power": 300,
    "acceleration": 5.0,
    "maxSpeed": 250,
    "fuelType": "Petrol",
    "transmission": "Manual",
    "drivetrain": "RWD",
    "type": "Sports",
    "grossPrice": 500
  }'
```

## Data Structure

### Car Entity

```json
{
  "id": "string",
  "title": "string",
  "brand": "string",
  "model": "string",
  "engine": "string",
  "power": "number",
  "acceleration": "number",
  "maxSpeed": "number",
  "fuelType": "string",
  "transmission": "string",
  "drivetrain": "string",
  "type": "string",
  "grossPrice": "number",
  "images": ["string array"],
  "description": {
    "title": "string",
    "mainText": "string",
    "performance": "string",
    "accelerationDetails": "string",
    "interior": "string",
    "craftsmanship": "string",
    "conclusion": "string"
  },
  "pricing": {
    "daily": "number",
    "twoDays": "number",
    "threeDays": "number",
    "weekly": "number",
    "monthly": "number"
  },
  "mileageInfo": {
    "dailyLimit": "number",
    "excessFee": "number",
    "includedKm": "string"
  }
}
```

## Project Structure

```
src/main/java/com/example/backend/
├── BackendApplication.java       # Main application class
├── config/
│   └── CorsConfig.java          # CORS configuration
├── controller/
│   ├── CarController.java       # Car REST endpoints
│   └── HealthController.java    # Health check endpoints
├── dto/
│   └── CarDTO.java             # Data Transfer Objects
├── entity/
│   └── Car.java                # JPA entity
├── exception/
│   ├── CarNotFoundException.java
│   └── GlobalExceptionHandler.java
├── mapper/
│   └── CarMapper.java          # Entity ↔ DTO mapping
├── repository/
│   └── CarRepository.java      # Data access layer
└── service/
    ├── CarService.java         # Business logic
    └── DataInitializerService.java # Data initialization
```

## Development

### Database Schema

The application automatically creates the following MySQL table:

```sql
CREATE TABLE cars (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    engine VARCHAR(255) NOT NULL,
    power INT NOT NULL,
    acceleration DOUBLE NOT NULL,
    max_speed INT NOT NULL,
    fuel_type VARCHAR(255) NOT NULL,
    transmission VARCHAR(255) NOT NULL,
    drivetrain VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    gross_price INT NOT NULL,
    images TEXT,
    description_title TEXT,
    description_main_text TEXT,
    description_performance TEXT,
    description_acceleration_details TEXT,
    description_interior TEXT,
    description_craftsmanship TEXT,
    description_conclusion TEXT,
    price_daily INT,
    price_two_days INT,
    price_three_days INT,
    price_weekly INT,
    price_monthly INT,
    mileage_daily_limit INT,
    mileage_excess_fee INT,
    mileage_included_km VARCHAR(255)
);
```

### Adding New Features

1. Create DTOs in `dto` package
2. Add entities in `entity` package
3. Create repositories in `repository` package
4. Implement business logic in `service` package
5. Add REST endpoints in `controller` package

## Error Handling

The API provides detailed error responses:

```json
{
  "timestamp": "2025-05-29T16:57:00",
  "status": 404,
  "error": "Not Found",
  "message": "Car not found with id: invalid-id",
  "path": "uri=/api/cars/invalid-id"
}
```

## CORS Configuration

Frontend applications running on the following origins are allowed:
- `http://localhost:3000` (React default)
- `http://localhost:5173` (Vite default)
- `http://localhost:5174` (Vite alternative)

## Contributing

1. Follow Spring Boot best practices
2. Add proper validation and error handling
3. Write comprehensive tests
4. Update documentation

## License

Private project for Rentiva application.

# Rentiva - Car Rental Application

A modern car rental application with React frontend, admin panel, and Spring Boot backend.

## 🚀 Live Applications

- **Frontend**: https://rentiva-frontend.onrender.com
- **Admin Panel**: https://rentiva-admin.onrender.com  
- **Backend API**: https://rentiva-backend.onrender.com

## 📊 Backend Health Status

### Automated Monitoring
The backend is automatically monitored by GitHub Actions workflows:

- **Keep Backend Active**: Runs every 2 minutes
- **Database Activity**: Runs every 15 minutes  
- **Backend Monitoring**: Runs every 6 hours

### Manual Health Check
You can manually check backend health by visiting:
```
https://rentiva-backend.onrender.com/api/health
```

### Workflow Status
Check the latest workflow runs at: [GitHub Actions](https://github.com/[your-username]/Rentiva/actions)

## 🏗️ Project Structure

```
Rentiva/
├── frontend/          # React frontend application
├── admin/            # React admin panel
├── backend/          # Spring Boot backend
├── .github/workflows/ # GitHub Actions workflows
└── render.yaml       # Render deployment configuration
```

## 🛠️ Technologies

- **Frontend**: React, Vite, Tailwind CSS
- **Admin Panel**: React, Material-UI
- **Backend**: Spring Boot, Java 21, PostgreSQL
- **Deployment**: Render
- **Monitoring**: GitHub Actions

## 📈 Backend Monitoring Workflows

### 1. Keep Backend Active (Every 2 minutes)
- Health checks
- API endpoint testing
- Basic functionality verification

### 2. Database Activity (Every 15 minutes)  
- Complex database queries
- Search and filtering tests
- Reservation operations

### 3. Backend Monitoring (Every 6 hours)
- Performance testing
- Comprehensive API testing
- Detailed status reporting

## 🔧 Development

### Prerequisites
- Node.js 18+
- Java 21
- Maven

### Running Locally

1. **Backend**:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Admin Panel**:
   ```bash
   cd admin
   npm install
   npm run dev
   ```

## 📝 API Documentation

### Health Check
```
GET /api/health
```

### Cars API
```
GET /api/cars
GET /api/cars/{id}
GET /api/cars/count
GET /api/cars?search={term}
GET /api/cars?brand={brand}&type={type}
```

### Reservations API
```
GET /api/reservations
POST /api/reservations
GET /api/reservations/{id}
GET /api/reservations/upcoming
GET /api/reservations/statistics
```

## 🚨 Troubleshooting

If the backend appears to be down:

1. Check GitHub Actions for recent workflow runs
2. Verify the health endpoint: `https://rentiva-backend.onrender.com/api/health`
3. Check Render dashboard for service status
4. Review workflow logs for error details

## 📞 Support

For issues or questions, check the GitHub Actions logs or create an issue in this repository.

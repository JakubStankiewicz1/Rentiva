import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard/Dashboard'
import CarsPage from './pages/Cars/CarsPage'
import CarDetails from './pages/Cars/CarDetails'
import CarForm from './pages/CarForm/CarForm'
import ReservationsPage from './pages/Reservations/ReservationsPage'
import LoginPage from './pages/Login/LoginPage'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider, createTheme } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

// Create a custom theme for the application
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        },
      },
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
            {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            {/* Main application layout with nested routes */}
            <Route element={<Layout />}>
              {/* Dashboard route */}
              <Route index element={<Dashboard />} />
                {/* Cars routes */}
              <Route path="cars">
                <Route index element={<CarsPage />} />
                <Route path="new" element={<CarForm />} />
                <Route path=":id" element={<CarDetails />} />
                <Route path="edit/:id" element={<CarForm />} />
              </Route>
              {/* Reservations routes */}
              <Route path="reservations">
                <Route index element={<ReservationsPage />} />
              </Route>
            </Route>
          </Route>

          {/* Redirect any unknown paths to dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App

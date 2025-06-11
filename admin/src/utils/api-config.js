/**
 * Konfiguracja API dla panelu administracyjnego
 */

const API_BASE_URL = import.meta.env.PROD 
  ? import.meta.env.VITE_API_URL || 'https://rentiva-backend.onrender.com/api'
  : 'http://localhost:8081/api';

export const API_ENDPOINTS = {
  // Base URL for the API
  BASE_URL: API_BASE_URL,
  
  // Cars endpoints
  CARS: `${API_BASE_URL}/cars`,
  CAR_BY_ID: (id) => `${API_BASE_URL}/cars/${id}`,
  CARS_BY_BRAND: (brand) => `${API_BASE_URL}/cars/brands/${brand}`,
  CARS_BY_TYPE: (type) => `${API_BASE_URL}/cars/types/${type}`,
  CARS_SEARCH: (query) => `${API_BASE_URL}/cars/search?q=${query}`,
  CARS_COUNT: `${API_BASE_URL}/cars/count`,
  CARS_EXISTS: (id) => `${API_BASE_URL}/cars/exists/${id}`,
  CARS_BY_POWER: (minPower) => `${API_BASE_URL}/cars/filter/power/${minPower}`,
  CARS_BY_PRICE: (minPrice, maxPrice) => `${API_BASE_URL}/cars/filter/price?min=${minPrice}&max=${maxPrice}`,
    // Auth endpoints
  AUTH_LOGIN: `${API_BASE_URL}/auth/login`,
  AUTH_REGISTER: `${API_BASE_URL}/auth/register`,
  AUTH_LOGOUT: `${API_BASE_URL}/auth/logout`,
  AUTH_PROFILE: `${API_BASE_URL}/auth/profile`,
  
  // File upload endpoints
  UPLOAD_CAR_IMAGE: `${API_BASE_URL}/files/upload/car`,
  CAR_IMAGES: (carId) => `${API_BASE_URL}/files/car/${carId}`,
  DELETE_CAR_IMAGE: (imageId) => `${API_BASE_URL}/files/${imageId}`,
  SET_MAIN_IMAGE: (imageId, carId) => `${API_BASE_URL}/files/${imageId}/car/${carId}/main`,
};

export default API_ENDPOINTS;

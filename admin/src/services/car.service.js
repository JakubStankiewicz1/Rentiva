import axios from 'axios';
import { API_ENDPOINTS } from '../utils/api-config';

// Create an axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_ENDPOINTS.BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('renToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
apiClient.interceptors.response.use(
  response => response,
  error => {
    // Handle unauthorized errors (401) - redirect to login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('renUser');
      localStorage.removeItem('renToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * Serwis do zarządzania samochodami w systemie
 */
const CarService = {
  /**
   * Pobiera wszystkie samochody
   * @param {Object} filters - Opcjonalne filtry (brand, type, minPower, itd.)
   * @returns {Promise<Array>} - Lista samochodów
   */
  getAllCars: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    
    // Dodaj filtry do query params
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value);
      }
    });
    
    const queryString = queryParams.toString();
    const url = queryString ? `${API_ENDPOINTS.CARS}?${queryString}` : API_ENDPOINTS.CARS;
    
    const response = await apiClient.get(url);
    return response.data;
  },

  /**
   * Pobiera szczegóły samochodu o podanym ID
   * @param {string} id - ID samochodu
   * @returns {Promise<Object>} - Szczegóły samochodu
   */
  getCarById: async (id) => {
    const response = await apiClient.get(API_ENDPOINTS.CAR_BY_ID(id));
    return response.data;
  },
  /**
   * Tworzy nowy samochód
   * @param {Object} carData - Dane samochodu
   * @returns {Promise<Object>} - Utworzony samochód
   */
  createCar: async (carData) => {
    const response = await apiClient.post(API_ENDPOINTS.CARS, carData);
    return response.data;
  },

  /**
   * Aktualizuje samochód o podanym ID
   * @param {string} id - ID samochodu
   * @param {Object} carData - Zaktualizowane dane samochodu
   * @returns {Promise<Object>} - Zaktualizowany samochód
   */
  updateCar: async (id, carData) => {
    const response = await apiClient.put(API_ENDPOINTS.CAR_BY_ID(id), carData);
    return response.data;
  },

  /**
   * Usuwa samochód o podanym ID
   * @param {string} id - ID samochodu
   * @returns {Promise<void>}
   */
  deleteCar: async (id) => {
    await apiClient.delete(API_ENDPOINTS.CAR_BY_ID(id));
  },

  /**
   * Pobiera samochody według marki
   * @param {string} brand - Marka samochodu
   * @returns {Promise<Array>} - Lista samochodów danej marki
   */
  getCarsByBrand: async (brand) => {
    const response = await apiClient.get(API_ENDPOINTS.CARS_BY_BRAND(brand));
    return response.data;
  },

  /**
   * Pobiera samochody według typu
   * @param {string} type - Typ samochodu
   * @returns {Promise<Array>} - Lista samochodów danego typu
   */
  getCarsByType: async (type) => {
    const response = await apiClient.get(API_ENDPOINTS.CARS_BY_TYPE(type));
    return response.data;
  },
  /**
   * Wyszukuje samochody według podanego zapytania
   * @param {string} query - Tekst wyszukiwania
   * @returns {Promise<Array>} - Lista pasujących samochodów
   */
  searchCars: async (query) => {
    const response = await apiClient.get(API_ENDPOINTS.CARS_SEARCH(query));
    return response.data;
  },

  /**
   * Pobiera liczbę wszystkich samochodów
   * @returns {Promise<number>} - Liczba samochodów
   */
  getCarCount: async () => {
    const response = await apiClient.get(API_ENDPOINTS.CARS_COUNT);
    return response.data;
  },

  /**
   * Sprawdza czy samochód o podanym ID istnieje
   * @param {string} id - ID samochodu
   * @returns {Promise<boolean>} - Czy samochód istnieje
   */
  carExists: async (id) => {
    const response = await apiClient.get(API_ENDPOINTS.CARS_EXISTS(id));
    return response.data;
  },
  /**
   * Pobiera samochody o mocy większej niż podana
   * @param {number} minPower - Minimalna moc
   * @returns {Promise<Array>} - Lista samochodów
   */
  getCarsByMinimumPower: async (minPower) => {
    const response = await apiClient.get(API_ENDPOINTS.CARS_BY_POWER(minPower));
    return response.data;
  },

  /**
   * Pobiera samochody w podanym zakresie cenowym
   * @param {number} minPrice - Minimalna cena
   * @param {number} maxPrice - Maksymalna cena
   * @returns {Promise<Array>} - Lista samochodów
   */
  getCarsByPriceRange: async (minPrice, maxPrice) => {
    const response = await apiClient.get(API_ENDPOINTS.CARS_BY_PRICE(minPrice, maxPrice));
    return response.data;
  },

  /**
   * Sprawdza czy samochód ma rezerwacje
   * @param {string} id - ID samochodu
   * @returns {Promise<boolean>} - Czy samochód ma rezerwacje
   */
  carHasReservations: async (id) => {
    const response = await apiClient.get(`${API_ENDPOINTS.CAR_BY_ID(id)}/has-reservations`);
    return response.data;
  },

  /**
   * Pobiera rezerwacje dla samochodu
   * @param {string} id - ID samochodu
   * @returns {Promise<Array>} - Lista rezerwacji
   */
  getReservationsForCar: async (id) => {
    const response = await apiClient.get(`${API_ENDPOINTS.CAR_BY_ID(id)}/reservations`);
    return response.data;
  }
};

export default CarService;

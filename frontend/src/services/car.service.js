import apiRequest from '../utils/api-config';

const CarService = {  // Pobierz wszystkie samochody
  getAllCars: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      // Dodaj filtry do query params jeśli istnieją
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          queryParams.append(key, value);
        }
      });
      
      const endpoint = `/cars${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const data = await apiRequest(endpoint);
      
      // Parsuj obrazy z JSON stringów jeśli potrzebne
      if (Array.isArray(data)) {
        return data.map(car => ({
          ...car,
          images: CarService.parseImages(car.images)
        }));
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching cars:', error);
      throw new Error('Nie udało się pobrać listy samochodów');
    }
  },
  // Pobierz samochód po ID
  getCarById: async (id) => {
    try {
      const data = await apiRequest(`/cars/${id}`);
      return {
        ...data,
        images: CarService.parseImages(data.images)
      };
    } catch (error) {
      console.error(`Error fetching car with id ${id}:`, error);
      throw new Error('Nie udało się pobrać szczegółów samochodu');
    }
  },

  // Wyszukaj samochody
  searchCars: async (searchTerm) => {
    try {
      const queryParams = new URLSearchParams({ search: searchTerm });
      return await apiRequest(`/cars/search?${queryParams.toString()}`);
    } catch (error) {
      console.error('Error searching cars:', error);
      throw new Error('Nie udało się wyszukać samochodów');
    }
  },

  // Pobierz dostępne marki
  getAvailableBrands: async () => {
    try {
      return await apiRequest('/cars/brands');
    } catch (error) {
      console.error('Error fetching brands:', error);
      throw new Error('Nie udało się pobrać listy marek');
    }
  },

  // Pobierz dostępne typy
  getAvailableTypes: async () => {
    try {
      return await apiRequest('/cars/types');
    } catch (error) {
      console.error('Error fetching types:', error);
      throw new Error('Nie udało się pobrać listy typów');
    }
  },

  // Pobierz samochody po marce
  getCarsByBrand: async (brand) => {
    try {
      return await apiRequest(`/cars?brand=${encodeURIComponent(brand)}`);
    } catch (error) {
      console.error(`Error fetching cars for brand ${brand}:`, error);
      throw new Error('Nie udało się pobrać samochodów dla wybranej marki');
    }
  },

  // Pobierz samochody po typie
  getCarsByType: async (type) => {
    try {
      return await apiRequest(`/cars?type=${encodeURIComponent(type)}`);
    } catch (error) {
      console.error(`Error fetching cars for type ${type}:`, error);
      throw new Error('Nie udało się pobrać samochodów dla wybranego typu');
    }
  },
  // Sprawdź dostępność samochodu
  checkCarAvailability: async (carId, startDate, endDate) => {
    try {
      const queryParams = new URLSearchParams({
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
      });
      
      return await apiRequest(`/cars/${carId}/availability?${queryParams.toString()}`);
    } catch (error) {
      console.error(`Error checking availability for car ${carId}:`, error);
      throw new Error('Nie udało się sprawdzić dostępności samochodu');
    }
  },

  // Helper funkcja do parsowania obrazów z JSON stringa
  parseImages: (images) => {
    if (!images) return [];
    
    // Jeśli to już tablica, zwróć ją
    if (Array.isArray(images)) return images;
    
    // Jeśli to string, spróbuj sparsować jako JSON
    if (typeof images === 'string') {
      try {
        const parsed = JSON.parse(images);
        return Array.isArray(parsed) ? parsed : [images];
      } catch (e) {
        // Jeśli nie da się sparsować, zwróć jako pojedynczy element
        return [images];
      }
    }
    
    return [];
  }
};

export default CarService;

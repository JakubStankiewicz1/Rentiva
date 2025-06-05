
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import assets from '../assets/assets';
import CarService from '../services/car.service';
import ImageService from '../services/image.service';

// Tworzymy kontekst
const RentivaContext = createContext();

// Hook do używania kontekstu
export const useRentiva = () => {
  const context = useContext(RentivaContext);
  if (!context) {
    throw new Error('useRentiva must be used within a RentivaProvider');
  }
  return context;
};

// Provider komponent
export const RentivaProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  // Hero cars data for homepage carousel
  const heroCars = [
    {
      id: 'hero-lamborghini-huracan',
      image: assets.HomeHeroImageOne,
      brand: "Lamborghini",
      model: "Huracan",
      power: "610",
      acceleration: "3.2",
    },
    {
      id: 'hero-mclaren-720s',
      image: assets.HomeHeroImageTwo,
      brand: "McLaren",
      model: "720S",
      power: "720",
      acceleration: "2.9",
    },
    {
      id: 'hero-porsche-911',
      image: assets.HomeHeroImageThree,
      brand: "Porsche",
      model: "911 turbo S",
      power: "640",
      acceleration: "2.5",
    },
  ];
  // Inicjalizacja danych samochodów z backendu
  useEffect(() => {
    const initializeCars = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Pobierz dane samochodów z backendu
        const carsData = await CarService.getAllCars();        // Przetwórz dane - dodaj obrazy
        const processedCars = carsData.map((car) => {
          // Use images directly from backend data
          let finalImages = [];
          
          if (car.images && car.images.length > 0) {
            // Filter out any empty or invalid URLs
            finalImages = car.images.filter(imageUrl => 
              imageUrl && 
              typeof imageUrl === 'string' && 
              imageUrl.trim() !== ''
            );
          }
          
          return {
            ...car,
            images: finalImages,
            mainImage: finalImages[0] || null,
            // Keep original images for reference
            originalImages: car.originalImages || car.images || []
          };
        });
        
        setCars(processedCars);
        console.log('Pomyślnie załadowano samochody z backendu:', processedCars);
        
      } catch (err) {
        console.error('Błąd podczas ładowania danych samochodów z backendu:', err);
        setError('Nie udało się załadować danych samochodów z serwera');
        
        // Fallback - możemy spróbować załadować dane z JSON jako backup
        try {
          console.log('Próba fallback - ładowanie z lokalnych danych...');
          // Tu można dodać fallback do lokalnych danych jeśli potrzebne
          setError('Połączenie z serwerem niedostępne. Pracujesz w trybie offline.');
        } catch (fallbackError) {
          console.error('Fallback również nie udany:', fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    initializeCars();
  }, []);  // Funkcja do pobierania samochodu po ID - z backendu lub cache
  const getCarById = useCallback(async (id) => {
    // Najpierw sprawdź w cache (lokalny stan)
    const cachedCar = cars.find(car => car.id === id);
    if (cachedCar) {
      return cachedCar;
    }
    
    // Jeśli nie ma w cache, pobierz z backendu
    try {
      const carData = await CarService.getCarById(id);
      
      // Use images directly from backend data instead of separate API call
      let finalImages = [];
      
      if (carData.images && carData.images.length > 0) {
        // Filter out any empty or invalid URLs
        finalImages = carData.images.filter(imageUrl => 
          imageUrl && 
          typeof imageUrl === 'string' && 
          imageUrl.trim() !== ''
        );
      }
      
      const processedCar = {
        ...carData,
        images: finalImages,
        mainImage: finalImages[0] || null,
        originalImages: carData.originalImages || carData.images || []
      };
      
      // Dodaj do cache
      setCars(prevCars => {
        const existingIndex = prevCars.findIndex(car => car.id === id);
        if (existingIndex >= 0) {
          // Zaktualizuj istniejący
          const newCars = [...prevCars];
          newCars[existingIndex] = processedCar;
          return newCars;
        } else {
          // Dodaj nowy
          return [...prevCars, processedCar];
        }
      });
      
      return processedCar;
    } catch (error) {
      console.error(`Błąd podczas pobierania samochodu ${id}:`, error);
      return null;
    }
  }, [cars]);
  // Funkcja do pobierania samochodów po typie/kategorii
  const getCarsByType = async (type) => {
    try {
      const carsData = await CarService.getCarsByType(type);
      
      // Process data similar to initializeCars - use direct URLs from backend
      const processedCars = carsData.map((car) => {
        let finalImages = [];
        
        if (car.images && car.images.length > 0) {
          // Filter out any empty or invalid URLs
          finalImages = car.images.filter(imageUrl => 
            imageUrl && 
            typeof imageUrl === 'string' && 
            imageUrl.trim() !== ''
          );
        }
        
        return {
          ...car,
          images: finalImages,
          mainImage: finalImages[0] || null,
          originalImages: car.originalImages || car.images || []
        };
      });
        return processedCars;
    } catch (error) {
      console.error(`Błąd podczas pobierania samochodów typu ${type}:`, error);
      return [];
    }
  };
  // Funkcja do wyszukiwania samochodów
  const searchCars = async (query) => {
    if (!query || query.trim() === '') {
      return cars; // Zwróć wszystkie samochody jeśli brak query
    }
    
    try {
      const searchResults = await CarService.searchCars(query);
      
      // Process results - use direct URLs from backend
      const processedResults = searchResults.map((car) => {
        let finalImages = [];
        
        if (car.images && car.images.length > 0) {
          // Filter out any empty or invalid URLs
          finalImages = car.images.filter(imageUrl => 
            imageUrl && 
            typeof imageUrl === 'string' && 
            imageUrl.trim() !== ''
          );
        }
        
        return {
          ...car,
          images: finalImages,
          mainImage: finalImages[0] || null,
          originalImages: car.originalImages || car.images || []
        };
      });
      
      return processedResults;
    } catch (error) {
      console.error('Błąd podczas wyszukiwania:', error);
      
      // Fallback - wyszukaj lokalnie
      const lowercaseQuery = query.toLowerCase();
      return cars.filter(car => 
        car.title?.toLowerCase().includes(lowercaseQuery) ||
        car.brand?.toLowerCase().includes(lowercaseQuery) ||
        car.model?.toLowerCase().includes(lowercaseQuery) ||
        car.engine?.toLowerCase().includes(lowercaseQuery)
      );
    }
  };
  // Funkcja do pobierania dostępnych brandów
  const getAvailableBrands = async () => {
    try {
      // Spróbuj pobrać z backendu
      const brands = await CarService.getAvailableBrands();
      return brands;
    } catch (error) {
      console.error('Błąd podczas pobierania marek z backendu:', error);
      
      // Fallback - wyciągnij z lokalnych danych
      const brands = cars.map(car => car.brand || car.title?.split(' ')[0]).filter(Boolean);
      return [...new Set(brands)]; // Usuń duplikaty
    }
  };

  // Funkcja do filtrowania po brandzie
  const getCarsByBrand = async (brand) => {
    try {
      const carsData = await CarService.getCarsByBrand(brand);
        // Process data - use direct URLs from backend
      const processedCars = carsData.map((car) => {
        let finalImages = [];
        
        if (car.images && car.images.length > 0) {
          // Filter out any empty or invalid URLs
          finalImages = car.images.filter(imageUrl => 
            imageUrl && 
            typeof imageUrl === 'string' && 
            imageUrl.trim() !== ''
          );
        }
        
        return {
          ...car,
          images: finalImages,
          mainImage: finalImages[0] || null,
          originalImages: car.originalImages || car.images || []
        };
      });
      
      return processedCars;
    } catch (error) {
      console.error(`Błąd podczas pobierania samochodów marki ${brand}:`, error);
      
      // Fallback - filtruj lokalnie
      return cars.filter(car => 
        car.brand?.toLowerCase() === brand.toLowerCase() ||
        car.title?.toLowerCase().includes(brand.toLowerCase())
      );
    }
  };
  // Stan dla wybranego samochodu (przydatne dla CarDetails)
  const selectCar = useCallback((carId) => {
    const car = cars.find(car => car.id === carId);
    setSelectedCar(car);
    return car;
  }, [cars]);
  // Funkcja do pobierania obrazów samochodu
  const getCarImages = (car) => {
    if (!car) return [];
    
    // Zwróć obrazy z backendu jeśli są dostępne
    if (car.images && car.images.length > 0) {
      return car.images;
    }
    
    // Fallback - spróbuj zmapować oryginalne nazwy
    if (car.originalImages && car.originalImages.length > 0) {
      return car.originalImages.map(imageName => assets[imageName]).filter(Boolean);
    }
    
    return [];
  };

  // Funkcja do pobierania głównego obrazu samochodu
  const getCarMainImage = (car) => {
    if (!car) return null;
    
    // Zwróć główny obraz z backendu
    if (car.mainImage) {
      return car.mainImage;
    }
    
    // Fallback - pierwszy obraz z listy
    const images = getCarImages(car);
    return images.length > 0 ? images[0] : null;
  };

  // Dodatkowa funkcja do odświeżania danych samochodu
  const refreshCarData = async (carId) => {
    try {
      const updatedCar = await getCarById(carId);
      return updatedCar;
    } catch (error) {
      console.error(`Błąd podczas odświeżania danych samochodu ${carId}:`, error);
      return null;
    }
  };

  // Funkcja do sprawdzania dostępności samochodu
  const checkCarAvailability = async (carId, startDate, endDate) => {
    try {
      return await CarService.checkCarAvailability(carId, startDate, endDate);
    } catch (error) {
      console.error(`Błąd podczas sprawdzania dostępności samochodu ${carId}:`, error);
      throw error;
    }
  };
  // Dane kontekstu
  const contextValue = {
    // Stan
    cars,
    heroCars,
    loading,
    error,
    selectedCar,
    
    // Funkcje async (z backendu)
    getCarById,
    getCarsByType,
    getCarsByBrand,
    searchCars,
    getAvailableBrands,
    refreshCarData,
    checkCarAvailability,
    
    // Funkcje sync (pomocnicze)
    selectCar,
    getCarImages,
    getCarMainImage,
    
    // Services (dostęp bezpośredni jeśli potrzebny)
    CarService,
    ImageService,
    
    // Assets helper (fallback)
    assets,
  };

  return (
    <RentivaContext.Provider value={contextValue}>
      {children}
    </RentivaContext.Provider>
  );
};

export default RentivaContext;
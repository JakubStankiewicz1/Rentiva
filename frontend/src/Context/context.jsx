
import React, { createContext, useContext, useState, useEffect } from 'react';
import assets from '../assets/assets';
import carsData from '../assets/carsData.json';

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

  // Inicjalizacja danych samochodów
  useEffect(() => {
    const initializeCars = async () => {
      try {
        setLoading(true);
        
        // Mapujemy dane z JSON na pełne obiekty z obrazami z assets
        const processedCars = carsData.map(car => ({
          ...car,
          images: car.images.map(imageName => assets[imageName]).filter(Boolean),
          mainImage: assets[car.images[0]] || null,
        }));
        
        setCars(processedCars);
        setError(null);
      } catch (err) {
        console.error('Error loading cars data:', err);
        setError('Failed to load cars data');
      } finally {
        setLoading(false);
      }
    };

    initializeCars();
  }, []);

  // Funkcja do pobierania samochodu po ID
  const getCarById = (id) => {
    return cars.find(car => car.id === id) || null;
  };

  // Funkcja do pobierania samochodów po typie/kategorii
  const getCarsByType = (type) => {
    // Można rozszerzyć w przyszłości o filtrowanie po typie
    return cars.filter(car => car.type === type);
  };

  // Funkcja do wyszukiwania samochodów
  const searchCars = (query) => {
    if (!query) return cars;
    
    const lowercaseQuery = query.toLowerCase();
    return cars.filter(car => 
      car.title.toLowerCase().includes(lowercaseQuery) ||
      car.engine.toLowerCase().includes(lowercaseQuery) ||
      car.power.toLowerCase().includes(lowercaseQuery)
    );
  };

  // Funkcja do pobierania dostępnych brandów
  const getAvailableBrands = () => {
    const brands = cars.map(car => {
      // Wyciągamy brand z tytułu (np. "Bugatti Chiron 110 ANS" -> "Bugatti")
      return car.title.split(' ')[0];
    });
    
    return [...new Set(brands)]; // Usuwamy duplikaty
  };

  // Funkcja do filtrowania po brandzie
  const getCarsByBrand = (brand) => {
    return cars.filter(car => 
      car.title.toLowerCase().includes(brand.toLowerCase())
    );
  };

  // Stan dla wybranego samochodu (przydatne dla CarDetails)
  const selectCar = (carId) => {
    const car = getCarById(carId);
    setSelectedCar(car);
    return car;
  };

  // Funkcja do pobierania obrazów samochodu
  const getCarImages = (car) => {
    if (!car || !car.images) return [];
    return car.images;
  };

  // Funkcja do pobierania głównego obrazu samochodu
  const getCarMainImage = (car) => {
    if (!car || !car.images || car.images.length === 0) return null;
    return car.images[0];
  };

  // Dane kontekstu
  const contextValue = {
    // Stan
    cars,
    heroCars,
    loading,
    error,
    selectedCar,
    
    // Funkcje
    getCarById,
    getCarsByType,
    getCarsByBrand,
    searchCars,
    getAvailableBrands,
    selectCar,
    getCarImages,
    getCarMainImage,
    
    // Assets helper
    assets,
  };

  return (
    <RentivaContext.Provider value={contextValue}>
      {children}
    </RentivaContext.Provider>
  );
};

export default RentivaContext;
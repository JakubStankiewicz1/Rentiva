
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import assets from '../assets/assets';
import CarService from '../services/car.service';
import ImageService from '../services/image.service';


const RentivaContext = createContext();


export const useRentiva = () => {
  const context = useContext(RentivaContext);
  if (!context) {
    throw new Error('useRentiva must be used within a RentivaProvider');
  }
  return context;
};

export const RentivaProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

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

  useEffect(() => {
    const initializeCars = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const carsData = await CarService.getAllCars();
        const processedCars = carsData.map((car) => {

          let finalImages = [];
          
          if (car.images && car.images.length > 0) {

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
        
        setCars(processedCars);
        console.log('Pomyślnie załadowano samochody z backendu:', processedCars);
        
      } catch (err) {
        console.error('Błąd podczas ładowania danych samochodów z backendu:', err);
        setError('Nie udało się załadować danych samochodów z serwera');
        

        try {
          console.log('Próba fallback - ładowanie z lokalnych danych...');

          setError('Połączenie z serwerem niedostępne. Pracujesz w trybie offline.');
        } catch (fallbackError) {
          console.error('Fallback również nie udany:', fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    initializeCars();
  }, []);
  const getCarById = useCallback(async (id) => {
    const cachedCar = cars.find(car => car.id === id);
    if (cachedCar) {
      return cachedCar;
    }
    
    try {
      const carData = await CarService.getCarById(id);
      
      let finalImages = [];
      
      if (carData.images && carData.images.length > 0) {

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
      
      setCars(prevCars => {
        const existingIndex = prevCars.findIndex(car => car.id === id);
        if (existingIndex >= 0) {
          const newCars = [...prevCars];
          newCars[existingIndex] = processedCar;
          return newCars;
        } else {
          return [...prevCars, processedCar];
        }
      });
      
      return processedCar;
    } catch (error) {
      console.error(`Błąd podczas pobierania samochodu ${id}:`, error);
      return null;
    }
  }, [cars]);

  const getCarsByType = async (type) => {
    try {
      const carsData = await CarService.getCarsByType(type);
      
      const processedCars = carsData.map((car) => {
        let finalImages = [];
        
        if (car.images && car.images.length > 0) {

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

  const searchCars = async (query) => {
    if (!query || query.trim() === '') {
      return cars;
    }
    
    try {
      const searchResults = await CarService.searchCars(query);
      
      const processedResults = searchResults.map((car) => {
        let finalImages = [];
        
        if (car.images && car.images.length > 0) {

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
      
      const lowercaseQuery = query.toLowerCase();
      return cars.filter(car => 
        car.title?.toLowerCase().includes(lowercaseQuery) ||
        car.brand?.toLowerCase().includes(lowercaseQuery) ||
        car.model?.toLowerCase().includes(lowercaseQuery) ||
        car.engine?.toLowerCase().includes(lowercaseQuery)
      );
    }
  };

  const getAvailableBrands = async () => {
    try {
      const brands = await CarService.getAvailableBrands();
      return brands;
    } catch (error) {
      console.error('Błąd podczas pobierania marek z backendu:', error);
      
      const brands = cars.map(car => car.brand || car.title?.split(' ')[0]).filter(Boolean);
      return [...new Set(brands)];
    }
  };

  const getCarsByBrand = async (brand) => {
    try {
      const carsData = await CarService.getCarsByBrand(brand);
      const processedCars = carsData.map((car) => {
        let finalImages = [];
        
        if (car.images && car.images.length > 0) {
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
      
      return cars.filter(car => 
        car.brand?.toLowerCase() === brand.toLowerCase() ||
        car.title?.toLowerCase().includes(brand.toLowerCase())
      );
    }
  };
  const selectCar = useCallback((carId) => {
    const car = cars.find(car => car.id === carId);
    setSelectedCar(car);
    return car;
  }, [cars]);
  const getCarImages = (car) => {
    if (!car) return [];
    
    if (car.images && car.images.length > 0) {
      return car.images;
    }
    
    if (car.originalImages && car.originalImages.length > 0) {
      return car.originalImages.map(imageName => assets[imageName]).filter(Boolean);
    }
    
    return [];
  };

  const getCarMainImage = (car) => {
    if (!car) return null;
    
    if (car.mainImage) {
      return car.mainImage;
    }
    
    const images = getCarImages(car);
    return images.length > 0 ? images[0] : null;
  };

  const refreshCarData = async (carId) => {
    try {
      const updatedCar = await getCarById(carId);
      return updatedCar;
    } catch (error) {
      console.error(`Błąd podczas odświeżania danych samochodu ${carId}:`, error);
      return null;
    }
  };

  const checkCarAvailability = async (carId, startDate, endDate) => {
    try {
      return await CarService.checkCarAvailability(carId, startDate, endDate);
    } catch (error) {
      console.error(`Błąd podczas sprawdzania dostępności samochodu ${carId}:`, error);
      throw error;
    }
  };
  const contextValue = {
    cars,
    heroCars,
    loading,
    error,
    selectedCar,
    
    getCarById,
    getCarsByType,
    getCarsByBrand,
    searchCars,
    getAvailableBrands,
    refreshCarData,
    checkCarAvailability,
    
    selectCar,
    getCarImages,
    getCarMainImage,
    
    CarService,
    ImageService,
    
    assets,
  };

  return (
    <RentivaContext.Provider value={contextValue}>
      {children}
    </RentivaContext.Provider>
  );
};

export default RentivaContext;
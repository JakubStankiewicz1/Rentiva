import apiRequest from '../utils/api-config';

const ImageService = {
  // Pobierz obrazy dla samochodu
  getCarImages: async (carId) => {
    try {
      return await apiRequest(`/files/car/${carId}/images`);
    } catch (error) {
      console.error(`Error fetching images for car ${carId}:`, error);
      // Zwróć pustą tablicę jeśli nie udało się pobrać obrazów
      return [];
    }
  },
  // Pobierz URL obrazu
  getImageUrl: (imagePath) => {
    if (!imagePath) return null;
    
    // Jeśli to już pełny URL, zwróć go
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // Sprawdź czy to nazwa z assets (fallback)
    if (imagePath && !imagePath.includes('/') && !imagePath.includes('.')) {
      // To może być nazwa z assets jak "BugattiChironOne"
      return null; // Pozwól context obsłużyć to przez assets
    }
    
    // W przeciwnym razie zbuduj URL z backendu
    return `http://localhost:8080/uploads/${imagePath}`;
  },

  // Pobierz główny obraz samochodu
  getCarMainImage: async (carId) => {
    try {
      const images = await ImageService.getCarImages(carId);
      if (images && images.length > 0) {
        // Znajdź główny obraz lub weź pierwszy
        const mainImage = images.find(img => img.isMain) || images[0];
        return ImageService.getImageUrl(mainImage.url || mainImage.path);
      }
      return null;
    } catch (error) {
      console.error(`Error fetching main image for car ${carId}:`, error);
      return null;
    }
  },

  // Pomocnicza funkcja do mapowania starych nazw obrazów na nowe URLs
  mapLegacyImageName: (imageName) => {
    // Mapowanie starych nazw z assets na prawdopodobne nazwy plików
    const imageMapping = {
      'BugattiChironOne': 'bugatti-chiron-1.jpg',
      'BugattiChironTwo': 'bugatti-chiron-2.jpg',
      'BugattiChironThree': 'bugatti-chiron-3.jpg',
      'BugattiChironFour': 'bugatti-chiron-4.jpg',
      'BugattiChironFive': 'bugatti-chiron-5.jpg',
      'BugattiDivo': 'bugatti-divo.jpg',
      // Dodaj więcej mapowań jeśli potrzebne
    };
    
    return imageMapping[imageName] || `${imageName.toLowerCase()}.jpg`;
  }
};

export default ImageService;

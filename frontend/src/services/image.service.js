import apiRequest from '../utils/api-config';

const ImageService = {

  getCarImages: async (carId) => {
    try {
      return await apiRequest(`/files/car/${carId}/images`);
    } catch (error) {
      console.error(`Error fetching images for car ${carId}:`, error);

      return [];
    }
  },

  getImageUrl: (imagePath) => {
    if (!imagePath) return null;
    

    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    

    if (imagePath && !imagePath.includes('/') && !imagePath.includes('.')) {

      return null; 
    }
    

    return `http://localhost:8080/uploads/${imagePath}`;
  },


  getCarMainImage: async (carId) => {
    try {
      const images = await ImageService.getCarImages(carId);
      if (images && images.length > 0) {

        const mainImage = images.find(img => img.isMain) || images[0];
        return ImageService.getImageUrl(mainImage.url || mainImage.path);
      }
      return null;
    } catch (error) {
      console.error(`Error fetching main image for car ${carId}:`, error);
      return null;
    }
  },


  mapLegacyImageName: (imageName) => {

    const imageMapping = {
      'BugattiChironOne': 'bugatti-chiron-1.jpg',
      'BugattiChironTwo': 'bugatti-chiron-2.jpg',
      'BugattiChironThree': 'bugatti-chiron-3.jpg',
      'BugattiChironFour': 'bugatti-chiron-4.jpg',
      'BugattiChironFive': 'bugatti-chiron-5.jpg',
      'BugattiDivo': 'bugatti-divo.jpg',
    };
    
    return imageMapping[imageName] || `${imageName.toLowerCase()}.jpg`;
  }
};

export default ImageService;

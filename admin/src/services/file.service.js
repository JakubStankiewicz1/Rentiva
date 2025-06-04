import axios from 'axios';
import { API_ENDPOINTS } from '../utils/api-config';

/**
 * Serwis obsługujący przesyłanie plików
 */
const FileService = {
  /**
   * Przesyła plik obrazu samochodu
   * @param {File} file - Plik obrazu
   * @param {string} carId - ID samochodu
   * @returns {Promise<Object>} - Informacje o przesłanym pliku
   */
  uploadCarImage: async (file, carId) => {
    // Tworzymy FormData, aby przesłać plik
    const formData = new FormData();
    formData.append('file', file);
    formData.append('carId', carId);
    
    const token = localStorage.getItem('renToken');
    
    const response = await axios.post(API_ENDPOINTS.UPLOAD_CAR_IMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response.data;
  },

  /**
   * Pobiera wszystkie obrazy dla danego samochodu
   * @param {string} carId - ID samochodu
   * @returns {Promise<Array>} - Lista informacji o obrazach
   */
  getCarImages: async (carId) => {
    const response = await axios.get(API_ENDPOINTS.CAR_IMAGES(carId));
    return response.data;
  },

  /**
   * Usuwa obraz samochodu
   * @param {string} imageId - ID obrazu
   * @returns {Promise<void>}
   */
  deleteCarImage: async (imageId) => {
    const token = localStorage.getItem('renToken');
    
    await axios.delete(API_ENDPOINTS.DELETE_CAR_IMAGE(imageId), {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  /**
   * Ustawa obraz jako główny dla samochodu
   * @param {string} imageId - ID obrazu
   * @param {string} carId - ID samochodu
   * @returns {Promise<Object>} - Zaktualizowana informacja o obrazie
   */
  setMainImage: async (imageId, carId) => {
    const token = localStorage.getItem('renToken');
    
    const response = await axios.put(
      API_ENDPOINTS.SET_MAIN_IMAGE(imageId, carId),
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    return response.data;
  }
};

export default FileService;

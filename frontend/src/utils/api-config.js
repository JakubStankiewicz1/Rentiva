const API_BASE_URL = import.meta.env.PROD 
  ? 'https://rentiva.onrender.com/api'
  : 'http://localhost:8081/api';

const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Debug logging
  console.log('=== API REQUEST DEBUG ===');
  console.log('Environment:', import.meta.env.PROD ? 'PRODUCTION' : 'DEVELOPMENT');
  console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
  console.log('API_BASE_URL:', API_BASE_URL);
  console.log('Endpoint:', endpoint);
  console.log('Full URL:', url);
  console.log('========================');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      console.error(`API request failed for ${endpoint}:`, {
        status: response.status,
        statusText: response.statusText,
        url: url
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

export default apiRequest;

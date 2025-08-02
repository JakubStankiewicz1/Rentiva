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
  console.log('Options:', options);
  console.log('========================');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    console.log('Sending request to:', url);
    const response = await fetch(url, config);
    
    console.log('Response received:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });
    
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      let errorData = null;
      
      try {
        errorData = await response.json();
        console.error('Error response data:', errorData);
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (parseError) {
        console.error('Could not parse error response:', parseError);
      }
      
      console.error(`API request failed for ${endpoint}:`, {
        status: response.status,
        statusText: response.statusText,
        url: url,
        errorMessage: errorMessage,
        errorData: errorData
      });
      
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    console.log('Success response data:', data);
    return data;
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

export default apiRequest;

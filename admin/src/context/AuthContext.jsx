import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../utils/api-config';
import axios from 'axios';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Authentication provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Axios interceptor to add auth token to requests
  useEffect(() => {
    const token = localStorage.getItem('renToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  // Check if user is logged in when component mounts
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('renToken');
      const user = localStorage.getItem('renUser');
      
      if (token && user) {
        try {
          // Validate token with backend
          const response = await axios.get(API_ENDPOINTS.AUTH_PROFILE, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.data) {
            setCurrentUser(JSON.parse(user));
            setIsAuthenticated(true);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          }
        } catch (error) {
          console.error('Token validation failed:', error);
          // Clear invalid token
          localStorage.removeItem('renUser');
          localStorage.removeItem('renToken');
          delete axios.defaults.headers.common['Authorization'];
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(API_ENDPOINTS.AUTH_LOGIN, {
        email,
        password
      });

      if (response.data && response.data.token) {
        const { token, user } = response.data;
        
        // Store user and token in localStorage
        localStorage.setItem('renUser', JSON.stringify(user));
        localStorage.setItem('renToken', token);
        
        // Set axios default authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        setCurrentUser(user);
        setIsAuthenticated(true);
        
        return { success: true };
      }
      
      return { 
        success: false, 
        error: 'Login failed - invalid response' 
      };
    } catch (error) {
      console.error('Login error:', error);
      
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return { 
        success: false, 
        error: errorMessage
      };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Call backend logout endpoint
      await axios.post(API_ENDPOINTS.AUTH_LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage and state regardless of API call result
      localStorage.removeItem('renUser');
      localStorage.removeItem('renToken');
      delete axios.defaults.headers.common['Authorization'];
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  };

  // Get JWT token
  const getToken = () => {
    return localStorage.getItem('renToken');
  };

  // Refresh user profile
  const refreshProfile = async () => {
    try {
      const token = getToken();
      if (!token) return null;

      const response = await axios.get(API_ENDPOINTS.AUTH_PROFILE, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data) {
        setCurrentUser(response.data);
        localStorage.setItem('renUser', JSON.stringify(response.data));
        return response.data;
      }
    } catch (error) {
      console.error('Profile refresh failed:', error);
      logout(); // Force logout on profile fetch failure
    }
    return null;
  };

  // Context value
  const value = {
    currentUser,
    isAuthenticated,
    login,
    logout,
    getToken,
    refreshProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

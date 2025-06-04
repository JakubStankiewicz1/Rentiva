/**
 * Authentication service for admin panel
 * Handles all authentication-related API calls
 */

import axios from 'axios';
import { API_ENDPOINTS } from '../utils/api-config';

class AuthService {
  constructor() {
    this.setupInterceptors();
  }

  /**
   * Setup axios interceptors for automatic token handling
   */
  setupInterceptors() {
    // Request interceptor to add token to all requests
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('renToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle token expiration
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Token expired or invalid
          this.clearAuthData();
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} Login response
   */
  async login(email, password) {
    try {
      const response = await axios.post(API_ENDPOINTS.AUTH_LOGIN, {
        email,
        password
      });

      if (response.data && response.data.token) {
        const { token, user } = response.data;
        
        // Store authentication data
        localStorage.setItem('renToken', token);
        localStorage.setItem('renUser', JSON.stringify(user));
        
        return {
          success: true,
          data: { token, user }
        };
      }

      return {
        success: false,
        error: 'Invalid response from server'
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
  }

  /**
   * Logout user
   */
  async logout() {
    try {
      await axios.post(API_ENDPOINTS.AUTH_LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearAuthData();
    }
  }

  /**
   * Get user profile
   * @returns {Promise<Object>} User profile data
   */
  async getProfile() {
    try {
      const response = await axios.get(API_ENDPOINTS.AUTH_PROFILE);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Get profile error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Validate current token
   * @returns {Promise<boolean>} Token validity
   */
  async validateToken() {
    try {
      await axios.post(API_ENDPOINTS.AUTH_VALIDATE || `${API_ENDPOINTS.BASE_URL}/auth/validate`);
      return true;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} Authentication status
   */
  isAuthenticated() {
    const token = localStorage.getItem('renToken');
    const user = localStorage.getItem('renUser');
    return !!(token && user);
  }

  /**
   * Get stored user data
   * @returns {Object|null} User data
   */
  getCurrentUser() {
    try {
      const user = localStorage.getItem('renUser');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  /**
   * Get stored token
   * @returns {string|null} Authentication token
   */
  getToken() {
    return localStorage.getItem('renToken');
  }

  /**
   * Clear authentication data
   */
  clearAuthData() {
    localStorage.removeItem('renToken');
    localStorage.removeItem('renUser');
    delete axios.defaults.headers.common['Authorization'];
  }

  /**
   * Refresh user session
   * @returns {Promise<boolean>} Success status
   */
  async refreshSession() {
    try {
      const profileResponse = await this.getProfile();
      if (profileResponse.success) {
        localStorage.setItem('renUser', JSON.stringify(profileResponse.data));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Session refresh error:', error);
      return false;
    }
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * ProtectedRoute component that checks if user is authenticated
 * If authenticated, renders the child routes
 * If not authenticated, redirects to login page
 */
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Otherwise, render the protected content
  return <Outlet />;
};

export default ProtectedRoute;

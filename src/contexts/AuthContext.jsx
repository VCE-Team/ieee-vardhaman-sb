import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/apiService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated on app start
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          apiService.setToken(token);
          const userProfile = await apiService.getProfile();
          setUser(userProfile);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear invalid token
        localStorage.removeItem('authToken');
        apiService.setToken(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await apiService.login(email, password);
      
      if (response.token && response.user) {
        setUser(response.user);
        return { 
          success: true, 
          user: response.user,
          redirectTo: getDashboardRoute(response.user)
        };
      } else {
        return { success: false, error: 'Invalid response from server' };
      }
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('authToken');
    }
  };

  const getDashboardRoute = (user) => {
    if (!user) return '/login';
    
    console.log('Determining dashboard route for user:', user);
    
    // Based on user role and entityId, determine the dashboard route
    if (user.role === 'SOCIETY_ADMIN' && user.entityId) {
      const dashboardRoute = `/societies/${user.entityId}/dashboard`;
      console.log('Society admin dashboard route:', dashboardRoute);
      return dashboardRoute;
    } else if (user.role === 'COUNCIL_ADMIN' && user.entityId) {
      const dashboardRoute = `/councils/${user.entityId}/dashboard`;
      console.log('Council admin dashboard route:', dashboardRoute);
      return dashboardRoute;
    } else {
      console.log('User role or entityId not valid for dashboard access:', { role: user.role, entityId: user.entityId });
      return '/unauthorized';
    }
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    isSociety: user?.role === 'SOCIETY_ADMIN',
    isCouncil: user?.role === 'COUNCIL_ADMIN',
    getDashboardRoute
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

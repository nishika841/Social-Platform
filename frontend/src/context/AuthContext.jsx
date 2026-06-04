import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

// Create configured Axios instance
export const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load token and user info from storage on load
  useEffect(() => {
    const storedUser = localStorage.getItem('social_user');
    const storedToken = localStorage.getItem('social_token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      
      // Configure Axios header
      api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    setLoading(false);
  }, []);

  // Login handler
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token: userToken, ...userData } = response.data;
      
      setUser(userData);
      setToken(userToken);
      
      localStorage.setItem('social_user', JSON.stringify(userData));
      localStorage.setItem('social_token', userToken);
      
      api.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed. Please check your credentials.',
      };
    }
  };

  // Signup handler
  const signup = async (username, email, password) => {
    try {
      const response = await api.post('/auth/signup', { username, email, password });
      const { token: userToken, ...userData } = response.data;
      
      setUser(userData);
      setToken(userToken);
      
      localStorage.setItem('social_user', JSON.stringify(userData));
      localStorage.setItem('social_token', userToken);
      
      api.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Signup failed. Please try again.',
      };
    }
  };

  // Logout handler
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('social_user');
    localStorage.removeItem('social_token');
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

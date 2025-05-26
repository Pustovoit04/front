import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${API_URL}/auth/user`, { withCredentials: true });
        console.log('Перевірка авторизації:', response.data); // Додано логування
        setUser(response.data.user || null);
      } catch (error) {
        console.error('Помилка перевірки авторизації:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      const response = await axios.get(`${API_URL}/logout`, { withCredentials: true });
      setUser(null);
      console.log('Вихід виконано:', response.data);
    } catch (error) {
      console.error('Помилка під час виходу:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
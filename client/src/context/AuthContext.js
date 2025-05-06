import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      });
      
      const userData = {
        id: response.data.user.id,
        username: response.data.user.username,
        email: response.data.user.email
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.error || 'Email o contraseña incorrectos' 
      };
    }
  };

  const register = async (username, email, password) => {
    try {
      await axios.post('http://localhost:5000/api/register', {
        username,
        email,
        password
      });
      
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        error: error.response?.data?.error || 'Error en el registro' 
      };
    }
  };
  const users = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/grud');
    
    return {
      success: true,
      users: response.data // Asumiendo que el backend devuelve un array de usuarios
    };
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return { 
      success: false, 
      error: error.response?.data?.error || 'Error al cargar los usuarios' 
    };
  }
};
// ----------------------------------------------------------

const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/users/${id}`, userData);
    return {
      success: true,
      user: response.data
    };
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    return { 
      success: false, 
      error: error.response?.data?.error || 'Error al actualizar usuario' 
    };
  }
};

const deleteUser = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    return { success: true };
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    return { 
      success: false, 
      error: error.response?.data?.error || 'Error al eliminar usuario' 
    };
  }
};
// ----------------------------------------------------------

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    // Eliminamos navigate de aquí
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user,
        loading,
        login,
        register,
        logout,
        users,
        updateUser,
        deleteUser
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
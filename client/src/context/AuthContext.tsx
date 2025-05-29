import React, { createContext, useContext, useState, useEffect } from 'react';
import * as userService from '../services/userService';
import {convertImageToDataURL} from '../utils/ConvertImage';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // verificar
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await userService.login(email, password);
      const userData = response.data;
      if(userData.foto) {
        const image = convertImageToDataURL(userData.foto);
        if(image)
        {
          userData.foto = image;
        }
      }
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return { success: true, user: userData };
    } catch (error: any) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Email o contraseña incorrectos',
      };
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      await userService.register(username, email, password);
      return { success: true };
    } catch (error: any) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Error en el registro',
      };
    }
  };

  const users = async () => {
    try {
      const response = await userService.getUsers();
      for (let i = 0; i < response.data.length; i++) {
        if(response.data[i].foto) {
          const image = convertImageToDataURL(response.data[i].foto);
          if(image)
          {
            response.data[i].foto = image;
          }
        }
      }
      return { success: true, users: response.data };
    } catch (error: any) {
      console.error('Error al obtener usuarios:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Error al cargar los usuarios',
      };
    }
  };

  const updateUser = async (userData: FormData) => {
    try {
      const response = await userService.updateUser(userData);
      if (response && response.data) {
        const updatedUser = response.data;
        
        if (updatedUser.foto) {
          const image = convertImageToDataURL(updatedUser.foto);
          if(image)
          {
            updatedUser.foto = image;
          }
        }
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        
        return { success: true, user: updatedUser };
      }
      return { success: true, user: response.data };
    } catch (error: any) {
      console.error('Error al actualizar usuario:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Error al actualizar usuario',
      };
    }
  };
  // ============================= UPDATE ADMIN =============================
    const updateUserAdmin = async (userData: FormData) => {
    try {
      const response = await userService.updateUser(userData);
      if (response && response.data) {
        const updatedUser = response.data;
        
        if (updatedUser.foto) {
          const image = convertImageToDataURL(updatedUser.foto);
          if(image)
          {
            updatedUser.foto = image;
          }
        }
        return { success: true, user: updatedUser };
      }
      return { success: true, user: response.data };
    } catch (error: any) {
      console.error('Error al actualizar usuario:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Error al actualizar usuario',
      };
    }
  };
  // =======================================================================
  const createUser = async (userData: FormData) => {
    try {
      const response = await userService.createUser(userData);
      if(response) return { success: true};
      else return { success: false, error: 'Error al crear usuario' };

    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Error al actualizar usuario',
      };
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await userService.deleteUser(id);
      return { success: true };
    } catch (error: any) {
      console.error('Error al eliminar usuario:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Error al eliminar usuario',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register,createUser, users, updateUser, deleteUser, logout,updateUserAdmin}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// Task
// - [ ] uso de imagenes

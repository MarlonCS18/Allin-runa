// app/context/AuthContext.js
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// URLs del Backend (¡asegúrate que el puerto sea el correcto!)
const API_URL = 'http://localhost:8080/api/v1/auth';
const LOGIN_URL = 'http://localhost:8080/login';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // --- 1. Verificar sesión (¡MODIFICADO!) ---
  // Ahora devuelve el usuario o null
  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/me`, {
        credentials: 'include', 
      });
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
        return userData; // <-- ARREGLO: Devolver datos del usuario
      } else {
        setUser(null);
        return null; // <-- ARREGLO: Devolver null
      }
    } catch (error) {
      console.error("Error verificando auth:", error);
      setUser(null);
      return null; // <-- ARREGLO: Devolver null
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // --- 2. Función de Login (¡MODIFICADA!) ---
  const login = async (email, password) => {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    try {
      // Intento de login
      await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
        credentials: 'include',
        redirect: 'manual' 
      });

      // --- ARREGLO: LÓGICA DE DETECCIÓN DE LOGIN (CORREGIDA) ---
      // No importa la respuesta del fetch (será opaca),
      // volvemos a verificar el estado de la autenticación.
      // Si checkAuthStatus() devuelve un usuario, ¡el login fue exitoso!
      const userData = await checkAuthStatus();

      if (userData) {
        return { success: true };
      } else {
        // Si no hay datos de usuario, el login falló.
        return { success: false, error: 'Credenciales incorrectas' };
      }

    } catch (error) {
      // Esto puede saltar por el 'redirect: manual' incluso en un login exitoso.
      // Así que volvemos a verificar el estado.
      const userData = await checkAuthStatus();
      if (userData) {
        return { success: true };
      }
      return { success: false, error: 'Credenciales incorrectas o error de red' };
    }
  };

  // --- 3. Función de Registro (Sin cambios) ---
  const register = async (nombre, email, password) => {
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email, password }),
      });

      if (res.status === 201) { // 201 Created
        return { success: true };
      } else {
        const data = await res.json();
        return { success: false, error: data.error || 'Error al registrar' };
      }
    } catch (error) {
      return { success: false, error: 'Error de red al registrar' };
    }
  };

  // --- 4. Función de Logout (Sin cambios) ---
  const logout = async () => {
    try {
      await fetch(`${API_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error("Error en logout:", error);
    } finally {
      setUser(null);
      // ¡OJO! El borrado del carrito se hace en los componentes
      // (Header.js y perfil/page.js) porque este contexto
      // no puede acceder al CartContext.
      router.push('/');
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
// app/context/CartContext.js
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; // <-- 1. IMPORTAMOS EL CONTEXTO DE AUTH

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  // --- 2. OBTENEMOS EL ESTADO DE AUTENTICACIÓN ---
  const { isAuthenticated, loading: authLoading } = useAuth();

  // --- Cargar carrito desde LocalStorage (sin cambios) ---
  useEffect(() => {
    try {
      const cartData = localStorage.getItem('allinRunaCart');
      if (cartData) {
        setCart(JSON.parse(cartData));
      }
    } catch (error) {
      console.error("Error al cargar el carrito desde localStorage", error);
    }
  }, []);

  // --- Guardar carrito en LocalStorage (sin cambios) ---
  useEffect(() => {
    try {
      // Si el carrito está vacío, bórralo de localStorage
      if (cart.length === 0) {
        localStorage.removeItem('allinRunaCart');
      } else {
        // Si tiene algo, guárdalo
        localStorage.setItem('allinRunaCart', JSON.stringify(cart));
      }
    } catch (error) {
      console.error("Error al guardar el carrito en localStorage", error);
    }
  }, [cart]);


  // --- ¡AQUÍ ESTÁ EL ARREGLO! ---
  // 3. Este useEffect "escucha" los cambios en el estado de autenticación
  useEffect(() => {
    // Espera a que la autenticación termine de cargar
    if (!authLoading) {
      // Si el usuario NO está autenticado...
      if (!isAuthenticated) {
        // ...limpia el carrito.
        setCart([]);
      }
    }
  }, [isAuthenticated, authLoading]); // Se ejecuta cada vez que el estado de auth cambia
  // --- FIN DEL ARREGLO ---


  // --- Función de Añadir (con control de stock) ---
  const addToCart = (product, quantityToAdd) => {
    const quantity = Math.max(1, quantityToAdd);

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // Si existe, sumar la cantidad, pero con límite de stock
        const newQuantity = Math.min(
          existingItem.quantity + quantity, 
          product.stock // Límite de stock
        );
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        // Si no existe, añadirlo (asegurándose de no pasar el stock)
        const newQuantity = Math.min(quantity, product.stock);
        return [...prevCart, { ...product, quantity: newQuantity }];
      }
    });
  };

  // --- ¡NUEVA FUNCIÓN! Aumentar Cantidad (en el carrito) ---
  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) } // Respeta el stock
          : item
      )
    );
  };

  // --- ¡NUEVA FUNCIÓN! Disminuir Cantidad (en el carrito) ---
  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) } // No baja de 1
          : item
      ).filter(Boolean) // filter(Boolean) no es necesario si no bajamos a 0
    );
  };

  // --- ¡NUEVA FUNCIÓN! Eliminar Producto ---
  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== productId)
    );
  };

  // --- ¡NUEVA FUNCIÓN! Vaciar Carrito ---
  const clearCart = () => {
    setCart([]);
  };

  // 5. Exponer todas las funciones en el 'value'
  const value = {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
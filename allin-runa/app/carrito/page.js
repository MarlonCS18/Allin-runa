// app/carrito/page.js
"use client";

import React, { useEffect } from 'react'; // Importar useEffect
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Importar router
import { useCart } from '../context/CartContext'; // Importamos el hook
import { useAuth } from '../context/AuthContext'; // <-- 1. IMPORTAR AUTH
import { 
  TrashIcon, 
  ShoppingCartIcon, 
  PlusIcon, 
  MinusIcon 
} from '@heroicons/react/24/outline';

// URL base del backend (para imágenes)
const BACKEND_URL = 'http://localhost:8080';

// Helper para la URL de la imagen
function getImageUrl(imagen) {
  if (imagen) {
    if (imagen.startsWith('http://') || imagen.startsWith('https://')) {
      return imagen;
    }
    return `${BACKEND_URL}${imagen}`;
  }
  return '/img/placeholder.webp'; // Placeholder
}

export default function CarritoPage() {
  
  // 1. Obtenemos todo lo que necesitamos de los contextos
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart();
  const { isAuthenticated, loading } = useAuth(); // <-- 2. USAR AUTH
  const router = useRouter();

  // 3. PROTEGER LA RUTA
  useEffect(() => {
    // Si la autenticación terminó de cargar (loading=false)
    // Y el usuario NO está autenticado
    if (!loading && !isAuthenticated) {
      router.push('/login'); // Redirigir al login
    }
  }, [isAuthenticated, loading, router]); // Se ejecuta si estos valores cambian

  // 2. Calculamos los totales
  const subtotal = cart.reduce((acc, item) => 
    acc + (item.precio * item.quantity), 0);
  
  const costoEnvio = 0.00; // (Lógica de envío simplificada)
  const total = subtotal + costoEnvio;

  // 4. MOSTRAR "CARGANDO..." MIENTRAS SE VERIFICA
  // Si la autenticación está cargando O el usuario no está autenticado (y está a punto de ser redirigido)
  // mostramos un estado de carga.
  if (loading || !isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p className="text-lg text-gray-600">Cargando carrito...</p>
      </div>
    );
  }

  // --- Renderizado si el carrito está vacío ---
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4">
        <ShoppingCartIcon className="w-24 h-24 text-gray-300" />
        <h1 className="text-3xl font-bold text-gray-800 mt-6 mb-2">Tu carrito está vacío</h1>
        <p className="text-gray-600 mb-8">
          Parece que no has añadido nada. ¡Explora nuestros productos!
        </p>
        <Link 
          href="/tienda" 
          className="px-8 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors"
        >
          Ir a la Tienda
        </Link>
      </div>
    );
  }

  // --- Renderizado si hay productos en el carrito ---
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Tu Carrito de Compras</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- Columna Izquierda: Lista de Productos --- */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md">
            <ul role="list" className="divide-y divide-gray-200">
              
              {cart.map((item) => (
                <li key={item.id} className="flex flex-col sm:flex-row py-6 px-4">
                  
                  {/* Imagen */}
                  <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-md border border-gray-200 overflow-hidden">
                    <img
                      src={getImageUrl(item.imagen)}
                      alt={item.nombre}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="ml-0 sm:ml-4 flex-1 flex flex-col justify-between mt-4 sm:mt-0">
                    <div>
                      {/* Nombre y Precio */}
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <Link href={`/producto/${item.id}`}>{item.nombre}</Link>
                        </h3>
                        <p className="ml-4">S/ {(item.precio * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Precio Unit: S/ {item.precio.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Selector de Cantidad */}
                      <div className="flex items-center border border-gray-300 rounded-full">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          disabled={item.quantity <= 1}
                          className="px-3 py-1 text-lg font-bold text-gray-700 rounded-l-full hover:bg-gray-100 disabled:opacity-50"
                        >
                          <MinusIcon className="w-4 h-4" />
                        </button>
                        <span className="px-4 text-base font-medium">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          disabled={item.quantity >= item.stock}
                          className="px-3 py-1 text-lg font-bold text-gray-700 rounded-r-full hover:bg-gray-100 disabled:opacity-50"
                        >
                          <PlusIcon className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Botón de Eliminar */}
                      <div className="flex">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="font-medium text-red-600 hover:text-red-500 flex items-center"
                        >
                          <TrashIcon className="w-5 h-5 mr-1" />
                          Eliminar
                        </button>
                      </div>
                    </div>
                    {item.quantity >= item.stock && (
                      <p className="text-red-500 text-sm mt-2">No hay más stock disponible.</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            
            {/* Botón de Vaciar Carrito */}
            <div className="text-right p-4 border-t border-gray-200">
              <button
                onClick={clearCart}
                className="text-sm font-medium text-gray-600 hover:text-red-500"
              >
                Vaciar Carrito
              </button>
            </div>
          </div>

          {/* --- Columna Derecha: Resumen del Pedido --- */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-medium text-gray-900 border-b pb-4">
                Resumen del Pedido
              </h2>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Subtotal</p>
                  <p className="text-sm font-medium text-gray-900">S/ {subtotal.toFixed(2)}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Envío</p>
                  <p className="text-sm font-medium text-gray-900">
                    {costoEnvio > 0 ? `S/ ${costoEnvio.toFixed(2)}` : 'Gratis'}
                  </p>
                </div>
                
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <p className="text-base font-medium text-gray-900">Total</p>
                  <p className="text-base font-medium text-gray-900">S/ {total.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="mt-8">
                <Link 
                  href="/checkout" // (Esta será tu página de pago)
                  className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  Proceder al Pago
                </Link>
              </div>

              <div className="mt-6 text-center">
                <Link href="/tienda" className="text-sm font-medium text-green-600 hover:text-green-500">
                  o Seguir Comprando
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
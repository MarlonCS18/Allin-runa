"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Importamos Link
import { useParams } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext'; // <-- 1. IMPORTAR AUTH
import FeaturedProducts from '../../components/FeaturedProducts';
import { motion } from 'framer-motion';

// --- ¡Importamos UserIcon para el nuevo botón! ---
import { 
  ShoppingCartIcon, 
  CheckIcon, 
  ChevronRightIcon, 
  UserIcon // <-- NUEVO ÍCONO
} from '@heroicons/react/24/outline'; 

// --- Constantes de URLs ---
const API_URL = 'http://localhost:8080/api/v1';
const BACKEND_URL = 'http://localhost:8080';

export default function ProductoDetallePage() {
  const params = useParams(); 
  const { id } = params;
  const { addToCart } = useCart(); 
  const { isAuthenticated, loading: authLoading } = useAuth(); // <-- 2. USAR AUTH

  // --- Estados del componente ---
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Carga de producto
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState('/img/placeholder.webp');
  const [wasAdded, setWasAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // --- Efecto 1: Buscar el producto principal ---
  useEffect(() => {
    if (!id) return; 
    
    const fetchProduct = async () => {
      try {
        setLoading(true); 
        setError(null); 
        const res = await fetch(`${API_URL}/productos/${id}`);
        
        if (!res.ok) {
          throw new Error('Producto no encontrado');
        }
        
        const data = await res.json();
        setProduct(data); 
        
        if (data.imagen) {
          if (data.imagen.startsWith('http://') || data.imagen.startsWith('https://')) {
            setImageUrl(data.imagen);
          } else {
            setImageUrl(`${BACKEND_URL}${data.imagen}`);
          }
        }
        
      } catch (err) {
        console.error("Error al cargar el producto:", err);
        setError(err.message);
      } finally {
        setLoading(false); 
      }
    };
    
    fetchProduct();
  }, [id]);

  // --- Efecto 2: Buscar productos relacionados ---
  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await fetch(`${API_URL}/productos/destacados`);
        const data = await res.json();
        const currentProductId = parseInt(id, 10);
        setRelatedProducts(data.filter(p => p.id !== currentProductId)); 
      } catch (err) {
        console.error("Error al cargar productos relacionados:", err);
      }
    };
    
    fetchRelated();
  }, [id]);

  // --- Manejadores de Cantidad ---
  const handleDecreaseQuantity = () => {
    setQuantity(q => Math.max(1, q - 1));
  };
  const handleIncreaseQuantity = () => {
    if (product && product.stock > 0) {
      setQuantity(q => Math.min(product.stock, q + 1));
    }
  };

  // --- Manejador del Botón "Añadir al Carrito" ---
  const handleAddToCart = () => {
    if (product && isAuthenticated) { // Doble chequeo
      addToCart(product, quantity); 
      setWasAdded(true);
      
      setTimeout(() => {
        setWasAdded(false);
        setQuantity(1); 
      }, 2000);
    }
  };

  // --- Renderizado (Estados de carga y error) ---

  // 3. ESPERAR A QUE CARGUE EL PRODUCTO Y EL ESTADO DE AUTH
  if (loading || authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Cargando producto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center px-4">
        <p className="text-2xl font-bold text-red-600">Error: {error}</p>
        <Link href="/tienda" className="mt-6 px-6 py-2 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  if (!product) return null; // No renderizar nada si el producto no se ha cargado

  const stockStatus = product.stock > 0 
    ? `En Stock (${product.stock} unidades)` 
    : 'Agotado';

  // --- RENDERIZADO PRINCIPAL (Producto encontrado) ---
  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">

          {/* Breadcrumbs (Sin cambios) */}
          <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/tienda" className="text-gray-500 hover:text-green-600 font-medium transition-colors">
                  Tienda
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
                  <span className="ml-2 font-medium text-gray-700">
                    {product.nombre}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          
          {/* Grid principal del producto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            
            {/* Columna de Imagen (Sin cambios) */}
            <motion.div 
              className="relative w-full aspect-square rounded-lg shadow-xl overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={imageUrl}
                alt={product.nombre}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Columna de Información */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Info, Título, Precio, Stock (Sin cambios) */}
              <span className="text-sm font-semibold text-green-600 uppercase">{product.categoria}</span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">{product.nombre}</h1>
              <p className="text-4xl font-bold text-gray-800 mb-5">
                S/ {product.precio.toFixed(2)}
              </p>
              <div 
                className={`font-semibold mb-6 ${product.stock > 0 ? 'text-green-700' : 'text-red-500'}`}
              >
                {stockStatus}
              </div>

              {/* Selector de Cantidad (Sin cambios) */}
              {product.stock > 0 && (
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-gray-700 font-medium">Cantidad:</span>
                  <div className="flex items-center border border-gray-300 rounded-full">
                    <button 
                      onClick={handleDecreaseQuantity}
                      disabled={quantity <= 1 || wasAdded}
                      className="px-4 py-2 text-lg font-bold text-gray-700 rounded-l-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <span className="px-5 text-lg font-medium w-16 text-center">{quantity}</span>
                    <button 
                      onClick={handleIncreaseQuantity}
                      disabled={quantity >= product.stock || wasAdded}
                      className="px-4 py-2 text-lg font-bold text-gray-700 rounded-r-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* --- ¡BOTÓN CONDICIONAL! --- */}
              {/* 4. Lógica de renderizado del botón */}
              {isAuthenticated ? (
                // --- 4A. SI ESTÁ LOGUEADO: Mostrar botón de "Añadir"
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || wasAdded} 
                  className={`flex items-center justify-center w-full max-w-xs px-8 py-4 rounded-full text-lg font-semibold text-white transition-all duration-300 shadow-lg
                    ${wasAdded 
                      ? 'bg-green-500' // Estado "Añadido"
                      : (product.stock > 0 
                          ? 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2' // Estado normal
                          : 'bg-gray-400 cursor-not-allowed') // Estado "Agotado"
                    }`}
                >
                  {wasAdded ? (
                    <>
                      <CheckIcon className="w-6 h-6 mr-2" />
                      ¡Añadido!
                    </>
                  ) : (
                    <>
                      <ShoppingCartIcon className="w-6 h-6 mr-2" />
                      {product.stock > 0 ? 'Añadir al Carrito' : 'Agotado'}
                    </>
                  )}
                </button>
              ) : (
                // --- 4B. SI ES VISITANTE: Mostrar botón de "Iniciar Sesión"
                <Link 
                  href="/login"
                  className="flex items-center justify-center w-full max-w-xs px-8 py-4 rounded-full text-lg font-semibold text-white transition-all duration-300 shadow-lg bg-gray-700 hover:bg-gray-800"
                >
                  <UserIcon className="w-6 h-6 mr-2" />
                  Inicia sesión para comprar
                </Link>
              )}
              {/* --- FIN DEL BOTÓN --- */}


              {/* Descripción (Sin cambios) */}
              <div className="mt-10 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-semibold mb-3">Descripción</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {product.descripcion}
                </p>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Sección de Productos Relacionados (Sin cambios) */}
      {relatedProducts.length > 0 && (
        <FeaturedProducts 
          productos={relatedProducts}
          title="También te podría interesar"
          subtitle="Explora otros productos que complementan tu elección."
          layout="3-col"
        /> 
      )}
    </>
  );
}
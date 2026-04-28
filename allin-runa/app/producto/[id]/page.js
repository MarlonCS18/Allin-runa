"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import FeaturedProducts from '../../components/FeaturedProducts';
import { motion } from 'framer-motion';

import { 
  ShoppingCartIcon, 
  CheckIcon, 
  ChevronRightIcon, 
  UserIcon
} from '@heroicons/react/24/outline';

const API_URL = 'http://localhost:8080/api/v1';
const BACKEND_URL = 'http://localhost:8080';

export default function ProductoDetallePage() {
  const params = useParams(); 
  const { id } = params;
  const { addToCart } = useCart(); 
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState('/img/placeholder.webp');
  const [wasAdded, setWasAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showStockAlert, setShowStockAlert] = useState(false); // MEJORA: alerta de stock bajo

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
        
        // MEJORA: alerta si stock es bajo (menos de 5 unidades)
        if (data.stock > 0 && data.stock < 5) {
          setShowStockAlert(true);
        }
        
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

  const handleDecreaseQuantity = () => {
    setQuantity(q => Math.max(1, q - 1));
  };
  
  const handleIncreaseQuantity = () => {
    if (product && product.stock > 0) {
      setQuantity(q => Math.min(product.stock, q + 1));
    }
  };

  const handleAddToCart = () => {
    if (product && isAuthenticated) {
      addToCart(product, quantity); 
      setWasAdded(true);
      
      setTimeout(() => {
        setWasAdded(false);
        setQuantity(1); 
      }, 2000);
    }
  };

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

  if (!product) return null;

  const stockStatus = product.stock > 0 
    ? `En Stock (${product.stock} unidades)` 
    : 'Agotado';

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">

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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            
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

            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="text-sm font-semibold text-green-600 uppercase">{product.categoria}</span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">{product.nombre}</h1>
              <p className="text-4xl font-bold text-gray-800 mb-5">
                S/ {product.precio.toFixed(2)}
              </p>
              
              {/* MEJORA: Alerta de stock bajo */}
              {showStockAlert && product.stock > 0 && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 mb-4 rounded">
                  <p className="text-sm">⚠️ ¡Últimas unidades disponibles! Stock: {product.stock}</p>
                </div>
              )}
              
              <div 
                className={`font-semibold mb-6 ${product.stock > 0 ? 'text-green-700' : 'text-red-500'}`}
              >
                {stockStatus}
              </div>

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

              {isAuthenticated ? (
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || wasAdded} 
                  className={`flex items-center justify-center w-full max-w-xs px-8 py-4 rounded-full text-lg font-semibold text-white transition-all duration-300 shadow-lg
                    ${wasAdded 
                      ? 'bg-green-500'
                      : (product.stock > 0 
                          ? 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
                          : 'bg-gray-400 cursor-not-allowed')
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
                <Link 
                  href="/login"
                  className="flex items-center justify-center w-full max-w-xs px-8 py-4 rounded-full text-lg font-semibold text-white transition-all duration-300 shadow-lg bg-gray-700 hover:bg-gray-800"
                >
                  <UserIcon className="w-6 h-6 mr-2" />
                  Inicia sesión para comprar
                </Link>
              )}

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

// ============================================
// MEJORAS IMPLEMENTADAS POR: MIA CORONEL
// FECHA: 2026-04-28
// 
// 1. Alerta de stock bajo (menos de 5 unidades)
// 2. Documentación del componente
// 3. Mejora en la experiencia de usuario
// ============================================

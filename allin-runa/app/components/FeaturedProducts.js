// app/components/FeaturedProducts.js
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link'; // Importamos Link

// --- Variantes de Animación (Sin cambios) ---
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
};

const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' }}
};

// --- Componente Principal ---
export default function FeaturedProducts({ productos, title, subtitle, layout }) {
  
  const BACKEND_URL = 'http://localhost:8080';

  // --- Lógica para definir la clase de la cuadrícula ---
  // Por defecto, usará 4 columnas (para tu página principal)
  let gridClass = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8";

  // Si le pasamos layout="3-col", usará 3 columnas (para la página de producto)
  if (layout === '3-col') {
    gridClass = "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8";
  }

  return (
    <section className="w-full bg-stone-100 py-20"> 
      <div className="max-w-6xl mx-auto px-4">
        
        <motion.div 
          className="text-center"
          variants={textVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Títulos dinámicos */}
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            {title || "Selección del Mes"}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            {subtitle || "Descubre nuestra selección exclusiva de productos 100% orgánicos y naturales, cultivados con dedicación para tu bienestar."}
          </p>
        </motion.div>
        
        {/* --- Grid de Productos --- */}
        <motion.div 
          className={gridClass} 
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {productos.map((producto) => {
            
            // Lógica de URL
            let imageUrl;
            if (producto.imagen) {
              if (producto.imagen.startsWith('http://') || producto.imagen.startsWith('https://')) {
                imageUrl = producto.imagen;
              } else {
                imageUrl = `${BACKEND_URL}${producto.imagen}`;
              }
            } else {
              imageUrl = '/img/placeholder.webp';
            }

            return (
              <motion.div
                key={producto.id}
                variants={cardVariant}
              >
                {/* --- CAMBIO AQUÍ: Envolvemos la tarjeta con Link --- */}
                <Link href={`/producto/${producto.id}`} className="block h-full">
                  
                  {/* Lógica interna de la tarjeta */}
                  <div className="border bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 h-full flex flex-col cursor-pointer group">
                    
                    <div className="relative overflow-hidden w-full h-56">
                        <img 
                            src={imageUrl} 
                            alt={producto.nombre} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                    </div>
                    
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                        {producto.nombre}
                      </h3>
                      
                      <p className="text-2xl font-bold text-green-700 mt-auto pt-2">
                        S/ {producto.precio.toFixed(2)}
                      </p>
                    </div>
                  </div>

                </Link>
                {/* --- FIN DEL CAMBIO --- */}
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
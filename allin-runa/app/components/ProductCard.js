// app/components/ProductCard.js
import React from 'react';
// (Quitamos la importación de 'next/image' ya que usamos <img>)
import Link from 'next/link';
import { motion } from 'framer-motion';

// Animación de Framer Motion
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

// URL de tu backend
const BACKEND_URL = 'http://localhost:8080';

export default function ProductCard({ product }) {
  
  // --- Lógica de URL (Maneja URLs absolutas y relativas) ---
  // Esta es la lógica que ya corregimos y funciona.
  let imageUrl;
  if (product.imagen) {
    // Si la imagen ya es una URL completa (http:// o https://)
    if (product.imagen.startsWith('http://') || product.imagen.startsWith('https://')) {
      imageUrl = product.imagen;
    } else {
      // Si es una URL relativa (ej. /img/producto.jpg), le añadimos el backend
      imageUrl = `${BACKEND_URL}${product.imagen}`;
    }
  } else {
    // Si no hay imagen, usamos el placeholder
    imageUrl = '/img/placeholder.webp';
  }

  return (
    <motion.div 
      className="group" // 'group' es útil para animaciones hover en Tailwind
      variants={fadeInUp}
    >
      {/* 1. El <Link> ahora envuelve toda la tarjeta.
          'h-full' asegura que el link ocupe toda la altura del contenedor grid.
      */}
      <Link href={`/producto/${product.id}`} className="block h-full">
        
        {/* 2. 'h-full' y 'flex-col' en la tarjeta aseguran que llene el espacio
            y que el contenido (imagen, texto) se distribuya verticalmente.
        */}
        <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl h-full flex flex-col">
          
          {/* Contenedor de la Imagen */}
          <div className="relative w-full h-64">
            {/* 3. Usamos la etiqueta <img> normal para evitar errores de dominio
                y le damos clases para que llene el contenedor.
            */}
            <img
              src={imageUrl} 
              alt={product.nombre} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Contenedor del Texto */}
          {/* 'flex-grow' hace que esta sección se expanda para llenar
              el espacio restante, empujando el precio al fondo si es necesario.
          */}
          <div className="p-5 flex-grow flex flex-col">
            <span className="text-sm text-gray-500">{product.categoria}</span>
            <h3 className="text-lg font-bold text-gray-800 truncate mt-1">
              {product.nombre}
            </h3>
            
            {/* 'mt-auto' empuja el precio al final de este contenedor */}
            <p className="text-xl font-bold text-green-700 mt-auto pt-2">
              S/ {product.precio.toFixed(2)}
            </p>
          </div>
          
          {/* 4. ¡EL BOTÓN DE AÑADIR AL CARRITO FUE ELIMINADO! */}
          {/* Ya no hay <div className="px-5 pb-5 mt-auto"> ... </div> */}

        </div>
      </Link>
    </motion.div>
  );
}
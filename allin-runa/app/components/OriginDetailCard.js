// app/components/OriginDetailCard.js
import React from 'react';
import Image from 'next/image';

// Este componente ahora recibe 'products' como un array de objetos
export default function OriginDetailCard({ regionName, backgroundImage, description, products }) {
  return (
    <div 
      // --- ¡CAMBIO DE ALTURA! ---
      // Cambiado de 'h-[70vh]' a 'min-h-[85vh]' (85% del alto de la pantalla, como mínimo)
      // Añadido 'py-16' para darle espacio vertical al contenido
      className="relative w-full min-h-[100vh] flex items-center justify-center overflow-hidden py-16"
    >
      
      {/* 1. Imagen de Fondo (Se queda igual) */}
      <Image
        src={backgroundImage}
        alt={`Paisaje de la ${regionName} peruana`}
        layout="fill"
        objectFit="cover"
        className="brightness-50" // Capa oscura sobre la imagen
      />

      {/* 2. Contenido sobre la imagen */}
      <div className="relative z-10 max-w-4xl p-8 text-white text-center">
        
        {/* Título de la Región (Se queda igual) */}
        <h3 className="text-5xl font-extrabold mb-6">
          {regionName}
        </h3>
        
        {/* Descripción de la Región (Se queda igual) */}
        <p className="text-xl leading-relaxed mb-12">
          {description}
        </p>

        {/* --- ¡NUEVA SECCIÓN DE PRODUCTOS PNG! --- */}
        <div>
          <h4 className="text-2xl font-semibold mb-8">Productos Clave de la Región:</h4>
          
          {/* Usamos una cuadrícula para alinear los PNGs */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            
            {/* Mapeamos el NUEVO array de productos (con objetos) */}
            {products.map((product) => (
              <div key={product.name} className="flex flex-col items-center">
                {/* Contenedor de la imagen PNG */}
                {/* Ajusta w-32 h-32 si tus PNGs se ven muy grandes o pequeños */}
                <div className="relative w-48 h-48 mb-3"> 
                  <Image
                    src={product.img} // La ruta a tu PNG
                    alt={product.name}
                    layout="fill"
                    objectFit="contain" // 'contain' es mejor para PNGs de productos
                  />
                </div>
                {/* Nombre del Producto */}
                <span className="text-lg font-medium text-white">
                  {product.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
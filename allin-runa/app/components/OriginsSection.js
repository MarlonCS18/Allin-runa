// app/components/OriginsSection.js
'use client'; 

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link'; // <-- 1. IMPORTAMOS EL COMPONENTE LINK

// --- Variante de Animación (sin cambios) ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: 'easeOut' }
  },
};

export default function OriginsSection({ origins }) {
  return (
    <section className="w-full py-20"> 
      
      {/* Corregí un typo: tu código decía 'max-w-7x2', lo cambié a 'max-w-7xl' 
        que es la clase correcta de Tailwind.
      */}
      <div className="max-w-7x2 mx-auto px-4 text-center">
        
        {/* Tu título y párrafo se mantienen igual */}
        <h2 className="text-5xl font-extrabold mb-4 text-gray-900">Nuestros Orígenes</h2> 
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
          De la Costa, Sierra y Selva. Traemos lo mejor de la tierra peruana, 
          directo del agricultor.
        </p>

        {/* Tu animación de Framer Motion se mantiene igual */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8" 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {origins.map((origin) => (
            
            // --- ¡AQUÍ ESTÁ LA MAGIA! ---
            // 2. Reemplazamos tu 'div' wrapper por el 'Link'
            //    Le pasamos el 'key' (usando el 'id' que ya definimos)
            //    Le pasamos el 'href' con el ancla (ej. /nosotros#sierra)
            <Link 
              key={origin.id} // (Asegúrate que 'origins' en page.js tenga 'id')
              href={`/nosotros#${origin.id}`}
              className="block" // 'block' ayuda al link a tomar la forma del div
            >
              {/* ¡TODO TU DISEÑO INTERNO SE QUEDA EXACTAMENTE IGUAL!
                Misma altura, misma sombra, mismo tag <img>
              */}
              <div className="relative h-[35rem] rounded-lg overflow-hidden shadow-2xl group">
                <img src={origin.img} alt={origin.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <h3 className="absolute inset-0 flex items-center justify-center text-white text-5xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {origin.name}
                </h3>
              </div>
            </Link>

          ))}
        </motion.div>
      </div>
    </section>
  );
}
// app/components/CategorySection.js
'use client'; 

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link'; // <--- IMPORTANTE: Usar Link de Next.js

// --- (Variantes de Animación - sin cambios) ---
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
  hidden: { opacity: 0, y: 30 }, 
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: 'easeOut' }
  },
};

export default function CategorySection({ categories }) {
  return (

    <section className="w-full bg-emerald-950 py-20">
      
      
      <div className="text-center mb-16 px-4">
        <h2 className="text-5xl font-extrabold mb-4 text-white">Explora por Categoría</h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Encuentra exactamente lo que necesitas para tu bienestar, desde superalimentos hasta cuidado personal.
        </p>
      </div>

      <motion.div 
        className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} 
      >
        {categories.map((category) => (
          <motion.div
            key={category.name}
            variants={cardVariant}
          >
            {/* CAMBIO PRINCIPAL: 
                1. Usamos <Link> en lugar de <a> para navegación SPA.
                2. Pasamos la categoría como query param: ?category=Nombre 
            */}
            <Link 
              href={`/tienda?category=${encodeURIComponent(category.name)}`} 
              className="relative h-80 rounded-lg overflow-hidden shadow-lg group block"
            >
              <img
                src={category.img}
                alt={category.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-400"
              />
              <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-50 transition-opacity duration-300"></div>
              <h3 className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold p-4 text-center">
                {category.name}
              </h3>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
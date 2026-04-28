// app/components/CTASection.js
'use client'; 

import { motion } from 'framer-motion';

// --- Variantes de Animación ---

// 1. Variante para el CONTENEDOR (el 'div' principal)
// Esto hará que los hijos (título, párrafo, botón) aparezcan en secuencia
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Cada elemento hijo se animará 0.2s después del anterior
    },
  },
};

// 2. Variante para los ELEMENTOS (título, párrafo, botón)
// Aparecerán desde abajo
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function CTASection() {
  return (
    // ¡CAMBIO 1: Añadido 'overflow-hidden' para que la animación 'y: 20' no se vea!
    <section className="w-full h-96 bg-stone-800 overflow-hidden">
      
      {/* ¡CAMBIO 2: Convertimos el 'div' principal en un 'motion.div' */}
      <motion.div 
        className="w-full h-full flex flex-col items-center justify-center text-center text-white p-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible" // Se activa cuando entra en la pantalla
        viewport={{ once: true, amount: 0.5 }} // Se activa al ver el 50%
      >
        {/* ¡CAMBIO 3: Añadimos 'motion' y variantes al TÍTULO */}
        <motion.h2 
          className="text-4xl font-bold"
          variants={itemVariants}
        >
          ¿Listo para empezar tu cambio?
        </motion.h2>
        
        {/* ¡CAMBIO 4: Añadimos 'motion' y variantes al PÁRRAFO */}
        <motion.p 
          className="text-xl max-w-xl mt-4 text-stone-300"
          variants={itemVariants}
        >
          Explora nuestro catálogo completo de productos 100% orgánicos.
        </motion.p>
        
        {/* ¡CAMBIO 5: Envolvemos el botón en 'motion.div' con variantes */}
        <motion.div variants={itemVariants}>
          <a 
            href="/tienda" 
            className="mt-8 inline-block bg-white text-stone-900 px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Ver Tienda Completa
          </a>
        </motion.div>

      </motion.div>
    </section>
  );
}
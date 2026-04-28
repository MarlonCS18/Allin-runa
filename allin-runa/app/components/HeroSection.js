// app/components/HeroSection.js
"use client"; 

import React from 'react';
// ¡AÑADIMOS 'Image' de Next.js!
import Image from 'next/image'; 
import { motion, useScroll, useTransform } from 'framer-motion';

// (Este es tu componente de ícono de scroll, lo asumo)
const ScrollDownIcon = () => (
  <svg 
    className="w-6 h-6 text-white" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export default function HeroSection() { 
  
  const { scrollYProgress } = useScroll(); 
  
  const opacity = useTransform(scrollYProgress, [0.0, 0.3], [1, 0]); 
  const yContent = useTransform(scrollYProgress, [0.0, 0.3], ["0%", "-50%"]); 

  return (
    <section 
      // --- ¡CAMBIOS IMPORTANTES! ---
      // 1. Quitamos 'bg-cover', 'bg-center', 'bg-fixed'
      // 2. Mantenemos 'relative', 'w-full', 'h-[120vh]', etc.
      className="w-full relative overflow-hidden flex items-center h-[120vh] -mt-16"
      // 3. ¡QUITAMOS EL 'style' de backgroundImage!
    >
      {/* --- ¡NUEVO COMPONENTE <Image>! --- */}
      {/* 4. Añadimos el componente Image de Next.js para optimizar la imagen */}
      <Image
        src="/hero1-bg.webp" // (Asegúrate que esta imagen esté en /public/hero1-bg.jpg)
        alt="Fondo de productos orgánicos Allin Runa"
        layout="fill"
        objectFit="cover"
        // 5. 'priority' le dice a Next.js que cargue esta imagen primero (¡muy importante!)
        priority={true} 
        // 6. 'quality' (opcional)
        quality={90}
        // 7. La capa oscura ahora es un 'div' separado
        className="brightness-50" 
      />
      
      {/* ============================================== */}
      {/* --- CONTENIDO PRINCIPAL (Sin cambios) --- */}
      {/* ============================================== */}
      <motion.div 
        className="relative z-10 w-full pl-16 md:pl-50 pr-8 text-left" // (Tu clase 'md:pl-50' es la original)
        style={{ opacity, y: yContent }} 
      >
        <div className="max-w-3xl">
          
          <motion.h1 
            className="text-7xl md:text-8xl font-extrabold text-white leading-tight mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Salud Real, Directo del Productor
          </motion.h1>
          
          <motion.p
            className="text-2xl md:text-3xl text-gray-200 mb-10"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            Descubre productos orgánicos, frescos y sostenibles que nutren tu vida.
          </motion.p>
          
          <motion.a 
            href="/tienda" 
            className="inline-block bg-green-600 text-white px-10 py-4 rounded-full text-xl font-semibold hover:bg-green-700 transition-colors shadow-lg"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          >
            Explorar Tienda
          </motion.a>
        </div>
      </motion.div>
      
      {/* ============================================== */}
      {/* --- INDICADOR DE SCROLL (Sin cambios) -- */}
      {/* ============================================== */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        style={{ opacity }}
      >
        <motion.div
          animate={{ y: [0, 15, 0] }} 
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ScrollDownIcon />
        </motion.div>
      </motion.div>
      
    </section>
  );
}
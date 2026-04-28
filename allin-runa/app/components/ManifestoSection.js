// app/components/ManifestoSection.js
'use client'; 

import React from 'react';
import { motion } from 'framer-motion'; 

// --- (Componente Item - sin cambios, ya está en modo claro) ---
const ManifestoItem = ({ title, children }) => (
  <li className="flex items-start">
    <span className="text-green-700 font-bold mr-3 mt-1">✓</span>
    <div className="flex-1">
      <strong className="text-gray-900">{title}</strong>
      <p className="text-gray-700">{children}</p>
    </div>
  </li>
);

// --- (Animación fadeInUp - sin cambios) ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
};


export default function ManifestoSection() {
  return (
    // ¡CAMBIO: FONDO "TONO ARENA"!
    <section className="w-full bg-stone-100 py-24 overflow-hidden"> 
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start px-4">
        
        {/* --- Columna Izquierda (Imágenes) --- */}
        <div className="flex flex-col gap-6">
          <motion.div 
            className="w-5/6"
            variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
          > 
            <img 
              src="/img/manifiesto/manifesto-1.webp" 
              alt="Productos naturales" 
              className="rounded-lg shadow-2xl w-full h-auto object-cover transform transition-transform duration-500 hover:scale-105"
            />
          </motion.div>
           <motion.div 
            className="w-5/6 self-end"
            variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
          > 
            <img 
              src="/img/manifiesto/manifesto-2.webp" 
              alt="Comunidad de agricultores" 
              className="rounded-lg shadow-2xl w-full h-auto object-cover transform transition-transform duration-500 hover:scale-105"
            />
          </motion.div>
          <motion.div 
            className="w-5/6"
            variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
          >
            <img 
              src="/img/manifiesto/manifesto-3.webp" 
              alt="Bienestar" 
              className="rounded-lg shadow-2xl w-full h-auto object-cover transform transition-transform duration-500 hover:scale-105"
            />
          </motion.div>
        </div>

        {/* --- Columna Derecha (Texto) --- */}
        {/* (Texto oscuro - sin cambios) */}
        <div className="text-left md:pl-12">
          
          <motion.h2 
            className="text-5xl font-extrabold mb-6 text-gray-900"
            variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            Tu Bienestar es Nuestra Misión.
          </motion.h2>
          
          <motion.h3 
            className="text-2xl text-green-700 font-semibold mb-6"
            variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            Más que productos, un estilo de vida.
          </motion.h3>
          
          <motion.div 
            className="space-y-4 text-lg text-gray-700"
            variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <p>
              En Allin Runa, no solo vendemos. Nuestra misión es "informar, educar y ofrecerte acceso a productos confiables".
            </p>
            <p>
              Estamos cansados de las "soluciones industriales" que solo alivian síntomas. Creemos en la "prevención de enfermedades" y en el "bienestar integral".
            </p>
            <p>
              Por eso, cada producto que ves aquí contribuye a tu "salud a largo plazo".
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <h4 className="text-2xl font-semibold text-gray-900 pt-8 pb-2">
              Nuestros Principios
            </h4>
            <ul className="list-none space-y-5 text-lg">
              <ManifestoItem title="Confianza Total:">
                Solo ofrecemos productos que nosotros mismos usamos. Trazabilidad completa desde el campo hasta tu mesa.
              </ManifestoItem>
              <ManifestoItem title="Comercio Justo:">
                Trabajamos mano a mano con agricultores locales, asegurando un pago justo que fomenta el desarrollo de su comunidad.
              </ManifestoItem>
              <ManifestoItem title="Salud Preventiva:">
                Creemos que la mejor medicina es una alimentación pura. Nuestros superfoods son la base de un sistema inmune fuerte.
              </ManifestoItem>
              <ManifestoItem title="Sin Atajos:">
                Cero químicos, cero pesticidas, cero ingredientes artificiales. Si no es 100% natural, no está en Allin Runa.
              </ManifestoItem>
            </ul>
          </motion.div>
          
          <motion.div
            variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <h4 className="text-2xl font-semibold text-gray-900 pt-8 pb-2">
              Nuestra Visión
            </h4>
            <div className="text-lg text-gray-700 space-y-4">
              <p>
                Aspiramos a ser más que una tienda; queremos ser tu aliado principal en la búsqueda de una vida plena y saludable.
              </p>
              <p>
                Imaginamos un mundo donde la comida orgánica y natural no sea un lujo, sino el estándar. Un mundo donde cada compra apoye directamente a las comunidades agrícolas y proteja el medio ambiente para las futuras generaciones.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <h4 className="text-2xl font-semibold text-gray-900 pt-8 pb-2">
              Nuestro Compromiso
            </h4>
            <div className="text-lg text-gray-700 space-y-4">
              <p>
                No estamos aquí solo para vender. Estamos aquí para construir una comunidad. Cada producto es una promesa de pureza, y cada compra es un voto por un sistema alimentario más justo y sostenible.
              </p>
              <p>
                Desde las alturas de la sierra hasta la profundidad de la selva, nuestro compromiso es con la tierra y contigo. Un bienestar que se siente bien y hace el bien.
              </p>
            </div>
          </motion.div>
          
        </div> 
      </div>
      
    </section>
  );
}
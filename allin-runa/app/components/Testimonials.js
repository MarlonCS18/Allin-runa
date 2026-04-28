// app/components/Testimonials.js
'use client'; 

// 1. ¡IMPORTAMOS "motion" de Framer Motion!
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules'; 
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // <-- ¡IMPORTANTE!

// --- Tus 4 opiniones originales ---
const testimonialsData = [
  { quote: "¡Increíble calidad! Mi salud ha mejorado muchísimo.", name: "Ana Lucía R." },
  { quote: "Finalmente una tienda en la que puedo confiar.", name: "Carlos G." },
  { quote: "Me encanta el compromiso con los productores locales.", name: "María P." },
  { quote: "Mis favoritos. Siempre frescos y se nota la diferencia.", name: "Laura S." },
];

// --- Duplicamos para arreglar el bug del loop ---
const testimonials = [...testimonialsData, ...testimonialsData];

// --- Iconos SVG (Grandes) ---
const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
);


export default function Testimonials() {

  const [isMounted, setIsMounted] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // --- Loader (Sigue en 170vh) ---
  if (!isMounted) {
    return <section className="w-full bg-gray-100 overflow-hidden" style={{ height: '170vh' }}></section>;
  }

  return (
    // SECCIÓN GRANDE (170vh), 'bg-fixed'
    // LAYOUT: 'justify-between' (Título arriba, Contenido abajo)
    <section 
      className="w-full relative bg-cover bg-center bg-fixed overflow-hidden flex flex-col justify-between pt-32 pb-24" 
      style={{ 
        backgroundImage: "url('heroT.webp')",
        height: '200vh'
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      
      {/* ============================================== */}
      {/* BLOQUE 1: TÍTULO (Arriba y Grande)             */}
      {/* ============================================== */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        <div className="text-center">
          <h2 className="text-6xl font-extrabold text-white">La Opinión de Nuestros Clientes</h2>
        </div>
      </div>

      {/* ============================================== */}
      {/* ¡NUEVO! BLOQUE 1.5: IMAGEN ANIMADA EN EL CENTRO */}
      {/* ============================================== */}
      <motion.div 
        className="relative z-10 flex justify-center items-center"
        // Animación: Aparece invisible y pequeño
        initial={{ opacity: 0, scale: 0.5 }} 
        // Animación: Se vuelve visible y grande CUANDO ENTRA EN LA VISTA
        whileInView={{ opacity: 1, scale: 1 }} 
        // Transición
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }} // (Se anima solo 1 vez)
      >
        <img 
          src="/img/icon/granola.webp" // <-- Tu nueva imagen
          alt="Icono Allin Runa" 
          className="w-200 h-200 opacity-80" // Tamaño de la imagen (ajusta 'w-48 h-48' como quieras)
        />
      </motion.div>

      {/* ============================================== */}
      {/* BLOQUE 2: CONTENIDO (Abajo y Grande)           */}
      {/* ============================================== */}
      <div className="relative z-10 w-full">
        
        {/* --- Subtítulo (Grande) --- */}
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-3xl text-gray-200 mt-2">Confianza y calidad que se siente.</p>
          </div>
          
          {/* --- Botones (Grandes) --- */}
          <div className="flex justify-center gap-6 mb-10">
            <button
              aria-label="Slide Anterior"
              onClick={() => swiperInstance?.slidePrev()}
              className="p-4 rounded-full bg-white/80 shadow-md text-gray-900 hover:bg-white transition-colors"
            >
              <ChevronLeftIcon />
            </button>
            <button
              aria-label="Slide Siguiente"
              onClick={() => swiperInstance?.slideNext()}
              className="p-4 rounded-full bg-white/80 shadow-md text-gray-900 hover:bg-white transition-colors"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>

        {/* --- Carrusel (Grande) --- */}
        <div className="w-full">
          <Swiper
            modules={[Autoplay, Navigation]}
            loop={true}
            slidesPerView={2.2} 
            centeredSlides={true}
            onSwiper={setSwiperInstance}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            grabCursor={true} 
            slidesOffsetBefore={60}
            slidesOffsetAfter={60}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index} className="px-6">
                {({ isActive }) => (
                  <div 
                    className={`p-10 rounded-lg shadow-lg text-center flex flex-col justify-center h-96 transition-colors duration-300 ${
                      isActive 
                        ? 'bg-white' 
                        : 'bg-transparent border-2 border-white border-opacity-50 opacity-80'
                    }`}
                  >
                    <p className={`italic transition-colors duration-300 ${
                      isActive ? 'text-green-600 text-2xl' : 'text-white text-2xl'
                    }`}>
                      "{testimonial.quote}"
                    </p>
                    <p className={`font-bold mt-8 text-xl transition-colors duration-300 ${
                      isActive ? 'text-green-600' : 'text-white'
                    }`}>
                      - {testimonial.name}
                    </p>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
// app/page.js
import React from 'react';

// --- 1. IMPORTACIÓN DE TODOS LOS COMPONENTES ---
// import Header from './components/Header'; // <-- ¡ELIMINADO! Ahora está en layout.js
import HeroSection from './components/HeroSection';
import CategorySection from './components/CategorySection';
import OriginsSection from './components/OriginsSection';
import ManifestoSection from './components/ManifestoSection'; 
import FeaturedProducts from './components/FeaturedProducts';
import CTASection from './components/CTASection';
import Testimonials from './components/Testimonials';
import BlogSection from './components/BlogSection';
// import Footer from './components/Footer'; // <-- ¡ELIMINADO! Ahora está en layout.js

// (Mantengo las importaciones de Swiper que tenías antes,
// ya que 'FeaturedProducts' probablemente las necesite)
import 'swiper/css';
import 'swiper/css/autoplay'; 
import 'swiper/css/navigation';

/* ==============================================
 * FUNCIÓN PARA PEDIR PRODUCTOS (Backend Java)
 * ============================================== */
async function getProductos() {
  try {
    const res = await fetch('http://localhost:8080/api/v1/productos/destacados', { cache: 'no-store' });
    if (!res.ok) throw new Error('Falló al cargar los productos');
    return res.json();
  } catch (error) {
    console.error("ERROR BACKEND (Productos):", error.message);
    return [];
  }
}

/* ==============================================
 * FUNCIÓN PARA PEDIR POSTS DEL BLOG (Simulado)
 * ============================================== */
async function getBlogPosts() {
  // (Usamos los resúmenes largos que definimos)
  return [
    { 
      id: 1, 
      title: 'Los 5 Superfoods', 
      summary: 'Descubre los 5 superfoods esenciales que debes conocer. Desde la quinua hasta la chía, exploramos cómo estos alimentos pueden transformar tu energía y vitalidad diaria.', 
      image: '/img/blog/blog1.webp', 
      slug: 'superfoods' 
    },
    { 
      id: 2, 
      title: 'Evita Industriales', 
      summary: 'Te explicamos por qué evitar productos industriales y elegir orgánico es la mejor decisión para tu salud. Aprende a leer etiquetas y a tomar el control de tu bienestar.', 
      image: '/img/blog/blog2.webp', 
      slug: 'industriales' 
    },
    { 
      id: 3, 
      title: 'Cuidado Sin Tóxicos', 
      summary: 'Una guía completa de Cuidado Personal Sin Tóxicos. Revisa tus productos diarios y descubre alternativas naturales que cuidan tu piel y el planeta sin químicos dañinos.', 
      image: '/img/blog/blog3.webp', 
      slug: 'cuidado-personal' 
    },
    { 
      id: 4, 
      title: 'El Poder de la Maca', 
      summary: 'Todo sobre los beneficios de la maca orgánica. Este superalimento andino es conocido por balancear hormonas, aumentar la resistencia y mejorar la claridad mental.', 
      image: '/img/blog/blog5.webp', 
      slug: 'maca' 
    },
  ];
}



/* ==============================================
 * PÁGINA PRINCIPAL (Componente final)
 * ============================================== */
export default async function HomePage() {
  // Pedimos todos los datos en el servidor
  const productos = await getProductos();
  const posts = await getBlogPosts();

  // Datos estáticos que pasaremos a los componentes
  const categories = [
    { name: 'Superfoods', img: '/img/categories/superfoods.webp' },
    { name: 'Despensa Saludable', img: '/img/categories/despensa.webp' },
    { name: 'Bienestar', img: '/img/categories/bienestar.webp' },
    { name: 'Cuidado Personal', img: '/img/categories/cuidado.webp' },
  ];

  const origins = [
    { name: 'Costa', img: '/img/producers/costa.webp', id: 'costa' },
    { name: 'Sierra', img: '/img/producers/sierra.webp', id: 'sierra' }, 
    { name: 'Selva', img: '/img/producers/selva.webp', id: 'selva' },   
  ];

  return (
    // Las clases 'text-gray-800 bg-zinc-50' ya no son necesarias aquí
    // porque las movimos al <body> en 'layout.js'.
    <main className="flex flex-col items-center">

      {/* --- HEADER (ELIMINADO) --- */}
      {/* Ya no va aquí */}

      {/* --- SECCIÓN 1: HERO --- */}
      <HeroSection />

      {/* --- SECCIÓN 2: CATEGORÍAS --- */}
      <CategorySection categories={categories} />
      
      {/* --- SECCIÓN 3: ORÍGENES --- */}
      <OriginsSection origins={origins} />

      {/* --- SECCIÓN 4: MANIFIESTO --- */}
      <ManifestoSection />
      
      {/* --- SECCIÓN 5: PRODUCTOS DESTACADOS --- */}
      <FeaturedProducts productos={productos} />

      {/* --- SECCIÓN 6: CTA (LLAMADA A LA ACCIÓN) --- */}
      <CTASection />

      {/* --- SECCIÓN 7: TESTIMONIOS --- */}
      <Testimonials />

      {/* --- SECCIÓN 8: BLOG --- */}
      <BlogSection posts={posts} />

      {/* --- SECCIÓN 9: FOOTER (ELIMINADO) --- */}
      {/* <Footer /> */} {/* <-- ¡ELIMINADO! Ahora está en layout.js */}

    </main>
  );
}
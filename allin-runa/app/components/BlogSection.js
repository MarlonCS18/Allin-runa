// app/components/BlogSection.js
'use client'; 

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

export default function BlogSection({ posts }) {
  
  return (
    // ¡CAMBIO 1: FONDO "TONO ARENA"!
    <section className="w-full bg-stone-100 py-24 overflow-hidden"> 
      
      {/* ¡CAMBIO 2: TÍTULO OSCURO! */}
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Edúcate con Nosotros</h2>

      <Swiper
        modules={[Autoplay, Navigation]}
        loop={true}              
        slidesPerView={2}      
        spaceBetween={30}        
        autoplay={{
          delay: 7000,           
          disableOnInteraction: false, 
          pauseOnMouseEnter: true,   
        }}
        speed={1000} 
        grabCursor={true}        
      >
        
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            
            {/* Las tarjetas 'bg-white' resaltan sobre el fondo 'stone-100' */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden h-[28rem]">
              <div className="flex h-full">
                
                <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center items-center text-center">
                  
                  <h3 className="text-3xl font-semibold mb-4">{post.title}</h3>
                  
                  <p className="text-gray-600 text-base mb-6">
                    {post.summary}
                  </p>
                  
                  <a href={`/blog/${post.slug}`} className="text-green-600 font-semibold hover:underline">
                    Más información
                  </a>
                </div>
                
                <div className="w-2/5">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
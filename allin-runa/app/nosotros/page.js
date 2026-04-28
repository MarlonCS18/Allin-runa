// app/nosotros/page.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import OriginDetailCard from '../components/OriginDetailCard'; 

const regionsData = [
  {
    id: "costa",
    regionName: "Costa",
    backgroundImage: "/img/producers/costa-hero.webp", 
    description: "Bañada por el sol y bendecida por las corrientes del Pacífico, la Costa es una tierra de contrastes. Aquí, valles fértiles florecen en medio del desierto, dándonos productos de sabor intenso. Honramos este ecosistema único, trabajando con agricultores que combinan sabiduría ancestral y uso responsable del agua para crear verdadera calidad.",
    products: [
      { name: "Pescado Seco", img: "/img/products/pescado-seco.webp" },
      { name: "Algarrobina", img: "/img/products/algarrobina.webp" },
      { name: "Espárragos", img: "/img/products/esparragos.webp" }
    ] 
  },
  {
    id: "sierra",
    regionName: "Sierra",
    backgroundImage: "/img/producers/sierra-hero.webp", 
    description: "Donde el cielo toca la tierra. A más de 3,000 metros, el aire es puro y el sol intenso. En este escenario majestuoso crecen los superalimentos más potentes del mundo. Nuestros socios en la Sierra no solo cultivan quinua y maca; custodian un legado ancestral, respetando los ciclos de la Pachamama para garantizar una potencia nutricional inigualable.",
    products: [
      { name: "Quinua Orgánica", img: "/img/products/quinua.webp" },
      { name: "Maca", img: "/img/products/maca.webp" },
      { name: "Kiwicha", img: "/img/products/kiwicha.webp" }
    ]
  },
  {
    id: "selva", 
    regionName: "Selva",
    backgroundImage: "/img/producers/selva-hero.webp", 
    description: "El corazón vibrante del planeta. La Amazonía es una sinfonía de biodiversidad, un tesoro de vida exuberante. De esta tierra generosa, y en colaboración directa con agricultores locales, obtenemos cacao puro, café de especialidad y frutos exóticos. Nuestro modelo de comercio justo asegura que cada producto que disfrutas también ayuda a proteger esta maravilla natural.",
    products: [
      { name: "Cacao Puro", img: "/img/products/cacao.webp" },
      { name: "Café de Altura", img: "/img/products/cafe.webp" },
      { name: "Camu Camu", img: "/img/products/camu-camu.webp" }
    ]
  }
];

export default function NosotrosPage() {
  return (
    <main className="flex flex-col items-center">

      {/* --- SECCIÓN 1: MANIFIESTO (EL GANCHO) --- */}
      <section className="relative w-full h-[110vh] flex items-center justify-center text-white -mt-16">
        <Image
          src="/img/producers/nosotro-hero.jpg" 
          alt="Campo de cultivo al amanecer"
          layout="fill"
          objectFit="cover"
          className="brightness-50" 
        />
        <div className="relative z-10 max-w-3xl p-4 w-full h-full flex flex-col justify-start pt-32">
          <h1 className="text-6xl md:text-7xl font-extrabold text-center mb-32">
            Las Manos que nos Nutren
          </h1>
          <p className="text-2xl md:text-3xl text-center">
            Honramos a cada productor de la Costa, Sierra y Selva, creando un puente de comercio justo directamente hasta tu hogar.
          </p>
        </div>
      </section>

      {/* --- SECCIÓN 2: NUESTRA HISTORIA --- */}
      <section className="w-full max-w-6xl px-4 py-20 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src="/img/producers/equipo.jpg" 
              alt="Equipo de Allin Runa"
              width={800} 
              height={400} 
              layout="responsive" 
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>
          
          <div className="text-left">
            <h2 className="text-4xl font-bold mb-6">Nuestra Historia</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Allin Runa nació de una pregunta simple: ¿Por qué es tan difícil encontrar comida que sea buena para nosotros y buena para el planeta? Empezamos este viaje para reconectar con la tierra y con las manos que la trabajan. Dejamos nuestros trabajos de oficina para recorrer el Perú, buscando a los verdaderos guardianes de la salud: los agricultores orgánicos y sostenibles. Nuestro compromiso es asegurar que cada producto cuente una historia de integridad desde su origen hasta tu mesa.
            </p>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 3: NUESTROS ORÍGENES --- */}
      <section className="w-full py-20"> 
        <div className="text-center max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-6">
            Nuestros Orígenes: Costa, Sierra y Selva
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-16">
            La magia de Allin Runa nace en la tierra. Te invitamos a un viaje por las tres regiones que definen nuestro sabor y calidad, y a conocer el trabajo de los productores que lo hacen posible.
          </p>
        </div>
        
        <div className="flex flex-col gap-12">
          {regionsData.map((region) => (
            <div key={region.regionName} id={region.id}>
              <OriginDetailCard
                regionName={region.regionName}
                backgroundImage={region.backgroundImage}
                description={region.description}
                products={region.products}
              />
            </div>
          ))}
        </div>
      </section>

      {/* --- SECCIÓN 4: EL CIERRE (NEWSLETTER) --- */}
      <section className="w-full bg-gray-100 py-24 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Únete a la Comunidad Allin Runa</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-10">
            ¿Inspirado por nuestra historia? Recibe más relatos de nuestros productores, recetas saludables y acceso anticipado a nuevos productos.
          </p>
          
          <form className="flex flex-col md:flex-row gap-4 justify-center max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Tu correo electrónico"
              className="px-6 py-4 rounded-full text-gray-800 w-full md:flex-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
            <button 
              type="submit"
              className="bg-green-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
            >
              Suscribirme
            </button>
          </form>
        </div>
      </section>

    </main>
  );
}
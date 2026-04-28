// app/terminos-servicio/page.js
import React from 'react';
import Link from 'next/link';

export default function TerminosServicioPage() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">

        {/* Encabezado */}
        <div className="mb-12 text-center">
          <span className="text-base font-semibold text-green-600">Legal</span>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Términos y Condiciones del Servicio
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Última actualización: 12 de Noviembre, 2025
          </p>
        </div>

        {/* Contenido sin abstraer */}
        <div className="prose prose-lg max-w-none bg-white p-8 md:p-12 rounded-lg shadow-sm">

          <p className="lead text-lg text-gray-800">
            Bienvenido a Allin Runa. Al acceder o utilizar nuestro sitio web (www.allinruna.com) y realizar una compra, usted acepta estar sujeto a los siguientes términos y condiciones. Por favor, léalos atentamente.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              1. Aceptación de los Términos
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Al utilizar este sitio web, usted declara que tiene al menos la mayoría de edad en su estado o provincia de residencia, o que nos ha dado su consentimiento para permitir que cualquiera de sus dependientes menores use este sitio.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              2. Uso del Sitio Web
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Usted se compromete a utilizar el Sitio solo para fines lícitos y de una manera que no infrinja los derechos de, ni restrinja o inhiba el uso y disfrute del Sitio por parte de terceros. No debe transmitir ningún "gusano" o "virus" ni ningún código de naturaleza destructiva.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
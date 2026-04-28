// app/politicas-envio/page.js
import React from 'react';
import Link from 'next/link';

export default function PoliticasEnvioPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="mb-16 text-center">
          <span className="text-base font-semibold text-green-600">Soporte</span>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Políticas de Envío
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Información clara y transparente sobre cómo y cuándo recibirás tus productos.
          </p>
        </div>

        {/* Contenido sin abstraer */}
        <div className="prose prose-lg max-w-none text-gray-700">

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-green-600">
              Tiempos de Procesamiento y Entrega
            </h2>
            <div className="space-y-4 leading-relaxed">
              <p>Nos esforzamos por procesar todos los pedidos lo más rápido posible. Los pedidos realizados antes de las 12:00 p.m. (mediodía) suelen ser procesados el mismo día hábil.</p>
              <p>Los tiempos de entrega estimados son los siguientes:</p>
              <ul>
                <li><strong>Lima Metropolitana:</strong> 24 a 48 horas hábiles.</li>
                <li><strong>Provincias (Capitales):</strong> 3 a 5 días hábiles.</li>
                <li><strong>Provincias (Zonas Alejadas):</strong> 5 a 7 días hábiles.</li>
              </ul>
              <p><strong>Importante:</strong> Los pedidos realizados durante fines de semana (sábado/domingo) o días feriados se procesarán el siguiente día hábil.</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-green-600">
              Costos de Envío
            </h2>
            <div className="space-y-4 leading-relaxed">
              <p>El costo de envío se calcula automáticamente al momento de finalizar la compra (checkout), justo antes de que realices el pago.</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
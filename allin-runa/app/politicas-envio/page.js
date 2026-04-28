// app/politicas-envio/page.js

import React from 'react';
import Link from 'next/link'; // Importamos Link por si queremos enlazar a otra parte

// Componente reutilizable para las secciones de la política
function PolicySection({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-green-600">
        {title}
      </h2>
      <div className="space-y-4 text-gray-700 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

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

        {/* Contenido de las Políticas */}
        {/* Usamos 'prose' de Tailwind para dar formato bonito a <p>, <ul>, <li> 
          sin necesidad de añadir clases a cada uno.
        */}
        <div className="prose prose-lg max-w-none">

          <PolicySection title="Tiempos de Procesamiento y Entrega">
            <p>
              Nos esforzamos por procesar todos los pedidos lo más rápido posible. Los pedidos realizados antes de las 12:00 p.m. (mediodía) suelen ser procesados el mismo día hábil.
            </p>
            <p>
              Los tiempos de entrega estimados son los siguientes:
            </p>
            <ul>
              <li><strong>Lima Metropolitana:</strong> 24 a 48 horas hábiles.</li>
              <li><strong>Provincias (Capitales):</strong> 3 a 5 días hábiles.</li>
              <li><strong>Provincias (Zonas Alejadas):</strong> 5 a 7 días hábiles.</li>
            </ul>
            <p>
              <strong>Importante:</strong> Los pedidos realizados durante fines de semana (sábado/domingo) o días feriados se procesarán el siguiente día hábil.
            </p>
          </PolicySection>

          <PolicySection title="Costos de Envío">
            <p>
              El costo de envío se calcula automáticamente al momento de finalizar la compra (checkout), justo antes de que realices el pago.
            </p>
            <p>
              Este costo se basa en el destino (distrito/provincia) y el peso total del paquete. 
            </p>
            <p>
              Ocasionalmente, podemos ofrecer promociones de envío gratuito. Estas serán comunicadas claramente en nuestro sitio web y aplicadas automáticamente si tu pedido cumple con las condiciones.
            </p>
          </PolicySection>

          <PolicySection title="Seguimiento de tu Pedido">
            <p>
              ¡Queremos que sepas dónde está tu pedido! Una vez que tu paquete sea despachado de nuestro almacén, recibirás un correo electrónico de confirmación que incluirá un <strong>código de seguimiento</strong>.
            </p>
            <p>
              Con este código, podrás rastrear el estado de tu envío directamente en el sitio web del courier asignado.
            </p>
          </PolicySection>

          <PolicySection title="Consideraciones Importantes">
            <ul>
              <li>
                <strong>Dirección Correcta:</strong> Es responsabilidad total del cliente proporcionar una dirección de envío correcta, completa y con referencias claras. No nos hacemos responsables por retrasos o costos adicionales si la dirección es incorrecta o incompleta.
              </li>
              <li>
                <strong>Recepción del Pedido:</strong> Por favor, asegúrate de que haya una persona mayor de 18 años disponible para recibir el pedido en la dirección indicada durante el horario de entrega (usualmente de 9:00 a.m. a 6:00 p.m.).
              </li>
              <li>
                <strong>Intentos de Entrega:</strong> El courier realizará hasta dos intentos de entrega. Si tras el segundo intento no se logra entregar el pedido (por ausencia, dirección incorrecta, etc.), el paquete será devuelto a nuestro almacén. Para coordinar un nuevo envío, se deberá abonar el costo de envío correspondiente nuevamente.
              </li>
              <li>
                <strong>Paquetes Dañados:</strong> Si tu paquete llega visiblemente dañado, por favor no lo recibas y toma una foto. Contáctanos inmediatamente a través de <Link href="/contacto">nuestro formulario de contacto</Link> para solucionarlo.
              </li>
            </ul>
          </PolicySection>

        </div>
      </div>
    </div>
  );
}
// app/terminos-servicio/page.js
import React from 'react';
import Link from 'next/link'; // Importamos Link para enlazar a otras políticas

// Componente reutilizable para las secciones legales
function LegalSection({ title, children }) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {title}
      </h2>
      <div className="space-y-4 text-gray-700 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

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
            {/* Es buena práctica poner la fecha de última actualización */}
            Última actualización: 12 de Noviembre, 2025
          </p>
        </div>

        {/* Contenido de los Términos */}
        {/* 'prose' de Tailwind da un formato de texto hermoso automáticamente */}
        <div className="prose prose-lg max-w-none bg-white p-8 md:p-12 rounded-lg shadow-sm">

          <p className="lead text-lg text-gray-800">
            Bienvenido a Allin Runa. Al acceder o utilizar nuestro sitio web (www.allinruna.com) y realizar una compra, usted acepta estar sujeto a los siguientes términos y condiciones. Por favor, léalos atentamente.
          </p>

          <LegalSection title="1. Aceptación de los Términos">
            <p>
              Al utilizar este sitio web, usted declara que tiene al menos la mayoría de edad en su estado o provincia de residencia, o que nos ha dado su consentimiento para permitir que cualquiera de sus dependientes menores use este sitio.
            </p>
          </LegalSection>

          <LegalSection title="2. Uso del Sitio Web">
            <p>
              Usted se compromete a utilizar el Sitio solo para fines lícitos y de una manera que no infrinja los derechos de, ni restrinja o inhiba el uso y disfrute del Sitio por parte de terceros. No debe transmitir ningún "gusano" o "virus" ni ningún código de naturaleza destructiva.
            </p>
          </LegalSection>

          <LegalSection title="3. Productos y Precios">
            <p>
              Hacemos todo lo posible para mostrar con la mayor precisión posible los colores, imágenes y descripciones de nuestros productos.
            </p>
            <p>
              Todos los precios de los productos se muestran en Soles Peruanos (PEN) e incluyen el Impuesto General a las Ventas (IGV), a menos que se indique lo contrario.
            </p>
            <p>
              Nos reservamos el derecho de corregir cualquier error, inexactitud u omisión, y de cambiar o actualizar información o cancelar pedidos si alguna información en el Servicio es inexacta, en cualquier momento y sin previo aviso (incluso después de que haya enviado su pedido).
            </p>
          </LegalSection>

          <LegalSection title="4. Proceso de Compra y Pago">
            <p>
              La recepción de una confirmación de pedido por correo electrónico no constituye nuestra aceptación final del pedido. Nos reservamos el derecho, sin notificación previa, de limitar la cantidad de cualquier producto o de rechazar el servicio a cualquier cliente.
            </p>
            <p>
              El pago se procesará a través de las pasarelas de pago disponibles en el sitio. Usted se compromete a proporcionar información de compra y de cuenta actual, completa y precisa.
            </p>
          </LegalSection>

          <LegalSection title="5. Políticas de Envío y Devoluciones">
            <p>
              El uso de este sitio y la compra de productos también están sujetos a nuestra 
              <Link href="/politicas-envio" className="text-green-600 hover:text-green-800 font-medium"> Política de Envíos </Link> 
              y a nuestra Política de Devoluciones (disponible en la página de <Link href="/preguntas-frecuentes" className="text-green-600 hover:text-green-800 font-medium">Preguntas Frecuentes</Link>).
            </p>
            <p>
              Es responsabilidad del cliente revisar estas políticas antes de realizar la compra.
            </p>
          </LegalSection>

          <LegalSection title="6. Propiedad Intelectual">
            <p>
              Todo el contenido publicado en este sitio, incluyendo pero no limitado a texto, gráficos, logotipos, imágenes y software, es propiedad de Allin Runa y está protegido por las leyes de derechos de autor.
            </p>
          </LegalSection>

          <LegalSection title="7. Limitación de Responsabilidad">
            <p>
              Allin Runa no garantiza que el servicio sea ininterrumpido, oportuno o libre de errores. No seremos responsables de ningún daño directo, indirecto, incidental o consecuente que surja del uso o la incapacidad de usar nuestros productos o servicios.
            </p>
          </LegalSection>

          <LegalSection title="8. Modificaciones a los Términos">
            <p>
              Nos reservamos el derecho de actualizar, cambiar o reemplazar cualquier parte de estos Términos de Servicio mediante la publicación de actualizaciones y/o cambios en nuestro sitio web. Es su responsabilidad revisar esta página periódicamente para ver los cambios.
            </p>
          </LegalSection>
          
          <LegalSection title="9. Ley Aplicable">
            <p>
              Estos Términos de Servicio y cualquier acuerdo separado por el cual le proporcionemos Servicios se regirán e interpretarán de acuerdo con las leyes de la República del Perú.
            </p>
          </LegalSection>

        </div>
      </div>
    </div>
  );
}
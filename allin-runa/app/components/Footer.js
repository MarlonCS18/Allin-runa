// app/components/Footer.js
import React from 'react';

// --- (Iconos SVG para Redes Sociales) ---
// (Los dejamos aquí porque los usaremos en la columna "Contacto")
const SocialIcon = ({ href, children }) => (
  <a href={href} className="text-gray-400 hover:text-white transition-colors">{children}</a>
);

const FacebookIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path></svg>
);
const InstagramIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.149-3.227 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.62c-3.224 0-3.593.012-4.834.07-2.73.125-3.951 1.34-4.075 4.075-.058 1.24-.07 1.606-.07 4.823s.012 3.584.07 4.834c.125 2.73 1.34 3.951 4.075 4.075 1.24.058 1.61.07 4.834.07 3.224 0 3.593-.012 4.834-.07 2.73-.125 3.951-1.34 4.075-4.075.058-1.24.07-1.61.07-4.834s-.012-3.584-.07-4.823c-.125-2.73-1.34-3.951-4.075-4.075-1.24-.058-1.61-.07-4.834-.07zM12 6.865c-2.834 0-5.135 2.301-5.135 5.135s2.301 5.135 5.135 5.135 5.135-2.301 5.135-5.135S14.834 6.865 12 6.865zm0 8.61c-1.917 0-3.475-1.558-3.475-3.475S10.083 8.525 12 8.525s3.475 1.558 3.475 3.475S13.917 15.475 12 15.475zm5.17-8.19c-.831 0-1.503.672-1.503 1.503s.672 1.503 1.503 1.503 1.503-.672 1.503-1.503S17.901 5.783 17.17 5.783z"></path></svg>
);

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-20 pb-10"> {/* Más padding arriba */}
      
      {/* ¡AQUÍ ESTÁ EL CAMBIO!
        1. Quitamos 'max-w-6xl' y 'mx-auto'.
        2. Añadimos 'px-24' (padding grande a los lados) para que sea full-width.
        3. Cambiamos a 'grid-cols-5' (5 columnas).
      */}
      <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-8 px-12 lg:px-24">
        
        {/* --- Columna 1 (Allin Runa) --- */}
        <div>
          <h5 className="text-lg font-bold text-white mb-4">Allin Runa</h5>
          <p>
            Promoviendo bienestar integral con productos orgánicos de confianza.
          </p>
        </div>
        
        {/* --- Columna 2 (Navegación) --- */}
        <div>
          <h5 className="text-lg font-bold text-white mb-4">Navegación</h5>
          <ul className="space-y-3">
            <li><a href="/" className="hover:text-white transition-colors">Inicio</a></li>
            <li><a href="/tienda" className="hover:text-white transition-colors">Tienda</a></li>
            <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
            <li><a href="/nosotros" className="hover:text-white transition-colors">Nosotros</a></li>
          </ul>
        </div>
        
        {/* --- Columna 3 (Soporte) --- */}
        <div>
          <h5 className="text-lg font-bold text-white mb-4">Soporte</h5>
          <ul className="space-y-3">
            <li><a href="/preguntas-frecuentes" className="hover:text-white transition-colors">Preguntas Frecuentes</a></li>
            <li><a href="/politicas-envio" className="hover:text-white transition-colors">Políticas de Envío</a></li>
            <li><a href="/terminos-servicio" className="hover:text-white transition-colors">Términos de Servicio</a></li>
          </ul>
        </div>

        {/* --- Columna 4 (¡NUEVA! Contacto) --- */}
        <div>
          <h5 className="text-lg font-bold text-white mb-4">Contacto</h5>
          <ul className="space-y-3">
            <li><a href="mailto:hola@allinruna.com" className="hover:text-white transition-colors">hola@allinruna.com</a></li>
            <li><a href="tel:+51999888777" className="hover:text-white transition-colors">+51 999 888 777</a></li>
            <li className="flex gap-4 pt-2">
              <SocialIcon href="#"><FacebookIcon /></SocialIcon>
              <SocialIcon href="#"><InstagramIcon /></SocialIcon>
            </li>
          </ul>
        </div>
        
        {/* --- Columna 5 (Newsletter) --- */}
        <div>
          <h5 className="text-lg font-bold text-white mb-4">Únete a la Comunidad</h5>
          <p className="mb-4">
            Recibe guías de salud y ofertas.
          </p>
          <input 
            type="email" 
            placeholder="Tu email" 
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500 text-white" 
          />
        </div>

      </div>
      <div className="text-center mt-16 border-t border-gray-800 pt-10">
        © 2025 Allin Runa. Todos los derechos reservados.
      </div>
    </footer>
  );
}
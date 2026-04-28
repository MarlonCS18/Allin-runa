// app/gracias/[pedidoId]/page.js
"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation'; // Hook para leer el ID de la URL
import { CheckCircleIcon } from '@heroicons/react/24/solid'; // Ícono de éxito
import { motion } from 'framer-motion';

export default function GraciasPage() {
  
  // 1. Leemos los parámetros de la URL
  const params = useParams();
  
  // 2. Obtenemos el ID del pedido que nos envió el checkout
  const { pedidoId } = params;

  return (
    <div className="bg-white min-h-[calc(100vh-200px)] flex items-center justify-center py-20 px-4">
      <motion.div
        className="max-w-lg w-full bg-white p-10 rounded-lg shadow-xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Ícono de Éxito */}
        <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto" />

        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-3">
          ¡Gracias por tu compra!
        </h1>

        {/* Mensaje de Confirmación */}
        <p className="text-lg text-gray-700">
          Hemos recibido tu pedido correctamente.
        </p>
        
        {/* Número de Pedido */}
        <p className="text-gray-600 mt-4">
          Tu número de pedido es:
        </p>
        <span className="block text-2xl font-bold text-gray-800 mt-2 mb-8 bg-gray-100 py-2 rounded-md">
          #{pedidoId}
        </span>

        {/* Próximos Pasos */}
        <p className="text-gray-600">
          Pronto recibirás un correo electrónico de confirmación en la dirección que registraste con todos los detalles de tu orden.
        </p>

        {/* Botones de Acción */}
        <div className="mt-10 flex flex-col sm:flex-row sm:justify-center gap-4">
          <Link 
            href="/tienda" 
            className="w-full sm:w-auto px-8 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors"
          >
            Seguir Comprando
          </Link>
          <Link 
            href="/" 
            className="w-full sm:w-auto px-8 py-3 bg-gray-100 text-gray-800 rounded-full font-semibold hover:bg-gray-200 transition-colors"
          >
            Ir al Inicio
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
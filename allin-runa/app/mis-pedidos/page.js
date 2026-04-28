"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
// --- ¡ERROR CORREGIDO! ---
// El ícono se llama 'DocumentArrowDownIcon', no 'DocumentDownloadIcon'
import { InboxIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';

// API URL (¡Asegúrate que sea el puerto correcto!)
const API_URL = 'http://localhost:8080/api/v1/pedidos';

export default function MisPedidosPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Proteger la Ruta (sin cambios) ---
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login'); // Redirigir si no está logueado
    }
  }, [isAuthenticated, authLoading, router]);

  // --- Cargar Pedidos (sin cambios) ---
  useEffect(() => {
    if (isAuthenticated) { // Solo buscar si está logueado
      const fetchPedidos = async () => {
        try {
          setLoading(true);
          const res = await fetch(`${API_URL}/mis-pedidos`, {
            credentials: 'include', // ¡MUY IMPORTANTE para enviar la cookie!
          });

          if (!res.ok) {
            throw new Error('No se pudieron cargar los pedidos.');
          }

          const data = await res.json();
          setPedidos(data);

        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchPedidos();
    }
  }, [isAuthenticated]); // Se ejecuta cuando 'isAuthenticated' cambia

  // --- Estado de Carga (Auth + Pedidos) (sin cambios) ---
  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Cargando tus pedidos...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-200px)] py-20">
      <div className="max-w-6xl mx-auto px-4">
        
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Mis Pedidos</h1>

        {/* --- 1. Si no hay pedidos (sin cambios) --- */}
        {pedidos.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-lg shadow-md">
            <InboxIcon className="w-20 h-20 text-gray-300 mx-auto" />
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
              Aún no tienes pedidos
            </h2>
            <p className="text-gray-600 mb-8">
              ¡Explora nuestra tienda y encuentra productos increíbles!
            </p>
            <Link 
              href="/tienda" 
              className="px-8 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700"
            >
              Ir a la Tienda
            </Link>
          </div>
        ) : (
          
        // --- 2. Si SÍ hay pedidos ---
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="table-responsive">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pedido ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pedidos.map((pedido) => (
                    <tr key={pedido.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{pedido.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(pedido.fecha).toLocaleDateString('es-ES')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span 
                          className={`px-3 py-1 rounded-full font-medium text-xs
                            ${pedido.estado === 'PENDIENTE' ? 'bg-yellow-100 text-yellow-800' : 
                             (pedido.estado === 'CANCELADO' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800')}
                          `}
                        >
                          {pedido.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        S/ {pedido.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {/* --- ¡El Botón de Descarga! --- */}
                        <a
                          href={`${API_URL}/${pedido.id}/factura`}
                          target="_blank" // Abre en una nueva pestaña
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-800 flex items-center"
                        >
                          {/* --- ¡ERROR CORREGIDO! --- */}
                          <DocumentArrowDownIcon className="w-5 h-5 mr-1" />
                          Descargar {pedido.tipoComprobante === 'factura' ? 'Factura' : 'Boleta'}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
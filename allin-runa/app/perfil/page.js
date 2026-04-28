// app/perfil/page.js
"use client";

import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';

export default function PerfilPage() {
  // Datos simulados para la estructura inicial
  const user = { nombre: 'Usuario', email: 'usuario@correo.com' };

  const handleLogout = () => {
    console.log("Simulando cierre de sesión...");
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-200px)] py-20">
      <div className="max-w-2xl mx-auto px-4">
        
        {/* Encabezado */}
        <div className="flex flex-col items-center mb-10">
          <UserCircleIcon className="w-24 h-24 text-gray-400" />
          <h1 className="text-4xl font-bold text-gray-900 mt-4">
            Mi Perfil
          </h1>
          <p className="text-xl text-gray-600">Hola, {user.nombre}</p>
        </div>

        {/* Formulario de Perfil */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <form className="space-y-6">
            
            {/* Campo Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                Nombre Completo
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  defaultValue={user.nombre}
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
                  disabled // Deshabilitado por ahora
                />
              </div>
            </div>

            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={user.email}
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
                  disabled
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <button
                type="button"
                className="w-full px-6 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>

        {/* Botón de Cerrar Sesión */}
        <div className="mt-8 text-center">
            <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 font-medium"
            >
                Cerrar Sesión
            </button>
        </div>
      </div>
    </div>
  );
}
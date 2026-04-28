// app/tienda/page.js
import React from 'react';
import TiendaContenido from '../components/TiendaContenido';

// Función para obtener productos desde el backend (Server Side)
async function getProducts() {
  try {
    // Intentamos conectar con el backend
    const res = await fetch('http://localhost:8080/api/v1/productos', { 
      cache: 'no-store' // Datos siempre frescos
    });

    if (!res.ok) {
      // Si el backend responde con error (ej. 500), lanzamos error
      throw new Error(`Error del servidor: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    // Si no hay conexión (fetch failed), capturamos el error para que la página no se rompa
    console.error("ERROR CRÍTICO AL OBTENER PRODUCTOS:", error.message);
    return []; // Retornamos array vacío para que la tienda se renderice vacía pero funcional
  }
}

export default async function TiendaPage({ searchParams }) {
  
  // --- 1. DECLARACIÓN GLOBAL DE LA VARIABLE (¡CRUCIAL!) ---
  // La declaramos aquí con 'let' para que sea accesible en toda la función.
  let initialCategory = 'Todos';

  // --- 2. LÓGICA DE PARÁMETROS ---
  try {
    // En versiones recientes de Next.js, searchParams es una promesa que debe esperarse.
    const params = await searchParams; 
    
    // Si existe el parámetro 'category' en la URL, actualizamos la variable.
    if (params && params.category) {
      initialCategory = params.category;
    }
  } catch (error) {
    console.error("Error procesando searchParams:", error);
    // Si falla algo aquí, initialCategory sigue valiendo 'Todos' gracias a la línea 25.
  }

  // --- 3. CARGA DE DATOS ---
  const allProducts = await getProducts();

  // --- 4. RENDERIZADO ---
  // Ahora 'initialCategory' está garantizada de existir aquí.
  return (
    <main className="flex flex-col items-center">
      <TiendaContenido 
        allProducts={allProducts} 
        initialCategory={initialCategory} 
      />
    </main>
  );
}
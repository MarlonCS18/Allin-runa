// app/checkout/page.js
"use client";

import React, { useState, useEffect } from 'react'; 
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // <-- 1. IMPORTAR AUTH
import { LockClosedIcon } from '@heroicons/react/24/solid';
import { ubigeoData } from '../lib/ubigeoData'; 

const BACKEND_URL = 'http://localhost:8080';

// Helper para la URL de la imagen
function getImageUrl(imagen) {
  if (imagen) {
    if (imagen.startsWith('http://') || imagen.startsWith('https://')) {
      return imagen;
    }
    return `${BACKEND_URL}${imagen}`;
  }
  return '/img/placeholder.webp';
}

// Componente: Input de Formulario (Corregido)
function FormInput({ id, label, type = 'text', required = true, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          type={type}
          id={id}
          name={id}
          className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
          {...props}
          required={required} 
        />
      </div>
    </div>
  );
}

// Componente: Select de Formulario
function FormSelect({ id, label, value, onChange, disabled, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
          required
        >
          {children}
        </select>
      </div>
    </div>
  );
}


export default function CheckoutPage() {
  
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth(); // <-- 2. USAR AUTH (y 'user')

  const [formData, setFormData] = useState({
    // Pre-llenamos el email si el usuario está logueado
    email: '', 
    nombre: '',
    apellidos: '',
    tipoComprobante: 'boleta',
    dni: '',
    ruc: '',
    razonSocial: '',
    telefono: '',
    direccion: '',
    referencia: '', 
    departamento: '',
    provincia: '',
    distrito: '',
  });

  // Estados para los selects
  const [departamentos, setDepartamentos] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [distritos, setDistritos] = useState([]);

  // Otros estados
  const [metodoEnvio, setMetodoEnvio] = useState('estandar');
  const [metodoPago, setMetodoPago] = useState('tarjeta');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  // --- 3. PROTEGER LA RUTA Y PRE-LLENAR DATOS ---
  useEffect(() => {
    // Si la autenticación terminó de cargar...
    if (!loading) {
      // Y el usuario NO está autenticado...
      if (!isAuthenticated) {
        router.push('/login'); // Redirigir
      } else {
        // SI ESTÁ AUTENTICADO: pre-llenamos el formulario
        setFormData(prev => ({
          ...prev,
          email: user.email || '',
          nombre: user.nombre || ''
        }));
      }
    }
  }, [isAuthenticated, loading, router, user]); // Depende de 'user'

  // --- Efectos para Ubigeo (sin cambios) ---
  useEffect(() => {
    setDepartamentos(ubigeoData.map(dep => dep.departamento));
  }, []);
  useEffect(() => {
    let depData;
    if (formData.departamento) {
      depData = ubigeoData.find(d => d.departamento === formData.departamento);
      setProvincias(depData ? depData.provincias.map(p => p.provincia) : []);
    } else {
      setProvincias([]);
    }
    setFormData(prev => ({ ...prev, provincia: '', distrito: '' }));
    setDistritos([]);
  }, [formData.departamento]);
  useEffect(() => {
    if (formData.departamento && formData.provincia) {
      const depData = ubigeoData.find(d => d.departamento === formData.departamento);
      const provData = depData ? depData.provincias.find(p => p.provincia === formData.provincia) : null;
      setDistritos(provData ? provData.distritos : []);
    } else {
      setDistritos([]);
    }
    setFormData(prev => ({ ...prev, distrito: '' }));
  }, [formData.provincia, formData.departamento]);

  // Redirigir si el carrito está vacío
  useEffect(() => {
    if (cart.length === 0 && !isProcessing && isAuthenticated) { // Solo si ya sabemos que está autenticado
      router.push('/tienda');
    }
  }, [cart, isProcessing, router, isAuthenticated]);


  // --- Cálculos de Totales (sin cambios) ---
  const subtotal = cart.reduce((acc, item) => acc + (item.precio * item.quantity), 0);
  const costoEnvio = metodoEnvio === 'estandar' ? 10.00 : 0.00; 
  const total = subtotal + costoEnvio;

  // --- Manejadores de Eventos (sin cambios) ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleComprobanteChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      tipoComprobante: value,
      dni: value === 'factura' ? '' : prev.dni,
      ruc: value === 'boleta' ? '' : prev.ruc,
      razonSocial: value === 'boleta' ? '' : prev.razonSocial,
    }));
  };

  // --- Manejador del Envío del Formulario (sin cambios, usa la llamada REAL) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    // Validaciones
    if (formData.tipoComprobante === 'boleta' && !formData.dni) {
      setError('El DNI es obligatorio para la boleta.');
      setIsProcessing(false);
      return;
    }
    if (formData.tipoComprobante === 'factura' && (!formData.ruc || !formData.razonSocial)) {
      setError('El RUC y la Razón Social son obligatorios para la factura.');
      setIsProcessing(false);
      return;
    }
    if (!formData.distrito) {
      setError('Por favor, selecciona un departamento, provincia y distrito.');
      setIsProcessing(false);
      return;
    }

    // Construir objeto
    const pedidoData = {
      clienteInfo: formData,
      items: cart.map(item => ({ id: item.id, quantity: item.quantity, precio: item.precio })),
      metodoEnvio: metodoEnvio,
      metodoPago: metodoPago,
      costoEnvio: costoEnvio,
      subtotal: subtotal,
      total: total
    };

    console.log("Enviando Pedido REAL al Backend:", pedidoData);

    // ¡Llamada REAL al Backend!
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/pedidos/crear`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // ¡VITAL! Enviar cookies de sesión con la petición
        credentials: 'include', 
        body: JSON.stringify(pedidoData)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'No se pudo procesar el pedido.');
      }
      
      const data = await response.json(); // { pedidoId: 123 }
      
      // Éxito: Limpiar carrito y redirigir
      clearCart();
      router.push(`/gracias/${data.pedidoId}`);

    } catch (err) {
      setError(err.message || "Hubo un error al procesar tu pedido. Intenta de nuevo.");
      setIsProcessing(false);
    }
  };

  // --- RENDERIZADO ---

  // 4. MOSTRAR "CARGANDO..." MIENTRAS SE VERIFICA
  if (loading || !isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p className="text-lg text-gray-600">Cargando...</p>
      </div>
    );
  }

  // Si se autenticó y el carrito está vacío (y está a punto de redirigir)
  if (cart.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p className="text-lg text-gray-600">Tu carrito está vacío. Redirigiendo a la tienda...</p>
      </div>
    );
  }

  // --- Renderizado Principal (Checkout) ---
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* --- Columna Izquierda: Formularios --- */}
          <div className="lg:col-span-1">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Sección 1: Contacto */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Información de Contacto</h2>
                <FormInput
                  id="email"
                  label="Correo Electrónico"
                  type="email"
                  value={formData.email} // Pre-llenado desde el estado
                  onChange={handleInputChange}
                  autoComplete="email"
                />
              </section>

              {/* Sección 2: Comprobante de Pago */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Comprobante de Pago</h2>
                <fieldset className="flex gap-6">
                  <div className="flex items-center">
                    <input id="boleta" name="tipoComprobante" type="radio" value="boleta"
                           checked={formData.tipoComprobante === 'boleta'} onChange={handleComprobanteChange}
                           className="h-4 w-4 text-green-600 border-gray-300" />
                    <label htmlFor="boleta" className="ml-2 block text-sm text-gray-900">Boleta</label>
                  </div>
                  <div className="flex items-center">
                    <input id="factura" name="tipoComprobante" type="radio" value="factura"
                           checked={formData.tipoComprobante === 'factura'} onChange={handleComprobanteChange}
                           className="h-4 w-4 text-green-600 border-gray-300" />
                    <label htmlFor="factura" className="ml-2 block text-sm text-gray-900">Factura</label>
                  </div>
                </fieldset>
              </section>

              {/* Sección 3: Datos del Cliente y Envío */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Datos del Cliente y Envío</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput id="nombre" label="Nombres" value={formData.nombre} onChange={handleInputChange} autoComplete="given-name" />
                  <FormInput id="apellidos" label="Apellidos" value={formData.apellidos} onChange={handleInputChange} autoComplete="family-name" />
                  
                  {formData.tipoComprobante === 'boleta' && (
                    <FormInput id="dni" label="DNI" type="number" value={formData.dni} onChange={handleInputChange} />
                  )}

                  {formData.tipoComprobante === 'factura' && (
                    <>
                      <FormInput id="ruc" label="RUC" type="number" value={formData.ruc} onChange={handleInputChange} />
                      <FormInput id="razonSocial" label="Razón Social" value={formData.razonSocial} onChange={handleInputChange} />
                    </>
                  )}
                  
                  <FormInput id="telefono" label="Teléfono (Celular)" type="tel" value={formData.telefono} onChange={handleInputChange} autoComplete="tel" />
                  
                  <div className="md:col-span-2">
                    <FormInput id="direccion" label="Dirección (Calle, número, dpto.)" value={formData.direccion} onChange={handleInputChange} autoComplete="street-address" />
                  </div>
                  
                  <div className="md:col-span-2">
                    <FormInput 
                      id="referencia" 
                      label="Referencia (Opcional)" 
                      value={formData.referencia} 
                      onChange={handleInputChange} 
                      required={false} 
                    />
                  </div>

                  {/* Selects de Ubigeo */}
                  <FormSelect id="departamento" name="departamento" label="Departamento" value={formData.departamento} onChange={handleInputChange}>
                    <option value="">Selecciona un departamento...</option>
                    {departamentos.map(dep => (
                      <option key={dep} value={dep}>{dep}</option>
                    ))}
                  </FormSelect>
                  
                  <FormSelect id="provincia" name="provincia" label="Provincia" value={formData.provincia} onChange={handleInputChange} disabled={provincias.length === 0}>
                    <option value="">Selecciona una provincia...</option>
                    {provincias.map(prov => (
                      <option key={prov} value={prov}>{prov}</option>
                    ))}
                  </FormSelect>
                  
                  <FormSelect id="distrito" name="distrito" label="Distrito" value={formData.distrito} onChange={handleInputChange} disabled={distritos.length === 0}>
                    <option value="">Selecciona un distrito...</option>
                    {distritos.map(dist => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </FormSelect>
                  
                </div>
              </section>

              {/* Sección 4: Método de Envío */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Método de Envío</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between border border-gray-300 rounded-md p-4">
                    <div className="flex items-center">
                      <input id="envioEstandar" name="metodoEnvio" type="radio" value="estandar"
                             checked={metodoEnvio === 'estandar'} onChange={(e) => setMetodoEnvio(e.target.value)}
                             className="h-4 w-4 text-green-600 border-gray-300" />
                      <label htmlFor="envioEstandar" className="ml-3 block text-sm text-gray-900">Envío Estándar (2-3 días)</label>
                    </div>
                    <span className="text-sm font-medium">S/ 10.00</span>
                  </div>
                  <div className="flex items-center justify-between border border-gray-300 rounded-md p-4">
                    <div className="flex items-center">
                      <input id="recojoTienda" name="metodoEnvio" type="radio" value="recojo"
                             checked={metodoEnvio === 'recojo'} onChange={(e) => setMetodoEnvio(e.target.value)}
                             className="h-4 w-4 text-green-600 border-gray-300" />
                      <label htmlFor="recojoTienda" className="ml-3 block text-sm text-gray-900">Recojo en Tienda</label>
                    </div>
                    <span className="text-sm font-medium">Gratis</span>
                  </div>
                </div>
              </section>

              {/* Sección 5: Método de Pago */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Método de Pago</h2>
                <fieldset className="space-y-3">
                  <div className="flex items-center border border-gray-300 rounded-md p-4">
                    <input id="tarjeta" name="metodoPago" type="radio" value="tarjeta"
                           checked={metodoPago === 'tarjeta'} onChange={(e) => setMetodoPago(e.target.value)}
                           className="h-4 w-4 text-green-600 border-gray-300" />
                    <label htmlFor="tarjeta" className="ml-3 block text-sm text-gray-900">Tarjeta de Crédito/Débito</label>
                  </div>
                  <div className="flex items-center border border-gray-300 rounded-md p-4">
                    <input id="yape" name="metodoPago" type="radio" value="yape"
                           checked={metodoPago === 'yape'} onChange={(e) => setMetodoPago(e.target.value)}
                           className="h-4 w-4 text-green-600 border-gray-300" />
                    <label htmlFor="yape" className="ml-3 block text-sm text-gray-900">Yape / Plin (Transferencia)</label>
                  </div>
                </fieldset>
              </section>

              {/* Error si existe */}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  <p>{error}</p>
                </div>
              )}

              {/* Botón Final de Pago */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isProcessing || cart.length === 0}
                  className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <LockClosedIcon className="w-5 h-5 mr-2" />
                  {isProcessing ? 'Procesando...' : `Pagar S/ ${total.toFixed(2)}`}
                </button>
              </div>

            </form>
          </div>
          
          {/* --- Columna Derecha: Resumen de Pedido --- */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-medium text-gray-900 border-b pb-4">
                Resumen del Pedido ({cart.length} {cart.length === 1 ? 'producto' : 'productos'})
              </h2>

              {/* Lista de productos */}
              <ul role="list" className="divide-y divide-gray-200 my-6">
                {cart.map((item) => (
                  <li key={item.id} className="flex py-4">
                    <div className="flex-shrink-0 w-20 h-20 rounded-md border border-gray-200 overflow-hidden">
                      <img
                        src={getImageUrl(item.imagen)}
                        alt={item.nombre}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1 flex flex-col justify-center">
                      <div>
                        <div className="flex justify-between text-sm font-medium text-gray-900">
                          <h3>{item.nombre}</h3>
                          <p className="ml-4">S/ {(item.precio * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Cantidad: {item.quantity}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              {/* Cálculo de Totales */}
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Subtotal</p>
                  <p className="text-sm font-medium text-gray-900">S/ {subtotal.toFixed(2)}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Envío</p>
                  <p className="text-sm font-medium text-gray-900">
                    {costoEnvio > 0 ? `S/ ${costoEnvio.toFixed(2)}` : 'Gratis'}
                  </p>
                </div>
                
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <p className="text-base font-medium text-gray-900">Total</p>
                  <p className="text-base font-medium text-gray-900">S/ {total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
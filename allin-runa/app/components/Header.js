// app/components/Header.js
"use client";

// ¡Añadimos 'useContext', 'useRef' y 'AnimatePresence'!
import React, { useState, useEffect, useContext, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// --- Contextos ---
import { useCart } from '../context/CartContext'; // <-- ¡IMPORTADO!
import { useAuth } from '../context/AuthContext'; 

// --- Íconos ---
import { 
  Bars3Icon, 
  XMarkIcon, 
  ShoppingCartIcon,
  UserCircleIcon,
  UserIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const pathname = usePathname();
  const profileMenuRef = useRef(null); 

  // --- OBTENER ESTADO DE AUTH Y CARRITO ---
  const { cart, clearCart } = useCart(); // <-- ¡AÑADIMOS clearCart!
  const { user, isAuthenticated, loading, logout } = useAuth(); 

  // Calcular total de items (sin cambios)
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Efecto para el scroll (sin cambios)
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efecto para cerrar menú de perfil (sin cambios)
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileMenuRef]);

  // Clases dinámicas (sin cambios)
  const navClass = isScrolled || pathname !== '/'
    ? 'bg-white text-gray-900 shadow-md'
    : 'bg-transparent text-white';
  
  const linkClass = isScrolled || pathname !== '/'
    ? 'hover:text-green-600'
    : 'hover:text-gray-200';

  // Links de navegación (sin cambios)
  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/tienda', label: 'Tienda' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${navClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo (sin cambios) */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold">
              Allin Runa
            </Link>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = link.href === '/' 
                ? pathname === '/' 
                : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium transition-colors ${linkClass} ${
                    isActive ? 'text-green-600' : ''
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            
            {/* Link del Carrito (sin cambios) */}
            <Link 
              href="/carrito"
              className={`flex items-center gap-2 font-medium transition-colors ${linkClass}`}
            >
              <ShoppingCartIcon className="w-5 h-5" />
              Carrito
              {totalItems > 0 && (
                <span className="bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* --- BLOQUE DE AUTH DINÁMICO (DESKTOP) --- */}
            <div className="flex items-center gap-4">
              {loading ? (
                <div className="h-6 w-24 bg-gray-200 rounded-md animate-pulse"></div>
              ) : isAuthenticated ? (
                
                // --- A. SI ESTÁ LOGUEADO: Mostrar Menú de Perfil ---
                <div className="relative" ref={profileMenuRef}>
                  <button 
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className={`flex items-center gap-1 font-medium transition-colors ${linkClass}`}
                  >
                    <UserCircleIcon className="w-6 h-6" />
                    <span className="hidden lg:block">{user.nombre.split(' ')[0]}</span>
                  </button>
                  
                  {/* Menú Desplegable */}
                  <AnimatePresence>
                    {isProfileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                      >
                        <div className="px-4 py-2 text-sm text-gray-700 border-b">
                          Hola, <span className="font-medium">{user.nombre}</span>
                        </div>
                        <Link href="/perfil"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsProfileMenuOpen(false)}>
                          Mi Perfil
                        </Link>
                        <Link href="/mis-pedidos"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsProfileMenuOpen(false)}>
                          Mis Pedidos
                        </Link>
                        
                        {/* --- ARREGLO CARRITO (DESKTOP) --- */}
                        <button
                          onClick={() => {
                            clearCart(); // <-- ¡ARREGLO AQUÍ!
                            logout();
                            setIsProfileMenuOpen(false);
                          }}
                          className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2"/>
                          Cerrar Sesión
                        </button>
                        
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
              ) : (
                
                // --- B. SI ES VISITANTE: Mostrar Iniciar Sesión y Registrarse ---
                <>
                  <Link href="/login" className={`flex items-center gap-1 font-medium transition-colors ${linkClass}`}>
                    <UserIcon className="w-5 h-5" />
                    Iniciar Sesión
                  </Link>
                  <Link 
                    href="/registro" 
                    className="px-4 py-2 rounded-full text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Botón Menú Móvil (sin cambios) */}
          <div className="md:hidden flex items-center">
            <Link 
              href="/carrito"
              className={`relative p-2 mr-2 rounded-full ${linkClass}`}
            >
              <ShoppingCartIcon className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* --- PANEL DE MENÚ MÓVIL (ACTUALIZADO) --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white text-gray-900 shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* Links de Navegación */}
              {navLinks.map((link) => {
                const isActive = link.href === '/' 
                  ? pathname === '/' 
                  : pathname.startsWith(link.href);
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="border-t border-gray-200 pt-3 mt-3">
                {/* Lógica de Auth en Móvil */}
                {loading ? (
                  <div className="block px-3 py-2 rounded-md text-base font-medium text-gray-500">
                    Cargando...
                  </div>
                ) : isAuthenticated ? (
                  // --- A. SI ESTÁ LOGUEADO (MÓVIL) ---
                  <>
                    <Link
                      href="/perfil"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
                    >
                      Mi Perfil ({user.nombre.split(' ')[0]})
                    </Link>
                    <Link
                      href="/mis-pedidos"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
                    >
                      Mis Pedidos
                    </Link>
                    
                    {/* --- ARREGLO CARRITO (MÓVIL) --- */}
                    <button
                      onClick={() => {
                        clearCart(); // <-- ¡ARREGLO AQUÍ!
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-100"
                    >
                      Cerrar Sesión
                    </button>
                    
                  </>
                ) : (
                  // --- B. SI ES VISITANTE (MÓVIL) ---
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
                    >
                      Iniciar Sesión
                    </Link>
                    <Link
                      href="/registro"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
                    >
                      Registrarse
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
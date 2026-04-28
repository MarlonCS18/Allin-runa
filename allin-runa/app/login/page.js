// app/login/page.js
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { LockClosedIcon } from '@heroicons/react/24/solid';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, isAuthenticated, loading: authLoading } = useAuth();

  // Si ya está logueado, redirigir a la página PRINCIPAL
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push('/'); // <-- CAMBIO AQUÍ
    }
  }, [isAuthenticated, authLoading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await login(email, password);

    if (result.success) {
      router.push('/'); // <-- ¡CAMBIO AQUÍ! Éxito, redirigir a la página principal
    } else {
      setError(result.error || 'Credenciales incorrectas');
      setLoading(false);
    }
  };

  // No mostrar nada si la autenticación se está cargando
  if (authLoading || isAuthenticated) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Inicia sesión
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            o{' '}
            <Link href="/registro" className="font-medium text-green-600 hover:text-green-500">
              créate una cuenta nueva
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full rounded-t-md border-gray-300 p-3"
                placeholder="Correo electrónico"
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)} // <-- Typo corregido
                className="relative block w-full rounded-b-md border-gray-300 p-3"
                placeholder="Contraseña"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-full border border-transparent bg-green-600 py-3 px-4 text-lg font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-green-400 group-hover:text-green-300" />
              </span>
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
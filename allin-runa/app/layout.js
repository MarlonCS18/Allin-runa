import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Header from './components/Header'; // Importado
import Footer from './components/Footer'; // Importado
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
// app/layout.js

import './globals.css';
import 'swiper/css'; // <-- AÑADE ESTA LÍNEA
import 'swiper/css/autoplay'; // <-- AÑADE ESTA LÍNEA
import 'swiper/css/navigation'; // <-- AÑADE ESTA LÍNEA

// ... (el resto de tu archivo layout.js)
const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'] 
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Allin Runa - Productos Orgánicos",
  description: "Conectando productores orgánicos con tu bienestar.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={poppins.className}>
        {/* 2. ENVUELVE TUS COMPONENTES CON EL PROVIDER */}
        <AuthProvider>
        <CartProvider> 
          <Header />
          <main className="pt-16"> {/* Añadimos pt-16 para compensar el header fijo */}
            {children}
          </main>
          <Footer />
        </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
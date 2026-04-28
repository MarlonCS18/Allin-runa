// app/preguntas-frecuentes/page.js
"use client"; // Necesario para 'useState' y 'framer-motion'

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

// --- Contenido de las Preguntas ---
// (Añadimos muchas preguntas como pediste, separadas por categoría)
const faqData = [
  {
    category: "Pedidos y Pagos",
    questions: [
      {
        question: "¿Qué métodos de pago aceptan?",
        answer: "Aceptamos todas las tarjetas de crédito y débito (Visa, MasterCard, Amex), así como pagos a través de Yape y Plin. Encontrarás las opciones al finalizar tu compra."
      },
      {
        question: "¿Es seguro comprar en Allin Runa?",
        answer: "Absolutamente. Nuestro sitio web utiliza un certificado SSL para encriptar toda tu información. Los pagos con tarjeta son procesados por una pasarela segura y de confianza."
      },
      {
        question: "¿Puedo solicitar una factura o boleta?",
        answer: "¡Claro! Durante el proceso de pago, podrás seleccionar si deseas boleta o factura e ingresar tus datos de facturación (RUC, Razón Social)."
      }
    ]
  },
  {
    category: "Envíos y Entregas",
    questions: [
      {
        question: "¿Cuáles son los costos de envío?",
        answer: "El costo de envío varía según tu distrito (en Lima) o provincia. Podrás ver el costo exacto en la pantalla de pago antes de confirmar tu pedido."
      },
      {
        question: "¿Cuánto tiempo tarda en llegar mi pedido?",
        answer: "Para Lima Metropolitana, tu pedido llegará en 24-48 horas hábiles. Para otras provincias, el tiempo de entrega es de 3 a 7 días hábiles."
      },
      {
        question: "¿Puedo rastrear mi pedido?",
        answer: "Sí. Una vez que tu pedido sea despachado, recibirás un correo electrónico con un código de seguimiento para que puedas ver dónde está tu paquete en tiempo real."
      },
      {
        question: "¿Qué pasa si no estoy en casa cuando llega el pedido?",
        answer: "El servicio de courier intentará realizar la entrega hasta dos veces. Si ambas fallan, el paquete será devuelto a nuestro almacén y nos pondremos en contacto contigo para coordinar un nuevo envío (podría tener un costo adicional)."
      }
    ]
  },
  {
    category: "Productos y Calidad",
    questions: [
      {
        question: "¿Sus productos son realmente orgánicos?",
        answer: "Sí. Trabajamos directamente con productores que cuentan con certificación orgánica o que siguen prácticas agroecológicas y sostenibles verificadas. La transparencia es uno de nuestros pilares."
      },
      {
        question: "¿Qué hago si un producto está 'agotado'?",
        answer: "Si un producto está agotado, puedes hacer clic en 'Notificarme cuando esté disponible' en la página del producto. Te enviaremos un correo tan pronto como tengamos stock nuevamente."
      }
    ]
  },
  {
    category: "Devoluciones y Reembolsos",
    questions: [
      {
        question: "Mi producto llegó dañado, ¿qué hago?",
        answer: "Lamentamos mucho eso. Por favor, tómale una foto al producto dañado y escríbenos a soporte@allinruna.com dentro de las 48 horas posteriores a la recepción. Nos encargaremos de solucionarlo inmediatamente."
      },
      {
        question: "¿Cuál es su política de devoluciones?",
        answer: "Aceptamos devoluciones de productos que estén completamente sellados y en su empaque original, dentro de los 3 días posteriores a la entrega. Los costos de envío de la devolución corren por cuenta del cliente, a menos que el error haya sido nuestro."
      }
    ]
  }
];

// --- Componente de Acordeón Reutilizable ---
const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Variantes para la animación de la respuesta
  const answerVariants = {
    collapsed: { opacity: 0, height: 0, marginTop: 0, marginBottom: 0 },
    open: { 
      opacity: 1, 
      height: 'auto',
      marginTop: '1rem', // 16px
      marginBottom: '1rem' // 16px
    }
  };

  return (
    <div className="border-b border-gray-200 py-4">
      {/* 1. El Botón (La Pregunta) */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }} // Anima el ícono
          transition={{ duration: 0.3 }}
        >
          <ChevronDownIcon className="w-6 h-6 text-gray-500" />
        </motion.div>
      </motion.button>
      
      {/* 2. La Respuesta (Animada) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="answer"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={answerVariants}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden" // Importante para que height: 0 funcione
          >
            <p className="text-gray-700 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


// --- Componente Principal de la Página ---
export default function PreguntasFrecuentesPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">

        {/* Encabezado */}
        <div className="mb-16 text-center">
          <span className="text-base font-semibold text-green-600">Soporte</span>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Preguntas Frecuentes
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Encuentra respuestas a tus dudas más comunes sobre nuestros productos y servicios.
          </p>
        </div>

        {/* Contenido del Acordeón */}
        <div className="space-y-12">
          {faqData.map((categoryGroup) => (
            <div key={categoryGroup.category}>
              {/* Título de la Categoría */}
              <h2 className="text-3xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-green-600">
                {categoryGroup.category}
              </h2>
              <div className="space-y-2">
                {/* Mapeo de las preguntas de esa categoría */}
                {categoryGroup.questions.map((faq) => (
                  <AccordionItem 
                    key={faq.question} 
                    question={faq.question} 
                    answer={faq.answer} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bloque de Contacto al final */}
        <div className="mt-20 text-center bg-gray-50 p-10 rounded-lg">
          <h3 className="text-2xl font-semibold text-gray-900">
            ¿No encontraste tu respuesta?
          </h3>
          <p className="mt-3 text-gray-600">
            No te preocupes. Nuestro equipo de soporte está listo para ayudarte.
          </p>
          <Link 
            href="/contacto" // (Asegúrate de tener esta página o cámbiala a la URL correcta)
            className="mt-6 inline-block px-8 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors"
          >
            Contactar a Soporte
          </Link>
        </div>

      </div>
    </div>
  );
}
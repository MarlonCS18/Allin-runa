// tailwind.config.mjs

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Aquí podrás añadir tus propios colores, fuentes, etc. en el futuro
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // <-- ¡ESTE ES EL PLUGIN QUE NECESITABAS!
  ],
};

export default config;
module.exports = {
  // ...tus otras configuraciones...
  plugins: [
    require('@tailwindcss/typography'), // <-- AÑADE ESTA LÍNEA
  ],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        // Nunito se bundlea via @fontsource (offline-first, sin CDN).
        sans: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Tokens semánticos del sistema de diseño de Salud Ya.
        // Evitamos hardcodear hex en los componentes: siempre referenciamos estos nombres.
        primary: {
          DEFAULT: '#059669', // emerald-600
          dark: '#047857', // emerald-700 (hover/active)
          light: '#ECFDF5', // emerald-50 (fondos suaves)
        },
        surface: '#F8FAFC', // slate-50 (fondo de la app)
        offline: '#F59E0B', // amber-500 (alerta de sin conexión)
        // Clasificación de triaje (protocolo por colores).
        triage: {
          red: '#DC2626', // urgente
          yellow: '#F59E0B', // programada
          green: '#10B981', // ambulatorio
        },
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(15 23 42 / 0.08), 0 1px 2px -1px rgb(15 23 42 / 0.05)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out both',
      },
    },
  },
  plugins: [],
};

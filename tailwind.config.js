/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f172a',    // Dark Navy
          light: '#1e293b',
          lighter: '#334155',
        },
        accent: {
          DEFAULT: '#059669',    // Emerald 600
          light: '#10b981',      // Emerald 500
          dark: '#047857',       // Emerald 700
        },
        gold: {
          DEFAULT: '#d4a843',
          light: '#e7c96b',
          dark: '#b08930',
        },
        surface: {
          DEFAULT: '#ffffff',
          dim: '#f8fafc',
          muted: '#f1f5f9',
          border: '#e2e8f0',
        },
        'on-surface': '#0f172a',
        'on-surface-muted': '#64748b',
      },
      borderRadius: {
        'sm': '0.25rem',
        'DEFAULT': '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.5rem',
        '2xl': '2rem',
      },
      fontFamily: {
        arabic: ['IBM Plex Sans Arabic', 'sans-serif'],
        sans: ['IBM Plex Sans Arabic', 'IBM Plex Sans', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

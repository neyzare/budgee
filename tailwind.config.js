/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: [
    "./index.html", // Incluez index.html pour le projet Vite
    "./src/**/*.{js,jsx,ts,tsx}", // Scannez tous les fichiers dans src
  ],
  theme: {
    extend: {
      backgroundColor: {
        'bleu-card': '#1D2E44',
        'bleu-card-1': "#2F4662"
      }
    },
  },
  plugins: [
    daisyui, // Utilisez daisyui directement après l'importation
  ],
}
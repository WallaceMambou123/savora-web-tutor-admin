// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Active le mode sombre basé sur la présence de la classe 'dark' sur l'élément racine
  darkMode: 'class', 
  
  theme: {
    extend: {
      // --- CONFIGURATION DE LA PALETTE DE COULEURS ---
      colors: {
        // COULEUR PRINCIPALE SAVOORA (Accent)
        'savoora-primary': '#F57638', 

        // COULEURS DE FOND et de Texte pour les modes Clair/Sombre
        'bg-light': '#FFFFFF',
        'bg-dark': '#13131D',
        
        // Texte s'adapte au fond (Pour le texte principal)
        'text-light': '#13131D', 
        'text-dark': '#F9FAFB', 
        
        // Couleurs fonctionnelles
        'savoora-success': '#10B981', 
        'savoora-danger': '#EF4444', 
        'savoora-warning': '#F59E0B', 
      },
      
      // --- LIAISON DES VARIABLES DE POLICE ---
      fontFamily: {
        // Inter : police principale (utilise la variable --font-inter)
        sans: ['var(--font-inter)', 'ui-sans-serif'],
        // Montserrat : police spéciale pour les titres (utilise la variable --font-montserrat)
        heading: ['var(--font-montserrat)', 'ui-sans-serif'],
      },
      // ----------------------------------------------------
    },
  },
  plugins: [],
};

export default config;
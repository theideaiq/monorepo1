import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#E91E63',   // Your Logo Pink
          yellow: '#FFD600', // Your Logo Yellow
          dark: '#0F172A',   // Professional Dark Blue/Black
        }
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'], 
      },
    },
  },
  plugins: [],
};
export default config;

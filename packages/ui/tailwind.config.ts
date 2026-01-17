import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#e91e63',
          yellow: '#ffd600',
          dark: '#0f172a',
          deep: '#0f1014',
        },
      },
    },
  },
  plugins: [],
};

export default config;

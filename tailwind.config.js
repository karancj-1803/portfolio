/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: '#090909',
          900: '#0C0B0A',
          850: '#11100E',
          800: '#171512',
          700: '#1F1B17',
          600: '#2A2520',
          500: '#3A332C',
        },
        ivory: {
          50: '#F7F4ED',
          100: '#F2EFE8',
          200: '#E8E3D8',
          300: '#D6D0C2',
        },
        ash: {
          400: '#B8B3A8',
          500: '#9B978E',
          600: '#7A766C',
          700: '#5C5950',
        },
        amber: {
          glow: '#FBBF24',
          DEFAULT: '#F59E0B',
          deep: '#EA580C',
          ember: '#B45309',
        },
      },
      fontFamily: {
        display: ['"Clash Display"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.03em',
      },
    },
  },
  plugins: [],
};

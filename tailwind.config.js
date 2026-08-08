/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: {
          950: '#020817',
          900: '#030B18',
          800: '#061426',
          700: '#0A1D33',
          600: '#0F2A47',
        },
        signal: {
          400: '#67E8F9',
          500: '#38BDF8',
          600: '#2563EB',
        },
        frost: '#DDF7FF',
        mist: '#7C93AD',
      },
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        body: ['"Manrope"', 'sans-serif'],
      },
      backgroundImage: {
        'grid-fine':
          'linear-gradient(rgba(103,232,249,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(103,232,249,0.06) 1px, transparent 1px)',
      },
      boxShadow: {
        glow: '0 0 24px rgba(56,189,248,0.35)',
        'glow-sm': '0 0 12px rgba(56,189,248,0.25)',
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.6)', opacity: '0.4' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        pulseDot: 'pulseDot 1.8s ease-in-out infinite',
        floatY: 'floatY 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

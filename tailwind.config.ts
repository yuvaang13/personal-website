import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Styrene A', 'Styrene A Web', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Styrene A', 'Styrene A Web', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 900ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'soft-pulse': 'softPulse 5s ease-in-out infinite',
        'fade-in': 'fadeIn 600ms ease-out both',
        'slide-up': 'slideUp 800ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'scale-in': 'scaleIn 500ms cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        softPulse: {
          '0%, 100%': { opacity: '0.48' },
          '50%': { opacity: '0.82' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
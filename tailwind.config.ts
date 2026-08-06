import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mistral: {
          bg: '#fbfbf8',
          bgElevated: '#f5f5f0',
          text: '#000000',
          textSecondary: '#3a3a3a',
          textMuted: '#737373',
          border: '#e4e3de',
          borderHover: '#d4d3ce',
          accent: '#000000',
          accentDim: 'rgba(0, 0, 0, 0.06)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        serif: ['ALTMistral', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        display: ['ALTMistral', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
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
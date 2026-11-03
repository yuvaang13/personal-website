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
          bg: '#0a0a0a',
          bgElevated: '#131316',
          text: '#f5f5f4',
          textSecondary: '#a8a8a8',
          textMuted: '#717171',
          border: '#232323',
          borderHover: '#3a3a3a',
          accent: '#ffffff',
          accentDim: 'rgba(255, 255, 255, 0.06)',
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
        'fade-in': 'fadeIn 600ms ease-out both',
        'slide-up': 'slideUp 800ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'scale-in': 'scaleIn 500ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'scale-fade': 'scaleFade 700ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'line-reveal': 'lineReveal 700ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'float': 'float 6s ease-in-out infinite',
        'soft-pulse': 'softPulse 5s ease-in-out infinite',
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
        scaleFade: {
          '0%': { opacity: '0', transform: 'scale(0.92) translateY(20px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        lineReveal: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#f4efe3',
          2: '#ece5d5',
          3: '#e3dbc8',
        },
        ink: {
          DEFAULT: '#17150f',
          2: '#4a453a',
        },
        muted: '#6a6253',
        rule: {
          DEFAULT: '#d5ccb8',
          strong: '#b8ad97',
        },
        cobalt: {
          DEFAULT: '#1f3be0',
          deep: '#152aa8',
        },
        vermilion: '#e4451f',
        night: {
          DEFAULT: '#14120d',
          2: '#1d1a13',
        },
        nighttext: '#f4efe3',
        nightmuted: '#a89f8c',
        // Kept as aliases so any legacy component still resolves if imported.
        mistral: {
          bg: '#f4efe3',
          bgElevated: '#ece5d5',
          text: '#17150f',
          textSecondary: '#4a453a',
          textMuted: '#7a7263',
          border: '#d5ccb8',
          borderHover: '#b8ad97',
          accent: '#17150f',
          accentDim: 'rgba(23, 21, 15, 0.06)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        display: ['Instrument Serif', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        serif: ['Instrument Serif', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      maxWidth: {
        wrap: '1440px',
      },
    },
  },
  plugins: [],
};

export default config;

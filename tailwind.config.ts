import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Geist", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: [
          "Styrene A",
          "Styrene A Web",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        serif: [
          "Styrene A",
          "Styrene A Web",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      animation: {
        "fade-up": "fadeUp 900ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "soft-pulse": "softPulse 5s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        softPulse: {
          "0%, 100%": { opacity: "0.48" },
          "50%": { opacity: "0.82" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

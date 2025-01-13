import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        japanese: ["var(--font-japanese)", "sans-serif"],
      },
      keyframes: {
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '0.8' },
          '100%': { transform: 'scale(2)', opacity: '0' }
        }
      },
      animation: {
        'ripple': 'ripple 2s linear infinite',
        'ripple-fast': 'ripple 2s linear infinite',
        'ripple-medium': 'ripple 2s linear infinite 0.5s',
        'ripple-slow': 'ripple 2s linear infinite 1s'
      }
    },
  },
  plugins: [],
};

export default config;

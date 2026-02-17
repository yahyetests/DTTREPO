import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./index.tsx",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F172A", // Deep Navy (Brand)
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#D97706", // Amber/Gold (Action)
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#0EA5E9", // Sky Blue (Highlight)
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F1F5F9",
          foreground: "#64748B",
        },
        background: "#FFFFFF",
        foreground: "#0F172A",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        heading: ["Montserrat", "sans-serif"],
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 20px -5px rgba(217, 119, 6, 0.3)',
      }
    },
  },
  plugins: [],
};
export default config;
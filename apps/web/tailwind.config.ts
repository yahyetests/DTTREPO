import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
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
                    DEFAULT: "#0F172A", // Deep Navy
                    foreground: "#FFFFFF",
                },
                secondary: {
                    DEFAULT: "#10B981", // Emerald Green
                    foreground: "#FFFFFF",
                },
                accent: {
                    DEFAULT: "#F97316", // Orange
                    foreground: "#FFFFFF",
                },
                muted: {
                    DEFAULT: "#F1F5F9",
                    foreground: "#64748B",
                },
                background: "var(--background)",
                foreground: "var(--foreground)",
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
                'card': '0 2px 12px -2px rgba(0, 0, 0, 0.08)',
                'card-hover': '0 8px 30px -4px rgba(0, 0, 0, 0.12)',
            },
        },
    },
    plugins: [],
};
export default config;
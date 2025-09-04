import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem", 
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem"
      },
      screens: {
        "2xl": "1280px"
      }
    },
    extend: {
      colors: {
        canvas: "#ffffff",
        accent: "#10b981", // emerald-500 for consistency
        emerald: {
          50: "#ecfdf5",
          100: "#d1fae5", 
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b"
        },
        slate: {
          950: "#0b0f14"
        }
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem", 
        "3xl": "1.5rem"
      },
      boxShadow: {
        hair: "0 1px 0 0 rgba(0,0,0,0.06)",
        soft: "0 2px 8px rgba(0,0,0,0.06)",
        md: "0 4px 12px rgba(0,0,0,0.08)"
      },
      transitionDuration: {
        150: "150ms",
        200: "200ms"
      },
      spacing: {
        18: "4.5rem",
        88: "22rem"
      }
    }
  },
  plugins: []
} satisfies Config;


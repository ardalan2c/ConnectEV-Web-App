import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#ffffff",
        accent: "#00E58C",
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
        soft: "0 2px 8px rgba(0,0,0,0.06)"
      },
      transitionDuration: {
        150: "150ms",
        200: "200ms"
      }
    }
  },
  plugins: []
} satisfies Config;


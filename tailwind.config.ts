import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        glow: ["0 0px 20px rgba(255,255, 255, 0.35)"],
      },
    },
  },
  plugins: [],
} satisfies Config;

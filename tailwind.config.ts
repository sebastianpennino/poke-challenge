import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate"

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        glow: ["0 0px 20px rgba(255,255, 255, 0.35)"],
      },
    },
  },
  plugins: [
    animate
  ],
} satisfies Config;

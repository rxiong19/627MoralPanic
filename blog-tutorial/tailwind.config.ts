import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customGreen: "#33cc33",
        lightGreen: "#ccff99"
      }
    },
  },
  plugins: [],
} satisfies Config;

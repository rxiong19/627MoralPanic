import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customGreen: "#33cc33",
        lightGreen: "#ccff99",
        customRed: "#d27351",
        hoverRed: "#a24a2a",
        lightRed: "##e09d85",
      }
    },
  },
  plugins: [],
} satisfies Config;

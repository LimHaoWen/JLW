import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      'md': '770px',
      'lg': '1440px',
      'xl': '1700px',
    },
    colors: {
      "white": "#ffffff",
      "black": "#000000",
      "gray": "#c8c8c8",
      "lightgray": "#f0f0f0",
      "vermillion": "#ff5032",
      "darkverm": "#dc321e",
      "lightverm": "#fff5eb",
      "red": "#ff3333"
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3490dc",
          foreground: "#ffffff",
          dark: "#2779bd",
          "dark-foreground": "#ffffff",
        },
        secondary: {
          DEFAULT: "#ffed4a",
          foreground: "#333333",
          dark: "#d5b60a",
          "dark-foreground": "#333333",
        },
        destructive: {
          DEFAULT: "#e3342f",
          foreground: "#ffffff",
          dark: "#cc1f1a",
          "dark-foreground": "#ffffff",
        },
      },
    },
  },
  plugins: [],
};
export default config;

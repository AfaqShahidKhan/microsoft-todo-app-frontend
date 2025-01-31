/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: " #212529",
        foreground: "#ffffff",
        primary: "#0062CC",
        secondary: "#5E5E5E",
        accent: "#FFD700",
        muted: "#F5F5F5",
        success: "#28A745",
        danger: "#DC3545",
        grays:"#777777",
        extragray:"#555555",
        info: "#17A2B8",
        warning: "#FFC107",
        dark: "#212529",
        charcoal: "#262626",
      },
      fontFamily: {
        sans: ["Segoe UI", "Roboto", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

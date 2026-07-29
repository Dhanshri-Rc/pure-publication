/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#eef8f8",
          100: "#d7eeee",
          200: "#aad8d9",
          300: "#7cc2c3",
          400: "#4faaac",
          500: "#2c8e90",
          600: "#1b6d6e",
          700: "#0A5557",
          800: "#063F40",
          900: "#082627",
          950: "#051a1a",
        },
        amber: {
          50: "#fffaec",
          100: "#fff1c9",
          200: "#ffe28d",
          300: "#ffd458",
          400: "#ffc726",
          500: "#D4AF37",
          600: "#B8860B",
          700: "#97730c",
          800: "#775c0d",
          900: "#5e490d",
        },
        ink: "#051a1a",
        surface: "#F8F8F6",
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 30px -10px rgba(6, 63, 64, 0.15)",
        "card-hover": "0 20px 40px -15px rgba(6, 63, 64, 0.25)",
        glow: "0 0 0 4px rgba(212, 175, 55, 0.15)",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #082627 0%, #0A5557 45%, #1b6d6e 100%)",
        "cta-gradient": "linear-gradient(120deg, #D4AF37 0%, #ffd458 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        "fade-in": "fadeIn 0.6s ease forwards",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(30px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

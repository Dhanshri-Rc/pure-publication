/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#eef1f8",
          100: "#d7ddee",
          200: "#aab6d9",
          300: "#7c8fc3",
          400: "#4f68ac",
          500: "#2c4290",
          600: "#1b2c6e",
          700: "#141f52",
          800: "#0d1638",
          900: "#080f26",
          950: "#050a1a",
        },
        amber: {
          50: "#fff8ec",
          100: "#ffedc9",
          200: "#ffd98d",
          300: "#ffc158",
          400: "#ffa826",
          500: "#f7941e",
          600: "#e07a0c",
          700: "#b85f0a",
          800: "#93490d",
          900: "#773c0f",
        },
        ink: "#0a0e27",
        surface: "#f7f8fc",
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 30px -10px rgba(13, 22, 56, 0.15)",
        "card-hover": "0 20px 40px -15px rgba(13, 22, 56, 0.25)",
        glow: "0 0 0 4px rgba(247, 148, 30, 0.15)",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #080f26 0%, #141f52 45%, #1b2c6e 100%)",
        "cta-gradient": "linear-gradient(120deg, #f7941e 0%, #ffc158 100%)",
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

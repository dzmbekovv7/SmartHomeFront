import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "retro",

      "valentine",

      "garden",
  
      "pastel",
      "fantasy",
      "wireframe",
      "cmyk",
      "autumn",

      "acid",
      "lemonade",
      "winter",
            "nord",

    ],
  },
};

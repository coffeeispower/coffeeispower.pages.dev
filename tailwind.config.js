import ctp from "@catppuccin/tailwindcss"
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [ctp({
    prefix: "ctp",
    defaultFlavour: "mocha"
  })],
}


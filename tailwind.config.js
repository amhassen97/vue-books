/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import plugin from "@tailwindcss/typography";

export default {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui, plugin],
}


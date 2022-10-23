/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      minHeight: {
        "q": '25vh',
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        board: 'repeat(50, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
}

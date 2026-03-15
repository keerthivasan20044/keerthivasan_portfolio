/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: { bg: '#060612', cyan: '#00f5ff', purple: '#9d4edd', pink: '#ff006e' },
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
        fira: ['"Fira Code"', 'monospace'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'Arial', 'sans-serif'],
        'serif': ['Georgia', 'serif'],
        'mono': ['Menlo', 'Monaco', 'monospace'],
        'mon':['Montserrat', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


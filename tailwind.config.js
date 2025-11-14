/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './{App,index}.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './constants/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

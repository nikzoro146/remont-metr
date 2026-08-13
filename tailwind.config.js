/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F4F4F2',
        secondary: '#141414',
        accent: '#FF5A2A',
        light: '#E8E8E6',
        success: '#22C55E',
      },
      fontFamily: {
        heading: ['Unbounded', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        'theme-green':'#99fe00',
      },
      fontFamily:{
        "roboto-regular":['Roboto-Regular', 'sans-serif'],
        "roboto-bold":['Roboto-Bold', 'sans-serif'],
        "roboto-black":['Roboto-black', 'sans-serif'],
        "roboto-medium":['Roboto-Medium', 'sans-serif'],
      }
    },
  },
  plugins: [],
};

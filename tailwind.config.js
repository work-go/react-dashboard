/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		colors: {
  			'theme-green': '#99fe00'
  		},
  		fontFamily: {
  			'roboto-regular': ['Roboto-Regular', 'sans-serif'],
  			'roboto-bold': ['Roboto-Bold', 'sans-serif'],
  			'roboto-black': ['Roboto-black', 'sans-serif'],
  			'roboto-medium': ['Roboto-Medium', 'sans-serif']
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Adjust this path to match your project structure
    './public/index.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}

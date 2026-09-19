/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette
        cream:      '#FDFBF7',
        olive:      '#4A6B5D',
        'olive-dark':'#3a5549',
        'olive-light':'#6a8f7e',
        terra:      '#D97757',
        'terra-dark':'#b85e3d',
        'terra-light':'#e8997d',
        // Neutral
        sand:       '#F5F0E8',
        'warm-gray':'#8C7B6B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      minHeight: {
        touch: '48px',
      },
      minWidth: {
        touch: '48px',
      },
    },
  },
  plugins: [],
};

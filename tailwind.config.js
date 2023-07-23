/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/functions/**/*.{js,ts,jsx,tsx}',
    './public/icons/*.{js,ts,jsx,tsx}'
  ],
  safelist: [
    {
      pattern: /^bg-(blue|yellow|gray|red)-(300|500)/,
    },
    {
      pattern: /^border-(blue|yellow|gray|red)-(300|500)/,
    },
    'hover:bg-blue-600',
    'hover:bg-gray-600',
    'hover:bg-yellow-600',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
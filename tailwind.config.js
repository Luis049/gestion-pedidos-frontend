/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  safelist: [
    {
      pattern: /(operator|machine)-(bg|text)+/,
    },
    {
      pattern: /status-(bg|text)-.+/,
    },
    {
      pattern: /bg-type-bg-(primary|secondary|danger|success)/,
    },
    {
      pattern: /text-type-text-(primary|secondary|danger|success)/,
    },
    {
      pattern: /outline-type-bg-(primary|secondary|danger|success)/,
    },
    {
      pattern: /text-.+/,
    },
    {
      pattern: /(bg|text)-\[\#?[^\]]+\]/,
    },
  ],
  theme: {
    fontFamily: {
      'Nunito': ['Nunito Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        'fondo': 'var(--color-fondo)',
        'primary': 'var(--color-primary)',
        type: {
          bg: {
            primary: '#9333EA',
            secondary: '#b6b6b6',
            danger: '#fee2e2',
            success: '#9333EA',
          },
          text: {
            primary: '#FFFFFF',
            secondary: '#696969',
            danger: '#FFFFFF',
            success: '#FFFFFF',
          }
        },
        status: {
          bg: {
            received: '#ffedd5',
            printing: '#dbeafe',
            finished: '#f3e8ff',
            delivered: '#dcfce7',
            archived: '#f3f4f6',
            impeded: '#fee2e2',
          },
          text: {
            received: '#9a3412',
            printing: '#1e40af',
            finished: '#6b21a8',
            delivered: '#166534',
            archived: '#1f2937',
            impeded: '#991b1b',
          },
        },
        operator: {
          bg: '#fce7f3',
          text: '#9d174d',
        },
        machine: {
          bg: '#e0e7ff',
          text: '#3730a3',
        },
      },
    },
  },
  plugins: [],
}

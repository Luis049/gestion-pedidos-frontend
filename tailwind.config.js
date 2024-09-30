/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    // "./src/**/*.{bg-*,text-*}",
  ],
  safelist: [
    {
      pattern: /(bg|text)-status-(bg|text)-.+/,
    },
    {
      pattern: /(operator|machine)-(bg|text)+/,
    },
    {
      pattern: /text-.+/,
    },
    {
      pattern: /(bg|text)-\[\#?[^\]]+\]/,
    },
  ],
  theme: {
    extend: {
      colors: {
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

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            blockquote: {
              quotes: 'none',
              '& > p': {
                marginTop: '0.4em',
                marginBottom: '0.4em',
              },
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

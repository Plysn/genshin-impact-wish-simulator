import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'genshin-icon': ['GenshinIcon'],
      },
    },
  },
  plugins: [],
};

export default config;

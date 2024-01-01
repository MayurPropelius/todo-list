import type {Config} from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#0C79FA',
        secondary: '#6C757D',
        success: '#4FA845',
        danger: '#DD4145',
        warning: '#FEC135',
        info: '#33A2B8',
        lightGray: '#D3D3D3',
        black: '#000000',
        boneWhite: '#F9F6EE'
      },
      backgroundColor: {
        cardBg: 'linear-gradient(to bottom, transparent, rgb(255, 255, 255)) rgb(214, 219, 220))'
      }
    },
  },
  plugins: [],
}
export default config

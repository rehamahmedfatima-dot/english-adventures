/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'ea-dark': '#0a0a14',
        'ea-card': '#12121f',
        'ea-card-hover': '#1c1c30',
        'ea-orange': '#ff7b35',
        'ea-gold': '#ffc947',
        'ea-green': '#4ade80',
        'ea-red': '#f87171',
        'ea-blue': '#60a5fa',
        'ea-purple': '#c084fc',
        'ea-cyan': '#22d3ee',
        'ea-pink': '#f472b6',
        'ea-text': '#f0f0f5',
        'ea-text-secondary': '#8b8ba3',
        'ea-border': '#1e1e35',
      },
      fontFamily: {
        'arabic': ['Noto Sans Arabic', 'Poppins', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s infinite',
        'scan-line': 'scan-line 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(255,123,53,0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(255,123,53,0.6)' },
        },
        'scan-line': {
          '0%': { top: '0', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { top: '100%', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
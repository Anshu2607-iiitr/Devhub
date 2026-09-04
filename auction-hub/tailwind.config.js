/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        auction: {
          bg: '#090D16',
          card: '#111726',
          cardHover: '#172033',
          border: '#1E293B',
          borderHighlight: '#334155',
          gold: '#F59E0B',
          goldLight: '#FBBF24',
          goldGlow: '#FDE68A',
          cyan: '#06B6D4',
          cyanGlow: '#22D3EE',
          green: '#10B981',
          greenGlow: '#34D399',
          red: '#EF4444',
          redGlow: '#F87171',
          purple: '#8B5CF6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Teko', 'Rajdhani', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-gold': '0 0 25px -5px rgba(245, 158, 11, 0.35)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.35)',
        'glow-green': '0 0 25px -5px rgba(16, 185, 129, 0.35)',
        'glow-red': '0 0 25px -5px rgba(239, 68, 68, 0.45)',
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bid-flash': 'bidFlash 0.6s ease-out forwards',
        'gavel-slam': 'gavelSlam 0.5s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        bidFlash: {
          '0%': { transform: 'scale(1.08)', filter: 'brightness(1.5)' },
          '100%': { transform: 'scale(1)', filter: 'brightness(1)' },
        },
        gavelSlam: {
          '0%': { transform: 'rotate(-45deg) scale(1.3)', opacity: '0' },
          '70%': { transform: 'rotate(0deg) scale(0.95)', opacity: '1' },
          '100%': { transform: 'rotate(0deg) scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}

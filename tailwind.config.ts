
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				genexel: {
					50: '#f0f8ff',
					100: '#e0f1fe',
					200: '#c0e4fd',
					300: '#91d1fb',
					400: '#5ab3f6',
					500: '#3294f0',
					600: '#1c75e3',
					700: '#185fcf',
					800: '#194ea8',
					900: '#1b4485',
					950: '#142a55',
				},
				analytics: {
					50: '#f4f7fa',
					100: '#e5edf7',
					200: '#d5e3f5',
					300: '#b0caea',
					400: '#84a9db',
					500: '#6489cc',
					600: '#4f6dbc',
					700: '#435aaa',
					800: '#394b8c',
					900: '#32416f',
					950: '#21294a',
				},
				dark: {
					100: '#2e2e3a',
					200: '#25252e',
					300: '#1e1e24',
					400: '#17171c',
					500: '#131316',
					600: '#0e0e10',
					700: '#0a0a0c',
					800: '#050508',
					900: '#010102',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'fade-up': {
					from: { opacity: '0', transform: 'translateY(20px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in': {
					from: { transform: 'translateX(-20px)', opacity: '0' },
					to: { transform: 'translateX(0)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-up': 'fade-up 0.5s ease-out',
				'slide-in': 'slide-in 0.5s ease-out'
			},
			boxShadow: {
				'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
			},
			backdropBlur: {
				'glass': '20px'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

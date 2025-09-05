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
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
				},
				// Neo Cyberpunk Colors
				cursed: {
					green: "hsl(var(--cursed-green))",
					purple: "hsl(var(--cursed-purple))",
					cyan: "hsl(var(--cursed-cyan))",
					pink: "hsl(var(--cursed-pink))",
					blue: "hsl(var(--cursed-blue))",
					orange: "hsl(var(--cursed-orange))",
					dark: "hsl(var(--cursed-dark))",
					darker: "hsl(var(--cursed-darker))",
					gray: "hsl(var(--cursed-gray))",
				},
			},
			backgroundImage: {
				"cursed-gradient": "var(--gradient-cursed)",
				"dark-gradient": "var(--gradient-dark)",
				"neon-gradient": "var(--gradient-neon)",
				"warm-gradient": "var(--gradient-warm)",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				glow: {
					"0%, 100%": { boxShadow: "0 0 10px rgba(239,68,68,0.4)" },
					"50%": { boxShadow: "0 0 20px rgba(239,68,68,0.8)" },
				},
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
				"fade-in": {
					"0%": {
						opacity: "0",
						transform: "translateY(10px)",
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)",
					},
				},
				"fade-in-up": {
					"0%": {
						opacity: "0",
						transform: "translateY(30px)",
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)",
					},
				},
				"slide-in-left": {
					"0%": {
						opacity: "0",
						transform: "translateX(-30px)",
					},
					"100%": {
						opacity: "1",
						transform: "translateX(0)",
					},
				},
				"slide-in-right": {
					"0%": {
						opacity: "0",
						transform: "translateX(30px)",
					},
					"100%": {
						opacity: "1",
						transform: "translateX(0)",
					},
				},
				"scale-in": {
					"0%": {
						opacity: "0",
						transform: "scale(0.8)",
					},
					"100%": {
						opacity: "1",
						transform: "scale(1)",
					},
				},
				glitch: {
					"0%": {
						textShadow:
							"0.05em 0 0 hsl(var(--glitch-red)), -0.05em -0.025em 0 hsl(var(--glitch-blue)), 0.025em 0.05em 0 hsl(var(--cursed-green))",
					},
					"15%": {
						textShadow:
							"0.05em 0 0 hsl(var(--glitch-red)), -0.05em -0.025em 0 hsl(var(--glitch-blue)), 0.025em 0.05em 0 hsl(var(--cursed-green))",
					},
					"16%": {
						textShadow:
							"-0.05em -0.025em 0 hsl(var(--glitch-red)), 0.025em 0.025em 0 hsl(var(--glitch-blue)), -0.05em -0.05em 0 hsl(var(--cursed-green))",
					},
					"49%": {
						textShadow:
							"-0.05em -0.025em 0 hsl(var(--glitch-red)), 0.025em 0.025em 0 hsl(var(--glitch-blue)), -0.05em -0.05em 0 hsl(var(--cursed-green))",
					},
					"50%": {
						textShadow:
							"0.025em 0.05em 0 hsl(var(--glitch-red)), 0.05em 0 0 hsl(var(--glitch-blue)), 0 -0.05em 0 hsl(var(--cursed-green))",
					},
					"99%": {
						textShadow:
							"0.025em 0.05em 0 hsl(var(--glitch-red)), 0.05em 0 0 hsl(var(--glitch-blue)), 0 -0.05em 0 hsl(var(--cursed-green))",
					},
					"100%": {
						textShadow:
							"-0.025em 0 0 hsl(var(--glitch-red)), -0.025em -0.025em 0 hsl(var(--glitch-blue)), -0.025em -0.05em 0 hsl(var(--cursed-green))",
					},
				},
				float: {
					"0%, 100%": { transform: "translateY(0px)" },
					"50%": { transform: "translateY(-10px)" },
				},
				"neon-glow": {
					"0%, 100%": {
						textShadow:
							"0 0 5px hsl(var(--cursed-green)), 0 0 10px hsl(var(--cursed-green)), 0 0 15px hsl(var(--cursed-green)), 0 0 20px hsl(var(--cursed-green))",
					},
					"50%": {
						textShadow:
							"0 0 2px hsl(var(--cursed-green)), 0 0 5px hsl(var(--cursed-green)), 0 0 8px hsl(var(--cursed-green)), 0 0 12px hsl(var(--cursed-green))",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.6s ease-out",
				"fade-in-up": "fade-in-up 0.6s ease-out",
				"slide-in-left": "slide-in-left 0.6s ease-out",
				"slide-in-right": "slide-in-right 0.6s ease-out",
				"scale-in": "scale-in 0.5s ease-out",
				glitch: "glitch 0.3s infinite linear alternate-reverse",
				float: "float 3s ease-in-out infinite",
				"neon-glow": "neon-glow 2s ease-in-out infinite alternate",
				glow: 'glow 2s infinite ease-in-out',
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        accent: "var(--color-accent)",
        "accent-warm": "var(--color-accent-warm)",
        text: "var(--color-text)",
        muted: "var(--color-muted)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", '"Helvetica Neue"', "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      spacing: {
        "section-pad-y": "var(--section-pad-y)",
      },
      maxWidth: {
        container: "var(--container-width)",
      },
      transitionTimingFunction: {
        "out-expo": "var(--ease-out-expo)",
        "in-out-quart": "var(--ease-in-out-quart)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "glitch-flicker": {
          "0%": { clipPath: "inset(0 0 100% 0)" },
          "5%": { clipPath: "inset(20% 0 60% 0)" },
          "10%": { clipPath: "inset(0 0 100% 0)" },
          "15%": { clipPath: "inset(80% 0 0 0)" },
          "20%": { clipPath: "inset(0 0 100% 0)" },
          "100%": { clipPath: "inset(0 0 0 0)" },
        },
        "border-glow": {
          "0%, 100%": { boxShadow: "0 0 8px rgba(200, 255, 0, 0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(200, 255, 0, 0.6)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "glitch-flicker": "glitch-flicker 0.4s ease-out forwards",
        "border-glow": "border-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}

export default config

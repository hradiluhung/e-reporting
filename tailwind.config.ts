import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundSize: {
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        "primary-100": "var(--primary-100)",
        "primary-50": "var(--primary-50)",
        "primary-10": "var(--primary-10)",
        "secondary-100": "var(--secondary-100)",
        "secondary-50": "var(--secondary-50)",
        "secondary-10": "var(--secondary-10)",
        "neutral-100": "var(--neutral-100)",
        "neutral-50": "var(--neutral-50)",
        "neutral-10": "var(--neutral-10)",
        "neutral-5": "var(--neutral-5)",
        "neutral-0": "var(--neutral-0)",
      },
      textColor: {
        "primary-100": "var(--primary-100)",
        "primary-50": "var(--primary-50)",
        "primary-10": "var(--primary-10)",
        "secondary-100": "var(--secondary-100)",
        "secondary-50": "var(--secondary-50)",
        "secondary-10": "var(--secondary-10)",
        "neutral-100": "var(--neutral-100)",
        "neutral-50": "var(--neutral-50)",
        "neutral-10": "var(--neutral-10)",
        "neutral-5": "var(--neutral-5)",
        "neutral-0": "var(--neutral-0)",
      },
      borderColor: {
        "primary-100": "var(--primary-100)",
        "primary-50": "var(--primary-50)",
        "primary-10": "var(--primary-10)",
        "secondary-100": "var(--secondary-100)",
        "secondary-50": "var(--secondary-50)",
        "secondary-10": "var(--secondary-10)",
        "neutral-100": "var(--neutral-100)",
        "neutral-50": "var(--neutral-50)",
        "neutral-10": "var(--neutral-10)",
        "neutral-5": "var(--neutral-5)",
        "neutral-0": "var(--neutral-0)",
      },
      colors: {
        "primary-100": "var(--primary-100)",
        "primary-50": "var(--primary-50)",
        "primary-10": "var(--primary-10)",
        "secondary-100": "var(--secondary-100)",
        "secondary-50": "var(--secondary-50)",
        "secondary-10": "var(--secondary-10)",
        "neutral-100": "var(--neutral-100)",
        "neutral-50": "var(--neutral-50)",
        "neutral-10": "var(--neutral-10)",
        "neutral-5": "var(--neutral-5)",
        "neutral-0": "var(--neutral-0)",
      },
    },
  },
  plugins: [],
}
export default config

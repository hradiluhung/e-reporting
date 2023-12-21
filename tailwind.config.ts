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
        "gradient-primary":
          "radial-gradient(328px at 2.9% 15%, rgb(191, 224, 251) 0%, rgb(232, 233, 251) 25.8%, rgb(252, 239, 250) 50.8%, rgb(234, 251, 251) 77.6%, rgb(240, 251, 244) 100.7%)",
      },
      backgroundColor: {
        "primary-100": "rgba(var(--primary-100), var(--tw-bg-opacity))",
        "primary-50": "rgba(var(--primary-50), var(--tw-bg-opacity))",
        "primary-10": "rgba(var(--primary-10), var(--tw-bg-opacity))",
        "primary-5": "rgba(var(--primary-5), var(--tw-bg-opacity))",
        "secondary-100": "rgba(var(--secondary-100), var(--tw-bg-opacity))",
        "secondary-50": "rgba(var(--secondary-50), var(--tw-bg-opacity))",
        "secondary-10": "rgba(var(--secondary-10), var(--tw-bg-opacity))",
        "neutral-100": "rgba(var(--neutral-100), 1)",
        "neutral-50": "rgba(var(--neutral-50), 1)",
        "neutral-10": "rgba(var(--neutral-10), 1)",
        "neutral-5": "rgba(var(--neutral-5), 1)",
        "neutral-0": "rgba(var(--neutral-0), 1)",
      },
      textColor: {
        "primary-100": "rgba(var(--primary-100), 1)",
        "primary-50": "rgba(var(--primary-50), 1)",
        "primary-10": "rgba(var(--primary-10), 1)",
        "primary-5": "rgba(var(--primary-5), 1)",
        "secondary-100": "rgba(var(--secondary-100), 1)",
        "secondary-50": "rgba(var(--secondary-50), 1)",
        "secondary-10": "rgba(var(--secondary-10), 1)",
        "neutral-100": "rgba(var(--neutral-100), 1)",
        "neutral-50": "rgba(var(--neutral-50), 1)",
        "neutral-10": "rgba(var(--neutral-10), 1)",
        "neutral-5": "rgba(var(--neutral-5), 1)",
        "neutral-0": "rgba(var(--neutral-0), 1)",
      },
      borderColor: {
        "primary-100": "rgba(var(--primary-100), 1)",
        "primary-50": "rgba(var(--primary-50), 1)",
        "primary-10": "rgba(var(--primary-10), 1)",
        "primary-5": "rgba(var(--primary-5), 1)",
        "secondary-100": "rgba(var(--secondary-100), 1)",
        "secondary-50": "rgba(var(--secondary-50), 1)",
        "secondary-10": "rgba(var(--secondary-10), 1)",
        "neutral-100": "rgba(var(--neutral-100), 1)",
        "neutral-50": "rgba(var(--neutral-50), 1)",
        "neutral-10": "rgba(var(--neutral-10), 1)",
        "neutral-5": "rgba(var(--neutral-5), 1)",
        "neutral-0": "rgba(var(--neutral-0), 1)",
      },
      colors: {
        "primary-100": "rgba(var(--primary-100), 1)",
        "primary-50": "rgba(var(--primary-50), 1)",
        "primary-10": "rgba(var(--primary-10), 1)",
        "primary-5": "rgba(var(--primary-5), 1)",
        "secondary-100": "rgba(var(--secondary-100), 1)",
        "secondary-50": "rgba(var(--secondary-50), 1)",
        "secondary-10": "rgba(var(--secondary-10), 1)",
        "neutral-100": "rgba(var(--neutral-100), 1)",
        "neutral-50": "rgba(var(--neutral-50), 1)",
        "neutral-10": "rgba(var(--neutral-10), 1)",
        "neutral-5": "rgba(var(--neutral-5), 1)",
        "neutral-0": "rgba(var(--neutral-0), 1)",
      },
    },
  },
  plugins: [],
}
export default config

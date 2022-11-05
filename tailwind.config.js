const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: "#067dff",
					'50': '#edf9ff',
					'100': '#d6efff',
					'200': '#b5e5ff',
					'300': '#83d7ff',
					'400': '#48beff',
					'500': '#1e9dff',
					'600': '#067dff',
					'700': '#0069ff',
					'800': '#0850c5',
					'900': '#0d479b',
				},
			},
		},
	},
	plugins: [
		plugin(function ({ addUtilities }) {
			const utilities = {
				".shadow-primary": {
					boxShadow: "0 0 30px 10px rgba(6,125,255,.1)",
				},
			};
			addUtilities(utilities);
		}),
	],
};

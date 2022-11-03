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
				".navbar-content": {
					padding: "6px 20px",
					display: "flex",
					"flex-direction": "column",
					"align-items": "center",
					"justify-content": "center",
					"flex-grow": "1",
					color: "#5F6368",
				},
				".navbar-content:hover:not(.navbar-active)": {
					"border-radius": "10px",
					padding: "6px 20px",
					"background-color": "#F5F5F5",
					color: "#01875f",
				},
				".navbar-icon": {
					"font-size": "30px",
				},
				".navbar-active": {
					"border-radius": "10px",
					padding: "6px 20px",
					"background-color": "#E6F3EF",
					color: "#01875f",
				},
			};
			addUtilities(utilities);
		}),
	],
};

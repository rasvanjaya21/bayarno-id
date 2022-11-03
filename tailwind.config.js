const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
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

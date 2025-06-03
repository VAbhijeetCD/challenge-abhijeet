import defaultTheme from 'tailwindcss/defaultTheme';

module.exports = {
	darkMode: 'class',
	content: [
		'./layouts/**/*.{html,js,ts,tsx,jsx}',
		'./pages/**/*.{html,js,ts,tsx,jsx}',
		'./components/**/*.{html,js,ts,tsx,jsx}',
		'./src/**/*.{html,js}',
		'../../node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
		'./node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
		'./stories/**/*.{js,ts,jsx,tsx}', // Here!
	],
	theme: {
		fontFamily: {
			sans: ['"Nunito"'],
		},
		screens: {
			mini: '375px', // iPhone 13 mini
			pro: '390px', // iPhone 13 & 13 Pro
			proMax: '428px', // iPhone 13 Pro Max
			custom500: '500px',
			custom600: '600px', // custom
			ipadPro: '768px', // iPad Pro
			hd: '1000px', // HD
			superHD: '1200px', // Super HD
			...defaultTheme.screens,
		},
		extend: {
			colors: {
				// -------------------------------------------
				// NEW COLOR SCHEMA - DO NOT USE OTHER COLORS
				// c in ending for color (not shadow tailwind naming)
				// -------------------------------------------
				primaryc: {
					DEFAULT: '#3662E3',
					light: '#EBEFFC', //10% e.g. for Nav hover, and icon hover (thumbs up and down
					dark: '#153DB1', //Hover
					focus: '#DCE3F7', // focus ring
				},
				// -------------------------------------------
				// Used for all texts and icons
				textc: {
					DEFAULT: '#111827', // nearly black
					gray: '#828994',
				},
				// -------------------------------------------
				// Boders and dividers
				borderc: {
					DEFAULT: '#E4E7EB',
				},
				// -------------------------------------------
				// Background and fill, e.g. for inputs or cards
				fillc: {
					DEFAULT: '#F8F9FB',
					dark: '#F3F4F6',
					darker: '#EAEBEC',
					background: '#F9FAFB',
				},
				// -------------------------------------------
				// Green for e.g. positive sentiment, success
				positivec: {
					DEFAULT: '#20C759',
					light: '#E9F9EE',
				},
				// -------------------------------------------
				// Red for e.g. negative sentiment, error
				negativec: {
					DEFAULT: '#FC635C',
					light: '#FFEFEF',
				},
				// -------------------------------------------
				// Orange for e.g. warning or pending status
				mediumc: {
					DEFAULT: '#FF9F0F',
					light: '#FFF5E7',
				},
				// -------------------------------------------
				// Turquoise for e.g. name tags
				turquoisec: {
					DEFAULT: '#00B4D7',
					light: '#E5F7FB',
				},
				// -------------------------------------------

				disabled: {
					DEFAULT: '#E5E7EB',
					text: '#9CA3AF',
				},
				secondary: {
					hover: '#EBEFFC',
				},
				tertiary: {
					DEFAULT: '#111827',
					hover: '#F3F4F6',
					border: '#E4E7EB',
				},
				// ignore everything from here :TODO to remove
				blue: {
					disable: '#bfdbfe',
					DEFAULT: '#3662E3',
					border: '#3662e3',
					background: '#d2dcf9',
				},
				yellow: {
					status: '#FF9F0F',
				},
				green: {
					sentimentGreen: '#20C759',
					DEFAULT: '#008000',
				},
				gray: {
					dark: '#757d8a',
					DEFAULT: '#828994',
					light: '#e2e7e9',
					background: '#E4E7EB',
					fill: '#F5F8FA',
					textBox: '#f8f9fb',
					border: '#ABB8C0',
					shadow: '#0F1820',
					toggle: '#f0f0f0',
				},
				red: {
					DEFAULT: '#FD635D',
					background: '#fececd',
					sentimentRed: '#FC635C',
				},
				layout: {
					background: '#F9FAFB',
				},
			},
			animation: {
				shake: 'shake 0.7s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
			},
			keyframes: {
				shake: {
					'10%, 90%': {
						transform: 'translate3d(-1px, 0, 0)',
					},
					'20%, 80%': {
						transform: 'translate3d(2px, 0, 0)',
					},
					'30%, 50%, 70%': {
						transform: 'translate3d(-4px, 0, 0)',
					},
					'40%, 60%': {
						transform: 'translate3d(4px, 0, 0)',
					},
				},
			},
		},
	},
	variants: {
		scrollbar: ['rounded'],
	},
};

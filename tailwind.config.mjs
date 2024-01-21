import colors from 'tailwindcss/colors'

/* As of Tailwind CSS v2.2, certain colors has been renamed  */
const deprecatedColors = [
	'lightBlue',
	'warmGray',
	'coolGray',
	'blueGray',
	'trueGray'
]

deprecatedColors.forEach((color) => delete colors[color])

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
		colors: {
			context: 'var(--context-color)',
			'primary-dark': {
				50: '#1a1a1a',
				100: '#121212',
				200: '#181818'
			},
			light: '#b3b3b3',
			'spotify-green': '#1ed760',
			...colors // to get the default tailwind colors as well
		}
	},
	plugins: []
}

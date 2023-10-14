/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        fontFamily: {
            display: ['Poppins', 'sans-serif'],
            body: ['Poppins', 'sans-serif'],
        },
        extend: {
            colors: {
                primary: '#474973',
                secondary: '#a69cac',
                tertiary: '#f1dac4',
                quaternary: '#161b33',
                primarylight: '#685d6f',
                primarydark: '#9a8c94',
                darkbg: '#0d0c1d',
                lightbg: '#f7fafc',
            },
            margin: {
                16: '4rem',
            },
            width: {
                30: '8.5rem',
                50: '12.5rem',
                80: '20rem',
                88: '22rem',
                102: '26rem',
                100: '25rem',
                120: '30rem',
            },
            height: {
                0.5: '0.125rem',
                18: '4.5rem',
                25: '6.25rem',
                30: '8.5rem',
            },
        },
    },
    plugins: [],
};

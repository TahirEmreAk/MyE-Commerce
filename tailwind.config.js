/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#3B82F6', // Temel birincil renk (mavi)
                    light: '#93C5FD', // Açık ton
                    dark: '#1D4ED8' // Koyu ton
                },
                // Görsellerdeki renkleri buraya ekleyebilirsiniz
            }
        },
    },
    plugins: []
}
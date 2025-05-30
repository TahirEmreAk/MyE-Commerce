export const content = [
    "./src/**/*.{js,jsx,ts,tsx}", // React bileşenlerinizin olduğu klasör
    "./public/index.html" // HTML dosyanız
];

export const theme = {
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
};

export const plugins = [];
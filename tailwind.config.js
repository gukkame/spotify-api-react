/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "dark-grey": "#1a1a1a",
            },
            width: {
                "lg": "32rem"
            }
        },
    },
    plugins: [],
};

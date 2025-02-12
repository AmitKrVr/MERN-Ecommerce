/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                transparent: "transparent",
                current: "currentColor",
                border: "rgb(var(--border-color)",
                primary: "rgb(var(--color-primary))",
            },
        },
    },
    plugins: [],
};

module.exports = {
  variants: {
    borderColor: ["responsive", "hover", "focus", "focus-within"],
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {},
    // colors: {
    //   global: "#01a9ac",
    // },
  },
  plugins: [],
};

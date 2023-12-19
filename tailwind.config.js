const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D6DAC0",
        secondary: "#FCFFE0",
        dimwhite: "#E7E8D8",
      },
    },
  },
  plugins: [],
});

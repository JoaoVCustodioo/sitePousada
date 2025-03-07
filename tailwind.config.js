const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ECE5DE",
        secondary: "#846d54",
        dimwhite: "#E7E8D8",
      },
    },
  },
  plugins: [],
});

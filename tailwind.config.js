/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        white: "#ffffff",
        grey: {
          lighter: "#d7d7d7",
          light: "#9297a1",
          strong: "#242424",
        },
        brown: {
          strong: "#301c11",
        },
        beige: {
          strong: "#d8bc9e",
          light: "#fff3e7",
        },
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
        gibold: ["GlacialIndifference-Bold", "sans-serif"],
        giregular: ["GlacialIndifference-Regular", "sans-serif"],
        giitalic: ["GlacialIndifference-Italic", "sans-serif"],
      },
    },
  },
  plugins: [],
};

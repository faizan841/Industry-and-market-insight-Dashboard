// color design tokens export
// color design tokens export
// color design tokens export
export const tokensDark = {
  grey: {
    0: "#ffffff", // manually adjusted
    10: "#fafafa", // updated for a softer white
    50: "#f4f4f4", // updated for subtle grey
    100: "#e8e8e8", // updated for lighter grey
    200: "#c6c6c6", // updated for medium grey
    300: "#a8a8a8", // updated for balanced grey
    400: "#8a8a8a", // updated for dark grey
    500: "#6e6e6e", // updated for darker grey
    600: "#525252", // kept the same for background elements
    700: "#393939", // updated for card backgrounds
    800: "#2b2b2b", // updated for very dark background
    900: "#161616", // updated for near-black elements
    1000: "#000000", // manually adjusted
  },
  primary: {
    // blue
    100: "#d3dae3", // updated for light primary
    200: "#a7b5c7", // updated for lighter primary
    300: "#7b91aa", // updated for light blue
    400: "#4f6c8d", // updated for bright blue
    500: "#234670", // updated for main primary blue
    600: "#1c375a", // updated for dark blue
    700: "#162a44", // updated for darker blue
    800: "#101c2e", // updated for very dark blue
    900: "#0a0f18", // updated for near-black blue
  },
  secondary: {
    // yellow
    50: "#fff8e1", // updated for very light secondary
    100: "#ffedb3", // updated for light yellow
    200: "#ffe184", // updated for medium yellow
    300: "#ffd655", // updated for bright yellow
    400: "#ffcb26", // updated for vivid yellow
    500: "#ffc000", // updated for main secondary yellow
    600: "#cc9a00", // updated for dark yellow
    700: "#997300", // updated for darker yellow
    800: "#664d00", // updated for very dark yellow
    900: "#332600", // updated for deep dark yellow
  },
};

// function that reverses the color palette
function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[400],
              light: tokensDark.primary[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.primary[600],
              alt: tokensDark.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              ...tokensLight.primary,
              main: tokensDark.grey[50],
              light: tokensDark.grey[100],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensDark.secondary[600],
              light: tokensDark.secondary[700],
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.grey[0],
              alt: tokensDark.grey[50],
            },
          }),
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

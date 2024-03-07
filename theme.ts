import { extendTheme } from "native-base";

const newTheme = {
  components: {
    Button: {
      variants: {
        solid: {
          bg: "#8A3FFC",
          paddingBottom: 1,
          paddingTop: 1,
          borderRadius: 5,
          _text: {
            fontWeight: "500",
          },
        },
        outline: {
          borderColor: "#8A3FFC",
          paddingBottom: 1,
          paddingTop: 1,
          _text: {
            color: "#8A3FFC",
            fontWeight: "500",
          },
        },
      },
    },
  },
  fontConfig: {
    Poppins: {
      100: {
        normal: "Poppins_100Thin",
      },
      200: {
        normal: "Poppins_200ExtraLight",
      },
      300: {
        normal: "Poppins_300Light",
      },
      400: {
        normal: "Poppins_400Regular",
      },
      500: {
        normal: "Poppins_500Medium",
      },
      600: {
        normal: "Poppins_600SemiBold",
      },
      700: {
        normal: "Poppins_700Bold",
      },
      900: {
        normal: "Poppins_900Black",
      },
    },
  },
  fonts: {
    heading: "Poppins_400Regular",
    body: "Poppins_400Regular",
    mono: "Poppins_400Regular",
  },
};

const theme = extendTheme(newTheme);

export default theme;

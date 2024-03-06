import { extendTheme } from "native-base";

const newTheme = {
  components: {
    Button: {
      variants: {
        solid: {
          bg: "#8A3FFC",
          borderRadius: 5,
          _text: {
            fontWeight: "500",
          },
        },
        outline: {
          borderColor: "#8A3FFC",
          _text: {
            color: "#8A3FFC",
            fontWeight: "500",
          },
        },
      },
    },
  },
};

const theme = extendTheme(newTheme);

export default theme;

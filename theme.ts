import {extendTheme} from 'native-base';

const newTheme = {
  components: {
    Button: {
      variants: {
        solid: {
          bg: '#8A3FFC',
          paddingBottom: 1,
          paddingTop: 1,
          borderRadius: 5,
          _text: {
            fontWeight: '500',
          },
        },
        outline: {
          borderColor: '#8A3FFC',
          paddingBottom: 1,
          paddingTop: 1,
          _text: {
            color: '#8A3FFC',
            fontWeight: '500',
          },
        },
      },
    },
  },
  fonts: {
    heading: 'Poppins-Regular',
    body: 'Poppins-Regular',
    mono: 'Poppins-Regular',
  },
};

const theme = extendTheme(newTheme);

export default theme;

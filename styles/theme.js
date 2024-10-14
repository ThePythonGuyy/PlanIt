// theme.js or theme.ts
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    customColor: { // Name your custom color scheme
      50: '#ffe5e5',   // Lightest shade
      100: '#fcbcbc',
      200: '#fa8c8c',
      300: '#f76363',
      400: '#f43a3a',
      500: '#FF5733',  // Main shade
      600: '#db3b2a',
      700: '#b62d21',
      800: '#921e18',
      900: '#6d100f'   // Darkest shade
    }
  }
});

export default theme;

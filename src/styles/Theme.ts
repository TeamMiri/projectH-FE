import { DefaultTheme } from 'styled-components';

const size = {
  mobile: '400px',
  tablet: '768px',
  laptopS: '1023px',
  laptopM: '1239px',
  desktop: '1240px',
};
const theme: DefaultTheme = {
  colors: {
    primary: '#3dd5f3',
    primaryBold: '#0aa2c0',
    primaryLight: '#9eeaf9',
    secondary: '#fd9843',
    secondaryBold: '#fd7e14',
    secondaryLight: '#feb272',
    black: '#101010',
    blackLight: '#3c3c3c',
  },
  responsive: {
    mobile: `(max-width): ${size.mobile}`,
    tablet: `(max-width: ${size.tablet})`,
    laptopS: `(max-width: ${size.laptopS})`,
    laptopM: `(max-width: ${size.laptopM})`,
    desktop: `(min-width: ${size.desktop})`,
  },
};

export default theme;

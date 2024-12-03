import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'Arial',
      'sans-serif'
    ].join(','),
  },
  palette: {
    primary: {
      main: '#1ADB72',
    },
    secondary: {
      main: '#764BA2',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'white',
          textTransform: 'none',
          fontFamily: 'Poppins, Arial, sans-serif',
        }
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Poppins, Arial, sans-serif',
        }
      }
    }
  }
});

export default theme;
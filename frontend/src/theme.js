import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1877F2', // TaskPlanet standard blue for actions/menus
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#F0B90B', // TaskPlanet yellow/gold branding
      contrastText: '#000000',
    },
    background: {
      default: '#F4F6F9', // light gray background for the app feed
      paper: '#ffffff',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#65676B',
    },
  },
  typography: {
    fontFamily: '"Outfit", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24, // Pill buttons
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});

export default theme;

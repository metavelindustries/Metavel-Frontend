// Industrial-themed color palette
const theme = {
  colors: {
    // Primary colors
    primary: {
      main: '#1B4965', // Deep blue - representing reliability and trustworthiness
      light: '#5FA8D3', // Lighter blue for accents
      dark: '#0C2333', // Dark blue for emphasis
      contrastText: '#FFFFFF'
    },
    // Secondary colors
    secondary: {
      main: '#F9A826', // Golden yellow - symbolizing quality and premium products
      light: '#FFCB69', // Light gold for subtle accents
      dark: '#D68000', // Dark gold for emphasis
      contrastText: '#000000'
    },
    // Neutral tones
    neutral: {
      50: '#F8F9FA',
      100: '#E9ECEF',
      200: '#DEE2E6',
      300: '#CED4DA',
      400: '#ADB5BD',
      500: '#6C757D',
      600: '#495057',
      700: '#343A40',
      800: '#212529',
      900: '#121416',
    },
    // Status colors
    status: {
      success: '#2E7D32',
      warning: '#ED6C02',
      error: '#D32F2F',
      info: '#0288D1',
    },
    // Background gradients
    gradients: {
      primaryToSecondary: 'linear-gradient(135deg, #1B4965 0%, #5FA8D3 100%)',
      secondaryToDark: 'linear-gradient(135deg, #F9A826 0%, #D68000 100%)',
      darkToLight: 'linear-gradient(135deg, #0C2333 0%, #1B4965 100%)',
    }
  },
  // Typography
  typography: {
    fontFamily: "'Roboto', 'Segoe UI', 'Helvetica Neue', sans-serif",
    headingFontFamily: "'Montserrat', 'Segoe UI', 'Helvetica Neue', sans-serif",
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
    }
  },
  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  // Borders and shadows
  borders: {
    radius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '1rem',
      pill: '50rem',
    },
    shadow: {
      sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      md: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
      lg: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
      xl: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    }
  },
  // Media breakpoints
  breakpoints: {
    xs: '0px',
    sm: '600px',
    md: '960px',
    lg: '1280px',
    xl: '1920px',
  }
};

export default theme; 
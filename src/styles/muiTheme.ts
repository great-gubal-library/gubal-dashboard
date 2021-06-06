import { createMuiTheme } from '@material-ui/core';
import { fiFI } from '@material-ui/core/locale';
import { darken, lighten } from 'polished';
import { THEME, GREY } from './styledTheme';


export const MUI_THEME = createMuiTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'sans-serif',
    ].join(','),
    fontSize: 16,
    h1: {
      fontSize: '1.5rem', // 24px
      fontWeight: 'bold',
      color: THEME.colors.black,
    },
    h2: {
      fontSize: '1.25rem', // 20px
      fontWeight: 'bold',
      color: THEME.colors.black,
    },
    h3: {
      fontSize: '1.125rem', // 18px
      fontWeight: 'bold',
      color: THEME.colors.black,
    },
    h4: {
      fontSize: '1rem', // 16px
      fontWeight: 'bold',
      color: THEME.colors.black,
    },
    button: {
      fontSize: '1rem', // 16px
      fontWeight: 'bold',
      textTransform: 'none',
      color: THEME.colors.black,
      boxShadow: 'none',
      borderRadius: 0,
    },
    subtitle1: {
      color: THEME.colors.black,
    },
    subtitle2: {
      color: THEME.colors.black,
    },
    body1: {
      color: THEME.colors.black,
    },
    body2: {
      color: THEME.colors.black,
    },
    caption: {
      color: THEME.colors.black,
    },
    overline: {
      color: THEME.colors.black,
    },
  },
  spacing: 4,
  palette: {
    primary: {
      main: THEME.colors.primary,
      light: THEME.colors.primaryLighter,
      dark: THEME.colors.primaryDarker,
      contrastText: THEME.colors.black,
    },
    secondary: {
      main: THEME.colors.secondary,
      light: THEME.colors.secondaryLighter,
      dark: THEME.colors.secondaryDarker,
      contrastText: THEME.colors.black,
    },
    text: {
      primary: THEME.colors.black,
      secondary: THEME.colors.black,
      disabled: THEME.colors.grey,
      hint: THEME.colors.black,
    },
    grey: {
      50: lighten(0.1, GREY),
      100: lighten(0.05, GREY),
      200: GREY,
      300: darken(0.05, GREY),
      400: darken(0.1, GREY),
      500: darken(0.15, GREY),
      600: darken(0.20, GREY),
      700: darken(0.25, GREY),
      800: "#424242",
      900: "#212121",
      A100: GREY,
      A200: darken(0.05, GREY),
      A400: darken(0.1, GREY),
      A700: darken(0.15, GREY),
    }
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        color: THEME.colors.black,
        backgroundColor: THEME.colors.white,
        borderRadius: 0,
        "&:hover $notchedOutline": {
          border: `2px solid ${THEME.colors.primary}`,
          borderColor: THEME.colors.primary,
        },
      },
      notchedOutline: {
        borderColor: THEME.colors.primary,
      }
    },
    MuiFormLabel: {
      root: {
        color: THEME.colors.primary,
      },
    },
    MuiCheckbox: {
      root: {
        color: THEME.colors.primary,
      },
    },
    MuiButton: {
      root: {
        color: THEME.colors.black,
        border: 0,
        borderRadius: 0,
        boxShadow: 'none!important',
      },
      contained: {
        border: 0,
      },
      outlined: {
        color: THEME.colors.black,
        borderColor: THEME.colors.primary,
      },
      outlinedPrimary: {
        color: THEME.colors.black,
        borderColor: THEME.colors.primary,
      },
    },
    MuiIconButton: {
      root: {
        color: THEME.colors.primary,
      },
    },
    MuiTableCell: {
      stickyHeader: {
        backgroundColor: THEME.colors.secondary,
      },
    },
    MuiTypography: {
      colorPrimary: {
        color: THEME.colors.black,
      }
    },
    MuiTabs: {
      root: {
        paddingBottom: '1rem',
      },
      indicator: {
        backgroundColor: THEME.colors.primary,
      },
    },
    MuiTab: {
      textColorPrimary: {
        color: THEME.colors.black,
        backgroundColor: THEME.colors.white,
        "&$selected": {
          color: THEME.colors.black,
          backgroundColor: THEME.colors.white,
        },
      },
      textColorSecondary: {
        color: THEME.colors.black,
        backgroundColor: THEME.colors.white,
        "&$selected": {
          color: THEME.colors.black,
          backgroundColor: THEME.colors.white,
        },
      },
    },
    MuiTooltip: {
      tooltip: {
        fontSize: "1rem",
      }
    },
  },
  props: {
  },
}, fiFI);

import { darken, lighten } from 'polished';
import baseStyled, { ThemedStyledInterface } from 'styled-components';

export const PRIMARY = '#202833';
export const SECONDARY = '#d7eeee'
export const GREY = '#F0EDE6';
export const GREEN = '#a1d7bc';
export const RED = '#d7a1a1';

export const THEME = {
  colors: {
    primary: PRIMARY,
    primaryDarker: darken(0.05, PRIMARY),
    primaryDarkest: darken(0.1, PRIMARY),
    primaryLighter: lighten(0.05, PRIMARY),
    primaryLightest: lighten(0.1, PRIMARY),
    secondary: SECONDARY,
    secondaryDarker: darken(0.05, SECONDARY),
    secondaryDarkest: darken(0.1, SECONDARY),
    secondaryLighter: lighten(0.05, SECONDARY),
    secondaryLightest: lighten(0.1, SECONDARY),
    grey: GREY,
    greyDarker: darken(0.05, GREY),
    greyDarkest: darken(0.1, GREY),
    greyLighter: lighten(0.05, GREY),
    greyLightest: lighten(0.1, GREY),
    white: '#ffffff',
    black: '#222222',
    toastGreen: GREEN,
    toastRed: RED,
    toastGreenBorder: darken(0.05, GREEN),
    toastRedBorder: darken(0.05, RED),
    formHeader: PRIMARY,
    formSecondaryHeader: PRIMARY,
    formBorder: PRIMARY,
    headerBackground: PRIMARY
  },
  constants: {
    headerHeight: '90px',
    formHeaderHeight: '68px',
    formSecondaryHeaderHeight: '53px'
  }
};
export type Theme = typeof THEME;
export const styled = baseStyled as ThemedStyledInterface<Theme>;

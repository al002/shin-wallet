import { createTokens } from "tamagui";
import { color, radius, size, space, zIndex } from "@tamagui/themes";

const appPalette = {
  primary100: "#D9FBFB",
  primary500: "#00B8D9",
  primary700: "#008DA8",

  success: "#28A745",
  error: "#DC3545",
  warning: "#FFC107",

  neutral900: "#121212",
  neutral800: "#1E1E1E",
  neutral700: "#333333",
  neutral600: "#4F4F4F",
  neutral500: "#828282",
  neutral200: "#E0E0E0",
  neutral100: "#FFFFFF",
};

export const tokens = createTokens({
  size,
  space,
  zIndex,
  radius,
  color: {
    ...color,
    ...appPalette,
  },
});

const darkTheme = {
  background: tokens.color.neutral900,
  backgroundStrong: tokens.color.neutral800,
  backgroundTransparent: "transparent",

  color: tokens.color.neutral200,
  colorStrong: tokens.color.neutral100,
  colorMuted: tokens.color.neutral500,

  primary: tokens.color.primary500,
  primaryHover: tokens.color.primary700,
  primaryBackground: tokens.color.primary100,
  primaryText: tokens.color.neutral900,

  success: tokens.color.success,
  error: tokens.color.error,
  warning: tokens.color.warning,

  borderColor: tokens.color.neutral700,
  borderColorStrong: tokens.color.neutral600,
};

export const themes = {
  dark: darkTheme,
  light: {
    background: tokens.color.neutral100,
    backgroundStrong: tokens.color.neutral200,
    backgroundTransparent: "transparent",

    color: tokens.color.neutral900,
    colorStrong: tokens.color.neutral900,
    colorMuted: tokens.color.neutral500,

    primary: tokens.color.primary500,
    primaryHover: tokens.color.primary700,
    primaryBackground: tokens.color.primary100,
    primaryText: tokens.color.neutral900,

    success: tokens.color.success,
    error: tokens.color.error,
    warning: tokens.color.warning,

    borderColor: tokens.color.neutral200,
    borderColorStrong: tokens.color.neutral500,
  },
  dark_primary: {
    ...darkTheme,
    background: tokens.color.primary500,
    backgroundStrong: tokens.color.primary700,
    color: tokens.color.neutral900,
  },
};

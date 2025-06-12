import { palette } from "./palette";

export const darkTheme = {
  background: palette.neutral["900"],
  backgroundSecondary: palette.neutral["800"],

  text: palette.neutral["200"],
  textStrong: palette.neutral["100"],
  textSecondary: palette.neutral["500"],
  textDisabled: palette.neutral["600"],

  primary: palette.primary["500"],
  primaryContrast: palette.neutral["100"],
  primaryHover: palette.primary["700"],
  primaryBackground: palette.primary["100"],

  success: palette.success,
  error: palette.error,
  warning: palette.warning,

  buttonDisabledBackground: palette.neutral["700"],
  buttonDisabledText: palette.neutral["500"],

  border: palette.neutral["700"],
  divider: palette.neutral["700"],

  icon: palette.neutral["200"],
  iconSecondary: palette.neutral["500"],
  overlay: "rgba(255, 255, 255, 0.05)",
};

export type AppTheme = typeof darkTheme;

export const theme: {
  dark: AppTheme;
  light: AppTheme;
} = {
  dark: darkTheme,
  light: darkTheme,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 4,
  md: 8,
  lg: 16,
  full: 999,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: "bold" as const,
  },
  h2: {
    fontSize: 24,
    fontWeight: "bold" as const,
  },
  body: {
    fontSize: 16,
    fontWeight: "normal" as const,
  },
  caption: {
    fontSize: 12,
    fontWeight: "normal" as const,
  },
};

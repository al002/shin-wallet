import { AppTheme } from "@/constants/theme";
import { useTheme } from "./useTheme"

export const useThemeColor = (colorName: keyof AppTheme) => {
  const theme = useTheme();

  return theme[colorName];
}

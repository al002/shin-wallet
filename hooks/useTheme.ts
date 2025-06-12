import { useColorScheme } from "react-native";
import { AppTheme, theme } from "@/constants/theme";

export const useTheme = (): AppTheme => {
  const colorScheme = useColorScheme() ?? "dark";

  return theme[colorScheme] ?? theme.dark;
};

import { createInterFont } from "@tamagui/font-inter";
import { shorthands } from "@tamagui/shorthands";
import { createAnimations } from "@tamagui/animations-react-native";
import { createTamagui } from "tamagui";
import { themes, tokens } from "./constants/tamaguiTheme";

const headingFont = createInterFont({
  face: {
    normal: { normal: "Inter" },
    bold: { normal: "InterBold" },
  },
});
const bodyFont = createInterFont({
  face: {
    normal: { normal: "Inter" },
    bold: { normal: "InterBold" },
  },
});

export const animations = createAnimations({
  bouncy: {
    damping: 9,
    mass: 0.9,
    stiffness: 150,
  },
  lazy: {
    damping: 18,
    stiffness: 50,
  },
});

export const tamaguiConfig = createTamagui({
  themes,
  tokens,
  shorthands,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  animations,
});

export type AppTamaguiConfig = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends AppTamaguiConfig {}
}

export default tamaguiConfig;

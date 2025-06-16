import { createInterFont } from "@tamagui/font-inter";
import { shorthands } from "@tamagui/shorthands";
import { createTamagui } from "tamagui";
import { config } from "@tamagui/config";
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

export const tamaguiConfig = createTamagui({
  themes,
  tokens,
  shorthands,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  animations: config.animations,
});

export type AppTamaguiConfig = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends AppTamaguiConfig {}
}

export default tamaguiConfig;

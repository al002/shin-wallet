import { Stack } from "expo-router";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { useTheme } from "tamagui";

if (global.crypto == null) {
  global.crypto = require("expo-crypto");
}

export default function OnboardingLayout() {
  const theme = useTheme();
  const mnemonicScreenOptions: NativeStackNavigationOptions = {
    headerShown: true,
    title: "",
    headerBackButtonDisplayMode: "minimal",
    headerStyle: {
      backgroundColor: theme.background.val,
    },
    headerTintColor: "#fff",
  };

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="mnemonic/index" options={mnemonicScreenOptions} />
      <Stack.Screen
        name="mnemonic/enable-biometrics"
        options={mnemonicScreenOptions}
      />
    </Stack>
  );
}

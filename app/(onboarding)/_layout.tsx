import { Stack } from "expo-router";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { useTheme } from "tamagui";
import { OnboardingContext } from "@/contexts/onboarding";

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
    <OnboardingContext
      value={{
        tempMnemonic: "",
      }}
    >
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="mnemonic/index" options={mnemonicScreenOptions} />
        <Stack.Screen
          name="mnemonic/biometrics"
          options={mnemonicScreenOptions}
        />
      </Stack>
    </OnboardingContext>
  );
}

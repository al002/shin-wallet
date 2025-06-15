import { Stack } from "expo-router";

if (global.crypto == null) {
  global.crypto = require("expo-crypto");
}

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="mnemonic" />
    </Stack>
  );
}

import {
  DarkTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TamaguiProvider } from "tamagui";
import appConfig from "@/tamagui.config";
import { useWalletStore } from "@/store/wallet";
import "@/locales/i18n";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();
  const { isHydrated, hasWallet, checkAnHydrate } = useWalletStore();

  const [fontsLoaded, fontsError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    checkAnHydrate();
  }, [checkAnHydrate]);

  useEffect(() => {
    const assetsReady = fontsLoaded || fontsError;
    const isAppReady = assetsReady && isHydrated;

    if (!isAppReady) {
      return;
    }

    if (fontsError) {
      console.error("Font loading error:", fontsError);
    }

    const inOnboardingGroup = segments[0] === "(onboarding)";
    if (hasWallet && inOnboardingGroup) {
      // router.replace("/(tabs)/wallet");
    } else if (!hasWallet && !inOnboardingGroup) {
      router.replace("/(onboarding)");
    }

    SplashScreen.hideAsync();
  }, [fontsLoaded, fontsError, isHydrated, hasWallet, segments, router]);

  const assetsReady = fontsLoaded || fontsError;
  const isAppReady = assetsReady && isHydrated;

  if (!isAppReady) {
    return null;
  }

  return (
    <TamaguiProvider config={appConfig} defaultTheme="dark">
      <ThemeProvider value={DarkTheme}>
        <Stack>
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="light" />
      </ThemeProvider>
    </TamaguiProvider>
  );
}

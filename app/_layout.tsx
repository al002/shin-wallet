import { DarkTheme, ThemeProvider } from "@react-navigation/native";
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
  const { isHydrated, hasWallet, isUnlocked, checkAndHydrate } =
    useWalletStore();

  const [fontsLoaded, fontsError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    checkAndHydrate();
  }, [checkAndHydrate]);

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
    const onUnlockScreen = segments[0] === "unlock";

    if (!hasWallet) {
      if (!inOnboardingGroup) {
        router.replace("/(onboarding)");
      }
    } else {
      if (!isUnlocked) {
        if (!onUnlockScreen) {
          router.replace("/unlock");
        }
      } else {
        if (inOnboardingGroup || onUnlockScreen) {
          router.replace("/(tabs)/wallet");
        }
      }
    }

    SplashScreen.hideAsync();
  }, [
    fontsLoaded,
    fontsError,
    isHydrated,
    hasWallet,
    isUnlocked,
    segments,
    router,
  ]);

  if (!isHydrated || (!fontsLoaded && !fontsError)) {
    return null;
  }

  return (
    <TamaguiProvider config={appConfig} defaultTheme="dark">
      <ThemeProvider value={DarkTheme}>
        <Stack>
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="unlock" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="light" />
      </ThemeProvider>
    </TamaguiProvider>
  );
}

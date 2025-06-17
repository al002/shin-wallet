import { Button } from "@/components/Button";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { H2, Paragraph, Switch, Text, XStack, YStack } from "tamagui";
import Keychain from "react-native-keychain";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  MNEMONIC_SECURE_STORE_KEY,
  WALLET_SETUP_COMPLETED_KEY,
  WALLLET_BIOMETRICS_ENABLED_KEY,
} from "@/constants/wallet";
import { useOnboardingContext } from "@/contexts/onboarding";

export default function Biometrics() {
  const { t } = useTranslation();
  const router = useRouter();
  const onboardingContext = useOnboardingContext();

  const [isBiometricsOn, setIsBiometricsOn] = useState(false);
  const [isHardwareSupported, setIsHardwareSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsHardwareSupported(compatible);
    })();
  }, []);

  const toggleBiometrics = async (checked: boolean) => {
    try {
      if (!checked) {
        setIsBiometricsOn(false);
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        biometricsSecurityLevel: "strong",
      });

      if (result.success) {
        setIsBiometricsOn(true);
      }
    } catch (e) {
      console.log(e);
      setIsBiometricsOn(false);
    }
  };

  const handleFinishSetup = async () => {
    if (!onboardingContext.tempMnemonic) {
      return;
    }

    setIsLoading(true);

    try {
      await Keychain.setGenericPassword(
        MNEMONIC_SECURE_STORE_KEY,
        onboardingContext.tempMnemonic,
        {
          accessControl: Keychain.ACCESS_CONTROL.USER_PRESENCE,
          accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
          storage: Keychain.STORAGE_TYPE.RSA,
        },
      );

      if (isBiometricsOn && isHardwareSupported) {
        await SecureStore.setItemAsync(WALLLET_BIOMETRICS_ENABLED_KEY, "true");
      } else {
        await SecureStore.deleteItemAsync(WALLLET_BIOMETRICS_ENABLED_KEY);
      }

      await SecureStore.setItemAsync(WALLET_SETUP_COMPLETED_KEY, "true");
      onboardingContext.tempMnemonic = "";
      router.replace("/(tabs)/wallet");
    } catch (error) {
      console.log("Keychain Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <YStack flex={1} padding="$4" justifyContent="flex-end" paddingBottom="$8">
      <YStack gap="$6" width="100%">
        <YStack alignItems="center" gap="$2">
          <Ionicons name="shield-checkmark-outline" size={48} color="#fff" />
          <H2>{t("onboarding.mnemonic.biometrics.title")}</H2>
          <Paragraph textAlign="center" color="$colorMuted">
            {t("onboarding.mnemonic.biometrics.subTitle")}
          </Paragraph>
        </YStack>

        {isHardwareSupported ? (
          <XStack
            alignItems="center"
            justifyContent="space-between"
            padding="$4"
            backgroundColor="$backgroundFocus"
            borderRadius="$4"
          >
            <XStack alignItems="center" gap="$2">
              <Ionicons name="finger-print-outline" size={20} color="white" />
              <Text fontSize="$4">
                {t("onboarding.mnemonic.biometrics.enableSwitchLabel")}
              </Text>
            </XStack>
            <Switch
              size="$4"
              checked={isBiometricsOn}
              backgroundColor={isBiometricsOn ? "$primary500" : "$colorMuted"}
              onCheckedChange={toggleBiometrics}
            >
              <Switch.Thumb animation="quick" backgroundColor="$color" />
            </Switch>
          </XStack>
        ) : null}

        <YStack flex={1} />

        <Button
          theme="primary"
          disabled={isLoading}
          onPress={handleFinishSetup}
        >
          {t("onboarding.mnemonic.biometrics.finish")}
        </Button>
      </YStack>
    </YStack>
  );
}

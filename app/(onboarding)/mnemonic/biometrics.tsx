import { Button } from "@/components/Button";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { H2, Paragraph, Switch, Text, XStack, YStack } from "tamagui";
import * as LocalAuthentication from "expo-local-authentication";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Biometrics() {
  const { t } = useTranslation();

  const [isBiometricsOn, setIsBiometricsOn] = useState(false);
  const [isHardwareSupported, setIsHardwareSupported] = useState(false);

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

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (isEnrolled) {
        setIsBiometricsOn(true);
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        biometricsSecurityLevel: "strong",
      });

      if (result.success) {
        setIsBiometricsOn(true);
      }
    } catch (e) {}
  };

  const handleFinishSetup = () => {};

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

        <Button theme="primary" onPress={handleFinishSetup}>
          {t("onboarding.mnemonic.biometrics.finish")}
        </Button>
      </YStack>
    </YStack>
  );
}

import { Button } from "@/components/Button";
import {
  ACTIVE_WALLET_ID_KEY,
  WALLET_METADATA_STORAGE_KEY,
  WALLET_MNEMONIC_STORAGE_KEY,
  WALLLET_BIOMETRICS_ENABLED_KEY,
} from "@/constants/wallet";
import { useOnboardingContext } from "@/contexts/onboarding";
import { useWalletStore } from "@/store/wallet";
import { ShinAccount, ShinWallet } from "@/types/wallet";
import { deriveEvmAccountFromMnemonic } from "@/utils/wallet";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Keychain from "react-native-keychain";
import { H2, Paragraph, Switch, Text, XStack, YStack } from "tamagui";

export default function Biometrics() {
  const { t } = useTranslation();
  const router = useRouter();
  const onboardingContext = useOnboardingContext();
  const { checkAndHydrate } = useWalletStore();

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
    const mnemonic = onboardingContext.tempMnemonic;
    if (!mnemonic) {
      return;
    }

    setIsLoading(true);

    try {
      const existingWalletsJson = await SecureStore.getItemAsync(
        WALLET_METADATA_STORAGE_KEY,
      );
      const wallets: ShinWallet[] = existingWalletsJson
        ? JSON.parse(existingWalletsJson)
        : [];

      const derivedAccount = deriveEvmAccountFromMnemonic(mnemonic);
      const evmAccount: ShinAccount = {
        address: derivedAccount.address,
        index: 0,
      };

      const newWalletId = `wallet_${Date.now()}`;
      const newWallet: ShinWallet = {
        id: newWalletId,
        name: `Account ${wallets.length + 1}`,
        type: "mnemonic",
        createdAt: Date.now(),
        accounts: [evmAccount],
      };

      await Keychain.setGenericPassword(WALLET_MNEMONIC_STORAGE_KEY, mnemonic, {
        service: newWalletId,
        accessControl:
          Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE,
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        storage: Keychain.STORAGE_TYPE.RSA,
      });

      const updatedWallets = [...wallets, newWallet];
      await SecureStore.setItemAsync(
        WALLET_METADATA_STORAGE_KEY,
        JSON.stringify(updatedWallets),
      );
      await SecureStore.setItemAsync(ACTIVE_WALLET_ID_KEY, newWalletId);

      if (isBiometricsOn && isHardwareSupported) {
        await SecureStore.setItemAsync(WALLLET_BIOMETRICS_ENABLED_KEY, "true");
      } else {
        await SecureStore.deleteItemAsync(WALLLET_BIOMETRICS_ENABLED_KEY);
      }

      await checkAndHydrate();
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

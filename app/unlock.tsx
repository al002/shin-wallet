import { Button } from "@/components/Button";
import { useTranslation } from "react-i18next";
import { YStack } from "tamagui";
import Keychain from "react-native-keychain";
import { useWalletStore } from "@/store/wallet";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function AppUnlock() {
  const { t } = useTranslation();
  const router = useRouter();
  const { setUnlocked, activeWalletId } = useWalletStore();

  useEffect(() => {
    if (activeWalletId) {
      handleUnlock();
    }
  }, [activeWalletId]);

  const handleUnlock = async () => {
    if (!activeWalletId) {
      console.error("Unlock attempt failed: No active account id found.")
      router.replace("/(onboarding)");
      return;
    }

    try {
      const credentials = await Keychain.getGenericPassword({
        service: activeWalletId,
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE,
      });

      if (credentials) {
        setUnlocked(true);
      }
    } catch (e) {
      console.log("Unlock failed: ", e);
    }
  };

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" padding="$4" gap="$6">
      <Button onPress={handleUnlock}>
        {t("unlock.unlock")}
      </Button>
    </YStack>
  );
}

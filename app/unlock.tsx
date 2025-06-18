import { Button } from "@/components/Button";
import { useTranslation } from "react-i18next";
import { YStack } from "tamagui";
import Keychain from "react-native-keychain";
import { useWalletStore } from "@/store/wallet";
import { useEffect } from "react";

export default function AppUnlock() {
  const { t } = useTranslation();
  const { setUnlocked } = useWalletStore();

  useEffect(() => {
    handleUnlock();
  }, []);

  const handleUnlock = async () => {
    try {
      const credentials = await Keychain.getGenericPassword({
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

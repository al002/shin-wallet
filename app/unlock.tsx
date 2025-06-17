import { Button } from "@/components/Button";
import { useTranslation } from "react-i18next";
import { YStack } from "tamagui";
import Keychain from "react-native-keychain";
import { useWalletStore } from "@/store/wallet";

export default function AppUnlock() {
  const { t } = useTranslation();
  const { setUnlocked } = useWalletStore();

  const handleUnlock = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();

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

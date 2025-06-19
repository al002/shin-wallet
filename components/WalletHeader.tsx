import { useWalletStore } from "@/store/wallet";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, XStack } from "tamagui";

export function WalletHeader() {
  const { wallets, activeWalletId } = useWalletStore();

  const activeWallet = wallets.find((w) => w.id === activeWalletId);

  return (
    <XStack
      paddingHorizontal="$4"
      paddingVertical="$3"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text fontSize="$5" fontWeight="bold">
        {activeWallet ? activeWallet.name : "My Wallet"}
      </Text>

      <XStack gap="$3">
        <Ionicons name="scan" color="white" size={20} />
        <Ionicons name="settings-outline" color="white" size={20} />
      </XStack>
    </XStack>
  );
}

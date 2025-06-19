import { WalletHeader } from "@/components/WalletHeader";
// import { useWalletStore } from "@/store/wallet";
import { SafeAreaView } from "react-native-safe-area-context";
import { YStack, Text, useTheme, ScrollView, H1 } from "tamagui";

export default function WalletScreen() {
  const theme = useTheme();
  // const activeWallet = useWalletStore((state) =>
  //   state.wallets.find((w) => w.id === state.activeWalletId),
  // );

  const dummyItems = Array.from({ length: 30 }, (_, i) => `item ${i + 1}`);
  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        flex: 1,
        backgroundColor: theme.background.val,
      }}
    >
      <YStack flex={1}>
        <WalletHeader />
        <ScrollView
          flex={1}
          contentContainerStyle={{
            padding: "$4",
          }}
        >
          <YStack gap="$4">
            <H1 textAlign="center" marginVertical="$6">
              $1,234.56
            </H1>

            {dummyItems.map((item, index) => (
              <Text
                key={index}
                padding="$3"
                backgroundColor="$backgroundStrong"
                borderRadius="$3"
              >
                {item}
              </Text>
            ))}
          </YStack>
        </ScrollView>
      </YStack>
    </SafeAreaView>
  );
}

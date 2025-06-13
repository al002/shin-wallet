import { Button } from "@/components/Button";
import { useRouter } from "expo-router";
import { H1, Paragraph, Separator, YStack } from "tamagui";

export default function Onboarding() {
  const router = useRouter();

  return (
    <YStack flex={1} justifyContent="flex-end" padding="$6" gap="$4">
      <YStack>
        <H1 textAlign="center" color="$colorStrong">
          Your Crypto, Your Rules
        </H1>
        <Paragraph textAlign="center" color="$colorMuted" size="$5" marginTop="$2">
          A secure, multi-chain wallet for the new digital economy.
        </Paragraph>
      </YStack>

      <Separator marginVertical="$4" />

      <YStack gap="$3">
        <Button
          theme="primary"
          // onPress={() => router.push('/(onboarding)/create')}
        >
          Create a new wallet
        </Button>

        <Button
          variant="outlined"
          chromeless
          // onPress={() => router.push('/(onboarding)/import')}
        >
          I already have a wallet
        </Button>
      </YStack>
    </YStack>
  );
}

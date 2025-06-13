import { Button } from "@/components/Button";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { H2, Paragraph, Separator, YStack } from "tamagui";

export default function Onboarding() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <YStack flex={1} justifyContent="flex-end" padding="$6" gap="$4">
      <YStack>
        <H2 fontWeight="bold" textAlign="center" color="$colorStrong">
          {t("welcomeTitle")}
        </H2>
        <Paragraph
          textAlign="center"
          // color="$colorMuted"
          size="$5"
          marginTop="$3"
        >
          {t("welcomeDesc")}
        </Paragraph>
      </YStack>

      <Separator marginVertical="$3" />

      <YStack gap="$3">
        <Button
          theme="primary"
          // onPress={() => router.push('/(onboarding)/create')}
        >
          {t("createNewWallet")}
        </Button>

        <Button
          variant="outlined"
          chromeless
          // onPress={() => router.push('/(onboarding)/import')}
        >
          {t("alreadyHaveWallet")}
        </Button>
      </YStack>
    </YStack>
  );
}

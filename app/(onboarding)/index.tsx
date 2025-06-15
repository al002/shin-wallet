import { Button } from "@/components/Button";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { H2, H3, Paragraph, Separator, Sheet, YStack } from "tamagui";
import Ionicons from "@expo/vector-icons/Ionicons"

export default function Onboarding() {
  const router = useRouter();
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);

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
          onPress={() => router.push('/(onboarding)/mnemonic')}
        >
          {t("createNewWallet")}
        </Button>

        <Button
          variant="outlined"
          chromeless
          onPress={() => setOpen(true)}
        >
          {t("alreadyHaveWallet")}
        </Button>
      </YStack>

      <Sheet
        modal={true}
        open={open}
        snapPointsMode="constant"
        snapPoints={[300]}
        position={position}
        dismissOnSnapToBottom
        zIndex={100_000}
        onOpenChange={setOpen}
        onPositionChange={setPosition}
      >
        <Sheet.Overlay
          opacity={0.8}
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Frame padding="$5" justifyContent="center" alignItems="center" gap="$4">
          <H3>{t("onboarding.importOptions")}</H3>
          <Paragraph textAlign="center" color="$colorMuted">
            {t("onboarding.importDesc")}
          </Paragraph>
          <Button icon={<Ionicons name="copy-outline" />} size="$4" themeInverse width="100%">
            {t("onboarding.importSeedPhrase")}
          </Button>
          <Button icon={<Ionicons name="key-outline" />} size="$4" themeInverse width="100%">
            {t("onboarding.importPrivateKey")}
          </Button>
        </Sheet.Frame>
      </Sheet>
    </YStack>
  );
}

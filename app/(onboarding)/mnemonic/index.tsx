import { Button } from "@/components/Button";
import { generate } from "@/utils/mnemonic";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { H2, Input, Paragraph, XStack, YStack } from "tamagui";

export default function ShowMnemonic() {
  const { t } = useTranslation();
  const [mnemonic, setMnemoic] = useState<string[]>([]);

  useEffect(() => {
    setMnemoic(generate());
  }, []);

  return (
    <YStack gap="$4" padding="$4" alignItems="center" flex={1} backgroundColor="$background">
      <YStack alignItems="center">
        <H2>{t("onboarding.mnemonic.title")}</H2>
        <Paragraph margin="$2" textAlign="center" color="$colorMuted">
          {t("onboarding.mnemonic.subTitle")}
        </Paragraph>
      </YStack>

      <YStack flex={1}>
        <XStack flexWrap="wrap" gap="$4">
          {mnemonic.map((item, index) => {
            return <Input key={index} value={item} width="47%" />;
          })}
        </XStack>

        <Button
          marginTop="$3"
          variant="outlined"
          chromeless
          icon={<Ionicons name="copy-outline" />}
          size="$4"
        >
          {t("onboarding.mnemonic.copyToClipboard")}
        </Button>
      </YStack>

      <YStack width="100%" marginBottom="$4">
        <Button theme="primary" width="100%">
          {t("common.next")}
        </Button>
      </YStack>
    </YStack>
  );
}

import { Button } from "@/components/Button";
import { generate } from "@/utils/mnemonic";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { H2, Input, Paragraph, XStack, YStack } from "tamagui";
import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";
import { useOnboardingContext } from "../context";

export default function Mnemonic() {
  const { t } = useTranslation();
  const router = useRouter();
  const onboardingContext = useOnboardingContext();
  const [mnemonic, setMnemoic] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setMnemoic(generate());
    const timeout = timeoutRef.current;

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  const copyToClipboard = async () => {
    if (copied) {
      return;
    }

    await Clipboard.setStringAsync(mnemonic.join(" "));
    setCopied(true);

    timeoutRef.current = setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const toBiometrics = () => {
    if (!mnemonic.length) {
      return;
    }

    onboardingContext.tempMnemonic = mnemonic.join(" ");
    router.push("/(onboarding)/mnemonic/biometrics")
  };

  return (
    <YStack
      gap="$4"
      padding="$4"
      alignItems="center"
      flex={1}
      backgroundColor="$background"
    >
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
          icon={!copied ? <Ionicons name="copy-outline" /> : null}
          size="$4"
          onPress={copyToClipboard}
        >
          {!copied
            ? t("onboarding.mnemonic.copyToClipboard")
            : t("common.copied")}
        </Button>
      </YStack>

      <YStack width="100%" marginBottom="$4">
        <Button
          theme="primary"
          width="100%"
          onPress={toBiometrics}
        >
          {t("common.next")}
        </Button>
      </YStack>
    </YStack>
  );
}

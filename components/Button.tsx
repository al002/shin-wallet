import {
  Button as TamaguiButton,
  ButtonProps as TamaguiButtonProps,
} from "tamagui";

export type ButtonProps = TamaguiButtonProps & {};

export const Button = (props: ButtonProps) => {
  return (
    <TamaguiButton
      fontWeight="bold"
      size="$5"
      {...props}
    />
  );
};

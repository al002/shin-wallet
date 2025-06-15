import { generateMnemonic, english } from "viem/accounts";

export const generate = () => {
  return generateMnemonic(english)?.split(" ");
}

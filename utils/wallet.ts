import { HDAccount, mnemonicToAccount } from "viem/accounts";

export const deriveEvmAccountFromMnemonic = (mnemonic: string): HDAccount => {
  const account = mnemonicToAccount(mnemonic, {
    accountIndex: 0,
    addressIndex: 0,
    changeIndex: 0,
  });

  return account;
};

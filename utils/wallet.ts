import { ACTIVE_WALLET_ID_KEY, WALLET_METADATA_STORAGE_KEY, WALLET_MNEMONIC_STORAGE_KEY } from "@/constants/wallet";
import { ShinAccount, ShinWallet } from "@/types/wallet";
import { HDAccount, mnemonicToAccount } from "viem/accounts";
import Keychain from "react-native-keychain";
import * as SecureStore from "expo-secure-store";

export const deriveEvmAccountFromMnemonic = (mnemonic: string): HDAccount => {
  const account = mnemonicToAccount(mnemonic, {
    accountIndex: 0,
    addressIndex: 0,
    changeIndex: 0,
  });

  return account;
};

export const createWallet = async (mnemonic: string) => {
  const existingWalletsJson = await SecureStore.getItemAsync(
    WALLET_METADATA_STORAGE_KEY,
  );
  const wallets: ShinWallet[] = existingWalletsJson
    ? JSON.parse(existingWalletsJson)
    : [];

  const derivedAccount = deriveEvmAccountFromMnemonic(mnemonic);
  const evmAccount: ShinAccount = {
    address: derivedAccount.address,
    index: 0,
  };

  const newWalletId = `wallet_${Date.now()}`;
  const newWallet: ShinWallet = {
    id: newWalletId,
    name: `Account ${wallets.length + 1}`,
    type: "mnemonic",
    createdAt: Date.now(),
    accounts: [evmAccount],
  };

  await Keychain.setGenericPassword(WALLET_MNEMONIC_STORAGE_KEY, mnemonic, {
    service: newWalletId,
    accessControl:
      Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE,
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    storage: Keychain.STORAGE_TYPE.RSA,
  });

  const updatedWallets = [...wallets, newWallet];
  await SecureStore.setItemAsync(
    WALLET_METADATA_STORAGE_KEY,
    JSON.stringify(updatedWallets),
  );
  await SecureStore.setItemAsync(ACTIVE_WALLET_ID_KEY, newWalletId); 
};

import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

export const MNEMONIC_SECURE_STORE_KEY = "shin_encrypted_mnemonic";

interface WalletState {
  isHydrated: boolean;
  hasWallet: boolean;
  checkAnHydrate: () => Promise<void>;
  setHasWallet: (status: boolean) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  isHydrated: false,
  hasWallet: false,
  setHasWallet: (status) => set({ hasWallet: status }),
  checkAnHydrate: async () => {
    try {
      const encryptedMnemonic = await SecureStore.getItemAsync(
        MNEMONIC_SECURE_STORE_KEY,
      );
      set({ hasWallet: !!encryptedMnemonic });
    } catch (e) {
      console.error("Failed to check wallet status from secure store", e);
      set({ hasWallet: false });
    } finally {
      set({ isHydrated: true });
    }
  },
}));

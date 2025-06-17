import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import {
  WALLET_SETUP_COMPLETED_KEY,
  WALLLET_BIOMETRICS_ENABLED_KEY,
} from "@/constants/wallet";

interface WalletState {
  isHydrated: boolean;
  hasWallet: boolean;
  isUnlocked: boolean;
  isBiometricsEnabled: boolean;
  checkAndHydrate: () => Promise<void>;
  setHasWallet: (status: boolean) => void;
  setUnlocked: (status: boolean) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  isHydrated: false,
  hasWallet: false,
  isUnlocked: false,
  isBiometricsEnabled: false,
  setHasWallet: (status) => set({ hasWallet: status }),
  setUnlocked: (status) => set({ isUnlocked: status }),
  checkAndHydrate: async () => {
    try {
      const [isSetup, biometricsEnabled] = await Promise.all([
        SecureStore.getItemAsync(WALLET_SETUP_COMPLETED_KEY),
        SecureStore.getItemAsync(WALLLET_BIOMETRICS_ENABLED_KEY),
      ]);

      const hasWallet = isSetup === "true";
      const isBiometricsEnabled = biometricsEnabled === "true";

      set({
        hasWallet,
        isBiometricsEnabled,
        isUnlocked: hasWallet && !isBiometricsEnabled,
      });
    } catch (e) {
      console.error("Failed to check wallet status from secure store", e);
      set({ hasWallet: false, isUnlocked: false, isBiometricsEnabled: false });
    } finally {
      set({ isHydrated: true });
    }
  },
}));

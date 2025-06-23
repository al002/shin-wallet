import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import {
  ACTIVE_WALLET_ID_KEY,
  WALLET_METADATA_STORAGE_KEY,
  WALLLET_BIOMETRICS_ENABLED_KEY,
} from "@/constants/wallet";
import { ShinWallet } from "@/types/wallet";
import { ChainType } from "@/services/blockchain/types";

interface WalletState {
  isHydrated: boolean;
  isUnlocked: boolean;
  isBiometricsEnabled: boolean;
  activeChainType: ChainType;
  wallets: ShinWallet[];
  activeWalletId: string | null;
  checkAndHydrate: () => Promise<void>;
  setUnlocked: (status: boolean) => void;
  setWallets: (wallets: ShinWallet[]) => void;
  setActiveWalletId: (id: string | null) => void;
  setActiveChainType: (chain: ChainType) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  isHydrated: false,
  isUnlocked: false,
  isBiometricsEnabled: false,
  activeChainType: "evm",
  wallets: [],
  activeWalletId: null,
  setUnlocked: (status) => set({ isUnlocked: status }),
  setWallets: (wallets) => set({ wallets: wallets }),
  setActiveWalletId: (id) => set({ activeWalletId: id }),
  setActiveChainType: (chain) => set({ activeChainType: chain }),
  checkAndHydrate: async () => {
    let finalState: Partial<WalletState> = {};

    try {
      const [biometricsEnabled, walletsJson, activeId] = await Promise.all([
        SecureStore.getItemAsync(WALLLET_BIOMETRICS_ENABLED_KEY),
        SecureStore.getItemAsync(WALLET_METADATA_STORAGE_KEY),
        SecureStore.getItemAsync(ACTIVE_WALLET_ID_KEY),
      ]);

      const wallets: ShinWallet[] = walletsJson ? JSON.parse(walletsJson) : [];

      const hasWallet = wallets.length > 0;
      const isBiometricsEnabled = biometricsEnabled === "true";

      finalState = {
        wallets: wallets,
        activeWalletId: activeId,
        isBiometricsEnabled,
        isUnlocked: hasWallet && !isBiometricsEnabled,
      };
    } catch (e) {
      console.error("Failed to check wallet status from secure store", e);
      finalState = {
        wallets: [],
        activeWalletId: null,
        isUnlocked: false,
        isBiometricsEnabled: false,
      };
    } finally {
      set({ ...finalState, isHydrated: true });
    }
  },
}));

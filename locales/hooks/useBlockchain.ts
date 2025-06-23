import { useMemo } from "react";
import {
  getBlockchainAdapter,
  IBlockchainClient,
  Network,
} from "@/services/blockchain";
import { useWalletStore } from "@/store/wallet";

export const useBlockchainAdapter = (network?: Network): IBlockchainClient => {
  const activeChainType = useWalletStore((state) => state.activeChainType);

  const adapter = useMemo(
    () => getBlockchainAdapter(activeChainType, network),
    [activeChainType, network],
  );

  return adapter;
};

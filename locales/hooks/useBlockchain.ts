import { useMemo } from "react";
import {
  getBlockchainClient,
  IBlockchainClient,
  Network,
} from "@/services/blockchain";
import { useWalletStore } from "@/store/wallet";

export const useBlockchainClient = (network?: Network): IBlockchainClient => {
  const activeChainType = useWalletStore((state) => state.activeChainType);

  const adapter = useMemo(
    () => getBlockchainClient(activeChainType, network),
    [activeChainType, network],
  );

  return adapter;
};

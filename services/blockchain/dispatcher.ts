import { createEvmClient } from "./evm/client";
import {
  ClientCreatorFn,
  ChainType,
  IBlockchainClient,
  Network,
} from "./types";

const adapterCreators: Record<ChainType, ClientCreatorFn> = {
  evm: createEvmClient,
};

const adapterCache = new Map<string, IBlockchainClient>();

export const getBlockchainClient = (
  chainType: ChainType,
  network: Network = "mainnet",
): IBlockchainClient => {
  const cacheKey = `${chainType}-${network}`;

  if (adapterCache.has(cacheKey)) {
    return adapterCache.get(cacheKey)!;
  }

  const createAdapter = adapterCreators[chainType];
  if (!createAdapter) {
    throw new Error(`Unsupported chain type: ${chainType}`);
  }

  const adapter = createAdapter(network);

  adapterCache.set(cacheKey, adapter);

  return adapter;
};

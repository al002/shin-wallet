import { Chain, mainnet, sepolia } from "viem/chains";
import { IBlockchainClient, Network } from "../types";
import { createPublicClient, http } from "viem";

const networkChainMap: Record<Network, Chain> = {
  mainnet,
  testnet: sepolia,
  devnet: sepolia,
};

export const createEvmClient = (network: Network): IBlockchainClient => {
  const chain = networkChainMap[network];
  if (!chain) {
    throw new Error(`Unsupported network: ${network}`);
  }

  const alchemyKey = process.env.EXPO_PUBLIC_ALCHEMY_API_KEY;

  if (!alchemyKey) {
    throw new Error("Alchemy API key is not defined in environment variables.");
  }

  const client = createPublicClient({
    chain: mainnet,
    transport: http(
      `https://eth-${chain.name.toLowerCase()}.g.alchemy.com/v2/${alchemyKey}`,
    ),
  });

  return {
    chainType: "evm",
    getUserAssets: async (address: string): Promise<unknown> => {
      return [];
    }
  }
};

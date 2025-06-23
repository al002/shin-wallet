export type ChainType = "evm";
export type Network = "mainnet" | "testnet" | "devnet";

export interface IBlockchainClient {
  chainType: ChainType;
  getUserAssets: (address: string) => Promise<unknown>;
}

export type ClientCreatorFn = (network: Network) => IBlockchainClient;

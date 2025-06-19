export interface ShinAccount {
  index: number;
  address: string;
  label?: string;
  ens?: string;
}

export interface ShinWallet {
  id: string;
  name: string;
  type: "mnemonic" | "privateKey";
  createdAt: number;
  accounts: ShinAccount[];
}

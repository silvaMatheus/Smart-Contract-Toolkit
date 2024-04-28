import { create } from "zustand";

interface ContractStoreState {
  contract: any | null;
  abi: any | null;
  status: "idle" | "loading" | "success" | "error";
  setContract: (contract: any, abi: any) => void;
}

export const useContractStore = create<ContractStoreState>((set) => ({
  contract: null,
  abi: null,
  status: "idle",
  setContract: (contract, abi) =>
    set(() => ({
      contract: contract,
      abi: abi,
      status: "success",
    })),
}));

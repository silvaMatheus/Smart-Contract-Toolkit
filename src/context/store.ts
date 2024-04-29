import { Contract } from "ethers";
import { create } from "zustand";

interface ContractStoreState {
  name: string;
  contract: Contract | null;
  abi: object | null;
  status: "idle" | "loading" | "success" | "error";
  setContract: (contract: Contract, abi: object) => void;
  logItems: { type: "normal" | "JSON"; message: string }[];
  addLogItem: (item: { type: "normal" | "JSON"; message: string }) => void;
  addJSONLogItem: (item: { message: string }) => void;
  clearLog: () => void;
}

export const useContractStore = create<ContractStoreState>((set) => ({
  name: "",
  contract: null,
  abi: null,
  status: "idle",
  logItems: [],
  setContract: (contract: Contract, abi: object) =>
    set({ contract, abi, status: "success" }),
  addLogItem: (item: { type: "normal" | "JSON"; message: string }) =>
    set((state) => ({
      ...state,
      logItems: [...state.logItems, item],
    })),
  addJSONLogItem: (item: { message: string }) =>
    set((state) => ({
      ...state,
      logItems: [
        ...state.logItems,
        { type: "JSON", message: JSON.stringify(item) },
      ],
    })),
  clearLog: () => set({ logItems: [] }),
}));

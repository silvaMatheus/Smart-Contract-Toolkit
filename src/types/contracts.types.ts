export type ContractFunctionProps = {
  name: string;
  stateMutability: string;
  description?: string;
  inputs: Array<{
    name: string;
    type: string;
    internalType: string;
  }>;
  outputs: Array<{
    type: string;
    internalType: string;
  }>;
};

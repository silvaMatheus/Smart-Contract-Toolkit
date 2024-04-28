import { useContractStore } from "@/context/store";
import { ContractFunctionProps } from "@/types/contracts.types";
import { useQueryClient } from "@tanstack/react-query";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useEthersSigner } from "./useEthersSigner";

/**
 * Custom hook to load a smart contract using Ethers.js with a signer and handle function calls.
 * It fetches the contract ABI and address from the store, initializes the contract,
 * extracts the contract's functions, and provides a method to call these functions.
 *
 * @returns {object} An object containing the contract instance, contract functions, loading state, feedback, result, execution status, isRunningFunction, and a method to call contract functions.
 */
const useLoadAndHandleContract = () => {
  const {
    contract: newContract,
    abi: contractAbi,
    setContract: updateContractStore,
  } = useContractStore();

  const signer = useEthersSigner();
  const queryClient = useQueryClient();

  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [functions, setFunctions] = useState<Array<ContractFunctionProps>>([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [result, setResult] = useState("");
  const [hasRunFunction, setHasRunFunction] = useState(false);
  const [isRunningFunction, setIsRunningFunction] = useState(false);

  useEffect(() => {
    if (!signer || !contractAbi) return;
    const loadContract = async () => {
      setLoading(true);
      try {
        const abi = contractAbi as Array<{
          type: string;
          name?: string;
          stateMutability: string;
          inputs: Array<{ name: string; type: string; internalType: string }>;
          outputs?: Array<{ type: string; internalType: string }>;
        }>;
        if (newContract) {
          const contractInstance = new ethers.Contract(
            newContract.target,
            abi,
            signer
          );
          setContract(contractInstance);
          const extractedFunctions = abi
            .filter((item) => item.type === "function")
            .map((func) => ({
              name: func.name || "",
              stateMutability: func.stateMutability,
              inputs: func.inputs.map((input) => ({
                name: input.name,
                type: input.type,
                internalType: input.internalType,
              })),
              outputs: func.outputs
                ? func.outputs.map((output) => ({
                    type: output.type,
                    internalType: output.internalType,
                  }))
                : [],
            }));
          setFunctions(extractedFunctions);
        } else {
          console.error("newContract is null.");
          setContract(null);
        }
        setFeedback("Contract loaded successfully.");
      } catch (error) {
        console.error("Failed to load contract:", error);
        setFeedback("Failed to load contract.");
      } finally {
        setLoading(false);
      }
    };
    loadContract();
  }, [signer, newContract, contractAbi]);

  const handleFunctionCall = async (
    func: { name: string; stateMutability: string },
    args: any[]
  ) => {
    if (!contract) {
      setFeedback("Contract not loaded.");
      return;
    }
    setLoading(true);
    setIsRunningFunction(true);
    try {
      const method = contract[func.name];
      if (!method) {
        throw new Error(`No matching fragment for function '${func.name}'.`);
      }
      const transactionResponse = await method(...args);

      const resultString = JSON.stringify(transactionResponse, (_, v) =>
        typeof v === "bigint" ? v.toString() : v
      );
      setResult(resultString);
      setFeedback(`Success: ${func.name} executed.`);
      setHasRunFunction(true);
    } catch (error: any) {
      console.error(`Error executing function ${func.name}:`, error);
      setFeedback(`Error: ${error.message}`);
      setHasRunFunction(true);
    } finally {
      setLoading(false);
      setIsRunningFunction(false);
    }
  };

  return {
    contract,
    functions,
    loading,
    feedback,
    result,
    hasRunFunction,
    isRunningFunction,
    handleFunctionCall,
  };
};
export default useLoadAndHandleContract;

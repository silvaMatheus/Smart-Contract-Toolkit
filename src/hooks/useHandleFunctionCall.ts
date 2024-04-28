import { ContractFunctionProps } from "@/types/contracts.types";
import { useQueryClient } from "@tanstack/react-query";
import { ethers } from "ethers";
import { useState } from "react";
import useLoadContract from "./useLoadContract";

/**
 * Custom hook to handle function calls on a smart contract using Ethers.js.
 * It manages the state for loading, feedback, result, and execution status.
 *
 * @param {ethers.Contract | null} contract - The contract instance to interact with.
 * @returns {object} - Returns the function to call a contract's method and states for loading, feedback, result, and execution status.
 */

export const useHandleFunctionCall = (func: ContractFunctionProps) => {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [result, setResult] = useState("");
  const [hasRunFunction, setHasRunFunction] = useState(false);
  const queryClient = useQueryClient();

  const { contract } = useLoadContract();

  const handleFunctionCall = async (
    func: { name: string; stateMutability: string },
    args: any[]
  ) => {
    if (!contract) {
      setFeedback("Contract not loaded.");
      return;
    }
    setLoading(true);
    try {
      const method = contract[func.name];
      if (!method) {
        throw new Error(`No matching fragment for function '${func.name}'.`);
      }
      const transactionResponse = await method(...args);
      const transactionResult = await transactionResponse.wait();
      setResult(JSON.stringify(transactionResult));
      setFeedback(`Success: ${func.name} executed.`);
      setHasRunFunction(true);
    } catch (error: any) {
      console.error(`Error executing function ${func.name}:`, error);
      setFeedback(`Error: ${error.message}`);
      setHasRunFunction(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleFunctionCall,
    loading,
    feedback,
    result,
    hasRunFunction,
  };
};

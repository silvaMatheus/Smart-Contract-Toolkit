import { FormValues } from "@/app/app/_components/smart-contract-modal/interact-contract";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

/**
 * Custom hook to retrieve a newContract from the query client storage.
 *
 * @returns {object} An object containing the newContract data if available.
 */
const useGetNewContract = () => {
  const queryClient = useQueryClient();
  const [newContract, setNewContract] = useState<FormValues | null>(null);

  useEffect(() => {
    const fetchNewContract = () => {
      const contractData = queryClient.getQueryData<FormValues | null>([
        "newContract",
      ]);
      if (contractData !== undefined) {
        setNewContract(contractData);
      } else {
        console.log("No new contract data found in the query client.");
      }
    };

    fetchNewContract();
  }, [queryClient]);

  return { newContract };
};

export default useGetNewContract;

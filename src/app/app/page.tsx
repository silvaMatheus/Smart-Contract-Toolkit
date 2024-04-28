"use client";

import { Accordion } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useLoadAndHandleContract from "@/hooks/useLoadContract";
import SmartContractInteract from "./(main)/_components/smart-contract-modal";
import FunctionCard from "./_components/function";

export default function Home() {
  const {
    contract,
    functions,
    feedback,
    result,
    hasRunFunction,
    handleFunctionCall,
  } = useLoadAndHandleContract();

  return (
    <>
      <main className="h-full grid items-center p-10 grid grid-cols-12">
        <div className="flex w-full h-full justify-center col-span-4">
          <SmartContractInteract />
        </div>

        <div className="overflow-y-auto px-10 h-full col-span-8">
          <Tabs defaultValue="read">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="read">Read</TabsTrigger>
                <TabsTrigger value="write">Write</TabsTrigger>
              </TabsList>
            </div>

            {functions.map((func, index) => (
              <TabsContent
                key={index}
                value={func.stateMutability === "view" ? "read" : "write"}
              >
                <Accordion type="single" collapsible className="w-full">
                  <FunctionCard func={func} />
                </Accordion>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </>
  );
}

"use client";

import { Accordion } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useLoadAndHandleContract from "@/hooks/useLoadContract";
import { useAccount } from "wagmi";
import FunctionCard from "./_components/function";
import { Log } from "./_components/log";
import SheetLogs from "./_components/log/sheetLog";
import Overview from "./_components/overview";
import { SheetInteractContract } from "./_components/sheet-interact";
import WalletConnect from "./_components/wallet-connections";

export default function Home() {
  const { functions } = useLoadAndHandleContract();
  const { address, isConnected, chain } = useAccount();

  return (
    <>
      <div className="flex h-[calc(100vh-4rem)] w-full flex-col bg-muted/40 overflow-hidden">
        <div className="p-5">
          <WalletConnect
            buttonText={isConnected ? "Wallet Connected" : "Connect Wallet"}
          />
        </div>
        <main className="flex gap-4 p-4 md:gap-8 w-full h-full">
          {isConnected && (
            <>
              {functions.length > 0 && (
                <>
                  <div className="items-start gap-4 flex flex-col sm:w-8/12 px-5 w-full md:gap-8 h-full">
                    <Overview />

                    <div className="w-full h-full col-span-8">
                      <Tabs defaultValue="read">
                        <div className="flex items-center mb-5">
                          <TabsList>
                            <TabsTrigger value="read">Read</TabsTrigger>
                            <TabsTrigger value="write">Write</TabsTrigger>
                          </TabsList>
                        </div>
                        <div className="h-[calc(100vh-20rem)] w-full overflow-y-auto">
                          {functions.map((func, index) => (
                            <TabsContent
                              key={index}
                              value={
                                func.stateMutability === "view"
                                  ? "read"
                                  : "write"
                              }
                            >
                              <Accordion
                                type="single"
                                collapsible
                                className="w-full"
                              >
                                <FunctionCard func={func} />
                              </Accordion>
                            </TabsContent>
                          ))}
                        </div>
                      </Tabs>
                    </div>
                  </div>

                  <div className="sm:w-4/12 max-w-full">
                    <Log />
                  </div>
                </>
              )}

              {functions.length === 0 && (
                <div className="items-start gap-4 w-full w-full md:gap-8 h-full">
                  <div className="flex items-center justify-center rounded-lg h-full border border-dashed shadow-sm w-full">
                    <div className="flex flex-col items-center gap-1 text-center gap-5">
                      <h3 className="text-2xl font-bold tracking-tight">
                        Interact with contract
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        You can start selling as soon as you add a product.
                      </p>
                      <SheetInteractContract />
                    </div>
                  </div>
                </div>
              )}

              <div className="fixed bottom-5 right-5 flex sm:hidden">
                <SheetLogs />
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}

"use client";

import { CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeployContractForm } from "./deploy-contract";
import InteractWithContractForm from "./interact-contract";

export default function SmartContractInteract() {
  return (
    <div className="w-full">
      <CardContent>
        <CardHeader title="Smart Contract Management">
          Here you can deploy a new contract or interact with an existing one.
          Choose an option below to get started.
        </CardHeader>

        <Tabs defaultValue="interact" className="w-full space-y-5">
          <TabsList className="h-12 w-full">
            <TabsTrigger className="h-full w-full" value="interact">
              Interact with Contracts
            </TabsTrigger>
            <TabsTrigger className="h-full w-full" value="deploy">
              Deploy New Contract
            </TabsTrigger>
          </TabsList>

          <TabsContent value="interact">
            <InteractWithContractForm />
          </TabsContent>

          <TabsContent value="deploy">
            <DeployContractForm />
          </TabsContent>
        </Tabs>
      </CardContent>
    </div>
  );
}

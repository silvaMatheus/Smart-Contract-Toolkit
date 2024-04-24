"use client";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogProps, DialogTitle } from "@radix-ui/react-dialog";
import { CardDescription } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { DeployContractForm } from "./deploy-contract";
import InteractWithContractForm from "./interact-contract";

export default function SmartContractInteract({
  onOpenChange,
  open,
}: DialogProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Smart Contract Management</DialogTitle>
          <CardDescription>
            Here you can deploy a new contract or interact with an existing one.
            Choose an option below to get started.
          </CardDescription>
        </DialogHeader>

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
      </DialogContent>
    </Dialog>
  );
}

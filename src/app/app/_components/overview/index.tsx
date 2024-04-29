"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CopyButton } from "@/components/ui/copy-button";
import { useContractStore } from "@/context/store";
import { SheetInteractContract } from "../sheet-interact";

export default function Overview() {
  const { contract, name } = useContractStore();

  return (
    <Card className="w-full">
      <CardHeader className="flex items-start bg-muted/50 w-full">
        <CardTitle className="flex items-center gap-2 text-lg  w-full justify-between">
          {name || "No Contract Name"}
          <SheetInteractContract />
        </CardTitle>
        <CardDescription className="flex gap-5 items-center justify-center">
          {contract?.target
            ? contract.target.toString()
            : "No Address Available"}
          <CopyButton
            value={contract?.target ? contract.target.toString() : ""}
          />
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

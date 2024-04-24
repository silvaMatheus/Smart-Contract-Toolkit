"use client";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import SmartContractInteract from "../smart-contract";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CopyButton } from "../ui/copy-button"; // Ensure you have a CopyButton component
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function LastContracts() {
  const [open, setOpen] = useState(false);

  const recentsContracts = [
    {
      contractAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      title: "test",
      status: "Deployed",
      security: "Low",
    },
    {
      contractAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      title: "test",
      status: "Deployed",
      security: "Low",
    },
    {
      contractAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      title: "test",
      status: "Deployed",
      security: "Low",
    },
    // Add more items as needed
  ];

  return (
    <>
      <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Recent Contracts</CardTitle>
            <CardDescription>
              Recent contract transactions from your platform.
            </CardDescription>
          </div>

          <Button
            size="sm"
            className="ml-auto gap-1"
            onClick={() => setOpen(true)}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Contract
            </span>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contract Address</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Security</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentsContracts.map((contract) => (
                <TableRow key={contract.contractAddress}>
                  <TableCell className="flex">
                    {contract.contractAddress}

                    <CopyButton
                      className="ml-10"
                      value={contract.contractAddress}
                    />
                  </TableCell>
                  <TableCell>{contract.title}</TableCell>
                  <TableCell>
                    <Badge className="text-xs" variant="outline">
                      {contract.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{contract.security}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <SmartContractInteract open={open} onOpenChange={setOpen} />
    </>
  );
}

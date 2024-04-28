"use client";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { CopyButton } from "../../../../components/ui/copy-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

export default function LastContracts() {
  const [open, setOpen] = useState(false);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContracts = async () => {
      setIsLoading(true);
      try {
        const mockData = [
          {
            contractAddress: "0x123...",
            title: "Contract One",
            status: "Active",
            security: "High",
          },
          {
            contractAddress: "0x456...",
            title: "Contract Two",
            status: "Pending",
            security: "Medium",
          },
          {
            contractAddress: "0x789...",
            title: "Contract Three",
            status: "Inactive",
            security: "Low",
          },
        ];
        setData(mockData as never[]);
      } catch (error) {
        console.error("Failed to fetch contracts:", error);
      }
      setIsLoading(false);
    };

    fetchContracts();
  }, []);
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
              {isLoading && <div className="text-center">Loading...</div>}

              {!data || (data.length === 0 && <div>No contracts found.</div>)}

              {data &&
                data?.map((contract: any) => (
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
    </>
  );
}

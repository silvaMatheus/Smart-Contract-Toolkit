"use client";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Dropzone from "@/components/ui/dropzone";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { validateABI } from "@/lib/utils";

import { useContractStore } from "@/context/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ethers } from "ethers";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const InteractContractSchema = z.object({
  contractName: z.string().min(1, { message: "Contract name is required" }),
  network: z.string().default("Ethereum").readonly(),
  contract: z.string().refine((data) => ethers.isAddress(data), {
    message: "Invalid Ethereum address",
  }),
  ABI: z.instanceof(File).refine((file) => file.type === "application/json", {
    message: "ABI must be a JSON file",
  }),
});

interface FormValues {
  contractName: string;
  network: string;
  contract: string;
  ABI: File;
}

const InteractWithContractForm = () => {
  const [abiContent, setAbiContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dropzoneStatus, setDropzoneStatus] = useState({
    message: "Drag 'n' drop your ABI file here, or click to select files",
    status: "empty" as "empty" | "error" | "processing" | "success",
  });

  const form = useForm<z.infer<typeof InteractContractSchema>>({
    resolver: zodResolver(InteractContractSchema),
  });

  const { setContract } = useContractStore();

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          const abi = JSON.parse(event.target.result.toString());
          if (
            !Array.isArray(abi) ||
            !abi.some(
              (entry) =>
                typeof entry === "object" && "type" in entry && "name" in entry
            )
          ) {
            throw new Error("Invalid ABI content");
          }

          const provider = new ethers.JsonRpcProvider();
          const contract = new ethers.Contract(data.contract, abi, provider);

          setContract(contract, abi);

          toast({
            title: "Success",
            description: "Contract interaction ready.",
          });
        }
      };
      reader.readAsText(data.ABI);
    } catch (error) {
      console.error("Error loading contract:", error);
      toast({
        title: "Error",
        description: "Failed to load the contract.",
      });
    }
    setIsLoading(false);
  };

  const handleFileRead = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e: ProgressEvent<FileReader>) => {
      try {
        if (e.target?.result) {
          const content = e.target.result.toString();
          if (validateABI(content)) {
            setAbiContent(content);
            setDropzoneStatus({
              message: "ABI file loaded successfully!",
              status: "success",
            });
          } else {
            throw new Error("Invalid ABI");
          }
        }
      } catch (err) {
        console.error("Invalid JSON file:", err);

        setDropzoneStatus({
          message: "Invalid ABI file, please upload a valid JSON ABI",
          status: "error",
        });
      }
    };
    reader.readAsText(file);
  };

  const checkFieldsBeforeSubmit = () => {
    const fields = form.getValues();
    Object.entries(fields).forEach(([key, value]) => {
      if (!value) {
        console.log(`Field ${key} is not filled in.`);
        toast({
          title: "Missing Field",
          description: `Please fill in the ${key} field.`,
        });
      }
    });
  };

  return (
    <div className="space-y-5">
      <CardHeader className="p-0">
        <CardTitle>Account</CardTitle>
        <CardDescription>
          Make changes to your account here. Click save when you&apos;re done.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(onSubmit)(e);
            }}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="contractName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contract Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter contract name" />
                  </FormControl>
                  <FormDescription>
                    Enter the name of the contract.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="network"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Network</FormLabel>
                  <FormControl>
                    <Input disabled placeholder="Ethereum" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contract"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contract</FormLabel>
                  <FormControl>
                    <Input placeholder="contract" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              control={form.control}
              name="ABI"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ABI</FormLabel>
                  <FormControl>
                    <Dropzone
                      dropMessage={dropzoneStatus.message}
                      status={dropzoneStatus.status}
                      handleOnDrop={(files) => {
                        if (files && files.length > 0) {
                          field.onChange(files[0]);
                          handleFileRead(files[0]);
                        }
                      }}
                      accept=".json"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.ABI &&
                      form.formState.errors.ABI.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              type="submit"
              disabled={!form.formState.isValid}
            >
              {isLoading ? (
                <ReloadIcon className="animate-spin" />
              ) : (
                "Interact Contract"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </div>
  );
};

export default InteractWithContractForm;

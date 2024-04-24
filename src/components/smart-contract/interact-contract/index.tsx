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

import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const InteractContractSchema = z.object({
  contractName: z.string().min(1, { message: "Contract name is required" }),

  network: z.string().default("Ethereum").readonly(),
  contract: z.string().min(1, { message: "Contract identifier is required" }),
  ABI: z.union([
    z.string().min(1, { message: "ABI is required" }),
    z.instanceof(File),
  ]),
});

const InteractWithContractForm = () => {
  const [abiContent, setAbiContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof InteractContractSchema>>({
    resolver: zodResolver(InteractContractSchema),
  });

  const onSubmit = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Interact with Contract",
        description: "Your contract has been processed.",
      });
    }, 2000);
  };

  const handleFileRead = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setAbiContent(e.target.result as string);
      }
    };
    reader.readAsText(file);
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
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
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
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
                      dropMessage="Drag 'n' drop your ABI file here, or click to select files"
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
                    {form.formState.errors.ABI && "ABI file is required"}
                  </FormMessage>
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              type="submit"
              disabled={
                !form.formState.isValid ||
                form.formState.isSubmitting ||
                isLoading
              }
            >
              {isLoading && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Interact Contract
            </Button>
          </form>
        </Form>
      </CardContent>
    </div>
  );
};

export default InteractWithContractForm;

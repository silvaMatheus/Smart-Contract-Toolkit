"use client";
import { CardContent } from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import ComingSoon from "./coming-soon";

const DeployContractSchema = z.object({
  contractName: z.string().min(1, { message: "Contract name is required" }),
  network: z.string().default("Ethereum").readonly(),
  byteCode: z.string().min(1, { message: "ByteCode is required" }),
  account: z.string().nonempty({ message: "Account is required" }),
  automaticallyCalculateGasLimit: z.boolean().default(false),
  maxFee: z.string().optional(),
  maxPriorityFee: z.string().optional(),
  gasLimit: z.number().optional(),
  nonce: z.string().optional().readonly(),
});

export const DeployContractForm = () => {
  const form = useForm<z.infer<typeof DeployContractSchema>>({
    resolver: zodResolver(DeployContractSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof DeployContractSchema>> = async (
    data
  ) => {
    toast({
      title: "Deployment Data",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <div className="relative space-y-5">
      <ComingSoon />
      <div className="rounded-lg brightness-50">
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
                      Enter the network for contract deployment.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="byteCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ByteCode</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your contract ByteCode"
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the bytecode of the smart contract.
                    </FormDescription>
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="account"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your account" />
                    </FormControl>
                    <FormDescription>
                      Enter the account for contract deployment.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="automaticallyCalculateGasLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Automatically Calculate Gas Limit</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      Check to automatically calculate gas limit.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FormField
                    control={form.control}
                    name="maxFee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Fee</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter max fee" />
                        </FormControl>
                        <FormDescription>
                          Enter the maximum fee for contract deployment.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gasLimit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gas Limit</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter gas limit" />
                        </FormControl>
                        <FormDescription>
                          Enter the gas limit for contract deployment.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="maxPriorityFee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Priority Fee</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter max priority fee"
                          />
                        </FormControl>
                        <FormDescription>
                          Enter the maximum priority fee for contract
                          deployment.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nonce"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nonce</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter nonce" />
                        </FormControl>
                        <FormDescription>
                          Enter the nonce for contract deployment.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
              </div> */}
            </form>
          </Form>
        </CardContent>
      </div>
    </div>
  );
};

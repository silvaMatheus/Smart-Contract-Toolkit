"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { truncateAddress } from "@/lib/utils";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { SiweMessage } from "siwe";
import {
  useAccount,
  useAccountEffect,
  useConnect,
  useDisconnect,
  useSignMessage,
} from "wagmi";

import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { LoaderCircle } from "lucide-react";

const WalletConnect: React.FC = () => {
  const { signMessageAsync } = useSignMessage();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: session, status } = useSession();
  const { address, isConnected, chain } = useAccount();
  const router = useRouter();
  const handleLogin = async (data: any): Promise<void> => {
    if (!data.address || !data.chainId) {
      console.error("Wallet is not connected properly.");
      return;
    }

    try {
      const nonce = await getCsrfToken();

      const message = new SiweMessage({
        domain: window.location.host,
        address: data.address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: data.chainId,
        nonce: nonce || "fallbackNonce",
      });

      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      await signIn("credentials", {
        message: JSON.stringify(message),
        signature,
        redirect: true,
        callbackUrl: "/app",
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useAccountEffect({
    onConnect: (data) => {
      if (!session) handleLogin(data);
    },
    onDisconnect: () => {
      console.log("disconnected");

      router.push("/auth");
    },
  });

  return (
    <div className="flex items-center justify-center py-12 flex-col gap-5">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Connect Wallet</h1>
          <p className="text-base text-muted-foreground">
            Choose a wallet to connect
          </p>
        </div>
        <div className="grid gap-4">
          {connectors.map((connector) => (
            <Button
              key={connector.id}
              onClick={() => connect({ connector })}
              variant="outline"
              className="flex items-center justify-center w-full py-8 my-2 text-left"
            >
              <Image
                alt={`${connector.name} logo`}
                src={`/${connector.id}.png`}
                width={30}
                height={30}
              />
              <CardHeader>{connector.name}</CardHeader>
            </Button>
          ))}
          {session && (
            <Button onClick={() => disconnect()} className="mt-2 w-full">
              Disconnect
            </Button>
          )}
        </div>
      </div>

      <Separator />

      <div className="flex gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Connection Status</CardTitle>
            <CardDescription>
              Details about the current wallet connection.
            </CardDescription>
          </CardHeader>
          <CardContent className="divide-y">
            <div className="flex items-center justify-between py-2">
              <span className="text-stone-500">Session Status</span>
              <span>{isConnected ? "Connected" : "Disconnected"}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-stone-500">Network</span>
              <span>{chain?.name || "N/A"}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-stone-500">Address</span>
              <span>{address ? truncateAddress(address) : "N/A"}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Web3Modal SIWE</CardTitle>
            <CardDescription>
              Information related to the connected SIWE session
            </CardDescription>
          </CardHeader>
          <CardContent className="divide-y">
            <div className="flex items-center justify-between py-2">
              <span className="text-stone-500"> Session Status </span>
              <span>{getIconFromStatus(status)}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-stone-500">Network</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-stone-500">Address</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const getIconFromStatus = (
  status: "authenticated" | "loading" | "unauthenticated"
) => {
  switch (status) {
    case "authenticated":
      return (
        <div className="rounded-full py-1 px-2 pr-3 text-sm text-green-200 flex items-center gap-1 bg-green-950">
          <CheckIcon className="text-green-400" /> Authenticated
        </div>
      );
    case "loading":
      return (
        <div className="rounded-md h-6 w-6 grid place-items-center bg-stone-800">
          <LoaderCircle />
        </div>
      );
    case "unauthenticated":
      return (
        <div className="rounded-full py-1 px-2 pr-3 text-sm text-red-200 flex items-center gap-1 bg-red-950">
          <Cross2Icon className="text-red-400" /> Unauthenticated
        </div>
      );
    default:
      return "❓";
  }
};

export default WalletConnect;
